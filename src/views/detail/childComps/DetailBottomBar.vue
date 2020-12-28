<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <img src="~assets/img/detail/kefu_o.png" />
        <span class="text">客服</span>
      </div>
      <div>
        <img src="~assets/img/detail/dianpu.png" />
        <span class="text">店铺</span>
      </div>
      <div>
        <img src="~assets/img/detail/shoucang.png" />
        <span class="text">收藏</span>
      </div>
    </div>

    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    //加入购物车
    addToCart() {
      // console.log(1111);
      this.$emit("addCart");
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
}
/**子元素选择器，选中父元素指定子元素 */
.bar-item > div {
  flex: 1;
}
.bar-left .text {
  font-size: 13px;
}
.bar-item img {
  display: block;
  width: 22px;
  height: 22px;
  margin: 5px auto 3px;
}
.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}
.bar-right .cart {
  background-color: #f5d4a9;
  color: #333;
}
.bar-right .buy {
  background-color: #f69;
}
</style>
