import request from '../utils/request'

// 用户相关接口

// 用户登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
