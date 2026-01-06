<template>
	<div>
		<h1 class="p-4 text-xl">我的</h1>
		<div class="flex items-center gap-4 p-12">
			<img class="rounded-full w-16 h-16" :src="userStore.user?.avatar || ''" /> <span>天朗</span>
		</div>
	</div>
	<div class="divide-y divide-gray-300 bg-white">
			<RouterLink class="block h-16 flex items-center justify-between px-4" to="/my-votes">
				我的投票
				<el-icon>
					<ArrowRight />
				</el-icon>
			</RouterLink>
			<RouterLink class="block h-16 flex items-center justify-between px-4" to="/my-settings">
				个人设置
				<el-icon>
					<ArrowRight />
				</el-icon>
			</RouterLink>                
	</div>
	
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useLogin } from './hooks';
import { useVoteStore } from '@/stores/vote'
useLogin()

let userStore = useVoteStore()

</script>