<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goodsItem="item"></good-list-item>
  </div>
</template>
<script>
import GoodListItem from './GoodListItem.vue'

export default {
  name:"GoodsList",
  components: {
    GoodListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around; */
    justify-content: space-evenly;
    padding: 2px;
  }
</style>