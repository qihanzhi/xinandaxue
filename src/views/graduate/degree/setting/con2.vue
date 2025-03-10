<template>
  <p class="title">论文查重需要填写的论文字段信息设置</p>
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
      title: "标题",
      desc: "论文的标题应准确反映论文的主要内容和研究范围",
    },
    {
      title: "摘要",
      desc: "摘要是对论文内容的简短总结，通常包括研究目的、方法、结果和结论",
    },
    {
      title: "正文 ",
      desc: "正文是论文的主体部分，包含引言、文献综述、研究方法、实验设计、数据分析、结果讨论等",
    },
    {
      title: "参考文献 ",
      desc: "列出所有引用的文献，确保遵循相应的引用格式",
    },
    {
      title: "致谢",
      desc: "对参与研究的人员、机构以及提供的帮助表示感谢",
    },
    {
      title: "附录",
      desc: "如有必要，可以包括一些补充材料，如数据表格、实验代码等",
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
