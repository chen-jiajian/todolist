<template>
    <div class="term" v-for="i in list" :key="i.id">
        <span
            class="text"
            :class="{ active: i.id === activeCotalogId }"
            @click="change(i.id)"
        >
            {{ i.title }}
        </span>
        <el-icon class="close" @click="delCotalog(i)"><Close /></el-icon>
    </div>
    <el-row>
        <el-input
            v-if="addIpt"
            v-model="addVal"
            @keydown="keyDown"
            style="width: 200px"
        ></el-input>
    </el-row>
    <el-row style="display: flex; justify-content: center">
        <el-button v-show="!addIpt" @click="addIpt = true" text>add</el-button>
        <el-button v-show="addIpt" @click="addItem(addVal)" text
            >ensure</el-button
        >
    </el-row>
</template>

<script setup lang="ts">
import { request } from "../tools/fetch.ts";
import { onMounted, reactive, Ref, ref } from "vue";
interface IFetch {
    code: number;
    data: any;
}

let list: Ref<any> = ref([
    { id: 1, text: "0710日程" },
    { id: 2, text: "0711日程" },
]);

const activeCotalogId = ref("");

const addIpt = ref(false);
const addVal = ref("");
const addItem = function (title: string) {
    const item = { title: title };
    const config = {
        method: "POST",
        body: JSON.stringify({ data: item }),
    };
    request("http://127.0.0.1:3000/cotalog/add", config).then((res: IFetch) => {
        console.log("cotalog", res);
        if (res.code === 0) {
            addIpt.value = false;
            getList();
        }
    });
};
const keyDown = function (event: any) {
    if (event.keyCode === 13) {
        addItem(addVal.value);
    }
};

import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
const delCotalog = function (item: { title: string; id: string }) {
    ElMessageBox.alert(
        "Are you ensure that delete this cotalog：" + item.title,
        "Warn",
        {
            confirmButtonText: "OK",
            callback: (action: Action) => {
                request(
                    "http://127.0.0.1:3000/cotalog/delete?id=" + item.id,
                    {}
                ).then((res: IFetch) => {
                    if (res.code === 0) {
                        ElMessage({
                            type: "success",
                            message: "delete success",
                        });
                        getList()
                    }
                });
            },
        }
    );
};

const emit = defineEmits<{ changed: [id: string] }>();
const change = function (id: string) {
    activeCotalogId.value = id;
    emit("changed", id);
};
const getList = () => {
    request("http://127.0.0.1:3000/cotalog", {}).then((res: IFetch) => {
        console.log("cotalog", res);
        if (res.code === 0) {
            list.value = res.data;
        }
    });
};
onMounted(() => {
    getList();
});
</script>

<style scoped lang="scss">
.term {
    height: 50px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #bebebe;
    &:last-child {
        margin-bottom: 20px;
        border: none;
    }
    .text {
        cursor: pointer;
        &.active {
            color: rgb(18, 155, 234);
        }
    }
}
</style>
