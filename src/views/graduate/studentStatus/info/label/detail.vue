<template>
  <el-dialog
    v-model="open"
    width="400px"
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
        label-width="100px"
      >
        <el-row :gutter="35">
          <el-col :span="24">
            <el-form-item :label="'标签名称'" :prop="'label'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.label"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.label }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'标签说明：'" :prop="'desc'">
              <template v-if="status != 'view'">
                <el-input
                  type="textarea"
                  v-model="ruleForm.desc"
                  :placeholder="'请输入'"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.desc }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'标签颜色：'" :prop="'color'">
              <el-color-picker v-model="ruleForm.color" :disabled="status == 'view'" />
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
  title: "学生标签",
});

const baseFormRef = ref(null);

const rules = reactive({
  label: [{ required: true, message: "请输入标签名称", trigger: "blur" }],
});

onBeforeMount(() => {
  switch (props.status) {
    case "add":
      state.title = "新增学生标签";
      break;
  }
});

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
