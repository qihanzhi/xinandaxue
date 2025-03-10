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
          <el-step title="请销假申请" :icon="Edit" />
          <el-step title="申请审批" :icon="Picture" />
          <el-step title="完成" :icon="Picture" />
        </el-steps>
      </div>
      <div class="content" v-show="flowState.step == 0">
        <div class="apply-form">
          <div class="apply-form-title">请假申请表</div>
          <div class="apply-form-notic">
            <p class="title">申请须知：</p>
            <p class="content">
              1.请假后必须按时返回学校，并及时向准假辅导员销假
            </p>
            <p class="content">
              2.特殊情况不能按时返回的，须经准假批准后方可续假
            </p>
          </div>
          <el-form
            ref="baseFormRef"
            :model="ruleForm"
            :rules="rules"
            size="default"
          >
            <div class="form-table">
              <div class="row row1">
                <div class="item label fw600">姓名</div>
                <div class="item content">
                  <el-form-item prop="name">
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
                </div>
                <div class="item label fw600">学籍号</div>
                <div class="item content">
                  <el-form-item prop="studentNum">
                    <template v-if="status != 'view'">
                      <el-input
                        v-model="ruleForm.studentNum"
                        :placeholder="'请输入'"
                        clearable
                      ></el-input>
                    </template>
                    <template v-else>
                      <span>{{ ruleForm.studentNum }}</span>
                    </template>
                  </el-form-item>
                </div>
                <div class="item label fw600">学院</div>
                <div class="item content">
                  <el-form-item prop="college">
                    <template v-if="status != 'view'">
                      <el-input
                        v-model="ruleForm.college"
                        :placeholder="'请输入'"
                        clearable
                      ></el-input>
                    </template>
                    <template v-else>
                      <span>{{ ruleForm.college }}</span>
                    </template>
                  </el-form-item>
                </div>
              </div>
              <div class="row row2">
                <div class="item label fw600">入学年份</div>
                <div class="item content">
                  <el-form-item prop="schoolYear">
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
                </div>
                <div class="item label fw600">专业</div>
                <div class="item content">
                  <el-form-item prop="major">
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
                </div>
                <div class="item label fw600">学籍所在班级</div>
                <div class="item content">
                  <el-form-item prop="classes">
                    <template v-if="status != 'view'">
                      <el-input
                        v-model="ruleForm.classes"
                        :placeholder="'请输入'"
                        clearable
                      ></el-input>
                    </template>
                    <template v-else>
                      <span>{{ ruleForm.classes }}</span>
                    </template>
                  </el-form-item>
                </div>
              </div>
              <div class="row row3">
                <div class="item label fw600">身份证号</div>
                <div class="item">
                  <el-form-item prop="card">
                    <template v-if="status != 'view'">
                      <el-input
                        v-model="ruleForm.card"
                        :placeholder="'请输入'"
                        clearable
                      ></el-input>
                    </template>
                    <template v-else>
                      <span>{{ ruleForm.card }}</span>
                    </template>
                  </el-form-item>
                </div>
              </div>
              <div class="row row4">
                <div class="item label fw600">申请请假类别</div>
                <div class="item">
                  <el-form-item prop="transactionType">
                    <el-radio-group
                      v-model="ruleForm.transactionType"
                      :disabled="status == 'view'"
                    >
                      <el-radio
                        v-for="item in dics.transactionType"
                        size="large"
                        :key="item.value"
                        :value="item.value"
                        >{{ item.label }}</el-radio
                      >
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <div class="row row11">
                <div class="item label fw600">请假时间</div>
                <div class="item">
                  <el-form-item prop="card">
                    <template v-if="status != 'view'">
                      <el-date-picker
                        v-model="ruleForm.absentTime"
                        type="datetimerange"
                        range-separator="-"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      />
                    </template>
                    <template v-else>
                      <span v-if="ruleForm.absentTime"
                        >{{ ruleForm.absentTime[0] }} -
                        {{ ruleForm.absentTime[1] }}</span
                      >
                    </template>
                  </el-form-item>
                </div>
              </div>
              <div class="row row5">
                <div class="item">
                  <p class="fw600">申请理由（根据申请书内容简单表述）：</p>
                  <div class="apply-reason">
                    <el-form-item prop="reasons">
                      <template v-if="status != 'view'">
                        <el-input
                          type="textarea"
                          v-model="ruleForm.reasons"
                          :placeholder="'请输入'"
                          clearable
                        ></el-input>
                      </template>
                      <template v-else>
                        <span>{{ ruleForm.reasons }}</span>
                      </template>
                    </el-form-item>
                  </div>
                </div>
              </div>
              <div class="row row6">
                <div class="item">
                  <p class="fw600">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    本人签名确认已阅读申请须知，并承诺遵守所有规定，同时确认表中所填内容及附件真实、准确，如有提供虚假信息或隐瞒事实等欺骗行为，自愿承担相应的责任。
                  </p>
                  <div class="confirm-content">
                    <div class="e-sign">
                      <span class="label">申请人签名：</span>
                      <div class="content">
                        <el-form-item prop="applySign">
                          <template v-if="status != 'view'">
                            <div v-if="ruleForm.applySign">
                              <img :src="ruleForm.applySign" alt="电子签名" />
                              <span
                                style="color: #999; margin-left: 20px"
                                @click="openSign"
                                >重新签名</span
                              >
                            </div>

                            <span v-else style="color: #999" @click="openSign"
                              >去签名</span
                            >
                          </template>
                          <template v-else>
                            <img
                              v-if="ruleForm.applySign"
                              :src="ruleForm.applySign"
                              alt="电子签名"
                            />
                          </template>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="phone">
                      <span class="label">联系电话：</span>
                      <div class="content">
                        <el-form-item prop="contactNumber">
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
                      </div>
                    </div>
                    <div class="date">
                      <span class="label">日 期：</span>
                      <div class="content">
                        <el-form-item prop="applyDate">
                          <template v-if="status != 'view'">
                            <el-date-picker
                              v-model="ruleForm.applyDate"
                              type="date"
                              format="YYYY年MM月DD日"
                              value-format="YYYY年MM月DD日"
                              :placeholder="'请输入'"
                              class="w100"
                              clearable
                            />
                          </template>
                          <template v-else>
                            <span>{{ ruleForm.applyDate }}</span>
                          </template>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="content" v-show="flowState.step == 1" v-if="ruleForm.reviews">
        <CheckForm
          :status="ruleForm.status"
          :formData="ruleForm"
          @submit="submitForm"
        ></CheckForm>
      </div>
      <div class="content" v-show="flowState.step == 2">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            height: 200px;
            font-size: 18px;
          "
        >
          正在审核中，请关注通知消息!
        </div>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="preChange" v-if="flowState.step > 0"
          >上一步</el-button
        >
        <el-button @click="cancel">取 消</el-button>
        <template v-if="status == 'add' || status == 'edit'">
          <el-button @click="saveDraft" v-if="flowState.step == 0">保存草稿</el-button>
          <el-button type="primary" @click="submitForm" v-if="flowState.step < 2">提 交</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="cancel">确定</el-button>
        </template>
        <el-button type="primary" @click="nextChange" v-if="flowState.step < 2 && status != 'add'"
          >下一步</el-button
        >
      </div>
    </template>
  </el-dialog>
  <Sign v-model="eSign.open" @onDone="signDone"></Sign>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, toRaw } from "vue";
import * as _ from "lodash";
import { selectToLabel, multiToLabel, textAreaFormat } from "@/utils/form";

import useStudentModifyCommon from "../common";

import Sign from "@/components/Sign/index";
import CheckForm from "./check.vue";

const { proxy } = getCurrentInstance();

const emit = defineEmits(["update:modelValue", "submit"]);

const { dics } = useStudentModifyCommon();

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
  title: "请假",
});

const flowState = reactive({
  step: 0,
});

// 电子签名
const eSign = reactive({
  open: false,
});

const baseFormRef = ref(null);

const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  studentNum: [{ required: true, message: "请输入学籍号", trigger: "blur" }],
  college: [{ required: true, message: "请输入学院", trigger: "blur" }],
  schoolYear: [{ required: true, message: "请输入入学年份", trigger: "blur" }],
  major: [{ required: true, message: "请输入专业", trigger: "blur" }],
  classes: [{ required: true, message: "请输入学籍所在班级", trigger: "blur" }],
  card: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
  gender: [{ required: true, message: "请选择请假类别", trigger: "blur" }],
  reasons: [{ required: true, message: "请输入申请理由", trigger: "blur" }],
  applySign: [{ required: true, message: "请申请人签字", trigger: "blur" }],
  contactNumber: [
    { required: true, message: "请填写联系电话", trigger: "blur" },
  ],
  applyDate: [{ required: true, message: "请选择申请日期", trigger: "blur" }],
});

onBeforeMount(() => {
  switch (props.status) {
    case "view":
      state.title = "查看请假申请";
      break;
    case "edit":
      state.title = "修改请假申请";
      break;
    case "add":
      state.title = "请假申请";
      break;
  }

  if (
    ruleForm.value.status == "待提交" ||
    ruleForm.value.status == "驳回" ||
    !ruleForm.value.status
  ) {
    flowState.step = 0;
  } else if (
    ruleForm.value.status == "待审核" ||
    ruleForm.value.status == "审核中"
  ) {
    flowState.step = 1;
  } else {
    flowState.step = 2;
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

// 电子签名打开
const openSign = () => {
  eSign.open = true;
};

// 电子签名结果
const signDone = (img) => {
  ruleForm.value.applySign = img;
};

// 提交
const submitForm = async () => {
  const valid = await validForm();

  if (!valid) {
    return;
  }

  const postData = toRaw(ruleForm.value);
  postData.status = "待审核";
  emit("submit", postData);
  cancel();
};

// 取消
const cancel = () => {
  emit("update:modelValue", false);
};

// 保存草稿
const saveDraft = () => {
  const postData = toRaw(ruleForm.value);
  postData.status = "待提交";
  emit("submit", postData);
  cancel();
};

const preChange = () => {
  flowState.step--;
};
const nextChange = async () => {
  // if (props.status != "view" && flowState.step === 0) {
  //   const valid = await validForm();

  //   if (!valid) {
  //     return;
  //   }
  // }

  flowState.step++;
};
</script>

<style lang="scss" scoped>
.apply-form {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #111;
}
.apply-form-title {
  text-align: center;
  font-size: 18px;
  line-height: 32px;
  font-weight: 600;
  margin-bottom: 20px;
}
.apply-form-notic {
  padding-left: 100px;
  .title {
    font-size: 14px;
    font-weight: 600;
    text-decoration: underline;
    margin-bottom: 20px;
  }
  .content {
    font-size: 12px;
    margin-bottom: 20px;
  }
}

.fw600 {
  font-weight: 600;
}

.form-table {
  width: 900px;
  margin: 0 auto;

  .row {
    display: grid;

    .item {
      border: 1px solid #333;
      margin-left: -1px;
      margin-top: -1px;
      padding: 15px;
    }
    .item.label {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .row1,
  .row2 {
    grid-template-columns: 120px 180px 120px 180px 120px 180px;
    grid-template-rows: 80px;

    .item.content {
      display: flex;
      align-items: center;
      justify-content: center;

      .el-form-item {
        margin-bottom: 0px;
      }
    }
  }
  .row3,
  .row4 {
    grid-template-columns: 120px auto;
    grid-template-rows: 60px;
  }

  .row11 {
    grid-template-columns: 120px auto;
    grid-template-rows: 60px;
  }

  .row5,
  .row6 {
    grid-template-columns: 100%;
    grid-template-rows: auto;
  }

  .row5 {
    .apply-reason {
      margin-top: 20px;
    }
  }

  .row6 {
    .confirm-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      margin-top: 20px;

      .e-sign,
      .phone,
      .date {
        margin-bottom: 10px;

        .label {
          margin-right: 10px;
        }
        .content {
          display: inline-block;
          width: 200px;
          .el-form-item {
            margin-bottom: 0px;
          }
        }
      }

      .e-sign {
        .content {
          cursor: pointer;
          img {
            height: 18px;
            width: auto;
          }
        }
      }
    }
  }
}

.flow-container {
  margin-bottom: 20px;
}
</style>
