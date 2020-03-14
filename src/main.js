import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Elemnet from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/reset.css'
import JsonViewer from 'vue-json-viewer';
import 'vue-json-viewer/style.css'
import apiurl from './api/apiurl'
import http from './api/config'

//引入公共模块

Vue.use(Elemnet);
Vue.use(JsonViewer);

Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$url = apiurl;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
scrollX