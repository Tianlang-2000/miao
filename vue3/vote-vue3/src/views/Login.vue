<template>
	<div>
		<h1 class="p-4 text-xl">
			<RouterLink class="inline-flex gap-2 items-center" to="/">
				<el-icon class="relative top-px">
					<ArrowLeftBold />
				</el-icon>
				登录
			</RouterLink>
		</h1>
		<div class="px-4 h-12 flex items-center"><input placeholder="用户名" type="text" class="border text-xl focus:ring outline-none w-full" v-model="name"></div>
		<div class="px-4 h-12 flex items-center"><input placeholder="密码" type="password" class="border text-xl focus:ring outline-none w-full" v-model="password"></div>
		<button class="block bg-blue-500 text-white py-3  m-auto w-2/3 rounded mt-2" @click="login">登录</button>
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