// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import store from './store'
//import fastclick from 'fastclick'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

//fastclick.attach(document.body)

import './lib/mui/css/icons-extra.css'
import Mui from 'vue-awesome-mui'
import 'vue-awesome-mui/mui/dist/css/mui.min.css'
import 'vue-awesome-mui/mui/dist/js/mui.js'
Vue.use(Mui)

import 'element-ui/lib/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import element from 'element-ui'
Vue.use(element)
import axios from 'axios'
//相当于const axios = reuiqre("axios")
Vue.config.productionTip = false;
axios.default.withCredentials = true;
Vue.prototype.axios = axios;//加到原型对象中 公用；默认不带cookie,导致无法使用服务器端





Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
