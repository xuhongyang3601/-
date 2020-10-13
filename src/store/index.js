import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pname: sessionStorage.getItem("pname") || "北京",
    cname: sessionStorage.getItem("cname") || "海淀",
    uid: sessionStorage.getItem("uid") || "",
  },
  mutations: {
    add(state, payload) {
      // console.log(payload);
      [state.pname, state.cname] = payload;
      console.log(state.pname, state.cname);
    },
    isLogin(state, payload) {
      state.uid = payload;
      // console.log(state.uid);
    },
  },
  actions: {},
  modules: {},
});
