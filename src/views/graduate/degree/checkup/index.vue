<template>
  <div class="app-container">
    <div class="center-box">
      <el-upload
        v-model:file-list="fileList"
        class="upload-box"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
      >
        <el-button type="primary">匿名检测</el-button>
        <template #tip>
          <div class="el-upload__tip">请上传论文进行匿名检测</div>
        </template>
      </el-upload>
      <div class="check-tip-box">
        上传论文后，稍后可查看查询结果！
      </div>
    </div>
    <div class="result-list">
        <p>查询结果列表：</p>
        <el-empty :image-size="100" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const fileList = ref([]);

const handleRemove = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview = (uploadFile) => {
  console.log(uploadFile);
};

const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`是否取消上传 ${uploadFile.name} ?`).then(
    () => true,
    () => false
  );
};
</script>

<style lang="scss" scoped>
.center-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  
}
.upload-box {
  width: 100%;
}
.check-tip-box {
  border: 1px dashed #ccc;
  padding: 20px;
  height: 100px;
  width: 100%;
  font-style: italic;
  color: #999;
  margin-top: 20px;
}
.result-list {
    margin-top: 20px;
}
</style>
