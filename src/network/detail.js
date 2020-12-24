import { request } from './request.js'
//详情信息
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
//推荐信息
export function getRecommend(){
return request({
    url:'/recommend'
})
}
//商品信息
//抽离组件需要的数据
export class GoodsInfo {
    //构造函数
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = itemInfo.lowNowPrice;
    }
}

//店铺信息
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}
//参数信息

export class GoodsParam {
    constructor(info, rule) {
        //注：images可能没有值（某些商品有值，某些商品没有值）
        this.image = info.images ? info.image[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}


