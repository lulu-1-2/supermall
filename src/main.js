import Vue from 'vue'
import App from './App.vue'
//把router进行一个挂载
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
