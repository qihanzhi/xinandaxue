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
          :class="{ 'search-max-form': true, 'search-min-form': false }"
          :style="{ height: expand ? 'auto' : '33px' }"
        >
          <div class="search-grid">
            <el-form-item label="学院:" prop="college">
              <el-select
                v-model="queryParams.college"
                :placeholder="'请选择'"
              >
                <template
                  v-for="option in dics['college']"
                  :key="option.value"
                >
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="专业:" prop="major">
              <el-input
                v-model="queryParams.major"
                placeholder="请输入专业"
              />
            </el-form-item>
            <el-form-item label="方案类型:" prop="programType">
              <el-select
                v-model="queryParams.programType"
                :placeholder="'请选择'"
              >
                <template
                  v-for="option in dics['programType']"
                  :key="option.value"
                >
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="学期:" prop="term">
              <el-select
                v-model="queryParams.term"
                :placeholder="'请选择'"
              >
                <template
                  v-for="option in dics['term']"
                  :key="option.value"
                >
                  <el-option :label="option.label" :value="option.value" />
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
              v-show="!expand"
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
              v-show="expand"
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
      <el-checkbox-group v-model="ids">
        <div class="card-container">
          <el-card class="card" v-for="item in tableState.data" :key="item.id" @click="handleUpdate(item)">
            <template #header>
              <div class="card-header">
                <div class="left">
                  <el-checkbox @click.stop="" label="" :value="item.id" />
                  <span class="year">{{ item.college }}</span>
                </div>
                <div class="right">
                  <span class="version">{{ item.major }}</span>
                  <el-button
                    type="danger"
                    link
                    icon="Delete"
                    @click.stop="handleDelete(item)"
                  ></el-button>
                </div>
              </div>
            </template>
            <div class="card-content">
              <p class="title">{{ item.title }}</p>
              <p class="desc">&nbsp;&nbsp;&nbsp;&nbsp; {{ item.desc }}</p>
              <div class="sign-box">
                <span class="sign" :style="cardSignStyle(item.programType)">{{
                  item.programType
                }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </el-checkbox-group>
      <pagination
        v-show="tableState.total > 0"
        :total="tableState.total"
        :page="queryParams.pageNum"
        :limit="queryParams.pageSize"
        :pageSizes="tableState.pageSizes"
        @pagination="paginationChange"
      />
    </div>

    <!-- 详情
    <template v-if="detailState.open">
      <TableDetail
        v-model="detailState.open"
        :status="detailState.status"
        :formData="detailState.formData"
        @submit="detailChange"
      ></TableDetail>
    </template> -->
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, ref } from "vue";
import { selectToLabel, guid } from "@/utils/form";
import useStudentInfoCommon from "./common.js";
import useUndergraduateStore from "@/store/modules/undergraduate";
const router = useRouter();
const { dics, getIndexByAttr } = useStudentInfoCommon();
const graduateStore = useUndergraduateStore();

const { proxy } = getCurrentInstance();
const expand = ref(false);
const queryParams = reactive({
  college: "",
  programType: "",
  term:"",
  major: "",
  pageNum: 1,
  pageSize: 12,
});

const tableState = reactive({
  data: [],
  loading: false,
  total: 0,
  pageSizes: [12, 24, 36],
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
        graduateStore.setProgramTemplateData(tableState.data);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        const rowIndex = getIndexByAttr(tableState.data, "id", row.id);
        graduateStore.removeProgramTemplateData(rowIndex);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      }
    })
    .catch(() => {});
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
  router.push({path:"/undergraduate/teach/formulationDetail"})
  // detailState.open = true;
  // detailState.status = "add";
  // detailState.formData = createNewRow();
};

/* 编辑 */
const handleUpdate = (row) => {
  router.push({path:"/undergraduate/teach/formulationDetail"})

  // detailState.open = true;
  // detailState.status = "edit";
  // detailState.formData = row;
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
    graduateStore.setProgramTemplateData(tableState.data);
  } else {
    graduateStore.addProgramTemplateData(row);
  }

  getTableData();
};

// 分页发生改变
const paginationChange = ({ page }) => {
  queryParams.pageNum = page;
  getTableData();
};

const getTableData = () => {
  const searchData = graduateStore.programTemplateData.filter((f) => {
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

  tableState.total = searchData.length;
  // 分页
  const startIndex = (queryParams.pageNum - 1) * queryParams.pageSize;
  const endIndex = queryParams.pageNum * queryParams.pageSize;
  tableState.data = searchData.slice(startIndex, endIndex);
};

// 标签样式
const cardSignStyle = (val) => {
  let color = "#ccc";
  switch (val) {
    case "本科生任务":
      color = "#409eff";
      break;
    case "研究生任务":
      color = "#67c23a";
      break;
    case "本研共修任务":
      color = "#e6a23c";
      break;
    case "学术型":
      color = "#a26cf5";
      break;
  }

  return {
    background: color,
  };
};

const pageInit = () => {
  getTableData();
};

onBeforeMount(() => {
  pageInit();
});
</script>

<style lang="scss" scoped>
.table-container {
  .card-container {
    font-size: 14px;
    line-height: 22px;
    padding: 20px;
    background: #f5f5f5;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    grid-template-rows: auto;
    height: 630px;

    .card {
      height: 190px;
      cursor: pointer;
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.05);

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left,
        .right {
          display: flex;
          align-items: center;
        }
        .version {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          padding: 0px 10px;
          font-size: 12px;
          border-radius: 15px;
          background: #bde7db;
        }
      }
      .card-content {
        .title {
          font-size: 18px;
          font-weight: 600;
        }
        .desc {
          margin-top: 10px;
          height: 42px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 2;
        }
        .sign-box {
          margin-top: 10px;

          .sign {
            display: flex;
            width: max-content;
            padding: 0 10px;
            line-height: 24px;
            border-radius: 12px;
            color: #fff;
            font-size: 12px;
          }
        }
      }
    }
    .card:hover {
      box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
