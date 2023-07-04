<script lang="ts" setup>
interface ItodoItem {
    state: boolean;
    content: string;
    id: string;
}
interface IFetch {
    code: number;
    data: any;
}
import { onMounted, reactive, ref, watch } from "vue";

//
import { request } from "../tools/fetch.ts";
let list: ItodoItem[] = reactive([]);
const initList = () => {
    list.splice(0)
    // console.log($http)
    request("http://127.0.0.1:3000/list", {}).then((res: IFetch) => {
        console.log("fetrequestch response", res);
        if (res.code === 0) {
            const data: ItodoItem[] = res.data;
            data.forEach((d) => {
                list.push({...d, state: !!d.state});
            });
        }
    });
};
onMounted(() => {
    console.log(this);
    initList();
});
// 操作
const addMethod = function (content: string) {
    const item = {
        content: content,
        state: false,
        // id: getId(), 交给后台生成id
    };
    const config = {
        method: "POST",
        body: JSON.stringify({ data: item }),
    };
    request("http://127.0.0.1:3000/add", config).then((res: IFetch) => {
        if (res.code === 0) {
            // 添加成功，更新
            initList();
        }
    });
};
const delMethod = function (id: string) {
    const config = {
        method: "POST",
        body: JSON.stringify({ data: {id: id} }),
    };
    request("http://127.0.0.1:3000/del", config).then((res: IFetch) => {
        if (res.code === 0) {
            // 删除成功，更新
            initList();
        }
    });
};
const updateMethod = function (id:string, state: boolean, content: string) {
    const config = {
        method: "POST",
        body: JSON.stringify({ data: {id: id, state: state ? 1 : 0, content: content} }),
    };
    request("http://127.0.0.1:3000/update", config).then((res: IFetch) => {
        if (res.code === 0) {
            console.log('更新成功')
        }
    });
}
const changeState = function (item:ItodoItem) {
    updateMethod(item.id, item.state, item.content)
}
// 生成id
const currentId: Ref<number> = ref(1);
const getId = function (): string {
    currentId.value++;
    return currentId.value + "";
};
defineExpose({
    addMethod: addMethod,
    list: list,
});

// 状态筛选
import type { Ref } from "vue";
const filter: Ref<"" | "active" | "completed"> = ref("");
watch(filter, (filter, prevFilter) => {
    console.log("filter", filter);
});
</script>

<template>
    <div class="list">
        <div
            class="item"
            v-for="item in list"
            v-bind:key="item.id"
            v-show="
                !filter ||
                (filter === 'active' && !item.state) ||
                (filter === 'completed' && item.state)
            "
        >
            <el-checkbox v-model="item.state" :label="item.content" @change="changeState(item)"/>
            <el-icon class="close" @click="delMethod(item.id)"
                ><Close
            /></el-icon>
        </div>
    </div>

    <el-row>
        <el-col>
            <el-button :text="filter !== ''" @click="filter = ''"
                >All</el-button
            >
            <el-button :text="filter !== 'active'" @click="filter = 'active'"
                >Active</el-button
            >
            <el-button
                :text="filter !== 'completed'"
                @click="filter = 'completed'"
                >Completed</el-button
            >
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.list {
    min-height: 50px;
    width: 100%;
}
.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    width: 90%;
    padding: 0 10px;
    .close {
        float: right;
    }
}
</style>
