<script setup lang="ts">
import Hello from "./components/todo.vue";
import { onMounted, ref } from "vue";
const hello:any = ref(null);
onMounted(() => {
  console.log("hello component", hello.value.content);
})
</script>

<template>
  <hello ref="hello" />
</template>

<style scoped>

</style>
