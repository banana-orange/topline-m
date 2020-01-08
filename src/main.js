import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/register-vant'

import 'amfe-flexible'

import './styles/index.less' // 引入css样式

import './utils/validation' // 引入校验表单js文件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
