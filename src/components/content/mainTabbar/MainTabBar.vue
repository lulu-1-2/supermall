<template>
    <!-- 引用组件TabBar 可以写成小写的形式，中间用-连接-->
    <tab-bar>
      <tab-bar-item path='/home' >
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" >
        <img slot="item-icon-active" src="~assets/img/tabbar/home-active.svg" alt="" >
        <!-- <div>的目的是换行 -->
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category'>
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="" >
        <img slot="item-icon-active" src="~assets/img/tabbar/category-active.svg" alt="" >
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/cart'>
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="" >
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart-active.svg" alt="" >
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile'>
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="" >
        <img slot="item-icon-active" src="~assets/img/tabbar/profile-active.svg" alt="" >
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
//导入TabBar组件
import TabBar from "components/common/tabbar/TabBar";
//导入TabBarItem组件
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
name:'MainTabBar',
components: {
    //注册组件TabBar
    TabBar,
    //注册组件TabBarItem
    TabBarItem
  }
}
</script>

<style scoped>

</style>