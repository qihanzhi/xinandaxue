<template>
  <el-dialog
    v-model="open"
    width="800px"
    @close="cancel"
    :destroy-on-close="true"
    :close-on-press-escape="false"
    :class="'dialog-modal-box'"
    title="修改"
    append-to-body
  >
    <el-form
      ref="dataForm"
      :model="form"
      :rules="rules"
      label-width="120px"
      v-if="open"
    >
      <div class="form-grid">
        <el-form-item :label="f.name + ':'" prop="type" v-for="f in editField">
          <el-select
            clearable
            v-model="form[f.prop]"
            :placeholder="'请选择' + f.name"
            :multiple="f.type === 'multiselect'"
            v-if="f.type === 'select' || f.type === 'multiselect'"
          >
            <el-option
              v-for="item in f.options"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>

          <el-input
            v-model="form['classroom2']"
            :placeholder="'请输入' + f.name"
            v-if="f.prop === 'classroom' && form[f.prop] === '自定义'"
          />
          <el-input
            v-model="form[f.prop]"
            :placeholder="'请输入' + f.name"
            v-if="f.type === 'input'"
          />
          <el-date-picker
            v-model="form[f.prop]"
            type="date"
            :placeholder="'请选择' + f.name"
            v-if="f.type === 'date'"
          />
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
const emit = defineEmits(["cancel", "submit"]);
const open = ref(true);
const props = defineProps({
  data: {
    type: Object,
    default: {
      id: "1_0",
      label: "控制理论",
      value: "张前东",
      classroom: "一号楼302",
      className: "自动化1班",
      color: "",
      conflit: [],
    },
  },
  check: {
    type: Function,
    default: () => {},
  },
});
const rules = [];
// 编辑字段
const editField = ref([
  {
    name: "班级",
    type: "select",
    prop: "className",
    options: ["自动化1班", "自动化2班"],
  },
  {
    name: "课程",
    type: "select",
    prop: "label",
    options: ["控制理论", "工程制图", "检测技术", "电动与机动"],
  },
  {
    name: "教师",
    type: "select",
    prop: "value",
    options: ["张前东", "刘浩", "耿星", "齐浒", "李朝阳", "王侯然", "孙晓菲"],
  },
  {
    name: "教室",
    type: "select",
    prop: "classroom",
    options: [
      "一号楼302",
      "一号楼201",
      "一号楼212",
      "一号楼210",
      "一号楼407",
      "二号楼103",
      "自定义",
    ],
  },
]);
const form = ref(JSON.parse(JSON.stringify(props.data)));
const cancel = () => {
  emit("cancel");
};
const submitForm = () => {
  if (form.value.classroom2) {
    form.value.classroom = form.value.classroom2;
  }
  emit("submit", form.value);
};
</script>
<style lang="scss" scoped></style>
