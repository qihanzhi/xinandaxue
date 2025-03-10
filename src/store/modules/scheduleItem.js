const useScheduleItemsStore = defineStore(
  'scheduleItems',
  {
    state: () => ({
      data: [
        // 同样的课时，两个班级
        { type: "上课时间冲突类", name: '上课时间重复占用', status: true, color: "#ff4500", data:['field_2', 'field_3'] },
        { type: "上课时间屏蔽类", name: '校庆日不安排课程', status: false, color: "#ff8c00" },
        { type: "要求学时不足类", name: '学生总学时不足', status: false, color: "#ffd700" },
        { type: "异常类", name: '学生学籍异常', status: false, color: "#90ee90" },
        { type: "漏排类", name: '老师漏排', status: false, color: "#00ced1" },
        { type: "教师资源不足", name: '老师不足以分配', status: false, color: "#1e90ff" },
        { type: "节假日调整", name: '节假日提前', status: false, color: "#EE70BF" },
        { type: "教师时间冲突", name: '教师请假', status: false, color: "#D0E897" },
        // 同样课时，两个教室
        { type: "教室冲突", name: '教室重复占用', status: true, color: "#CEADDA", data:['field_2', 'field_6'] },
      ],
    }),
    actions: {
      setData(value) {
        this.data = value
      },
      removeData(value) {
        this.data.splice(value, 1)
      },
    }
  })

export default useScheduleItemsStore
