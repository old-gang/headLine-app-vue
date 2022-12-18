import request from '@/utils/request';

// 获取文章列表
export const reqGetArticles = (params) =>
  request({
    url: '/v1_0/articles',
    method: 'get',
    params,
  });
