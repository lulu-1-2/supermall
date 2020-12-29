import Vue from 'vue'
import App from './App.vue'
//把router进行一个挂载
import router from './router'
//把store进行一个挂载
import store from './store'
//主要是为了导入index.js文件
import toast from 'components/common/toast'
Vue.config.productionTip = false
//通过原型把$bus加入到vue中，并且赋值给vue实例
Vue.prototype.$bus = new Vue();
//安装toast插件,会执行toast的install方法
Vue.use(toast);


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
