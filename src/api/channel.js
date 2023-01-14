// 频道相关请求模块
import request from '@/utils/request';

// 获取所有频道列表
export const reqAllChannels = () =>
  request({
    url: '/v1_0/channels',
    method: 'get',
  });

// 更新用户已选频道列表
export const reqUpdataUserChannel = (data) =>
  request({
    url: '/v1_0/user/channels',
    method: 'patch',
    data,
  });

// 删除用户选中的频道列表
export const reqDelUserChannel = (channelId) =>
  request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'delete',
  });
