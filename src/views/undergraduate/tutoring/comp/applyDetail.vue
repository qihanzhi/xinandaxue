<template>
  <el-form
    :model="queryParams"
    ref="queryForm"
    :inline="true"
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
          v-show="
            feild.prop === 'type' ||
            (feild.prop === 'course2' && queryParams['type'] === '调课')
          "
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
  <el-color-picker v-model="color" class="fr" />
  <div class="flex-con">
    <div style="min-width: 45%">
      调整前
      <el-timeline>
        <el-timeline-item
          center
          :timestamp="d.day"
          placement="top"
          v-for="d in oldMonth"
          :key="d.day"
        >
          <el-card v-for="i in d.list" :key="i.label">
            {{ i.label }}
            <div class="flex-con">
              <div
                v-for="item in i.course"
                :key="item.id"
                :class="
                  'cursor-move h-30 bg-gray-500/5 rounded p-3 ' + item.color
                "
              >
                <p>
                  {{ item.label }}-{{ item.value }}
                  <el-tooltip
                    effect="light"
                    :content="item.conflit"
                    placement="top"
                    v-if="item.color === '#ebcece'"
                  >
                    <el-icon color="#dd2424" size="16"
                      ><WarningFilled
                    /></el-icon>
                  </el-tooltip>
                </p>
                <p>{{ item.classroom }}-{{ item.className }}</p>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div style="min-width: 45%">
      调整后
      <el-timeline>
        <el-timeline-item
          center
          :timestamp="d.day"
          placement="top"
          v-for="d in month"
          :key="d.day"
        >
          <el-card v-for="(i, iIndex) in d.list" :key="i.label">
            {{ i.label }}
            <div class="flex-con">
              <VueDraggable
                class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
                v-model="i.course"
                animation="150"
                ghostClass="ghost"
                group="people"
                @update="onUpdate"
                @add="onAdd"
                @remove="remove"
              >
                <div
                  v-for="(item, itemIndex) in i.course"
                  :key="item.id"
                  :style="{ background: item.color }"
                  :class="'cursor-move h-30 bg-gray-500/5 rounded p-3'"
                >
                  <div>
                    <div
                      class="roundRect fr redBg"
                      @click="stopFun(item, i.course, itemIndex)"
                    >
                      <el-icon color="#ffffff" size="16"
                        ><SwitchButton
                      /></el-icon>
                    </div>
                    <div
                      class="roundRect fr mr10"
                      @click="colorFun(item, i.course, itemIndex)"
                    >
                      <el-icon color="#ffffff" size="16"><Star /></el-icon>
                    </div>
                    <div
                      class="roundRect fr mr10"
                      @click="showFun(item, i.course, itemIndex)"
                    >
                      <el-icon color="#ffffff" size="16"><EditPen /></el-icon>
                    </div>
                    {{ item.label }}-{{ item.value }}
                    <el-tooltip
                      effect="light"
                      :content="item.conflit"
                      placement="top"
                      v-if="item.color === '#ebcece'"
                    >
                      <el-icon color="#dd2424" size="16"
                        ><WarningFilled
                      /></el-icon>
                    </el-tooltip>
                  </div>
                  <div>{{ item.classroom }}-{{ item.className }}</div>
                </div>
              </VueDraggable>

              <VueDraggable
                class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
                v-model="d.list2[iIndex].course"
                animation="150"
                ghostClass="ghost"
                group="people"
                @update="onUpdate"
                @add="onAdd"
                @remove="remove"
                v-show="queryParams['type'] === '调课'"
              >
                <div
                  v-for="(item, itemIndex) in d.list2[iIndex].course"
                  :key="item.id"
                  :style="{ background: item.color }"
                  :class="'cursor-move h-30 bg-gray-500/5 rounded p-3'"
                >
                  <div>                    
                    <div
                      class="roundRect fr"
                      @click="colorFun(item, d.list2[iIndex].course, itemIndex)"
                    >
                      <el-icon color="#ffffff" size="16"><Star /></el-icon>
                    </div>
                    <div
                      class="roundRect fr mr10"
                      @click="showFun(item, d.list2[iIndex].course, itemIndex)"
                    >
                      <el-icon color="#ffffff" size="16"><EditPen /></el-icon>
                    </div>
                    {{ item.label }}-{{ item.value }}
                    <el-tooltip
                      effect="light"
                      :content="item.conflit"
                      placement="top"
                      v-if="item.color === '#ebcece'"
                    >
                      <el-icon color="#dd2424" size="16"
                        ><WarningFilled
                      /></el-icon>
                    </el-tooltip>
                  </div>
                  <div>{{ item.classroom }}-{{ item.className }}</div>
                </div>
              </VueDraggable>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
  <!-- 编辑 -->
  <Edit v-if="show" :data="form" @cancel="showFun" @submit="update"></Edit>
</template>
<script setup>
import { VueDraggable } from "vue-draggable-plus";
import { formatDateNoTime } from "@/utils/index";
import Edit from "./edit.vue";
import { EditPen } from "@element-plus/icons-vue";
const { proxy } = getCurrentInstance();
// 局部调整
const queryFormFeilds = ref([
  {
    name: "类型",
    prop: "type",
    type: "select",
    options: ["调课", "停课", "补课"],
  },

  {
    name: "被调课程",
    prop: "course2",
    type: "select",
    options: ["工程制图", "检测技术", "电动与机动"],
  },
]);
const queryParams = ref({ type: "调课", course2: "工程制图" });
const expand = false;
function getAllDaysOfMonth(year, month) {
  let days = [];
  let date = new Date(year, month - 1, 1); // 月份是从0开始的，所以减1
  while (date.getMonth() === month - 1) {
    // 获取月份时又减去1，与原月份对比
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const color = ref("#ccedbf");
let currentYear = new Date().getFullYear(); // 获取当前年份
let currentMonth = new Date().getMonth() + 1; // 获取当前月份，+1因为是实际月份

let daysOfMonth = getAllDaysOfMonth(currentYear, currentMonth);
let month = ref(
  daysOfMonth.map((day) => {
    let rate = random(0, 10);
    let rate2 = random(0, 10);
    let flag = random(0, 5);
    let min = 100;
    let conflits = ["与《工程制图》教室冲突", "与《电动与机动》上课时间冲突"];
    let defaultArr = [
      {
        id: "1_0",
        label: "控制理论",
        value: "张前东",
        classroom: "一号楼302",
        className: "自动化1班",
        color: "",
        conflit: conflits[random(0, conflits.length)],
      },
    ];
    let defaultArr2 = [
      {
        id: "2_0",
        label: "工程制图",
        value: "耿星",
        classroom: "一号楼302",
        className: "自动化1班",
        color: "",
        conflit: conflits[random(0, conflits.length)],
      },
    ];
    return {
      day: formatDateNoTime(day, "/"),
      list: [
        {
          label: "第一节课",
          course: rate === 0 && flag < min ? defaultArr : [],
        },
        {
          label: "第二节课",
          course: rate === 1 && flag < min ? defaultArr : [],
        },
        {
          label: "第三节课",
          course: rate === 2 && flag < min ? defaultArr : [],
        },
        {
          label: "第四节课",
          course: rate === 3 && flag < min ? defaultArr : [],
        },
        {
          label: "第五节课",
          course: rate === 4 && flag < min ? defaultArr : [],
        },
        {
          label: "第六节课",
          course: rate === 5 && flag < min ? defaultArr : [],
        },
        {
          label: "第七节课",
          course: rate === 6 && flag < min ? defaultArr : [],
        },
        {
          label: "第八节课",
          course: rate === 7 && flag < min ? defaultArr : [],
        },
        {
          label: "第九节课",
          course: rate === 8 && flag < min ? defaultArr : [],
        },
        {
          label: "第十节课",
          course: rate === 9 && flag < min ? defaultArr : [],
        },
      ],
      list2: [
        {
          label: "第一节课",
          course: rate2 === 0 && flag < min ? defaultArr2 : [],
        },
        {
          label: "第二节课",
          course: rate2 === 1 && flag < min ? defaultArr2 : [],
        },
        {
          label: "第三节课",
          course: rate2 === 2 && flag < min ? defaultArr2 : [],
        },
        {
          label: "第四节课",
          course: rate2 === 3 && flag < min ? defaultArr2 : [],
        },
        {
          label: "第五节课",
          course: rate2 === 4 && flag < min ? defaultArr2 : [],
        },
        {
          label: "第六节课",
          course: rate2 === 5 && flag < min ? defaultArr2 : [],
        },
        {
          label: "第七节课",
          course: rate2 === 6 && flag < min ? defaultArr2 : [],
        },
        {
          label: "第八节课",
          course: rate2 === 7 && flag < min ? defaultArr2 : [],
        },
        {
          label: "第九节课",
          course: rate2 === 8 && flag < min ? defaultArr2 : [],
        },
        {
          label: "第十节课",
          course: rate2 === 9 && flag < min ? defaultArr2 : [],
        },
      ],
    };
  })
);
let oldMonth = JSON.parse(JSON.stringify(month.value));
function onUpdate(val) {
  console.log("update", val);
}
function onAdd(val) {
  console.log("add", val);
}
function remove(val) {
  if (val.clonedData.color) {
    val.clonedData.color = "";
  } else {
    val.clonedData.color = "#ebcece";
  }
  console.log("remove", val);
}
const colorMap = {}; // color:[]
function colorFun(row, pa, index) {
  console.log(row);
  if (row) {
    pa[index].color = color.value;
  }
  if (colorMap[color.value]) {
    [
      "className",
      "classroom",
      "color",
      "conflit",
      "id",
      "label",
      "value",
    ].forEach((f) => {
      let temp = colorMap[color.value][0].pa[colorMap[color.value][0].index][f];
      colorMap[color.value][0].pa[colorMap[color.value][0].index][f] =
        pa[index][f];
      pa[index][f] = temp;
    });
    // pa[index]['color'] = ""
    // colorMap[color.value][0].pa[colorMap[color.value][0].index]['color'] = ""
    colorMap[color.value] = null;
  } else {
    colorMap[color.value] = [{ pa: pa, index: index }];
  }
}
// 停课
function stopFun(row, pa, index) {
  if(pa[index].color === "#c03639"){
    proxy.$modal
        .confirm("是否确认重启当前课程?")
        .then(() => {
          pa[index].color = "";
          proxy.$modal.msgSuccess("重启成功");
        })
        .catch(() => {});
  } else {
    proxy.$modal
        .confirm("是否确认停止当前课程?")
        .then(() => {
          pa[index].color = "#c03639";
          proxy.$modal.msgSuccess("停课成功");
        })
        .catch(() => {});
  }
}
// 编辑框
const form = ref(null);
const show = ref(false);
let parent = { p: null, index: -1 };
function showFun(row, pa, index) {
  show.value = !show.value;
  if (row) {
    parent.p = pa;
    parent.index = index;
    form.value = row;
  }
}
function update(row) {
  parent.p[parent.index] = row;
  show.value = !show.value;
}
function handleQuery() {}
</script>
<style lang="scss" scoped>
.flex-con {
  display: flex;
}
.flex-col {
  width: 50%;
}
.con {
  padding: 20px;
}
.cursor-move {
  cursor: pointer;
  padding: 10px;
  line-height: 26px;
  border: 1px solid #f0eaea;
  border-radius: 4px;
}
.roundRect {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: #246cdd;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redBg{
  background-color: #c03639;
}
</style>
