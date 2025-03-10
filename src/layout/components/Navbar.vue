<template>
  <div class="navbar" :style="{ backgroundColor: menuBackground }">
    <div class="left-logo">
      <img src="@/assets/logo/logo.png" alt="" class="icon" />
      <span class="nav-title" :style="{ color: topNavColor }"
        >本研一体化管理服务平台</span
      >
    </div>
    <div class="center-menu">
      <TopNav id="topmenu-container" class="topmenu-container" v-if="topNav" />
    </div>

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <el-popover
          placement="bottom"
          trigger="click"
          transition="el-zoom-in-top"
          :width="300"
          :persistent="false"
        >
        
        </el-popover>

        <div class="icon-tool" @click.stop="iconToolClick(true)">
          <svg-icon
            :iconClass="'cloth'"
            :style="{ color: topNavColor }"
          ></svg-icon>
        </div>
      </template>
      
      <el-dropdown v-if="token"
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper" :style="{ color: topNavColor }">
          <img :src="avatar" class="user-avatar" />
          {{ name }}
          <i class="el-icon-arrow-down" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/user/profile">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from "element-plus";
import TopNav from "@/components/TopNav";
import useAppStore from "@/store/modules/app";
import useUserStore from "@/store/modules/user";
import useSettingsStore from "@/store/modules/settings";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const userStore = useUserStore();
const settingsStore = useSettingsStore();

const {
  sidebar,
  device,
} = storeToRefs(appStore);

const {
  token,
  avatar,
  name,
} = storeToRefs(userStore);

const {
  menuBackground,
  topMenuActiveColor,
  topMenuActiveLine,
  topNavColor,
  topMenuActiveBackground,
  topNav,
  showSettings,
} = storeToRefs(settingsStore);

function toggleSideBar() {
  appStore.toggleSideBar();
}

function handleCommand(command) {
  switch (command) {
    case "setLayout":
      setLayout();
      break;
    case "logout":
      logout();
      break;
    default:
      break;
  }
}

const iconToolClick = (val) => {
  settingsStore.changeSetting({ key: "showSettings", value: val });
};

function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      userStore.logOut().then(() => {
        location.href = "/login";
      });
    })
    .catch(() => {});
}

const emits = defineEmits(["setLayout"]);
function setLayout() {
  emits("setLayout");
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.navbar {
  height: $base-nav-bar-height;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1;
  display: flex;
  padding: 0px 20px;
  align-items: center;
  justify-content: space-between;

  .left-logo {
    width: 324px;
    display: flex;
    align-items: center;

    .icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 12px;
      background-color: #d3e0f5;
    }
    
    .nav-title {
      font-size: 18px;
      line-height: 50px;
      color: #202020;
      font-weight: bold;
    }
  }

  
  .center-menu {
    flex: 1;
    align-items: center;
    justify-content: center;

  }


  .right-menu {
    width:390px;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    &:focus {
      outline: none;
    }

    .icon-tool {
      font-size: 20px;
      cursor: pointer;
    }

    .right-menu-item {
      display: flex;
      align-items: center;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        border-left: 1px solid #8ba7e4;
        height: 20px;
        display: flex;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {

      .avatar-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;

        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .el-icon-arrow-down {
          cursor: pointer;
          font-size: 16px;
          color: #8ba7e4;
        }
      }
    }
  }
}
</style>
