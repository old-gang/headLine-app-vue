/*
 * 用户相关接口
 */

import request from '@/utils/request';

// 登录
export const login = (data) => request.post('/v1_0/authorizations', data);

// 发送验证码
export const sendSms = mobile => request.get(`/v1_0/sms/codes/${mobile}`)