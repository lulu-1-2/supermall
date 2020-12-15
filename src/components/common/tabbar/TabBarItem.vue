<template>
  <!-- 添加点击事件 -->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  //父传子，传入一个字符串类型
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ea986c",
    },
  },
  data() {
    return {
      //isActive: true,不要把是否活跃的状态给写死
    };
  },
  computed: {
    isActive() {
      //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
      //如果要检索的字符串值没有出现，则该方法返回 -1。
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
/* 设置弹性盒里各个部分的样式 */
.tab-bar-item {
  /* 设置伸缩1，自由伸缩 */
  flex: 1;
  text-align: center;
  font-size: 14px;
}
/* 设置各个部分的图片的样式 */
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去除图片底部的3px */
  vertical-align: middle;
  margin-bottom: 2px;
}
/* 设置活跃时字体的颜色 */
/* .active {
  color: #ea986c;
} */
</style>
