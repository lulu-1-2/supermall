<template>
  <div id="hy-swiper">
    <!-- v-on:语法糖@ ,对事件进行监听-->
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <!-- indicator:指示器 -->
    <slot name="indicator"> </slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <!-- v-for:遍历数组或对象 -->
        <!-- v-bind用于绑定一个或多个属性值，或者向另一个组件传递props值 -->
        <!-- Vue在进行DOM渲染时，出于性能考虑，会尽可能的复用已经存在的元素，
        而不是重新创建新的元素；如果我们不希望Vue出现类似重复利用的问题，可以给对应的input添加key,
        并且保证key的值不同 -->
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{ active: index === currentIndex - 1 }"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  //props,向子组件传递数据
  props: {
    //   interval:间隔
    interval: {
      type: Number,
      default: 3000,
    },
    //duration:持续的时间
    //过渡的时间
    animDuration: {
      type: Number,
      default: 300,
    },
    //ratio:比例
    moveRatio: {
      type: Number,
      default: 0.25,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      slideCount: 0, //元素个数
      totalWidth: 0, //swiper的宽度
      swiperStyle: {}, //swiper样式
      currentIndex: 1, //当前的index
      scrolling: false, //是否正在滚动
    };
  },
  //安装好的，生命周期函数
  mounted() {
    setTimeout(() => {
      //1.操作DOM，在前后添加Slide
      this.handleDom();
      //2.开启定时器
      this.startTimer();
    }, 100);
  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer: function () {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer: function () {
      window.clearInterval(this.playTimer);
    },
    /**
     * 滚动到正确的位置
     */
    scrollContent: function (currentPosition) {
      //0.设置正在滚动
      this.scrolling = true;
      //1.开始滚动动画,transition:过渡
      this.swiperStyle.transition = "transform" + this.animDuration + "ms";
      this.setTransform(currentPosition);
      //2.判断滚动到的位置
      this.checkPosition();
      //3.滚动完成
      this.scrolling = false;
    },
    /**
     * 校验正确的位置
     */
    checkPosition: function () {
      //setTimeout,延时调用
      window.setTimeout(() => {
        //1.校验正确的位置
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        //2.结束移动后的回调
        //通过$emit来触发事件
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },
    /**
     * 设置滚动的位置
     */
    setTransform: function (position) {
      //translate,平移
      //translate3d方法用来规定指定元素在三维空间中的位移。
      this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
      this.swiperStyle["-weblit-transform"] = `translate3d(${position}px),0,0`;
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px),0,0`;
    },
    /**
     * 操作DOM,在DOM前后添加Slide
     */
    handleDom() {
      //1.获取要操作的元素
      //querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
      let swiperEl = document.querySelector(".swiper");
      let slidesEls = swiperEl.getElementsByClassName("slide");
      //2.保存个数
      this.slideCount = slidesEls.length;
      //3.如果大于1个，那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        //cloneNode() 方法可创建指定的节点的精确拷贝。
        //cloneNode() 方法 拷贝所有属性和值。
        //该方法将复制并返回调用它的节点的副本。如果传递给它的参数是 true，它还将递归复制当前节点的所有子孙节点。否则，它只复制当前节点
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        //insertBefore() 方法在您指定的已有子节点之前插入新的子节点。
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        //appendChild() 方法向节点添加最后一个子节点。
        swiperEl.appendChild(cloneFirst);
        //offsetWidth 水平方向 width + 左右padding + 左右border-width
        //元素的视图属性
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      //4.让swiper元素，显示第一个（目前是显示前面添加的最后一个元素）
      this.setTransform(-this.totalWidth);
    },
    /**
     * 拖动事件的处理
     */
    touchStart(e) {
      //1.如果正在滚动，不可以拖动
      if (this.scrolling) return;
      //2.停止定时器
      this.stopTimer();
      //3.保存开始滚动（拖动）的位置
      this.startX = e.touches[0].pageX;
    },
    touchMove(e) {
      //1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;
      //2.设置当前的位置
      this.setTransform(moveDistance);
    },
    touchEnd(e) {
      //1.获取移动的距离
      //函数返回指定数字 “x“ 的绝对值
      let currentMove = Math.abs(this.distance);
      //2.判断最终距离
      if (this.distance === 0) {
        return;
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
        //右边移动超过0.25
        this.currentIndex--;
      } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) {
        //左边移动超过0.25
        this.currentIndex++;
      }
      //3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);
      //4.移动完成后重新开启定时器
      this.startTimer();
    },
    /**
     * (自动)控制上一个，下一个
     */
    previous() {
      this.changeItem(-1);
    },
    next() {
      this.changeItem(1);
    },
    changeItem(num) {
      //1.移除定时器
      this.stopTimer();
      //2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);
      //3.添加定时器
      this.startTimer();
    },
  },
};
</script>

<style>
#hy-swiper {
  /* 溢出的元素会被裁剪 */
  overflow: hidden;
  position: relative;
}
.swiper {
  /* 开启弹性盒 */
  display: flex;
}
.indicator {
  display: flex;
  /* 主轴上的元素居中排列 */
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}
.indi-item {
  /* 对元素指定宽度和高度包括了 padding 和 border */
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}
/* 交集选择器 */
.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
