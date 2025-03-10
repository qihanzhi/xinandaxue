<!-- 统一标题组件 -->
<template>
  <div class="calendar-con">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      label-width="100px"
    >
      <div
        :class="{ 'search-max-form': false, 'search-min-form': true }"
        :style="{ height: expand ? 'auto' : '33px' }"
      >
        <div class="search-grid">
          <el-form-item
            :label="feild.name + ':'"
            :prop="feild.prop"
            v-for="feild in formFeild"
            :key="feild.prop"
          >
            <el-select
              clearable
              v-model="queryParams[feild.prop]"
              :placeholder="'请选择' + feild.name"
              v-if="feild.type === 'select'"
            >
              <el-option
                v-for="item in feild.options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-input
              v-model="queryParams[feild.prop]"
              :placeholder="'请输入' + feild.name"
              v-if="feild.type === 'input'"
            />
          </el-form-item>
        </div>
        <div class="search-tool">
          <el-button size="mini" @click="resetQuery">重置</el-button>
          <el-button type="primary" size="mini" @click="handleQuery"
            >查询</el-button
          >
          <div
            v-show="!expand && false"
            @click="
              () => {
                expand = !expand;
              }
            "
          >
            展开
            <i class="el-icon-arrow-down"></i>
          </div>
          <div
            v-show="expand && false"
            @click="
              () => {
                expand = !expand;
              }
            "
          >
            收起
            <i class="el-icon-arrow-up"></i>
          </div>
        </div>
      </div>
    </el-form>
    <el-table :data="tableData" height="200" border style="width: 100%">
      <el-table-column
        :prop="c.prop"
        :label="c.name"
        :width="c.width || 'auto'"
        v-for="c in cloumns"
        :key="c.prop"
      >
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="{ row }">
          <div class="table-tool">
            <div @click="setOpen(row, '学业生涯')">学业生涯</div>
            <div class="line"></div>
            <div @click="setOpen(row, '成长计算')">成长计算</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 学业生涯弹框 -->
    <template v-if="open">
      <TableDetail
        v-model="open"
        status="view"
        :formData="row"
        @submit="submitForm"
      ></TableDetail>
    </template>
    <!-- 成长计算配置 -->
    <el-dialog :title="title" v-model="open2" width="1200px" append-to-body>
      <el-form
        ref="dataForm"
        :model="form"
        :rules="rules"
        label-width="120px"
        :disabled="title.indexOf('查看') === 0"
        v-if="open2"
      >
      <el-button @click="reset" class="mb20">重置</el-button>
        <div class="form-grid">
          <el-tag @close="handleClose(tag)"> 成长值 </el-tag>
          =
          <div v-for="(tag, tIndex) in dynamicTags" :key="tag">
            <el-tag
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <span class="ml20" v-show="tIndex !== dynamicTags.length - 1">+</span>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
          v-show="title.indexOf('查看') !== 0"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { Notebook, Document } from "@element-plus/icons-vue";
import TableDetail from "./StudentPlan.vue";
import useGraduateStore from "@/store/modules/graduate";
const graduateStore = useGraduateStore();
const cloumns = ref([
  {
    prop: "studentNum",
    name: "学籍号",
    width: "200px",
  },
  {
    prop: "name",
    name: "姓名",
    width: "",
  },
  {
    prop: "gender",
    name: "性别",
    width: "60",
  },
  {
    prop: "nation",
    name: "民族",
    width: "60",
  },
  {
    prop: "contactNumber",
    name: "联系电话",
    width: "",
  },
]);
const tableData = ref([
  {
    id: "001",
    studentNum: "L010613199505084568",
    name: "王大海",
    gender: "男",
    nation: "汉",
    politicalStatus: "共青团员",
    dateOfBirth: "1995/05/08",
    nativePlace: "四川",
    contactNumber: "15xxxx8687",
    college: "机械学院",
    schoolYear: "2024",
    major: "机械自动化",
    classes: "自动化二班",
    card: "511624199706125874",
    transactionType: "退学",
    reasons: "因感情原因不能坚持学习，经与家里协商，申请退学",
    status: "待提交",
    contactNumber: "1544xxxx821",
    applyDate: "2024年10月16日",
    applySign: "",
    reviews: {
      secCollege: {},
      studentOffice: {},
      deanOffice: {},
      graduateCollege: {},
      handleResult: {},
      status: 0,
    },
    field_0: "",
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
    field_6: "",
    field_7: "",
    field_8: "",
    field_9: "",
    field_10: "",
    field_11: "",
    field_12: "",
    field_13: "",
    field_14: "",
    field_15: "",
    field_16: "",
    field_17: "",
    field_18: "",
    field_19: "",
    field_20: "",
    field_21: "",
    field_22: "",
    field_23: "",
    field_24: "",
    field_25: "",
    field_26: "",
  },
  {
    id: "002",
    studentNum: "L010613199207084578",
    name: "李万和",
    gender: "男",
    nation: "汉",
    politicalStatus: "共青团员",
    dateOfBirth: "1992/07/08",
    nativePlace: "四川",
    contactNumber: "15xxxx8688",
    college: "机械学院",
    schoolYear: "2024",
    major: "机械自动化",
    classes: "自动化二班",
    card: "511624199706125874",
    transactionType: "退学",
    reasons: "因感情原因不能坚持学习，经与家里协商，申请退学",
    status: "待提交",
    contactNumber: "1544xxxx821",
    applyDate: "2024年10月16日",
    applySign: "",
    reviews: {
      secCollege: {},
      studentOffice: {},
      deanOffice: {},
      graduateCollege: {},
      handleResult: {},
      status: 0,
    },
    field_0: "",
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
    field_6: "",
    field_7: "",
    field_8: "",
    field_9: "",
    field_10: "",
    field_11: "",
    field_12: "",
    field_13: "",
    field_14: "",
    field_15: "",
    field_16: "",
    field_17: "",
    field_18: "",
    field_19: "",
    field_20: "",
    field_21: "",
    field_22: "",
    field_23: "",
    field_24: "",
    field_25: "",
    field_26: "",
  },
  {
    id: "003",
    studentNum: "L010613199708087865",
    name: "赵天河",
    gender: "男",
    nation: "汉",
    politicalStatus: "党员",
    dateOfBirth: "1997/08/08",
    nativePlace: "四川",
    contactNumber: "15xxxx8688",
    college: "机械学院",
    schoolYear: "2024",
    major: "机械自动化",
    classes: "自动化二班",
    card: "511624199706125874",
    transactionType: "退学",
    reasons: "因感情原因不能坚持学习，经与家里协商，申请退学",
    status: "待提交",
    contactNumber: "1544xxxx821",
    applyDate: "2024年10月16日",
    applySign: "",
    reviews: {
      secCollege: {},
      studentOffice: {},
      deanOffice: {},
      graduateCollege: {},
      handleResult: {},
      status: 0,
    },
    field_0: "",
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
    field_6: "",
    field_7: "",
    field_8: "",
    field_9: "",
    field_10: "",
    field_11: "",
    field_12: "",
    field_13: "",
    field_14: "",
    field_15: "",
    field_16: "",
    field_17: "",
    field_18: "",
    field_19: "",
    field_20: "",
    field_21: "",
    field_22: "",
    field_23: "",
    field_24: "",
    field_25: "",
    field_26: "",
  },
  {
    id: "004",
    studentNum: "L010613199706084712",
    name: "孙禅",
    gender: "女",
    nation: "汉",
    politicalStatus: "共青团员",
    dateOfBirth: "1997/06/08",
    nativePlace: "四川",
    contactNumber: "15xxxx8688",
    college: "机械学院",
    schoolYear: "2024",
    major: "机械自动化",
    classes: "自动化二班",
    card: "511624199706125874",
    transactionType: "退学",
    reasons: "因感情原因不能坚持学习，经与家里协商，申请退学",
    status: "待提交",
    contactNumber: "1544xxxx821",
    applyDate: "2024年10月16日",
    applySign: "",
    reviews: {
      secCollege: {},
      studentOffice: {},
      deanOffice: {},
      graduateCollege: {},
      handleResult: {},
      status: 0,
    },
    field_0: "",
    field_1: "",
    field_2: "",
    field_3: "",
    field_4: "",
    field_5: "",
    field_6: "",
    field_7: "",
    field_8: "",
    field_9: "",
    field_10: "",
    field_11: "",
    field_12: "",
    field_13: "",
    field_14: "",
    field_15: "",
    field_16: "",
    field_17: "",
    field_18: "",
    field_19: "",
    field_20: "",
    field_21: "",
    field_22: "",
    field_23: "",
    field_24: "",
    field_25: "",
    field_26: "",
  },
]);

// 搜索展开
const expand = ref(false);
const queryParams = ref({
  type: "",
  name: "",
  color: "",
  pageNum: 1,
  pageSize: 10,
});
// 表单字段
const formFeild = [
  {
    name: "班级",
    prop: "type",
    type: "select",
    options: [
      "自动化1班",
      "自动化2班",
      "自动化3班",
      "自动化4班",
      "信息与计算科学1班",
      "信息与计算科学2班",
      "智能装备1班",
      "智能装备1班",
      "(研)自动化1班",
      "(研)自动化2班",
    ],
  },
  { name: "学生姓名", prop: "name", type: "input" },
  { name: "学生学籍号", prop: "name", type: "input" },
];
// 弹框
const title = ref("");
const open = ref(false);
const open2 = ref(false);
const row = ref({});
const setOpen = (rowFake, str) => {
  if (str === "成长计算") {
    open2.value = !open2.value;
  } else {
    open.value = !open.value;
  }
  row.value = rowFake;
  title.value = str;
};
const cancel = () => {
  open.value = false;
  open2.value = false;
  reset();
};
const submitForm = () => {
  open.value = false;
  open2.value = false;
};
const dynamicTags = ref([
  "思想成长",
  "社会实践",
  "创新创业",
  "文体活动",
  "劳动服务",
]);
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};
const reset = ()=>{
  dynamicTags.value = [
  "思想成长",
  "社会实践",
  "创新创业",
  "文体活动",
  "劳动服务",
];
}
onMounted(() => {});
</script>
<style lang="scss" scoped>
$blue: #3c6fd0;
$green: #33a92d;
$red: #c03639;
.blue {
  color: $blue;
  font-weight: bold;
}
.green {
  color: $green;
  font-weight: bold;
}
.red {
  color: $red;
  font-weight: bold;
}
.openText {
  color: #666666;
  line-height: 36px;
}
.grid_2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  line-height: 36px;
}
.title1 {
  font-size: 18px;
  color: $blue;
  font-weight: bold;
  line-height: 36px;
}
.title2 {
  font-size: 16px;
  color: #666;
  line-height: 36px;
  background-color: aliceblue;
}
.planColorBlock {
  border-radius: 6px;
  background-color: aliceblue;
  padding: 20px;
}
.line36 {
  line-height: 36px;
}
.form-grid {
  display: flex;
  gap: 20px;
  height: 60px;
}
</style>
