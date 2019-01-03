import request from '@/utils/request'

export function getHostActivity(query) {
  return request({
    url: '/operateActivity/list',
    method: 'get',
    params: query
  })
}

export function getHostActivityDetail(id) {
  return request({
    url: '/operateActivity/details',
    method: 'get',
    params: { id }
  })
}

export function removeHostActivity(id) {
  return request({
    url: '/operateActivity/remove',
    method: 'delete',
    params: { id }
  })
}

export function addOrEditHostActivity(query) {
  return request({
    url: '/operateActivity/saveOrUpdate',
    method: 'post',
    params: query
  })
}

export function getStoreActivity(query) {
  return request({
    url: '/storeDynamic/list',
    method: 'get',
    params: query
  })
}

export function deleteStoreActivity(id) {
  return request({
    url: '/storeDynamic/remove',
    method: 'delete',
    params: { id }
  })
}

export function getStoreActivityDetail(id) {
  return request({
    url: '/storeDynamic/selectOne',
    method: 'get',
    params: { id }
  })
}

export function addOrEditStoreActivity(query) {
  return request({
    url: '/storeDynamic/saveOrUpdate',
    method: 'post',
    params: query
  })
}

