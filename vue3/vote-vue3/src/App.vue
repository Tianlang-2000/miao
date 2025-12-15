<script setup lang="ts">
import { useVoteStore } from './stores/vote';
import {RouterLink, RouterView } from 'vue-router'

let voteStore = useVoteStore()
await voteStore.getUserInfo()
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
