<template>
    <div id="home">
        <nav-bar class="home-nav">
          <div slot="center">购物街</div>
        </nav-bar>
        <scroll class="content" ref="scroll" 
        :probe-type="3" @scroll="contentScroll"
        :pull-up-load="true" @pullingUp="loadMore">
          <home-swiper :banners="banners"></home-swiper>
          <recommend-view :recommends="recommends"></recommend-view>
          <feature-view ></feature-view>
          <tab-control :titles="['流行','新款','精选']" 
            class="tab-control" @tabclick="tabclick"></tab-control>
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
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currenttype].list
      }

    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
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
      },
      backClick() {
        // console.log("-----", this.$refs.scroll.scroll)
        // this.$refs.scroll.scroll.scrollTo(0, 0)
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // console.log(position)
        this.isShowBackTop = -position.y > 1000
      },
      loadMore() {
        console.log("上拉加载")
        this.getHomeGoods(this.currenttype)
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
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res.data)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp().refresh()
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

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
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