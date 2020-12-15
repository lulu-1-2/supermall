<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
/* 设置弹性盒的样式 */
#tab-bar {
  /* 开启弹性盒 */
  display: flex;
  height: 49px;
  background-color: #f6f6f6;

  /* 开启固定定位 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  /* 设置tab-bar上边的阴影 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
}
</style>
