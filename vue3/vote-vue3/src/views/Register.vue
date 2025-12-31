<template>
	<h1 class="p-4 text-xl">
			<RouterLink class="inline-flex gap-2 items-center" to="/login">
				<el-icon class="relative top-px">
					<ArrowLeftBold />
				</el-icon>
				返回
			</RouterLink>
	</h1>
	<div class="px-4 h-12 flex items-center"><input placeholder="用户名" type="text" class="border text-xl focus:ring outline-none w-full" v-model="name"></div>
	<div class="px-4 h-12 flex items-center"><input placeholder="邮箱" type="text" class="border text-xl focus:ring outline-none w-full" v-model="email"></div>
	<div class="px-4 h-12 flex items-center"><input placeholder="密码" type="text" class="border text-xl focus:ring outline-none w-full" v-model="password"></div>
	<div class="px-4 h-12 flex items-center"><input placeholder="确认密码" type="text" class="border text-xl focus:ring outline-none w-full" v-model="confirmPassword"></div>
	<div class="px-4">头像：<input placeholder="头像" type="file" ref="avatar" class="border w-full"></div>
  <button class="block bg-blue-500 text-white py-3  m-auto w-2/3 rounded mt-2" @click="register" :disabled="!avatarUrl">注册</button>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue'
import axios from 'axios'
	let name = ref('')
	let email = ref('')
	let password = ref('')
	let confirmPassword = ref('')
	let avatarUrl = ref('')
	let avatar = ref<null | HTMLInputElement>(null)

	onMounted(() => {
		avatar.value!.addEventListener('change', async e => {
			let file = avatar.value!.files?.[0]
			if (!file) return
    	let fd = new FormData()
    	fd.append('avatar', file)
			let urls = await fetch('/upload', {
				method: 'post',
				body: fd,
			}).then(it => it.json())
			avatarUrl.value = urls[0]
		})
	})

	async function register() {
		if (password.value !== confirmPassword.value) {
    	alert('两次密码不一致')
    	return
  	}
		let res = await axios.post('/account/register', {
			name: name.value,
			password: password.value,
			email: email.value,
			avatarUrl: avatarUrl.value,
		})
		if (res) {
			alert('注册成功')
		}
	}
</script>