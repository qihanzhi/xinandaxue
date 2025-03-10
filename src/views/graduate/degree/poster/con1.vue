<template>
  <p class="title">答辩海报主题设置</p>
  <div class="operator">
    <template v-if="!state.edit">
      <el-button type="primary" @click="edit">编辑</el-button>
    </template>
    <template v-else>
      <el-button type="primary" @click="submitForm">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </div>
  <div class="content">
    <el-form
      ref="baseFormRef"
      :model="ruleForm"
      :rules="rules"
      size="default"
      label-width="100px"
      label-position="top"
    >
      <el-row :gutter="35">
        <el-col :span="24">
          <el-form-item :label="'主题背景'" :prop="'label'">
            <template v-if="state.edit">
              <el-upload
                action="#"
                list-type="picture-card"
                :http-request="requestUpload"
                :before-upload="beforeUpload"
              >
                <el-icon><Plus /></el-icon>

                <template #file="{ file }">
                  <div>
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                  </div>
                </template>
              </el-upload>
            </template>
            <template v-else>
              <img class="bg-img"
                v-if="ruleForm.bgImg"
                w-full
                :src="ruleForm.bgImg"
                alt="Preview Image"
              />
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="'主题颜色：'" :prop="'color'">
            <el-color-picker v-model="ruleForm.color" :disabled="!state.edit" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { getCurrentInstance, onBeforeMount, reactive, toRaw } from "vue";
import * as _ from "lodash";
import { selectToLabel, multiToLabel, textAreaFormat } from "@/utils/form";
import { uploadImg } from "@/api/graduate/common";

const { proxy } = getCurrentInstance();

const emit = defineEmits(["submit"]);

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const ruleForm = computed(() => {
  const data = reactive(_.cloneDeep(props.formData));
  return data;
});

const state = reactive({
  edit: false,
});

const baseFormRef = ref(null);

const rules = reactive({});


onBeforeMount(() => {});

/** 覆盖默认上传行为 */
function requestUpload() {
  
}

/** 上传预处理 */
const  beforeUpload = (file) => {
  if (file.type.indexOf("image/") == -1) {
    proxy.$modal.msgError(
      "文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。"
    );
  } else {
    uploadImgFn(file)
  }
}

/** 上传图片 */
function uploadImgFn(data) {
  let formData = new FormData();
  formData.append("file", data, data.name);
  return uploadImg(formData).then((response) => {
    ruleForm.value.bgImg = import.meta.env.VITE_APP_BASE_API + response.fileName;
  });
}

const submitForm = async () => {
  const postData = toRaw(ruleForm.value);

  emit("submit", postData);
  cancel();
};

const cancel = () => {
  state.edit = false;
};

const edit = () => {
  state.edit = true;
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10.5px;
  background: rgba(255, 255, 255, 0.7);
}

.title {
  margin-bottom: 20px;
}
.operator {
  margin-bottom: 20px;
}
.content {
  padding: 20px;
  border: 1px solid #ccc;

  .bg-img {
    width: 100px;
  }
}
</style>
