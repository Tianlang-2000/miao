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
			<li class="bg-white shadow px-4 relative h-12 flex gap-2 items-center" v-for="(option,idx) of voteInfo.options" :key="idx">
				<span>{{ option.content }}</span>
				<span>✅</span>
				<span class="grow"></span><!--它grow，或者下边那个的margin为auto-->
				<span>4票</span>
				<span>27.3%</span>
				<div class="absolute bottom-0 h-[2px] bg-sky-500" :style="{width: idx*10 + 50 + '%'}"></div>
			</li>
		</ul>
		<div class="flex justify-between px-4 text-slate-400 h-12 items-center">
			<span>投票截止：{{ voteInfo.vote.deadline.replace('T', ' ').slice(0, 16) }}</span>
		</div>

		<button class="block bg-sky-500 text-white rounded p-1 mx-4">完成</button>
	</div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

	let route = useRoute()
	let id = route.params.id

	let res = await axios.get(`/vote/${id}`)
	let voteInfo = reactive(res.data.result)

	let displayType = computed(() => voteInfo.vote.multiple ? '[多选]' : '[单选]') 
</script>