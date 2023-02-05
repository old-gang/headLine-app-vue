import axios from 'axios';
import JSONbig from 'json-bigint';
// 引入仓库
import { useUserInfoStore } from '@/store/userInfo';
import { Notify } from 'vant';
// import { useRouter } from 'vue-router';
// const router = useRouter();
import router from '@/router';
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
request.interceptors.request.use(
  (config) => {
    let token = store.user?.token;
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  // http状态码为4xx，5xx，就会进入这里
  (err) => {
    return Promise.reject(err);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  // 响应状态码为401，就表示身份认证过期(token失效)，跳转登录页面
  async (err) => {
    if (err.response && err.response.status === 401) {
      const user = store.user;
      // 如果没有refresh_token,直接跳转到登录页
      if (!user || !user.refresh_token) {
        Notify({ type: 'warning', message: '身份已过期，请重新登录' });
        redirectLogin();
      } else {
        // 如果有，刷新token
        Notify({ type: 'warning', message: '身份已过期，请重新登录' });
        try {
          let res = await axios.put('http://toutiao.itheima.net/v1_0/authorizations', {
            headers: {
              Authorization: `Bearer ${user.refresh_token}`,
            },
          });
          // 刷新成功，则替换原有token
          store.USER(res.data);
          // error.config获取到的是本次请求相关的配置对象，其中包含他的method、url等信息
          return request(err.config);
        } catch (error) {
          redirectLogin();
        }
      }
    }
  },
);

function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
}

// 暴露
export default request;
