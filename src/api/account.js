import request from '@/utils/request'

export function getAccount(query) {
  return request({
    url: '/sysUser/list',
    method: 'get',
    params: query
  })
}

export function deleteAccount(id) {
  return request({
    url: '/sysUser/remove',
    method: 'delete',
    params: { id }
  })
}

export function getAccountDetail(id) {
  return request({
    url: '/sysUser/details',
    method: 'get',
    params: { id }
  })
}

export function editAccount(query) {
  return request({
    url: '/sysUser/update',
    method: 'post',
    params: query
  })
}

export function addAccount(query) {
  return request({
    url: '/sysUser/save',
    method: 'post',
    params: query
  })
}

