<template>
  <div class="wrapper">
    <ul class="content">
      <li>111</li>
      <li>222</li>
      <li>333</li>
      <li>444</li>
      <li>555</li>
      <li>666</li>
      <li>777</li>
      <li>888</li>
      <li>999</li>
      <li>000</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>0</li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Catgory",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
     this.scroll = new BScroll(document.querySelector(".wrapper"), {
      //属性
      //设置滚动
      probeType:3,
      //设置上拉下载
      pullUpLoad:true
    });
    // this.scroll.on('scroll',(position)=> {
    //   console.log(position);
    // })
    this.scroll.on('pullingUp',() =>{
      console.log('上拉加载更多');
    //   setTimeout(() => {
    //     this.scroll.finishPullUp();
    //   },2000)
     })
  },
};
</script>

<style>
/* .content{
  background-color: red;
  height: 100px;
  overflow-y: scroll;
} */
.wrapper {
  background-color: red;
  height: 100px;
  overflow: hidden;
}
</style>
