import request from '@/utils/request';

// 获取品论列表
export const reqGetCommentList = (params) => {
  return request({
    url: '/v1_0/comments',
    method: 'get',
    params,
  });
};
