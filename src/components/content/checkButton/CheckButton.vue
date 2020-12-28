<template>
  <div class="check-buttom" :class="{check: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.check-buttom {
  border-radius: 50%;
  border: 2px solid #aaa;
  width: 22px;
  height: 22px;
}
.check-buttom img {
  width: 19px;
  height: 19px;
}
.check {
  border-color:  red;
  background-color: red;
}
</style>
