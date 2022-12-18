/*
 * 用户相关接口
 */

import request from '@/utils/request';

// 登录
export const login = (data) => request.post('/v1_0/authorizations', data);

// 发送验证码
export const sendSms = mobile => request.get(`/v1_0/sms/codes/${mobile}`)

// 获取当前用户信息
export const currentUser = () => request.get('/v1_0/user')

// 获取用户频道列表
export const reqUserChannels = () => request.get('/v1_0/user/channels')