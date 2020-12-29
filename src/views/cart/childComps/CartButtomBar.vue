<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartButtomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    //reduce(),对数组中所有的内容进行汇总
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    //全选按钮状态的显示
    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      } else {
        return !this.cartList.find((item) => !item.checked);
      }
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //forEach()函数用来遍历数组，数组中有几个元素，函数就会执行几次
        //每次执行时，浏览器会将遍历到的元素以实参的形式传递进来
        this.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    calcClick(){
      //有bug，需要考虑全选或者是选择某一个的情况
      if (!this.isSelectAll) {
        this.$toast.show('请选择要购买的商品！');
      } 
    }
  },
};
</script>

<style scoped>
.buttom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  /* background-color: #eee; */
  border-top: 1px solid #ccc;
}
.check-content {
  display: flex;
  /* 元素在辅轴上如何对齐 */
  align-items: center;
  margin-left: 5px;
  width: 70px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 80px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
