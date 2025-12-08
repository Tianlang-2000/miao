<script setup>
import TodoItems from './TodoItems.vue'
import { useTodos } from './store/todos.js'

let todos = useTodos()

</script>
<template>
	<ul>
		<TodoItems
			v-for="todo in todos.visibleTodos"
			:key="todo.id"
			:todo="todo" 
		/>
	</ul>
</template>