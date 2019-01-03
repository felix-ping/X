import request from '@/utils/request'

const mockData = {
  'code': 200,
  'msg': 'OK',
  'data': {
    'vips': [{
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    },
    {
      'id': 213,
      'name': '张三',
      'age': 1, // 1 男 2 女
      'mobile': 15168472715
    }
    ],
    'total': 95,
    'size': 10,
    'current': 1,
    'pages': 10
  }
}

export function fetchList(query) {
  return new Promise((resolve, reject) => {
    resolve(mockData)
  })
}

export function fetchRule() {
  return request({
    url: '/vip/rule',
    method: 'get'
  })
}

export function getVip(query) {
  return request({
    url: '/userMember/list',
    method: 'get',
    params: query
  })
}

export function getVipDetail(userId) {
  return request({
    url: '/userMember/details',
    method: 'get',
    params: { userId }
  })
}

export function getCircleListForSelect() {
  return request({
    url: '/userMember/circleList',
    method: 'get'
  })
}

export function addVirtualVip(query) {
  return request({
    url: '/userMember/addXnUser',
    method: 'post',
    params: query
  })
}
