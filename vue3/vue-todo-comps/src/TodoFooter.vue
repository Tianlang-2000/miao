<script setup>
	// 单引一个计算属性
	import {computed} from 'vue'
	// 定义“形参”
	var props = defineProps(['todos', 'visibleType'])
	let emit = defineEmits(['visible-type-change'])

	var showClearButton = computed(() => props.todos.some(it => it.completed))
</script>
<template>
	<div>{{ todos.filter(it => it.computed == false).length }} items left</div>
	<div>
		<!----
			checked负责视觉效果，里边是个判断，而vtc事件把这次点击的数据给到了父组件，让父组件去改数据
		----->
		<label><input type="radio" name='filter' :checked="visibleType == 'all'" @click="$emit('visible-type-change', 'all')"> All</label>
		<label><input type="radio" name='filter' :checked="visibleType == 'active'" @click="$emit('visible-type-change', 'active')"> Active</label>
		<label><input type="radio" name='filter' :checked="visibleType == 'complated'" @click="$emit('visible-type-change', 'complated')"> Complated</label>
	</div>
	<button v-if="showClearButton">clear completed</button>
</template>