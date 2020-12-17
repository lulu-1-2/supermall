import axios from 'axios'

//第四种方法，promise
export function request(config) {
    //1.创建axios实例
    const instance = axios.create({
        // baseURL: 'http://123.207.32.32:8000',
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    //2.axios的拦截器
    // axios.interceptors,全局拦截
    //2.1请求拦截的作用
    //1.config中的一些信息不符合服务器的要求（拦截对发送的信息做一些修改或者扩展）
    //2.每次发送网络请求时，都希望在界面中显示一个请求图标，请求成功show出来，响应成功时隐藏掉
    //3.某些网络请求（比如登录（token））,必须携带一些特殊的信息
    //use传入两个函数参数
    instance.interceptors.request.use(config => {
        //请求发送成功时拦截
        //console.log(config)
        return config;
    }, err => {
        console.log(err)
    })
    //2.2响应拦截
    instance.interceptors.response.use(result => {
        //console.log(result)
        return result.data;
    }, err => {
        //console.log(err)
    })

    //3.发送真正的网络请求
    return instance(config)

}


