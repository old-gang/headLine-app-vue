import { createStore } from 'vuex';
import { getItem, setItem } from '@/utils/storage';

const USER_KEY = 'toutiao-user'; // 避免读取和存储的值不一致，导致出错
export default createStore({
  state: {
    // user: JSON.parse(localStorage.getItem('user')), // 当前用户登录的状态
    user: getItem(USER_KEY), // 当前用户登录的状态
  },
  mutations: {
    setUser(state, data) {
      state.user = data;
      // 防止数据丢失，需要存储在本地
      setItem(USER_KEY, state.user);
    },
  },
  actions: {},
  modules: {},
});
