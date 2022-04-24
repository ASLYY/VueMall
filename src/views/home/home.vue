<template>
    <div id="home">
        <nav-bar class="home-nav">
          <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']" 
            @tabclick="tabclick" ref="tabControl1" 
            class="tab-control" v-show="isTabFixed">
        </tab-control>
        <scroll class="content" ref="scroll" 
          :probe-type="3" @scroll="contentScroll"
          :pull-up-load="true" @pullingUp="loadMore">
          <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
          <recommend-view :recommends="recommends"></recommend-view>
          <feature-view ></feature-view>
          <!-- <tab-control :titles="['流行','新款','精选']" 
            class="tab-control" @tabclick="tabclick"></tab-control> -->
          <tab-control :titles="['流行','新款','精选']" 
            @tabclick="tabclick" ref="tabControl2"></tab-control>
          <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>
<script>

import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
import RecommendView from 'views/home/childComps/RecommendView.vue'
import FeatureView from 'views/home/childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/util.js'


export default {
    name:'home',
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      scroll,
      BackTop
    },
    data() {
      return {
        banners:[],
        recommends:[],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currenttype: 'pop',
        // currenttype: ['pop']
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currenttype].list
      }

    },
    created() {
      // 请求多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      
      
    },
    mounted() {
      // 图片完成加载的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      this.$bus.$on('itemImageLoad', () => {
        // console.log('----------')
        // this.$refs.scroll.refresh()
        refresh()
      })

      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el 用于获取组件中的元素
      // 但是如果是直接在mounted获取tabControl的offsetTop的话 有时候图片加载会很慢 计算的时候offsetTop不正确
      // 因此我们需要再图片全部加载完成之后才计算offsetTop
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop)
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      // 将以下代码进行封装到common/utils.js 方便其他模块后续使用 
      // debounce(func, delay) {
      //   let timer = null
      //   return function(...args) {
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this, args)
      //     }, delay);
      //   } 

      tabclick(index) {
        // console.log(index) 
        // this.currenttype = Object.keys(this.goods)[index]
        switch (index) {
          case 0:
            this.currenttype = 'pop'
            break;
          case 1:
            this.currenttype = 'new'
            break;
          case 2:
            this.currenttype = 'sell'
            break;
          default:
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        // console.log("-----", this.$refs.scroll.scroll)
        // this.$refs.scroll.scroll.scrollTo(0, 0)
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // console.log(position)
        // 判断BackTop是否显示
        this.isShowBackTop = -position.y > 1000

        // 决定tabControl是否实现吸顶效果 position: fixed
        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      loadMore() {
        console.log("上拉加载")
        this.getHomeGoods(this.currenttype)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.$refs.tabControl.$el.offsetTop)
      },


      /*
      网络请求相关方法
      */ 
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
      },
      getHomeGoods(type) {
        // 这里的page只是一个新的记录需要请求的页码。原本goods里的page并没有改变
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res.data)
          // ...可变长参数
          this.goods[type].list.push(...res.data.list)
          // 下面的page+1是对goods中的page数据进行修改
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
      })
    },
      
    }, 

    
}
</script>
<style scoped>
  #home {
    /*padding-top: 44px;*/
    /* height: 100vh; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

/*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */  
  .tab-control {
    position: relative;
    z-index: 9;
  }


  .content {
    overflow: hidden;
    /* height:calc(100% - 93px); */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;  
  }
</style>