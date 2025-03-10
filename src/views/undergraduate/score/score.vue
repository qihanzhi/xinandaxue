<!-- 排课冲突 -->
<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <div>
        <div class="schedule-grid">
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
              @change="randomData"
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
            <div v-if="feild.type === 'switch'" class="form-item">
              <el-switch
                v-model="queryParams[feild.prop]"
                active-color="#145fff"
                inactive-color="#f03f3c"
              >
              </el-switch>
              <el-button
                type="primary"
                v-if="feild.name === '冲突检测'"
                @click="changeCheckDetail"
              >
                详细设置
                <el-icon
                  ><ArrowUpBold v-show="checkDetail" /><ArrowDownBold
                    v-show="!checkDetail"
                /></el-icon>
              </el-button>
            </div>
            <div
              v-show="checkDetail && feild.name === '冲突检测'"
              class="check-detail-con mt20"
            >
              <div v-for="d in data2Store.data" class="form-item">
                <div>
                  <el-color-picker v-model="d.color" size="small" />{{ d.name }}
                </div>
                <el-switch
                  v-model="d.status"
                  active-color="#145fff"
                  inactive-color="#f03f3c"
                >
                </el-switch>
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="schedule-tool mt20 mb20" v-show="false">
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
    <el-row :gutter="10" class="mb12 mt20">
      <el-col :span="1.5">
        <el-upload
          class="upload-demo"
          action="#"
          :show-file-list="false"
          :on-error="upload"
        >
          <el-button type="primary">上传成绩</el-button>
        </el-upload>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="EditPen"
          size="mini"
          @click="exportFile"
          >导出成绩</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Headset"
          size="mini"
          @click="speak"
          >语音播报</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="PieChart"
          size="mini"
          @click="setAnalysisOpen"
          >成绩分析</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Finished"
          size="mini"
          @click="setLock"
          :disabled="lock"
          >提交</el-button
        >
      </el-col>
      <right-toolbar
        v-show="false"
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <el-table
      v-loading="loading"
      :data="data"
      :default-sort="{ prop: 'field_1', order: 'ascending' }"
      @selection-change="handleSelectionChange"
      tooltip-effect="light"
      :height="expand ? 'calc(100% - 192px)' : 'calc(100% - 145px)'"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="班级" prop="field_0" show-overflow-tooltip />
      <el-table-column label="学号" prop="field_1" show-overflow-tooltip />
      <el-table-column label="姓名" prop="field_2" width="160" />
      <el-table-column label="平时" prop="field_3" width="100" sortable>
        <template v-slot="{ row, column }">
          <el-input
            v-model="row[column.property]"
            placeholder="请输入成绩"
            :disabled="lock"
          />
        </template>
      </el-table-column>
      <el-table-column label="期中" prop="field_4" width="100" sortable>
        <template v-slot="{ row, column }">
          <el-input
            v-model="row[column.property]"
            placeholder="请输入成绩"
            :disabled="lock"
          />
        </template>
      </el-table-column>
      <el-table-column label="实验" prop="field_5" width="100" sortable>
        <template v-slot="{ row, column }">
          <el-input
            v-model="row[column.property]"
            placeholder="请输入成绩"
            :disabled="lock"
          />
        </template>
      </el-table-column>
      <el-table-column label="期末" prop="field_6" width="100" sortable>
        <template v-slot="{ row, column }">
          <el-input
            v-model="row[column.property]"
            placeholder="请输入成绩"
            :disabled="lock"
          />
        </template>
      </el-table-column>
      <el-table-column label="总评" prop="field_7" width="160" sortable>
        <template v-slot="{ row, column }">
          {{
            Math.round(
              row.field_3 * 0.25 +
                row.field_4 * 0.25 +
                row.field_5 * 0.25 +
                row.field_6 * 0.25
            )
          }}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="field_8" width="160" />
      <el-table-column
        label="冲突"
        prop="field_9"
        width="160"
        v-if="queryParams.check"
      >
        <template v-slot="{ row, column }">
          <el-color-picker v-model="row[column.property]" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template v-slot="{ row }">
          <div class="table-tool" v-show="!lock">
            <div @click="handleUpdate(row)">修改</div>
            <div class="line"></div>
            <div @click="handleSee(row)">查看</div>
            <div
              class="line"
              v-show="queryParams.check && row.field_9 === '#ff4500'"
            ></div>
            <div
              class="red"
              @click="handleDelete(row)"
              v-show="queryParams.check && row.field_9 === '#ff4500'"
            >
              删除
            </div>
          </div>
        </template>
      </el-table-column>
      <div slot="empty">
        <Empty></Empty>
      </div>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改排课检查项对话框 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body>
      <el-form
        ref="dataForm"
        :model="form"
        :rules="rules"
        label-width="120px"
        :disabled="title.indexOf('查看') === 0"
        v-if="open"
      >
        <div class="title-square">基本信息</div>
        <div class="form-grid">
          <el-form-item label="学院:" prop="field_0">
            <el-select
              clearable
              v-model="form.field_0"
              placeholder="请选择学院"
            >
              <el-option
                v-for="item in college"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="课程:" prop="field_1">
            <el-select
              clearable
              v-model="form.field_1"
              placeholder="请选择课程"
            >
              <el-option
                v-for="item in course"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="录入老师:" prop="field_2">
            <el-select
              clearable
              v-model="form.field_2"
              placeholder="请选择老师"
            >
              <el-option
                v-for="item in teacher"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="录入截止时间:" prop="field_5">
            <el-date-picker
              v-model="form.field_5"
              type="date"
              placeholder="请选择录入截止时间"
            />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
          v-show="title.indexOf('查看') !== 0"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加或修改排课检查项对话框 -->
    <el-dialog
      :title="title"
      v-model="subItemOpen"
      width="1200px"
      append-to-body
    >
      <el-form
        ref="dataForm"
        :model="formItem"
        :rules="rules"
        :inline="true"
        label-width="120px"
        :disabled="title.indexOf('查看') === 0"
        v-if="subItemOpen"
      >
        <div class="title-square">成绩分项比例</div>
        <div class="grid_4">
          <el-form-item label="" prop="item"> 成绩分项名称 </el-form-item>
          <el-form-item label="" prop="item"> 成绩分项比例范围 </el-form-item>
          <el-form-item label="" prop="item"> 成绩分项比例 </el-form-item>
          <el-form-item label="" prop="item"> 选择计分级制 </el-form-item>
          <template class="form-grid" v-for="f in formItem">
            <el-form-item label="" prop="item">
              <el-input v-model="f.name" placeholder="请输入成绩分项名称" />
            </el-form-item>
            <el-form-item label="" prop="item"> 0-100 </el-form-item>
            <el-form-item label="" prop="num">
              <el-input v-model="f.num" placeholder="请输入成绩分项比例" />
            </el-form-item>
            <el-form-item label="" prop="num">
              <el-select
                clearable
                v-model="f.type"
                placeholder="请选择计分级制"
              >
                <el-option
                  v-for="item in gradingSystem"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </template>
        </div>
        <el-button
          type="primary"
          icon="CirclePlus"
          @click="addFormItem"
          circle
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
          v-show="title.indexOf('查看') !== 0"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 成绩分析 -->
    <el-dialog
      :title="title"
      v-model="analysisOpen"
      width="1200px"
      append-to-body
    >
      <BarChart />
    </el-dialog>
  </div>
</template>

<script setup>
import Empty from "@/components/Empty/index.vue";
import useScoreStore from "@/store/modules/score";
import useScheduleItemsStore from "@/store/modules/scoreItem";
import BarChart from "./chart/BarChart.vue";
const { proxy } = getCurrentInstance();
const dataStore = useScoreStore();
const data2Store = useScheduleItemsStore();
const lock = ref(false);
const setLock = () => {
  lock.value = true;
};
// 弹出层标题
const title = ref("");
// 搜索展开
const expand = ref(false);
// 是否显示弹出层
const open = ref(false);
// 正在操作的第几行
const updateIndex = ref(0);
// 显示搜索条件
const showSearch = ref(true);
const loading = ref(false);
// 总条数
const total = ref(0);
// 查看成绩分项比例
const subItemOpen = ref(false);
const seeItems = () => {
  subItemOpen.value = !subItemOpen.value;
};
const gradingSystem = ["百分制", "二分制", "五分制", "八十分制"];
const formItem = ref([
  { name: "平时", num: 25, type: "百分制" },
  { name: "期中", num: 25, type: "百分制" },
  { name: "实验", num: 25, type: "百分制" },
  { name: "期末", num: 25, type: "百分制" },
]);
const addFormItem = () => {
  formItem.value.push({ name: "", num: 0 });
};
// 成绩分析
const analysisOpen = ref(false);
const setAnalysisOpen = () => {
  title.value = "成绩分析";
  analysisOpen.value = !analysisOpen.value;
};
// 学院
const college = ref(["自动化", "环境工程"]);
// 课程
const course = ref(["控制理论", "工程制图", "检测技术", "电动与机动"]);
// 老师
const teacher = ref(["张前东", "刘浩", "耿星", "齐浒"]);
// 多选ids
const ids = ref([]);
const cols = ref([
  { name: "冲突", prop: "name" },
  { name: "颜色", prop: "color" },
  { name: "开关", prop: "status" },
]);
const queryParams = ref({
  course: "控制理论",
  check: true,
  pageNum: 1,
  pageSize: 10,
});
const data = ref([]);
const originData = ref([]);
// 表单字段
const formFeild = [
  { name: "当前课程", prop: "course", type: "select", options: course.value },
  {
    name: "冲突检测",
    prop: "check",
    type: "switch",
  },
];
// 冲突检测
const checkDetail = ref(false);
const changeCheckDetail = () => {
  checkDetail.value = !checkDetail.value;
};
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const randomData = (val) => {
  if (val === "控制理论") {
    data.value = dataStore.data;
  } else {
    let temp = [
      {
        field_0: "自动化1班",
        field_1: "202009001",
        field_2: "王大海",
        field_3: random(0, 100),
        field_4: random(0, 100),
        field_5: random(0, 100),
        field_6: random(0, 100),
        field_7: "67",
        field_8: "",
      },
      {
        field_0: "自动化1班",
        field_1: "202009002",
        field_2: "李万和",
        field_3: random(0, 100),
        field_4: random(0, 100),
        field_5: random(0, 100),
        field_6: random(0, 100),
        field_7: "76",
        field_8: "",
      },
      {
        field_0: "自动化1班",
        field_1: "202009003",
        field_2: "赵天河",
        field_3: random(0, 100),
        field_4: random(0, 100),
        field_5: random(0, 100),
        field_6: random(0, 100),
        field_7: "69",
        field_8: "",
      },
      {
        field_0: "自动化1班",
        field_1: "202009004",
        field_2: "孙禅",
        field_3: random(0, 100),
        field_4: random(0, 100),
        field_5: random(0, 100),
        field_6: random(0, 100),
        field_7: "63",
        field_8: "",
      },
    ];
    data.value = temp;
  }
};
// 表单参数
const form = ref({});
// 表单校验
const rules = ref({
  name: [{ required: true, message: "请输入冲突", trigger: "blur" }],
  color: [{ required: true, message: "请选择冲突颜色", trigger: "blur" }],
});
const type = ref([
  "上课时间冲突类",
  "上课时间屏蔽类",
  "要求学时不足类",
  "异常类",
  "漏排类",
  "教师资源不足",
  "节假日调整",
  "教师时间冲突",
  "教室冲突",
]);
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#EE70BF",
  "#D0E897",
  "#CEADDA",
  "#7C8EF4",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);

function getList() {
  originData.value = dataStore.data;

  data.value = originData.value.filter((f) => {
    let flag = true;
    for (let i in queryParams.value) {
      if (["course", "check"].includes(i)) {
        continue;
      }
      if (!["startTime", "endTime", "pageNum", "pageSize"].includes(i)) {
        if (queryParams.value[i] && f[i].indexOf(queryParams.value[i]) === -1) {
          flag = false;
        }
      }
      if (["startTime", "endTime"].includes(i)) {
        if (
          queryParams.value["startTime"] &&
          new Date(f["startTime"]) < new Date(queryParams.value["startTime"])
        ) {
          flag = false;
        }
        if (
          queryParams.value["endTime"] &&
          new Date(f["endTime"]) > new Date(queryParams.value["endTime"])
        ) {
          flag = false;
        }
      }
    }
    if (flag) {
      return true;
    }
  });
  total.value = data.value.length;
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryForm");
  handleQuery();
}
// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = [];
  selection.forEach((s) => {
    ids.value.push(getIndexByAttr(originData.value, "name", s.name));
  });
}
/** 导入按钮操作 */
function upload() {
  proxy.$modal.msgSuccess("导入成功");
  originData.value.push({ field_0: "自动化1班", field_1: '202009005', field_2: '林蔷', field_3: "45", field_4: '65', field_5: '54', field_6: '56', field_7: '64', field_8: '' })
  originData.value.push({ field_0: "自动化1班", field_1: '202009006', field_2: '宋丽', field_3: "65", field_4: '68', field_5: '78', field_6: '63', field_7: '62', field_8: '' })          
  dataStore.setData(originData.value);
  getList();
}
function exportFile() {
  window.location.href = "/src/assets/doc/控制理论-自动化班成绩.xlsx"
}
function speak() {
  let arr = data.value.map(d=>{
    return d.field_2+"平时成绩："+d.field_3+"，期中成绩："+d.field_4+"，实验成绩："+d.field_5+"，期末成绩："+d.field_6+"，总评成绩："+d.field_7
  })  
  const speech = new SpeechSynthesisUtterance(arr.join("。")); // 创建语音消息
  window.speechSynthesis.speak(speech); // 播报消息
}
/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  updateIndex.value = getIndexByAttr(data.value, "name", row.name);
  form.value = data.value[updateIndex.value];
  open.value = true;
  title.value = "修改排课检查项";
}
/** 查看按钮操作 */
function handleSee(row) {
  reset();
  updateIndex.value = getIndexByAttr(data.value, "name", row.name);
  form.value = data.value[updateIndex.value];
  open.value = true;
  title.value = "查看排课检查项";
}
/* 表格单元编辑 */
function tableEellChangeClosed(row) {
  updateUser(row).then((response) => {
    proxy.$modal.msgSuccess("修改成功");
    open.value = false;
    getList();
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal
    .confirm("是否确定删除？")
    .then(() => {
      if (row instanceof PointerEvent) {
        // 批量
        let temp = [];
        originData.value.forEach((o, oIndex) => {
          if (!ids.value.includes(oIndex)) {
            temp.push(o);
          }
        });
        originData.value = temp;
        dataStore.setData(originData.value);
        getList();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        updateIndex.value = getIndexByAttr(originData.value, "name", row.name);
        originData.value.splice(updateIndex.value, 1);
        dataStore.setData(originData.value);
        getList();
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
      ...queryParams.value,
    },
    `user_${new Date().getTime()}.xlsx`
  );
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["dataForm"].validate((valid) => {
    if (valid) {
      if (title.value.indexOf("修改") > -1) {
        updateIndex.value = getIndexByAttr(data.value, "name", row.name);
        cols.value.forEach((c) => {
          data.value[updateIndex.value][c.prop] = row[c.prop];
        });
        dataStore.setData(originData.value);
        proxy.$modal.msgSuccess("修改成功");
        open.value = false;
        getList();
      } else {
        data.value.push(form.value);
        dataStore.setData(originData.value);
        proxy.$modal.msgSuccess("新增成功");
        open.value = false;
        getList();
      }
    }
  });
}
// 取消按钮
function cancel() {
  subItemOpen.value = false;
  open.value = false;
  reset();
}
// 表单重置
function reset() {
  proxy.resetForm("dataForm");
}
// 根据属性获取序号
function getIndexByAttr(data, attr, value) {
  let res = -1;
  data.some((d, dIndex) => {
    if (d[attr] === value) {
      res = dIndex;
      return true;
    }
  });
  return res;
}
function handleSwitch(row) {
  updateIndex.value = getIndexByAttr(data.value, "name", row.name);
  cols.value.forEach((c) => {
    data.value[updateIndex.value][c.prop] = row[c.prop];
  });
  dataStore.setData(originData.value);
}
onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.schedule-grid {
  display: grid;
  gap: 16px;
  align-items: center;
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
.check-detail-con {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 50px;
}

.grid_4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px 20px;
  // border: 1px dashed #aec8df;
}
</style>
