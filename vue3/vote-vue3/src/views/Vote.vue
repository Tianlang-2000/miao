<template>
	<div class="bg-gray-100 h-[100vh] flex flex-col">
		<h1 class="py-4 mx-4 text-xl"><RouterLink to="/select-create">腾讯投票</RouterLink></h1>

	<div class="my-8 mx-4 relative">
		<h2 class="text-3xl font-bold mb-4">{{ voteInfo.vote.title }}</h2>
		<h3>{{ voteInfo.vote.desc }} <span class="text-sky-500">{{ displayType }}</span></h3>
		<span class="absolute top-0 right-0 bg-blue-500 flex items-center rounded-full text-white p-2">
			<el-icon :size="24">
				<Share />
			</el-icon>
		</span>
	</div>

		<ul class="space-y-2">
			<li @click="handleOptionClick(option.optionId)" class="bg-white shadow px-4 relative h-12 flex gap-2 items-center" v-for="(option,idx) of voteInfo.options" :key="idx">
				<span>{{ option.content }}</span>
				<span>{{ optionVotesByCurrentUser[option.optionId]? '✅' : '' }}</span>
				<span class="grow"></span><!--它grow，或者下边那个的margin为auto-->
				<span>{{ optionVotes[option.optionId].length }}票</span>
				<span>{{ optionPercentage[option.optionId] }}</span>
				<div class="absolute bottom-0 h-[2px] bg-sky-500" :style="{width: optionPercentage[option.optionId]}"></div>
			</li>
		</ul>
		<div class="flex justify-between px-4 text-slate-400 h-12 items-center">
			<span>投票截止：{{ voteInfo.vote.deadline.replace('T', ' ').slice(0, 16) }}</span>
		</div>

		<button v-if="showBottomButton" class="block bg-sky-500 text-white rounded p-1 mx-4">完成</button>
	</div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote'
import axios from 'axios'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

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
		return result
	})


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

	function handleOptionClick(optionId: number) {
		// 非匿名，点击即刻发请求
		if (!voteInfo.anonymous) {
			axios.post(`/vote/${voteInfo.vote.voteId}`, {
				optionIds: [optionId]
			})
		} else {
			// 匿名只有点击加提交才会，且不能再发
			
		}
	}
	
</script>