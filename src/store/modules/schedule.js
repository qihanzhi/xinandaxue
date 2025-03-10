const useScheduleStore = defineStore(
    'schedule',
    {
      state: () => ({
        data: [
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
  
  export default useScheduleStore
  