<template>
	<div>
		<input type="text" class="border" v-model="name">
		<input type="password" class="border" v-model="password">
		<button @click="login">登陆</button>
	</div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores/vote'
import axios from 'axios'
import { ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'

	let name = ref('')
	let password = ref('')

	let route = useRoute()
	let router = useRouter()
	let voteStore = useVoteStore()
	let next = (route.query.next ?? '/') as string
	async function login() {
		try{
			let user = await axios.post('/account/login', {
				name: name.value,
				password: password.value,
			})

			voteStore.user = user.data.result
			router.replace(next)
		} catch(e) {
			alert('登录失败')
		}
	}
</script>