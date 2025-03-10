import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'
import variables from "@/assets/styles/variables.module.scss";

const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''

const useSettingsStore = defineStore(
  'settings',
  {
    state: () => ({
      title: '',
      theme: storageSetting.theme || '#145fff',
      isUserDefinedTheme: storageSetting.isUserDefinedTheme || false,
      sideTheme: storageSetting.sideTheme || sideTheme,
      showSettings: showSettings,
      topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
      tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
      fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
      sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
      dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
      variables: variables
    }),
    getters: {
      /* 主题切换的样式 */
      menuColor(state) {
        let value = "";
        switch (state.sideTheme) {
          case "theme-light":
            value = state.variables.menuLightColor;
            break;
          case "theme-sky-blue":
            value = state.variables.menuSkyBlueColor;
            break;
          case "theme-pine-green":
            value = state.variables.menuPineGreenColor;
            break;
          default:
            value = state.variables.menuColor;
            break;
        }

        return value;
      },
      menuBackground(state) {
        let value = "";
        switch (state.sideTheme) {
          case "theme-light":
            value = state.variables.menuLightBackground;
            break;
          case "theme-sky-blue":
            value = state.variables.menuSkyBlueBackground;
            break;
          case "theme-pine-green":
            value = state.variables.menuPineGreenBackground;
            break;
          default:
            value = state.variables.menuBackground;
            break;
        }

        return value;
      },
      topNavColor(state) {
        let value = "";
        switch (state.sideTheme) {
          case "theme-light":
            value = state.variables.topNavLightColor;
            break;
          case "theme-sky-blue":
            value = state.variables.topNavSkyBlueColor;
            break;
          case "theme-pine-green":
            value = state.variables.topNavPineGreenColor;
            break;
          default:
            value = state.variables.topNavColor;
            break;
        }

        return value;
      },
      topMenuActiveColor(state) {
        let value = "";
        switch (state.sideTheme) {
          case "theme-light":
            value = state.variables.topMenuLightActiveColor;
            break;
          case "theme-sky-blue":
            value = state.variables.topMenuSkyBlueActiveColor;
            break;
          case "theme-pine-green":
            value = state.variables.topMenuPineGreenActiveColor;
            break;
          default:
            value = state.variables.topMenuActiveColor;
            break;
        }

        return value;
      },
      topMenuActiveLine(state) {
        let value = "";
        switch (state.sideTheme) {
          case "theme-light":
            value = state.variables.topMenuLightActiveLine;
            break;
          case "theme-sky-blue":
            value = state.variables.topMenuSkyBlueActiveLine;
            break;
          case "theme-pine-green":
            value = state.variables.topMenuPineGreenActiveLine;
            break;
          default:
            value = state.variables.topMenuActiveLine;
            break;
        }

        return value;
      },
      topMenuActiveBackground(state) {
        let value = "";
        switch (state.sideTheme) {
          case "theme-light":
            value = state.variables.topMenuLightActiveBackground;
            break;
          case "theme-sky-blue":
            value = state.variables.topMenuSkyBlueActiveBackground;
            break;
          case "theme-pine-green":
            value = state.variables.topMenuPineGreenActiveBackground;
            break;
          default:
            value = state.variables.topMenuActiveBackground;
            break;
        }

        return value;
      },
      wrapperBackground(state) {
        let value = "";
        switch (state.sideTheme) {
          case "theme-light":
            value = state.variables.wrapperLightBackground;
            break;
          case "theme-sky-blue":
            value = state.variables.wrapperSkyBlueBackground;
            break;
          case "theme-pine-green":
            value = state.variables.wrapperPineGreenBackground;
            break;
          default:
            value = state.variables.wrapperBackground;
            break;
        }

        return value;
      },
      topMenuInputBackground(state) {
        let value = "";
        switch (state.sideTheme) {
          case "theme-light":
            value = state.variables.topMenuInputLightBackground;
            break;
          case "theme-sky-blue":
            value = state.variables.topMenuInputSkyBlueBackground;
            break;
          case "theme-pine-green":
            value = state.variables.topMenuInputPineGreenBackground;
            break;
          default:
            value = state.variables.topMenuInputBackground;
            break;
        }

        return value;
      },
    },
    actions: {
      // 修改布局设置
      changeSetting(data) {
        const { key, value } = data
        if (this.hasOwnProperty(key)) {
          this[key] = value
        }
      },
      // 设置网页标题
      setTitle(title) {
        this.title = title
        useDynamicTitle();
      }
    }
  })

export default useSettingsStore
