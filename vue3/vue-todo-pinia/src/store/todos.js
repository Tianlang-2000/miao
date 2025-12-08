import { ref, computed } from 'vue'
import { defineStore } from 'pinia' 

export const useTodos = defineStore('todos', () => {
	//数据
	const todos = ref([
		{ id: 1, text: 'Learn Vue 3', completed: true },
    { id: 2, text: 'Learn Pinia', completed: false },
    { id: 3, text: 'Build something awesome', completed: false }
	])
	let visibleType = ref('all')
	let editingId = ref(null)
	//方法
	let isAllCompleted = computed(() => todos.value.every(it => it.completed))
	var showClearButton = computed(() => todos.value.some(it => it.completed))
	let todoLeftCount = computed(() => todos.value.filter(it => it.completed == false).length)
	let visibleTodos = computed(() => {
		if (visibleType.value == "all") {
			return todos.value
		} else if (visibleType.value == "active") {
			return todos.value.filter(it => it.completed == false)
		} else {
			return todos.value.filter(it => it.completed == true)
		}
	})
	//函数
	function toggleAll() {
  	const allDone = todos.value.every(item => item.completed === true)
 		todos.value.forEach(item => (item.completed = !allDone))
	}
	function addTodo(text) {
		todos.value.push(
			{
				id: Math.random().toString(),
				text,
				completed: false
			}
		)
	}
	function toggleTodo(id) {
		let idx = todos.value.findIndex(it => it.id == id)
		if(idx >= 0) {
			todos.value[idx].completed = !todos.value[idx].completed
		}
	}
	function deleteTodo(id) {
		let idx = todos.value.findIndex(it => it.id == id)
		if(idx >= 0) {
			todos.value.splice(idx, 1)
		}
	}

	return {
		todos,
		visibleType,
		editingId,
		isAllCompleted,
		showClearButton,
		todoLeftCount,
		visibleTodos,
		toggleAll,
		addTodo,
		toggleTodo,
		deleteTodo,
	}
}, {
	persist: true
})