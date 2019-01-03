import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '',
    component: Layout
  }

  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [{
    path: '/vip',
    component: Layout,
    name: 'vip',
    meta: {
      title: '会员管理',
      icon: 'example',
      role: ['gly']
    },
    children: [{
        path: 'index',
        component: () => import('@/views/vip/index'),
        name: 'vipIndex',
        meta: {
          title: '会员列表',
          icon: 'example',
          keepAlive: true
        }
      },
      {
        path: 'addVirtualVip',
        component: () => import('@/views/vip/addVirtualVip'),
        name: 'AddVirtualVip',
        meta: {
          title: '新增虚拟用户',
          icon: 'example',
          keepAlive: false
        }
      },
      {
        path: 'detial',
        hidden: true,
        component: () => import('@/views/vip/detial'),
        name: 'vipDetial',
        props: {
          newsletterPopup: false
        },
        meta: {
          title: '会员详情',
          icon: 'example',
          keepAlive: false
        }
      }
    ]
  },

  {
    path: '/check',
    component: Layout,
    name: 'check',
    meta: {
      title: '审核管理',
      icon: 'example',
      role: ['gly']
    },
    children: [{
        path: 'imgText',
        component: () => import('@/views/check/imgText'),
        name: 'ImgText',
        meta: {
          title: '精彩图文',
          icon: 'example',
          keepAlive: true
        }
      },
      {
        path: 'addImgText',
        component: () => import('@/views/check/addImgText'),
        name: 'AddImgText',
        meta: {
          title: '新增精彩图文',
          icon: 'example',
          keepAlive: false
        }
      },
      {
        path: 'imgTextDetail',
        hidden: true,
        component: () => import('@/views/check/imgTextDetail'),
        name: 'imgTextDetail',
        props: {
          newsletterPopup: false
        },
        meta: {
          title: '图文详情',
          icon: 'example',
          keepAlive: false
        }
      },
      {
        path: 'circle',
        component: () => import('@/views/check/circle'),
        name: 'Circle',
        meta: {
          title: '圈子审核',
          icon: 'example',
          keepAlive: true
        }
      },
      {
        path: 'addCircleDynamic',
        component: () => import('@/views/check/addCircleDynamic'),
        name: 'AddCircleDynamic',
        meta: {
          title: '新增圈子动态',
          icon: 'example',
          keepAlive: false
        }
      },
      {
        path: 'circleDetail',
        hidden: true,
        component: () => import('@/views/check/circleDetail'),
        name: 'CircleDetail',
        props: {
          newsletterPopup: false
        },
        meta: {
          title: '圈子详情',
          icon: 'example',
          keepAlive: false
        }
      },
      {
        path: 'idea',
        component: () => import('@/views/check/idea'),
        name: 'idea',
        meta: {
          title: 'idea审核',
          icon: 'example',
          keepAlive: true
        }
      },
      // {
      //   path: 'wishAudit',
      //   component: () => import('@/views/check/wishAudit'),
      //   name: 'WishAudit',
      //   meta: {
      //     title: '心愿审核',
      //     icon: 'example',
      //     keepAlive: true
      //   }
      // },
      {
        path: 'wishAuditDetail',
        hidden: true,
        component: () => import('@/views/check/wishAuditDetail'),
        name: 'WishAuditDetail',
        meta: {
          title: '心愿单详情',
          icon: 'example',
          keepAlive: false
        }
      },

      {
        path: 'ideaDetail',
        hidden: true,
        component: () => import('@/views/check/ideaDetail'),
        name: 'IdeaDetail',
        props: {
          newsletterPopup: false
        },
        meta: {
          title: 'idea详情',
          icon: 'example',
          keepAlive: false
        }
      },
      {
        path: 'vip',
        component: () => import('@/views/check/vip'),
        name: 'checkVip',
        meta: {
          title: '会员审核',
          icon: 'example',
          keepAlive: true
        }
      },
      {
        path: 'vipDetail',
        hidden: true,
        component: () => import('@/views/check/vipDetail'),
        name: 'VipDetail',
        props: {
          newsletterPopup: false
        },
        meta: {
          title: '会员审核详情',
          icon: 'example',
          keepAlive: false
        }
      },
      {
        path: 'sellerJoin',
        component: () => import('@/views/check/sellerJoin'),
        name: 'SellerJoin',
        meta: {
          title: '商场入驻',
          icon: 'example',
          keepAlive: false
        }
      },
      {
        path: 'sellerJoinDetail',
        hidden: true,
        component: () => import('@/views/check/sellerJoinDetail'),
        name: 'SellerJoinDetail',
        props: {
          newsletterPopup: false
        },
        meta: {
          title: '商场入驻详情',
          icon: 'example',
          keepAlive: true
        }
      },
      {
        path: 'withdrawList',
        component: () => import('@/views/check/withdrawList'),
        name: 'WithdrawList',
        meta: {
          title: '提现审核',
          icon: 'example',
          keepAlive: true
        }
      },
      {
        path: 'withdrawDetail',
        hidden: true,
        component: () => import('@/views/check/withdrawDetail'),
        name: 'WithdrawDetail',

        meta: {
          title: '提现详情',
          icon: 'example',
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/store',
    component: Layout,
    redirect: '/store/store',
    name: 'dianpu',
    meta: {
      title: '店铺管理',
      icon: 'example',
      role: ['']
    },
    children: [{
        path: 'storeList',
        name: 'StoreList',
        component: () => import('@/views/store/store'),
        meta: {
          title: '店铺中心列表',
          icon: 'table',
          keepAlive: true
        },
        children: []
      },
      {
        path: 'storeCenterList',
        name: 'storeCenterList',
        hidden: true,
        component: () => import('@/views/store/storeCenterList'),
        meta: {
          title: '店铺商品列表',
          icon: 'table',
          keepAlive: false
        }
        // children: []
      },
      {
        path: 'addStore',
        name: 'addStore',
        hidden: true,
        component: () => import('@/views/store/addstore'),
        meta: {
          title: '新增店铺商品',
          icon: 'table',
          keepAlive: false
        }
        // children: []
      },
      {
        path: 'storeCommodityDetail',
        name: 'storeCommodityDetail',
        hidden: true,
        component: () => import('@/views/store/storeCommodityDetail'),
        meta: {
          title: '店铺商品详情',
          icon: 'table',
          keepAlive: false
        }
        // children: []
      },
      {
        path: 'storeDetail',
        name: 'storeDetail',
        hidden: true,
        component: () => import('@/views/store/storeDetail'),
        props: {
          newsletterPopup: false
        },
        meta: {
          title: '店铺详情',
          icon: 'table',
          keepAlive: false
        }
      }
    ]
  },

  {
    path: '/quanzi',
    component: Layout,
    redirect: '/quanzi/quanzi',
    name: 'quanzi',
    meta: {
      title: '圈子管理',
      icon: 'example',
      role: ['gly']
    },
    children: [{
        path: 'quanzi',
        name: 'QuanziList',
        component: () => import('@/views/quanzi/quanzi'),
        meta: {
          title: '圈子列表',
          icon: 'table',
          keepAlive: true
        },
        children: []
      },
      {
        path: 'quanziUser',
        name: 'QuanziUser',
        hidden: true,
        component: () => import('@/views/quanzi/quanziUser'),
        props: {
          newsletterPopup: false
        },
        meta: {
          title: '圈子人员工管理',
          icon: 'table',
          keepAlive: false
        }
      }
    ]
  },

  {
    path: '/commodity',
    component: Layout,
    redirect: '/commodity/RepastProductsTable',
    name: 'commodity',
    meta: {
      title: '商品管理',
      icon: 'example',
      role: []
    },
    children: [{
        path: 'drinkDetail',
        name: 'DrinkDetail',
        hidden: true,
        component: () => import('@/views/commodity/drinkDetail/drinkDetail'),
        props: {
          newsletterPopup: false
        },
        meta: {
          title: '餐饮商品详情',
          icon: 'table',
          keepAlive: false
        }
      },
      {
        path: 'repast-products-table',
        name: 'RepastProductsTable',
        component: () => import('@/views/commodity/repastProductsTable/RepastProductsTable'),
        meta: {
          title: '餐饮商品',
          icon: 'table',
          keepAlive: true
        }
      },
      {
        path: 'drinkclass',
        name: 'DrinkClass',
        component: () => import('@/views/commodity/drinkClass/drinkClass'),
        meta: {
          title: '餐饮商品分类',
          icon: 'table',
          keepAlive: true
        }
      },
      {
        path: 'addProductIbrary',
        name: 'AddProductIbrary',
        hidden: true,
        component: () => import('@/views/commodity/addProductIbrary/addProductIbrary'),
        meta: {
          title: '编辑/添加餐饮商品',
          icon: 'table',
          keepAlive: false
        }
      },

      {
        path: 'ingredients-library',
        name: 'IngredientsLibrary',
        component: () => import('@/views/commodity/ingredientsLibrary/ingredientsLibrary'),
        meta: {
          title: '配料库',
          icon: 'table',
          keepAlive: true
        }
      }
    ]
  },
  // {
  //   path: '/content',
  //   component: Layout,
  //   redirect: '/content/messagePush/messagePushList',
  //   name: 'Content',
  //   meta: {
  //     title: '内容管理',
  //     icon: 'example',
  //   },
  //   children: [{
  //       path: 'messagePushList',
  //       name: 'MessagePushList',

  //       component: () => import('@/views/content/messagePush/messagePushList'),
  //       meta: {
  //         title: '消息推送',
  //         icon: 'table',
  //         keepAlive: true
  //       },
  //       children: []
  //     },
  //     {
  //       path: 'messagePushEditor',
  //       name: 'MessagePushEditor',
  //       hidden: true,
  //       component: () => import('@/views/content/messagePush/messagePushEditor'),
  //       meta: {
  //         title: '消息编辑页面',
  //         icon: 'table',
  //         keepAlive: false
  //       }
  //     },
  //   ]
  // },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    name: 'Account',
    meta: {
      title: '账号管理',
      icon: 'example',
      role: []
    },
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/account/index'),
      hidden: true,
      meta: {
        title: '账号列表',
        icon: 'table',
        keepAlive: true
      }
    }]
  },

  {
    path: '/config',
    component: Layout,
    redirect: '/config/banner',
    name: 'Config',
    meta: {
      title: '配置管理',
      icon: 'example',
      role: []
    },
    children: [{
      path: 'banner',
      name: 'Banner',
      component: () => import('@/views/config/banner'),
      hidden: true,
      meta: {
        title: 'Banner配置',
        icon: 'table',
        keepAlive: false
      }
    }, ]
  },

  // {
  //   path: '/order',
  //   component: Layout,
  //   redirect: '/order/drinkOrder',
  //   name: 'Order',
  //   meta: { title: '订单管理', icon: 'example', role: [] },
  //   children: [
  //     {
  //       path: 'drinkOrder',
  //       name: 'DrinkOrder',
  //       component: () => import('@/views/order/drinkOrder'),
  //       hidden: true,
  //       meta: { title: '餐饮订单', icon: 'table' ,keepAlive: true}
  //     }
  //     // {
  //     //   path: 'promiseOrder',
  //     //   name: 'PromiseOrder',
  //     //   component: () => import('@/views/order/PromiseOrder'),
  //     //   hidden: true,
  //     //   meta: { title: '预约订单', icon: 'table',keepAlive: true }
  //     // }
  //   ]
  // },

  {
    path: '/recruitment',
    component: Layout,
    redirect: '/recruitment/position',
    name: 'Recruitment',
    meta: {
      title: '招聘管理',
      icon: 'example',
      role: []
    },
    children: [{
        path: 'position',
        name: 'Position',
        component: () => import('@/views/recruitment/position'),
        meta: {
          title: '职位信息',
          icon: 'table',
          keepAlive: true
        }
      },
      {
        path: 'positionDetail',
        name: 'PositionDetail',
        component: () => import('@/views/recruitment/positionDetail'),
        meta: {
          title: '职位详情',
          icon: 'table',
          keepAlive: false
        },
        props: {
          newsletterPopup: false
        },
        hidden: true
      },
      {
        path: 'company',
        name: 'Company',
        component: () => import('@/views/recruitment/company'),
        meta: {
          title: '公司信息',
          icon: 'table',
          keepAlive: true
        }
      },
      {
        path: 'companyDetail',
        name: 'CompanyDetail',
        component: () => import('@/views/recruitment/companyDetail'),
        meta: {
          title: '公司详情',
          icon: 'table',
          keepAlive: false
        },
        props: {
          newsletterPopup: false
        },
        hidden: true
      }
    ]
  },

  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/publicity',
    name: 'activity',
    meta: {
      title: '活动管理',
      icon: 'example',
      role: []
    },
    children: [{
        path: 'publicity',
        name: 'Publicity',
        component: () => import('@/views/activity/publicity'),
        meta: {
          title: '宣传活动',
          icon: 'table',
          keepAlive: true
        }
      },
      {
        path: 'publicityDetail',
        name: 'PublicityDetail',
        component: () => import('@/views/activity/publicityDetail'),
        hidden: true,
        meta: {
          title: '新增修改宣传活动',
          icon: 'table',
          keepAlive: false
        },
        props: {
          newsletterPopup: false
        }
      },
      {
        path: 'storeActivity',
        name: 'StoreActivity',
        component: () => import('@/views/activity/storeActivity'),
        meta: {
          title: '门店活动',
          icon: 'table',
          keepAlive: true
        }
      },
      {
        path: 'storeActivityDetail',
        name: 'storeActivityDetail',
        component: () => import('@/views/activity/storeActivityDetail'),
        hidden: true,
        meta: {
          title: '新增修改门店活动',
          icon: 'table',
          keepAlive: false
        },
        props: {
          newsletterPopup: false
        }
      }
    ]
  },
  {
    path: '/secKill',
    component: Layout,
    redirect: '/secKill/entrance',
    name: 'SecKill',
    meta: {
      title: '票卷管理',
      icon: 'example',
      role: []
    },
    children: [{
        path: 'entrance',
        name: 'Entrance',
        component: () => import('@/views/secKill/entrance/entranceList'),
        meta: {
          title: '门票',
          icon: 'table',
          keepAlive: true
        },
        children: []
      },
      {
        path: 'entranceAdd',
        name: 'EntranceAdd',
        hidden: true,
        component: () => import('@/views/secKill/entrance/entranceAdd'),
        meta: {
          title: '门票编辑添加',
          icon: 'table',
          keepAlive: false
        },

      },
      {
        path: 'entranceDetail',
        name: 'EntranceDetail',
        hidden: true,
        component: () => import('@/views/secKill/entrance/entranceDetail'),
        meta: {
          title: '门票详情',
          icon: 'table',
          keepAlive: false
        },
      },
      {
        path: 'zsentranceAdd',
        name: 'ZsentranceAdd',
        component: () => import('@/views/secKill/zsentrance/zsentranceAdd'),
        meta: {
          title: '赠送票卷',
          icon: 'table',
          keepAlive: false
        },
      },
    ]
  },


  // {
  //   path: '/orderManagement',
  //   component: Layout,
  //   redirect: '/orderManagement/cateringOrderList',
  //   name: 'OrderManagement',
  //   meta: {
  //     title: '订单管理',
  //     icon: 'example',
  //   },
  //   children: [{
  //       path: 'cateringOrderList',
  //       name: 'CateringOrderList',
  //       component: () => import('@/views/orderManagement/cateringOrder/cateringOrderList'),

  //       meta: {
  //         title: '餐饮订单',
  //         icon: 'table'
  //       },
  //     },
  //     {
  //       path: 'cateringOrderDetail',
  //       name: 'CateringOrderDetail',
  //       hidden: true,
  //       component: () => import('@/views/orderManagement/cateringOrder/cateringOrderDetail'),
  //       meta: {
  //         title: '餐饮订单详情',
  //         icon: 'table'
  //       }
  //     },
  //     {
  //       path: 'bookingOrderList',
  //       name: 'BookingOrderList',
  //       component: () => import('@/views/orderManagement/bookingOrder/bookingOrderList'),
  //       meta: {
  //         title: '预约订单',
  //         icon: 'table'
  //       },
  //     },
  //     {
  //       path: 'bookingOrderDrtail',
  //       name: 'BookingOrderDrtail',
  //       hidden: true,
  //       component: () => import('@/views/orderManagement/bookingOrder/bookingOrderDrtail'),
  //       meta: {
  //         title: '餐饮订单详情',
  //         icon: 'table'
  //       }
  //     },
  //   ]
  // },
]
