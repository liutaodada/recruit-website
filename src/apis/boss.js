import request from '../utils/request'

// 填写公司信息
export function releaseCompanyInfo(data) {
  return request({
    url: '/boss/users/release',
    method: "post",
    data
  })
}
// 修改公司司信息
export function modifyCompanyInfo(data) {
  return request({
    url: '/boss/users/modify',
    method: "post",
    data
  })
}
// 获取公司信息
export function getCompanyInfo(params) {
  return request({
    url: '/boss/company/info',
    method: "get",
    params
  })
}
// 发布职位信息
export function releaseJobInfo(data) {
  return request({
    url: '/boss/job/release',
    method: "post",
    data
  })
}
// 获取职位信息
export function getJobList(params) {
  return request({
    url: '/boss/job/getinfo',
    method: "get",
    params
  })
}
// 修改职位信息
export function editJobInfo(data) {
  return request({
    url: '/boss/job/edit',
    method: 'post',
    data
  })
}
// 删除职位信息
export function delJobInfo(params) {
  return request({
    url: '/boss/job/del',
    method: "get",
    params
  })
}
// 查看投递信息
export function watchHandInfo(params) {
  return request({
    url: '/boss/ishand',
    method: "get",
    params
  })
}