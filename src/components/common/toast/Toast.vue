<template>
  <div class="toast" v-show="isShow">
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // show:{
    //     type:Boolean,
    //     default:false
    // }
  },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(message = '商品加入购物车成功！', duration = 1500) {
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
          this.message = '';
          this.isShow = false
      },duration)
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
}
.message {
  font-size: 14px;
}
</style>
