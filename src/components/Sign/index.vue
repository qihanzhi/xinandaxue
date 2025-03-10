<template>
  <el-dialog
    v-model="open"
    width="460px"
    @close="cancel"
    :destroy-on-close="true"
    :close-on-press-escape="false"
    :class="'dialog-modal-box'"
    title="电子签名"
    append-to-body
  >
    <template #default>
      <div class="container" :style="{ width: width + 40 + 'px' }">
        <Vue3Sign
          :canvas-width="width"
          :canvas-height="height"
          @on-done="done"
        ></Vue3Sign>
      </div>
    </template>
  </el-dialog>
</template>

<script setup name="Sign">
import { ref, reactive, computed } from "vue";
import { uploadImg } from "@/api/graduate/common";

const emit = defineEmits(["update:modelValue", "onDone"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const width = ref(300);
const height = ref(150);

const open = computed(() => {
  return props.modelValue;
});


// 签名确定
const done = async (img) => {
  emit("onDone", img);
  cancel();
};
const cancel = () => {
  open.value = false;
  emit("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
}
</style>
