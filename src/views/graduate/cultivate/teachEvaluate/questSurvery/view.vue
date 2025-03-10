<template>
  <el-dialog
    v-model="open"
    width="800px"
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
      <div
        class="con1"
      >
        <div class="left">
          <div class="form1-box">
            <el-form
              ref="baseFormRef1"
              :model="ruleForm1"
              :rules="rules1"
              size="default"
              label-width="100px"
              label-position="top"
            >
              <el-row :gutter="0">
                <el-col :span="24">
                  <el-form-item :label="'问卷名称'" :prop="'field1'">
                    <el-input
                      v-model="ruleForm1.field1"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="box2" v-if="ruleForm1.result.length">
            <div class="checked-list-box">
              <div
                class="row"
                v-for="(item, index) in ruleForm1.result"
                :key="item.name"
              >
                <div class="top">
                  <p class="title">{{ item.name }}</p>
                  <div class="right">
                   
                  </div>
                </div>
                <template v-if="item.type === 'select'">
                  <el-radio-group v-model="ruleForm.value1">
                    <el-radio
                      v-for="option in item.options"
                      :value="option.label"
                      :key="option.label"
                      >{{ option.label }}</el-radio
                    >
                  </el-radio-group>
                </template>
                <template v-else-if="item.type === 'multiple'">
                  <el-checkbox-group  v-model="ruleForm.value2">
                    <el-checkbox
                      v-for="option in item.options"
                      :value="option.label"
                      :key="option.label"
                      >{{ option.label }}</el-checkbox
                    >
                  </el-checkbox-group>
                </template>
                <template v-else-if="item.type === 'input'">
                  <el-input  v-model="ruleForm.value3"></el-input>
                </template>
                <template v-else-if="item.type === 'score'">
                  <el-rate  v-model="ruleForm.value4" />
                </template>
                <template v-else>
                  <el-input  v-model="ruleForm.value5"></el-input>
                </template>
              </div>
            </div>
          </div>
        </div>

       
      </div>
      
    </template>
    <template #footer>
      <div class="dialog-footer" >
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

/* 创建问题调查表 */
const baseFormRef1 = ref(null);

const ruleForm1 = reactive({
  field1: null,
  // 内容
  result: [],
});

const rules1 = reactive({
  field1: [{ required: true, message: "请输入问卷名称", trigger: "blur" }],
});

// 表单组件
const formList = reactive({
  selected: null,
  data: [
    { id: 0, label: "单选", type: "select" },
    { id: 1, label: "多选", type: "multiple" },
    { id: 2, label: "填空", type: "input" },
    { id: 3, label: "打分", type: "score" },
  ],
});

const validForm1 = async () => {
  if (!baseFormRef1.value) {
    return false;
  }

  const valid = await baseFormRef1.value.validate(() => {});

  if (!valid) {
    proxy.$modal.msgWarning("表单填写有误，请重新填写！");
  }

  return valid;
};

const formListChoose = (item) => {
  formList.selected = item;
};

const nextClick = async () => {
  const valid = await validForm1();

  if (!valid) {
    return;
  }

  state.isNext = true;
  ruleForm.value.field1 = ruleForm1.field1;
};

/* 问卷创建的题干 */
const queryForm = reactive({
  name: "",
  options: [],
});
const queryFormRef = ref(null);
const queryRules = reactive({
  name: [{ required: true, message: "请输入题干名称", trigger: "blur" }],
});

const addOptions = () => {
  queryForm.options.push({
    label: "",
  });
};
const delOption = (index) => {
  queryForm.options.splice(index, 1);
};

// 删除已经有的题干项
const delCheckedOption = (index) => {
  ruleForm1.result.splice(index, 1);
};

const validQueryForm = async () => {
  if (!queryFormRef.value) {
    return false;
  }

  const valid = await queryFormRef.value.validate(() => {});

  if (!valid) {
    proxy.$modal.msgWarning("表单填写有误，请重新填写！");
  }

  return valid;
};

// 确认添加题干
const submitFormQuery = async () => {
  let valid = await validQueryForm();
  if (!valid) {
    return;
  }
  ruleForm1.result.push({
    name: queryForm.name,
    options: queryForm.options,
    type: formList.selected.type,
  });

  queryForm.name = "";
  queryForm.options = [];
};
// 取消
const cancelQuery = () => {
  queryForm.name = "";
  queryForm.options = [];

  formList.selected = null;
};

/* 下一步的 */
const ruleForm = computed(() => {
  const data = reactive(_.cloneDeep(props.formData));

  return data;
});

const state = reactive({
  title: "问卷调查表",
  isNext: false,
});

const baseFormRef = ref(null);

const rules = reactive({
  field1: [{ required: true, message: "请输入问卷名称", trigger: "blur" }],
  field2: [{ required: true, message: "请选择文件分类", trigger: "blur" }],
});

onBeforeMount(() => {
  switch (props.status) {
    case "view":
      state.title = "预览问卷调查表";
      ruleForm1.field1 = props.formData?.field1;
      ruleForm1.result = props.formData?.result || [];
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
  postData.result = ruleForm1.result;
  emit("submit", postData);
  cancel();
};

const cancel = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
.con1 {

  .left {
    .form1-box {
      :deep(.el-form-item__content) {
        width: 100%;
      }
    }
    .box1 {
      width: 100%;
      border: 1px solid #ccc;
      padding: 20px;
      margin: 20px 0px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .box2 {
      .checked-list-box {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;

        .row {
          margin-bottom: 20px;
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
              font-size: 14px;
              font-weight: 600;
              margin-bottom: 10px;
            }

            .right {
              display: flex;
              justify-content: flex-end;
              align-items: center;
            }
          }

          .el-radio-group,
          .el-checkbox-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
        }
      }
    }

    
  }
 
}
</style>
