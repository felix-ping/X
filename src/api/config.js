import request from '@/utils/request'
export function getBanners(query) {
  return request({
    url: '/operateBanner/list',
    method: 'get',
    params: query
  })
}

export function getBannerDetail(id) {
  return request({
    url: '/operateBanner/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export function removeBanner(id) {
  return request({
    url: '/operateBanner/remove',
    method: 'delete',
    params: {
      id
    }
  })
}

export function updateBanner(query) {
  return request({
    url: '/operateBanner/update',
    method: 'post',
    params: query
  })
}

export function addBanner(query) {
  return request({
    url: '/operateBanner/save',
    method: 'post',
    params: query
  })
}
