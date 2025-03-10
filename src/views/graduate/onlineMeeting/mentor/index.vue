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
            <el-form-item label="工号:" prop="studentNum">
              <el-input
                v-model="queryParams.studentNum"
                placeholder="请输入工号"
              />
            </el-form-item>
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="queryParams.name" placeholder="请输入姓名" />
            </el-form-item>
          </div>
          <div class="search-tool">
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="handleQuery">查询</el-button>
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
          v-show="false"
          >批量删除</el-button
        >
        <el-button type="warning" plain icon="Download" @click="handleExport" v-show="false"
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
        ></el-table-column>
        <el-table-column width="200" label="操作" :fixed="'right'">
          <template #default="{ row }">
            <div class="table-tool">
              <div @click="handleUpdate(row)">修改</div>
              <div class="line"></div>
              <div @click="handleSee(row)">审核</div>
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

    <!-- 新增 -->
    <template v-if="detailState.open">
      <Apply
        v-model="detailState.open"
        :status="detailState.status"
        :formData="detailState.formData"
        @submit="detailChange"
      ></Apply>
    </template>
    <!-- 审批 -->
    <template v-if="reviewState.open">
      <TableDetail
        v-model="reviewState.open"
        :status="reviewState.status"
        :formData="reviewState.formData"
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
import Apply from "./apply.vue";

import { encryptPhone } from "@/utils/validate";

const { dics, getIndexByAttr } = useStudentInfoCommon();
const graduateStore = useGraduateStore();

const { proxy } = getCurrentInstance();

const queryParams = reactive({
  studentNum: "",
  name: "",
  gender: "",
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
const reviewState = reactive({
  open: false,
  status: "", // 'view | edit | add'
  formData: null,
});
const expand = false;
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
        graduateStore.setTeacherBlog(tableState.data);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        const rowIndex = getIndexByAttr(tableState.data, "id", row.id);
        graduateStore.removeTeacherBlog(rowIndex);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      }
    })
    .catch(() => {});
}
/** 导出按钮操作 */
function handleExport() {
  proxy.download(
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
  let data = createNewRow();
  let temp =  {
    id:0,
    lxnd: "2024",
    lxyf: "12",   
    name: "孙兴成",
    xb:"男",
    csrq:"1958-03-08",    
    gjdq:"中国",
    mz:"汉族",
    szbmyx:"302生物学院",
    bdwrzny:"2024-04-29",
    bgdh:"010-6273433",
    yddh:"1343453454",
    yzyb:"000001",
    txdz:"北京海淀圆明园西路2号",
    sqxsxwyjsdslx:"博导",
    sqzyxwyjsdslx:"非专业学位博导",
    ejpydw:"301农学院",
    sftysb:"是",
    yjxk:"003农业资源与环境",//
    zy:"000101作物栽培学",// 
    zyxwlb:"农业",
    zyxwly:"农艺与种植",
    gwdj:"",
    dzzw:"无",
    qthyjszc:"无",
    sfyhwjl:"无",
    cjgzsj:"1975-09-01",
    zjlx:"居民身份证",
    zjhm:"4234534321223534",
    dzyx:"13456545654@dun.cn",
    zzmm:"群众",
    zyjszc:"教授",
    prsj:"2000-09-01",
    zgxl:"博士研究生",
    zgxw:"博士",
    zgxlzy:"农业",
    zgxwzy:"生物技术",
    zgxlgj:"中国",
    zgxwgj:"中国",
    zgxlyx:"西南科技大学",
    zgxwyx:"西南科技大学",
    studentNum: "L010613199505084568",
    lwdbrq: "2024.5",
    syhyjsyxwrq: "2024.5",    
    status:"待评审",
    applySign: "",
    applyDate: new Date()
  }
  detailState.formData = Object.assign(data, temp);
};

/* 编辑 */
const handleUpdate = (row) => {
  detailState.open = true;
  detailState.status = "edit";
  detailState.formData = row;
};

/* 查看详情 */
const handleSee = (row) => {
  console.log(row);
  reviewState.open = true;
  reviewState.status = "view";
  reviewState.formData = row;
};

/* 新增或编辑结果 */
const detailChange = (row) => {
  if (detailState.status === "edit") {
    const rowIndex = getIndexByAttr(tableState.data, "id", row.id);
    tableState.data.splice(rowIndex, 1, row);
    graduateStore.setTeacherBlog(tableState.data);
  } else {
    graduateStore.addTeacherBlog(row);
  }

  getTableData();
};
const getColumns = () => {
  let columns = [
    {
      field: "studentNum",
      label: "工号",
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
      field: "lxnd",
      label: "遴选年度",
      type: "",
      width: "",
    },
    {
      field: "sqzyxwyjsdslx",
      label: "申请导师类型",
      type: "",
      width: "",
    },
    {
      field: "zy",
      label: "专业",
      type: "",
    },
    {
      field: "zgxw",
      label: "最高学位",
      type: "",
      width: "150",
    },
    {
      field: "zyjszc",
      label: "职称",
      type: "",
      width: "",
    },
    {
      field: "status",
      label: "状态",
      type: "",
      width: "",
    },
  ];
  tableState.columns = columns;
};

const getTableData = () => {
  const searchData = graduateStore.teacherBlog.filter((f) => {
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
