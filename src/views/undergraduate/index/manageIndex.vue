<template>
    <div class="flex-con">
      <VueDraggable
        class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
        v-model="list1"
        animation="150"
        ghostClass="ghost"
        group="people"
        @update="onUpdate"
        @add="onAdd"
        @remove="remove"
      >
        <div
          v-for="item in list1"
          :key="item.id"
          class="cursor-move h-30 bg-gray-500/5 rounded p-3"
        >
          <div class="con" v-if="item.name === '通知公告'">
            <Title
              :title="item.name"
              :link="'hospitalNews'"
              :tagId="item.id"
              direction="space-between"
            >
            </Title>
            <HomeCardList
              :tagId="item.id"
              :data="data[item.id]"
              :img="
                data[item.id].list && data[item.id].list.length > 0
                  ? data[item.id].list[0].img
                  : ''
              "
              :imgShow="true"
            ></HomeCardList>
          </div>
          <div class="con" v-if="item.name === '待审批'">
            <Title
              :title="item.name"
              :link="'hospitalNews'"
              :tagId="item.id"
              direction="space-between"
            >
            </Title>
            <HomeCardList
              :tagId="item.id"
              :data="data[item.id]"
              :img="
                data[item.id].list && data[item.id].list.length > 0
                  ? data[item.id].list[0].img
                  : ''
              "
              :imgShow="true"
            ></HomeCardList>
          </div>
          <div class="con" v-if="item.name === '各学院培养方案进度'">
            <Title
              :title="item.name"
              :link="'hospitalNews'"
              :tagId="item.id"
              direction="space-between"
            >
            </Title>
            <CourseProgress />
          </div>
          <div class="con" v-if="item.name === '异常学生管理'">
            <Title
              :title="item.name"
              :link="'hospitalNews'"
              :tagId="item.id"
              direction="space-between"
            >
            </Title>
            <AbnormalStudentMange />
          </div>
        </div>
      </VueDraggable>
      <VueDraggable
        class="flex flex-col gap-2 p-4 w-300px h-300px m-auto bg-gray-500/5 rounded overflow-auto"
        v-model="list2"
        animation="150"
        group="people"
        ghostClass="ghost"
        @update="onUpdate"
        @add="onAdd"
        @remove="remove"
      >
        <div
          v-for="item in list2"
          :key="item.id"
          class="cursor-move h-30 bg-gray-500/5 rounded p-3"
        >
          <div class="con" v-if="item.name === '通知公告'">
            <Title
              :title="item.name"
              :link="'hospitalNews'"
              :tagId="item.id"
              direction="space-between"
            >
            </Title>
            <HomeCardList
              :tagId="item.id"
              :data="data[item.id]"
              :img="
                data[item.id].list && data[item.id].list.length > 0
                  ? data[item.id].list[0].img
                  : ''
              "
              :imgShow="true"
            ></HomeCardList>
          </div>
          <div class="con" v-if="item.name === '待审批'">
            <Title
              :title="item.name"
              :link="'hospitalNews'"
              :tagId="item.id"
              direction="space-between"
            >
            </Title>
            <HomeCardList
              :tagId="item.id"
              :data="data[item.id]"
              :img="
                data[item.id].list && data[item.id].list.length > 0
                  ? data[item.id].list[0].img
                  : ''
              "
              :imgShow="true"
            ></HomeCardList>
          </div>
          <div class="con" v-if="item.name === '各学院培养方案进度'">
            <Title
              :title="item.name"
              :link="'hospitalNews'"
              :tagId="item.id"
              direction="space-between"
            >
            </Title>
            <CourseProgress />
          </div>
          <div class="con" v-if="item.name === '异常学生管理'">
            <Title
              :title="item.name"
              :link="'hospitalNews'"
              :tagId="item.id"
              direction="space-between"
            >
            </Title>
            <AbnormalStudentMange />
          </div>
        </div>
      </VueDraggable>
    </div>
    <div class="flex justify-between">
      <preview-list :list="list1" />
      <preview-list :list="list2" />
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import { VueDraggable } from "vue-draggable-plus";
  import HomeCardList from "@/components/undergraduate/HomeCardList.vue";
  import Title from "@/components/undergraduate/Title.vue";
  import CourseProgress from "@/components/undergraduate/CourseProgress.vue";
  import AbnormalStudentMange from "@/components/undergraduate/AbnormalStudentMange.vue";
  
  import menu_01 from "@/assets/images/aside_menu/menu_01.png";
  import menu_02 from "@/assets/images/aside_menu/menu_02.png";
  import menu_03 from "@/assets/images/aside_menu/menu_03.png";
  import menu_04 from "@/assets/images/aside_menu/menu_04.png";
  const data = ref({
    0: {
      list: [
      {
          id: "1",
          title: "工程材料与结构冲击振动四川省重点实验室关于发布2024年开放基金项目指南的通知。",
          sonTitle: "1",
          img: menu_01,
          createTime: "2024/11/24",
        },
        {
          id: "2",
          title: "核环境安全技术创新中心2024年度开放基金项目申请指南。",
          sonTitle: "1",
          img: menu_02,
          createTime: "2024/11/24",
        },
        {
          id: "3",
          title: "西南科技大学诚邀全球英才参加中国（绵阳）科技城人才活动。",
          sonTitle: "1",
          img: menu_03,
          createTime: "2024/11/24",
        },
        {
          id: "4",
          title: "乐嘉陵航空航天交叉学科拔尖创新人才班2024年招生简章",
          sonTitle: "1",
          img: menu_04,
          createTime: "2024/11/24",
        },
      ],
    },
    1: {
      list: [
      {
          id: "1",
          title: "调停补课-申请《线性代数》调课。",
          sonTitle: "1",
          img: menu_02,
          createTime: "2024/11/24",
        },
        {
          id: "2",
          title: "教材审核-文学院申请《语言学概论》。",
          sonTitle: "1",
          img: menu_01,
          createTime: "2024/11/24",
        },
        {
          id: "3",
          title: "通识选修课审核-工程学院申请开课《结构力学》。",
          sonTitle: "1",
          img: menu_03,
          createTime: "2024/11/24",
        },
        {
          id: "4",
          title: "培养方案审核-生化学院已提交专业培养方案。",
          sonTitle: "1",
          img: menu_04,
          createTime: "2024/11/24",
        },
      ],
    },
    2: {
      list: [
        {
          id: "1",
          title: "《微观经济学》成绩录入距离截至日期还有8天。",
          sonTitle: "1",
          img: "",
          createTime: "2024/11/24",
        },
        {
          id: "2",
          title: "《数学分析》期末考试还有8天。",
          sonTitle: "1",
          img: "",
          createTime: "2024/11/24",
        },
        {
          id: "3",
          title: "张芳徐于周二8：00-8：45《线性代数》旷课。",
          sonTitle: "1",
          img: "",
          createTime: "2024/11/24",
        },
        {
          id: "4",
          title: "本周六（2024.11.30）下午17：00在一号楼301举行主题班会。",
          sonTitle: "1",
          img: "",
          createTime: "2024/11/24",
        },
      ],
    },
    3: {
      list: [
        {
          id: "1",
          title: "《微观经济学》成绩录入距离截至日期还有8天。",
          sonTitle: "1",
          img: "",
          createTime: "2024/11/24",
        },
        {
          id: "2",
          title: "《数学分析》期末考试还有8天。",
          sonTitle: "1",
          img: "",
          createTime: "2024/11/24",
        },
        {
          id: "3",
          title: "张芳徐于周二8：00-8：45《线性代数》旷课。",
          sonTitle: "1",
          img: "",
          createTime: "2024/11/24",
        },
        {
          id: "4",
          title: "本周六（2024.11.30）下午17：00在一号楼301举行主题班会。",
          sonTitle: "1",
          img: "",
          createTime: "2024/11/24",
        },
      ],
    },
  });
  const list1 = ref([
    {
      name: "通知公告",
      id: 0,
    },
    {
      name: "各学院培养方案进度",
      id: 2,
    },
  ]);
  const list2 = ref([
    {
      name: "待审批",
      id: 1,
    },
    {
      name: "异常学生管理",
      id: 3,
    },
  ]);
  function onUpdate() {
    console.log("update");
  }
  function onAdd() {
    console.log("add");
  }
  function remove() {
    console.log("remove");
  }
  </script>
  <style lang="scss" scoped>
  .flex-con {
    display: flex;
  }
  .flex-col {
    width: 50%;
  }
  .con {
    padding: 20px;
  }
  </style>
  