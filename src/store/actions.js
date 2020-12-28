import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default {
    //如果传递的参数不是一个，我们通常会以对象的形式传递
    //然后再从对象中取出相关的信息，payload是一个对象
    addCart(context, payload) {
        // state.cartList.push(payload);
        //查找之前数组中是否有该商品
        //find函数的参数是一个函数
        //函数返回值就是一个表达式且只有一行时， return也可以省略， 直接返回了 todo.id === id的结果（true或false）
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
        if (oldProduct) {
            // oldProduct.count += 1;
            context.commit(ADD_COUNTER, oldProduct);
        } else {
            payload.count = 1;
            // state.cartList.push(payload);
            context.commit(ADD_TO_CART, payload);
        }
    }
}