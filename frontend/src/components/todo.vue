<script setup lang="ts">
import { ref, h, onMounted, nextTick } from "vue";

const keyDown = function (event: any) {
    if (event.keyCode === 13) {
        addEvent();
    }
};

// content
import List from "./list.vue";
const content = ref("");
const list: any = ref(null);
const addEvent = () => {
    if (content.value) {
        list.value.addMethod(content.value);
        content.value = "";
    }
};

// cotalog
import Cotalog from "./cotalog.vue";
const cotalog: any = ref(null);
function changedCotalog (id:string) {
  currentCotalogId.value = id
  nextTick(() => {
    list.value.initList()
  })
  console.log('changed cotalog', id)
}
const currentCotalogId = ref('')
defineExpose({
    content,
});
onMounted(() => {});
// defineProps<{ msg: string }>();
</script>
<template>
    <div class="container">
        <div class="cotalog">
            <cotalog @changed="changedCotalog"></cotalog>
        </div>
        <div class="main">
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
                    <list ref="list" :cotalogId="currentCotalogId"/>
                </el-row>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: start;
    width: 100%;
    height: 100%;
}
.cotalog {
    margin-top: 50px;
}
.card {
    width: 400px;
}
.row {
    display: flex;
    width: 100%;
}
</style>
