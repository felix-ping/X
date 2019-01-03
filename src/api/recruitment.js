import request from '@/utils/request'

export function getCompany(query) {
  return request({
    url: '/company/listByPage',
    method: 'get',
    params: query
  })
}

export function addOrEditCompany(query) {
  return request({
    url: '/company/saveOrUpdate',
    method: 'post',
    params: query
  })
}

export function removerCompany(id) {
  return request({
    url: '/company/remove',
    method: 'delete',
    params: { id }
  })
}

export function getCompanyDetail(companyId) {
  return request({
    url: '/company/detail',
    method: 'get',
    params: { companyId }
  })
}

export function getPosition(query) {
  return request({
    url: '/companyPosition/listByPage',
    method: 'get',
    params: query
  })
}

export function getCompanySelect() {
  return request({
    url: '/company/list',
    method: 'get'
  })
}

export function addOrEditPosition(query) {
  return request({
    url: '/companyPosition/saveOrUpdate',
    method: 'post',
    params: query
  })
}

export function getPositionDetail(id) {
  return request({
    url: '/companyPosition/detail',
    method: 'get',
    params: { id }
  })
}

export function setPositionTop(query) {
  return request({
    url: '/companyPosition/topping',
    method: 'post',
    params: query
  })
}

export function deletePosition(id) {
  return request({
    url: '/companyPosition/remove',
    method: 'delete',
    params: { id }
  })
}

// export function deleteAccount(id) {
//   return request({
//     url: '/sysUser/remove',
//     method: 'delete',
//     params: { id }
//   })
// }
//
// export function getAccountDetail(id) {
//   return request({
//     url: '/sysUser/details',
//     method: 'get',
//     params: { id }
//   })
// }
//
// export function editAccount(query) {
//   return request({
//     url: '/sysUser/update',
//     method: 'post',
//     params: query
//   })
// }
//
// export function addAccount(query) {
//   return request({
//     url: '/sysUser/save',
//     method: 'post',
//     params: query
//   })
// }

