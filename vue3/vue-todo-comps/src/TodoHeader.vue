<script setup>
	import {computed} from 'vue'
	// 定义形参和事件
	let props = defineProps(['todos'])
	// 在子组件还要加工，所以用变量接一下
	let emit = defineEmits(['toggle-all', 'add-todo'])
	// 业务函数
	let isAllCompleted = computed(() => props.todos.every(it => it.compuleted))
	
	function addTodo(e) {
		let text = e.target.value.trim()
		if (text) {
			emit('add-todo', text)
			e.target.value = ''
		}
	}
</script>
<template>
	<h1>Todos</h1>
	<div>
		<input type="checkbox" :checked="isAllCompleted" @change="$emit('toggle-all')">
	  <input type="text" @keyup.enter="addTodo">
	</div>
</template>