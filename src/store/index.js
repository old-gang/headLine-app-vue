import { createStore } from 'vuex';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')), // 当前用户登录的状态
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
    },
  },
  actions: {},
  modules: {},
});
