<!-- 统一标题组件 -->
<template>
  <div class="calendar-con">
    <div class="warn mb18">
      <el-icon><WarnTriangleFilled /></el-icon>
      您的第一学期学分不足15；请第二学期选择《线性代数》进行重修，否则将影响毕业。
    </div>
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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        :prop="c.prop"
        :label="c.name"
        :width="c.width || 'auto'"
        v-for="c in cloumns"
        :key="c.prop"
      >
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
  </div>
</template>
<script setup>
import { WarnTriangleFilled, Document } from "@element-plus/icons-vue";
import TableDetail from "./StudentPlan.vue";
import useGraduateStore from "@/store/modules/graduate";
const graduateStore = useGraduateStore();
const cloumns = ref([
  {
    prop: "field_0",
    name: "学号",
    width: "180",
  },
  {
    prop: "field_1",
    name: "姓名",
    width: "70",
  },
  {
    prop: "field_2",
    name: "毕业要求总学分",
  },
  {
    prop: "field_3",
    name: "已修总学分",
    width: "80",
  },
  {
    prop: "field_4",
    name: "是否通过四级",
    width: "80",
  },
  {
    prop: "field_5",
    name: "是否通过国二",
    width: "80",
  },
  {
    prop: "field_6",
    name: "有无处分",
    width: "80",
  },
  {
    prop: "field_7",
    name: "学分绩点",
    width: "80",
  },
]);
const tableData = ref([
  {
    field_0: "L010613199505084568",
    field_1: "王大海",
    field_2: "64",
    field_3: "14",
    field_4: "否",
    field_5: "是",
    field_6: "无",
    field_7: "3.6",
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
const row = ref({});
const setOpen = (rowFake, str) => {
  open.value = !open.value;
  row.value = rowFake;
  title.value = str;
};
const cancel = () => {
  open.value = false;
};
const submitForm = () => {
  open.value = false;
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
.warn {
  background: rgba(255, 0, 0, 0.05);
  border-radius: 4px;
  border: 1px solid $red;
  padding: 10px;
  color: $red;
}
</style>
