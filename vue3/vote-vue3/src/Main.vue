<template>
	<suspense>
		<template #fallback>Loading...</template>
		<App/>
	</suspense>
</template>
<script setup lang="ts">
	import App from './App.vue'
</script>