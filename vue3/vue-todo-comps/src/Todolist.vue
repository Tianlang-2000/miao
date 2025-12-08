<script setup>
import TodItems from './TodoItems.vue'
import { computed } from 'vue'

let props = defineProps([
	'todos', 'visibleType'
])
let emit = defineEmits(['todo-status-change', 'delete-todo'])

//业务函数
let visibleTodos = computed(() => {
	if (props.visibleType == "all") {
		return props.todos
	} else if (props.visibleType == "active") {
		return props.todos.filter(it => it.completed == false)
	} else {
		return props.todos.filter(it => it.completed == true)
	}
})
</script>
<template>
	<ul>
		<TodItems
			v-for="todo of visibleTodos"
			:key="todo.id"
			:todo="todo" 
			@status-change="$emit('todo-status-change', todo.id)"
			@delete="$emit('delete-todo', todo.id)"
		/>
	</ul>
</template>