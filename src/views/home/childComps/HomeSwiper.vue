<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name:'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners:{
        type: Array,
        default() {
          return []
        }
      },
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    // 只需要加载一次 去计算offsetTop
    imageLoad() {
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }      
    }
  },
}
</script>
<style scoped>
  
</style>