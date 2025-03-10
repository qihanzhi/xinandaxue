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
            <el-form-item label="问卷名称:" prop="field1">
              <el-input v-model="queryParams.field1" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="问卷状态:" prop="field5">
              <el-select
                      v-model="queryParams.field5"
                      :placeholder="'请选择'"
                    >
                      <template
                        v-for="option in dics.field5"
                        :key="option.value"
                      >
                        <el-option
                          :label="option.label"
                          :value="option.value"
                        />
                      </template>
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
        <el-button plain type="primary" icon="CirclePlus" @click="handleAdd"
          >新增</el-button
        >
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="ids.length < 1"
          @click="handleDelete"
          >批量删除</el-button
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
        <el-table-column type="selection" width="40" fixed></el-table-column>
        <el-table-column
          v-for="column in tableState.columns"
          :key="column.field"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
        >
          <template #default="{ row }">
            <!-- 单选 -->
            <template v-if="column.type === 'select'">
              {{ selectToLabel(row[column.field], dics[column.dicsField]) }}
            </template>
            <!-- 状态 -->
            <template v-else-if="column.type === 'status'">
              {{ selectToLabel(row[column.field], dics[column.field]) }}
            </template>
            <!-- 自定义 -->
            <template v-else-if="column.type === 'custom'">
              
            </template>
            <!-- 其他 -->
            <template v-else>
              {{ row[column.field] }}
            </template>
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作" :fixed="'right'">
          <template #default="{ row }">
            <div class="table-tool">
              <div @click="handleUpdate(row)">修改</div>
              <div class="line"></div>
              <div @click="handleSee(row)">查看</div>
              <div class="line"></div>
              <div class="red" @click="handleDelete(row)">删除</div>
              <div class="line"></div>
              <div @click="handleStatistic(row)">统计</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="tableState.total > 0"
        :total="tableState.total"
        :page="queryParams.pageNum"
        :limit="queryParams.pageSize"
        @pagination="getTableData"
      />
    </div>

    <!-- 详情 -->
    <template v-if="detailState.open">
      <TableDetail
        v-model="detailState.open"
        :status="detailState.status"
        :formData="detailState.formData"
        @submit="detailChange"
      ></TableDetail>
    </template>

    <!-- 详情查看 -->
    <template v-if="detailViewState.open">
      <TableDetailView
        v-model="detailViewState.open"
        :status="detailViewState.status"
        :formData="detailViewState.formData"
        @submit="detailViewChange"
      ></TableDetailView>
    </template>
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";

import { selectToLabel, guid } from "@/utils/form";

import useStudentInfoCommon from "./common";
import useGraduateStore from "@/store/modules/graduate";
import { storeToRefs } from "pinia";
import { formatDate } from "@/utils/formatTime";

import TableDetail from "./detail.vue";
import TableDetailView from "./view.vue";

const { dics, getIndexByAttr } = useStudentInfoCommon();
const graduateStore = useGraduateStore();

const { proxy } = getCurrentInstance();

const queryParams = reactive({
  field1: "",
  field5: '',
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

const detailViewState = reactive({
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

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal
    .confirm("是否确定删除？")
    .then(() => {
      if (row instanceof PointerEvent) {
        // 批量
        let temp = [];
        tableState.data.forEach((o, oIndex) => {
          if (!ids.value.includes(oIndex)) {
            temp.push(o);
          }
        });
        tableState.data = temp;
        graduateStore.setQuestSurveryData(tableState.data);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        const rowIndex = getIndexByAttr(
          tableState.data,
          "id",
          row.id
        );
        graduateStore.removeQuestSurveryData(rowIndex);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      }
    })
    .catch(() => {});
}

/* 统计 */
const handleStatistic = (row) => {
  
}

/** 导出按钮操作 */
function handleExport() {
  download(
    "system/user/export",
    {
      ...queryParams,
    },
    `学籍信息_${new Date().getTime()}.xlsx`
  );
}

// 创建新的行数据
const createNewRow = () => {
  const id = guid("g");
  const data = {
    id,
  };
  return data;
};

/* 新增 */
const handleAdd = () => {
  detailState.open = true;
  detailState.status = "add";
  detailState.formData = createNewRow();
};

/* 编辑 */
const handleUpdate = (row) => {
  detailState.open = true;
  detailState.status = "edit";
  detailState.formData = row;
};

/* 查看详情 */
const handleSee = (row) => {
  detailViewState.open = true;
  detailViewState.status = "view";
  detailViewState.formData = row;
};

/* 新增或编辑结果 */
const detailChange = (row) => {
  
  if (detailState.status === "edit") {
    const rowIndex = getIndexByAttr(tableState.data, "label", row.label);
    tableState.data.splice(rowIndex, 1, row);
    graduateStore.setQuestSurveryData(tableState.data);
  } else {
    row.field8 = formatDate(new Date(), "YYYY-mm-dd HH:MM:SS");
    row.field9 = 'admin';
    graduateStore.addQuestSurveryData(row);
  }

  getTableData();
};

const detailViewChange = () => {}


const getColumns = () => {
  let columns = [
    {
      field: "field1",
      label: "问卷名称",
      type: "",
      width: "200px",
    },
    {
      field: "field2",
      label: "问卷分类名称",
      type: "",
      width: "",
    },
    {
      field: "field3.0",
      label: "回收开始时间",
      type: "",
      width: "",
    },
    {
      field: "field3.1",
      label: "回收结束时间",
      type: "",
      width: "",
    },
    {
      field: "field5",
      label: "问卷状态",
      type: "",
      width: "",
    },
    {
      field: "field6",
      label: "提交数",
      type: "",
      width: "",
    },
    {
      field: "field7",
      label: "浏览数",
      type: "",
      width: "",
    },
    {
      field: "field8",
      label: "创建时间",
      type: "",
      width: "",
    },
    {
      field: "field9",
      label: "创建人",
      type: "",
      width: "",
    },
  ];
  tableState.columns = columns;
};

const getTableData = () => {
  const searchData = graduateStore.questSurveryData.filter((f) => {
    let flag = true;
    for (let i in queryParams) {
      if (!["startTime", "endTime", "pageNum", "pageSize"].includes(i)) {
        if (queryParams[i] && f[i].indexOf(queryParams[i]) === -1) {
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
  tableState.data = searchData.map(item => {
    item['field3.0'] = item.field3[0];
    item['field3.1'] = item.field3[1];

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
