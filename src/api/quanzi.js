import request from '@/utils/request'

export function getQuanzi(query) {
  return request({
    url: '/sysCircle/list',
    method: 'get',
    params: query
  })
}

export function deleteQuanzi(id) {
  return request({
    url: '/sysCircle/remove',
    method: 'delete',
    params: { id }
  })
}

export function getQuanziUser(query) {
  return request({
    url: '/sysCircle/circleUserList',
    method: 'get',
    params: query
  })
}

export function addOrEditQuanzi(query) {
  return request({
    url: '/sysCircle/saveOrUpdate',
    method: 'post',
    params: query
  })
}
