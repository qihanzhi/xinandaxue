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
            <el-form-item label="学籍号:" prop="studentNum">
              <el-input
                v-model="queryParams.studentNum"
                placeholder="请输入学籍号"
              />
            </el-form-item>
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="queryParams.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item label="请假类型:" prop="transactionType">
              <el-select
                clearable
                v-model="queryParams.transactionType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dics.transactionType"
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
        <el-button plain type="primary" icon="CirclePlus" @click="handleAdd"
          >申请</el-button
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
          type="selection"
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
        >
          <template v-slot="{ row }">
            <template v-if="column.type === 'select'">
              {{ selectToLabel(row[column.field], dics[column.field]) }}
            </template>
            <template v-else-if="column.type === 'status'">
              <el-tag type="info" v-if="row[column.field] === '待提交'">待提交</el-tag>
              <el-tag type="primary" v-else-if="row[column.field] === '待审核'">待审核</el-tag>
              <el-tag type="warning" v-else-if="row[column.field] === '驳回'">驳回</el-tag>
              <el-tag type="success" v-else-if="row[column.field] === '审核通过'">审核通过</el-tag>
              <el-tag type="primary" v-else-if="row[column.field] === '审核中'">审核中</el-tag>
              <el-tag type="success" v-else-if="row[column.field] === '审核完成'">审核完成</el-tag>
            </template>
            <template v-else>
              {{ row[column.field] }}
            </template>
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作" :fixed="'right'">
          <template #default="{ row }">
            <div class="table-tool">
              <el-button link type="primary" :disabled="row.status !== '待提交'" @click="handleUpdate(row)">修改</el-button>
              <div class="line"></div>
              <el-button link type="primary" @click="handleSee(row)">查看</el-button>
              <div class="line"></div>
              <el-button link :disabled="row.status !== '待提交'" type="danger" @click="handleDelete(row)">删除</el-button>
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

import useStudentModifyCommon from "../common";
import useGraduateStore from "@/store/modules/graduate";
import { storeToRefs } from "pinia";

import TableDetail from "./detail.vue";
import { encryptPhone } from "@/utils/validate";

const { dics, getIndexByAttr } = useStudentModifyCommon();
const graduateStore = useGraduateStore();

const { proxy } = getCurrentInstance();

const expand = ref(false);
const queryParams = reactive({
  studentNum: "",
  name: "",
  transactionType: "",
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
        graduateStore.setAbsentData(tableState.data);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        const rowIndex = getIndexByAttr(tableState.data, "id", row.id);
        graduateStore.removeAbsentData(rowIndex);
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
    const rowIndex = getIndexByAttr(tableState.data, "id", row.id);
    tableState.data.splice(rowIndex, 1, row);
    graduateStore.setAbsentData(tableState.data);
  } else {
    graduateStore.addAbsentData(row);
  }

  getTableData();
};
const getColumns = () => {
  let columns = [
    {
      field: "studentNum",
      label: "学籍号",
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
      field: "college",
      label: "学院",
      type: "",
      width: "",
    },
    {
      field: "schoolYear",
      label: "入学年份",
      type: "",
      width: "",
    },
    {
      field: "major",
      label: "专业",
      type: "",
      width: "",
    },
    {
      field: "classes",
      label: "学籍所在班级",
      type: "",
      width: "",
    },
    {
      field: "transactionType",
      label: "请假类型",
      type: "select",
      width: "",
    },
    {
      field: "status",
      label: "状态",
      type: "status",
      width: "",
    },
  ];
  tableState.columns = columns;
};

const getTableData = () => {
  const searchData = graduateStore.absentData.filter((f) => {
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
