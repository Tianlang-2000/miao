<script setup>
	defineEmits(['delete', 'status-change'])
	defineProps(['todo'])
</script>
<template>
	<li>
		<input type="checkbox" :checked="todo.completed" @input="$emit('status-change')">
		<span>{{ todo.text }}</span>
		<button @click="$emit('delete')">x</button>
	</li>
</template>