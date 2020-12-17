<template>
  <div class="goods">
      <!-- 不需要放插槽，用单标签 -->
   <goods-list-item v-for="item in goods" :goods-item = 'item'/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: "GoodsList",
  components:{
    GoodsListItem

  },
  data() {
    return {};
  },
  //声明需要从父级接收到的数据
  props: {
    goods: {
      type: Array,
      default() {
          return []
      },
    },
  },
};
</script>

<style>
.goods{
    display: flex;
    flex-flow: wrap;
    justify-content: space-around;
    padding: 3px;
}
</style>
