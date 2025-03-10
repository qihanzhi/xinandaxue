<template>
  <div class="dialog-modal-header-box">
    <div class="header-title">
    </div>
  </div>
  <div class="apply-form">
    <div class="apply-form-title">导师遴选申请表</div>
    <el-form ref="baseFormRef" :model="ruleForm" :rules="rules" size="default">
      <div class="form-table">
        <div class="row row7">
          <div class="item label fw600">遴选年度</div>
          <div class="item content">
            <el-form-item prop="lxnd">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.lxnd"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.lxnd }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">遴选月份</div>
          <div class="item content">
            <el-form-item prop="lxyf">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.lxyf"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.lxyf }}</span>
              </template>
            </el-form-item>
          </div>
        </div>     
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
          <div class="item label fw600">工号</div>
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
          <div class="item label fw600">性别</div>
          <div class="item content">
            <el-form-item prop="xb">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.xb"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.xb }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
        <div class="row row2">
          <div class="item label fw600">出生日期</div>
          <div class="item content">
            <el-form-item prop="csrq">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.csrq"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.csrq }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">国家地区</div>
          <div class="item content">
            <el-form-item prop="gjdq">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.gjdq"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.gjdq }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">民族</div>
          <div class="item content">
            <el-form-item prop="mz">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.mz"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.mz }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
        <div class="row row2">
          <div class="item label fw600">本单位入职年月</div>
          <div class="item content">
            <el-form-item prop="bdwrzny">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.bdwrzny"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.bdwrzny }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">办公电话</div>
          <div class="item content">
            <el-form-item prop="bgdh">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.bgdh"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.bgdh }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">移动电话</div>
          <div class="item content">
            <el-form-item prop="yddh">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.yddh"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.yddh }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
        <div class="row row2">
          <div class="item label fw600">所在部门/院系</div>
          <div class="item content">
            <el-form-item prop="szbmyx">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.szbmyx"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.szbmyx }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">邮政邮编</div>
          <div class="item content">
            <el-form-item prop="yzyb">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.yzyb"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.yzyb }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">通讯地址</div>
          <div class="item content">
            <el-form-item prop="txdz">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.txdz"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.txdz }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
        <div class="row row7">
          <div class="item label fw600">申请学术学位研究生导师类型</div>
          <div class="item content">
            <el-form-item prop="sqxsxwyjsdslx">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.sqxsxwyjsdslx"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.sqxsxwyjsdslx }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">申请专业学位研究生导师类型</div>
          <div class="item content">
            <el-form-item prop="sqzyxwyjsdslx">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.sqzyxwyjsdslx"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.sqzyxwyjsdslx }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
        <div class="row row7">
          <div class="item label fw600">二级培养单位</div>
          <div class="item content">
            <el-form-item prop="ejpydw">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.ejpydw"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.ejpydw }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">是否同意作为全国研究所教育评估监测专家上报学位中心专家库</div>
          <div class="item content">
            <el-form-item prop="sftysb">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.sftysb"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.sftysb }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
        <div class="row row8">
          <div class="item label fw600">一级学科</div>
          <div class="item content">
            <el-form-item prop="yjxk">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.yjxk"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.yjxk }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">专业</div>
          <div class="item content">
            <el-form-item prop="zy">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zy"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zy }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">专业学位类别</div>
          <div class="item content">
            <el-form-item prop="zyxwlb">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zyxwlb"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zyxwlb }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">专业学位领域</div>
          <div class="item content">
            <el-form-item prop="zyxwly">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zyxwly"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zyxwly }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
        <div class="row row8">
          <div class="item label fw600">岗位等级</div>
          <div class="item content">
            <el-form-item prop="gwdj">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.gwdj"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.gwdj }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">党政职务</div>
          <div class="item content">
            <el-form-item prop="dzzw">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.dzzw"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.dzzw }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">其他行业技术职称</div>
          <div class="item content">
            <el-form-item prop="qthyjszc">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.qthyjszc"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.qthyjszc }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">国内外学术兼职</div>
          <div class="item content">
            <el-form-item prop="gnwxsjz">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.gnwxsjz"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.gnwxsjz }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
        <div class="row row8">
          <div class="item label fw600">参加工作时间</div>
          <div class="item content">
            <el-form-item prop="cjgzsj">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.cjgzsj"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.cjgzsj }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">是否有海外经历</div>
          <div class="item content">
            <el-form-item prop="sfyhwjl">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.sfyhwjl"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.sfyhwjl }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">专业技术职称</div>
          <div class="item content">
            <el-form-item prop="zyjszc">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zyjszc"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zyjszc }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">聘任时间</div>
          <div class="item content">
            <el-form-item prop="prsj">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.prsj"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.prsj }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
       
        <div class="row row5">
          <div class="item label fw600">学历院校</div>
        </div>
        <div class="row row8">
          <div class="item label fw600">最高学历</div>
          <div class="item content">
            <el-form-item prop="zgxl">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zgxl"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zgxl }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">最高学位</div>
          <div class="item content">
            <el-form-item prop="zgxw">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zgxw"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zgxw }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">最高学历专业</div>
          <div class="item content">
            <el-form-item prop="zgxlzy">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zgxlzy"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zgxlzy }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">最高学位专业</div>
          <div class="item content">
            <el-form-item prop="zgxwzy">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zgxwzy"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zgxwzy }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
        <div class="row row8">
          <div class="item label fw600">最高学历国家</div>
          <div class="item content">
            <el-form-item prop="zgxlgj">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zgxlgj"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zgxlgj }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">最高学位国家</div>
          <div class="item content">
            <el-form-item prop="zgxwgj">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zgxwgj"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zgxwgj }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">最高学历院校</div>
          <div class="item content">
            <el-form-item prop="zgxlyx">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zgxlyx"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zgxlyx }}</span>
              </template>
            </el-form-item>
          </div>
          <div class="item label fw600">最高学位院校</div>
          <div class="item content">
            <el-form-item prop="zgxwyx">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.zgxwyx"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.zgxwyx }}</span>
              </template>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>


  <Sign v-model="eSign.open" @onDone="signDone"></Sign>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, toRaw } from "vue";
import * as _ from "lodash";
import Sign from "@/components/Sign/index";
import { formatDateNoTime } from "@/utils/index";
const { proxy } = getCurrentInstance();

const emit = defineEmits(["update:modelValue", "submit"]);
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
      state.title = "查看导师申请";
      break;
    case "edit":
      state.title = "编辑导师申请";
      break;
    case "add":
      state.title = "新增导师申请";
      break;
  }
});

// 生成四位随机数
const randF = () => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// 获取工号
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
