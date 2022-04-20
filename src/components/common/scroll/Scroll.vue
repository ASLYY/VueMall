<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      srcoll : null,
      message: 'hahahha'
    }
  },
    // 使用document.querySelector('.wrapper')不太好 会有多个class是同名得情况
    //这样去查找的时候找到的可能不是我们所要得组件 
    // this.srcoll = new BScroll(document.querySelector('.wrapper'), {})
  mounted() {
      // console.log(document.querySelector('.wrapper'))
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: true,
        observeDOM: true
      })


      //监听滚动区域 
      this.scroll.on('scroll', (position) => {
        // console.log(position)
        this.$emit("scroll", position)
      })

      this.scroll.on('pullingUp', () => {
        // console.log("上拉加载更多")
        this.$emit('pullingUp')
      })

    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      
    },
}
</script>
<style scoped>
  
</style>