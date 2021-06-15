import request from '../utils/request'

//登录
export function Login(data) {
  return request({
    url: `/users/login`,
    method: "post",
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
//发送验证码
export function sendCodeInfo(params) {
  return request({
    url: 'users/code',
    method: 'get',
    params
  })
}
//注册
export function Register(data) {
  return request({
    url:`/users/reg`,
    method:"post",
    data
  })
}
