/*
 * 用户相关接口
 */

import request from '@/utils/request';

// 登录
export const login = (data) => request.post('/v1_0/authorizations', data);

// 发送验证码
export const sendSms = (mobile) => request.get(`/v1_0/sms/codes/${mobile}`);

// 获取当前用户信息
export const currentUser = () => request.get('/v1_0/user');

// 获取用户频道列表
export const reqUserChannels = () => request.get('/v1_0/user/channels');

// 获取用户频道列表
export const reqGetUserProfile = () => request.get('/v1_0/user/profile');

// 修改用户资料
export const updateUserProfile = (data) =>
  request({
    method: 'patch',
    url: '/v1_0/user/profile',
    data,
  });

// 修改用户头像
export const updateUserPhoto = (data) =>
  request({
    method: 'patch',
    url: '/v1_0/user/photo',
    data,
  });
