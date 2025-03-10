<!-- 统一标题组件 -->
<template>
    <div
        class="titleCon mb20"
        :style="{
            justifyContent: direction || 'center'
        }"
    >
        <span class="title" :style="{ color: color }">
            {{ title }}
            <slot name="extra"></slot>
        </span>
        <div class="more" @click="goPage" v-show="more">
            更多
            <el-icon class="f16">
                <ArrowRight />
            </el-icon>
        </div>
    </div>
</template>
<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { getCurrentInstance, defineProps } from 'vue'
// import { useStore } from 'vuex'
// const store = useStore()
import router from '@/router'
const { proxy } = getCurrentInstance()
const props = defineProps({
    height: {
        type: String,
        require: false,
        default: '100'
    },
    color: {
        type: String,
        require: false,
        default: '#3c6fd0'
    },
    direction: {
        type: String,
        require: false,
        default: 'center'
    },
    more: {
        type: Boolean,
        require: false,
        default: false
    },
    title: String,
    link: String,
    tagId: Number
})
const getChildContent = async id => {
    let params = {
        sonTitle: id
    }
    const res = await proxy.$api.getChildMenuContent(params)
    if (res.code === 200) {
        store.dispatch('saveContent', res.data.list)
    }
}
const goPage = () => {
    store.dispatch('saveTagId', props.tagId)
    getChildContent(props.tagId)
    const menuMap = store.state.menuMap
    let menuName = [
        {
            name: menuMap[menuMap[props.tagId].parentCode].name,
            id: menuMap[props.tagId].parentCode
        },
        { name: props.title, id: props.tagId, type: menuMap[props.tagId].type }
    ]
    store.dispatch('saveBread', menuName)
    router.push({
        path: props.link,
        query: {
            id: props.tagId,
            type: menuMap[props.tagId].type,
            bread: menuName.map(item => item.id).join(',')
        }
    })
}
</script>
<style lang="scss" scoped>
$green: #3c6fd0;

.titleCon {
    width: 100%;
    height: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    position: relative;

    .title {
        font-size: 20px;
        font-weight: bold;
        color: $green;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: break-all;
        width: calc(100% - 80px);
        text-align: left;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .more {
        font-size: 18px;
        min-height: 25px;
        padding: 1px 10px;
        background-color: rgba(60, 111, 208, 0.5);
        color: #ffffff;
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        font-size: 16px;
        &:hover {
            background-color: $green;
        }
    }
}

</style>
