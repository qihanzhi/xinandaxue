<template>
  <p class="title">答辩需要填写的论文字段信息设置</p>
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

  <div class="bottom">请确保所有信息准确无误，以便顺利完成答辩</div>
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
      title: "个人信息",
      desc: "姓名、专业、班级、年级",
    },
    {
      title: "指导教师",
      desc: "指导教师的姓名",
    },
    {
      title: "论文信息",
      desc: "论文题目\n论文完成日期",
    },
    {
      title: "申请答辩日期",
      desc: "你希望进行答辩的具体日期",
    },
    {
      title: "论文摘要",
      desc: "概括研究目的、方法、结果和结论\n突出创新点和贡献\n包含主要结论和研究结果得出的原因",
    },
    {
      title: "论文陈述",
      desc: "陈述你对主题的主要观点\n表达你的立场或看法",
    },
    {
      title: "其他相关信息 （如果需要）",
      desc: "符合毕业要求的文章名称\n刊物名称\n文章是否为录用\n" +
       "论文工作地点\n学生所属学院\n联系电话\n档案邮寄地址\n应修学分\n实修学分\n学号\n获国家级奖项次数",
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
    title: "",
    desc: "",
  });
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

      .left {
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
