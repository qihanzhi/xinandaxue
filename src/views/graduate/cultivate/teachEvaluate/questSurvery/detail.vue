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
      <div
        class="con1"
        v-if="(status === 'add' || status === 'edit') && !state.isNext"
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
                    <el-button
                      type="danger"
                      icon="Delete"
                      link
                      @click="delCheckedOption(index)"
                    ></el-button>
                  </div>
                </div>
                <template v-if="item.type === 'select'">
                  <el-radio-group disabled>
                    <el-radio
                      v-for="option in item.options"
                      :value="option.label"
                      :key="option.label"
                      >{{ option.label }}</el-radio
                    >
                  </el-radio-group>
                </template>
                <template v-else-if="item.type === 'multiple'">
                  <el-checkbox-group disabled>
                    <el-checkbox
                      v-for="option in item.options"
                      :value="option.label"
                      :key="option.label"
                      >{{ option.label }}</el-checkbox
                    >
                  </el-checkbox-group>
                </template>
                <template v-else-if="item.type === 'input'">
                  <el-input disabled></el-input>
                </template>
                <template v-else-if="item.type === 'score'">
                  <el-rate disabled />
                </template>
                <template v-else>
                  <el-input disabled></el-input>
                </template>
              </div>
            </div>
          </div>
          <div class="box1" v-if="!formList.selected">
            请点击右侧控件添加收集项
          </div>
          <div class="box3" v-if="formList.selected">
            <div class="title">
              <div class="line"></div>
              <div class="questionType">{{ formList.selected.label }}</div>
              <div class="line"></div>
            </div>
            <div class="quest-list-box">
              <el-form
                ref="queryFormRef"
                :model="queryForm"
                :rules="queryRules"
                size="default"
                label-width="100px"
                label-position="top"
              >
                <el-row :gutter="35">
                  <el-col :span="24">
                    <el-form-item :label="'题干'" :prop="'name'">
                      <el-input
                        v-model="queryForm.name"
                        :placeholder="'请输入'"
                        clearable
                      ></el-input>
                    </el-form-item>
                    <!-- 有选项 -->
                    <div
                      class="options-box-container"
                      v-if="
                        formList.selected.type === 'select' ||
                        formList.selected.type === 'multiple'
                      "
                    >
                      <div class="add-btn">
                        <el-button type="primary" @click="addOptions"
                          >添加选项</el-button
                        >
                      </div>
                      <template
                        v-if="queryForm.options && queryForm.options.length"
                      >
                        <div
                          class="options-box"
                          v-for="(option, index) in queryForm.options"
                          :key="index"
                        >
                          <el-input
                            class="value"
                            v-model="option.label"
                            :placeholder="'请输入'"
                            clearable
                          ></el-input>
                          <el-button
                            type="danger"
                            icon="Delete"
                            link
                            @click="delOption(index)"
                          ></el-button>
                        </div>
                      </template>
                    </div>
                    <div class="query-footer-btn">
                      <el-button @click="cancelQuery">取 消</el-button>
                      <el-button type="primary" @click="submitFormQuery"
                        >确 定</el-button
                      >
                    </div>
                  </el-col>
                </el-row>
              </el-form>
              <div class=""></div>
            </div>
          </div>
        </div>

        <div class="right">
          <el-card style="max-width: 480px">
            <template #header>
              <div class="card-header">
                <span>表单组件</span>
              </div>
            </template>
            <div class="form-list-container">
              <div
                class="form-list-box"
                v-for="item in formList.data"
                :key="item.id"
                @click="formListChoose(item)"
              >
                <el-icon><Document /></el-icon>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="con2" v-if="state.isNext">
        <el-form
          ref="baseFormRef"
          :model="ruleForm"
          :rules="rules"
          size="default"
          label-width="100px"
        >
          <el-row :gutter="35">
            <el-col :span="24">
              <el-form-item :label="'问卷名称：'" :prop="'field1'">
                <template v-if="status != 'view'">
                  <el-input
                    v-model="ruleForm.field1"
                    :placeholder="'请输入'"
                    clearable
                    disabled
                  ></el-input>
                </template>
                <template v-else>
                  <span>{{ ruleForm.field1 }}</span>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="'问卷分类：'" :prop="'field2'">
                <template v-if="status != 'view'">
                  <el-select
                    v-model="ruleForm.field2"
                    :placeholder="'请选择'"
                    class="w100"
                  >
                    <template
                      v-for="option in dics['field2']"
                      :key="option.value"
                    >
                      <el-option :label="option.label" :value="option.value" />
                    </template>
                  </el-select>
                </template>
                <template v-else>
                  <span>{{ selectToLabel(ruleForm.field2) }}</span>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="'回收时间：'" :prop="'field3'">
                <template v-if="status != 'view'">
                  <el-date-picker
                    v-model="ruleForm.field3"
                    type="datetimerange"
                    range-separator="-"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </template>
                <template v-else>
                  <span v-if="ruleForm.field3"
                    >{{ ruleForm.field3[0] }} - {{ ruleForm.field3[1] }}</span
                  >
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="'问卷状态：'" :prop="'field5'">
                <el-switch
                  v-model="ruleForm.field5"
                  :disabled="status === 'view'"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="'匿名问卷：'" :prop="'field101'">
                <el-switch
                  v-model="ruleForm.field101"
                  :disabled="status === 'view'"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-form-item :label="'提交提示语：'" :prop="'field102'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.field102"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.field6 }}</span>
              </template>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div class="next" v-if="status === 'add' || status === 'edit'">
        <template v-if="!state.isNext">
          <el-button type="primary" @click="nextClick">下一步</el-button>
        </template>
        <template v-else>
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">保存并发布</el-button>
        </template>
      </div>

      <div class="dialog-footer" v-else>
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
    case "add":
      state.title = "新增问卷调查表";
      break;
    case "edit":
      state.title = "修改问卷调查表";
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
  display: grid;
  grid-template-columns: auto 400px;
  gap: 100px;

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

    .box3 {
      margin: 20px 0;
      border: 1px dashed #ccc;
      padding: 20px;

      .title {
        padding: 0 20px;
        margin-top: 10px;
        border: 0;
        margin: 0 auto 30px auto;
        text-align: center;
        color: #707070;

        .line {
          display: inline-block;
          height: 0;
          width: calc(50% - 45px);
          border-bottom: 1px solid #cfcfcf;
          vertical-align: middle;
        }

        .questionType {
          font-size: 20px;
          display: inline-block;
          width: 90px;
          vertical-align: middle;
          text-align: center;
        }
      }

      .options-box-container {
        .add-btn {
          display: flex;
          margin-bottom: 20px;
          margin-top: 20px;
        }

        .options-box {
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          .value {
            width: calc(100% - 120px);
            margin-right: 20px;
          }
        }
      }
      .query-footer-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
      }
    }
  }
  .right {
    .form-list-container {
      display: flex;
      flex-flow: wrap;

      .form-list-box {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        margin-right: 20px;
        cursor: pointer;
      }
      .form-list-box:hover {
        color: var(--current-color);
      }
    }
  }
}
</style>
