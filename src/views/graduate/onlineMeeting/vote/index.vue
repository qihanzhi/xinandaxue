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
        graduateStore.setGoodBlog(tableState.data);
        getTableData();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        const rowIndex = getIndexByAttr(tableState.data, "id", row.id);
        graduateStore.removeGoodBlog(rowIndex);
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
  let temp = {
    xwfhmc: "人文学位评定分委员会‌",
    sqrszyxmc: "文学学院",
    lwtm: "敦煌四部文献缀合研究",
    lwywtm:
      "A Study on the Patching-up of the Four Documents (Jing-Shi-Zi-Ji)inDunhuang Manuscripts",
    lwsjdyjfx: "敦煌学",
    name: "沈秋之",
    studentNum: "L010613199505084534",
    lwdbrq: "2024.5",
    syhyjsyxwrq: "2024.5",
    yjxkdm: "0501",
    yjxkmc: "中国语言文学",
    ejxkdm: "050104",
    ejxkmc: "中国古典文献学",
    sfzsxkzy: "否",
    zdjsxm: "张泳泉",
    zdjsyjfx: "敦煌学学术史",
    zzsjh: "15843278445",
    zzdzyx: "15843278445@dun.cn",
    txzzlws: "0",
    dyzzlws: "1",
    dezzlws: "0",
    scilws: "4",
    eilws: "0",
    sscilws: "0",
    ahcilws: "0",
    istplws: "0",
    yxyz: "无",
    yhfmhsyxxzls: "0",
    dbxcg: `
    追寻敦煌残卷的“生命历程”——以北敦12194号及相关残片缀合复原为例 《中华文史论丛》 2023.9 2023年第3期
    敦煌社会经济文献裱补纸缀合示例 《文献》 2023.1 2023年第1期
    启功旧藏《佛说观佛三昧海经》残卷整理研究 《敦煌研究》 2022.12 2022年第6期
    敦煌本《和菩萨戒文》残卷缀合研究 《出土文献》 2021.9 2021年第3期
    敦煌社邑文书人名录校匡正及其识读方法 《语文研究》 2021.8 2021年第3期
    `,
    lwcxd:
      "1. 系统汇集敦煌四部文献缀合成果，发现了一大批可缀合的残卷。论文对百余年来敦煌四部文献残卷的缀合成果进行细致梳理，指出了目前研究存在的诸多问题，提炼总结四部文献残卷缀合时的特异之处。在全面普查敦煌文献的基础上，新考定出了一大批可以缀合的四部文献残卷或残片，为敦煌学研究提供了新材料，发现了许多文献价值较高的写本。2. 总结了一套适用于语言敦煌四部文献整理研究的缀合方法论。在肯定前贤缀合成绩的同时，论文指出了现有研究的疏误和不足。在借鉴佛经残卷及其它出土文献的缀合经验的基础上，结合敦煌四部文献的个性特征，提出了缀合时应遵循的程序方法，总结了一系列缀合时需要重点把握的关键性要素。这套缀合方法论立足于四部文献本身的特点，具有可操作性。3. 利用缀合这一关键步骤推动了敦煌四部文献的辑录校理。以残卷缀合为契机，促使四部文献的定名、定性、断代、校录等写本文献整理工作更加精确和深入。总结了四部残卷定名时常见的错误和原因，归纳了社会经济文书定名的方法，为部分未定名或定名出现问题的残卷拟定了准确的标题。利用缀合，推定出部分写卷的性质来源、抄写时间、相关责任人、所属寺院等关键信息，为残片和残卷建立起详备准确的身份档案。4. 通过残卷缀合串联起与写本文献相关的各类学术问题。论文通过揭举大量例证，对写卷再利用、卷背杂写的缀合、裱补残片的复原、经帙残片整理等问题作专题探讨。力图回溯敦煌文献在制作生成、阅读传播，以及废弃残断、修补再利用时的现场，再现了写卷流通改造的动态过程。在此基础上促进写本学研究不断深化，对藏经洞文献的性质也有了新的思考。",
    applySign: "",
    applyDate: new Date(),
    status:"待评审",
  };
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
    graduateStore.setGoodBlog(tableState.data);
  } else {
    graduateStore.addGoodBlog(row);
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
      field: "xwfhmc",
      label: "学位分会名称",
      type: "",
      width: "",
    },
    {
      field: "sqrszyxmc",
      label: "院系",
      type: "",
      width: "",
    },
    {
      field: "lwtm",
      label: "论文题目",
      type: "",
      width: "300",
    },
    {
      field: "lwsjdyjfx",
      label: "论文涉及的研究方向",
      type: "",
      width: "150",
    },
    {
      field: "zdjsxm",
      label: "指导教师姓名",
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
  const searchData = graduateStore.goodBlog.filter((f) => {
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
