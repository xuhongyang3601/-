import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import mint from "mint-ui";
import "mint-ui/lib/style.min.css";
axios.defaults.baseURL = "http://127.0.0.1:3030";
Vue.prototype.axios = axios;
Vue.use(mint);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
