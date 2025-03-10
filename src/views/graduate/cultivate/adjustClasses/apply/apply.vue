<!-- 调停补课 -->
<template>
  <div class="app-container">
    <div class="calendar-con">
      <el-calendar v-model="curDay">
        <template #date-cell="{ data }">
          <p>
            {{ data.day.split("-").slice(1).join("-") }}
            {{ data.isSelected ? "✔️" : "" }}
            <span class="sm-text" v-html="calendarHtml(data.day)"></span>
          </p>
        </template>
      </el-calendar>
    </div>
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
          <el-form-item
            :label="f.name + ':'"
            prop="type"
            v-for="f in editField"
          >
            <div v-show="f.name === '上课时段'">
              <el-radio-group
                v-model="courseTimeType"
                @change="setCourseTimeType"
              >
                <el-radio :value="1" size="large">单节</el-radio>
                <el-radio :value="2" size="large">双节</el-radio>
                <el-radio :value="3" size="large">三节</el-radio>
                <el-radio :value="4" size="large">四节</el-radio>
              </el-radio-group>
            </div>
            <el-select
              clearable
              v-model="form[f.prop]"
              :placeholder="'请选择' + f.name"
              :multiple="f.type === 'multiselect'"
              v-if="f.type === 'select' || f.type === 'multiselect'"
            >
              <el-option
                v-for="item in f.options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-input
              v-model="form[f.prop]"
              :placeholder="'请选择' + f.name"
              v-if="f.type === 'input'"
            />
            <el-date-picker
              v-model="form[f.prop]"
              type="date"
              :placeholder="'请选择' + f.name"
              v-if="f.type === 'date'"
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
  </div>
</template>

<script setup>
import useScheduleStore from "@/store/modules/schedule";
import useScheduleItemsStore from "@/store/modules/scheduleItem";
import { formatDateNoTime } from "@/utils/index.js";
const { proxy } = getCurrentInstance();
const dataStore = useScheduleStore();
const data2Store = useScheduleItemsStore();
const lock = ref(false);
const setLock = () => {
  lock.value = true;
};
// 日历格式
const show = ref("calendar");
const curDay = new Date();
const changeShow = () => {
  show.value = show.value === "table" ? "calendar" : "table";
};
const calendarData = ref({});
const calendarHtml = (day) => {
  let temp = "";
  if (calendarData.value[day]) {
    let map = {};
    let a = "aliceblue";
    temp = calendarData.value[day]
      .map((c) => {
        if (queryParams.value.check) {
          data2Store.data.some((d) => {
            if (d.data && d.status === true) {
              if (
                map[d.name] &&
                map[d.name][c[d.data[0]]] &&
                map[d.name][c[d.data[0]]].includes(c[d.data[1]])
              ) {
                a = d.color;
                return true;
              } else if (map[d.name]) {
                if (map[d.name][c[d.data[0]]]) {
                  map[d.name][c[d.data[0]]].push(c[d.data[1]]);
                } else {
                  map[d.name][c[d.data[0]]] = [c[d.data[1]]];
                }
              } else {
                map[d.name] = {};
                map[d.name][c[d.data[0]]] = [c[d.data[1]]];
              }
            }
          });
        }
        return (
          "<div class='calendar-item' style='background-color:" +
          a +
          "'>" +
          "课时：" +
          c.field_2 +
          " 课程：" +
          c.field_4 +
          "</br>教室：" +
          c.field_6 +
          " 教师：" +
          c.field_5 +
          "</br>班级：" +
          c.field_3 +
          "</div>"
        );
      })
      .join("");
  }
  return temp;
};
// 排课课程
const detail = ref(false);
const changeDetail = () => {
  detail.value = !detail.value;
};
const courseType = ["讲授", "实验", "实践", "其他"];
// 排课教师
const teacherDetail = ref(false);
const changeTeacherDetail = () => {
  teacherDetail.value = !teacherDetail.value;
};
// 冲突检测
const checkDetail = ref(false);
const changeCheckDetail = () => {
  checkDetail.value = !checkDetail.value;
};
// 排课教室
const classmateDetail = ref(false);
const changeClassmateDetail = () => {
  classmateDetail.value = !classmateDetail.value;
};
// 弹出层标题
const title = ref("");
// 搜索展开
const expand = ref(true);
// 是否显示弹出层
const open = ref(false);
// 正在操作的第几行
const updateIndex = ref(0);
// 显示搜索条件
const showSearch = ref(true);
const loading = ref(false);
// 总条数
const total = ref(0);
// 多选ids
const ids = ref([]);
const cols = ref([
  { name: "冲突", prop: "name" },
  { name: "颜色", prop: "color" },
  { name: "开关", prop: "status" },
]);

const queryParams = ref({
  workDay: ["星期一", "星期二", , "星期三", "星期四", "星期五"],
  restDay: ["星期六"],
  class: ["自动化1班", "自动化2班", "(研)自动化1班", "(研)自动化2班"],
  course: ["控制理论", "工程制图", "微生物学基础", "工程测量学"],
  time: [new Date("2024/11/01"), new Date("2024/12/31")],
  teacher: ["张前东", "刘浩", "耿星", "齐浒"],
  classmate: ["一号楼302", "一号楼201", "一号楼212", "一号楼210"],
  check: false,
  isSkip: true,
  pageNum: 1,
  pageSize: 10,
});
const data = ref([]);
const originData = ref([]);
// 教师
const teachers = {
  自动化: ["张前东", "刘浩", "耿星", "齐浒"],
  "(研)自动化": ["李朝阳", "王侯然", "孙晓菲"],
};
// 教室
const classmates = [
  "一号楼302",
  "一号楼201",
  "一号楼212",
  "一号楼210",
  "一号楼407",
  "二号楼103",
];
// 表单字段
const formFeild = [
  {
    name: "排课班级",
    prop: "class",
    type: "groupSelect",
    options: [
      { label: "自动化", value: ["自动化1班", "自动化2班"] },
      {
        label: "(研)自动化",
        value: [
          "(研)自动化1班",
          "(研)自动化2班",
          "(研)自动化3班",
          "(研)自动化4班",
        ],
      },
    ],
  },
  {
    name: "排课课程",
    prop: "course",
    type: "groupSelect",
    options: [
      {
        label: "自动化",
        value: ["控制理论", "工程制图", "检测技术", "电动与机动"],
      },
      {
        label: "(研)自动化",
        value: ["工程测量学", "环境毒理学", "微生物学基础"],
      },
    ],
  },
  {
    name: "排课教师",
    prop: "teacher",
    type: "groupSelect",
    options: [
      { label: "自动化", value: ["张前东", "刘浩", "耿星", "齐浒"] },
      { label: "(研)自动化", value: ["李朝阳", "王侯然", "孙晓菲"] },
    ],
  },
  {
    name: "排课教室",
    prop: "classmate",
    type: "multiSelect",
    options: classmates,
  },
  {
    name: "重复方式",
    prop: "repeatType",
    type: "select",
    options: ["每周排课", "隔天排课"],
  },
  { name: "排课日期", prop: "time", type: "dateRange", isSkip: true },
  {
    name: "最多排课",
    prop: "name",
    type: "",
    options: ["次", "课时"],
    subProp: "times",
  },
  {
    name: "选择星期",
    prop: "workDay",
    type: "checkbox",
    options: ["星期一", "星期二", "星期三", "星期四", "星期五"],
    subName: "周末",
    subProp: "restDay",
    subOptions: ["星期六", "星期日"],
  },
  {
    name: "冲突检测",
    prop: "check",
    type: "switch",
  },
];
// 表单参数
const form = ref({});
const courseTimeType = ref(1);
function setCourseTimeType(val) {
  console.log(val);
  form.value.field_2 = schoolPeriod.slice(0, val);
  // courseTimeType.value = form.value.field_2.length
}
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
// 多选-选择星期
const isWorkDayIndeterminate = ref(false);
const isRestDayIndeterminate = ref(true);
const isWorkDayCheckAll = ref(true);
const isRestDayCheckAll = ref(false);
const checkWorkDayAll = (val) => {
  queryParams.value["workDay"] = val
    ? formFeild.filter((f) => f.prop === "workDay")[0].options
    : [];
  isWorkDayIndeterminate.value = false;
};
const checkRestDayAll = (val) => {
  queryParams.value["restDay"] = val
    ? formFeild.filter((f) => f.subProp === "restDay")[0].subOptions
    : [];
  isRestDayIndeterminate.value = false;
};
const handleCheckedWorkDayChange = (value) => {
  const checkedCount = value.length;
  isWorkDayCheckAll.value =
    formFeild.filter((f) => f.prop === "workDay")[0].options.length ===
    checkedCount;
  isWorkDayIndeterminate.value =
    checkedCount > 0 &&
    checkedCount <
      formFeild.filter((f) => f.prop === "workDay")[0].options.length;
};
const handleCheckedRestDayChange = (value) => {
  const checkedCount = value.length;
  isRestDayCheckAll.value =
    formFeild.filter((f) => f.subProp === "restDay")[0].subOptions.length ===
    checkedCount;
  isRestDayIndeterminate.value =
    checkedCount > 0 &&
    checkedCount <
      formFeild.filter((f) => f.subProp === "restDay")[0].subOptions.length;
};
// 上课时段
const schoolPeriod = [
  "08:00-08:45",
  "08:55-09:40",
  "10:00-10:45",
  "10:55-11:40",
  "14:00-14:45",
  "14:55-15:40",
  "16:00-16:45",
  "16:55-17:40",
  "19:00-19:45",
  "19:55-20:40",
];

const festival = [
  "2024-01-01",
  "2024-02-10",
  "2024-02-11",
  "2024-02-12",
  "2024-02-13",
  "2024-02-14",
  "2024-02-15",
  "2024-02-16",
  "2024-02-17",
  "2024-04-04",
  "2024-04-05",
  "2024-04-06",
  "2024-05-01",
  "2024-05-02",
  "2024-05-03",
  "2024-05-04",
  "2024-05-05",
  "2024-06-08",
  "2024-06-09",
  "2024-06-10",
  "2024-09-15",
  "2024-09-16",
  "2024-09-17",
  "2024-10-01",
  "2024-10-02",
  "2024-10-03",
  "2024-10-04",
  "2024-10-05",
  "2024-10-06",
  "2024-10-07",
];
// 编辑字段
const editField = ref([
  { name: "上课日期", type: "date", prop: "field_0" },
  {
    name: "上课时段",
    type: "multiselect",
    prop: "field_2",
    options: schoolPeriod,
  },
  {
    name: "班级",
    type: "select",
    prop: "field_3",
    options: queryParams.value.class,
  },
  {
    name: "课程",
    type: "select",
    prop: "field_4",
    options: queryParams.value.course,
  },
  {
    name: "教师",
    type: "select",
    prop: "field_5",
    options: ["张前东", "刘浩", "耿星", "齐浒", "李朝阳", "王侯然", "孙晓菲"],
  },
  { name: "教室", type: "select", prop: "field_6", options: classmates },
]);
function getList(isInit) {
  if (!isInit) {
    originData.value = dataStore.data;
    data.value = originData.value;
  } else {
    data.value = [];
    formFeild.forEach((f) => {
      if (f.prop) {
        queryParams[f.prop];
      }
      if (f.subProp) {
        queryParams[f.subProp];
      }
      if (f.name === "排课日期") {
        let startTime = new Date(
          formatDateNoTime(queryParams.value[f.prop][0])
        );
        let endTime = new Date(formatDateNoTime(queryParams.value[f.prop][1]));
        while (startTime < endTime) {
          let weekDay = getDayOfWeek(startTime);
          if (
            queryParams.value["workDay"].includes(weekDay) ||
            queryParams.value["restDay"].includes(weekDay)
          ) {
            schoolPeriod.forEach((p) => {
              let rate = random(0, 5);
              if (rate === 0) {
                queryParams.value["course"].forEach((course) => {
                  let rate = random(0, 5);
                  if (rate === 0) {
                    let className =
                      queryParams.value["class"][
                        random(0, queryParams.value["class"].length)
                      ];
                    let day = formatDateNoTime(startTime);
                    if (
                      (queryParams.value.isSkip && !festival.includes(day)) ||
                      !queryParams.value.isSkip
                    ) {
                      data.value.push({
                        id: randomId(),
                        field_0: day,
                        field_1: weekDay,
                        field_2: [p],
                        field_3: className,
                        field_4: course,
                        field_5:
                          className.indexOf("自动化") > -1
                            ? teachers["自动化"][
                                random(0, teachers["自动化"].length)
                              ]
                            : teachers["(研)自动化"][
                                random(0, teachers["(研)自动化"].length)
                              ],
                        field_6: classmates[random(0, classmates.length)],
                      });
                    }
                  }
                });
              }
            });
          }
          startTime.setDate(startTime.getDate() + 1);
        }
      }
    });
    originData.value = data.value;
    dataStore.setData(originData.value);
    setCalendarData();
  }
}
function setCalendarData() {
  calendarData.value = [];
  originData.value.forEach((f) => {
    let day = f["field_0"].split("/")[0];
    if (calendarData.value[day]) {
    } else {
      calendarData.value[day] = [];
    }
    calendarData.value[day].push(f);
  });
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function randomId() {
  return Math.random().toString(36).slice(2, 9);
}
/*根据日期获取星期几*/
function getDayOfWeek(da) {
  const daysOfWeek = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const now = new Date(da);
  const dayOfWeek = now.getDay();
  return daysOfWeek[dayOfWeek];
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList(true);
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
    ids.value.push(getIndexByAttr(originData.value, "id", s.id));
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
  updateIndex.value = getIndexByAttr(data.value, "id", row.id);
  form.value = data.value[updateIndex.value];
  open.value = true;
  title.value = "修改排课检查项";
}
/** 查看按钮操作 */
function handleSee(row) {
  reset();
  form.value = row;
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
        setCalendarData();
      } else {
        updateIndex.value = getIndexByAttr(originData.value, "id", row.id);
        originData.value.splice(updateIndex.value, 1);
        dataStore.setData(originData.value);
        getList();
        proxy.$modal.msgSuccess("删除成功");
        setCalendarData();
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
        // updateIndex.value = getIndexByAttr(data.value, "id", row.id);
        // cols.value.forEach((c) => {
        //   data.value[updateIndex.value][c.prop] = row[c.prop];
        // });
        data.value[updateIndex.value]["field_0"] = formatDateNoTime(
          data.value[updateIndex.value]["field_0"]
        );
        dataStore.setData(originData.value);
        proxy.$modal.msgSuccess("修改成功");
        open.value = false;
        getList();
        setCalendarData();
      } else {
        data.value.push(form.value);
        dataStore.setData(originData.value);
        proxy.$modal.msgSuccess("新增成功");
        open.value = false;
        getList();
        setCalendarData();
      }
    }
  });
}
// 取消按钮
function cancel() {
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
onMounted(() => {
  handleQuery();
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
  height: calc(100vh - 143px);
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

.course-detail {
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  border: 1px dashed #aec8df;
  margin-bottom: 20px;
  .title {
    color: #145fff;
    font-weight: bold;
  }
}
.check-detail-con {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px 50px;
}
</style>
