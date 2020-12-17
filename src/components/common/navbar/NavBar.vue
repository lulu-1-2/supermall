<!-- 考虑问题的时候要具有扩展性-->
<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.nav-bar{
     /* 将容器设置为块级弹性容器 */
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
}
.left ,.right{
    width: 60px;
}
.center{
    flex: 1;/*等比例进行扩展 */
}
</style>
