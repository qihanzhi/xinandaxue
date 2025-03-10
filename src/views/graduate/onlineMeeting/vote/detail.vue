<template>
  <el-dialog
    v-model="open"
    width="1200px"
    @close="cancel"
    :destroy-on-close="true"
    :close-on-press-escape="false"
    :class="'dialog-modal-box'"
    append-to-body
  >
    <template #header="{}">
      <div class="dialog-modal-header-box">
        <div class="header-title">
          <span>{{ state.title }}</span>
        </div>
      </div>
    </template>
    <template #default>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="申请" name="1">
          <applyCard :formData="formData" />
        </el-tab-pane>
        <el-tab-pane label="学院审核" name="2">
          <VoteProgress
            :yes="tabs[0].yes"
            :no="tabs[0].no"
            index="0"
            @update="show = true"
            v-if="!show"
          />
          <div v-if="show">
            <PieChart
              className="schoolreview"
              :yes="tabs[0].yes"
              :no="tabs[0].no"
            />
            <VoteDetail :yes="tabs[0].yes" :no="tabs[0].no" index="0" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="研究所院审核" name="3">
          <VoteProgress
            :yes="tabs[1].yes"
            :no="tabs[1].no"
            index="1"
            @update="show1 = true"
            v-if="!show1"
          />
          <div v-if="show1">
            <PieChart
              className="schoolreview2"
              :yes="tabs[1].yes"
              :no="tabs[1].no"
            />
            <VoteDetail :yes="tabs[1].yes" :no="tabs[1].no" index="1" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="学位会审核" name="4">
          <VoteProgress
            :yes="tabs[2].yes"
            :no="tabs[2].no"
            index="2"
            @update="show2 = true"
            v-if="!show2"
          />
          <div v-if="show2">
            <PieChart
              className="schoolreview3"
              :yes="tabs[2].yes"
              :no="tabs[2].no"
            />
            <VoteDetail :yes="tabs[2].yes" :no="tabs[2].no" index="2" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, toRaw } from "vue";
import * as _ from "lodash";
import { selectToLabel, multiToLabel, textAreaFormat } from "@/utils/form";
import useStudentInfoCommon from "./common";
import UserAvatar from "./userAvatar";
import Sign from "@/components/Sign/index";
import applyCard from "./comp/applyCard.vue";
import PieChart from "./comp/PieChart.vue";
import VoteDetail from "./comp/voteDetail.vue";
import VoteProgress from "./comp/voteProgress.vue";

const { proxy } = getCurrentInstance();

const emit = defineEmits(["update:modelValue", "submit"]);

const { dics } = useStudentInfoCommon();
const activeName = ref("1");
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  status: {
    // 当前状态， view | edit | add
    type: String,
    default: "view",
  },
  formData: {
    type: Object,
    required: true,
  },
});

const open = computed(() => {
  return props.modelValue;
});

const ruleForm = computed(() => {
  const data = reactive(_.cloneDeep(props.formData));
  return data;
});

const state = reactive({
  title: "优秀博文",
});

const show = ref(false);
const show1 = ref(false);
const show2 = ref(false);
const baseFormRef = ref(null);
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const tabs = [
  { yes: random(4, 7), no: random(0, 1) },
  { yes: random(4, 7), no: random(1, 2) },
  { yes: random(4, 7), no: random(3, 3) },
];

onBeforeMount(() => {
  switch (props.status) {
    case "view":
      state.title = "审核优秀论文申请";
      break;
    case "edit":
      state.title = "编辑优秀论文申请";
      break;
    case "add":
      state.title = "新增优秀论文申请";
      break;
  }
});

// 生成四位随机数
const randF = () => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// 获取学籍号
const getStudentNum = (dateOfBirth) => {
  let code = "L010613";
  const dateStr = dateOfBirth.split("/").join("");
  code += dateStr;
  let randNum = randF();
  code += randNum;

  return code;
};

const validForm = async () => {
  if (!baseFormRef.value) {
    return false;
  }

  const valid = await baseFormRef.value.validate(() => {});

  if (!valid) {
    proxy.$modal.msgWarning("表单填写有误，请重新填写！");
  }

  return valid;
};

const submitForm = async () => {
  const valid = await validForm();

  if (!valid) {
    return;
  }

  // 学籍号自动生成
  ruleForm.value.studentNum = getStudentNum(ruleForm.value.dateOfBirth);

  const postData = toRaw(ruleForm.value);
  emit("submit", postData);
  cancel();
};

const cancel = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped></style>
