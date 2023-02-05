import request from '@/utils/request';

// 联想建议
export const getSearchSuggests = (data) => request.get(`/v1_0/suggestion?q=${data}`);

// 搜索结果
export const getSearchResults = (params) =>
  request({
    method: 'get',
    url: '/v1_0/search',
    params,
  });
