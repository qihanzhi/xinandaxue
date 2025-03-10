<template>
   <div class="aside-bar">
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper" :style="{ '--theme-color': theme }">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <Hamburger
      v-if="false"
      id="hamburger-container"
      :is-active="isCollapse"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
  </div>
</template>

<script setup>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.module.scss'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

import Hamburger from '@/components/Hamburger/index.vue';

const route = useRoute();
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()

const sidebarRouters =  computed(() => permissionStore.sidebarRouters);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
})

const toggleSideBar = () => {
  appStore.toggleSideBar();
}

</script>
<style lang="scss" scoped>
.aside-bar {
  height: calc(100%);
  width: 100%;
}


.hamburger-container {
  width: 100%;
  height: 52px;
  border-top: 1px solid #e6eaef;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
