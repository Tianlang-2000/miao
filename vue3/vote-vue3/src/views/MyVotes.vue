<template>
	<h1 class="p-4 text-xl">
		<RouterLink to="/me" class="inline-flex gap-2 items-center">
			<el-icon class="relative top-px">
				<ArrowLeftBold />
			</el-icon>
			我的投票
		</RouterLink>
	</h1>
	 <div class="divide-y divide-gray-300">
		<div v-for="(vote,idx) of myVotes" :key="vote.voteId">
			<div class="hover:bg-green-300 h-16 flex items-center justify-between px-4" @click="setIndex(idx)">
				<span>{{ vote.title }}</span>
				<span>30</span>
			</div>
			<div :class="{hidden: selectedIdx !== idx}" class="h-16 flex items-center border-t border-gray-300">
				<!-- <span class="basis-0 grow flex flex-col items-center"><span>📚</span>编辑</span> -->
				<RouterLink :to="`/vote/${vote.voteId}`" class="basis-0 grow flex flex-col items-center"><span>📚</span>查看</RouterLink>
				<span class="basis-0 grow flex flex-col items-center"><span>📚</span>分享</span>
				<span @click="deleteVote(vote, idx)" class="basis-0 grow flex flex-col items-center"><span>📚</span>删除</span>
			</div>
		</div>
		
	</div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useLogin, useSelectOne } from './hooks';
import { showConfirmDialog } from 'vant'

type VoteInfo = {
	title: string,
	userId: number,
	voteId: number,
	desc: string,
	deadline: string,
	anonymous: number | boolean,
	multiple: number | boolean
}
let myVotes = ref<VoteInfo[]>([])

try {
	let res = await axios.get("/vote")
	myVotes.value = res.data.result
} catch (e) {
	myVotes.value = []
	useLogin()
}

let [selectedIdx, setIndex] = useSelectOne()

// 封装实现单击一个元素显示，再单击收回扩展


 async function deleteVote(vote: VoteInfo, idx: number) {
	try {

		await showConfirmDialog({
			message: `确认删除 ${vote.title} 吗？`
		})
		await axios.delete('/vote/' + vote.voteId)
		myVotes.value.splice(idx, 1)
		setIndex(-1)
	} catch(e) {
		console.log(e)
	}
}
</script>