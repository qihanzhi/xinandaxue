<template>
  <div class="empty">
    <img src="@/assets/images/nodata.png" />
    <span class="empty-text">{{ value || "暂无数据" }}</span>
  </div>
</template>

<script>
export default {
  name: "DictTag",
  props: {
    value: [Number, String, Array],
  },
  data() {
    return {
      unmatchArray: [], // 记录未匹配的项
    };
  },
  computed: {},
  filters: {},
};
</script>
<style lang="scss" scoped>
.empty {
  display: grid;
  grid-template-rows: 80% 20%;
  grid-template-columns: 1fr;
  gap: 2px;
  place-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  .empty-text{
    line-height: 20px;
    color: #999999;
  }
}
</style>
