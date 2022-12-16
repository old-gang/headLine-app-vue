import { defineStore } from 'pinia';
import { getItem, setItem } from '@/utils/storage';

const USER_KEY = 'toutiao-user'; //避免读取和存储的值不一致，导致出错
export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      user: getItem(USER_KEY),
    };
  },
  actions: {
    USER(data) {
      // 仓库里储存token
      this.user = data;
      // 本地存储token,防止数据丢失
      setItem(USER_KEY, data);
    },
  },
  getters: {},
});
