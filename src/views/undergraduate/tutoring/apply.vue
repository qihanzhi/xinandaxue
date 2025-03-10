<!-- 调停补课 -->
<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <div
        :class="{ 'search-max-form': false, 'search-min-form': true }"
        :style="{ height: expand ? 'auto' : '33px' }"
      >
        <div class="search-grid">
          <el-form-item
            :label="feild.name + ':'"
            :prop="feild.prop"
            v-for="feild in queryFormFeilds"
            :key="feild.prop"
          >
            <el-select
              clearable
              v-model="queryParams[feild.prop]"
              :placeholder="'请选择' + feild.name"
              v-if="feild.type === 'select'"
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
          </el-form-item>
        </div>
        <div class="search-tool">
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
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="整体调整" name="1">
        <!-- 整体调整 -->
        <el-form
          :model="wholeParams"
          ref="wholeFormRef"
          :inline="true"
          v-show="showSearch"
          label-width="100px"
        >
          <el-form-item
            :label="feild.name + ':'"
            :prop="feild.prop"
            v-for="feild in wholeForm"
            :key="feild.prop"
            style="width: 100%"
          >
            <el-select
              clearable
              v-model="wholeParams[feild.prop]"
              :placeholder="'请选择' + feild.name"
              v-if="feild.type === 'multipleSelect'"
              multiple
              @change="newConflict"
            >
              <el-option
                v-for="item in feild.options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-select
              clearable
              v-model="wholeParams[feild.prop]"
              :placeholder="'请选择' + feild.name"
              v-if="feild.type === 'select'"
              @change="newConflict"
            >
              <el-option
                v-for="item in feild.options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-input
              v-model="wholeParams[feild.prop]"
              :placeholder="'请输入' + feild.name"
              v-if="feild.type === 'input'"
            />
          </el-form-item>
        </el-form>
        <!-- 整体调整矛盾 -->
        <div class="conflict_title">冲突：</div>
        <div class="conflict_text">
          <div v-for="c in conflicts" class="text">{{ c }}</div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="局部调整" name="2">
        <ApplyDetail></ApplyDetail>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import ApplyDetail from "./comp/applyDetail.vue";

const { proxy } = getCurrentInstance();
const calendarData = ref({});
// 弹出层标题
const activeName = ref('1');
// 搜索展开
const expand = ref(true);
// 显示搜索条件
const showSearch = ref(true);
const queryParams = ref({
  workDay: ["星期一", "星期二", , "星期三", "星期四", "星期五"],
  restDay: ["星期六"],
  class: ["自动化1班", "自动化2班", "(研)自动化1班", "(研)自动化2班"],
  course: "控制理论",
  time: [new Date("2025/03/01"), new Date("2025/04/31")],
  teacher: ["张前东", "刘浩", "耿星", "齐浒"],
  classmate: ["一号楼302", "一号楼201", "一号楼212", "一号楼210"],
  check: false,
  isSkip: true,
  pageNum: 1,
  pageSize: 10,
});
const queryFormFeilds = [
  {
    name: "课程",
    prop: "course",
    type: "select",
    options: ["控制理论", "工程制图", "检测技术", "电动与机动"],
  },
];

// 整体调整
const wholeParams = ref({
  weeks: ["第1周", "第2周", "第3周", "第4周", "第5周", "第6周", "第7周"],
  week: ["星期一"],
  sector: ["第一节课", "第二节课"],
});
let weeksOptions = new Array(20)
  .fill("")
  .map((a, aIndex) => `第${aIndex + 1}周`);
const wholeForm = [
  {
    name: "周次",
    prop: "weeks",
    type: "multipleSelect",
    options: weeksOptions,
  },
  {
    name: "日期",
    prop: "week",
    type: "multipleSelect",
    options: [
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
      "星期天",
    ],
  },
  {
    name: "节次",
    prop: "sector",
    type: "multipleSelect",
    options: [
      "第一节课",
      "第二节课",
      "第三节课",
      "第四节课",
      "第五节课",
      "第六节课",
      "第七节课",
      "第八节课",
      "第九节课",
      "第十节课",
    ],
  },
];
// 生成矛盾
const conflicts = ref([]);
function newConflict() {
  let course = ["工程制图", "检测技术", "电动与机动"];
  let className = ["自动化2班", "(研)自动化1班", "(研)自动化2班"];
  let arr = ["教师", "教室"];
  let res = [];
  wholeParams.value.weeks.forEach((a) => {
    wholeParams.value.week.forEach((b) => {
      wholeParams.value.sector.forEach((c) => {
        let rate = random(0, 5);
        if (rate < 2) {
          res.push(
            a +
              "中" +
              b +
              "的" +
              c +
              "与" +
              className[random(0, className.length)] +
              "的" +
              arr[random(0, arr.length)] +
              "冲突"
          );
        }
      });
    });
  });
  conflicts.value = res;
}
function getList() {
  newConflict();
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function randomId() {
  return Math.random().toString(36).slice(2, 9);
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList(true);
}
onMounted(() => {
  handleQuery();
});
</script>

<style lang="scss" scoped>
.conflict_title {
  padding: 0px 56px;
  line-height: 36px;
  font-size: 14px;
  color: #606266;
}
.conflict_text {
  display: flex;
  justify-content: flex-start;
  gap: 0px 20px;
  flex-wrap: wrap;
  padding: 0px 100px;
  .text {
    line-height: 36px;
    width: 45%;
  }
}
</style>
