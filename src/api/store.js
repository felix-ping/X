import request from '@/utils/request'

export function getStore(query) {
  return request({
    url: '/sysStore/list',
    method: 'get',
    params: query
  })
}

export function addOrEditStore(query) {
  return request({
    url: '/sysStore/saveStoreInfo',
    method: 'post',
    params: query
  })
}

export function getStoreDetail(storeId) {
  return request({
    url: '/sysStore/storeInfo',
    method: 'get',
    params: {
      storeId
    }
  })
}

export function sysStoreOrderingGoodsList(data) { // 门店商品列表商品列表  
  return request({
    url: '/sysStoreOrderingGoods/list',
    method: 'get',
    params: data

  })
}
export function sysStoreOrderingGoodsGoodList() { // 或取商品信息  
  return request({
    url: '/sysStoreOrderingGoods/goodList',
    method: 'get',
  })
}

export function sysStoreOrderingGoodsSaveGoods(data) { // 添加门店商品  
  return request({
    url: '/sysStoreOrderingGoods/saveGoods',
    method: 'post',
    params: data
  })
}
export function sysStoreOrderingGoodsDelete(id) { // 删除门店商品  
  return request({
    url: '/sysStoreOrderingGoods/del',
    method: 'delete',
    params: {
      id: id
    }
  })
}
export function sysStoreOrderingGoodsDetails(id) { // 门店商品详情  
  return request({
    url: '/sysStoreOrderingGoods/details',
    method: 'get',
    params: {
      id: id
    }
  })
}
export function sysStoreOrderingGoodSetEnable(data) { // 门店商品上架下架  
  return request({
    url: '/sysStoreOrderingGoods/setEnable',
    method: 'post',
    params: data
  })
}
