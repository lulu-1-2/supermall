<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast :message = 'message' :show = 'show'/>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComps/DetailNavBar";
import DetailSwiper from "views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "views/detail/childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from 'components/common/toast/Toast'

import { getDetail, getRecommend, GoodsInfo, Shop, GoodsParam } from "network/detail";

import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message:'',
      show:false
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    //1.保存存入的iid
    this.iid = this.$route.params.iid;
    //2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      //获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //保存商品的参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      //获取1条评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //DOM渲染完，图片没有渲染完，调用函数nextTick
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    //3.获取推荐数据
    getRecommend().then((res) => {
      //console.log(res);
      this.recommends = res.data.list;
    });

    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      //console.log(this.themeTopYs);
    }, 200);
  },
  //安装好的
  mounted() {
    //console.log('我是detail中的内容')
    //$el用于获取组件中的元素
  },
  //销毁的时候
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    //监听图片加载事件
    imageLoad() {
      //刷新数据
      //防抖函数
      this.newRefresh();
      //获取y的值
      this.getThemeTopY();
    },
    //监听标题点击事件
    titleClick(index) {
      //console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    //监听滚动的位置
    contentScroll(position) {
      //console.log(position);
      //获取y的值
      const positionY = -position.y;
      //positionY的值和主題中的y值進行對比
      //遍历获取主题中的值
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        //分两种情况判断，最后一次不需要判断< i+1的情况
        //this.currentIndex !== i,防止调用过于频繁
        // if (this.currentIndex !== i &&
        //     ((i < length - 1 &&
        //     this.themeTopYs[i] < positionY && positionY < this.themeTopYs[i + 1]) ||
        //   (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   //console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex;

        // }
        if (
          this.currentIndex !== i &&
          positionY < this.themeTopYs[i + 1] &&
          positionY >= this.themeTopYs[i]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
    },
    //监听加入购物车
    addToCart() {
      //console.log('点击加入购物车');
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车里
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      this.addCart(product).then((res) => {
        //console.log(res);
        // this.message = res;
        // this.show = true;

        // setTimeout(() => {
        //   this.message = '';
        //   this.show = false;
        // },1500)
        //console.log(this.$toast);
        this.$toast.show(res,1500);
      });
      //3.商品添加成功
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
