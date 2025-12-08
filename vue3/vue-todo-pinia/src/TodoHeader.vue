<script setup>
	import { useTodos } from './store/todos.js';
	// 定义形参和事件
	var store = useTodos()
	// 业务函数
	
	
	function isAddTodo(event) {
		let text = event.target.value.trim()
		if (text) {
			store.addTodo(text)
			event.target.value = ''
		}
	}
</script>
<template>
	<h1>Todos</h1>
	<div>
		<input type="checkbox" :checked="store.isAllCompleted" @click="store.toggleAll">
	  <input type="text" placeholder="What needs to be done?" @keyup.enter="isAddTodo">
	</div>
</template>