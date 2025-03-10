<!-- 调停补课参数设置 -->
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
        <!-- 选择课程 -->

        <div class="schedule-grid mb20" v-for="(f, fIndex) in formFeildTitle">
          {{ formFeildTitle[fIndex] }}
          <el-form-item
            :label="feild.name + ':'"
            :prop="feild.prop"
            v-for="(feild, feildIndex) in formFeild[fIndex]"
            :key="feild.prop"
          >
            <!-- 单选select -->
            <div
              v-if="feild.type === 'select' || feild.type === 'multiSelect'"
              class="form-item"
            >
              <el-select
                clearable
                v-model="queryParams[feild.prop]"
                :placeholder="'请选择' + feild.name"
                :multiple="feild.type === 'multiSelect'"
              >
                <el-option
                  v-for="item in feild.options"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-button
                type="primary"
                v-if="feild.name === '排课教室'"
                @click="changeClassmateDetail"
              >
                详细设置
                <el-icon
                  ><ArrowUpBold v-show="classmateDetail" /><ArrowDownBold
                    v-show="!classmateDetail"
                /></el-icon>
              </el-button>
            </div>
            <div
              v-show="classmateDetail && feild.name === '排课教室'"
              class="form-item mt20"
            >
              <div v-for="c in queryParams['classmate']" class="course-detail">
                <span class="title">{{ c }}</span>
                <div>
                  教室占用情况：
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="random(20, 100)"
                  />
                </div>
              </div>
            </div>
            <!-- 分级多选select -->
            <div v-if="feild.type === 'groupSelect'" class="form-item">
              <el-select
                v-model="queryParams[feild.prop]"
                :placeholder="'请选择' + feild.name"
                multiple
                clearable
                collapse-tags
                popper-class="custom-header"
                :max-collapse-tags="10"
              >
                <el-option-group
                  v-for="group in feild.options"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.value"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-option-group>
              </el-select>
              <el-button
                type="primary"
                v-if="feild.name === '排课课程'"
                @click="changeDetail"
              >
                详细设置
                <el-icon
                  ><ArrowUpBold v-show="detail" /><ArrowDownBold
                    v-show="!detail"
                /></el-icon>
              </el-button>

              <el-button
                type="primary"
                v-if="feild.name === '排课教师'"
                @click="changeTeacherDetail"
              >
                详细设置
                <el-icon
                  ><ArrowUpBold v-show="teacherDetail" /><ArrowDownBold
                    v-show="!teacherDetail"
                /></el-icon>
              </el-button>
            </div>
            <div
              v-show="detail && feild.name === '排课课程'"
              class="form-item mt20"
            >
              <div v-for="c in queryParams['course']" class="course-detail">
                <span class="title">{{ c }}</span>
                <div>
                  授课类型：
                  <el-select
                    clearable
                    v-model="queryParams[c]"
                    placeholder="请选择授课类型"
                  >
                    <el-option
                      v-for="item in courseType"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </div>
                <div>
                  周课时：
                  <el-input
                    v-model="queryParams[c]"
                    placeholder="请输入周课时"
                  />
                </div>
                <div>
                  上课周次：
                  <el-input
                    v-model="queryParams[c]"
                    placeholder="请输入上课周次"
                  />
                </div>
                <div>
                  上课地点：
                  <el-input
                    v-model="queryParams[c]"
                    placeholder="请输入上课地点"
                  />
                </div>
              </div>
            </div>
            <div
              v-show="teacherDetail && feild.name === '排课教师'"
              class="form-item mt20"
            >
              <div v-for="c in queryParams['teacher']" class="course-detail">
                <span class="title">{{ c }}</span>
                <div>
                  教师时间占用情况：
                  <el-progress
                    :text-inside="true"
                    :stroke-width="20"
                    :percentage="random(20, 100)"
                  />
                </div>
              </div>
            </div>
            <!-- input输入 -->
            <el-input
              v-model="queryParams[feild.prop]"
              :placeholder="'请输入' + feild.name"
              v-if="feild.type === 'input'"
            />
            <!-- 日期范围 -->
            <div v-if="feild.type === 'dateRange'" class="form-item">
              <el-date-picker
                v-model="queryParams[feild.prop]"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
              <!-- 跳过节假日 -->
              <div>
                跳过节假日：
                <el-switch
                  v-model="queryParams['isSkip']"
                  active-color="#145fff"
                  inactive-color="#f03f3c"
                >
                </el-switch>
              </div>
            </div>
            <!-- 多选 -->
            <div v-if="feild.type === 'checkbox'">
              <el-checkbox
                v-model="isWorkDayCheckAll"
                :indeterminate="isWorkDayIndeterminate"
                @change="checkWorkDayAll"
              >
                工作日
              </el-checkbox>
              <el-checkbox
                v-model="isRestDayCheckAll"
                :indeterminate="isRestDayIndeterminate"
                @change="checkRestDayAll"
              >
                {{ feild.subName }}
              </el-checkbox>
              <div class="form-item">
                <el-checkbox-group
                  v-model="queryParams[feild.prop]"
                  @change="handleCheckedWorkDayChange"
                >
                  <el-checkbox
                    v-for="day in feild.options"
                    :key="day"
                    :label="day"
                    :value="day"
                  >
                    {{ day }}
                  </el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group
                  v-model="queryParams[feild.subProp]"
                  @change="handleCheckedRestDayChange"
                >
                  <el-checkbox
                    v-for="day in feild.subOptions"
                    :key="day"
                    :label="day"
                    :value="day"
                  >
                    {{ day }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div v-if="feild.name === '最多排课'" class="form-item">
              <el-input
                v-model="queryParams[feild.prop]"
                :placeholder="'请输入' + feild.name"
              />
              <el-select
                clearable
                v-model="queryParams[feild.subProp]"
                :placeholder="'请选择' + feild.name"
              >
                <el-option
                  v-for="item in feild.options"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
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
        <div class="schedule-tool mt20 mb20">
          <el-button size="mini">确认</el-button>
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
</template>

<script setup>
import Empty from "@/components/Empty/index.vue";
import useScoreAttrStore from "@/store/modules/scoreAttr";
import useScheduleItemsStore from "@/store/modules/scheduleItem";
const { proxy } = getCurrentInstance();
const dataStore = useScoreAttrStore();
const data2Store = useScheduleItemsStore();
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
  field_0: 0,
  field_1: 1,
  field_2: 0,
  field_3: 2,
  field_4: 0,
  field_5: 1,
  field_6: 3,
  field_7: 2,
  field_8: 0,
  field_9: 4,
  field_10: 3,
  field_11: 2,
  pageNum: 1,
  pageSize: 10,
});
const data = ref([]);
const originData = ref([]);
const formFeildTitle = ref(["调课", "停课", "补课"]);
// 表单字段
const formFeild = [
  [
    { name: "次数", prop: "field_0", type: "input", options: course.value },
    {
      name: "课时上限",
      prop: "field_1",
      type: "input",
      options: course.value,
    },
    {
      name: "学时上限",
      prop: "field_2",
      type: "input",
      options: teacher.value,
    },
    {
      name: "学时比例上限",
      prop: "field_3",
      type: "input",
      options: teacher.value,
    },
  ],
  [
    { name: "次数", prop: "field_4", type: "input", options: course.value },
    {
      name: "课时上限",
      prop: "field_5",
      type: "input",
      options: course.value,
    },
    {
      name: "学时上限",
      prop: "field_6",
      type: "input",
      options: teacher.value,
    },
    {
      name: "学时比例上限",
      prop: "field_7",
      type: "input",
      options: teacher.value,
    },
  ],
  [
    { name: "次数", prop: "field_8", type: "input", options: course.value },
    {
      name: "课时上限",
      prop: "field_9",
      type: "input",
      options: course.value,
    },
    {
      name: "学时上限",
      prop: "field_10",
      type: "input",
      options: teacher.value,
    },
    {
      name: "学时比例上限",
      prop: "field_11",
      type: "input",
      options: teacher.value,
    },
  ],
];
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
  return;
  originData.value = dataStore.data;

  data.value = originData.value.filter((f) => {
    let flag = true;
    for (let i in queryParams.value) {
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
/** 新增按钮操作 */
function handleAdd() {
  reset();
  form.value = {
    type: "节假日调整",
    name: "节假日提前结束",
    color: "#7C8EF4",
    status: true,
  };
  open.value = true;
  title.value = "添加排课检查项";
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

.calendar-con {
  height: calc(100vh - 500px);
  overflow-y: auto;
  :deep(.calendar-item) {
    background-color: aliceblue;
    border-radius: 4px;
    margin-bottom: 5px;
    padding: 5px;
  }
}
.sm-text {
  font-size: 12px;
}
:deep(.el-calendar-table .el-calendar-day) {
  height: auto;
}
</style>
