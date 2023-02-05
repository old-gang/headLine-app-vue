import axios from 'axios';
import JSONbig from 'json-bigint';
// 引入仓库
import { useUserInfoStore } from '@/store/userInfo';
const store = useUserInfoStore();
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000,
  transformResponse: [
    function (data) {
      // 后端返回的数据可能不是JSON格式字符串
      // 如果不是的话，那么JSONbig.parse调用就会报错
      // 所以我们使用try-catch 来捕获异常，处理异常的发生
      try {
        // 如果转化成功，则直接把结果返回
        return JSONbig.parse(data);
      } catch (error) {
        // 如果转换失败，则进入这里
        // 我们在这里吧数据直接返回给请求使用
        return data;
      }
    },
  ],
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
