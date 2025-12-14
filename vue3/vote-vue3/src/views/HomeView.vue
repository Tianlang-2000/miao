<template>
	<main class="flex flex-col h-[100vh]">
		<router-view class="grow"/>
		<div class="flex h-12">
			<RouterLink to="/select-create" class="basis-0 grow flex items-center flex-col">
				<span>➕</span>
				<span>新建</span>
			</RouterLink>
			<RouterLink to="/me" class="basis-0 grow flex items-center flex-col">
				<span>👨‍💻</span>
				<span>我的</span>
			</RouterLink>
		</div>
	</main>
</template>

<script setup lang="ts">
	import {onMounted} from 'vue'
	import axios from '../api'

	onMounted(async () => {
		let a = await axios.get('/api/account/current-user')

	})
</script>