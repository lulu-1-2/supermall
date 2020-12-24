<template>
  <div class="goods-item" @click = 'itemClick'>
    <img :src="showImage" alt=""  @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img ;
    }
  },
  methods: {
    imageLoad(){
      //console.log('------------')
      this.$bus.$emit('itemImageLoad');
    },
    itemClick(){
      //通过路由跳转页面
      this.$router.push('/detail/' + this.goodsItem.iid);
    }
  },
};
</script>

<style scoped>
.goods-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 14px;
  position: absolute;
  text-align: center;
  overflow: hidden;
  bottom: 5px;
  left: 0;
  right: 0;
}
.goods-info p {
  overflow: hidden;
  /* 当文本溢出包含元素时,显示省略符号来代表被修剪的文本 */
  text-overflow: ellipsis;
  /* 规定段落中的文本不进行换行 */
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
    position: relative;
}
.goods-info .collect::before{
    content: '';
    position: absolute;
    left: -17px;
    /* top: -1px; */
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;

}
</style>
