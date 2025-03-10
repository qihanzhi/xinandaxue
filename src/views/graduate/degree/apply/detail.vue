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
      <div class="flow-container">
        <el-steps class="mb-4" :space="200" :active="flowState.step" simple>
          <el-step title="基本信息" :icon="Edit" />
          <el-step title="申请材料" :icon="UploadFilled" />
          <el-step title="申请审核" :icon="Picture" />
          <el-step title="完成注册和缴费" :icon="Picture" />
        </el-steps>
      </div>
      <div class="content-container" v-if="flowState.step === 0">
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
                  <el-form-item :label="'学位类型'" :prop="'degreeType'">
                    <template v-if="status != 'view'">
                      <el-select
                        v-model="ruleForm.degreeType"
                        :placeholder="'请选择'"
                        class="w100"
                      >
                        <template
                          v-for="option in dics['degreeType']"
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
                      <span>{{ selectToLabel(ruleForm.degreeType) }}</span>
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
        </el-form>
      </div>
      <div class="content-container" v-if="flowState.step === 1">
        <div class="form-title">
          申请材料
          <span style="color: #666; font-weight: 500"
            >（准备必要的申请材料，如成绩单、推荐信、个人陈述、英语水平证明等）</span
          >
        </div>
        <el-form
          ref="baseFormRef"
          :model="ruleForm"
          :rules="rules"
          size="default"
          label-width="120px"
          label-position="top"
        >
          <el-row :gutter="35">
            <el-col :span="24">
              <el-form-item :label="'申请材料：'" :prop="'fileList'">
                <template v-if="status != 'view'">
                  <el-upload
                    class="upload-demo"
                    v-model:file-list="ruleForm.fileList"
                    drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    multiple
                    :on-change="handleChange"
                  >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                      请拖拽上传的材料 <em>click to upload</em>
                    </div>
                  </el-upload>
                </template>
                <template v-else>
                  <ul class="file-list">
                    <li v-for="item in ruleForm.fileList" :key="item">
                      {{ item.name }}
                    </li>
                  </ul>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="content-container" v-if="flowState.step === 2">
        <div style="display: flex; align-items: center; justify-content: center; height: 200px; font-size: 18px;">
          正在审核中，请关注通知消息!
        </div>
      </div>
      <div class="content-container" v-if="flowState.step === 3">
        <div style="display: flex; align-items: center; justify-content: center; height: 200px; font-size: 18px;">
          完成审核后，进行注册和缴费！
        </div>
        
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <template v-if="flowState.step <= 0">
          <el-button type="primary" @click="nextChange">下一步</el-button>
        </template>
        <template v-else-if="flowState.step < 3">
          <el-button type="primary" @click="preChange">上一步</el-button>
          <el-button @click="cancel">取 消</el-button>
          <el-button  @click="submitForm">确 定</el-button>
          
          <el-button type="primary" @click="nextChange">下一步</el-button>
        </template>
        <template v-else>
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </template>
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
  title: "学位申请",
});

// 流程信息
const flowState = reactive({
  step: 0,
});

const baseFormRef = ref(null);

const rules = reactive({
  degreeType: [{ required: true, message: "请选择申请学位", trigger: "blur" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
});

onBeforeMount(() => {
  switch (props.status) {
    case "view":
      state.title = "查看学位申请";
      break;
    case "edit":
      state.title = "编辑学位申请";
      break;
    case "add":
      state.title = "新增学位申请";
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

// 上传获取
const handleChange = (uploadFile, uploadFiles) => {
  if (!ruleForm.value.fileList) {
    ruleForm.value.fileList = [];
  }
  if (uploadFile.status === 'ready') {
    uploadFile.status = 'success';
    ruleForm.value.fileList.push(uploadFile);
  }
  
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
  if (props.status != "view" && flowState.step === 0) {
    const valid = await validForm();
    if (!valid) {
      return;
    }
  }
  // 学籍号自动生成
  ruleForm.value.dateOfBirth = "1996/06/12";
    ruleForm.value.studentNum = getStudentNum(ruleForm.value.dateOfBirth);

    const postData = toRaw(ruleForm.value);
    emit("submit", postData);
  cancel();
};

const cancel = () => {
  emit("update:modelValue", false);
};

const preChange = () => {
  flowState.step--;
}
const nextChange = async () => {
  if (props.status != "view" && flowState.step === 0) {
    const valid = await validForm();

    if (!valid) {
      return;
    }
  }

  flowState.step++;
};
</script>

<style lang="scss" scoped>
.flow-container {
  margin-bottom: 20px;
}
.content-container {
  min-height: 300px;
}
.upload-demo {
  margin: auto;
}
</style>
