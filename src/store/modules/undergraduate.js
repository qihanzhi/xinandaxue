/* 大学生管理系统---存储演示临时数据 */

/* 学籍信息数据 */
// 学籍信息表
const infoTableData = [
  {
    id: "001",
    studentNum: "L010613199505084568",
    name: "王大海",
    gender: "男",
    nation: "汉",
    politicalStatus: "共青团员",
    dateOfBirth: "1995/05/08",
    nativePlace: "四川",
    contactNumber: "1588888687",
  },
  {
    id: "002",
    studentNum: "L010613199207084578",
    name: "李万和",
    gender: "男",
    nation: "汉",
    politicalStatus: "共青团员",
    dateOfBirth: "1992/07/08",
    nativePlace: "四川",
    contactNumber: "1588888688",
  },
  {
    id: "003",
    studentNum: "L010613199708087865",
    name: "赵天河",
    gender: "男",
    nation: "汉",
    politicalStatus: "党员",
    dateOfBirth: "1997/08/08",
    nativePlace: "四川",
    contactNumber: "1588888688",
  },
  {
    id: "004",
    studentNum: "L010613199706084712",
    name: "孙禅",
    gender: "女",
    nation: "汉",
    politicalStatus: "共青团员",
    dateOfBirth: "1997/06/08",
    nativePlace: "四川",
    contactNumber: "1588888688",
  },
];

// 学籍信息权限设置表
const permissionData = [
  {
    id: '001',
    num: '001',
    studentType: '专科生',
    userGroup: '专科生组',
    hasReview: '0',
    config: {
      studentNum: ['view'],
      name: ['view', 'edit', 'required'],
      gender: ['view', 'edit', 'required'],
      nation: ['view', 'edit', 'required'],
      politicalStatus: ['view'],
      dateOfBirth: ['view', 'edit', 'required'],
    }
  },
  {
    id: '002',
    num: '002',
    studentType: '本科生',
    userGroup: '本科生组',
    hasReview: '0',
    config: {
      studentNum: ['view'],
      name: ['view', 'edit', 'required'],
      gender: ['view', 'edit', 'required'],
      nation: ['view', 'edit', 'required'],
      politicalStatus: ['view'],
      dateOfBirth: ['view', 'edit', 'required'],
    }
  },
  {
    id: '003',
    num: '003',
    studentType: '硕士大学生',
    userGroup: '硕士大学生组',
    hasReview: '1',
    config: {
      studentNum: ['view'],
      name: ['view', 'edit', 'required'],
      gender: ['view', 'edit', 'required'],
      nation: ['view', 'edit', 'required'],
      politicalStatus: ['view'],
      dateOfBirth: ['view', 'edit', 'required'],
    }
  },
  {
    id: '004',
    num: '004',
    studentType: '博士研究生',
    userGroup: '博士研究生组',
    hasReview: '1',
    config: {
      studentNum: ['view'],
      name: ['view', 'edit', 'required'],
      gender: ['view', 'edit', 'required'],
      nation: ['view', 'edit', 'required'],
      politicalStatus: ['view'],
      dateOfBirth: ['view', 'edit', 'required'],
    }
  }
]


// 学籍变动申请表
const modifyTableData = [
  {
    id: '001',
    name: '李万财',
    studentNum: 'L010613199505084568',
    college: '机械学院',
    schoolYear: '2018',
    major: '机械自动化',
    classes: '自动化二班',
    card: '511624199706125874',
    transactionType: '退学',
    reasons: '因感情原因不能坚持学习，经与家里协商，申请退学',
    status: '待提交',
    contactNumber: '15447845821',
    applyDate: '2024年10月16日',
    applySign: '',
    reviews: {
      secCollege: {},
      studentOffice: {},
      deanOffice: {},
      graduateCollege: {},
      handleResult: {},
      status: 0,
    }
  },
  {
    id: '002',
    name: '王大海',
    studentNum: 'L010613199505084568',
    college: '机械学院',
    schoolYear: '2018',
    major: '机械自动化',
    classes: '自动化二班',
    card: '511624199706125874',
    transactionType: '保留学籍（休学）',
    reasons: '因病不能坚持学习，经学校指定医院认定应当休学',
    status: '待审核',
    contactNumber: '15447845821',
    applyDate: '2024年10月16日',
    applySign: 'data:image/png;base64,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',
    reviews: {
      secCollege: {},
      studentOffice: {},
      deanOffice: {},
      graduateCollege: {},
      handleResult: {},
      status: 0,
    }
  }
]

// 学生标签表
const labelData = [
  {
    labelId: '001',
    label: '未选课',
    desc: '该学生还未选课',
    color: '#D35516'
  },
  {
    labelId: '002',
    label: '选课完毕',
    desc: '该学生此学期已选完课',
    color: '#20A430'
  },
  {
    labelId: '003',
    label: '缺考',
    desc: '该学生有学科缺考情况',
    color: '#EDD629'
  },
  {
    labelId: '004',
    label: '补考',
    desc: '该学生有学科考生未通过情况',
    color: '#33D5BF'
  },
  {
    labelId: '005',
    label: '实习',
    desc: '该学生处于实习阶段，不在学校',
    color: '#246ED5'
  }
]

// 教育事业统计表
const eduStatisticsData = [
  {
    id: "001",
    studentNum: "L010613199505084568",
    name: "王大海",
    grade: '大一',
    gender: "男",
    nation: "汉",
    politicalStatus: "共青团员",
    dateOfBirth: "1995/05/08",
    nativePlace: "四川",
    contactNumber: "1588888687",
    college: '机械学院',
    schoolYear: '2024',
    major: '机械自动化',
    classes: '自动化二班',
    card: '511624199706125874',
    transactionType: '退学',
    reasons: '因感情原因不能坚持学习，经与家里协商，申请退学',
    normalClasses: '是',
    payTuition: '是',
    payAccommodationFee: '是',
    unPayReason: '',
    remarks: '',
    normalActivity: '是',
    quarter: 'Q1'
  },
  {
    id: "002",
    studentNum: "L010613199207084578",
    name: "李万和",
    gender: "男",
    grade: '研二',
    nation: "汉",
    politicalStatus: "共青团员",
    dateOfBirth: "1992/07/08",
    nativePlace: "四川",
    contactNumber: "1588888688",
    college: '机械学院',
    schoolYear: '2024',
    major: '机械自动化',
    classes: '自动化二班',
    card: '511624199706125874',
    transactionType: '退学',
    reasons: '因感情原因不能坚持学习，经与家里协商，申请退学',
    normalClasses: '是',
    payTuition: '否',
    payAccommodationFee: '是',
    unPayReason: '家庭经济困难',
    remarks: '',
    normalActivity: '是',
    quarter: 'Q1'
  },
  {
    id: "003",
    studentNum: "L010613199708087865",
    name: "赵天河",
    gender: "男",
    grade: '大一',
    nation: "汉",
    politicalStatus: "党员",
    dateOfBirth: "1997/08/08",
    nativePlace: "四川",
    contactNumber: "1588888688",
    college: '机械学院',
    schoolYear: '2024',
    major: '机械自动化',
    classes: '自动化二班',
    card: '511624199706125874',
    transactionType: '',
    reasons: '',
    normalClasses: '是',
    payTuition: '是',
    payAccommodationFee: '是',
    unPayReason: '',
    remarks: '',
    normalActivity: '是',
    quarter: 'Q2'
  },
  {
    id: "004",
    studentNum: "L010613199706084712",
    name: "孙禅",
    gender: "女",
    grade: '研三',
    nation: "汉",
    politicalStatus: "共青团员",
    dateOfBirth: "1997/06/08",
    nativePlace: "四川",
    contactNumber: "1588888688",
    college: '音乐学院',
    schoolYear: '2024',
    major: '舞蹈专业',
    classes: '二班',
    card: '511624199706125874',
    transactionType: '保留学籍（休学）',
    reasons: '因病不能坚持学习，经学校指定医院认定应当休学',
    normalClasses: '是',
    payTuition: '是',
    payAccommodationFee: '是',
    unPayReason: '',
    remarks: '因病不能出席班级活动',
    normalActivity: '否',
    quarter: 'Q3'
  },
  {
    id: "005",
    studentNum: "L010613199708087865",
    name: "赵万河",
    gender: "男",
    grade: '大一',
    nation: "汉",
    politicalStatus: "党员",
    dateOfBirth: "1997/08/08",
    nativePlace: "山东",
    contactNumber: "1588888688",
    college: '建筑学院',
    schoolYear: '2023',
    major: '土木工程',
    classes: '土木二班',
    card: '511624199706123874',
    transactionType: '',
    reasons: '',
    normalClasses: '是',
    payTuition: '是',
    payAccommodationFee: '是',
    unPayReason: '',
    remarks: '',
    normalActivity: '是',
    quarter: 'Q4'
  },
];

// 教育事业统计项设置表
const eduSettingData = [
  {
    labelId: '001',
    itemField: 'normalClasses',
    itemLabel: '是否正常上课',
    itemName: '是否正常上课',
    desc: '该学生是否正常完成上课',
    order: 1,
  },
  {
    labelId: '002',
    itemField: 'payTuition',
    itemLabel: '是否已交学费',
    itemName: '是否已交学费',
    desc: '该学生是否已交每年的报名费',
    order: 2,
  },
  {
    labelId: '003',
    itemField: 'payAccommodationFee',
    itemLabel: '是否已交住宿费',
    itemName: '是否已交住宿费',
    desc: '该学生是否已交每年的住宿费',
    order: 3,
  },
  {
    labelId: '004',
    itemField: 'unPayReason',
    itemLabel: '未交费原因',
    itemName: '未交费原因',
    desc: '简要说明未交费原因',
    order: 4,
  },
  {
    labelId: '005',
    itemField: 'remarks',
    itemLabel: '备注',
    itemName: '备注',
    desc: '其他说明',
    order: 5,
  },
]

/* 培养管理 */
// 方案模版设置表
const programTemplateData = [
  {
    id: '001',
    version: '1.0.0',
    createYear: '2024',
    title: '计算机网络技术本科生方案培养模板',
    programType: '本科生任务',
    desc: '这是一套专门针对全日制大学生培养方案的模版',
    schoolYear: '大一',
    college: '计算机科学与技术学院',
    major: '计算机网络技术',
    term:"2023上学期"
  },
  {
    id: '002',
    version: '1.0.1',
    createYear: '2024',
    title: '计算机网络技术研究生方案培养模板',
    programType: '研究生任务',
    desc: '这是一套专门针对全日制研究生的培养方案的模版',
    schoolYear: '大一',
    college: '计算机科学与技术学院',
    major: '计算机网络技术',
    term:"2023上学期",
  },
  {
    id: '003',
    version: '1.0.2',
    createYear: '2024',
    title: '计算机网络技术本研共修方案培养模板',
    programType: '本研共修任务',
    desc: '这是一套专门针对全日制大学生到研究生的培养方案的模版，更精细化到大一年级定制',
    major: '计算机网络技术',
    term:"2023上学期",
    college: '计算机科学与技术学院',
    baseInfo: {

    }
  },
  {
    id: '004',
    version: '1.0.0',
    createYear: '2023',
    title: '大一非全日制方案培养模板',
    programType: '研究生任务',
    major: '软件工程',
    term:"2023上学期",
    college: '计算机科学与技术学院',
    baseInfo: {

    }
  },
  {
    id: '005',
    version: '1.0.0',
    createYear: '2024',
    title: '大一专业型方案培养模板',
    programType: '本研共修任务',
    major: '软件工程',
    term:"2023上学期",
    college: '计算机科学与技术学院',
    baseInfo: {

    }
  },
  {
    id: '006',
    version: '1.0.0',
    createYear: '2024',
    title: '大一学术型方案培养模板',
    programType: '本科生任务',
    major: '软件工程',
    term:"2024上学期",
    college: '计算机科学与技术学院',
    baseInfo: {

    }
  },
  {
    id: '007',
    version: '1.0.0',
    createYear: '2024',
    title: '大一全日制方案培养模板',
    programType: '本科生任务',
    major: '信息安全',
    term:"2024上学期",
    college: '计算机科学与技术学院',
    baseInfo: {

    }
  },
  {
    id: '008',
    version: '1.0.0',
    createYear: '2024',
    title: '大一全日制方案培养模板',
    programType: '研究生任务',
    major: '信息安全',
    term:"2024上学期",
    college: '计算机科学与技术学院',
    baseInfo: {

    }
  },
  {
    id: '009',
    version: '1.0.0',
    createYear: '2024',
    title: '大一全日制方案培养模板',
    programType: '研究生任务',
    major: '计算机技术',
    term:"2024上学期",
    college: '计算机科学与技术学院',
    baseInfo: {

    }
  },
  {
    id: '0010',
    version: '1.0.0',
    createYear: '2024',
    title: '大一全日制方案培养模板',
    programType: '研究生任务',
    major: '计算机科学与技术',
    term:"2024上学期",
    college: '计算机科学与技术学院',
    baseInfo: {

    }
  },
  {
    id: '0011',
    version: '1.0.0',
    createYear: '2024',
    title: '大一全日制方案培养模板',
    programType: '本科生任务',
    major: '应用数学',
    term:"2024上学期",
    college: '数理学院',
    baseInfo: {

    }
  },
  {
    id: '0012',
    version: '1.0.0',
    createYear: '2024',
    title: '大一全日制方案培养模板',
    programType: '本科生任务',
    major: '数据科学',
    term:"2024上学期",
    college: '数理学院',
    baseInfo: {

    }
  },
  {
    id: '0013',
    version: '1.0.0',
    createYear: '2024',
    title: '大一全日制方案培养模板',
    programType: '本科生任务',
    major: '电光工程',
    term:"2024上学期",
    college: '数理学院',
    baseInfo: {

    }
  },
  {
    id: '0014',
    version: '1.0.0',
    createYear: '2024',
    title: '大一全日制方案培养模板',
    programType: '本科生任务',
    major: '应用物理',
    term:"2024上学期",
    college: '数理学院',
    baseInfo: {

    }
  },
]

const useUndergraduateStore = defineStore(
  'undergraduate',
  {
    state: () => ({
      /* 学籍管理 */
      infoTableData: infoTableData,
      permissionData: permissionData,
      labelData: labelData,
      modifyTableData: modifyTableData,
      eduStatisticsData: eduStatisticsData,
      eduSettingData: eduSettingData,
      /* 培养管理 */
      programTemplateData: programTemplateData,
    }),
    actions: {
      /*    学籍管理    */
      /* 学籍信息表 */
      setInfoTableData(value) {
        this.infoTableData = value
      },
      removeInfoTableData(value) {
        this.infoTableData.splice(value, 1)
      },
      addInfoTableData(value) {
        this.infoTableData.unshift(value)
      },
      /* 学籍信息权限设置表 */
      setPermissionData(value) {
        this.permissionData = value
      },
      removePermissionData(value) {
        this.permissionData.splice(value, 1)
      },
      addPermissionData(value) {
        this.permissionData.unshift(value)
      },
      /* 学籍标签设置表 */
      setLabelData(value) {
        this.labelData = value
      },
      removeLabelData(value) {
        this.labelData.splice(value, 1)
      },
      addLabelData(value) {
        this.labelData.unshift(value)
      },
      /* 学籍变动申请表 */
      setModifyTableData(value) {
        this.modifyTableData = value
      },
      removeModifyTableData(value) {
        this.modifyTableData.splice(value, 1)
      },
      addModifyTableData(value) {
        this.modifyTableData.unshift(value)
      },
      /* 教育事业统计表 */
      setEduStatisticsData(value) {
        this.eduStatisticsData = value
      },
      removeEduStatisticsData(value) {
        this.eduStatisticsData.splice(value, 1)
      },
      addEduStatisticsData(value) {
        this.eduStatisticsData.unshift(value)
      },
      /* 教育事业统计设置表 */
      setEduSettingData(value) {
        this.eduSettingData = value
      },
      removeEduSettingData(value) {
        this.eduSettingData.splice(value, 1)
      },
      addEduSettingData(value) {
        this.eduSettingData.unshift(value)
      },
      /*    培养管理    */
      /* 教育事业统计设置表 */
      setProgramTemplateData(value) {
        this.programTemplateData = value
      },
      removeProgramTemplateData(value) {
        this.programTemplateData.splice(value, 1)
      },
      addProgramTemplateData(value) {
        this.programTemplateData.unshift(value)
      },
    }
  })

export default useUndergraduateStore
