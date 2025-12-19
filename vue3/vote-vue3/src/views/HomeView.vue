<template>
	<main class="flex flex-col h-[100dvh] bg-gray-100">
		<!-- <SelectCreate v-if="activeIdx == 0" />
		<Me v-else/> -->

		<RouterView />

		<div class="flex xh-12 bg-white">
			<Tabbar v-model="activeIdx" route>
  			<TabbarItem icon="plus" to="/select-create">
					<!-- <RouterLink to="/select-create"> -->
				    新建
					<!-- </RouterLink> -->
				</TabbarItem>
  			<TabbarItem icon="user-circle-o" to="/me">
					<!-- <RouterLink to="/me"> -->
						我的
					<!-- </RouterLink> -->
				</TabbarItem>
			</Tabbar>

			<!-- <RouterLink to="/select-create" class="[&.router-link-active]:text-green-500 basis-0 grow flex items-center flex-col">
				<span>➕</span>
				<span>新建</span>
			</RouterLink>
			<RouterLink to="/me" class="[&.router-link-active]:text-green-500 basis-0 grow flex items-center flex-col">
				<span>👨‍💻</span>
				<span>我的</span>
			</RouterLink> -->
			<!--router-link-exact-active 前端路由地址就是当前routerlink的地址-->
			<!--router-link-active 前端路由地址由当前routerlink的地址开头-->
		</div>
	</main>
</template>

<script setup lang="ts">
	import {onMounted, ref} from 'vue'
	import axios from 'axios'
	import { useVoteStore } from '../stores/vote'
	import { Tabbar,TabbarItem } from 'vant'
	import SelectCreate from './selectCreate.vue'
	import me from './Me.vue'

	let activeIdx = ref(0)
	let voteStore = useVoteStore()

	onMounted(async () => {
		// let user = await axios.get('/account/current-user')
		// voteStore.setUser()
		// try {

		// } catch(e) {

		// }
	})

</script>