<template>
  <router-view />
  <!-- <theme-picker style="display: none" /> -->
</template>

<script setup>
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'
// import ThemePicker from "@/components/ThemePicker";

onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme)
    // 弹窗需要样式
    window.document.getElementsByTagName('body')[0].setAttribute('style', '--current-color:' + useSettingsStore().theme);
  })
})
</script>
<style scoped>
/* .theme-picker {
  display: none;
} */
</style>
