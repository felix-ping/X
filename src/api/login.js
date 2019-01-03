import request from '@/utils/request'
import {
  getRole,
  setRole
} from '../utils/auth'

export function login(username, password) {
  return request({
    url: '/sysLogin',
    method: 'post',
    params: {
      username,
      password
    }
  }).then(res => {
    setRole(res.data.sysRoleId) //存储用户角色
    return res
  })
}

export function getInfo(token) {
  return new Promise((resolve, reject) => {
    // 判断角色
    const roleId = getRole()
    let role = ''
    if (roleId === '1') {
      role = 'admin'
    } else if (roleId === '2') {
      role = 'gly'
    } else if (roleId === '3') {
      role = 'dz'
    } else {
      role = 'dy'
    }
    resolve({
      'code': 200,
      'data': {
        'roles': [role],
        'name': 'admin',
        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      }
    })
  })
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
