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
		</div>
	</main>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { Tabbar,TabbarItem } from 'vant'

	let activeIdx = ref(0)


</script>