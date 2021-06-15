import request from '../utils/request'

// 获取热招职位信息
export function getHotJobInfo(params) {
  return request({
    url: '/index/hotjob',
    method: "get",
    params
  })
}
// 获取热门公司信息
export function getHotCompanyInfo(params) {
  return request({
    url: '/index/hotcompany',
    method: 'get',
    params
  })
}
// 收藏职位
export function toCollectionJob(data) {
  return request({
    url: '/user/collection',
    method: "post",
    data
  })
}
// 查询职位是否收藏
export function isCollectionJob(params) {
  return request({
    url: '/index/iscollection',
    method: "get",
    params
  })
}
// 取消收藏
export function cancelCollection(data) {
  return request({
    url: '/user/cancel/collection',
    method: "post",
    data
  })
}
// 进入职位详情时获取公司信息
export function getTheCompanyInfo(params) {
  return request({
    url: '/index/company/info',
    method: "get",
    params
  })
}
// 条件查询职位信息
export function searchJob(params) {
  return request({
    url: '/index/searchjob',
    method: "get",
    params
  })
}
// 条件查询职位信息
export function searchCompany(params) {
  return request({
    url: '/index/allcompany',
    method: "get",
    params
  })
}
// 获取职位类型列表
export function getJobTypeList(params) {
  return request({
    url: '/index/jobtype',
    method: 'get',
    params
  })
}
// 上传文件
export function uploadResume(data) {
  return request({
    url: '/upload',
    method:"post",
    data
  })
}
// 查看是否向该职位投递简历
export function isHandResume(params) {
  return request({
    url: '/index/ishand',
    method:"get",
    params
  })
}