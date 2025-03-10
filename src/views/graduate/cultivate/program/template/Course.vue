<template>
    <div class="title-square">课程设置</div>
    <!-- 课程表格 -->
    <el-row :gutter="10" class="mb12 mt20">
      <el-col :span="1.5" v-for="(t, index) in tableTools" :key="index">
        <el-button
          :type="t.type"
          :icon="t.icon"
          size="mini"
          :plain="t.plain"
          :disabled="lock"
          @click="t.func"
          >{{ t.name }}</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      height="250"
      style="width: 100%"
      class="mb20"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        :prop="c.prop"
        :label="c.name"
        :width="c.width || 'auto'"
        v-for="c in cloumns"
        :key="c.prop"
      />
      <el-table-column label="操作" width="160" v-if="!lock">
        <template v-slot="{ row }">
          <div class="table-tool">
            <div @click="handleSee(row)">查看</div>
            <div class="line"></div>
            <div class="red" @click="handleDelete(row)">删除</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="title-square">学分要求统计</div>
    <el-row :gutter="10" class="mb12 mt20">
      <el-col :span="1.5" v-for="(t, index) in tableTools2" :key="index">
        <el-button
          :type="t.type"
          :icon="t.icon"
          size="mini"
          :plain="t.plain"
          :disabled="lock"
          @click="t.func"
          >{{ t.name }}</el-button
        >
      </el-col>
    </el-row>
    <el-table
      :data="tableData2"
      height="250"
      @selection-change="handleSelectionChange2"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        :prop="c.prop"
        :label="c.name"
        :width="c.width || 'auto'"
        v-for="c in cloumns2"
        :key="c.prop"
      />
      <el-table-column label="操作" width="160" v-if="!lock">
        <template v-slot="{ row }">
          <div class="table-tool">
            <div @click="handleUpdate2(row)">修改</div>
            <div class="line"></div>
            <div class="red" @click="handleDelete2(row)">删除</div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增课程 -->
    <el-dialog
      :title="title"
      v-model="addCourse.open"
      width="1200px"
      append-to-body
    >
      <div v-for="feild in addCourse.formFeild">
        <!-- 分级多选select -->
        <div v-if="feild.type === 'groupSelect'" class="form-item">
          <el-select
            v-model="addCourse.queryParams[feild.prop]"
            :placeholder="'请选择' + feild.name"
            clearable
            collapse-tags
            popper-class="custom-header"
          >
            <el-option-group
              v-for="group in feild.options"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.value"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-option-group>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看课程 -->
    <el-dialog
      :title="title"
      v-model="addCourse.open2"
      width="1200px"
      append-to-body
    >
      <div class="grid_2">
        <div v-for="feild in addCourse.formFeild2">
          {{ feild.name }}：{{ addCourse.queryParams2[feild.prop] }}
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增学分 -->
    <el-dialog
      :title="title"
      v-model="addScore.open"
      width="1200px"
      append-to-body
    >
      <div class="grid_2">
        <div v-for="feild in addScore.formFeild">
          {{ feild.name }}:
          <el-input
            v-model="addScore.queryParams[feild.prop]"
            :placeholder="'请输入' + feild.name"
          />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm2">确 定</el-button>
      </div>
    </el-dialog>
</template>
  
<script setup>
import { WarningFilled, Document } from "@element-plus/icons-vue";
import useScheduleStore from "@/store/modules/schedule";
import { getIndexByAttr } from "@/utils";
import { takeRightWhile } from "lodash";
const { proxy } = getCurrentInstance();
const dataStore = useScheduleStore();
const lock = ref(false);
// 选择历史方案/自定义方案
const scheme = ref(1);
const schemeDetail = ref(false);
const detailSelected = ref(1);
const title = ref("");
const queryParams0 = ref({
  field_0: "计算机科学与技术学院",
  field_1: "2024-2025",
  field_2: "计算机网络技术",
});
// 表单字段
const formFeild0 = [
  {
    name: "院系",
    prop: "field_0",
    type: "select",
    options: [
      "信息工程学院",
      "环境与资源学院",
      "制造科学与工程学院",
      "计算机科学与技术学院",
      "数理学院",
      "法学院",
      "外国语学院",
      "体育与健康学院",
      "工程技术学院",
    ],
  },
  {
    name: "年级",
    prop: "field_1",
    type: "select",
    options: ["2023-2024", "2024-2025"],
  },
  {
    name: "专业",
    prop: "field_2",
    type: "select",
    options: ["计算机网络技术"],
  },
];
const queryParams = ref({
  field_0: "2024350301",
  field_1: "2024计算机网络技术",
  field_2: "50301",
  field_3: "计算机网络技术",
  field_4: "本校区",
  field_5: 3,
  field_6: 3,
  field_7: 6,
  field_8: 160.0,
  field_9: "学士",
  field_10: "高考统招",
  field_11:
    "学生需要具备良好的品德修养、心理素质和社会责任感，如工商管理专业要求学生具有社会责任感、良好的品德修养和心理素质‌。信息与计算科学专业要求学生具备爱岗敬业、遵纪守法、团结合作的品质‌。生物工程专业则要求学生具备正确的世界观、人生观和价值观‌。",
  field_12:
    "‌大学生培养目标‌是指依据国家的教育目的和各级各类学校的性质、任务提出的具体培养要求，旨在培养德智体等全面发展的人才，特别是社会主义事业的建设者和接班人‌。",
});

// 表单字段
const formFeild = [
  {
    name: "年级专业代码",
    prop: "field_0",
    type: "input",
  },
  {
    name: "年级专业名称",
    prop: "field_1",
    type: "input",
  },
  {
    name: "专业代码",
    prop: "field_2",
    type: "input",
  },
  {
    name: "专业名称",
    prop: "field_3",
    type: "input",
  },
  {
    name: "上课校区",
    prop: "field_4",
    type: "select",
    options: ["本校区", "东校区"],
  },
  {
    name: "学制",
    prop: "field_5",
    type: "input",
  },
  {
    name: "最短修读年限",
    prop: "field_6",
    type: "input",
  },
  {
    name: "最长修读年限",
    prop: "field_7",
    type: "input",
  },
  {
    name: "毕业总学分要求",
    prop: "field_8",
    type: "input",
  },
  {
    name: "授予学位",
    prop: "field_9",
    type: "select",
    options: ["学士", "硕士", "博士"],
  },
  {
    name: "招生方式",
    prop: "field_10",
    type: "select",
    options: [
      "保送生招生",
      "体育单招",
      "公费师范生",
      "强基计划招生",
      "自主招生录取",
      "高考统招",
      "定向招生",
    ],
  },
  { name: "" },
  {
    name: "培养规格要求",
    prop: "field_11",
    type: "textarea",
  },
  {
    name: "培养目标",
    prop: "field_12",
    type: "textarea",
  },
];
// 表格-课程设置
const tableData = ref([
  {
    field_0: 1,
    field_1: "Basic C Programming",
    field_2: "03102721",
    field_3: "C程序设计基础",
    field_4: "1",
    field_5: "3",
    field_6: "70",
    field_7: "专业必修课",
    field_8: "必修",
    field_9: "通识必修",
    field_10: "计算机科学与技术学院",
    field_16: "已审批",
    field_12: "李想",
  },
  {
    field_0: 2,
    field_1: "Advanced Mathematics",
    field_2: "03102741",
    field_3: "高等数学",
    field_4: "1",
    field_5: "3",
    field_6: "80",
    field_7: "专业必修课",
    field_8: "必修",
    field_9: "通识必修",
    field_10: "数理学院",
    field_16: "已审批",
    field_12: "张海平",
  },
]);
const cloumns = ref([
  { name: "序号", prop: "field_0", width: 70 },
  { name: "审批状态", prop: "field_16" },
  { name: "课程编号", prop: "field_2" },
  { name: "课程名称", prop: "field_3" },
  { name: "开课学期", prop: "field_4", width: 90 },
  { name: "学分", prop: "field_5", width: 70 },
  { name: "总学时", prop: "field_6", width: 80 },
  { name: "课程类型", prop: "field_7" },
  { name: "课程性质", prop: "field_8", width: 90 },
]);
const ids = ref([]);
// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = [];
  selection.forEach((s) => {
    ids.value.push(getIndexByAttr(tableData.value, "field_0", s.field_0));
  });
}
// 新增课程
const addCourse = ref({
  open: false,
  open2: false,
  queryParams: { field_0: "环境毒理学" },
  formFeild: [
    {
      name: "课程",
      prop: "field_0",
      type: "groupSelect",
      options: [
        {
          label: "自动化",
          value: ["控制理论", "工程制图", "检测技术", "电动与机动"],
        },
        {
          label: "(研)自动化",
          value: ["工程测量学", "环境毒理学", "微生物学基础"],
        },
      ],
    },
  ],
  queryParams2: { field_0: "环境毒理学" },
  formFeild2: [
    { name: "课程编号", prop: "field_2" },
    { name: "课程英文名称", prop: "field_1" },
    { name: "课程名称", prop: "field_3" },
    { name: "课程简称", prop: "field_3" },
    // { name: "是否有效", prop: "field_4" },
    { name: "学分", prop: "field_5" },
    { name: "总学时", prop: "field_6" },
    { name: "课程类别", prop: "field_7" },
    { name: "课程性质", prop: "field_8" },
    { name: "课程属性", prop: "field_9" },
    { name: "开课院系", prop: "field_10" },
    { name: "开课专业", prop: "field_11" },
    { name: "课程负责人", prop: "field_12" },
    { name: "周学时", prop: "field_13" },
    { name: "课程教研室", prop: "field_14" },
    { name: "集中实训课", prop: "field_15" },
  ],
});
const tableTools = ref([
  {
    name: "新增",
    type: "primary",
    plain: false,
    icon: "CirclePlus",
    func: () => {
      title.value = "新增课程";
      addCourse.value.open = true;
    },
  },
  {
    name: "批量删除",
    type: "danger",
    plain: true,
    icon: "Delete",
    func: () => {
      handleDelete();
    },
  },
]);
const cancel = () => {
  addCourse.value.open = false;
  addCourse.value.open2 = false;
  addScore.value.open = false;
};
const submitForm = () => {
  tableData.value.push({
    field_0: 3,
    field_1: "Environmental Toxicology",
    field_2: "03102751",
    field_3: "环境毒理学",
    field_4: "1",
    field_5: "3",
    field_6: "80",
    field_7: "专业必修课",
    field_8: "必修",
    field_9: "通识必修",
    field_10: "农业与生物学院",
    field_12: "曾辉",
    field_16: "已审批",
  });
  cancel();
};
const handleDelete = (row) => {
  if (row instanceof PointerEvent || !row) {
    // 批量
    if (ids.value.length === 0) {
      proxy.$modal.msgError("请先勾选数据");
    } else {
      proxy.$modal
        .confirm("是否确认删除?")
        .then(() => {
          let temp = [];
          tableData.value.forEach((o, oIndex) => {
            if (!ids.value.includes(oIndex)) {
              temp.push(o);
            }
          });
          tableData.value = temp;
          dataStore.setData(tableData.value);
          proxy.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    }
  } else {
    const index = getIndexByAttr(tableData.value, "field_0", row.field_0);
    proxy.$modal
      .confirm("是否确认删除?")
      .then(() => {
        tableData.value.splice(index, 1);
        proxy.$modal.msgSuccess("删除成功");
      })
      .catch(() => {});
  }
};
const handleSee = (row) => {
  title.value = "查看" + row.field_3;
  addCourse.value.open2 = true;
  addCourse.value.queryParams2 = row;
};
// 表格-学分要求统计
const tableData2 = ref([
  {
    field_0: 1,
    field_1: "公开基础课",
    field_2: 20,
    field_3: 20,
    field_4: 0,
    field_5: 0,
  },
]);
const cloumns2 = ref([
  { name: "序号", prop: "field_0", width: 70 },
  { name: "课程性质", prop: "field_1" },
  { name: "最低学分要求", prop: "field_2" },
  { name: "最低学时要求", prop: "field_3" },
  { name: "已安排总学分", prop: "field_4" },
  { name: "已安排总学时", prop: "field_5" },
]);
const tableTools2 = ref([
  {
    name: "新增",
    type: "primary",
    plain: false,
    icon: "CirclePlus",
    func: () => {
      title.value = "新增学分要求";
      addScore.value.open = true;
    },
  },
  {
    name: "批量删除",
    type: "danger",
    plain: true,
    icon: "Delete",
    func: () => {
      handleDelete2();
    },
  },
]);
// 新增学分
const addScore = ref({
  open: false,
  open2: false,
  queryParams: {
    field_0: "2",
    field_1: "专业基础课",
    field_2: "18",
    field_3: "30",
    field_4: "0",
    field_5: "0",
  },
  formFeild: [
    {
      name: "课程性质",
      prop: "field_1",
      type: "input",
    },
    {
      name: "最低学分要求",
      prop: "field_2",
      type: "input",
    },
    {
      name: "最低学时要求",
      prop: "field_3",
      type: "input",
    },
    {
      name: "已安排总学分",
      prop: "field_4",
      type: "input",
    },
    {
      name: "已安排总学时",
      prop: "field_5",
      type: "input",
    },
  ],
});
const ids2 = ref([]);
// 多选框选中数据
function handleSelectionChange2(selection) {
  ids2.value = [];
  selection.forEach((s) => {
    ids2.value.push(getIndexByAttr(tableData2.value, "field_0", s.field_0));
  });
}
const submitForm2 = () => {
  if (title.value === "编辑") {
  } else {
    tableData2.value.push(addScore.value.queryParams);
  }
  cancel();
};
const handleDelete2 = (row) => {
  if (row instanceof PointerEvent || !row) {
    // 批量
    if (ids2.value.length === 0) {
      proxy.$modal.msgError("请先勾选数据");
    } else {
      proxy.$modal
        .confirm("是否确认删除?")
        .then(() => {
          let temp = [];
          tableData2.value.forEach((o, oIndex) => {
            if (!ids2.value.includes(oIndex)) {
              temp.push(o);
            }
          });
          tableData2.value = temp;
          dataStore.setData(tableData2.value);
          proxy.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    }
  } else {
    const index = getIndexByAttr(tableData2.value, "field_0", row.field_0);
    proxy.$modal
      .confirm("是否确认删除?")
      .then(() => {
        tableData2.value.splice(index, 1);
        proxy.$modal.msgSuccess("删除成功");
      })
      .catch(() => {});
  }
};
const handleUpdate2 = (row) => {
  title.value = "编辑";
  addScore.value.open = true;
  addScore.value.queryParams = row;
};

onMounted(() => {});
</script>
<style lang="scss" scoped>
$blue: #3c6fd0;
$green: #33a92d;
$red: #c03639;
.form_item {
  display: flex;
  justify-content: space-between;
}
.scheme-detail {
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  border: 1px dashed #aec8df;
  margin-bottom: 20px;
  .title {
    color: #145fff;
    font-weight: bold;
  }
}

.schedule-grid {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 100px;
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
    margin-right: 0px;
  }
  .form-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
  }
}
.schedule-tool {
  display: flex;
  justify-content: flex-end;
}
.grid_2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px 50px;
}
.warn {
  background: rgba(51, 169, 45, 0.05);
  border-radius: 4px;
  border: 1px solid $green;
  padding: 10px;
  color: $green;
}
.schedule-grid3 {
  grid-template-columns: repeat(3, 1fr);
  :deep(.el-form-item) {
    width: 30%;
  }
  :deep(.form-item) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 20px;
  }
}
</style>
