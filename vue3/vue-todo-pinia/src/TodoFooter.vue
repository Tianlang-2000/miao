<script setup>
	// 单引一个计算属性
	import { useTodos } from './store/todos';
	// 定义“形参”
	let store = useTodos()
</script>
<template>
	<div>{{ store.todoLeftCount }} items left</div>
	<div>
		<!----
			checked负责视觉效果，里边是个判断，而vtc事件把这次点击的数据给到了父组件，让父组件去改数据
		----->
		<label><input type="radio" name='filter' value="all" v-model="store.visibleType"> All</label>
		<label><input type="radio" name='filter' value="active" v-model="store.visibleType"> Active</label>
		<label><input type="radio" name='filter' value="completed" v-model="store.visibleType"> Completed</label>
	</div>
	<button v-if="store.showClearButton">clear completed</button>
</template>