<template>
  <div class="review-form-title">留校申请审批流程表</div>
  <el-form
    ref="baseFormRef"
    :model="ruleForm.reviews"
    :rules="rules"
    size="default"
  >
    <div class="review-form-table">
      <div class="row row1">
        <div class="item label fw600">辅导员审批</div>
        <div class="item content">
          <div class="content-row result">
            <div class="label fw600">学生情况审查：</div>
            <el-form-item prop="secCollege.result">
              <el-radio-group
                v-model="ruleForm.reviews.secCollege.result"
                :disabled="ruleForm.reviews.status > 0 || status == 'view'"
              >
                <el-radio size="large" value="属实">属实</el-radio>
                <el-radio size="large" value="不属实">不属实</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="content-row opinion">
            <div class="label fw600">辅导员意见：</div>
            <el-form-item prop="secCollege.opinion">
              <template v-if="ruleForm.reviews.status < 1 && status != 'view'">
                <el-input
                  type="textarea"
                  v-model="ruleForm.reviews.secCollege.opinion"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <div v-html="ruleForm.reviews.secCollege.opinion"></div>
              </template>
            </el-form-item>
          </div>
          <div class="content-row e-sign">
            <div class="label fw600">负责人签字：</div>
            <div class="content">
              <el-form-item prop="secCollege.signatory">
                <template
                  v-if="ruleForm.reviews.status < 1 && status != 'view'"
                >
                  <div v-if="ruleForm.reviews.secCollege.signatory">
                    <img
                      :src="ruleForm.reviews.secCollege.signatory"
                      alt="电子签名"
                    />
                    <span
                      style="color: #999; margin-left: 20px"
                      @click="openSign('secCollege')"
                      >重新签名</span
                    >
                  </div>

                  <span
                    v-else
                    style="color: #999"
                    @click="openSign('secCollege')"
                    >去签名</span
                  >
                </template>
                <template v-else>
                  <img
                    v-if="ruleForm.reviews.secCollege.signatory"
                    :src="ruleForm.reviews.secCollege.signatory"
                    alt="电子签名"
                  />
                </template>
              </el-form-item>
            </div>
          </div>
          <div class="content-row date">
            <div class="label fw600">日 期：</div>
            <div class="content">
              <el-form-item prop="secCollege.signDate">
                <template
                  v-if="ruleForm.reviews.status < 1 && status != 'view'"
                >
                  <el-date-picker
                    v-model="ruleForm.reviews.secCollege.signDate"
                    type="date"
                    format="YYYY年MM月DD日"
                    value-format="YYYY年MM月DD日"
                    :placeholder="'请输入'"
                    class="w100"
                    clearable
                  />
                </template>
                <template v-else>
                  <span>{{ ruleForm.reviews.secCollege.signDate }}</span>
                </template>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="row row2">
        <div class="item label fw600">学生工作处审核</div>
        <div class="item content">
          <div class="content-row result">
            <el-form-item prop="studentOffice.result">
              <el-radio-group
                v-model="ruleForm.reviews.studentOffice.result"
                :disabled="ruleForm.reviews.status > 1 || status == 'view'"
              >
                <el-radio size="large" value="同意申请">同意申请</el-radio>
                <el-radio size="large" value="不同意申请">不同意申请</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="content-row e-sign">
            <div class="label fw600">学生处负责人签字：</div>
            <div class="content">
              <el-form-item prop="studentOffice.signatory">
                <template
                  v-if="ruleForm.reviews.status < 2 && status != 'view'"
                >
                  <div v-if="ruleForm.reviews.studentOffice.signatory">
                    <img
                      :src="ruleForm.reviews.studentOffice.signatory"
                      alt="电子签名"
                    />
                    <span
                      style="color: #999; margin-left: 20px"
                      @click="openSign('studentOffice')"
                      >重新签名</span
                    >
                  </div>

                  <span
                    v-else
                    style="color: #999"
                    @click="openSign('studentOffice')"
                    >去签名</span
                  >
                </template>
                <template v-else>
                  <img
                    v-if="ruleForm.reviews.studentOffice.signatory"
                    :src="ruleForm.reviews.studentOffice.signatory"
                    alt="电子签名"
                  />
                </template>
              </el-form-item>
            </div>
          </div>
          <div class="content-row date">
            <div class="label fw600">日 期：</div>
            <div class="content">
              <el-form-item prop="studentOffice.signDate">
                <template
                  v-if="ruleForm.reviews.status < 2 && status != 'view'"
                >
                  <el-date-picker
                    v-model="ruleForm.reviews.studentOffice.signDate"
                    type="date"
                    format="YYYY年MM月DD日"
                    value-format="YYYY年MM月DD日"
                    :placeholder="'请输入'"
                    class="w100"
                    clearable
                  />
                </template>
                <template v-else>
                  <span>{{ ruleForm.reviews.studentOffice.signDate }}</span>
                </template>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="row row3">
        <div class="item label fw600">教务处审核</div>
        <div class="item content">
          <div class="content-row result">
            <el-form-item prop="deanOffice.result">
              <el-radio-group
                v-model="ruleForm.reviews.deanOffice.result"
                :disabled="ruleForm.reviews.status > 2 || status == 'view'"
              >
                <el-radio size="large" value="同意申请">同意申请</el-radio>
                <el-radio size="large" value="不同意申请">不同意申请</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="content-row opinion">
            <div class="label fw600">分管院长意见：</div>
            <el-form-item prop="deanOffice.opinion">
              <template v-if="ruleForm.reviews.status < 3 && status != 'view'">
                <el-input
                  type="textarea"
                  v-model="ruleForm.reviews.deanOffice.opinion"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span v-html="ruleForm.reviews.deanOffice.opinion"></span>
              </template>
            </el-form-item>
          </div>
          <div class="content-row e-sign">
            <div class="label fw600">负责人签字：</div>
            <div class="content">
              <el-form-item prop="deanOffice.signatory">
                <template
                  v-if="ruleForm.reviews.status < 3 && status != 'view'"
                >
                  <div v-if="ruleForm.reviews.deanOffice.signatory">
                    <img
                      :src="ruleForm.reviews.deanOffice.signatory"
                      alt="电子签名"
                    />
                    <span
                      style="color: #999; margin-left: 20px"
                      @click="openSign('deanOffice')"
                      >重新签名</span
                    >
                  </div>

                  <span
                    v-else
                    style="color: #999"
                    @click="openSign('deanOffice')"
                    >去签名</span
                  >
                </template>
                <template v-else>
                  <img
                    v-if="ruleForm.reviews.deanOffice.signatory"
                    :src="ruleForm.reviews.deanOffice.signatory"
                    alt="电子签名"
                  />
                </template>
              </el-form-item>
            </div>
          </div>
          <div class="content-row date">
            <div class="label fw600">日 期：</div>
            <div class="content">
              <el-form-item prop="deanOffice.signDate">
                <template
                  v-if="ruleForm.reviews.status < 3 && status != 'view'"
                >
                  <el-date-picker
                    v-model="ruleForm.reviews.deanOffice.signDate"
                    type="date"
                    format="YYYY年MM月DD日"
                    value-format="YYYY年MM月DD日"
                    :placeholder="'请输入'"
                    class="w100"
                    clearable
                  />
                </template>
                <template v-else>
                  <span>{{ ruleForm.reviews.deanOffice.signDate }}</span>
                </template>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="row row4">
        <div class="item label fw600">研究生院</div>
        <div class="item content">
          <div class="content-row opinion">
            <div class="label fw600">主要负责人意见：</div>
            <el-form-item prop="graduateCollege.opinion">
              <template v-if="ruleForm.reviews.status < 4 && status != 'view'">
                <el-input
                  type="textarea"
                  v-model="ruleForm.reviews.graduateCollege.opinion"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span v-html="ruleForm.reviews.graduateCollege.opinion"></span>
              </template>
            </el-form-item>
          </div>
          <div class="content-row e-sign">
            <div class="label fw600">负责人签字：</div>
            <div class="content">
              <el-form-item prop="graduateCollege.signatory">
                <template
                  v-if="ruleForm.reviews.status < 5 && status != 'view'"
                >
                  <div v-if="ruleForm.reviews.graduateCollege.signatory">
                    <img
                      :src="ruleForm.reviews.graduateCollege.signatory"
                      alt="电子签名"
                    />
                    <span
                      style="color: #999; margin-left: 20px"
                      @click="openSign('graduateCollege')"
                      >重新签名</span
                    >
                  </div>

                  <span
                    v-else
                    style="color: #999"
                    @click="openSign('graduateCollege')"
                    >去签名</span
                  >
                </template>
                <template v-else>
                  <img
                    v-if="ruleForm.reviews.graduateCollege.signatory"
                    :src="ruleForm.reviews.graduateCollege.signatory"
                    alt="电子签名"
                  />
                </template>
              </el-form-item>
            </div>
          </div>
          <div class="content-row date">
            <div class="label fw600">日 期：</div>
            <div class="content">
              <el-form-item prop="deanOffice.signDate">
                <template
                  v-if="ruleForm.reviews.status < 4 && status != 'view'"
                >
                  <el-date-picker
                    v-model="ruleForm.reviews.deanOffice.signDate"
                    type="date"
                    format="YYYY年MM月DD日"
                    value-format="YYYY年MM月DD日"
                    :placeholder="'请输入'"
                    class="w100"
                    clearable
                  />
                </template>
                <template v-else>
                  <span>{{ ruleForm.reviews.deanOffice.signDate }}</span>
                </template>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="row row5">
        <div class="item label fw600">办理结果</div>
        <div class="item content">
          <div class="content-row opinion">
            <div class="label fw600">
              已完成留校申请（<span style="text-decoration: underline">{{
                ruleForm.transactionType
              }}</span
              >）
            </div>
          </div>
          <div class="content-row e-sign">
            <div class="label fw600">经办人：</div>
            <div class="content">
              <el-form-item prop="handleResult.signatory">
                <template
                  v-if="ruleForm.reviews.status < 5 && status != 'view'"
                >
                  <div v-if="ruleForm.reviews.handleResult.signatory">
                    <img
                      :src="ruleForm.reviews.handleResult.signatory"
                      alt="电子签名"
                    />
                    <span
                      style="color: #999; margin-left: 20px"
                      @click="openSign('handleResult')"
                      >重新签名</span
                    >
                  </div>

                  <span
                    v-else
                    style="color: #999"
                    @click="openSign('handleResult')"
                    >去签名</span
                  >
                </template>
                <template v-else>
                  <img
                    v-if="ruleForm.reviews.handleResult.signatory"
                    :src="ruleForm.reviews.handleResult.signatory"
                    alt="电子签名"
                  />
                </template>
              </el-form-item>
            </div>
          </div>
          <div class="content-row date">
            <div class="label fw600">日 期：</div>
            <div class="content">
              <el-form-item prop="handleResult.signDate">
                <template
                  v-if="ruleForm.reviews.status < 5 && status != 'view'"
                >
                  <el-date-picker
                    v-model="ruleForm.reviews.handleResult.signDate"
                    type="date"
                    format="YYYY年MM月DD日"
                    value-format="YYYY年MM月DD日"
                    :placeholder="'请输入'"
                    class="w100"
                    clearable
                  />
                </template>
                <template v-else>
                  <span>{{ ruleForm.reviews.handleResult.signDate }}</span>
                </template>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-form>
  <Sign v-model="eSign.open" @onDone="signDone"></Sign>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, toRaw } from "vue";
import * as _ from "lodash";
import { selectToLabel, multiToLabel, textAreaFormat } from "@/utils/form";

import useStudentModifyCommon from "../common";

import Sign from "@/components/Sign/index";

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
  title: "留校申请审批",
});

// 电子签名
const eSign = reactive({
  open: false,
  signType: "",
});

const baseFormRef = ref(null);

const rules = reactive({
  ["secCollege.result"]: [
    { required: true, message: "请选择学生情况审查结果", trigger: "blur" },
  ],
});

onBeforeMount(() => {});

const validForm = async () => {
  if (!baseFormRef.value) {
    return false;
  }

  const valid = await baseFormRef.value.validate(() => {});

  if (!valid) {
    proxy.$modal.msgWarning("表单填写有误，请重新填写！");
  }
  if (ruleForm.value.reviews.status === 0) {
    if (
      !ruleForm.value.reviews.secCollege.result ||
      !ruleForm.value.reviews.secCollege.signatory
    ) {
      proxy.$modal.msgWarning("二级学院审核填写有误，请重新填写！");
      return;
    }
  }

  return valid;
};

// 电子签名打开
const openSign = (signType) => {
  eSign.signType = signType;
  eSign.open = true;
};

// 电子签名结果
const signDone = (img) => {
  ruleForm.value.reviews[eSign.signType].signatory = img;
};

// 提交
const submitForm = async () => {
  const valid = await validForm();

  if (!valid) {
    return;
  }

  const postData = toRaw(ruleForm.value);
  if (postData.reviews.status < 5) {
    postData.reviews.status += 1;
    postData.status = "审核中";
  }
  if (postData.reviews.status === 4) {
    postData.status = "审核通过";
  }
  if (postData.reviews.status === 5) {
    postData.status = "审核完成";
  }

  emit("submit", postData);
  cancel();
};

// 取消
const cancel = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
/* 审批表样式 */
.review-form {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  color: #111;
}

.review-form-title {
  text-align: center;
  font-size: 18px;
  line-height: 32px;
  font-weight: 600;
  margin-bottom: 20px;
}
.review-form-table {
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
  .row2,
  .row3,
  .row4,
  .row5 {
    grid-template-columns: 120px auto;
    grid-template-rows: auto;

    .item.content {
      .el-form-item {
        margin-bottom: 0px;
      }

      .content-row {
        margin-bottom: 10px;

        .label {
          margin-right: 10px;
        }
      }

      .content-row.result {
        display: flex;
        align-items: center;
      }
      .content-row.opinion {
        .label {
          margin-bottom: 10px;
        }
      }
      .content-row.e-sign {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .content {
          display: inline-block;
          width: 200px;
          .el-form-item {
            margin-bottom: 0px;
          }

          cursor: pointer;
          img {
            height: 18px;
            width: auto;
          }
        }
      }
      .content-row.date {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .content {
          display: inline-block;
          width: 200px;
          .el-form-item {
            margin-bottom: 0px;
          }
        }
      }
    }
  }
}

/* 申请表样式 */
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
</style>
