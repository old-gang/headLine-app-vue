import axios from 'axios';
// 引入仓库
import { useUserInfoStore } from '@/store/userInfo';
const store = useUserInfoStore();
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000,
});

// 请求拦截器
request.interceptors.request.use((config) => {
  let token = store.user?.token;
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

// 响应拦截器
request.interceptors.response.use((res) => {
  return res.data;
});

// 暴露
export default request;
