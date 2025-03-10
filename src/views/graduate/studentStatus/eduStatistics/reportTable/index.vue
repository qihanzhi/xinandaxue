<template>
  <div class="app-container">
    <div class="table-search">
      <el-form
        :model="queryParams"
        ref="queryForm"
        size="default"
        :inline="true"
        label-width="100px"
      >
        <div
          :class="{ 'search-max-form': false, 'search-min-form': true }"
          :style="{ height: expand ? 'auto' : '33px' }"
        >
          <div class="search-grid">
            <el-form-item label="年份:" prop="schoolYear">
              <el-date-picker
                v-model="queryParams.schoolYear"
                type="year"
                :value-format="'YYYY'"
                placeholder="请选择年份"
              />
            </el-form-item>
            <el-form-item label="季度:" prop="quarter">
              <el-select
                clearable
                v-model="queryParams.quarter"
                placeholder="请选择季度"
              >
                <el-option
                  v-for="item in dics.quarter"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
    </div>
    <div class="table-operator">
      <div class="left">
        <p v-if="!queryParams.quarter">年度报表</p>
        <p v-else>季度报表</p>
      </div>
      <div class="right">
        <el-button type="warning" plain icon="Download" @click="handleExport"
          >导出</el-button
        >
      </div>
    </div>
    <div class="table-container">
      <el-table
        ref="zkTableRef"
        :data="tableState.data"
        v-loading="tableState.loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        height="100%"
        :border="true"
      >
        <el-table-column
          type="index"
          width="40"
          :align="'left'"
          fixed
        ></el-table-column>
        <el-table-column
          v-for="column in tableState.columns"
          :key="column.field"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
        ></el-table-column>
      </el-table>
      <pagination
        v-show="tableState.total > 0"
        :total="tableState.total"
        :page="queryParams.pageNum"
        :limit="queryParams.pageSize"
        @pagination="getTableData"
      />
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";

import { selectToLabel, guid } from "@/utils/form";

import useStudentInfoCommon from "../common";
import useGraduateStore from "@/store/modules/graduate";
import { storeToRefs } from "pinia";

import { encryptPhone } from "@/utils/validate";

const { dics, getIndexByAttr } = useStudentInfoCommon();
const graduateStore = useGraduateStore();

const { proxy } = getCurrentInstance();

const queryParams = reactive({
  schoolYear: new Date().getFullYear().toString(),
  quarter: "",
  pageNum: 1,
  pageSize: 10,
});

const tableState = reactive({
  columns: [],
  data: [],
  loading: false,
  total: 0,
});

const detailState = reactive({
  open: false,
  status: "", // 'view | edit | add'
  formData: null,
});

// 勾选项Id
const ids = ref([]);

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNum = 1;
  getTableData();
};
/** 重置按钮操作 */
const resetQuery = () => {
  proxy.resetForm("queryForm");
  handleQuery();
};

/* 勾选项 */
const handleSelectionChange = (selection) => {
  ids.value = [];
  selection.forEach((s) => {
    ids.value.push(getIndexByAttr(tableState.data, "studentNum", s.studentNum));
  });
};

/** 导出按钮操作 */
function handleExport() {
  const title = queryParams.quarter ? "季报表" : "年报表";
  proxy.download(
    "system/user/export",
    {
      ...queryParams,
    },
    `教育事业综合统计（${title}）_${new Date().getTime()}.xlsx`
  );
}

const getColumns = () => {
  let columns = [
    {
      field: "major",
      label: "专业名称",
      type: "",
      width: "",
    },
    {
      field: "grade",
      label: "年级",
      type: "",
      width: "",
    },
    {
      field: "studentNum",
      label: "学号",
      type: "",
      width: "200px",
    },
    {
      field: "name",
      label: "姓名",
      type: "",
      width: "",
    },
    {
      field: "gender",
      label: "性别",
      type: "",
      width: "",
    },
  ];

  // 获取统计项维度设置
  const dynamicColumns = graduateStore.eduSettingData.map(item => {
    return {
      field: item.itemField,
      label: item.itemName,
      order: item.order,
    }
  }).sort((a, b) => {
    if (a.order <= b.order) {
      return -1;
    } else {
      return 1;
    }
  })

  tableState.columns = columns.concat(...dynamicColumns);
};

const getTableData = () => {
  const searchData = graduateStore.eduStatisticsData.filter((f) => {
    let flag = true;
    for (let i in queryParams) {
      if (!["startTime", "endTime", "pageNum", "pageSize"].includes(i)) {
        if (queryParams[i] && f[i] && f[i].indexOf(queryParams[i]) === -1) {
          flag = false;
        }
      }
      if (["startTime", "endTime"].includes(i)) {
        if (
          queryParams["startTime"] &&
          new Date(f["startTime"]) < new Date(queryParams["startTime"])
        ) {
          flag = false;
        }
        if (
          queryParams["endTime"] &&
          new Date(f["endTime"]) > new Date(queryParams["endTime"])
        ) {
          flag = false;
        }
      }
    }
    if (flag) {
      return true;
    }
  });

  // 数据处理， 处理的字段后缀为_view
  tableState.data = searchData.map((item) => {
    if (item.contactNumber) {
      item.contactNumber_view = encryptPhone(item.contactNumber);
    }
    return item;
  });
  tableState.total = searchData.length;
};

const pageInit = () => {
  getColumns();
  getTableData();
};

onBeforeMount(() => {
  pageInit();
});
</script>

<style lang="scss" scoped></style>
