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
        observeDOM: true,
        observeImage: true
      })


      //监听滚动区域 
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
        // console.log(position)
          this.$emit("scroll", position)
        })
      }
      
    // 监听scroll滚到到底部 进行加载
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log("上拉加载更多")
        this.$emit('pullingUp')
      })
    }

    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        // console.log('--')
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
}
</script>
<style scoped>
  
</style>