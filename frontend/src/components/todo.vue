<script setup lang="ts">
import { ref, h, onMounted } from "vue";
import List from "./list.vue";

const keyDown = function (event: any) {
  if (event.keyCode === 13) {
    addEvent();
  }
};

const content = ref("");
const list: any = ref(null);
const addEvent = () => {
  if (content.value) {
    list.value.addMethod(content.value);
    content.value = "";
  }
};

defineExpose({
  content,
});
onMounted(() => {});
// defineProps<{ msg: string }>();
</script>
<template>
  <h1>Daily Task</h1>
  <div class="card">
    <el-row>
      <div class="row">
        <el-input
          v-model="content"
          @keydown="keyDown"
          placeholder="today item"
          clearable
        />
        <el-button @click="addEvent">add</el-button>
      </div>
    </el-row>
    <el-row>
      <list ref="list" />
    </el-row>
  </div>
</template>

<style scoped>
.card {
  width: 400px;
}
.row {
  display: flex;
  width: 100%;
}
</style>
