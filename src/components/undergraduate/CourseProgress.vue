<!-- 统一标题组件 -->
<template>
  <div class="calendar-con">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      label-width="100px"
      class="mb10"
    >
      <div
        :class="{ 'search-max-form': true, 'search-min-form': false }"
        :style="{ height: expand ? 'auto' : '33px' }"
      >
        <div class="search-grid">
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
          <el-button size="mini" @click="change=!change">{{change?'学院':'整体'}}</el-button>
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
    <el-table :data="change?tableData:tableData2" height="537" border style="width: 100%">
      <el-table-column
        :prop="c.prop"
        :label="c.name"
        :width="c.width || 'auto'"
        v-for="c in cloumns"
        :key="c.prop"
      >
        <template v-slot="{ row, column }">
          <el-progress
            :percentage="row[column.property]"
            :stroke-width="15"
            v-if="column.property === 'field_1'"
          />
          <el-button
            :icon="Document"
            @click="setPlanOpen(row, '教学计划')"
            v-if="column.property === 'field_4'"
          ></el-button>
          <span v-if="!['field_1', 'field_4'].includes(column.property)">{{
            row[column.property]
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template v-slot="{ row }">
          <div class="table-tool">
            <div @click="setOpen(row, '催办')">催办</div>
            <!-- <div class="line"></div>
            <div @click="setOpen(row, '补课')">补课</div>
            <div class="line"></div>
            <div class="red" @click="setOpen(row, '停课')" v-show="!lock">
              停课
            </div> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 调停补课弹框 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body>
      <div class="openText">
        申请2024-09-29<span class="blue"
          >{{ row.field_0 }}-{{ row.field_2 }}</span
        >{{ title }}1次，状态：<span class="green">已审批</span>。
      </div>
      <div class="openText">
        申请2024-11-01<span class="blue"
          >{{ row.field_0 }}-{{ row.field_2 }}</span
        >{{ title }}1次，状态：<span class="green">已审批</span>。
      </div>
      <div class="openText">
        申请2024-11-28<span class="blue"
          >{{ row.field_0 }}-{{ row.field_2 }}</span
        >{{ title }}1次，状态：<span class="red">未审批</span>。
      </div>
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
    <!-- 学生弹框 -->
    <el-dialog
      :title="title"
      v-model="studentOpen"
      width="1200px"
      append-to-body
    >
      <el-table
        ref="zkTableRef"
        :data="tableState.data"
        v-loading="tableState.loading"
        style="width: 100%"
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
          :key="column.studentNum"
          :prop="column.field"
          :label="column.label"
          :width="column.width"
        ></el-table-column>
      </el-table>
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
    <!-- 教学计划弹框 -->
    <el-dialog :title="title" v-model="planOpen" width="1200px" append-to-body>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="课程信息" name="1">
          <template #title>
            <span class="title1">课程信息</span>
          </template>
          <div class="grid_2">
            <div>课程名称：{{ row.field_2 }}</div>
            <div>英文名称：Electronic Technique</div>
          </div>
          <div class="grid_2">
            <div>课程代码：013D36A1</div>
            <div>学分/学时：3/48(课堂教学36课时+实验项目12学时)</div>
          </div>
          <div class="grid_2">
            <div>课程性质：必修</div>
            <div>适用专业：机械类、信息类</div>
          </div>
          <div class="grid_2">
            <div>先修课程：普通物理、电气基础</div>
            <div>后续课程：微机原理及应用、机电控制系统</div>
          </div>
          <div class="grid_2">
            <div>开课院系：电气学院 电工电子教学部</div>
            <div>授课教师：齐浒</div>
          </div>
          <div class="grid_2">
            <div>办公室：本校区行政楼333办公室</div>
            <div>
              联系方式：TEL:021-32345441（O），189xxxx516（M）;E-mail:lxxxxn@xnkj.edu.cn
            </div>
          </div>
          <div class="grid_2">
            <div>
              辅导答疑：周一：12:00—16:00，周四：10:00—14:00行政楼333办公室
            </div>
            <div>答疑时间地点：周三：18:00—20:00，机械学院大楼335实验室：</div>
          </div>
          <div>
            教 材：《电工学》（第7版）下册，秦曾煌等编著，
            高等教育出版社，2015.12
          </div>
          <div class="planColorBlock mt20">
            <div>参考书：</div>
            <div class="grid_2">
              <div>
                1. 《模拟电子技术基础》，沈任元主编，机械工业出版社，2013.08
              </div>
              <div>
                2. 《数字电子技术基础》，沈任元主编，机械工业出版社，2010.07
              </div>
            </div>
            <div class="grid_2">
              <div>
                3.
                《模拟电子技术基础》（第4版），童诗白等编著，高等教育出版社，2011.01
              </div>
              <div>
                4.
                《数字电子技术基础》（第5版），阎石等编著，高等教育出版社，2006.10
              </div>
            </div>
            <div class="grid_2">
              <div>
                5.
                《电力电子技术》（第5版），王兆安等编著，机械工业出版社，2009.07
              </div>
              <div>6. 电子CDA----PROTEL软件使用</div>
            </div>
            <div class="grid_2">
              <div>7. 示波器、函数发生器等使用手册</div>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="课程学习目标" name="2">
          <template #title>
            <span class="title1">课程学习目标</span>
          </template>
          <div class="line36">
            《{{
              row.field_2
            }}》课程是非电类专业的学科专业基础课程。通过本课程的学习，可以掌握电子电路的基础知识和和基本技能，具有单相整流电路、基本放大电路、基本逻辑门电路的设计和分析能力，具备正确使用电子CAD软件、万用表、示波器等常用仪器仪表完成基本电子电路的设计、制作、调试的能力，能够正确完成常用电子元器件的选型和使用，了解使用电子技术电路的技术标准、技术规范、技术手册等，并为后续课程的学习和从事与本专业有关的工作奠定基础。
          </div>
        </el-collapse-item>
        <el-collapse-item title="课程学习内容和基本要求" name="3">
          <template #title>
            <span class="title1">课程学习内容和基本要求</span>
          </template>
          <div class="line36">
            《{{
              row.field_2
            }}》课程教学由三大模块组成：电源模块、检测放大模块及逻辑与控制模块。
          </div>
          <div class="title2 mt10">
            1. 电源模块的基本要求和学习内容（12学时）
          </div>
          <div class="grid_2">
            <div>（1）掌握半导体二极管的基本结构、伏安特性及主要参数。</div>
            <div>（2）掌握稳压二极管的基本特性、主要参数。</div>
          </div>
          <div class="grid_2">
            <div>
              （3）掌握单相半波、单相桥式全控整流电路的工作原理、理解整流电路的数量关系。
            </div>
            <div>（4）掌握滤波器的工作原理，及滤波器在整流电路中的作用。</div>
          </div>
          <div class="grid_2">
            <div>
              （5）了解直流稳压电源的工作原理及基本组成，掌握集成直流稳压电源的使用方法。
            </div>
            <div>
              （6）了解常用的电力电子器件的使用方法：功率场效应管（VDMOS）。
            </div>
          </div>
          <div class="grid_2">
            <div>（7）了解单相桥式逆变电路及斩波电路的工作原理。</div>
            <div>（8）了解开关电源的工作原理。</div>
          </div>
          <div class="grid_2">
            <div>
              （9）制作电源模块，输入交流220v，输出直流+5v，+12v，电流小于1A。
            </div>
          </div>
          <div class="title2 mt10">
            2. 检测放大模块的基本要求和基本内容（15学时）
          </div>
          <div class="grid_2">
            <div>1）掌握双极型晶体管的工作原理和主要参数。</div>
            <div>
              2）掌握共射极、共集电极单管放大电路静态工作点的作用和简化微变等效电路的分析方法。
            </div>
          </div>
          <div class="grid_2">
            <div>3）掌握放大电路的基本性能指标，了解多级放大的概念。</div>
            <div>4）了解基本的互补对称功率放大电路的工作原理。</div>
          </div>
          <div class="grid_2">
            <div>5）掌握差分放大电路的工作原理。</div>
            <div>
              6）理解反馈概念，了解反馈类型和负反馈对放大电路性能的影响。
            </div>
          </div>
          <div class="grid_2">
            <div>
              7）掌握用集成运算放大器组成的比例、加、减、积分和微分运算的工作原理。
            </div>
            <div>8）掌握电压比较器的工作原理及应用。</div>
          </div>
          <div class="grid_2">
            <div>
              9）了解用集成运算放大器组成的RC正弦波振荡器电路的工作原理。
            </div>
            <div>10）了解有源滤波的概念。</div>
          </div>
          <div class="grid_2">
            <div>11）制作步进电机功率放大电路。</div>
          </div>
          <div class="title2 mt10">
            3. 逻辑与控制模块的基本要求和基本内容（15学时）
          </div>
          <div class="grid_2">
            <div>1）掌握数字量的概念。</div>
            <div>
              2）掌握与门、或门、非门、与非门、异或门的逻辑功能，了解三态门的概念。
            </div>
          </div>
          <div class="grid_2">
            <div>3）掌握简单组合逻辑电路的分析和设计。</div>
            <div>
              4）了解多路选择开关、二进制译码器的工作原理，掌握七段LED显示译码驱动器的功能。
            </div>
          </div>
          <div class="grid_2">
            <div>5）掌握D触发器的逻辑功能。</div>
            <div>6）了解寄存器的工作原理。</div>
          </div>
          <div class="grid_2">
            <div>
              7）理解555集成定时器的工作原理，掌握用555集成定时器组成的单稳态触发器和多谐振荡器的工作原理。
            </div>
            <div>8）制作步进电机控制电路，实现步进电机转速控制。</div>
          </div>
          <div class="title2 mt10">
            4. 课程项目综合调试模块的基本要求和基本内容（6学时）
          </div>
          <div class="grid_2">
            <div>
              1）电源模块、检测放大模块及逻辑控制模块联机调试（以步进电机的综合控制为例）
            </div>
            <div>2）课程习题讨论、课程作品演示等。</div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="学时分配表" name="4">
          <template #title>
            <span class="title1">学时分配表</span>
          </template>
          <el-table
            ref="scoreTableRef"
            :data="scoreTable.data"
            style="width: 100%"
            height="100%"
            :border="true"
          >
            <el-table-column
              v-for="column in scoreTable.columns"
              :key="column.studentNum"
              :prop="column.field"
              :label="column.label"
              :width="column.width"
            ></el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="考核方式与成绩评定" name="5">
          <template #title>
            <span class="title1">考核方式与成绩评定</span>
          </template>
          <div class="line36">
            课程学习成绩的评定采用过程考核与期末考核相结合的方式进行综合评价。其中：
          </div>
          <div class="title2 mt10">1．平时测验</div>
          <div class="line36">
            课程每一模块内容学习完毕，都有一次课程测试，时间为45分钟；每次测试成绩分值为100分；课程共有3次测验。
          </div>
          <div class="title2 mt10">2．考勤作业</div>
          <div class="line36">
            课堂考勤100分，无故缺勤6分/次，事假迟到早退2分/次；作业100分，根据每次作业得分计算平均分，抄作业（被炒或抄袭），则本次作业得分为50分。
          </div>
          <div class="title2 mt10">3．项目试验</div>
          <div class="line36">
            模块项目制作共3次，每次100分，其中实验作品占50%，实验报告50%；项目综合调试100分，其中作品展示完成度50%，综合报告25%，交流讨论25%。
          </div>
          <div class="title2 mt10">4．期末考试</div>
          <div class="line36">
            笔试（闭卷），分值100分，按各章知识点要求，突出重点，兼顾一般内容。重点考核知识的活用及其分析和解决问题的能力。
          </div>
          <div class="title2 mt10">5．课程成绩综合评定</div>
          <div class="line36">
            平时成绩占60%（测试3×10%+考勤作业10%+实验项目20%）；期末考试成绩占40%。
          </div>
        </el-collapse-item>
      </el-collapse>
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
import {
  Document,
} from "@element-plus/icons-vue";
import useGraduateStore from "@/store/modules/graduate";
const graduateStore = useGraduateStore();
const { proxy } = getCurrentInstance();
const cloumns = ref([
  { name: "学院", prop: "field_0" },
  { name: "培养方案进度", prop: "field_1" },
  { name: "已提交", prop: "field_2" },
  { name: "未提交", prop: "field_3" },
  { name: "培养方案", prop: "field_4", width: 80 },
]);
const tableData = ref([
  {
    field_0: "信息工程学院",
    field_1: Math.floor((123 / 150) * 100),
    field_2: 123,
    field_3: 31,
    field_4: "工程制图",
    field_5: "",
  },
  {
    field_0: "环境与资源学院",
    field_1: Math.floor((56 / 150) * 100),
    field_2: 56,
    field_3: 96,
    field_4: "微生物学基础",
    field_5: "工程制图",
  },
  {
    field_0: "制造科学与工程学院",
    field_1: Math.floor((32 / 150) * 100),
    field_2: 32,
    field_3: 125,
    field_4: "工程制图",
    field_5: "工程制图",
  },
  {
    field_0: "土木工程与建筑学院",
    field_1: Math.floor((127 / 150) * 100),
    field_2: 127,
    field_3: 37,
    field_4: "工程制图",
    field_5: "工程制图",
  },
  {
    field_0: "计算机科学与技术学院",
    field_1: Math.floor((106 / 150) * 100),
    field_2: 106,
    field_3: 53,
    field_4: "工程制图",
    field_5: "工程制图",
  },
  {
    field_0: "数理学院",
    field_1: Math.floor((96 / 150) * 100),
    field_2: 96,
    field_3: 69,
    field_4: "工程制图",
    field_5: "工程测量学",
  },
  {
    field_0: "法学院",
    field_1: Math.floor((92 / 150) * 100),
    field_2: 92,
    field_3: 62,
    field_4: "微生物学基础",
    field_5: "",
  },
  {
    field_0: "外国语学院",
    field_1: Math.floor((73 / 150) * 100),
    field_2: 73,
    field_3: 79,
    field_4: "工程测量学",
    field_5: "工程制图",
  },
  {
    field_0: "体育与健康学院",
    field_1: Math.floor((115 / 150) * 100),
    field_2: 115,
    field_3: 47,
    field_4: "工程制图",
    field_5: "微生物学基础",
  },
  {
    field_0: "工程技术中心",
    field_1: Math.floor((140 / 150) * 100),
    field_2: 140,
    field_3: 14,
    field_4: "",
    field_5: "工程制图",
  },
]);
const tableData2 = ref([
{
    field_0: "整体",
    field_1: Math.floor((960 / 1573) * 100),
    field_2: tableData.value.reduce((prev,cur)=>prev+cur.field_2,0),
    field_3: tableData.value.reduce((prev,cur)=>prev+cur.field_3,0),
    field_4: "工程制图",
    field_5: "",
  },
])
const change = ref(true);
// 调停补课
const handleUpdate = () => {};
const handleSee = () => {};
const handleDelete = () => {};
// 弹框
const activeName = ref(1);
const title = ref("");
const open = ref(false);
const row = ref({});
const setOpen = (rowFake, str) => {
  proxy.$modal.msgSuccess("已发送催办消息");
};
const cancel = () => {
  open.value = false;
  studentOpen.value = false;
  planOpen.value = false;
};
const submitForm = () => {
  open.value = false;
  studentOpen.value = false;
  planOpen.value = false;
};
const tableState = reactive({
  columns: [
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
      field: "gender",
      label: "性别",
      type: "",
      width: "",
    },
    {
      field: "nation",
      label: "民族",
      type: "",
      width: "",
    },
    {
      field: "politicalStatus",
      label: "政治面貌",
      type: "",
      width: "",
    },
    {
      field: "dateOfBirth",
      label: "出生日期",
      type: "",
      width: "",
    },
    {
      field: "nativePlace",
      label: "籍贯",
      type: "",
      width: "",
    },
    {
      field: "contactNumber_view",
      label: "联系电话",
      type: "",
      width: "",
    },
  ],
  data: graduateStore.infoTableData,
  loading: false,
  total: graduateStore.infoTableData.length,
});
const scoreTable = reactive({
  columns: [
    {
      field: "field_0",
      label: "内容",
      type: "",
      width: "200px",
    },
    {
      field: "field_1",
      label: "课堂",
      type: "",
      width: "",
    },
    {
      field: "field_2",
      label: "习题讨论",
      type: "",
      width: "",
    },
    {
      field: "field_3",
      label: "项目实现",
      type: "",
      width: "",
    },
    {
      field: "field_4",
      label: "其他",
      type: "",
      width: "",
    },
  ],
  data: [
    { field_0: "电源模块", field_1: 12, field_2: 2, field_3: 0, field_4: 0 },
    {
      field_0: "检测与放大模块",
      field_1: 6,
      field_2: 0,
      field_3: 4,
      field_4: 0,
    },
    {
      field_0: "逻辑与控制模块",
      field_1: 8,
      field_2: 0,
      field_3: 1,
      field_4: 2,
    },
  ],
  loading: false,
  total: 0,
});
const studentOpen = ref(false);
const setStudentOpen = (rowFake, str) => {
  studentOpen.value = !studentOpen.value;
  row.value = rowFake;
  title.value = str;
};
const planOpen = ref(false);
const setPlanOpen = (rowFake, str) => {
  planOpen.value = !planOpen.value;
  row.value = rowFake;
  title.value = str;
};
onMounted(() => {});

const queryParams = ref({
  type: "",
  name: "",
  color: "",
  pageNum: 1,
  pageSize: 10,
});
// 表单字段
const formFeild = [
  {
    name: "学院",
    prop: "type",
    type: "select",
    options: [
      "信息工程学院",
      "环境与资源学院",
      "制造科学与工程学院",
      "计算机科学与技术学院",
      "数理学院",
      "法学院",
      "外国语学院",
      "体育与健康学院",
      "工程技术学院",
    ],
  },
  {
    name: "状态",
    prop: "status",
    type: "select",
    options: [
      "已提交",
      "未提交",
    ],
  },
];
</script>
<style lang="scss" scoped>
$blue: #3c6fd0;
$green: #33a92d;
$red: #c03639;
.blue {
  color: $blue;
  font-weight: bold;
}
.green {
  color: $green;
  font-weight: bold;
}
.red {
  color: $red;
  font-weight: bold;
}
.openText {
  color: #666666;
  line-height: 36px;
}
.grid_2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  line-height: 36px;
}
.title1 {
  font-size: 18px;
  color: $blue;
  font-weight: bold;
  line-height: 36px;
}
.title2 {
  font-size: 16px;
  color: #666;
  line-height: 36px;
  background-color: aliceblue;
}
.planColorBlock {
  border-radius: 6px;
  background-color: aliceblue;
  padding: 20px;
}
.line36 {
  line-height: 36px;
}
.search-grid {
  grid-template-columns: repeat(2, 1fr);
}
.search-max-form{
  grid-template-columns: calc(100% - 200px - 24px) 200px;
}
</style>
