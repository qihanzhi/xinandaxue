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
      <div style="font-weight: 600; margin-bottom: 10px;">用户组：<span>{{ ruleForm.userGroup }}</span></div>
      <div style="font-weight: 600; margin-bottom: 10px;">
        <span>审核权限：</span>
        <el-radio-group v-model="ruleForm.hasReview" :disabled="status == 'view'">
          <el-radio :label="'1'">有</el-radio>
          <el-radio :label="'0'">无</el-radio>
        </el-radio-group>
      </div>
      <div class="form-title">字段权限设置</div>
      <el-form
        ref="baseFormRef"
        :model="ruleForm.config"
        size="default"
        label-width="120px"
      >
        <el-row :gutter="35">
          <el-col :span="12" v-for="item in formFields" :key="item.field">
            <el-form-item :label="item.label + '：'" :prop="item.field" >
              <el-checkbox-group v-model="ruleForm.config[item.field]" :disabled="status == 'view'">
                  <el-checkbox label="查看" value="view" />
                  <el-checkbox label="编辑" value="edit" />
                  <el-checkbox label="必填" value="required" />
                </el-checkbox-group>
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
  title: "字段权限设置",
});

const baseFormRef = ref(null);

const formFields = reactive([
  {
    field: "studentNum",
    label: "学号",
  },
  {
    field: "name",
    label: "姓名",
  },
  {
    field: "gender",
    label: "性别",
  },
  {
    field: "nation",
    label: "民族",
  },
  {
    field: "politicalStatus",
    label: "政治面貌",
  },
  {
    field: "dateOfBirth",
    label: "出生日期",
  },
  {
    field: "nativePlace",
    label: "籍贯",
  },
  {
    field: "contactNumber",
    label: "联系电话",
  },
  {
    field: "mailingAddress",
    label: "通信地址",
  },
  {
    field: "schoolYear",
    label: "入学年份",
  },
  {
    field: "affiliatedDepartment",
    label: "所属院系",
  },
  {
    field: "major",
    label: "专业",
  },
  {
    field: "educationalSystem",
    label: "学制",
  },
  {
    field: "cultivationLevel",
    label: "培养层次",
  },
  {
    field: "studentCategory",
    label: "学生类别",
  },

  {
    field: "picture",
    label: "照片",
  },
  {
    field: "degreeCategory",
    label: "学位类别",
  },
  {
    field: "tutorInformation",
    label: "导师信息",
  },
  {
    field: "contactInformation",
    label: "联系方式",
  },
  {
    field: "resume",
    label: "个人简历",
  },
]);

onBeforeMount(() => {
  switch (props.status) {
    case "view":
      state.title = "查看字段";
      break;
    case "edit":
      state.title = "编辑字段";
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
