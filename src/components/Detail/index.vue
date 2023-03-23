<template>
  <el-scrollbar>
    <div class="qk-detail">
      <DetailForm :data="data" :columns="columns" :label-width="labelWidth"/>
    </div>
  </el-scrollbar>
</template>

<script>
import DetailForm from './detailForm.vue'
export default {
  components: {
    DetailForm
  },
  props: {
    data: { type: Object, default: () => { return {} } },
    columns: { type: Array, default: () => { return [] } },
    labelWidth: { type: String, default: '100px' }
  }
}
</script>

<style lang="scss" scoped>
.qk-detail {
  max-height: 60vh;
  padding: 15px;
}
</style>
