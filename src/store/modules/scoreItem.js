const useScoreItemsStore = defineStore(
  'scoreItems',
  {
    state: () => ({
      data: [
        { type: "学生录入错误类", name: '选课学生与录入学生不同', status: true, color: "#ff4500", data:['field_1', 'field_2'] },        
        { type: "分数录入类", name: '超出分数上限', status: false, color: "#ff8c00", data:['field_1', 'field_7'] },
        { type: "分数录入类", name: '超出分数下限', status: false, color: "#ffd700", data:['field_1', 'field_7'] },
        { type: "分数录入类", name: '重点关注', status: true, color: "#90ee90", data:['field_1', 'field_7'] },
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

export default useScoreItemsStore
