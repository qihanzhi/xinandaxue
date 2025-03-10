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
            <el-row :gutter="35">
              <el-col :span="24">
                <el-form-item :label="'学籍号'" :prop="'studentNum'">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.studentNum"
                      :placeholder="'请输入'"
                      clearable
                      :disabled="true"
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.studentNum }}</span>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="'姓名'" :prop="'name'">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.name"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.name }}</span>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="'性别'" :prop="'gender'">
                  <template v-if="status != 'view'">
                    <el-select
                      v-model="ruleForm.gender"
                      :placeholder="'请选择'"
                      class="w100"
                    >
                      <template
                        v-for="option in dics['gender']"
                        :key="option.value"
                      >
                        <el-option
                          :label="option.label"
                          :value="option.value"
                        />
                      </template>
                    </el-select>
                  </template>
                  <template v-else>
                    <span>{{ selectToLabel(ruleForm.gender) }}</span>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="'民族'" :prop="'nation'">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.nation"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.nation }}</span>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'照片'" :prop="'picture'">
              <div>
                <UserAvatar v-model="ruleForm.picture"></UserAvatar>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="35">
          <el-col :span="12">
            <el-form-item :label="'政治面貌'" :prop="'politicalStatus'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.politicalStatus"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.politicalStatus }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'出生日期'" :prop="'dateOfBirth'">
              <template v-if="status != 'view'">
                <el-date-picker
                  v-model="ruleForm.dateOfBirth"
                  type="date"
                  format="YYYY/MM/DD"
                  value-format="YYYY/MM/DD"
                  :placeholder="'请输入'"
                  class="w100"
                  clearable
                />
              </template>
              <template v-else>
                <span>{{ ruleForm.dateOfBirth }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'籍贯'" :prop="'nativePlace'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.nativePlace"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.nativePlace }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'联系电话'" :prop="'contactNumber'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.contactNumber"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.contactNumber }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'通信地址'" :prop="'mailingAddress'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.mailingAddress"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.mailingAddress }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'入学年份'" :prop="'schoolYear'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.schoolYear"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.schoolYear }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'所属院系'" :prop="'affiliatedDepartment'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.affiliatedDepartment"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.affiliatedDepartment }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'专业'" :prop="'major'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.major"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.major }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'学制'" :prop="'educationalSystem'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.educationalSystem"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.educationalSystem }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'培养层次'" :prop="'cultivationLevel'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.cultivationLevel"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.cultivationLevel }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'学生类别'" :prop="'studentCategory'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.studentCategory"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.studentCategory }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'学位类别'" :prop="'degreeCategory'">
              <template v-if="status != 'view'">
                <el-select
                  v-model="ruleForm.degreeCategory"
                  :placeholder="'请选择'"
                  class="w100"
                >
                  <template
                    v-for="option in dics['degreeCategory']"
                    :key="option.value"
                  >
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-else>
                <span>{{ selectToLabel(ruleForm.degreeCategory) }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'导师信息'" :prop="'tutorInformation'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.tutorInformation"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.tutorInformation }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'联系方式'" :prop="'contactInformation'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.contactInformation"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.contactInformation }}</span>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="35">
          <el-col :span="24">
            <el-form-item :label="'个人简历'" :prop="'resume'">
              <template v-if="status != 'view'">
                <editor v-model="ruleForm.resume" :min-height="192"/>
              </template>
              <template v-else>
                <div v-html="ruleForm.resume"></div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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

const { proxy } = getCurrentInstance();

const emit = defineEmits(["update:modelValue", "submit"]);

const { dics } = useStudentInfoCommon();

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
  title: "学生信息",
});

const baseFormRef = ref(null);

const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  dateOfBirth: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
});

onBeforeMount(() => {
  switch (props.status) {
    case "view":
      state.title = "查看学生信息";
      break;
    case "edit":
      state.title = "编辑学生信息";
      break;
    case "add":
      state.title = "新增学生信息";
      break;
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

<style lang="scss" scoped>


</style>
