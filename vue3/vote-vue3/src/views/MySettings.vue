<template>
	<div class="bg-gray-200 h-[100vh]">
		<h1 class="p-4 text-xl">
			<RouterLink class="inline-flex gap-2 items-center" to="/my-votes">
				<el-icon class="relative">
					<ArrowLeft/>
				</el-icon>
				个人设置
			</RouterLink>
		</h1>

		<div class="flex items-center justify-center gap-4 p-12">
			<img class="rounded-full w-20 h-20" :src="voteStore.user?.avatar || ''" />
		</div>
		<div class="divide-y divide-gray-300 bg-white">
			<RouterLink class="block h-16 flex items-center justify-between px-4" to="/my-votes">
					昵称
				<span class="flex items-center gap-2">
					天朗
					<el-icon>
						<ArrowRight />
					</el-icon>
				</span>
			</RouterLink>
		</div>

		<button @click="logout" class="mt-8 block border border-blus-500 text-blue-500 rounded py-3 px-4 m-auto w-2/3" to="/my-settings">
			退出登录
		</button>
	</div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useLogin } from './hooks';

	let voteStore = useVoteStore()
	let router = useRouter()
  useLogin()
	async function logout() {
		await axios.get('/account/logout')
		voteStore.user = null
		router.push('/')
	}
</script>