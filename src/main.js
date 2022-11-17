import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import dataV from '@jiaminghi/data-view';

Vue.use(ElementUI);
Vue.use(dataV);

Vue.prototype.$echarts = echarts;
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');