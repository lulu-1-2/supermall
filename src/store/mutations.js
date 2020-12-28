import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
    //mutations中的每个方法尽可能完成的事件比较单一
    //复杂的操作可以放在actions里完成
    //增加数量
    [ADD_COUNTER](state, payload) {
        payload.count++;
    },
    //添加到购物车
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload);
    }
}