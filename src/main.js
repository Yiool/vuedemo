// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import store from './store/store'
import { Loadmore ,Button } from 'mint-ui';

Vue.component(Button.name, Button)
Vue.component(Loadmore.name, Loadmore)
Vue.use(VueAxios, axios)

// Vue.use(VueLazyload, {
//   preLoad: 1.3,
//   error: '',
//   loading: 'http://cdn.uehtml.com/201402/1392662591495_1140x0.gif',
//   try: 3,
//   listenEvents: [ 'scroll', 'mousewheel' ]
// });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
