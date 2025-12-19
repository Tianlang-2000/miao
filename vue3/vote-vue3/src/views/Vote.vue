<template>
	<div class="bg-gray-100 h-[100vh] flex flex-col">
		<h1 class="py-4 mx-4 text-xl"><RouterLink to="/select-create">腾讯投票</RouterLink></h1>

	<div class="my-8 mx-4 relative">
		<h2 class="text-3xl font-bold mb-4">{{ voteInfo.vote.title }}</h2>
		<h3>{{ voteInfo.vote.desc }} <span class="text-sky-500">{{ displayType }}</span></h3>
		<span @click="showShare = true" class="absolute top-0 right-0 bg-blue-500 flex items-center rounded-full text-white p-2">
			<el-icon :size="24">
				<Share />
			</el-icon>
		</span>
		<ActionSheet v-model:show="showShare" :actions="shareActions" cancel-text="取消" description="分享到..." close-on-click-action close-on-click-overlay />
	</div>

		<ul class="space-y-2">
			<li @click="handleOptionClick(option.optionId)" v-for="(option,idx) of voteInfo.options" :key="idx">
				<div class="bg-white shadow-lg">
					<div class="relative h-12 flex gap-2 items-center mx-4">
						<span>{{ option.content }}</span>
	
						<span v-if="isVoting && option.optionId == lastClickedOptionId" class="animate-spin flex items-center">
							<el-icon><Loading /></el-icon>
						</span>
						<span v-else>{{ optionChecked[option.optionId]? '✅' : '' }}</span>
	
						<!-- <span class="grow"></span>它grow，或者下边那个的margin为auto -->
						<span class="ml-auto">{{ optionVotes[option.optionId].length }} 票</span>
						<span class="w-14 text-right">{{ optionPercentage[option.optionId] }}</span>
						<div class="absolute bottom-0 h-[2px] bg-sky-500 transition-all" :style="{width: optionPercentage[option.optionId]}"></div>

					</div>
				</div>
				<div v-if="!voteInfo.vote.anonymous && visibleAvatars(idx).length > 0" class="flex flex-wrap gap-2 mt-2 mx-4">
					<img class="align-top inline-block w-8 h-8 rounded-full border border-slat-500" v-for="user of visibleAvatars(idx)" :src="user.avatars" alt="">
					<el-icon @click="avExpend[idx] = !avExpend[idx]" class="align-top inline-block !w-8 !h-8 rounded-full border border-slat-500"><More /></el-icon>
				</div>
			</li>
		</ul>
		<div class="flex justify-between px-4 text-slate-400 h-12 items-center">
			<span>投票截止：{{ new Date(voteInfo.vote.deadline).toLocaleString() }}</span>
		</div>

		<button @click="submit" v-if="showBottomButton" :disabled="selectedOptionId.length == 0" class="disabled:bg-gray-500 block bg-sky-500 text-white rounded p-1 mx-4">完成</button>
	</div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote'
import axios from 'axios'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useWindowSize } from './hooks'
import { showToast, showNotify, ActionSheet, type ActionSheetAction, } from 'vant'
import copy from 'copy-to-clipboard'
// 分享业务
	let showShare = ref(false)
	let shareActions = [{
		name: '复制链接',
		callback: async function () {
			copy(location.href)
			showToast({
				message:'复制成功',
				position: 'top',
			})
			showNotify({ 
				type: 'success', 
				message: '复制成功'
			})
		},
	}, {name: '发送给朋友'}]

	let route = useRoute()
	let id = route.params.id
	let voteStore = useVoteStore()

	let res = await axios.get(`/vote/${id}`)
	let voteInfo = reactive(res.data.result)

	let displayType = computed(() => voteInfo.vote.multiple ? '[多选]' : '[单选]')
	

	// 每个选项票数 {53:[xxx,yyy,zzz], 54: [222,333]}
	let optionVotes = computed(() => {
		let 每个选项的票数:any = {}
		for (let option of voteInfo.options) {
			// vote为一张票，其optionId是说他投的哪个选项
			每个选项的票数[option.optionId] = voteInfo.userVotes.filter((vote: any) => vote.optionId == option.optionId)
		}
		return 每个选项的票数
	})

// 每个选项的比例 {53: '66%', 54:'77%'}
	let optionPercentage = computed(() => {
		// 总共多少人投，没有就不用算了
		let totalUsers = new Set(voteInfo.userVotes.map((it: any) => it.userId)).size
		if (totalUsers === 0) return {}
		let result:any = {}

		for (let optionId in optionVotes.value) {
			let 这个选项的票们 = optionVotes.value[optionId]
			result[optionId] = (这个选项的票们.length / totalUsers * 100).toFixed(2) + '%'
		}
		return result
	})
// 计算当前登录用户对每个选项有无投票
	let optionVotesByCurrentUser = computed(() => {
		let result: any = {}

		for (let [optionId, votes] of Object.entries(optionVotes.value)) {
			let 这个选项的票们 = optionVotes.value[optionId]
			if (这个选项的票们.some((it:any) => it.userId == voteStore.user?.userId)) {
				result[optionId] = true
			} else {
				result[optionId] = false
			}
		}
		return result // { 53：true, 54: false }
	})

// 是否显示完成按钮，影响匿名
	let showBottomButton = computed(() => {
		if (!voteInfo.vote.anonymous) {
			return false
		} else {
			let d = new Date().toISOString()
			if (d > voteInfo.vote.deadline) {
				return false
			}
		}
		// 用户在任何一个选项打了勾，则投过了，匿名只能投一次
		if (voteInfo.vote.anonymous && Object.values(optionVotesByCurrentUser.value).some(it => it == true)) {
			return false
		}
		return true
	})
// 匿名业务
let selectedOptionId = ref<number[]>([]) // [53, 54] -> {53: true, 54,false}

//模板中用来显示勾的数据
let optionChecked = computed(() => {
	if (showBottomButton.value) {
		let result: any = {}
		for (let id of selectedOptionId.value) {
			result[id] = true
		}
		return result
	}
	return optionVotesByCurrentUser.value
})
let isVoting = ref(false) // 是否正在发生投票（后台在发post）
let lastClickedOptionId = ref(-1) //最后一次点击的选项的id，用来显示loading

// 头像处理相关，pc有滚动条，算在窗口宽度里导致算错
// let avatarContainer = ref(null)
let size = useWindowSize()
let avCount = computed(() => {
	return Math.floor(((size.value.width - 32) + 8) / 40)
})
let avExpend = ref<boolean[]>(new Array(voteInfo.options.length).fill(false))
// 此函数参数为选项下标,函数为了获取第idx个选项下面显示的头像
function visibleAvatars(optionIndex: number) {
	let { optionId } = voteInfo.options[optionIndex]
	if (avExpend.value[optionIndex]) {
		return optionVotes.value[optionId]
	} else {
		return optionVotes.value[optionId].slice(0, avCount.value - 1)
	}
}

	function handleOptionClick(optionId: number) {
		// 非匿名，点击即刻发请求
		lastClickedOptionId.value = optionId
		if (!voteInfo.vote.anonymous) {
			isVoting.value = true
			axios.post(`/vote/${voteInfo.vote.voteId}`, {
				optionIds: [optionId]
			}).then(res => {
				voteInfo.userVotes = res.data.result.userVotes
			})
			isVoting.value = false
		} else {
			// 匿名只有点击加提交才会，且不能再发
			//选中当前项，并且记下，点击提交的时候才发送所有选项

			// 如果该项已经选中，就取消它的选中，否则加进来
			if (showBottomButton.value) {
				if (selectedOptionId.value.includes(optionId)) {
					let index = selectedOptionId.value.indexOf(optionId)
					selectedOptionId.value.splice(index, 1)
				} else {
					// 单选逻辑
					if (!voteInfo.vote.multiple) {
						selectedOptionId.value = [optionId]
					} else {
						selectedOptionId.value.push(optionId)
					}
				}
			} else {
			  alert('不能投了') 
			}
		}
	}
	function submit() {
		axios.post(`/vote/${voteInfo.vote.voteId}`, {
			optionIds: selectedOptionId.value
		}).then(res => {
			voteInfo.userVotes = res.data.result.userVotes
		})
	}
	onMounted(() => {
		let ws = new WebSocket(`ws://${location.host}/realtime-voteinfo/{$id}`)

		ws.onmessage = e => {
			let userVotes = JSON.parse(e.data)
			voteInfo.userVotes = userVotes
		}
	})
</script>