const useScoreStore = defineStore(
  'score',
  {
    state: () => ({
      data: [
        { field_0: "自动化1班", field_1: '202009001', field_2: '王大海', field_3: "84", field_4: '67', field_5: '42', field_6: '78', field_7: '68', field_8: '', field_9: '#ff4500' },
        { field_0: "自动化1班", field_1: '202009002', field_2: '李万和', field_3: "60", field_4: '54', field_5: '71', field_6: '77', field_7: '66', field_8: '' },
        { field_0: "自动化1班", field_1: '202009003', field_2: '赵天河', field_3: "67", field_4: '34', field_5: '78', field_6: '67', field_7: '62', field_8: '' },
        { field_0: "自动化1班", field_1: '202009004', field_2: '孙禅', field_3: "45", field_4: '76', field_5: '89', field_6: '87', field_7: '74', field_8: '' },
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
export default useScoreStore
