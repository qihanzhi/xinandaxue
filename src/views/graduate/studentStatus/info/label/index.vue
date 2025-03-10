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
            <el-form-item label="学生标签:" prop="label">
              <el-input v-model="queryParams.label" placeholder="请输入标签" />
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
          type="index"
          width="80"
          :align="'center'"
          :header-align="'center'"
          label="序号"
          fixed
        ></el-table-column>
        <el-table-column :prop="'label'" :label="'学生标签'">
          <template #default="{ row }">
            <el-tag :style="{'color': row.color}" >{{ row.label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :prop="'desc'" :label="'标签说明'">
          <template #default="{ row }">
            <span>{{ row.desc }}</span>
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
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";

import { selectToLabel, guid } from "@/utils/form";

import useStudentInfoCommon from "./common";
import useGraduateStore from "@/store/modules/graduate";
import { storeToRefs } from "pinia";

import TableDetail from "./detail.vue";

const { dics, getIndexByAttr } = useStudentInfoCommon();
const graduateStore = useGraduateStore();

const { proxy } = getCurrentInstance();

const queryParams = reactive({
  label: "",
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
        graduateStore.setLabelData(tableState.data);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        const rowIndex = getIndexByAttr(
          tableState.data,
          "id",
          row.id
        );
        graduateStore.removeLabelData(rowIndex);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      }
    })
    .catch(() => {});
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
  detailState.open = true;
  detailState.status = "view";
  detailState.formData = row;
};

/* 新增或编辑结果 */
const detailChange = (row) => {
  if (detailState.status === "edit") {
    const rowIndex = getIndexByAttr(tableState.data, "label", row.label);
    tableState.data.splice(rowIndex, 1, row);
    graduateStore.setLabelData(tableState.data);
  } else {
    graduateStore.addLabelData(row);
  }

  getTableData();
};
const getColumns = () => {
  let columns = [
    {
      field: "label",
      label: "学生标签",
      type: "",
      width: "200px",
    },
    {
      field: "desc",
      label: "标签说明",
      type: "",
      width: "",
    },
  ];
  tableState.columns = columns;
};

const getTableData = () => {
  const searchData = graduateStore.labelData.filter((f) => {
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
  tableState.data = searchData;
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
