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
        :style="{ height: '33px' }"
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
              style="width: 100%"
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
        </div>
      </div>
    </el-form>
    <div class="mt10">
      <el-table :data="tableData" height="200" border style="width: 100%">
        <el-table-column
          :prop="c.prop"
          :label="c.name"
          :width="c.width || 'auto'"
          v-for="c in cloumns"
          :key="c.prop"
        >
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template v-slot="{ row }">
            <div class="table-tool">
              <div
                @click="setOpen(row, '填写')"
                v-show="row.field_2 === '待提交'"
              >
                填写
              </div>
              <div class="line" v-show="row.field_2 === '待提交'"></div>
              <div @click="setOpen(row, '查看')">查看</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 学业生涯详情 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body>
      <div class="openText">
        {{ row.field_0 }}：
        <el-input
          type="textarea"
          v-model="row.field_0_0"
          :placeholder="'请输入' + row.field_0"
          :autosize="{ minRows: 10, maxRows: 20 }"
          clearable
          :disabled="title === '查看'"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>       
        <el-button
          @click="submitForm(1, row)"
          v-show="title.indexOf('查看') !== 0"
          >确 定</el-button
        >
        <el-button
          type="primary"
          @click="submitForm(2, row)"
          v-show="title.indexOf('查看') !== 0"
          >提 交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  Notebook,
  Document,
  Postcard,
  Share,
  Upload,
} from "@element-plus/icons-vue";
import useGraduateStore from "@/store/modules/graduate";
const graduateStore = useGraduateStore();
const { proxy } = getCurrentInstance();
// 表单字段
const formFeild = [
  {
    name: "学年",
    prop: "year",
    type: "select",
    options: [
      "第一学年",
      "第一学年",
      "第二学年",
      "第二学年",
      "第三学年",
      "第三学年",
      "第四学年",
      "第四学年",
      "毕业学年",
      "毕业学年",
    ],
  },
  {
    name: "模块",
    prop: "type",
    type: "select",
    options: [
      "个人简历",
      "自我剖析",
      "环境认知",
      "学业生涯总目标和具体做法",
      "学年度具体目标",
      "第一学期本人自评",
      "第二学期本人自评",
    ],
  },
];
const queryParams = ref({
  year: "",
  type: "",
  color: "",
  pageNum: 1,
  pageSize: 10,
});
const cloumns = ref([
  { name: "名称", prop: "field_0", width: "160" },
  { name: "内容", prop: "field_1" },
  { name: "状态", prop: "field_2", width: "80" },
]);
const tableData = ref([
  {
    field_0: "个人简历",
    field_1: "学业生涯-个人简历已驳回，请继续完善",
    field_2: "待提交",
    field_3: 31,
    field_4: "工程制图",
    field_5: "",
    field_0_0: "王大海。身高:168cm 专业:自动化 外语水平:英语四级。",
  },
  {
    field_0: "自我剖析",
    field_1: "学业生涯-自我剖析已驳回，请继续完善",
    field_2: "待提交",
    field_3: 14,
    field_4: "",
    field_5: "工程制图",
    field_0_0: "认真学习。",
  },
  {
    field_0: "第一学年",
    field_1: "学业生涯-第一学年第一学期本人自评请于2024/12/28日前提交",
    field_2: "待提交",
    field_3: 14,
    field_4: "",
    field_5: "工程制图",
    field_0_0: "表现良好。",
  },
  {
    field_0: "环境认知",
    field_1: "学业生涯-环境认知已提交",
    field_2: "已提交",
    field_3: 14,
    field_4: "",
    field_5: "工程制图",
    field_0_0:
      "我认为考研可以提升我的学术水平，进入更好的大学，并且考研所涉及的专业知识感兴趣。",
  },
]);
// 调停补课
const handleUpdate = () => {};
const handleSee = () => {};
const handleDelete = () => {};
// 弹框
const activeName = ref(1);
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
  studentOpen.value = false;
  planOpen.value = false;
};
const submitForm = (index,row) => {
  open.value = false;
  studentOpen.value = false;
  planOpen.value = false;
  if (index===2) {
    proxy.$modal.msgSuccess("已提交至【辅导员】齐浒进行审批。");
    row.field_2 = "已提交";
  }
};
const studentOpen = ref(false);
const setStudentOpen = (rowFake, str) => {
  studentOpen.value = !studentOpen.value;
  row.value = rowFake;
  title.value = str;
};
const planOpen = ref(false);
const setPlanOpen = (rowFake, str) => {
  planOpen.value = !planOpen.value;
  row.value = rowFake;
  title.value = str;
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

.search-grid {
  grid-template-columns: repeat(2, 1fr);
}
</style>
