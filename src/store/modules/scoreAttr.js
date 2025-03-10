const useScoreAttrStore = defineStore(
  'scoreAttr',
  {
    state: () => ({
      data: [
        { field_0: "自动化", field_1: '控制理论', field_2: '张前东', field_3: "百分制", field_4: '', field_5: '2024-12-02' },
        { field_0: "自动化", field_1: '工程制图', field_2: '刘浩', field_3: "百分制", field_4: '', field_5: '2024-12-02' },
        { field_0: "自动化", field_1: '检测技术', field_2: '耿星', field_3: "二级制", field_4: '', field_5: '2024-12-02' },
        { field_0: "自动化", field_1: '电动与机动', field_2: '齐浒', field_3: "五级制", field_4: '', field_5: '2024-12-02' },
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
export default useScoreAttrStore
