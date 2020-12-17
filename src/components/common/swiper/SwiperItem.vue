<template>
  <!-- slide:滑动-->
  <div class="slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SwiperItem",
};
</script>

<style>
.slide{
  width: 100%;
  /* 不收缩 */
  flex-shrink: 0;
}
.slide img{
  width: 100%;
}
</style>
