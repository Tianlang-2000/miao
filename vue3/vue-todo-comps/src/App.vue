<script setup>
  import TodoFooter from './TodoFooter.vue';
  import TodoHeader from './TodoHeader.vue';
  import Todolist from './Todolist.vue';
  import { ref, reactive } from 'vue';

/* --------- 数据模型 -------*/

  const todos = ref ([
    {
      id: Math.random().toString(),
      text: 'eat',
      completed: true
    },
    {
      id: Math.random().toString(),
      text: 'sleep',
      completed: false
    }
  ])
// 当前列表可见类型，关联todofooter组件
  const visibleType = ref('all')

/* --------- 业务函数 -------*/
// todoheader中的全选和添加
function toggleAll() {
  const allDone = todos.value.every(item => item.completed === true)
  todos.value.forEach(item => (item.completed = !allDone))
}
function addTodo(text) {
  todos.value.push(
    {
      id: Math.random().toString,
      text,
      completed: false
    }
  )
}
// todolist中的业务
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
</script>

<template>
   <div>
    <TodoHeader
      :todos="todos"
      @add-todo="addTodo"
      @toggle-all="toggleAll"
    />
    <Todolist
      :visible-type="visibleType"
      :todos="todos"
      @todo-status-change="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <TodoFooter
      :todos="todos"
      :visible-type="visibleType"
      @visible-type-change="visibleType = $event"  
    />
    
   </div>
</template>


