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
      <div class="form-title">导师信息</div>
      <el-form
        ref="baseFormRef"
        :model="ruleForm"
        :rules="rules"
        size="default"
        label-width="120px"
      >
        <el-row :gutter="35">
          <el-col :span="12">
            <el-row :gutter="35">
              <el-col :span="24">
                <el-form-item :label="'姓名'" :prop="'name'">
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
              </el-col>
              <el-col :span="24">
                <el-form-item :label="'性别'" :prop="'gender'">
                  <template v-if="status != 'view'">
                    <el-select
                      v-model="ruleForm.gender"
                      :placeholder="'请选择'"
                      class="w100"
                    >
                      <template
                        v-for="option in dics['gender']"
                        :key="option.value"
                      >
                        <el-option
                          :label="option.label"
                          :value="option.value"
                        />
                      </template>
                    </el-select>
                  </template>
                  <template v-else>
                    <span>{{ selectToLabel(ruleForm.gender) }}</span>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item :label="'民族'" :prop="'nation'">
                  <template v-if="status != 'view'">
                    <el-input
                      v-model="ruleForm.nation"
                      :placeholder="'请输入'"
                      clearable
                    ></el-input>
                  </template>
                  <template v-else>
                    <span>{{ ruleForm.nation }}</span>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'照片'" :prop="'picture'">
              <div>
                <UserAvatar v-model="ruleForm.picture"></UserAvatar>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="35">
          <el-col :span="12">
            <el-form-item :label="'政治面貌'" :prop="'politicalStatus'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.politicalStatus"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.politicalStatus }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'出生日期'" :prop="'dateOfBirth'">
              <template v-if="status != 'view'">
                <el-date-picker
                  v-model="ruleForm.dateOfBirth"
                  type="date"
                  format="YYYY/MM/DD"
                  value-format="YYYY/MM/DD"
                  :placeholder="'请输入'"
                  class="w100"
                  clearable
                />
              </template>
              <template v-else>
                <span>{{ ruleForm.dateOfBirth }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'籍贯'" :prop="'nativePlace'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.nativePlace"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.nativePlace }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'联系电话'" :prop="'contactNumber'">
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
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'E-mail'" :prop="'contactInformation'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.contactInformation"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.contactInformation }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="'通信地址'" :prop="'mailingAddress'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.mailingAddress"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.mailingAddress }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'毕业院校'" :prop="'field1'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.field1"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.field1 }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'学历'" :prop="'field2'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.field2"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.field2 }}</span>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'所属院系'" :prop="'affiliatedDepartment'">
              <template v-if="status != 'view'">
                <el-input
                  v-model="ruleForm.affiliatedDepartment"
                  :placeholder="'请输入'"
                  clearable
                ></el-input>
              </template>
              <template v-else>
                <span>{{ ruleForm.affiliatedDepartment }}</span>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="35">
          <el-col :span="24">
            <el-form-item :label="'个人简历'" :prop="'resume'">
              <template v-if="status != 'view'">
                <editor v-model="ruleForm.resume" :min-height="192" />
              </template>
              <template v-else>
                <div v-html="ruleForm.resume"></div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="students-box">
          <div class="form-title">学生列表</div>
          <div class="table-operator mb10"  v-if="status != 'view'" >
            <div class="search">
              <el-autocomplete
                v-model="studentState.search"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入学生姓名"
                value-key="name"
                @select="handleSelect"
              >
              </el-autocomplete>
            </div>
            <el-button icon="plus" @click="addStudent" plain>添加</el-button>
          </div>
          <div class="table-container">
            <el-table
              ref="zkTableRef"
              :data="studentState.data"
              style="width: 100%"
              height="100%"
              :border="true"
            >
              <el-table-column
                type="selection"
                width="40"
                :align="'left'"
                fixed
              ></el-table-column>
              <el-table-column
                v-for="column in tableState.columns"
                :key="column.field"
                :prop="column.field"
                :label="column.label"
                :width="column.width"
              ></el-table-column>
              <el-table-column width="200" label="操作" :fixed="'right'" v-if="status != 'view'">
                <template #default="{ row, index }">
                  <div class="table-tool">
                    <div class="red" @click="handleDelete(row, index)">删除</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
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
import {
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  toRaw,
} from "vue";
import * as _ from "lodash";
import { selectToLabel, multiToLabel, textAreaFormat } from "@/utils/form";

import useStudentInfoCommon from "./common";

import UserAvatar from "./userAvatar";
import useGraduateStore from "@/store/modules/graduate";

const { proxy } = getCurrentInstance();

const emit = defineEmits(["update:modelValue", "submit"]);

const { dics } = useStudentInfoCommon();
const graduateStore = useGraduateStore();

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
  title: "辅导员信息",
});

const baseFormRef = ref(null);

const rules = reactive({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
});

/* 学生列表 */
const links = ref([]);

const studentState = reactive({
  data: [],
  search: "",
  curStudent: null,
});

const tableState = reactive({
  columns: [
  {
      field: "studentNum",
      label: "学籍号",
      type: "",
      width: "200px",
    },
    {
      field: "name",
      label: "姓名",
      type: "",
      width: "",
    },
    {
      field: "gender",
      label: "性别",
      type: "",
      width: "",
    },
    {
      field: "nation",
      label: "民族",
      type: "",
      width: "",
    },
    {
      field: "politicalStatus",
      label: "政治面貌",
      type: "",
      width: "",
    },
    {
      field: "contactNumber_view",
      label: "联系电话",
      type: "",
      width: "",
    },
  ],
});

const loadAll = () => {
  let data = [];
  graduateStore.infoTableData.forEach((item) => {
    data.push(item);
  });

  return data;
};

let timeout = null;
const querySearchAsync = (queryString, cb) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    cb(results);
  }, 1000 * Math.random());
};

const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

const handleSelect = (item) => {
  studentState.curStudent = item;
};
const addStudent = () => {
  studentState.data.push(studentState.curStudent);
  studentState.curStudent = null;
  studentState.search = '';
};

const handleDelete = (row, index) => {
  studentState.data.splice(index, 1);
}

onBeforeMount(() => {
  switch (props.status) {
    case "view":
      state.title = "查看辅导员信息";
      break;
    case "edit":
      state.title = "编辑辅导员信息";
      break;
    case "add":
      state.title = "新增辅导员信息";
      break;
  }
});

onMounted(() => {
  links.value = loadAll();
  studentState.data = props.formData?.students || [];
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

  // 学籍号自动生成
  ruleForm.value.studentNum = getStudentNum(ruleForm.value.dateOfBirth);

  const postData = toRaw(ruleForm.value);
  postData.students = studentState.data;
  emit("submit", postData);
  cancel();
};

const cancel = () => {
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
.students-box {
  .table-operator {
    display: flex;
    align-items: center;

    .search {
      width: 400px;
      margin-right: 20px;
    }
  }
}
</style>
