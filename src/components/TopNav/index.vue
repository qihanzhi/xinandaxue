<template>
  <div class="nav-bar">
    <div
      class="nav-btn prev"
      :class="{
        'nav-btn-show': state.visibleNumber < topMenus.length && state.prevNum,
      }"
      :style="{
        '--topNavColor': topNavColor,
        '--topMenuActiveLine': topMenuActiveLine,
      }"
      @click="prevNav()"
    >
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div
      class="nav-list-wrapper"
      :style="{ width: `calc(124px * ${state.visibleNumber})` }"
    >
      <ul
        class="nav-list"
        :style="{ transform: `translateX(calc(-${state.prevNum} * 124px))` }"
      >
        <li
          v-for="(item, index) in topMenus"
          v-bind:key="item.path"
          :style="{
            '--topNavColor': topNavColor,
            '--topMenuActiveColor': topMenuActiveColor,
            '--topMenuActiveLine': topMenuActiveLine,
            '--topMenuActiveBackground': topMenuActiveBackground,
          }"
          :class="{ 'menu-active': activeMenu === item.path }"
          @click="handleSelect(item.path, index)"
        >
          {{ item.meta.title }}
        </li>
      </ul>
    </div>
    <div
      class="nav-btn next"
      :class="{
        'nav-btn-show': state.visibleNumber < topMenus.length && state.nextNum,
      }"
      :style="{
        '--topNavColor': topNavColor,
        '--topMenuActiveLine': topMenuActiveLine,
      }"
      @click="nextNav()"
    >
      <el-icon><ArrowRight /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { constantRoutes } from "@/router";

import useSettingsStore from "@/store/modules/settings";
import usePermissionStore from "@/store/modules/permission";
import useAppStore from "@/store/modules/app";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";

const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const appStore = useAppStore();

const router = useRouter();

// 隐藏侧边栏路由
const hideList = ["/index", "/user/profile"];

/* 变量 */
const state = reactive({
  // 顶部栏初始数
  visibleNumber: 5,
  // 当前激活菜单的 index
  currentIndex: 0,
  // 左边隐藏的菜单个数
  prevNum: 0,
  // 右边隐藏的菜单个数
  nextNum: 0,
});

const {
  theme,
  menuBackground,
  topNavColor,
  topMenuActiveColor,
  topMenuActiveLine,
  topMenuActiveBackground,
} = storeToRefs(settingsStore);

const topMenus = computed(() => {
  let topMenus = [];
  routers.value.map((menu) => {
    if (menu.hidden !== true) {
      // 兼容顶部栏一级菜单内部跳转
      if (menu.path === "/") {
        topMenus.push(menu.children[0]);
      } else {
        topMenus.push(menu);
      }
    }
  });
  return topMenus;
});

// 默认可添加的菜单
const defaultMenus = [
  // {
  //   path: "/index",
  //   component: () => import("@/views/index.vue"),
  //   name: "Index",
  //   meta: { title: "首页", icon: "dashboard", affix: true },
  // },
];

// 顶部路由菜单信息(未登录静态)
const menus = [
  {
    path: "/undergraduate",
    component: () => import("@/views/undergraduate/schedule/items"),
    name: "undergraduate",
    meta: { title: "本科教学教务管理系统", icon: "education", affix: true },
  },
  {
    path: "/graduate",
    component: () => import("@/views/graduate/index.vue"),
    name: "graduate",
    meta: { title: "研究生管理系统", icon: "excel", affix: true },
  },
  {
    path: "/system",
    component: () => import("@/views/system/user/index.vue"),
    name: "system",
    meta: { title: "系统管理", icon: "system", affix: true },
  },
];

// 所有路由信息
const routers = computed(() => {
  const arr = [...defaultMenus];
  if (permissionStore.topbarRouters.length) {
    arr.push(...permissionStore.topbarRouters);
  } else {
    arr.push(...menus);
  }
  return arr;
});

// 设置子路由
const childrenMenus = computed(() => {
  var childrenMenus = [];

  routers.value.forEach((router) => {
    for (var item in router.children) {
      if (router.children[item].parentPath === undefined) {
        if (router.path === "/") {
          router.children[item].path = "/" + router.children[item].path;
        } else {
          if (!ishttp(router.children[item].path)) {
            router.children[item].path =
              router.path + "/" + router.children[item].path;
          }
        }
        router.children[item].parentPath = router.path;
      }
      childrenMenus.push(router.children[item]);
    }
  });

  return constantRoutes.concat(childrenMenus);
});

// 默认激活的菜单
const activeMenu = computed(() => {
  const currentRoute = router.currentRoute.value;
  const path = currentRoute.path;
  let activePath = path;
  if (
    path !== undefined &&
    path.lastIndexOf("/") > 0 &&
    hideList.indexOf(path) === -1
  ) {
    const tmpPath = path.substring(1, path.length);
    activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"));
    if (!currentRoute.meta.link) {
      if (!appStore.sidebar.opened) {
        appStore.toggleSideBar(false);
      }
    }
  } else if (!currentRoute.children) {
    activePath = path;
    if (!appStore.sidebar.opened) {
      appStore.toggleSideBar(false);
    }
  }
  activeRoutes(activePath);
  return activePath;
});

// 根据宽度计算设置显示栏数
const setVisibleNumber = () => {
  // 旧的可见菜单数
  const oldVisibleNumber = state.visibleNumber;
  // body宽度 - padding - 左边logo - 右边菜单 - 响应宽度
  const width =
    document.body.getBoundingClientRect().width - 40 - 324 - 390 - 136;
  // 124 为每个li栏宽度
  state.visibleNumber = parseInt(width / 124);

  // 重置菜单左平移
  const moreVisibleNum = state.visibleNumber - oldVisibleNumber;
  if (moreVisibleNum > 0) {
    state.prevNum = state.prevNum - moreVisibleNum;
    if (state.prevNum < 0) {
      state.prevNum = 0;
    }
  }

  // 菜单多余折叠项
  state.nextNum = topMenus.value.length - state.visibleNumber - state.prevNum;
  // 当前选中项
  state.currentIndex = topMenus.value.findIndex(
    (item) => item.path === activeMenu.value
  );

  // 当前选中项菜单被折叠，左侧折叠项++,
  while (state.currentIndex >= state.visibleNumber + state.prevNum) {
    state.prevNum += 1;
  }
};

// 菜单选择事件
const handleSelect = (path, index) => {
  state.currentIndex = index;
  const route = routers.value.find((item) => item.path === path);
  if (ishttp(path)) {
    // http(s):// 路径新窗口打开
    window.open(path, "_blank");
  } else if (!route || !route.children) {
    // 没有子路由路径内部打开
    const routeMenu = childrenMenus.value.find((item) => item.path === path);
    if (routeMenu && routeMenu.query) {
      let query = JSON.parse(routeMenu.query);
      router.push({ path: path, query: query });
    } else {
      router.push({ path: path });
    }
    if (!appStore.sidebar.opened) {
      appStore.toggleSideBar(false);
    }
  } else {
    // 显示左侧联动菜单
    activeRoutes(path, true);
    if (!appStore.sidebar.opened) {
      appStore.toggleSideBar(false);
    }
  }
};

// 当前激活的路由
const activeRoutes = (path, isTopMenu) => {
  var routes = [];
  if (childrenMenus.value && childrenMenus.value.length > 0) {
    childrenMenus.value.forEach((item) => {
      if (path == item.parentPath || (path == "index" && "" == item.path)) {
        routes.push(item);
      }
    });
  }
  if (routes.length > 0) {
    // 一级菜单点击，需要跳转到一级菜单的第一个子菜单
    if (isTopMenu) {
      let pathStr = "";
      let findRoute = routes.find((item) => !item.hidden);
      if (findRoute) {
        // 有三级菜单情况
        if (findRoute.children && findRoute.children.length) {
          let findRouteChild = findRoute.children.find((item) => !item.hidden);
          if (findRouteChild) {
            // 有四级菜单情况
            if (findRouteChild.children && findRouteChild.children.length) {
              let findRouteChildSub = findRouteChild.children.find(
                (item) => !item.hidden
              );
              if (findRouteChildSub) {
                pathStr =
                  findRoute.path +
                  "/" +
                  findRouteChild.path +
                  "/" +
                  findRouteChildSub.path;
              }
            } else {
              pathStr = findRoute.path + "/" + findRouteChild.path;
            }
          }
        } else {
          pathStr = findRoute.path;
        }

        router.push({ path: pathStr });
      }
    }

    permissionStore.setSidebarRouters(routes);
  } else {
    if (!appStore.sidebar.opened) {
      appStore.toggleSideBar(false);
    }
  }
};

const ishttp = (url) => {
  return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
};

const prevNav = () => {
  if (state.prevNum > 0) {
    state.prevNum--;
    state.nextNum++;
    switchNav(-1);
  }
};

const nextNav = () => {
  if (state.nextNum > 0) {
    state.nextNum--;
    state.prevNum++;
    switchNav(1);
  }
};

const switchNav = (num) => {
  const index = state.currentIndex + num;
  const path = topMenus.value[index].path;
  handleSelect(path, index);
};

onBeforeMount(() => {
  window.addEventListener("resize", setVisibleNumber);
});

onMounted(() => {
  setVisibleNumber();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", setVisibleNumber);
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";

.nav-bar {
  width: 100%;
  height: $base-nav-bar-height;
  display: flex;
  align-items: center;

  .nav-btn {
    width: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--topNavColor);

    & > i {
      display: none;
    }
  }
  .nav-btn-show {
    cursor: pointer;
    & > i {
      display: inline-block;
    }
  }
  .nav-btn:hover {
    color: var(--topMenuActiveLine);
  }

  .nav-list-wrapper {
    height: 100%;
    width: calc(100% - 136px);
    overflow: hidden;
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul.nav-list {
    width: max-content;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;

    transition: left 0.3s;

    li {
      min-width: 100px;
      margin-right: 24px;
      height: 100%;
      line-height: 32px;
      border-bottom: 2px solid transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--topNavColor);
      cursor: pointer;
      padding: 0 10px;
    }

    li:hover {
      border-bottom: 2px solid var(--topMenuActiveLine);
      color: var(--topMenuActiveColor);
      background: unset;
      font-weight: 600;
    }

    li.menu-active {
      border-bottom: 2px solid var(--topMenuActiveLine);
      color: var(--topMenuActiveColor);
      background: var(--topMenuActiveBackground);
      font-weight: 600;
    }
  }
}
</style>
