<template>
   <div class="app-container">
      <el-row :gutter="20">
         <el-col :span="6" :xs="24">
            <el-card class="box-card">
               <template v-slot:header>
                 <div class="clearfix">
                   <span>个人信息</span>
                 </div>
               </template>
               <div>
                  <div class="text-center">
                     <userAvatar />
                  </div>
                  <ul class="list-group list-group-striped">
                     <li class="list-group-item">
                        <svg-icon icon-class="user" />用户名称
                        <div class="pull-right">{{ state.user.userName }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="phone" />手机号码
                        <div class="pull-right">{{ state.user.phonenumber }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="email" />用户邮箱
                        <div class="pull-right">{{ state.user.email }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="tree" />所属部门
                        <div class="pull-right" v-if="state.user.dept">{{ state.user.dept.deptName }} / {{ state.postGroup }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="peoples" />所属角色
                        <div class="pull-right">{{ state.roleGroup }}</div>
                     </li>
                     <li class="list-group-item">
                        <svg-icon icon-class="date" />创建日期
                        <div class="pull-right">{{ state.user.createTime }}</div>
                     </li>
                  </ul>
               </div>
            </el-card>
         </el-col>
         <el-col :span="18" :xs="24">
            <el-card>
               <template v-slot:header>
                 <div class="clearfix">
                   <span>基本资料</span>
                 </div>
               </template>
               <el-tabs v-model="activeTab">
                  <el-tab-pane label="基本资料" name="userinfo">
                     <userInfo :user="state.user" />
                  </el-tab-pane>
                  <el-tab-pane label="修改密码" name="resetPwd">
                     <resetPwd />
                  </el-tab-pane>
               </el-tabs>
            </el-card>
         </el-col>
      </el-row>
   </div>
</template>

<script setup name="Profile">
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";
import { getUserProfile } from "@/api/system/user";

const activeTab = ref("userinfo");
const state = reactive({
  user: {},
  roleGroup: {},
  postGroup: {}
});

function getUser() {
//   getUserProfile().then(response => {
let response = {
    "msg": "操作成功",
    "postGroup": "组长",
    "code": 200,
    "data": {
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
        "nickName": "詹主任",
        "email": "110@qq.com",
        "phonenumber": "15309589636",
        "sex": "0",
        "avatar": "/profile/avatar/2025/02/10/person_circle_fill_20250210095255A001.png",
        "password": "$2a$10$kX1JXFC28.WrCH6aWmN2yOC8us11SkRZUG8cbJ/7mLR8f3FUhBTNm",
        "status": "0",
        "delFlag": "0",
        "loginIp": "118.112.58.34",
        "loginDate": 1741140775000,
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
            "deptName": "科研组",
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
    },
    "roleGroup": "超级管理员"
}
    state.user = response.data;
    state.roleGroup = response.roleGroup;
    state.postGroup = response.postGroup;
//   });
};

getUser();
</script>
