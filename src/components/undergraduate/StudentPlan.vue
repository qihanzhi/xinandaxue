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
      <!-- 申请表 -->
      <div class="apply-form">
        <div class="apply-form-title">学业生涯</div>
        <div class="apply-form-notic">
          <p class="title">填写须知：</p>
          <p class="content">
            1.此规划书是对学生大学四/五年发展目标及实现情况的动态记录，毕业时装入学生个人档案。
          </p>
          <p class="content">
            2.规划书中“个人简历”、“自我剖析”、“自我发展规划（总目标及实现目标的做法等）”、“学年度具体目标”、“指导意见”等内容应在新生入学当年的11月底之前填好；表中其他栏目应在该学年结束后新的学年开始的前两周之内填好。
          </p>
          <p class="content">
            3.表中“指导意见”、“组织鉴定”栏目由导师或年级辅导员或班主任填写并签名。“指导意见”应对学生目标制定情况提出建议，并对规划目标的实现途径提出指导性意见；“组织鉴定”应对一学年目标完成情况做出简短评价，导师、年级辅导员、班主任在每次填写有关内容之前，都要有针对性地与每一位学生谈一次话，并在填表后将指导意见反馈给每名同学。
          </p>
          <p class="content">
            4.规划书可填电子版打印，如手填应用蓝色或黑色签字笔填写。
          </p>
          <p class="content">
            5.在每填写一次内容之后的三周内，辅导员应对所填内容进行检查，将有关情况进行汇总，并向学院学生工作负责人做一次专题汇报。
          </p>
        </div>
        <el-button size="mini" @click="setIsEdit" class="fr">维护</el-button>        
        <div class="form-table">
          <div class="row row1">
            <div class="item label fw600">姓名</div>
            <div class="item content">
              <span>{{ ruleForm.name }}</span>
            </div>
            <div class="item label fw600">学籍号</div>
            <div class="item content">
              <span>{{ ruleForm.studentNum }}</span>
            </div>
            <div class="item label fw600">学院</div>
            <div class="item content">
              <span>{{ ruleForm.college }}</span>
            </div>
          </div>
          <div class="row row2">
            <div class="item label fw600">入学年份</div>
            <div class="item content">
              <span>{{ ruleForm.schoolYear }}</span>
            </div>
            <div class="item label fw600">专业</div>
            <div class="item content">
              <span>{{ ruleForm.major }}</span>
            </div>
            <div class="item label fw600">学籍所在班级</div>
            <div class="item content">
              <span>{{ ruleForm.classes }}</span>
            </div>
          </div>
          <div class="row row3">
            <div class="item label fw600">身份证号</div>
            <div class="item">
              <span>{{ ruleForm.card }}</span>
            </div>
          </div>
          <div class="row row4">
            <div class="item label fw600">个人简历</div>
            <div class="item">（小学、初中、高中、大学等）</div>
          </div>
          <div class="row row4">
            <div class="item label fw600">自我剖析</div>
            <div class="item">（性格、爱好、特长、缺点等）</div>
          </div>
          <div class="row row4">
            <div class="item label fw600">环境认知</div>
            <div class="item">
              （社会环境、学习环境、专业前景、就业政策、考研和留学政策等）
            </div>
          </div>
          <div class="row row5">
            <div class="item">
              <p class="fw600">学业生涯总目标及具体做法</p>
              <div class="apply-reason">
                <div>
                  一、学业生涯总目标：<br />（例如：拿到学位证/考上研究生/推免研究生/出国留学/……）
                </div>
                <div>
                  二、具体做法：<br />
                  （例如：<br />
                  1认真学习所有的课程，争取不会出现挂科的现象，最好是能够拿到奖学金。<br />
                  2.拿到英语六级，计算机国二证书。<br />
                  3.大三大四对专业知识的学习要不断深入，为考研做准备。<br />
                  4.……）<br />
                </div>
              </div>
            </div>
          </div>
          <div class="row row5">
            <div class="item">
              <p class="fw600">学年度具体目标</p>
              <div class="apply-reason">
                <div class="row row3">第一学年<br /></div>
                <div class="row row3">第二学年<br /></div>
                <div class="row row3">第三学年<br /></div>
                <div class="row row3">第四学年<br /></div>
                <div class="row row3">第五学年（四学年制不填）<br /></div>
              </div>
            </div>
          </div>
          <div class="row row3">
            <div class="item label fw600">指导意见</div>
            <div class="item">
              <el-input
              v-model="ruleForm.field_0"
              placeholder="请输入指导意见"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_0 }}</span>
            </div>
          </div>
          <div class="row row3">
            <div class="item label fw600">
              指导教师（导师、辅导员、班主任）签名
            </div>
            <div class="item"></div>
          </div>
          <div class="plan-table">
            <div class="row row2">
              <div class="item label fw600">项目/时间</div>
              <div class="item label fw600">第一学年</div>
            </div>
            <div class="row row3">
              <div class="item label fw600">项目/时间</div>
              <div class="item label fw600">第一学期</div>
              <div class="item label fw600">第二学期</div>
            </div>
            <div class="row row3">
              <div class="item label fw600">本人自评</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_1"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_1 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_2"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_2 }}</span>
              </div>
            </div>
            <div class="row row3">
              <div class="item label fw600">班主任评价</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_3"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_3 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_4"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_4 }}</span>
              </div>
            </div>
            <div class="row row3">
              <div class="item label fw600">辅导员评价</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_5"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_5 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_6"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_6 }}</span>
              </div>
            </div>

            <div class="row row2">
              <div class="item label fw600">项目/时间</div>
              <div class="item label fw600">第二学年</div>
            </div>
            <div class="row row3">
              <div class="item label fw600">项目/时间</div>
              <div class="item label fw600">第一学期</div>
              <div class="item label fw600">第二学期</div>
            </div>
            <div class="row row3">
              <div class="item label fw600">本人自评</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_7"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_7 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_8"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_8 }}</span>
              </div>
            </div>
            <div class="row row3">
              <div class="item label fw600">班主任评价</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_9"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_9 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_10"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_10 }}</span>
              </div>
            </div>
            <div class="row row3">
              <div class="item label fw600">辅导员评价</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_11"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_11 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_12"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_12 }}</span>
              </div>
            </div>

            <div class="row row2">
              <div class="item label fw600">项目/时间</div>
              <div class="item label fw600">第三学年</div>
            </div>
            <div class="row row3">
              <div class="item label fw600">项目/时间</div>
              <div class="item label fw600">第一学期</div>
              <div class="item label fw600">第二学期</div>
            </div>
            <div class="row row3">
              <div class="item label fw600">本人自评</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_13"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_13 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_14"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_14 }}</span>
              </div>
            </div>
            <div class="row row3">
              <div class="item label fw600">班主任评价</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_15"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_15 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_16"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_16 }}</span>
              </div>
            </div>
            <div class="row row3">
              <div class="item label fw600">辅导员评价</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_17"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_17 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_18"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_18 }}</span>
              </div>
            </div>

            <div class="row row2">
              <div class="item label fw600">项目/时间</div>
              <div class="item label fw600">第四学年（四年制不写）</div>
            </div>
            <div class="row row3">
              <div class="item label fw600">项目/时间</div>
              <div class="item label fw600">第一学期</div>
              <div class="item label fw600">第二学期</div>
            </div>
            <div class="row row3">
              <div class="item label fw600">本人自评</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_19"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_19 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_20"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_20 }}</span>
              </div>
            </div>
            <div class="row row3">
              <div class="item label fw600">班主任评价</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_21"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_21 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_22"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_22 }}</span>
              </div>
            </div>
            <div class="row row3">
              <div class="item label fw600">辅导员评价</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_23"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_23 }}</span>
              </div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_24"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_24 }}</span>
              </div>
            </div>

            <div class="row row2">
              <div class="item label fw600">项目/时间</div>
              <div class="item label fw600">第五学年（毕业学年）</div>
            </div>
            <div class="row row2">
              <div class="item label fw600">本人自评</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_25"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_25 }}</span>
              </div>
            </div>
            <div class="row row2">
              <div class="item label fw600">组织鉴定</div>
              <div class="item label fw600">
                <el-input
              v-model="ruleForm.field_26"
              placeholder="请输入"
              v-show="isEdit"
            />
            <span v-show="!isEdit">{{ ruleForm.field_26 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </template>
  </el-dialog>
  <Sign v-model="eSign.open" @onDone="signDone"></Sign>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, toRaw } from "vue";
import * as _ from "lodash";
import { selectToLabel, multiToLabel, textAreaFormat } from "@/utils/form";

import useStudentInfoCommon from "@/views/graduate/studentStatus/info/label/common";
import useStudentModifyCommon from "@/views/graduate/studentStatus/info/label/common";

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
    required: false,
  },
});
const open = computed(() => {
  return props.modelValue;
});

const isEdit = ref(false);
const setIsEdit = ()=> {
  isEdit.value = !isEdit.value;
}
const ruleForm = computed(() => {
  const data = reactive(_.cloneDeep(props.formData));
  return data;
});

const state = reactive({
  title: "学业生涯",
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
  // const valid = await validForm();

  // if (!valid) {
  //   return;
  // }

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
.plan-table {
  .row2 {
    grid-template-columns: 120px 780px;
  }
  .row3 {
    grid-template-columns: 120px 390px 390px;
  }
}
</style>
