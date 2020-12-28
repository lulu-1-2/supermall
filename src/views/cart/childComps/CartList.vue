<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info = 'item'/>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem";
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  //进来该组件的时候触发该函数
  activated() {
      //刷新
      this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
