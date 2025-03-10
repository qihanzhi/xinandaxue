<template>
  <div class="login">
    <el-form
      ref="loginRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">本研一体化管理服务平台</h3>
      <el-tabs v-model="identity" type="card" class="demo-tabs">
        <el-tab-pane
          v-for="item in identities"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
          {{ item.content }}
        </el-tab-pane>
      </el-tabs>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix
            ><svg-icon icon-class="user" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix
            ><svg-icon icon-class="password" class="el-input__icon input-icon"
          /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix
            ><svg-icon icon-class="validCode" class="el-input__icon input-icon"
          /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
        >记住密码</el-checkbox
      >
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right" v-if="register">
          <router-link class="link-type" :to="'/register'"
            >立即注册</router-link
          >
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2024 Gok All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUserStore from "@/store/modules/user";
import usePermissionStore from "@/store/modules/permission";
const permissionStore = usePermissionStore();

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const loginForm = ref({
  username: "admin",
  password: "admin123",
  rememberMe: false,
  code: "",
  uuid: "",
});

const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }],
};

const identity = ref("1");
const identities = ref([
  {
    title: "本科生",
    name: "1",
    content: "",
  },
  { title: "研究生教师", name: "2", content: "" },
  { title: "本科教师", name: "3", content: "" },  
  { title: "管理员", name: "6", content: "" },
  { title: "家长", name: "4", content: "" },
  { title: "校友", name: "5", content: "" },
]);
const codeUrl = ref("");
const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(true);
// 注册开关
const register = ref(false);
const redirect = ref(undefined);

watch(
  route,
  (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect;
  },
  { immediate: true }
);

function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 });
        Cookies.set("password", encrypt(loginForm.value.password), {
          expires: 30,
        });
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
      } else {
        // 否则移除
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {
          const query = route.query;
          const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
            if (cur !== "redirect") {
              acc[cur] = query[cur];
            }
            return acc;
          }, {});
          permissionStore.identity = identity.value
          sessionStorage.setItem("menuType", identity.value)
          if (identity.value === "1") {
            router.push({
              path: "/undergraduate/studentIndex" || "/",
              query: otherQueryParams,
            });
          } else if (identity.value === "2") {
            router.push({
              path: "/graduate/studentStatus/info/table" || "/",
              query: otherQueryParams,
            });
          } else if (identity.value === "3") {
            router.push({
              path: "/undergraduate/undergraduateIndex" || "/",
              query: otherQueryParams,
            });
          } else if (identity.value === "6") {
            router.push({
              path: "/undergraduate/manageIndex" || "/",
              query: otherQueryParams,
            });
          } else {
            router.push({
              path: redirect.value || "/",
              query: otherQueryParams,
            });
          }
        })
        .catch(() => {
          loading.value = false;
          // 重新获取验证码
          if (captchaEnabled.value) {
            getCode();
          }
        });
    }
  });
}

function getCode() {
  // getCodeImg().then((res) => {
  let res = {
    "msg": "操作成功",
    "img": "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",
    "code": 200,
    "captchaEnabled": true,
    "uuid": "3c52aee919a0460b88d4ee15a507ff20"
};
    captchaEnabled.value =
      res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.value.uuid = res.uuid;
    }
  // });
}

function getCookie() {
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  const rememberMe = Cookies.get("rememberMe");
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password:
      password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
  };
}

getCode();
getCookie();
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 508px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
