import Vue from 'vue'
import App from './App.vue'
//把router进行一个挂载
import router from './router'

Vue.config.productionTip = false
//通过原型把$bus加入到vue中，并且赋值给vue实例
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
