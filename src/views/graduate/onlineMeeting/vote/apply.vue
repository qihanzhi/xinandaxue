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
      <div class="apply-form">
        <div class="apply-form-title">优秀博文申请表</div>
        <div class="apply-form-notic">
          <p class="title">申请须知：</p>
          <p class="content">
            一、评选范围：原则上为在2024年10月、2025年1月获得博士学位及预计在2025年7月获得博士学位者的博士学位论文；
          </p>
          <p class="content">
            二、学位论文选题为本学科前沿，有重要的理论或现实意义；
          </p>
          <p class="content">
            三、学位论文在理论或方法上有创新，取得突破性成果，达到国际同类学科先进水平，具有较好的社会效益或应用前景；
          </p>
          <p class="content">
            四、学位论文除外国语言文学（学科代码0502）外，一般应以中文撰写；用中文以外的文字撰写的外国语言文学论文，需提供不少于5000字的详细中文摘要；
          </p>
          <p class="content">
            五、学位论文材料翔实，推理严密，文字表达准确，符合学术规范，内容不涉密，可公开；
          </p>
          <p class="content">
            六、学位论文应获得同行专家较高的评价，评阅意见各项指标及综合评价原则上应为优或良。
          </p>
        </div>
        <el-form
          ref="baseFormRef"
          :model="ruleForm"
          :rules="rules"
          size="default"
        >
          <div class="form-table">
            <div class="row row7">
              <div class="item label fw600">学位分会名称</div>
              <div class="item content">
                <el-form-item prop="xwfhmc">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.xwfhmc"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.xwfhmc }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">申请人所在院系名称</div>
              <div class="item content">
                <el-form-item prop="sqrszyxmc">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.sqrszyxmc"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.sqrszyxmc }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row4">
              <div class="item label fw600">论文题目</div>
              <div class="item">
                <el-form-item prop="lwtm">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.lwtm"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.lwtm }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row4">
              <div class="item label fw600">论文英文题目</div>
              <div class="item">
                <el-form-item prop="lwywtm">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.lwywtm"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.lwywtm }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row4">
              <div class="item label fw600">论文涉及的研究方向</div>
              <div class="item">
                <el-form-item prop="lwsjdyjfx">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.lwsjdyjfx"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.lwsjdyjfx }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row1">
              <div class="item label fw600">作者姓名</div>
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
              <div class="item label fw600">作者学号</div>
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
              <div class="item label fw600">论文答辩日期</div>
              <div class="item content">
                <el-form-item prop="lwdbrq">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.lwdbrq"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.lwdbrq }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row2">
              <div class="item label fw600">授予或预计授予学位日期</div>
              <div class="item content">
                <el-form-item prop="syhyjsyxwrq">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.syhyjsyxwrq"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.syhyjsyxwrq }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">一级学科代码</div>
              <div class="item content">
                <el-form-item prop="yjxkdm">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.yjxkdm"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.yjxkdm }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">一级学科名称</div>
              <div class="item content">
                <el-form-item prop="yjxkmc">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.yjxkmc"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.yjxkmc }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row2">
              <div class="item label fw600">二级学科代码</div>
              <div class="item content">
                <el-form-item prop="ejxkdm">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.ejxkdm"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.ejxkdm }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">二级学科名称</div>
              <div class="item content">
                <el-form-item prop="ejxkmc">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.ejxkmc"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.ejxkmc }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">是否自设学科专业</div>
              <div class="item content">
                <el-form-item prop="sfzsxkzy">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.sfzsxkzy"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.sfzsxkzy }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row7">
              <div class="item label fw600">指导教师姓名（限填1人）</div>
              <div class="item content">
                <el-form-item prop="zdjsxm">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.zdjsxm"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.zdjsxm }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">指导教师研究方向</div>
              <div class="item content">
                <el-form-item prop="zdjsyjfx">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.zdjsyjfx"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.zdjsyjfx }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row7">
              <div class="item label fw600">作者手机号（永久使用）</div>
              <div class="item content">
                <el-form-item prop="zzsjh">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.zzsjh"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.zzsjh }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">作者电子邮箱（永久使用）</div>
              <div class="item content">
                <el-form-item prop="zzdzyx">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.zzdzyx"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.zzdzyx }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row5">
              <div class="item label fw600">在读期间科研汇总</div>
            </div>
            <div class="row row8">
              <div class="item label fw600">通讯作者论文数</div>
              <div class="item content">
                <el-form-item prop="txzzlws">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.txzzlws"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.txzzlws }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">第一作者论文数</div>
              <div class="item content">
                <el-form-item prop="dyzzlws">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.dyzzlws"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.dyzzlws }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">第二作者论文数</div>
              <div class="item content">
                <el-form-item prop="dezzlws">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.dezzlws"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.dezzlws }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">SCI论文数</div>
              <div class="item content">
                <el-form-item prop="scilws">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.scilws"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.scilws }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row8">
              <div class="item label fw600">EI论文数</div>
              <div class="item content">
                <el-form-item prop="eilws">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.eilws"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.eilws }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">SSCI论文数</div>
              <div class="item content">
                <el-form-item prop="sscilws">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.sscilws"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.sscilws }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">A&HCI论文数</div>
              <div class="item content">
                <el-form-item prop="ahcilws">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.ahcilws"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.ahcilws }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">ISTP论文数</div>
              <div class="item content">
                <el-form-item prop="istplws">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.istplws"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.istplws }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row7">
              <div class="item label fw600">
                以第一作者/通讯作者发表最具有代表性论文的影响因子
              </div>
              <div class="item content">
                <el-form-item prop="yxyz">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.yxyz"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.yxyz }}</span>
                  </template>
                </el-form-item>
              </div>
              <div class="item label fw600">已获发明或实用新型专利数</div>
              <div class="item content">
                <el-form-item prop="yhfmhsyxxzls">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.yhfmhsyxxzls"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.yhfmhsyxxzls }}</span>
                  </template>
                </el-form-item>
              </div>
            </div>
            <div class="row row5">
              <div class="item">
                <p class="fw600">
                  作者攻博期间获得与博士学位论文密切相关的代表性成果
                </p>
                <div class="apply-reason">
                  <el-form-item prop="dbxcg">
                    <template v-if="status != 'view'">
                      <el-input
                        type="textarea"
                        v-model="ruleForm.dbxcg"
                        :placeholder="'请输入'"
                        clearable
                      ></el-input>
                    </template>
                    <template v-else>
                      <span>{{ ruleForm.dbxcg }}</span>
                    </template>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="row row5">
              <div class="item">
                <p class="fw600">论文创新点</p>
                <div class="apply-reason">
                  <el-form-item prop="lwcxd">
                    <template v-if="status != 'view'">
                      <el-input
                        type="textarea"
                        v-model="ruleForm.lwcxd"
                        :placeholder="'请输入'"
                        clearable
                      ></el-input>
                    </template>
                    <template v-else>
                      <span>{{ ruleForm.lwcxd }}</span>
                    </template>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="row row6">
              <div class="item">
                <p class="fw600">
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  本人郑重声明：所呈交的学位论文，是本人在导师的指导下，独立进行研究工作所取得的成果。除文中已经注明引用的内容外，本论文不包含任何其他个人或集体已经发表或撰写过的作品成果。对本文的研究做出重要贡献的个人和集体，均已在文中以明确方式标明。本人完全意识到本声明的法律结果由本人承担。
                </p>
                <div class="confirm-content">
                  <div class="e-sign">
                    <span class="label">学位论文作者签名：</span>
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
import useStudentInfoCommon from "./common";
import UserAvatar from "./userAvatar";
import Sign from "@/components/Sign/index";
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
  title: "申请信息",
});

const baseFormRef = ref(null);

const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  nation: [{ required: true, message: "请输入民族", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  dateOfBirth: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
});
// 电子签名
const eSign = reactive({
  open: false,
  signType: "",
});
// 电子签名打开
const openSign = (signType) => {
  eSign.signType = signType;
  eSign.open = true;
};

// 电子签名结果
const signDone = (img) => {
  ruleForm.value.applySign = img;
};

onBeforeMount(() => {
  switch (props.status) {
    case "view":
      state.title = "查看优秀论文申请";
      break;
    case "edit":
      state.title = "编辑优秀论文申请";
      break;
    case "add":
      state.title = "新增优秀论文申请";
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

  .row7 {
    grid-template-columns: 150px 300px 150px 300px;
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
  .row8 {
    grid-template-columns: 120px 105px 120px 105px 120px 105px 120px 105px;
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
}
</style>
