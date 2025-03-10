import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import defAva from '@/assets/images/profile.jpg'

const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: getToken(),
      id: '',
      name: '',
      avatar: '',
      roles: [],
      permissions: []
    }),
    actions: {
      // 登录
      login(userInfo) {
        const username = userInfo.username.trim()
        const password = userInfo.password
        const code = userInfo.code
        const uuid = userInfo.uuid
        return new Promise((resolve, reject) => {
          // login(username, password, code, uuid).then(res => {
            let res = {
              "msg": "操作成功",
              "code": 200,
              "token": "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjJiMGQ4MDc4LTIxMWYtNDM2Yi04Mzc3LTAwNmM3YWRmZWY0NiJ9.HkLyrFn0OzkuG0jgaX3Q9TH_i719I-8V--lWTcpu9XukJMBSMCOct0vlaxpB_7di2sDv5uRqGNDDx_EUFpx1GQ"
          };
            setToken(res.token)
            this.token = res.token
            resolve()
          // }).catch(error => {
          //   reject(error)
          // })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
          // getInfo().then(res => {
            let res = {
              "msg": "操作成功",
              "code": 200,
              "permissions": [
                  "*:*:*"
              ],
              "roles": [
                  "admin"
              ],
              "merchant": null,
              "user": {
                  "createBy": "admin",
                  "createTime": "2024-11-19 00:53:41",
                  "updateBy": null,
                  "updateTime": null,
                  "remark": "管理员",
                  "params": {
                      "@type": "java.util.HashMap"
                  },
                  "userId": 1,
                  "deptId": 103,
                  "userName": "admin",
                  "nickName": "穆德纳",
                  "email": "110@qq.com",
                  "phonenumber": "15309589636",
                  "sex": "0",
                  "avatar": "",
                  "password": "$2a$10$kX1JXFC28.WrCH6aWmN2yOC8us11SkRZUG8cbJ/7mLR8f3FUhBTNm",
                  "status": "0",
                  "delFlag": "0",
                  "loginIp": "39.144.137.207",
                  "loginDate": 1740999430000,
                  "dept": {
                      "createBy": null,
                      "createTime": null,
                      "updateBy": null,
                      "updateTime": null,
                      "remark": null,
                      "params": {
                          "@type": "java.util.HashMap"
                      },
                      "deptId": 103,
                      "parentId": 101,
                      "ancestors": "0,100,101",
                      "deptName": "研发部门",
                      "orderNum": 1,
                      "leader": "若依",
                      "phone": null,
                      "email": null,
                      "status": "0",
                      "delFlag": null,
                      "parentName": null,
                      "children": []
                  },
                  "roles": [
                      {
                          "createBy": null,
                          "createTime": null,
                          "updateBy": null,
                          "updateTime": null,
                          "remark": null,
                          "params": {
                              "@type": "java.util.HashMap"
                          },
                          "roleId": 1,
                          "roleName": "超级管理员",
                          "roleKey": "admin",
                          "roleSort": 1,
                          "dataScope": "1",
                          "menuCheckStrictly": false,
                          "deptCheckStrictly": false,
                          "status": "0",
                          "delFlag": null,
                          "flag": false,
                          "menuIds": null,
                          "deptIds": null,
                          "permissions": null,
                          "admin": true
                      }
                  ],
                  "roleNames": null,
                  "roleIds": null,
                  "postIds": null,
                  "roleId": null,
                  "subMerchantOnly": false,
                  "userType": "00",
                  "merchantId": null,
                  "sonMerchant": false,
                  "admin": true
              }
          }
            const user = res.user
            const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;

            if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.id = user.userId
            this.name = user.userName
            this.avatar = avatar
            resolve(res)
          // }).catch(error => {
          //   reject(error)
          // })
        })
      },
      // 退出系统
      logOut() {
        return new Promise((resolve, reject) => {
          // logout(this.token).then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          // }).catch(error => {
          //   reject(error)
          // })
        })
      }
    }
  })

export default useUserStore
