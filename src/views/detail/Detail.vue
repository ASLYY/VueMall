<template>
  <div>
    详情页
    <h2>{{iid}}</h2>
  </div>
</template>
<script>
export default {
  name:'Detail',
  data() {
    return {
      iid: null
    }
  },
  activated() {
    this.iid = this.$route.params.iid
  },
}
</script>
<style scoped>
  
</style>