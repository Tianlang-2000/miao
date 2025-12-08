<script setup>
	import { useTodos } from './store/todos.js';
	
	defineProps(['todo'])
	var store = useTodos()
	let vFocus= {
		mount(el) {
			el.focus()
		}
	}
</script>
<template>
	<li>
		<input type="checkbox" v-model="todo.completed">
		<input 
			v-focus 
			type="text"
			v-if="todo.id == store.editingId"
			:value="todo.text"
			@keyup.enter="todo.text = $event.target.value.trim(); store.editingId = null"
			@blur="store.editingId = null"
			@keyup.escape="store.editingId = null" 
		></input>
		<span v-else @dblclick="store.editingId = todo.id">{{ todo.text }}</span>
		<button @click="store.deleteTodo(todo.id)">x</button>
	</li>
</template>