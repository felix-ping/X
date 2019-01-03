import request from '@/utils/request'

export function getImgText(query) {
  return request({
    url: '/userDynamic/list',
    method: 'get',
    params: query
  })
}

export function deleteImgText(id) {
  return request({
    url: '/userDynamic/remove',
    method: 'delete',
    params: {
      id
    }
  })
}

export function getImgTextDetail(id) {
  return request({
    url: '/userDynamic/details',
    method: 'get',
    params: {
      id
    }
  })
}

export function getCircle(query) {
  return request({
    url: '/userCircleDynamic/list',
    method: 'get',
    params: query
  })
}

export function deleteCircle(id) {
  return request({
    url: '/userCircleDynamic/remove',
    method: 'delete',
    params: {
      id
    }
  })
}

export function getCircleDetail(id) {
  return request({
    url: '/userCircleDynamic/details',
    method: 'get',
    params: {
      id
    }
  })
}

export function getIdea(query) {
  return request({
    url: '/userIdea/list',
    method: 'get',
    params: query
  })
}

export function deleteIdea(id) {
  return request({
    url: '/userIdea/remove',
    method: 'delete',
    params: {
      id
    }
  })
}

export function getIdeaDetail(id) {
  return request({
    url: '/userIdea/details',
    method: 'get',
    params: {
      id
    }
  })
}

export function getVipCheck(query) {
  return request({
    url: '/userMemberAuth/memberAuthList',
    method: 'post',
    params: query
  })
}

export function getVipCheckDetail(userId) {
  return request({
    url: '/userMemberAuth/memberAuthInfo',
    method: 'get',
    params: {
      userId
    }
  })
}

export function checkVip(query) {
  return request({
    url: '/userMemberAuth/saveMemberAuth',
    method: 'post',
    params: query
  })
}

export function getVirtualSelect(nickName) {
  return request({
    url: '/userDynamic/getUserId',
    method: 'get',
    params: {
      nickName
    }
  })
}

export function addImgText(query) {
  return request({
    url: '/userDynamic/addXnTw',
    method: 'post',
    params: query
  })
}

export function getVipCircleSelect(userId) {
  return request({
    url: '/userCircleDynamic/getUserCircleList',
    method: 'get',
    params: {
      userId
    }
  })
}

export function getSelllerJoin(query) {
  return request({
    url: '/Merchant/list',
    method: 'get',
    params: query
  })
}

export function getSelllerJoinDetail(id) {
  return request({
    url: '/Merchant/details',
    method: 'get',
    params: {
      id
    }
  })
}

export function deleteSelllerJoin(id) {
  return request({
    url: '/Merchant/remove',
    method: 'delete',
    params: {
      id
    }
  })
}
export function toolDictList() {
  return request({
    url: '/toolDict/list',
    method: 'get',
    params: {
      labelKey: 'index'
    }
  })
}
export function getwishAuditDetail() { //获取心愿单详情
  // return request({
  //   url: '/toolDict/list',
  //   method: 'get',
  //   params: {
  //     labelKey: 'index'
  //   }
  // })
}
