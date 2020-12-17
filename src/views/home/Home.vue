<template>
  <div id="home">
    <!-- 引用组件NavBar-->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- ref获取组件对象 -->
    <scroll class="content" ref="scroll">
      <!-- 后面的值是该组件中的值，banners要跟该组件的名字一样 -->
      <home-swiper :banner="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- 监听tabClick事件 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <!-- []里面可以直接传递一个变量，这样变量是什么就会获取哪个属性值 -->
      <goods-list :goods="goods[currentType].list" />
    </scroll>

    <back-top @click.native="backClick" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMulitData, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  //注册组件
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [], //请求过来的结果，初始化为空
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  //组件创建完成以后
  created() {
    this.getHomeMulitData();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 事件监听的相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      //this.$refs.scroll.scroll.scrollTo(0,0,500);
    },
    /**
     * 网络请求的相关方法
     */
    //1.请求多个数据
    getHomeMulitData() {
      getHomeMulitData().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        //console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
/**设置scoped属性，设置的css属性只能适应于本页中 */
#home {
  /* 视口的宽度 */
  height: 100vh;
  position: relative;
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 开启固定定位 */
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 99;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 99;
}
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
