<template>
	<div class="bg-gray-100 h-[100vh]">
		
		<div class="flex flex-col">
			<h1 class="p-4 text-xl">
				<RouterLink to="/" class="inline-flex gap-2 items-center">
					<el-icon class="relative top-px">
						<ArrowLeftBold />
					</el-icon>
					创建{{ type }}投票
				</RouterLink>
			</h1>

			<div class="space-y-3 bg-white px-4">
				<input type="text" v-model="title" class="transition w-full border-b border-gray-300 outline-none focus:ring my-1 p-1 text-lg" placeholder="投票标题">
				<input type="text" v-model="desc" class="transition w-full border-b border-gray-300 outline-none focus:ring my-1 p-1" placeholder="补充描述（选填）">
				<div v-for="(option, idx) of options" class="flex items-center gap-2" :key="idx">
					<span @click="deleteOption(idx)" class="cursor-pointer shink-0 w-5 h-5 ml-1 bg-red-500 font-bold text-write rounded-full flex justify-center items-center">
						<el-icon :size="12">
							<Minus/>
						</el-icon>
					</span>
					<input type="text" v-model="options[idx]" class="transition w-full border-b border-gray-300 outline-none focus:ring my-1 p-1" placeholder="选项">
				</div>
				<div class="flex gap-2 items-center">
					<span @click="addOption" class="cursor-pointer shrink-0 w-5 h-5 ml-1 bg-sky-500 font-bold text-write rounded-full flex justify-center items-center">
						<el-icon :size="12">
							<plus/>
						</el-icon>
					</span>
					<button @click="addOption" class="cursor-pointer my-1 p-1 text-sky-500">添加选项</button>
				</div>
			</div>
		</div>

		<hr class="h-2 border-t border-gray-300">
		
		<div class="mt-4 bg-white flex flex-col px-4">
			<div class="flex justify-between items-center h-12 border-b border-gray-300">
				截止日期
				<el-date-picker
						style="width: 190px"
						v-model="deadline"
						format="YYYY-MM-DD HH-mm"
						type="datetime"
						placeholder="选择截止时间"
					/>
			</div>
			<div class="flex justify-between items-center h-12 border-b border-gray-300">
				匿名投票
				 <el-switch v-model="anonymous" />
			</div>
			<div class="hidden flex justify-between items-center h-12 border-b border-gray-300">
				限制传播
				 <el-switch />
			</div>
			<button @click="create" class="block bg-sky-500 text-white rounded p-1">完成</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useVoteStore } from '@/stores/vote'
	import axios from 'axios'
	import { ref,computed } from 'vue'
	import { useRouter,useRoute, RouterLink } from 'vue-router'
	import { useLogin } from './hooks'

	let voteStore = useVoteStore()
	let router = useRouter()
	let route = useRoute()
	let type = computed<string>(() => route.query.type == 'single' ? '单选': '多选')

	useLogin()



	let deadline = ref(new Date(Date.now() + 86400 * 7))
	let title = ref('')
	let desc = ref('')
	let options = ref(['',''])
	let anonymous = ref(false)
	let multiple = computed(() => type.value == '多选')

	function addOption() {
		options.value.push('')
	}
	function deleteOption(idx: number) {
		options.value.splice(idx, 1)
	}
	async function create() {
		let voteInfo = {
			title: title.value,
  		desc: desc.value,
  		deadline: deadline.value,
  		anonymous: anonymous.value,
  		multiple: multiple.value,
  		options: options.value,
		}
		let res = await axios.post('/vote', voteInfo)
		if (res.data.code == 0) {
			let id = res.data.result.voteId
			router.push('/vote/' + id)
		} else {
			voteStore.user = null
			router.push('/login?next=' + route.fullPath)
		}
		console.log(res)

	}
</script>