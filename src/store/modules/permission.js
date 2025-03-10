import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
  'permission',
  {
    state: () => ({
      identity: '1',
      routes: [],
      addRoutes: [],
      defaultRoutes: [],
      topbarRouters: [],
      sidebarRouters: []
    }),
    actions: {
      setRoutes(routes) {
        this.addRoutes = routes
        this.routes = constantRoutes.concat(routes)
      },
      setDefaultRoutes(routes) {
        this.defaultRoutes = constantRoutes.concat(routes)
      },
      setTopbarRoutes(routes) {
        this.topbarRouters = routes
      },
      setSidebarRouters(routes) {
        this.sidebarRouters = routes
      },
      generateRoutes(roles) {
        return new Promise(resolve => {
          // 向后端请求路由数据
          // getRouters().then(res => {
            let res = {
              "msg": "操作成功",
              "code": 200,
              "data": [
                  {
                      "name": "Undergraduate",
                      "path": "/undergraduate",
                      "hidden": false,
                      "redirect": "noRedirect",
                      "component": "Layout",
                      "alwaysShow": true,
                      "meta": {
                          "title": "本科教务管理系统",
                          "icon": "education",
                          "noCache": false,
                          "link": null
                      },
                      "children": [
                          {
                              "name": "UndergraduateIndex",
                              "path": "undergraduateIndex",
                              "hidden": false,
                              "component": "undergraduate/index/index",
                              "meta": {
                                  "title": "首页",
                                  "icon": "build",
                                  "noCache": false,
                                  "link": null
                              }
                          },
                          {
                              "name": "ManageIndex",
                              "path": "manageIndex",
                              "hidden": true,
                              "component": "undergraduate/index/manageIndex",
                              "meta": {
                                  "title": "管理员首页",
                                  "icon": "build",
                                  "noCache": false,
                                  "link": null
                              }
                          },
                          {
                              "name": "StudentIndex",
                              "path": "studentIndex",
                              "hidden": true,
                              "component": "undergraduate/index/studentIndex",
                              "meta": {
                                  "title": "学生首页",
                                  "icon": "build",
                                  "noCache": false,
                                  "link": null
                              }
                          },
                          {
                              "name": "Teach",
                              "path": "teach",
                              "hidden": false,
                              "redirect": "noRedirect",
                              "component": "ParentView",
                              "alwaysShow": true,
                              "meta": {
                                  "title": "教学任务管理",
                                  "icon": "education",
                                  "noCache": false,
                                  "link": null
                              },
                              "children": [
                                  {
                                      "name": "FormulationDetail",
                                      "path": "formulationDetail",
                                      "hidden": true,
                                      "component": "undergraduate/teach/formulationDetail",
                                      "meta": {
                                          "title": "方案详情",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Formulation",
                                      "path": "formulation",
                                      "hidden": false,
                                      "component": "undergraduate/teach/formulation",
                                      "meta": {
                                          "title": "方案制定",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Task",
                                      "path": "task",
                                      "hidden": false,
                                      "component": "undergraduate/teach/task",
                                      "meta": {
                                          "title": "教学任务填报",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  }
                              ]
                          },
                          {
                              "name": "Schedule",
                              "path": "schedule",
                              "hidden": false,
                              "redirect": "noRedirect",
                              "component": "ParentView",
                              "alwaysShow": true,
                              "meta": {
                                  "title": "排课",
                                  "icon": "date",
                                  "noCache": false,
                                  "link": null
                              },
                              "children": [
                                  {
                                      "name": "Items",
                                      "path": "items",
                                      "hidden": false,
                                      "component": "undergraduate/schedule/items",
                                      "meta": {
                                          "title": "排课检查项",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Aischedule",
                                      "path": "aischedule",
                                      "hidden": false,
                                      "component": "undergraduate/schedule/aischedule",
                                      "meta": {
                                          "title": "智能排课",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  }
                              ]
                          },
                          {
                              "name": "Tutoring",
                              "path": "tutoring",
                              "hidden": false,
                              "redirect": "noRedirect",
                              "component": "ParentView",
                              "alwaysShow": true,
                              "meta": {
                                  "title": "调停补课",
                                  "icon": "date-range",
                                  "noCache": false,
                                  "link": null
                              },
                              "children": [
                                  {
                                      "name": "TutoringAttr",
                                      "path": "tutoringAttr",
                                      "hidden": false,
                                      "component": "undergraduate/tutoring/attr",
                                      "meta": {
                                          "title": "参数设置",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "TutoringItems",
                                      "path": "tutoringItems",
                                      "hidden": false,
                                      "component": "undergraduate/tutoring/items",
                                      "meta": {
                                          "title": "检查项",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "TutoringProgress",
                                      "path": "tutoringProgress",
                                      "hidden": false,
                                      "component": "undergraduate/tutoring/progress",
                                      "meta": {
                                          "title": "流程管理",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "TutoringApply",
                                      "path": "tutoringApply",
                                      "hidden": false,
                                      "component": "undergraduate/tutoring/apply",
                                      "meta": {
                                          "title": "申请调停补课",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  }
                              ]
                          },
                          {
                              "name": "Score",
                              "path": "score",
                              "hidden": false,
                              "redirect": "noRedirect",
                              "component": "ParentView",
                              "alwaysShow": true,
                              "meta": {
                                  "title": "成绩管理",
                                  "icon": "skill",
                                  "noCache": false,
                                  "link": null
                              },
                              "children": [
                                  {
                                      "name": "Attr",
                                      "path": "attr",
                                      "hidden": false,
                                      "component": "undergraduate/score/attr",
                                      "meta": {
                                          "title": "参数设置",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "ScoreItems",
                                      "path": "scoreItems",
                                      "hidden": false,
                                      "component": "undergraduate/score/items",
                                      "meta": {
                                          "title": "成绩检查项",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "ScoreScore",
                                      "path": "scoreScore",
                                      "hidden": false,
                                      "component": "undergraduate/score/score",
                                      "meta": {
                                          "title": "成绩",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "name": "Monitor",
                      "path": "/monitor",
                      "hidden": true,
                      "redirect": "noRedirect",
                      "component": "Layout",
                      "alwaysShow": true,
                      "meta": {
                          "title": "系统监控",
                          "icon": "monitor",
                          "noCache": false,
                          "link": null
                      },
                      "children": [
                          {
                              "name": "Online",
                              "path": "online",
                              "hidden": false,
                              "component": "monitor/online/index",
                              "meta": {
                                  "title": "在线用户",
                                  "icon": "online",
                                  "noCache": false,
                                  "link": null
                              }
                          },
                          {
                              "name": "Job",
                              "path": "job",
                              "hidden": false,
                              "component": "monitor/job/index",
                              "meta": {
                                  "title": "定时任务",
                                  "icon": "job",
                                  "noCache": false,
                                  "link": null
                              }
                          },
                          {
                              "name": "Druid",
                              "path": "druid",
                              "hidden": false,
                              "component": "monitor/druid/index",
                              "meta": {
                                  "title": "数据监控",
                                  "icon": "druid",
                                  "noCache": false,
                                  "link": null
                              }
                          },
                          {
                              "name": "Server",
                              "path": "server",
                              "hidden": false,
                              "component": "monitor/server/index",
                              "meta": {
                                  "title": "服务监控",
                                  "icon": "server",
                                  "noCache": false,
                                  "link": null
                              }
                          },
                          {
                              "name": "Cache",
                              "path": "cache",
                              "hidden": false,
                              "component": "monitor/cache/index",
                              "meta": {
                                  "title": "缓存监控",
                                  "icon": "redis",
                                  "noCache": false,
                                  "link": null
                              }
                          },
                          {
                              "name": "CacheList",
                              "path": "cacheList",
                              "hidden": false,
                              "component": "monitor/cache/list",
                              "meta": {
                                  "title": "缓存列表",
                                  "icon": "redis-list",
                                  "noCache": false,
                                  "link": null
                              }
                          }
                      ]
                  },
                  {
                      "name": "Graduate",
                      "path": "/graduate",
                      "hidden": false,
                      "redirect": "noRedirect",
                      "component": "Layout",
                      "alwaysShow": true,
                      "meta": {
                          "title": "研究生管理系统",
                          "icon": "excel",
                          "noCache": false,
                          "link": null
                      },
                      "children": [
                          {
                              "name": "StudentStatus",
                              "path": "studentStatus",
                              "hidden": false,
                              "redirect": "noRedirect",
                              "component": "graduate/studentStatus/index",
                              "alwaysShow": true,
                              "meta": {
                                  "title": "研究生学籍管理",
                                  "icon": "redis",
                                  "noCache": false,
                                  "link": null
                              },
                              "children": [
                                  {
                                      "name": "Info",
                                      "path": "info",
                                      "hidden": false,
                                      "redirect": "noRedirect",
                                      "component": "graduate/studentStatus/info/index",
                                      "alwaysShow": true,
                                      "meta": {
                                          "title": "学籍信息管理",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      },
                                      "children": [
                                          {
                                              "name": "Table",
                                              "path": "table",
                                              "hidden": false,
                                              "component": "graduate/studentStatus/info/table/index",
                                              "meta": {
                                                  "title": "学籍信息",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          },
                                          {
                                              "name": "Permission",
                                              "path": "permission",
                                              "hidden": false,
                                              "component": "graduate/studentStatus/info/permission/index",
                                              "meta": {
                                                  "title": "权限设置",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          },
                                          {
                                              "name": "Label",
                                              "path": "label",
                                              "hidden": false,
                                              "component": "graduate/studentStatus/info/label/index",
                                              "meta": {
                                                  "title": "标签设置",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          }
                                      ]
                                  },
                                  {
                                      "name": "Modify",
                                      "path": "modify",
                                      "hidden": false,
                                      "redirect": "noRedirect",
                                      "component": "ParentView",
                                      "alwaysShow": true,
                                      "meta": {
                                          "title": "学籍变动管理",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      },
                                      "children": [
                                          {
                                              "name": "Apply1",
                                              "path": "apply1",
                                              "hidden": false,
                                              "component": "graduate/studentStatus/modify/apply/index",
                                              "meta": {
                                                  "title": "学籍变动申请",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          },
                                          {
                                              "name": "Check1",
                                              "path": "check1",
                                              "hidden": false,
                                              "component": "graduate/studentStatus/modify/check/index",
                                              "meta": {
                                                  "title": "学籍变动审核",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          },
                                          {
                                              "name": "Modify1",
                                              "path": "modify1",
                                              "hidden": false,
                                              "component": "graduate/studentStatus/modify/table/index",
                                              "meta": {
                                                  "title": "学籍变动管理",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          }
                                      ]
                                  },
                                  {
                                      "name": "EduStatistics",
                                      "path": "eduStatistics",
                                      "hidden": false,
                                      "redirect": "noRedirect",
                                      "component": "ParentView",
                                      "alwaysShow": true,
                                      "meta": {
                                          "title": "教育综合统计",
                                          "icon": "chart",
                                          "noCache": false,
                                          "link": null
                                      },
                                      "children": [
                                          {
                                              "name": "ReportTable",
                                              "path": "reportTable",
                                              "hidden": false,
                                              "component": "graduate/studentStatus/eduStatistics/reportTable/index",
                                              "meta": {
                                                  "title": "报表统计",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          },
                                          {
                                              "name": "EduSetting",
                                              "path": "eduSetting",
                                              "hidden": false,
                                              "component": "graduate/studentStatus/eduStatistics/setting/index",
                                              "meta": {
                                                  "title": "统计设置",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "name": "Cultivate",
                              "path": "cultivate",
                              "hidden": false,
                              "redirect": "noRedirect",
                              "component": "graduate/cultivate/index",
                              "alwaysShow": true,
                              "meta": {
                                  "title": "研究生培养管理",
                                  "icon": "clipboard",
                                  "noCache": false,
                                  "link": null
                              },
                              "children": [
                                  {
                                      "name": "Program",
                                      "path": "program",
                                      "hidden": false,
                                      "redirect": "noRedirect",
                                      "component": "ParentView",
                                      "alwaysShow": true,
                                      "meta": {
                                          "title": "培养方案",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      },
                                      "children": [
                                          {
                                              "name": "Template",
                                              "path": "template",
                                              "hidden": false,
                                              "component": "graduate/cultivate/program/template/index",
                                              "meta": {
                                                  "title": "方案模版设置",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          }
                                      ]
                                  },
                                  {
                                      "name": "CourseArrange",
                                      "path": "courseArrange",
                                      "hidden": false,
                                      "redirect": "noRedirect",
                                      "component": "ParentView",
                                      "alwaysShow": true,
                                      "meta": {
                                          "title": "排课管理",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      },
                                      "children": [
                                          {
                                              "name": "Calendar",
                                              "path": "calendar",
                                              "hidden": false,
                                              "component": "graduate/cultivate/courseArrange/calendar/index",
                                              "meta": {
                                                  "title": "校历设置",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          },
                                          {
                                              "name": "Arrange",
                                              "path": "arrange",
                                              "hidden": false,
                                              "component": "graduate/cultivate/courseArrange/arrange/index",
                                              "meta": {
                                                  "title": "排课",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          }
                                      ]
                                  },
                                  {
                                      "name": "AdjustClasses",
                                      "path": "adjustClasses",
                                      "hidden": false,
                                      "redirect": "noRedirect",
                                      "component": "ParentView",
                                      "alwaysShow": true,
                                      "meta": {
                                          "title": "调停补课",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      },
                                      "children": [
                                          {
                                              "name": "AdjustClassesApply",
                                              "path": "adjustClassesApply",
                                              "hidden": false,
                                              "component": "graduate/cultivate/adjustClasses/apply/apply",
                                              "meta": {
                                                  "title": "调停补课申请",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          },
                                          {
                                              "name": "Attrsetting",
                                              "path": "attrsetting",
                                              "hidden": false,
                                              "component": "graduate/cultivate/adjustClasses/apply/attr",
                                              "meta": {
                                                  "title": "参数设置",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          }
                                      ]
                                  },
                                  {
                                      "name": "TeachEvaluate",
                                      "path": "teachEvaluate",
                                      "hidden": false,
                                      "redirect": "noRedirect",
                                      "component": "ParentView",
                                      "alwaysShow": true,
                                      "meta": {
                                          "title": "教学评教",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      },
                                      "children": [
                                          {
                                              "name": "QuestSurvery",
                                              "path": "questSurvery",
                                              "hidden": false,
                                              "component": "graduate/cultivate/teachEvaluate/questSurvery/index",
                                              "meta": {
                                                  "title": "问卷调查",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          }
                                      ]
                                  },
                                  {
                                      "name": "Achievement",
                                      "path": "achievement",
                                      "hidden": false,
                                      "redirect": "noRedirect",
                                      "component": "ParentView",
                                      "alwaysShow": true,
                                      "meta": {
                                          "title": "成绩管理",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      },
                                      "children": [
                                          {
                                              "name": "Achieve",
                                              "path": "achieve",
                                              "hidden": false,
                                              "component": "graduate/cultivate/achievement/attr",
                                              "meta": {
                                                  "title": "设置授权",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          },
                                          {
                                              "name": "Score",
                                              "path": "score",
                                              "hidden": false,
                                              "component": "graduate/cultivate/achievement/score",
                                              "meta": {
                                                  "title": "成绩录入",
                                                  "icon": "#",
                                                  "noCache": false,
                                                  "link": null
                                              }
                                          }
                                      ]
                                  }
                              ]
                          },
                          {
                              "name": "Degree",
                              "path": "degree",
                              "hidden": false,
                              "redirect": "noRedirect",
                              "component": "graduate/degree/index",
                              "alwaysShow": true,
                              "meta": {
                                  "title": "研究生学位管理",
                                  "icon": "druid",
                                  "noCache": false,
                                  "link": null
                              },
                              "children": [
                                  {
                                      "name": "Setting3",
                                      "path": "setting3",
                                      "hidden": false,
                                      "component": "graduate/degree/setting/index",
                                      "meta": {
                                          "title": "论文信息设置",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Checkup",
                                      "path": "checkup",
                                      "hidden": false,
                                      "component": "graduate/degree/checkup/index",
                                      "meta": {
                                          "title": "匿名检测",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Poster",
                                      "path": "poster",
                                      "hidden": false,
                                      "component": "graduate/degree/poster/index",
                                      "meta": {
                                          "title": "答辩海报",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Reply",
                                      "path": "reply",
                                      "hidden": false,
                                      "component": "graduate/degree/reply/index",
                                      "meta": {
                                          "title": "答辩结果",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  }
                              ]
                          },
                          {
                              "name": "Student",
                              "path": "student",
                              "hidden": false,
                              "redirect": "noRedirect",
                              "component": "ParentView",
                              "alwaysShow": true,
                              "meta": {
                                  "title": "研究生学生管理",
                                  "icon": "people",
                                  "noCache": false,
                                  "link": null
                              },
                              "children": [
                                  {
                                      "name": "Coach",
                                      "path": "coach",
                                      "hidden": false,
                                      "component": "graduate/student/coach/index",
                                      "meta": {
                                          "title": "辅导员管理",
                                          "icon": "#",
                                          "noCache": true,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Absent",
                                      "path": "absent",
                                      "hidden": false,
                                      "component": "graduate/student/absent/index",
                                      "meta": {
                                          "title": "请销假管理",
                                          "icon": "#",
                                          "noCache": true,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Stay",
                                      "path": "stay",
                                      "hidden": false,
                                      "component": "graduate/student/stay/index",
                                      "meta": {
                                          "title": "留校审批",
                                          "icon": "#",
                                          "noCache": true,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Flow1",
                                      "path": "flow1",
                                      "hidden": false,
                                      "component": "graduate/student/flow/index",
                                      "meta": {
                                          "title": "流程管理",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  }
                              ]
                          },
                          {
                              "name": "OnlineMeeting",
                              "path": "onlineMeeting",
                              "hidden": false,
                              "redirect": "noRedirect",
                              "component": "graduate/onlineMeeting/index",
                              "alwaysShow": true,
                              "meta": {
                                  "title": "在线会议",
                                  "icon": "upload",
                                  "noCache": false,
                                  "link": null
                              },
                              "children": [
                                  {
                                      "name": "JointTraial",
                                      "path": "jointTraial",
                                      "hidden": false,
                                      "component": "graduate/onlineMeeting/jointTraial/index",
                                      "meta": {
                                          "title": "学位会审",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Vote",
                                      "path": "vote",
                                      "hidden": false,
                                      "component": "graduate/onlineMeeting/vote/index",
                                      "meta": {
                                          "title": "优博论文评选",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  },
                                  {
                                      "name": "Mentor",
                                      "path": "mentor",
                                      "hidden": false,
                                      "component": "graduate/onlineMeeting/mentor/index",
                                      "meta": {
                                          "title": "导师遴选",
                                          "icon": "#",
                                          "noCache": false,
                                          "link": null
                                      }
                                  }
                              ]
                          }
                      ]
                  }            
              ]
          }
          if (sessionStorage.getItem("menuType") === '1') {// 本科生
            res = {
                "msg": "操作成功",
                "code": 200,
                "data": [
                    {
                        "name": "Undergraduate",
                        "path": "/undergraduate",
                        "hidden": false,
                        "redirect": "noRedirect",
                        "component": "Layout",
                        "alwaysShow": true,
                        "meta": {
                            "title": "本科教务管理系统",
                            "icon": "education",
                            "noCache": false,
                            "link": null
                        },
                        "children": [
                            {
                                "name": "StudentIndex",
                                "path": "studentIndex",
                                "hidden": false,
                                "component": "undergraduate/index/studentIndex",
                                "meta": {
                                    "title": "学生首页",
                                    "icon": "build",
                                    "noCache": false,
                                    "link": null
                                }
                            }
                        ]
                    }         
                ]
            };
          } else if (sessionStorage.getItem("menuType") === '2') {// 研究生教师
            res = {
                "msg": "操作成功",
                "code": 200,
                "data": [                    
                    {
                        "name": "Graduate",
                        "path": "/graduate",
                        "hidden": false,
                        "redirect": "noRedirect",
                        "component": "Layout",
                        "alwaysShow": true,
                        "meta": {
                            "title": "研究生管理系统",
                            "icon": "excel",
                            "noCache": false,
                            "link": null
                        },
                        "children": [
                            {
                                "name": "StudentStatus",
                                "path": "studentStatus",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "graduate/studentStatus/index",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "研究生学籍管理",
                                    "icon": "redis",
                                    "noCache": false,
                                    "link": null
                                },
                                "children": [
                                    {
                                        "name": "Info",
                                        "path": "info",
                                        "hidden": false,
                                        "redirect": "noRedirect",
                                        "component": "graduate/studentStatus/info/index",
                                        "alwaysShow": true,
                                        "meta": {
                                            "title": "学籍信息管理",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        },
                                        "children": [
                                            {
                                                "name": "Table",
                                                "path": "table",
                                                "hidden": false,
                                                "component": "graduate/studentStatus/info/table/index",
                                                "meta": {
                                                    "title": "学籍信息",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            },
                                            {
                                                "name": "Permission",
                                                "path": "permission",
                                                "hidden": false,
                                                "component": "graduate/studentStatus/info/permission/index",
                                                "meta": {
                                                    "title": "权限设置",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            },
                                            {
                                                "name": "Label",
                                                "path": "label",
                                                "hidden": false,
                                                "component": "graduate/studentStatus/info/label/index",
                                                "meta": {
                                                    "title": "标签设置",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Modify",
                                        "path": "modify",
                                        "hidden": false,
                                        "redirect": "noRedirect",
                                        "component": "ParentView",
                                        "alwaysShow": true,
                                        "meta": {
                                            "title": "学籍变动管理",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        },
                                        "children": [
                                            {
                                                "name": "Apply1",
                                                "path": "apply1",
                                                "hidden": false,
                                                "component": "graduate/studentStatus/modify/apply/index",
                                                "meta": {
                                                    "title": "学籍变动申请",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            },
                                            {
                                                "name": "Check1",
                                                "path": "check1",
                                                "hidden": false,
                                                "component": "graduate/studentStatus/modify/check/index",
                                                "meta": {
                                                    "title": "学籍变动审核",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            },
                                            {
                                                "name": "Modify1",
                                                "path": "modify1",
                                                "hidden": false,
                                                "component": "graduate/studentStatus/modify/table/index",
                                                "meta": {
                                                    "title": "学籍变动管理",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "name": "EduStatistics",
                                        "path": "eduStatistics",
                                        "hidden": false,
                                        "redirect": "noRedirect",
                                        "component": "ParentView",
                                        "alwaysShow": true,
                                        "meta": {
                                            "title": "教育综合统计",
                                            "icon": "chart",
                                            "noCache": false,
                                            "link": null
                                        },
                                        "children": [
                                            {
                                                "name": "ReportTable",
                                                "path": "reportTable",
                                                "hidden": false,
                                                "component": "graduate/studentStatus/eduStatistics/reportTable/index",
                                                "meta": {
                                                    "title": "报表统计",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            },
                                            {
                                                "name": "EduSetting",
                                                "path": "eduSetting",
                                                "hidden": false,
                                                "component": "graduate/studentStatus/eduStatistics/setting/index",
                                                "meta": {
                                                    "title": "统计设置",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "Cultivate",
                                "path": "cultivate",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "graduate/cultivate/index",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "研究生培养管理",
                                    "icon": "clipboard",
                                    "noCache": false,
                                    "link": null
                                },
                                "children": [
                                    {
                                        "name": "Program",
                                        "path": "program",
                                        "hidden": false,
                                        "redirect": "noRedirect",
                                        "component": "ParentView",
                                        "alwaysShow": true,
                                        "meta": {
                                            "title": "培养方案",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        },
                                        "children": [
                                            {
                                                "name": "Template",
                                                "path": "template",
                                                "hidden": false,
                                                "component": "graduate/cultivate/program/template/index",
                                                "meta": {
                                                    "title": "方案模版设置",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "name": "CourseArrange",
                                        "path": "courseArrange",
                                        "hidden": false,
                                        "redirect": "noRedirect",
                                        "component": "ParentView",
                                        "alwaysShow": true,
                                        "meta": {
                                            "title": "排课管理",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        },
                                        "children": [
                                            {
                                                "name": "Calendar",
                                                "path": "calendar",
                                                "hidden": false,
                                                "component": "graduate/cultivate/courseArrange/calendar/index",
                                                "meta": {
                                                    "title": "校历设置",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            },
                                            {
                                                "name": "Arrange",
                                                "path": "arrange",
                                                "hidden": false,
                                                "component": "graduate/cultivate/courseArrange/arrange/index",
                                                "meta": {
                                                    "title": "排课",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "name": "AdjustClasses",
                                        "path": "adjustClasses",
                                        "hidden": false,
                                        "redirect": "noRedirect",
                                        "component": "ParentView",
                                        "alwaysShow": true,
                                        "meta": {
                                            "title": "调停补课",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        },
                                        "children": [
                                            {
                                                "name": "AdjustClassesApply",
                                                "path": "adjustClassesApply",
                                                "hidden": false,
                                                "component": "graduate/cultivate/adjustClasses/apply/apply",
                                                "meta": {
                                                    "title": "调停补课申请",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            },
                                            {
                                                "name": "Attrsetting",
                                                "path": "attrsetting",
                                                "hidden": false,
                                                "component": "graduate/cultivate/adjustClasses/apply/attr",
                                                "meta": {
                                                    "title": "参数设置",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "name": "TeachEvaluate",
                                        "path": "teachEvaluate",
                                        "hidden": false,
                                        "redirect": "noRedirect",
                                        "component": "ParentView",
                                        "alwaysShow": true,
                                        "meta": {
                                            "title": "教学评教",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        },
                                        "children": [
                                            {
                                                "name": "QuestSurvery",
                                                "path": "questSurvery",
                                                "hidden": false,
                                                "component": "graduate/cultivate/teachEvaluate/questSurvery/index",
                                                "meta": {
                                                    "title": "问卷调查",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Achievement",
                                        "path": "achievement",
                                        "hidden": false,
                                        "redirect": "noRedirect",
                                        "component": "ParentView",
                                        "alwaysShow": true,
                                        "meta": {
                                            "title": "成绩管理",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        },
                                        "children": [
                                            {
                                                "name": "Achieve",
                                                "path": "achieve",
                                                "hidden": false,
                                                "component": "graduate/cultivate/achievement/attr",
                                                "meta": {
                                                    "title": "设置授权",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            },
                                            {
                                                "name": "Score",
                                                "path": "score",
                                                "hidden": false,
                                                "component": "graduate/cultivate/achievement/score",
                                                "meta": {
                                                    "title": "成绩录入",
                                                    "icon": "#",
                                                    "noCache": false,
                                                    "link": null
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "Degree",
                                "path": "degree",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "graduate/degree/index",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "研究生学位管理",
                                    "icon": "druid",
                                    "noCache": false,
                                    "link": null
                                },
                                "children": [
                                    {
                                        "name": "Setting3",
                                        "path": "setting3",
                                        "hidden": false,
                                        "component": "graduate/degree/setting/index",
                                        "meta": {
                                            "title": "论文信息设置",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Checkup",
                                        "path": "checkup",
                                        "hidden": false,
                                        "component": "graduate/degree/checkup/index",
                                        "meta": {
                                            "title": "匿名检测",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Poster",
                                        "path": "poster",
                                        "hidden": false,
                                        "component": "graduate/degree/poster/index",
                                        "meta": {
                                            "title": "答辩海报",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Reply",
                                        "path": "reply",
                                        "hidden": false,
                                        "component": "graduate/degree/reply/index",
                                        "meta": {
                                            "title": "答辩结果",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    }
                                ]
                            },
                            {
                                "name": "Student",
                                "path": "student",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "ParentView",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "研究生学生管理",
                                    "icon": "people",
                                    "noCache": false,
                                    "link": null
                                },
                                "children": [
                                    {
                                        "name": "Coach",
                                        "path": "coach",
                                        "hidden": false,
                                        "component": "graduate/student/coach/index",
                                        "meta": {
                                            "title": "辅导员管理",
                                            "icon": "#",
                                            "noCache": true,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Absent",
                                        "path": "absent",
                                        "hidden": false,
                                        "component": "graduate/student/absent/index",
                                        "meta": {
                                            "title": "请销假管理",
                                            "icon": "#",
                                            "noCache": true,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Stay",
                                        "path": "stay",
                                        "hidden": false,
                                        "component": "graduate/student/stay/index",
                                        "meta": {
                                            "title": "留校审批",
                                            "icon": "#",
                                            "noCache": true,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Flow1",
                                        "path": "flow1",
                                        "hidden": false,
                                        "component": "graduate/student/flow/index",
                                        "meta": {
                                            "title": "流程管理",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    }
                                ]
                            },
                            {
                                "name": "OnlineMeeting",
                                "path": "onlineMeeting",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "graduate/onlineMeeting/index",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "在线会议",
                                    "icon": "upload",
                                    "noCache": false,
                                    "link": null
                                },
                                "children": [
                                    {
                                        "name": "JointTraial",
                                        "path": "jointTraial",
                                        "hidden": false,
                                        "component": "graduate/onlineMeeting/jointTraial/index",
                                        "meta": {
                                            "title": "学位会审",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Vote",
                                        "path": "vote",
                                        "hidden": false,
                                        "component": "graduate/onlineMeeting/vote/index",
                                        "meta": {
                                            "title": "优博论文评选",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Mentor",
                                        "path": "mentor",
                                        "hidden": false,
                                        "component": "graduate/onlineMeeting/mentor/index",
                                        "meta": {
                                            "title": "导师遴选",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    }
                                ]
                            }
                        ]
                    }            
                ]
            }
          } else if (sessionStorage.getItem("menuType") === '3') {// 本科教师
            res = {
                "msg": "操作成功",
                "code": 200,
                "data": [
                    {
                        "name": "Undergraduate",
                        "path": "/undergraduate",
                        "hidden": false,
                        "redirect": "noRedirect",
                        "component": "Layout",
                        "alwaysShow": true,
                        "meta": {
                            "title": "本科教务管理系统",
                            "icon": "education",
                            "noCache": false,
                            "link": null
                        },
                        "children": [
                            {
                                "name": "UndergraduateIndex",
                                "path": "undergraduateIndex",
                                "hidden": false,
                                "component": "undergraduate/index/index",
                                "meta": {
                                    "title": "首页",
                                    "icon": "build",
                                    "noCache": false,
                                    "link": null
                                }
                            },
                            {
                                "name": "Teach",
                                "path": "teach",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "ParentView",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "教学任务管理",
                                    "icon": "education",
                                    "noCache": false,
                                    "link": null
                                },
                                "children": [
                                    {
                                        "name": "FormulationDetail",
                                        "path": "formulationDetail",
                                        "hidden": true,
                                        "component": "undergraduate/teach/formulationDetail",
                                        "meta": {
                                            "title": "方案详情",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Formulation",
                                        "path": "formulation",
                                        "hidden": false,
                                        "component": "undergraduate/teach/formulation",
                                        "meta": {
                                            "title": "方案制定",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Task",
                                        "path": "task",
                                        "hidden": false,
                                        "component": "undergraduate/teach/task",
                                        "meta": {
                                            "title": "教学任务填报",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    }
                                ]
                            },
                            {
                                "name": "Schedule",
                                "path": "schedule",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "ParentView",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "排课",
                                    "icon": "date",
                                    "noCache": false,
                                    "link": null
                                },
                                "children": [
                                    {
                                        "name": "Items",
                                        "path": "items",
                                        "hidden": false,
                                        "component": "undergraduate/schedule/items",
                                        "meta": {
                                            "title": "排课检查项",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "Aischedule",
                                        "path": "aischedule",
                                        "hidden": false,
                                        "component": "undergraduate/schedule/aischedule",
                                        "meta": {
                                            "title": "智能排课",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    }
                                ]
                            },
                            {
                                "name": "Tutoring",
                                "path": "tutoring",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "ParentView",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "调停补课",
                                    "icon": "date-range",
                                    "noCache": false,
                                    "link": null
                                },
                                "children": [
                                    {
                                        "name": "TutoringAttr",
                                        "path": "tutoringAttr",
                                        "hidden": false,
                                        "component": "undergraduate/tutoring/attr",
                                        "meta": {
                                            "title": "参数设置",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "TutoringItems",
                                        "path": "tutoringItems",
                                        "hidden": false,
                                        "component": "undergraduate/tutoring/items",
                                        "meta": {
                                            "title": "检查项",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "TutoringProgress",
                                        "path": "tutoringProgress",
                                        "hidden": false,
                                        "component": "undergraduate/tutoring/progress",
                                        "meta": {
                                            "title": "流程管理",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "TutoringApply",
                                        "path": "tutoringApply",
                                        "hidden": false,
                                        "component": "undergraduate/tutoring/apply",
                                        "meta": {
                                            "title": "申请调停补课",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    }
                                ]
                            },
                            {
                                "name": "Score",
                                "path": "score",
                                "hidden": false,
                                "redirect": "noRedirect",
                                "component": "ParentView",
                                "alwaysShow": true,
                                "meta": {
                                    "title": "成绩管理",
                                    "icon": "skill",
                                    "noCache": false,
                                    "link": null
                                },
                                "children": [
                                    {
                                        "name": "Attr",
                                        "path": "attr",
                                        "hidden": false,
                                        "component": "undergraduate/score/attr",
                                        "meta": {
                                            "title": "参数设置",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "ScoreItems",
                                        "path": "scoreItems",
                                        "hidden": false,
                                        "component": "undergraduate/score/items",
                                        "meta": {
                                            "title": "成绩检查项",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    },
                                    {
                                        "name": "ScoreScore",
                                        "path": "scoreScore",
                                        "hidden": false,
                                        "component": "undergraduate/score/score",
                                        "meta": {
                                            "title": "成绩",
                                            "icon": "#",
                                            "noCache": false,
                                            "link": null
                                        }
                                    }
                                ]
                            }
                        ]
                    }       
                ]
            }
          } else if (sessionStorage.getItem("menuType") === '4') {// 家长
            res = {
                "msg": "操作成功",
                "code": 200,
                "data": [
                    {
                        "name": "Undergraduate",
                        "path": "/undergraduate",
                        "hidden": false,
                        "redirect": "noRedirect",
                        "component": "Layout",
                        "alwaysShow": true,
                        "meta": {
                            "title": "本科教务管理系统",
                            "icon": "education",
                            "noCache": false,
                            "link": null
                        },
                        "children": [
                            {
                                "name": "UndergraduateIndex",
                                "path": "undergraduateIndex",
                                "hidden": false,
                                "component": "undergraduate/index/index",
                                "meta": {
                                    "title": "首页",
                                    "icon": "build",
                                    "noCache": false,
                                    "link": null
                                }
                            }
                        ]
                    }       
                ]
            }
          } else if (sessionStorage.getItem("menuType") === '5') {// 校友
            res = {
                "msg": "操作成功",
                "code": 200,
                "data": [
                    {
                        "name": "Undergraduate",
                        "path": "/undergraduate",
                        "hidden": false,
                        "redirect": "noRedirect",
                        "component": "Layout",
                        "alwaysShow": true,
                        "meta": {
                            "title": "本科教务管理系统",
                            "icon": "education",
                            "noCache": false,
                            "link": null
                        },
                        "children": [
                            {
                                "name": "UndergraduateIndex",
                                "path": "undergraduateIndex",
                                "hidden": false,
                                "component": "undergraduate/index/index",
                                "meta": {
                                    "title": "首页",
                                    "icon": "build",
                                    "noCache": false,
                                    "link": null
                                }
                            }
                        ]
                    }       
                ]
            }
          } else if (sessionStorage.getItem("menuType") === '6') {// 管理员
            
          }
            const sdata = JSON.parse(JSON.stringify(res.data))
            const rdata = JSON.parse(JSON.stringify(res.data))
            const defaultData = JSON.parse(JSON.stringify(res.data))
            const sidebarRoutes = filterAsyncRouter(sdata)
            const rewriteRoutes = filterAsyncRouter(rdata, false, true)
            const defaultRoutes = filterAsyncRouter(defaultData)
            const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
            asyncRoutes.forEach(route => { router.addRoute(route) })
            this.setRoutes(rewriteRoutes)
            this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
            this.setDefaultRoutes(sidebarRoutes)
            this.setTopbarRoutes(defaultRoutes)
            resolve(rewriteRoutes)
          // })
        })
      }
    }
  })

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
      if (el.children && el.children.length) {
        children = children.concat(filterChildren(el.children, el))
        return
      }
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

export default usePermissionStore
