import request from '@/utils/request'
import {
  objectToFromData
} from '../utils/index'

export function sysOrderingGoodsCategoryFirstListone(storeId) { // 获取一级分类列表
  return request({
    url: '/sysOrderingGoodsCategory/firstList',
    method: 'get'
  })
}
export function sysOrderingGoodsCategoryList(id) { // 获取分类列表
  return request({
    url: '/sysOrderingGoodsCategory/list',
    method: 'get',
    params: {
      id
    }
  })
}
export function addOrEditParentClass(query) { // 商品管理 添加修改一级分类 餐饮商品分类
  return request({
    url: '/sysOrderingGoodsCategory/addOrUpdateFirstLevel',
    method: 'post',
    params: query
  })
}
export function addOrEditParentClassTwo(query) { // 商品管理 添加修改二级分类 餐饮商品分类
  return request({
    url: '/sysOrderingGoodsCategory/addOrUpdateTwoLevel',
    method: 'post',
    params: query
  })
}
export function addOrEditChildClass(query) {
  return request({
    url: '/sysCafeGoods/addSecLevel',
    method: 'post',
    params: query
  })
}

export function deleteClass(id) { // 商品管理 删除一级分类
  return request({
    url: '/sysOrderingGoodsCategory/delFirstLevel',
    method: 'delete',
    params: {
      id
    }
  })
}
export function deleteTwoClass(id) { // 商品管理 删除二级分类
  return request({
    url: '/sysOrderingGoodsCategory/delTwoLevel',
    method: 'delete',
    params: {
      id
    }
  })
}
export function orderingGoodsParamLibraryList() { // 配料库列表 POST /orderingGoodsParamLibrary/addOrUpdateFirstLevel
  return request({
    url: '/orderingGoodsParamLibrary/list',
    method: 'get'
  })
}
export function orderingGoodsScreen(query) { // 配料库列表 搜索
  return request({
    url: '/orderingGoodsParamLibrary/search',
    method: 'get',
    params: query
  })
}

export function addOrUpdateFirstLevel(query) { // 餐饮商品配料  添加修改一级分类
  return request({
    url: '/orderingGoodsParamLibrary/addOrUpdateFirstLevel',
    method: 'post',
    params: query
  })
}
export function addOrUpdateTwoLevel(query) { // 餐饮商品配料  添加修改二级分类
  return request({
    url: '/orderingGoodsParamLibrary/addOrUpdateTwoLevel',
    method: 'post',
    params: query

  })
}
export function delFirstLevel(id) { // 餐饮商品配料  删除一级分类
  return request({
    url: '/orderingGoodsParamLibrary/delFirstLevel',
    method: 'delete',
    params: {
      id
    }

  })
}
export function delTwoLevel(id) { // 餐饮商品配料  删除二级分类
  return request({
    url: '/orderingGoodsParamLibrary/delTwoLevel',
    method: 'delete',
    params: {
      id
    }

  })
}
export function saveOrUpdate(query) { // 新增餐饮商品 新增商品
  return request({
    url: '/orderingGoods/saveOrUpdate',
    method: 'post',
    params: query
  })
}
export function optionalList() { // 新增餐饮商品 规格列表
  return request({
    url: '/orderingGoodsParamLibrary/optionalList',
    method: 'get'
  })
}

export function standardList() { // 新增餐饮商品 标准配料包含可加配料 列表
  return request({
    url: '/orderingGoodsParamLibrary/standardList',
    method: 'get'
  })
}
export function getDrinkGoods(query) {
  return request({
    url: '/sysCafeGoods/goodsList',
    method: 'get',
    params: query
  })
}
export function orderingGoodsDetails(id) { //餐饮商品详情
  return request({
    url: '/orderingGoods/details',
    method: 'get',
    params: {
      id
    }
  })
}
export function orderingGoodsSetEnable(data) { // 餐饮商品上架下架  
  return request({
    url: '/orderingGoods/setEnable',
    method: 'post',
    params: data
  })
}

export function deleteGoods(id) { //餐饮商品别表删除
  return request({
    url: '/orderingGoods/del',
    method: 'delete',
    params: {
      id
    }
  })
}

export function getTypeGoodsSelectList() {
  return request({
    url: '/sysCafeGoods/goodsTypeList',
    method: 'get'
  })
}

export function getGoodsDetail(goodsId) {
  return request({
    url: '/sysCafeGoods/goodsDetail',
    method: 'get',
    params: {
      goodsId
    }
  })
}

/**
 * 上下架商品
 * @param goodsId   商品id
 * @param storeId   门店id
 * @param goodsType 商品类型：0：餐饮商品；1：预约商品
 * @param sell      上架下架状态：0:上架；1：下架
 */
export function upOrDownGoods(goodsId, storeId, goodsType, sell) {
  return request({
    url: '/sysCafeGoods/updateSell',
    method: 'post',
    params: {
      goodsId,
      storeId,
      goodsType,
      sell
    }
  })
}

/**
 * 添加或修改餐饮商品
 * @param query
 */
export function addOrEditDrink(query) {
  return request({
    url: '/sysCafeGoods/addStoreGoods',
    method: 'post',
    data: objectToFromData(query)
  })
}

/** ******************          预约类目接口               **********************/

export function getBespeakClass(query) {
  return request({
    url: '/sysCafeGoods/appointGoodsList',
    method: 'get',
    params: query
  })
}

export function deleteBespeakClass(id) {
  return request({
    url: '/sysCafeGoods/delAppointGoods',
    method: 'delete',
    params: {
      id
    }
  })
}

export function addOrEditBespeakClass(query) {
  return request({
    url: '/sysCafeGoods/addAppointGoods',
    method: 'post',
    params: query
  })
}

export function getBespeakClassDetail(id) {
  return request({
    url: '/sysCafeGoods/appointGoodsDetail',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 获取门店下拉框
 */
export function getStoreSel() {
  return request({
    url: '/sysCafeGoods/storeList',
    method: 'get'
  })
}

// 清除后台缓存
export function upDataAppForGoods() {
  return request({
    url: '/sysCafeGoods/removeCash',
    method: 'get'
  })
}
export function orderingGoodsList(data) { // 餐饮商品列表  
  return request({
    url: '/orderingGoods/list',
    method: 'get',
    params: data

  })
}

export function sysOrderingGoodsCategoryFirstList(data) { // 商品类型
  return request({
    url: '/sysOrderingGoodsCategory/firstList',
    method: 'get',
    params: {
      'code': 0,
      'data': {},
      'msg': 'string'
    }
  })
}
