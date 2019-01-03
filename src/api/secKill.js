import request from '@/utils/request'
// import {
//   objectToFromData
// } from '../utils/index'
export function getGoods(query) {
  GET / sysStore / listByOperate
  return request({
    url: '/sysSecondKillGoods/list',
    method: 'get',
    params: query
  })
}
export function listByOperate(query) { //获取开业店铺list
  return request({
    url: '/sysStore/listByOperate',
    method: 'get',

  })
}
export function sysSecondKillGoodsSort(query) { //卷的分类列表  1 2 级     /sysSecondKillGoods/storeGoodsList
  return request({
    url: '/sysSecondKillGoods/sort',
    method: 'get',
  })
}
export function storeGoodsList(query) { //卷的分类列表  3 4 级     
  return request({
    url: '/sysSecondKillGoods/storeGoodsList',
    method: 'get',
    params: query
  })
}
export function sysSecondKillGoodsSaveOrUpdate(query) { //卷的分类列表  3 4 级     
  return request({
    url: '/sysSecondKillGoods/saveOrUpdate',
    method: 'post',
    params: query
  })
}
