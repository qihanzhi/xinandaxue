<template>
  <div class="skin-color-box">
    <div class="skin-color-box-item skin-color-1" @click.stop="themeChange('#145fff')">
      <i class="iconfont el-icon-arrow-down" v-if="!isUserDefinedTheme && theme === '#145fff'"></i>
    </div>
    <div class="skin-color-box-item skin-color-2" @click.stop="themeChange('#64d655')">
      <i class="iconfont el-icon-arrow-down" v-if="!isUserDefinedTheme && theme === '#64d655'"></i>
    </div>
    <div class="skin-color-box-item skin-color-3" @click.stop="themeChange('#ffbf67')">
      <i class="iconfont el-icon-arrow-down" v-if="!isUserDefinedTheme && theme === '#ffbf67'"></i>
    </div>
    <div class="skin-color-box-item skin-color-4" @click.stop="themeChange('#6779ff')">
      <i class="iconfont el-icon-arrow-down" v-if="!isUserDefinedTheme && theme === '#6779ff'"></i>
    </div>
    <div class="skin-color-box-user">
      <el-tooltip content="自定义" placement="top" effect="light">
        <el-color-picker
          ref="colorPickerRef"
          v-model="userTheme"
          class="theme-picker"
          popper-class="theme-picker-dropdown"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
const ORIGINAL_THEME = "#409EFF"; // default color(此处为element-ui原始主题变量)

export default {
  data() {
    return {
      chalk: "", // content of theme-chalk css
      theme: "",
    };
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme;
    },
    isUserDefinedTheme() {
      return this.$store.state.settings.isUserDefinedTheme;
    },
    userTheme: {
      set(val, oldVal) {
        this.userSetTheme(val);
      },
      get() {
        if (this.isUserDefinedTheme) {
          return this.$store.state.settings.theme;
        }
        return '';
      }
    }
  },
  watch: {
    defaultTheme: {
      handler: function (val, oldVal) {
        this.theme = val;
      },
      immediate: true,
    }
  },
  created() {
    if(this.defaultTheme !== ORIGINAL_THEME) {
      this.setTheme(this.defaultTheme)
    }
  },

  methods: {
    userSetTheme(val) {
      this.setTheme(val);
      this.userDefineTheme(true);
    },
    async setTheme(val) {
      const oldVal = this.chalk ? this.theme : ORIGINAL_THEME
      if (typeof val !== 'string') return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))

      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      if (!this.chalk) {
        // const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        const url = '/styles/element-ui-theme-chalk.min.css';
        await this.getCSSString(url, 'chalk')
      }

      const chalkHandler = getHandler('chalk', 'chalk-style')

      // 此处引入原element-theme样式，会让本地其他样式变化
      chalkHandler()

      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })

      
      styles.forEach(style => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })

      this.$emit("change", val);
    },
    
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    getCSSString(url, variable) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            resolve()
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    },

    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    },

    /* 勾选主题改变 */
    themeChange(val) {
      this.setTheme(val);
      this.userDefineTheme(false);
    },

    // 是否自定义主题
    userDefineTheme(isUser) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'isUserDefinedTheme',
        value: isUser
      })
    }
  },
};
</script>

<style lang="scss" scoped>
/* Element Chalk Variables */
.skin-color-box {
  display: flex;
  margin-right: 16px;

  .skin-color-box-item {
    width: 22px;
    height: 22px;
    border-radius: 4px;
    margin-right: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    

    .el-icon-arrow-down {
      font-size: 12px;
      color:#ffffff;
    }
  }

  .skin-color-1 {
    background-color: #145fff;
  }
  .skin-color-2 {
    background-color: #64d655;
  }
  .skin-color-3 {
    background-color: #ffbf67;
  }
  .skin-color-4 {
    background-color: #6779ff;
  }
}
.skin-color-box-user {
  height: 22px;
  margin-left: 8px;
}

</style>
<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 22px !important;
  width: 22px !important;
  padding: 0;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
