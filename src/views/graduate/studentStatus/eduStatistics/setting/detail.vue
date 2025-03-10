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
      >
        <el-row :gutter="35">
          <el-col :span="24">
            <el-form-item :label="'统计项：'" :prop="'itemField'">
              <template v-if="status != 'view'">
                <el-select
                  v-model="ruleForm.itemField"
                  :placeholder="'请选择'"
                  class="w100"
                  @change="itemLabelChange"
                >
                  <template
                    v-for="option in dics['dimension']"
                    :key="option.value"
                  >
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-else>
                <span>{{ ruleForm.itemLabel }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'统计项名称：'" :prop="'itemName'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.itemName"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.itemName }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'显示排序：'" :prop="'order'">
              <template v-if="status != 'view'">
                <el-input-number
                  v-model="ruleForm.order"
                  :placeholder="'请输入'"
                  clearable
                ></el-input-number>
              </template>
              <template v-else>
                <span>{{ ruleForm.order }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'统计项说明：'" :prop="'desc'">
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

import useStudentInfoCommon from "../common";

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
  title: "统计项",
});

const baseFormRef = ref(null);

const rules = reactive({
  itemField: [{ required: true, message: "请选择统计项", trigger: "blur" }],
  itemName: [{ required: true, message: "请输入统计项名称", trigger: "blur" }],
  order: [{ required: true, message: "请输入统计项序号", trigger: "blur" }],
});

onBeforeMount(() => {
  switch (props.status) {
    case "add":
      state.title = "新增统计项";
      break;
    case "edit":
      state.title = "修改统计项";
      break;
  }
});

const itemLabelChange = (val) => {
  const label = selectToLabel(val, dics['dimension']);
  ruleForm.value.itemLabel = label;
  ruleForm.value.itemName = label;
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

  const postData = toRaw(ruleForm.value);
  emit("submit", postData);
  cancel();
};

const cancel = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped></style>
