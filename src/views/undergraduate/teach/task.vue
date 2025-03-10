<!-- 教学方案制定 -->
<template>
  <div class="app-container">
    <div class="search-tip">
      全局维护时间：2024-11-01 00:00~2024-11-30 00:00
    </div>
    <div class="search-box">
      <div class="grid_5">
        <div v-for="feild in searchField" :key="feild.prop">
          <div class="title">{{ feild.name }}:</div>
          <el-select
            clearable
            v-model="searchBox[feild.prop]"
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
      </div>
    </div>
    <div class="content-con">
      <div class="left">
        <div class="grid_2">
          <el-button
            :type="t.type"
            :icon="t.icon"
            size="mini"
            v-for="t in searchTools"
            :key="t.name"
            :plain="t.plain"
            @click="t.func"
            >{{ t.name }}</el-button
          >
        </div>
        <el-tree
          style="max-width: 300px"
          :data="treeData"
          :props="defaultProps"
          highlight-current
          @node-click="handleNodeClick"
          :render-content="renderContent"
        />
      </div>
      <div class="right">
        <el-tabs v-model="tabName" class="demo-tabs">
          <el-tab-pane label="上课班级" name="first">
            <el-row :gutter="10" class="mb12">
              <el-col :span="1.5" v-for="t in tableTools">
                <el-button
                  :type="t.type"
                  :icon="t.icon"
                  size="mini"
                  :plain="t.plain"
                  @click="t.func"
                  >{{ t.name }}</el-button
                >
              </el-col>
            </el-row>
            <el-table :data="tableData" height="250" style="width: 100%">
              <el-table-column type="selection" width="55" />
              <el-table-column
                :prop="c.prop"
                :label="c.name"
                :width="c.width || 'auto'"
                v-for="c in cloumns"
                :key="c.prop"
              />
              <el-table-column label="操作" width="160">
                <template v-slot="{ row }">
                  <div class="table-tool">
                    <div @click="handleUpdate(row)">修改</div>
                    <div class="line"></div>
                    <div @click="handleSee(row)">查看</div>
                    <div class="line"></div>
                    <div class="red" @click="handleDelete(row)">删除</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="教学班信息" name="second"
            ><div class="title-square">课程设置</div>
            <el-table
              :data="tableData2"
              height="650"
              style="width: 100%"
              v-show="showClass"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column
                :prop="c.prop"
                :label="c.name"
                :width="c.width || 'auto'"
                v-for="c in cloumns2"
                :key="c.prop"
              />
              <el-table-column label="操作" width="160">
                <template v-slot="{ row }">
                  <div class="table-tool">
                    <div @click="handleUpdate(row)">修改</div>
                    <div class="line"></div>
                    <div @click="handleSee(row)">查看</div>
                    <div class="line"></div>
                    <div class="red" @click="handleDelete(row)">删除</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :data="tableData3"
              height="650"
              style="width: 100%"
              v-show="!showClass"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column
                :prop="c.prop"
                :label="c.name"
                :width="c.width || 'auto'"
                v-for="c in cloumns3"
                :key="c.prop"
              />
              <el-table-column label="操作" width="160">
                <template v-slot="{ row }">
                  <div class="table-tool">
                    <div @click="handleUpdate(row)">修改</div>
                    <div class="line"></div>
                    <div @click="handleSee(row)">查看</div>
                    <div class="line"></div>
                    <div class="red" @click="handleDelete(row)">删除</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="教材信息" name="third">
            <div class="title-square">教材信息</div>
            <div>
            2016年1月清华大学出版社出版的图书，作者是邵发。
          </div>
          </el-tab-pane>
          <el-tab-pane label="限选条件" name="fourth">
            <el-collapse v-model="activeNames">
              <el-collapse-item title="本科生限选条件" name="1">
                <el-checkbox
                  v-model="item.checked"
                  v-for="item in limitedConditions1"
                  :label="item.label"
                  size="large"
                />
              </el-collapse-item>
              <el-collapse-item title="研究生限选条件" name="2">
                <el-checkbox
                  v-model="item.checked"
                  v-for="item in limitedConditions2"
                  :label="item.label"
                  size="large"
                />
              </el-collapse-item>
              <el-collapse-item title="本研限选条件" name="3">
                <el-checkbox
                  v-model="item.checked"
                  v-for="item in limitedConditions3"
                  :label="item.label"
                  size="large"
                />
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 新建班级 -->
    <el-dialog
      :title="title"
      v-model="newClassOpen"
      width="1200px"
      append-to-body
    >
      <el-form
        ref="dataForm"
        :model="form"
        :rules="rules"
        label-width="120px"
        :disabled="title.indexOf('查看') === 0"
        v-if="newClassOpen"
      >
        <div class="title-square">基本信息</div>
        <div class="form-grid">
          <el-form-item
            :label="feild.name + ':'"
            prop="type"
            v-for="feild in newClassFields"
          >
            <!-- 单选select -->
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
            <!-- 分级多选select -->
            <el-select
              v-model="queryParams[feild.prop]"
              :placeholder="'请选择' + feild.name"
              multiple
              clearable
              collapse-tags
              popper-class="custom-header"
              :max-collapse-tags="10"
              v-if="feild.type === 'groupSelect'"
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
            <!-- input输入 -->
            <el-input
              v-model="queryParams[feild.prop]"
              :placeholder="'请输入' + feild.name"
              v-if="feild.type === 'input'"
            />
            <!-- input输入 -->
            <el-input
              v-model="queryParams[feild.prop]"
              type="textarea"
              :rows="4"
              :placeholder="'请输入' + feild.name"
              v-if="feild.type === 'textarea'"
            />
            <!-- 日期范围 -->
            <el-date-picker
              v-model="queryParams[feild.prop]"
              type="daterange"
              range-separator="至"
              v-if="feild.type === 'dateRange'"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-switch
              v-model="queryParams[feild.prop]"
              active-color="#145fff"
              inactive-color="#f03f3c"
              v-if="feild.type === 'switch'"
            >
            </el-switch>
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
    <!-- 从行政班、专业、专业方向、方案的维度，进行教学任务的学生的推荐 -->
    <el-dialog
      :title="title"
      v-model="recommendOpen"
      width="1200px"
      append-to-body
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="行政班推荐" name="1">
          <el-checkbox
            v-model="item.checked"
            v-for="item in recommend1"
            :label="item.label"
            size="large"
          />
        </el-collapse-item>
        <el-collapse-item title="专业推荐" name="2">
          <el-checkbox
            v-model="item.checked"
            v-for="item in recommend2"
            :label="item.label"
            size="large"
          />
        </el-collapse-item>
        <el-collapse-item title="专业方向推荐" name="3">
          <el-checkbox
            v-model="item.checked"
            v-for="item in recommend3"
            :label="item.label"
            size="large"
          />
        </el-collapse-item>
        <el-collapse-item title="方案推荐" name="4">
          <el-checkbox
            v-model="item.checked"
            v-for="item in recommend4"
            :label="item.label"
            size="large"
          />
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
import useScheduleStore from "@/store/modules/schedule";
import useScheduleItemsStore from "@/store/modules/scheduleItem";
import { formatDateNoTime } from "@/utils/index.js";
const { proxy } = getCurrentInstance();
const dataStore = useScheduleStore();
// search
const searchField = [
  {
    name: "年级",
    prop: "field_0",
    type: "select",
    options: ["一年级", "二年级", "三年级", "四年级", "五年级"],
  },
  {
    name: "学院",
    prop: "field_1",
    type: "select",
    options: ["经济管理学院", "自动化学院", "计算机科学与技术学院", "数理学院"],
  },
  {
    name: "专业",
    prop: "field_2",
    type: "select",
  },
  {
    name: "专业方向",
    prop: "field_3",
    type: "select",
  },
  {
    name: "学生类别",
    prop: "field_4",
    type: "select",
  },
];
const searchBox = ref({
  field_0: "一年级",
  field_1: "经济管理学院",
  field_2: "",
  field_3: "",
  field_4: "",
});
const searchTools = ref([
  {
    name: "新增",
    type: "primary",
    plain: false,
    icon: "CirclePlus",
    func: () => {
      newClassOpen.value = !newClassOpen.value;
      title.value = "新增教学班";
    },
  },
  {
    name: "复制",
    type: "",
    plain: true,
    icon: "CopyDocument",
    func: () => {},
  },
]);
// left
const showClass = ref(true);
const handleNodeClick = (data) => {
  console.log(data);
  if (data.label.indexOf("学院") > -1) {
    showClass.value = true;
  } else {
    showClass.value = false;
  }
};
const remove = (node, data) => {
  proxy.$modal
    .confirm("是否确认删除?")
    .then(() => {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      treeData.value = [...treeData.value];
      proxy.$modal.msgSuccess("删除成功");
    })
    .catch(() => {});
};
const append = (data) => {
  const newChild = { id: id++, label: '国际税务', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  treeData.value = [...treeData.value]
}
const renderContent = (h, { node, data, store }) => {
  if (["微观经济学[L234924]"].includes(data.label)) {
    return h(
      "span",
      {
        class: "custom-tree-node",
      },
      h("span", null, node.label),
      h(
        "span",
        null,
        h(
        'a',
        {
          style: "margin-left: 8px;color:#3c6fd0",
          onClick: () => append(data),
        },
        '新增 '
      ),
        h(
          "a",
          {
            style: "margin-left: 8px;color:#C03639",
            onClick: () => remove(node, data),
          },
          "删除"
        )
      )
    );
  }else {
    return h(
      "span",
      {
        class: "custom-tree-node",
      },
      h("span", null, node.label),
      h(
        "span",
        null,
      )
    );
  }
};
const treeData = ref([
  {
    label: "经济管理学院",
    children: [
      {
        label: "微观经济学[L234924]",
        children: [
          {
            label: "06微观经济学",
          },
          {
            label: "07微观经济学",
          },
          {
            label: "08微观经济学",
          },
          {
            label: "09微观经济学",
          },
          {
            label: "10微观经济学",
          },
        ],
      },
    ],
  },
  {
    label: "自动化学院",
  },
]);
const defaultProps = {
  children: "children",
  label: "label",
};
// 新建班级弹框
const newClassOpen = ref(false);
const title = ref("新建班级");
const newClassFields = ref([
  { name: "课程号", prop: "field_0", type: "input" },
  {
    name: "排课单位",
    prop: "field_1",
    type: "select",
    options: ["经济管理学院", "自动化学院"],
  },
  { name: "课容量", prop: "field_2", type: "input" },
  { name: "停开课容量", prop: "field_3", type: "input" },
  {
    name: "校区",
    prop: "field_4",
    type: "select",
    options: ["本校区", "东校区"],
  },
  { name: "授课学时", prop: "field_5", type: "input" },
  {
    name: "考试类型",
    prop: "field_6",
    type: "select",
    options: ["笔试", "机试", "实践论文"],
  },
  {
    name: "教学方式",
    prop: "field_7",
    type: "select",
    options: ["线下", "线上"],
  },
  {
    name: "是否需要排课",
    prop: "field_8",
    type: "select",
    options: ["是", "否"],
  },
  { name: "教学班个数", prop: "field_9", type: "input" },
]);
const queryParams = ref({
  field_0: "02012107",
  field_1: "经济管理学院",
  field_2: 30,
  field_3: 30,
  field_4: "本校区",
  field_5: 54,
  field_6: "笔试",
  field_7: "线下",
  field_8: "是",
});
// right
const tabName = ref("first");
// 表格-课程设置
const tableData = ref([
  {
    field_0: 1,
    field_1: "24级",
    field_2: "经济管理学院",
    field_3: "C程序设计基础",
    field_4: "货币金融服务",
    field_5: "内招生",
    field_6: "2024级经济管理学院1班",
    field_7: "43",
    field_8: "本校区",
  },
  {
    field_0: 2,
    field_1: "24级",
    field_2: "经济管理学院",
    field_3: "高等数学",
    field_4: "国际结算",
    field_5: "内招生",
    field_6: "2024级经济管理学院2班",
    field_7: "35",
    field_8: "本校区",
  },
]);
const cloumns = ref([
  { name: "序号", prop: "field_0", width: 70 },
  { name: "年级", prop: "field_1" },
  { name: "所在院系", prop: "field_2" },
  { name: "专业", prop: "field_3", width: 160 },
  { name: "专业方向", prop: "field_4", width: 160 },
  { name: "学生类别", prop: "field_5", width: 90 },
  { name: "班级", prop: "field_6", width: 160 },
  { name: "人数", prop: "field_7" },
  { name: "校区", prop: "field_8", width: 90 },
]);
const activeNames = ref(false);
const recommendOpen = ref(false);
const recommend1 = ref([
  { label: "2024文学院汉语言文学师范生外招生", checked: false },
  { label: "2024文学院历史学主修外招生", checked: false },
]);
const recommend2 = ref([
  { label: "2024文学院历史学主修内招生", checked: false },
  { label: "2024文学院历史学师范生外招生", checked: false },
]);
const recommend3 = ref([
  { label: "2024文学院中国语言文学汉语言主修内招生", checked: false },
  { label: "2024文学院中国语言文学戏剧影视文学主修内招生", checked: false },
]);
const recommend4 = ref([
  { label: "2024理工学院应用物理学主修内招生", checked: false },
  { label: "2024理工学院工程力学主修内招生", checked: false },
]);
const limitedConditions1 = ref([
  { checked: false, label: "大二、大三年级本科学生每人限选一门课程" },
  {
    checked: false,
    label:
      "本科生毕业前需完成3门交叉通识课程（公选课），且至少完成1门艺术类课程",
  },
  { checked: false, label: "大四年级本科学生每人最多可选三门课程" },
]);
const limitedConditions2 = ref([
  { checked: false, label: "通识教育选修课毕业需要达到总学分要求为16学分" },
]);
const limitedConditions3 = ref([
  {
    checked: false,
    label:
      "通识教育选修课毕业需要达到总学分要求为：海关管理专业为8学分，其它专业为10学分",
  },
  {
    checked: false,
    label:
      "校硕士生进入博士阶段学习的，除生命理论进展类课程外，不得重复选择硕士阶段所学课程",
  },
]);
const tableTools = ref([
  {
    name: "添加",
    type: "primary",
    plain: false,
    icon: "CirclePlus",
    func: () => {
      recommendOpen.value = !recommendOpen.value;
      // 显示行政班级列表
      // 显示专业班级列表
      // 显示专业方向班级列表
      // 显示自定义班级列表
    },
  },
  // {
  //   name: "拆班",
  //   type: "",
  //   plain: true,
  //   icon: "EditPen",
  //   func: () => {},
  // },
  {
    name: "同步至选课限制",
    type: "danger",
    plain: true,
    icon: "Switch",
    func: () => {},
  },
]);
const cancel = () => {
  recommendOpen.value = false;
  newClassOpen.value = false;
};
// 表格-所有班级
const tableData2 = ref([
  {
    field_0: 1,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024会计1班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
  {
    field_0: 2,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024会计2班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
  {
    field_0: 3,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024会计3班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
  {
    field_0: 4,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024会计4班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
  {
    field_0: 5,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024会计5班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
  {
    field_0: 6,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024稽查1班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
  {
    field_0: 7,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024稽查2班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
  {
    field_0: 8,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024稽查3班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
  {
    field_0: 9,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024国际金融1班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
  {
    field_0: 10,
    field_1: "202402012107",
    field_2: "02010001",
    field_3: "微观经济学",
    field_4: "2024国际金融2班",
    field_5: "2024级",
    field_6: "经济管理学院",
    field_7: "",
    field_8: "内招生",
    field_9: 40,
  },
]);
const cloumns2 = ref([
  { name: "序号", prop: "field_0", width: 70 },
  { name: "教学班ID", prop: "field_1" },
  { name: "课程号", prop: "field_2" },
  { name: "课程名", prop: "field_3" },
  { name: "上课班级", prop: "field_4" },
  { name: "年级", prop: "field_5" },
  { name: "排课单位", prop: "field_6" },
  { name: "专业", prop: "field_7" },
  { name: "专业方向", prop: "field_8" },
  { name: "学生类别", prop: "field_9" },
  { name: "人数", prop: "field_9" },
]);
// 表格-所有可成
const tableData3 = ref([
  {
    field_0: 1,
    field_1: "02012107",
    field_2: "保险会计",
    field_3: "经济管理学院",
    field_4: "张菲菲",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
  {
    field_0: 2,
    field_1: "02012108",
    field_2: "金融信托与租赁",
    field_3: "经济管理学院",
    field_4: "李浩",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
  {
    field_0: 3,
    field_1: "02012108",
    field_2: "固定收益证券",
    field_3: "经济管理学院",
    field_4: "罗欢",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
  {
    field_0: 4,
    field_1: "02012108",
    field_2: "随机过程",
    field_3: "经济管理学院",
    field_4: "章程",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
  {
    field_0: 5,
    field_1: "02012108",
    field_2: "风险理论",
    field_3: "经济管理学院",
    field_4: "侯耀明",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
  {
    field_0: 6,
    field_1: "02012108",
    field_2: "机器学习",
    field_3: "经济管理学院",
    field_4: "徐宁",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
  {
    field_0: 7,
    field_1: "02012108",
    field_2: "房地产经济学",
    field_3: "经济管理学院",
    field_4: "范征端",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
  {
    field_0: 8,
    field_1: "02012108",
    field_2: "湾区经济",
    field_3: "经济管理学院",
    field_4: "孙武",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
  {
    field_0: 9,
    field_1: "02012108",
    field_2: "金融法",
    field_3: "经济管理学院",
    field_4: "李康敏",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
  {
    field_0: 10,
    field_1: "02012108",
    field_2: "信息经济学",
    field_3: "经济管理学院",
    field_4: "王大海",
    field_5: "2024会计1班",
    field_6: 0,
    field_7: 0,
    field_8: "本校区",
    field_9: 70,
  },
]);
const cloumns3 = ref([
  { name: "序号", prop: "field_0", width: 70 },
  { name: "课程号", prop: "field_1" },
  { name: "课程名", prop: "field_2" },
  { name: "开设单位", prop: "field_3" },
  { name: "上课教师", prop: "field_4" },
  { name: "上课班级", prop: "field_5" },
  { name: "课容量", prop: "field_6" },
  { name: "停开课容量", prop: "field_7" },
  { name: "校区", prop: "field_8" },
  { name: "授课学时", prop: "field_9" },
]);
const handleUpdate = () => {};
const handleSee = () => {};
const handleDelete = () => {};
onMounted(() => {});
</script>
<style lang="scss" scoped>
.grid_5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px 20px;
  margin-bottom: 20px;
  > div {
    display: flex;
    align-items: center;
    .title {
      width: 100px;
    }
  }
}
.search-tip {
  height: 36px;
  line-height: 36px;
  background-color: #fdf9f4;
  border: 1px solid #fbd48c;
  border-radius: 6px;
  padding-left: 20px;
  margin-bottom: 20px;
}
:deep(.el-tree-node__content) {
  padding-top: 5px;
  padding-bottom: 5px;
  height: 36px;
}
.content-con {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0px 100px;
  .left {
    width: 300px;
    border-right: 2px solid #e4e7ed;
    box-sizing: border-box;
    padding-right: 35px;
    height: 670px;
  }
  .right {
    width: calc(100% - 300px);
  }
}
.form_item {
  display: flex;
  justify-content: space-between;
}
.lock-detail {
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
.schedule-grid {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 100px;
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
:deep(.el-checkbox.el-checkbox--large) {
  display: block;
}
.grid_2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
