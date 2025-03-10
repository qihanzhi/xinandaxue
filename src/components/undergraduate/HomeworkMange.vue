<!-- 统一标题组件 -->
<template>
  <div class="calendar-con">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      label-width="100px"
      v-show="false"
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
      <el-table-column label="操作" width="80">
        <template v-slot="{ row }">
          <div class="table-tool">
            <div @click="setOpen(row, '提交')" v-show="row.nation==='未提交'">提交</div>
            <div @click="setOpen(row, '提交')" v-show="row.nation!=='未提交'">查看</div>
            <!-- <div class="line"></div>
            <div @click="setOpen(row, '成长计算')" v-show="!lock">成长计算</div> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 提交作业 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body>
      <div class="openText">
        <div>学籍：L010613199505084568</div>
        <div>姓名：王大海</div>
        <div v-show="row.nation!=='已提交'">
        上传：
        <el-upload
          class="upload-demo"
          drag
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖拽到此处 或 <em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">作业文件小于100M</div>
          </template>
        </el-upload>
      </div>
      <div v-show="row.nation==='已提交'">
        作业：
        <div class="pl20" v-for="f in fileList">{{ f.name }}</div>
      </div>
      <div v-show="row.nation==='已提交'">
        得分：<span class="bigRed">98</span>
      </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>   
        <el-button
          type="primary"
          @click="submitForm(2, row)"
          v-show="row.nation!=='已提交'"
          >提 交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { UploadFilled, Document } from "@element-plus/icons-vue";
import TableDetail from "./StudentPlan.vue";
import useGraduateStore from "@/store/modules/graduate";
const graduateStore = useGraduateStore();
const { proxy } = getCurrentInstance();
const cloumns = ref([
  {
    prop: "studentNum",
    name: "科目",
    width: "200",
  },
  {
    prop: "name",
    name: "作业内容",
    width: "",
  },
  {
    prop: "gender",
    name: "提交截止日期",
    width: "120",
  },
  {
    prop: "nation",
    name: "状态",
    width: "80",
  },
]);
const tableData = ref([
  {
    id: "001",
    studentNum: "高等数学",
    name: "课后习题1-3题",
    gender: "2024/10/08",
    nation: "已提交",
    politicalStatus: "共青团员",
    dateOfBirth: "1995/05/08",
    nativePlace: "四川",
    contactNumber: "1588888687",
    college: "机械学院",
    schoolYear: "2024",
    major: "机械自动化",
    classes: "自动化二班",
    card: "511624199706125874",
    transactionType: "退学",
    reasons: "因感情原因不能坚持学习，经与家里协商，申请退学",
    status: "待提交",
    contactNumber: "15447845821",
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
    studentNum: "线性代数",
    name: "课后习题2-3题",
    gender: "2024/10/18",
    nation: "已提交",
    politicalStatus: "共青团员",
    dateOfBirth: "1992/07/08",
    nativePlace: "四川",
    contactNumber: "1588888688",
    college: "机械学院",
    schoolYear: "2024",
    major: "机械自动化",
    classes: "自动化二班",
    card: "511624199706125874",
    transactionType: "退学",
    reasons: "因感情原因不能坚持学习，经与家里协商，申请退学",
    status: "待提交",
    contactNumber: "15447845821",
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
    studentNum: "思想道德修养与法律基础",
    name: "任选课题的问卷调查和报告",
    gender: "2024/10/24",
    nation: "已提交",
    politicalStatus: "党员",
    dateOfBirth: "1997/08/08",
    nativePlace: "四川",
    contactNumber: "1588888688",
    college: "机械学院",
    schoolYear: "2024",
    major: "机械自动化",
    classes: "自动化二班",
    card: "511624199706125874",
    transactionType: "退学",
    reasons: "因感情原因不能坚持学习，经与家里协商，申请退学",
    status: "待提交",
    contactNumber: "15447845821",
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
    studentNum: "C语言",
    name: "课后习题1-3题",
    gender: "2024/11/08",
    nation: "未提交",
    politicalStatus: "共青团员",
    dateOfBirth: "1997/06/08",
    nativePlace: "四川",
    contactNumber: "1588888688",
    college: "机械学院",
    schoolYear: "2024",
    major: "机械自动化",
    classes: "自动化二班",
    card: "511624199706125874",
    transactionType: "退学",
    reasons: "因感情原因不能坚持学习，经与家里协商，申请退学",
    status: "待提交",
    contactNumber: "15447845821",
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
const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])
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
const row = ref({});
const setOpen = (rowFake, str) => {
  open.value = !open.value;
  row.value = rowFake;
  title.value = str;
};
const cancel = () => {
  open.value = false;
};
const submitForm = (index, row) => {
  open.value = false;
  row.nation = "已提交";
  proxy.$modal.msgSuccess("已提交至"+row.studentNum+"齐浒老师进行批改。");
};
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
.bigRed{
  font-size: 36px;
  color: $red;
}
</style>
