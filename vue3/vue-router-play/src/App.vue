<script setup></script>

<template>
  <h1>电商平台</h1>
  <div class=".nav">
    <RouterLink to="/">我是买家</RouterLink>
    <RouterLink to="/seller">我是卖家</RouterLink>
  </div>

  <div>
    <RouterView />
  </div>
</template>
<style scoped>
  .nav {
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
  }
</style>
