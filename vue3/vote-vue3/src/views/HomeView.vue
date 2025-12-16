<template>
	<main class="flex flex-col h-[100vh]">
		<div class="grow">
			<router-view/>
		</div>
		<div class="flex h-12">
			<RouterLink to="/select-create" class="[&.router-link-active]:text-green-500 basis-0 grow flex items-center flex-col">
				<span>➕</span>
				<span>新建</span>
			</RouterLink>
			<RouterLink to="/me" class="[&.router-link-active]:text-green-500 basis-0 grow flex items-center flex-col">
				<span>👨‍💻</span>
				<span>我的</span>
			</RouterLink>
			<!--router-link-exact-active 前端路由地址就是当前routerlink的地址-->
			<!--router-link-active 前端路由地址由当前routerlink的地址开头-->
		</div>
	</main>
</template>

<script setup lang="ts">
	import {onMounted} from 'vue'
	import axios from 'axios'
	import { useVoteStore } from '../stores/vote'
	let voteStore = useVoteStore()
	 
	onMounted(async () => {
		// let user = await axios.get('/account/current-user')
		// voteStore.setUser()
		// try {

		// } catch(e) {

		// }
	})

</script>