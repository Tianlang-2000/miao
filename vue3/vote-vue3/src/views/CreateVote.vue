<template>
	<div>创建{{ type }}投票界面</div>
	<el-input v-model="title" size="large" />
	<input type="text" class="border rounded outline-none focus:ring m-2 text-lg" placeholder="投票标题">
	<input type="text" class="border rounded outline-none focus:ring m-2" placeholder="补充描述（选填）">
	<input type="text" class="border rounded outline-none focus:ring m-2" placeholder="选项">
	<input type="text" class="border rounded outline-none focus:ring m-2" placeholder="选项">
	<button>添加选项</button>
	<div>
		截止日期
		<el-date-picker
        v-model="deadline"
        type="datetime"
        placeholder="Select date and time"
      />
	</div>
	<div>
		匿名投票
		<input type="checkbox">
	</div>
</template>

<script setup lang="ts">
	import { ref,computed } from 'vue'
	import { useRoute } from 'vue-router'

	let route = useRoute()
	let type = computed(() => route.query.type == 'single' ? '单选': '多选')

	let deadline = ref(null)
	let title = ref('')
</script>