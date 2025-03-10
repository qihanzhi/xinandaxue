<template>
  <el-dialog
    v-model="open"
    width="600px"
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
            <el-form-item :label="'答辩人：'" :prop="'field6'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.field6"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.field6 }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'指导老师：'" :prop="'field7'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.field7"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.field7 }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'答辩委员受邀人数：'" :prop="'field1'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.field1"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.field1 }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'答辩委员出席人数：'" :prop="'field2'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.field2"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.field2 }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'学生毕业表决结果：'" :prop="'field3'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.field3"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.field3 }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'建议授予学位情况：'" :prop="'field4'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.field4"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.field4 }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'答辩是否通过：'" :prop="'field5'">
              <template v-if="status != 'view'">
                <el-radio-group v-model="ruleForm.field5">
                  <el-radio value="通过">通过</el-radio>
                  <el-radio value="不通过">不通过</el-radio>
                </el-radio-group>
              </template>
              <template v-else>
                <span>{{ ruleForm.field5 }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'答辩记录附件：'" :prop="'desc'">
              <template v-if="status != 'view'">
                <el-upload
                  v-model:file-list="ruleForm.fileList"
                  class="upload-demo"
                  action="#"
                  multiple
                >
                  <el-button type="primary">上传附件</el-button>
                  
                </el-upload>
              </template>
              <template v-else>
                <ul v-if="ruleForm.fileList?.length">
                  <li v-for="item in ruleForm.fileList" :key="item.name">{{ item.name }}</li>
                </ul>
                <span v-else>-</span>
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
  title: "答辩信息",
});

const baseFormRef = ref(null);

const rules = reactive({
  field6: [{ required: true, message: "请输入答辩人", trigger: "blur" }],
});

onBeforeMount(() => {
  switch (props.status) {
    case "add":
      state.title = "新增答辩信息";
      break;
    case "edit":
      state.title = "修改答辩信息";
      break;
  }
});

const itemLabelChange = (val) => {
  const label = selectToLabel(val, dics["dimension"]);
  ruleForm.value.itemLabel = label;
  ruleForm.value.itemName = label;
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

  const postData = toRaw(ruleForm.value);
  emit("submit", postData);
  cancel();
};

const cancel = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped></style>
