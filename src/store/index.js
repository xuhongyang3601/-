import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pname: sessionStorage.getItem("pname"),
    cname: sessionStorage.getItem("cname"),
    uid: sessionStorage.getItem("uid") || "",
    first: true,
  },
  mutations: {
    add(state, payload) {
      // console.log(payload);
      [state.pname, state.cname] = payload;
      // console.log(state.pname, state.cname);
    },
    isLogin(state, payload) {
      state.uid = payload;
      // console.log(state.uid);
    },
    changeFirst(state) {
      state.first = false;
    },
  },
  actions: {
    now(context) {
      return new Promise((reslove, reject) => {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((r) => {
          if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
            var lat = r.address.lat; //当前经度
            var lng = r.address.lng; //当前纬度
            var province = r.address.province; //返回当前省份
            var city = r.address.city; //返回当前城市
            province = province.replace("省", "");
            city = city.replace("市", "");
            console.log(province, city);
            context.commit("add", [province, city]);
            reslove();
          }
        });
      });
    },
  },
  modules: {},
});
