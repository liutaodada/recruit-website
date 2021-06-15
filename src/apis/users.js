import request from '../utils/request'

// 获取个人信息
export function getUsersInfo(params) {
  return request({
    url: '/users/getInfo',
    method:"get",
    params
  })
}
// 编辑个人信息
export function editUsersInfo(data) {
  return request({
    url: '/users/editUserInfo',
    method: "post",
    data
  })
}
// 修改密码
export function modifyPass(data) {
  return request({
    url: '/users/modifyPasswd',
    method: "post",
    data
  })
}// 上传简历
export function upload(data) {
  return request({
    url: '/upload/resume',
    method: "post",
    data
  })
}
//投递简历
export function handResumeInfo(data) {
  return request({
    url: '/index/hand/resume',
    method: "post",
    data
  })
}