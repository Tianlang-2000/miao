<template>
	<div>投票及显示界面{{ id }}</div>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router'

	let route = useRoute()
	let id = route.params.id
</script>