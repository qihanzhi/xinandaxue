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
      <div class="form-title">基本信息</div>
      <el-form
        ref="baseFormRef"
        :model="ruleForm"
        :rules="rules"
        size="default"
        label-width="120px"
      >
        <el-row :gutter="35">
          <el-col :span="12">
            <el-form-item :label="'方案名称'" :prop="'title'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.title"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.title }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'版本'" :prop="'version'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.version"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.version }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'方案类型'" :prop="'programType'">
              <template v-if="status != 'view'">
                <el-select
                  v-model="ruleForm.programType"
                  :placeholder="'请选择'"
                  class="w100"
                >
                  <template
                    v-for="option in dics['programType']"
                    :key="option.value"
                  >
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-else>
                <span>{{ ruleForm.programType }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'年级'" :prop="'schoolYear'">
              <template v-if="status != 'view'">
                <el-select
                  v-model="ruleForm.schoolYear"
                  :placeholder="'请选择'"
                  class="w100"
                >
                  <template
                    v-for="option in dics['schoolYear']"
                    :key="option.value"
                  >
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-else>
                <span>{{ ruleForm.schoolYear }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'院系'" :prop="'college'">
              <template v-if="status != 'view'">
                <el-select
                  v-model="ruleForm.college"
                  :placeholder="'请选择'"
                  @change="collegeChange"
                  class="w100"
                >
                  <template
                    v-for="option in dics['college']"
                    :key="option.value"
                  >
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-else>
                <span>{{ ruleForm.college }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'专业'" :prop="'major'">
              <template v-if="status != 'view'">
                <el-select
                  v-model="ruleForm.major"
                  :placeholder="'请选择'"
                  class="w100"
                >
                  <template
                    v-for="option in majorOptions"
                    :key="option.value"
                  >
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-else>
                <span>{{ ruleForm.major }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'课程门数'" :prop="'courseNum'">
              <template v-if="status != 'view'">
                <el-input-number
                  v-model="ruleForm.courseNum"
                  :placeholder="'请输入'"
                  clearable
                ></el-input-number>
              </template>
              <template v-else>
                <span>{{ ruleForm.courseNum }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'学分总数'" :prop="'courseCreditTotal'">
              <template v-if="status != 'view'">
                <el-input-number
                  v-model="ruleForm.courseCreditTotal"
                  :placeholder="'请输入'"
                  clearable
                ></el-input-number>
              </template>
              <template v-else>
                <span>{{ ruleForm.courseCreditTotal }}</span>
              </template>
            </el-form-item>
          </el-col>
          
          <el-col :span="24">
            <el-form-item :label="'方案简介'" :prop="'desc'">
              <template v-if="status != 'view'">
                <el-input type="textarea"
                  v-model="ruleForm.desc"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.desc }}</span>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="35">
          <el-col :span="24">
            <el-form-item :label="'方案课程信息'" :prop="'resume'">
              <template v-if="status != 'view'">
                <editor v-model="ruleForm.resume" :min-height="192" class="w100" />
              </template>
              <template v-else>
                <div v-html="ruleForm.resume"></div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <Course></Course>
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

import useStudentInfoCommon from "../../common";

import Course from './Course.vue'


const { proxy } = getCurrentInstance();

const emit = defineEmits(["update:modelValue", "submit"]);

const { dics, getCascadeOptions } = useStudentInfoCommon();

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
  title: "方案模板",
});

const baseFormRef = ref(null);


const rules = reactive({
  title: [{ required: true, message: "请输入方案名称", trigger: "blur" }],
  version: [{ required: true, message: "请输入方案版本", trigger: "blur" }],
  programType: [{ required: true, message: "请选择方案类型", trigger: "blur" }],
  schoolYear: [{ required: true, message: "请输入年级", trigger: "blur" }],
  college: [{ required: true, message: "请选择院系", trigger: "blur" }],
  major: [{ required: true, message: "请选择专业", trigger: "blur" }],
  courseNum: [{ required: true, message: "请输入课程门数", trigger: "blur" }],
  courseCreditTotal: [{ required: true, message: "请输入学分总数", trigger: "blur" }],
  
});

// 专业选项
const majorOptions = ref([])

// 院系选项选中
const collegeChange = (val) => {
  ruleForm.value.major = '';
  majorOptions.value = getCascadeOptions(val, dics.major);
}

onBeforeMount(() => {
  switch (props.status) {
    case "view":
      state.title = "查看方案模板";
      break;
    case "edit":
      state.title = "编辑方案模板";
      break;
    case "add":
      state.title = "新增方案模板";
      break;
  }
 
  // 初始化级联获取下拉项
  if (ruleForm.value.college) {
    majorOptions.value = getCascadeOptions(ruleForm.value.college, dics.major);
  }
});

// 生成四位随机数
const randF = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 获取学籍号
const getStudentNum = (dateOfBirth) => {
  let code = 'L010613';
  const dateStr = dateOfBirth.split('/').join('');
  code += dateStr;
  let randNum = randF();
  code += randNum;

  return code;
}

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

  // 创建年份
  if (!ruleForm.value.createYear) {
    ruleForm.value.createYear = new Date().getFullYear();
  }

  const postData = toRaw(ruleForm.value);
  emit("submit", postData);
  cancel();
};

const cancel = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>


</style>
