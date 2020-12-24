<template>
  <div class="shop-info">
    <!-- 店铺顶部 -->
    <div class="shop-top">
      <img :src="shop.logo" alt="" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <!-- 店铺中间 -->
    <div class="shop-middle">
      <!-- 店铺中间左边 -->
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <!-- 店铺中间右边 -->
      <div class="shop-middle-item shop-middle-right">
        <table>
          <!-- tr代表一行 -->
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <!-- 从后台传过来isBetter的值 -->
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }} </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 店铺底部 -->
    <div>
      <div class="shop-bottom">
        <div class="enter-shop">进店逛逛</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  //过滤器
  filters: {
    sellCountFilter: function (value) {
        if (value < 10000)  return value;
            //toFixed()可以把Number四舍五入为指定小数位数的数字
            return (value/10000).toFixed(1) + "w";
        
    },
  },
};
</script>

<style scoped>
.shop-info{
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
}
.shop-top{
    line-height: 45px;
    /**让元素垂直中心对齐 */
    display: flex;
    /**让元素在辅轴上居中对齐 */
    align-items: center;
}
.shop-top img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, .1);
}
.shop-top .title{
    margin-left: 10px;
    vertical-align: center;
}
.shop-middle{
    margin-top: 15px;
    display: flex;
    align-items: center; 
}
.shop-middle-item{
    flex: 1;
}
.shop-middle-left{
    display: flex;
    /**空白分布到元素的单侧 */
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, .1);
}
/**,是并集选择器 */
.sells-count, .goods-count{
font-size: 18px;
}
.sells-text, .goods-text{
     margin-top: 10px; 
     font-size: 12px;
}

.shop-middle-right{
    font-size: 13px;
    color: #333;
}
.shop-middle-right table{
    width: 120px;
    margin-left: 30px;
}
.shop-middle-right table td{
    padding: 5px 0;
}
.shop-middle-right .score{
    color: #5ea732;
}
.shop-middle-right .score-better{
    color: #f13e3a;
}
.shop-middle-right .better span{
    background-color: #5ea732;
    color: #fff;
    text-align: center;
}
.shop-middle-right .better-more span{
    background-color: #f13e3a;
}
.shop-bottom{
    width: 120px;
    height: 25px;
    line-height: 25px;
    background-color: rgb(228, 225, 225);
    border-radius: 8px;
    position: relative;
    left: 92px;
    top: 16px;
}
.shop-bottom .enter-shop{
    text-align: center;
    font-size: 13px;
}
</style>
