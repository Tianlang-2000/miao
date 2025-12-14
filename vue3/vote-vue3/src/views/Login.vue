<template>
	<div>
		<input type="text" class="border" v-model="name">
		<input type="password" class="border" v-model="password">
		<button>登陆</button>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'

	let name = ref('')
	let password = ref('')
</script>