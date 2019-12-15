import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/lib/Animate.css";
import router from './router'
import $ from 'jquery';
import qs from 'qs';

Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false
Vue.prototype.$qs = qs;
Vue.prototype.$ = $;
window.$ = $;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')