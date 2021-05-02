import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : {},
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    userid: localStorage.getItem("userid")
      ? JSON.parse(localStorage.getItem("userid"))
      : {},
    admin: localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin"))
      : {},
  },
  mutations: {
    addAdmin(state, payload) {
      state.admin = payload;
    },
    addUser(state, payload) {
      state.user = payload;
    },
    addUserID(state, payload) {
      state.userid = payload;
    },
    addToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {},
  modules: {},
});
