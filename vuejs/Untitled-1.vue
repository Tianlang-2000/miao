<template>
	<div :style="{width,height}" class="relative border border-black">
    <img :src="imgs[currentIdx]" class="w-full h-full"/>
    <button
      @click="prev"
      class="absolute h-4 top-1/2 -translate-y-1/2">
      prev
    </button>
    <button
      @click="next"
      class="absolute h-4 top-1/2 right-0 -translate-y-1/2">
      next
    </button>
    <ul class="flex absolute bottom-0 w-full justify-center">
      <li 
        v-for="(url, idx) of imgs"
        :key="url"
        @click="currentIdx = idx"
        :class="{
        'bg-red-500': currentIdx == idx,
        'bg-slate-500': currentIdx != idx
        }"
        class="cursor-pointer w-1 h-1 rounded-full"></li>
      </ul>
      <foo-bar></foo-bar>
  </div>
</template>

<script>
  export default {
      props: {
        imgs: Array,
        width: {
          type: [Number, String],
          default: "300px" 
        },
        height: {
          type: [Number, String],
          default: "200px"
        },
        autoplay: Boolean,
      },
      data() {
        return {
          currentIdx: 0,
        }
      },
      methods: {
        prev() {
          this.currentIdx--
          if(this.currentIdx == -1) {
            this.currentIdx = this.imgs.length - 1
          }
        },
        next() {
          this.currentIdx++
          if(this.currentIdx == this.imgs.length) {
            this.currentIdx = 0
          }
        },
      },
      mounted() {
          if(this.autoplay) {
            this.autoplayIntervalId = setInterval(() => {
              this.next()
            }, 2000)
          }
        },
      beforeDestroy() {
        clearInterval(this.autoplayIntervalId)
      }
    }

    new Vue(options)
</script>
<style scoped>
  /* 只能选中组件里的标签做css */
</style>