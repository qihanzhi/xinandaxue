<template>
  <p class="title">评阅查重需要填写的论文字段信息设置</p>
  <div class="operator">
    <template v-if="!state.edit">
      <el-button @click="edit">编辑</el-button>
    </template>
    <template v-else>
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button @click="cancel">取消</el-button>
      <el-button @click="add" icon="plus">新增</el-button>
    </template>
  </div>
  <div class="content">
    <div class="row card" v-for="(item, index) in questList.data" :key="index">
      <div class="title">
        <template v-if="state.edit">
          <div class="left">
           <div class="label">题干：</div>
           <el-input
              v-model="item.title"
              :placeholder="'请输入字段名'"
              clearable
            ></el-input>
          </div>
          <div class="right">
            <el-button
                      type="danger"
                      icon="Delete"
                      link
                      @click="delCheckedOption(index)"
                    ></el-button>
          </div>
        </template>
        <template v-else>
          <div class="left">{{ item.title }}</div>
        </template>
      </div>
      <div class="desc">
        <template v-if="state.edit">
          <div class="label">描述：</div>
          <el-input
            type="textarea"
            v-model="item.desc"
            :placeholder="'请输入描述信息'"
            :autosize="{ minRows: 4, maxRows: 6 }"
            clearable
          ></el-input>
        </template>
        <template v-else>
          <div v-html="textAreaFormat(item.desc)"></div>
        </template>
      </div>
    </div>
  </div>

  <div class="bottom">
    请确保所有信息准确无误，并按照指定的格式和要求填写
  </div>
</template>

<script setup>
import { reactive } from "vue";

import { selectToLabel, multiToLabel, textAreaFormat } from "@/utils/form";

const activeName = ref("first");
const state = reactive({
  edit: false,
});

const questList = reactive({
  data: [
    {
      title: "论文选题与综述",
      desc: "论文的理论意义或实用价值\n阅读文献的广泛性和综述的全面性\n对国内外研究动态的掌握情况",
    },
    {
      title: "基础理论和专门知识",
      desc: "论文中涉及的基础理论和专门知识是否扎实",
    },
    {
      title: "总体评价",
      desc: "对论文的整体评价，包括创新性、实用性、深度和广度等",
    },
    {
      title: "主要创新点 （如有） ",
      desc: "论文中的创新之处，包括新的见解、方法或结果",
    },
    {
      title: "论文规范性",
      desc: "论文的格式、结构、引用等是否符合学术规范",
    },
    {
      title: "工作量 ",
      desc: "论文的研究工作量是否适中，是否体现了作者投入的时间和精力",
    },
    {
      title: "评阅教师评分 （如果适用）",
      desc: "根据论文的表现，给出一个合理的分数",
    },
    {
      title: "评阅人签名 ",
      desc: "评阅人签名和日期，以证明评阅已经完成",
    },
  ],
});

const handleClick = (tab) => {};

// 删除已经有的题干项
const delCheckedOption = (index) => {
  questList.data.splice(index, 1);
};

const add = () => {
  questList.data.push({
    title: '',
    desc: ''
  })
};
const edit = () => {
  state.edit = true;
};
const cancel = () => {
  state.edit = false;
};
const submit = () => {
  cancel();
};


</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10.5px;
  background: rgba(255, 255, 255, 0.7);
}

.title {
  margin-bottom: 20px;
}
.operator {
  margin-bottom: 20px;
}
.content {

  .row {
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #ccc;

    .label {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      width: 60px;
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 600;
      line-height: 26px;
      

      .left{
        margin-right: 10px;
        width: 600px;
        display: flex;
      }
      
    }

    .desc {
      width: 600px;
      color: #666;
      display: flex;
    }
  }
}
.bottom {
  margin-bottom: 20px;
  font-style: italic;
  color: #999;
}
</style>
