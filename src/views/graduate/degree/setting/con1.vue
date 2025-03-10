<template>
  <p class="title">预答辩需要填写的论文字段信息设置</p>
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
      title: "论文标题",
      desc: "学位论文的正式名称",
    },
    {
      title: "研究背景与意义",
      desc: "阐述研究的背景信息，包括研究领域的现状和重要性\n解释研究对于学术领域或实践领域的意义",
    },
    {
      title: "研究目的与问题 ",
      desc: "明确研究的具体目标或目的\n列出研究旨在解决的问题或探讨的主题",
    },
    {
      title: "研究范围与限制 ",
      desc: "描述研究的范围，包括涵盖的主题和排除的主题\n讨论研究的潜在限制，如样本大小、数据收集方法等",
    },
    {
      title: "文献综述",
      desc: "概述国内外在该领域的研究现状\n指出研究中的空白和不足之处\n对相关文献进行评述和评价",
    },
    {
      title: "研究方法",
      desc: "详细描述研究设计，包括实验设计、数据收集方法等\n介绍研究工具与指标，以及样本选择标准\n阐述研究流程和操作步骤",
    },
    {
      title: "研究结果与讨论",
      desc: "报告研究的主要发现或结果\n对结果进行讨论，解释其意义和影响",
    },
    {
      title: "预答辩委员会结果",
      desc: "记录预答辩委员会对论文的评价和反馈\n包括预答辩委员会成员的意见和表决结果",
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
