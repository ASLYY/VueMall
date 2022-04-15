<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor: {
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      // isActive:true
    }
  },
  computed: {
    isActive() {
      return this.$route.path === this.path
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch((error) => error);
    }
  },
}
</script>
<style>
  .tabbar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 15px;
    /* color: red; */
  }

  .tabbar-item img{
    height: 20px;
    width: 20px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>