import axios from "axios";

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 20000
})

// 请求拦截器


// 响应拦截器


// 暴露
export default request