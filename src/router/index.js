import Vue from 'vue'
import Router from 'vue-router'
import gHome from '@/components/g-home/g-home'
import Login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['@/components/login/login1'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='登录'
      	next()
      }
    },
    {
      path: '/index',
      component: resolve => require(['@/components/index/index'], resolve),
      redirect:'/home',
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='后台管理首页'
      	next()
      },
      children:[
      	{
		       path: '/home',
		       name:'home',
      		 component: resolve => require(['@/components/g-home/g-home'], resolve),
		    },
		    {
      		name:'present',
      		path:'/present',
      		component: resolve => require(['@/components/present/present'], resolve),
      	},
      	{
      		name:'usercore',
      		path:'/usercore',
      		component: resolve => require(['@/components/user_core/user_core'], resolve),
      	},
      ]
    },
    {
      path: '/home',
      component: resolve => require(['@/components/g-home/g-home'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='后台管理首页'
      	next()
      }
    },
    {
      path: '/base',
      name:'base',
      component: resolve => require(['@/components/base/baseTab'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备功能列表'
      	next()
      }
    },
    {
      path: '/base_inLibrary',
      name:'base_inLibrary',
      component: resolve => require(['@/components/base/base'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备进库'
      	next()
      }
    },
    {
      path: '/base_unbund',
      name:'base_unbund',
      component: resolve => require(['@/components/base/base_unbund'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备解绑'
      	next()
      }
    },
    {
      path: '/mealshop',
      name:'mealshop',
      component: resolve => require(['@/components/meal-shop/meal-shop'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='店铺列表'
      	next()
      }
    },
    {
      path: '/issign',
      name:'issign',
      component: resolve => require(['@/components/is-sign/is-sign'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='商户签约'
      	next()
      }
    },
    {
      path: '/stuffIndex',
      name:'stuffIndex',
      component: resolve => require(['@/components/merchant/stuffIndex'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='商户资料'
      	next()
      }
    },
    {
      path: '/goodmanage',
      name:'goodmanage',
      component: resolve => require(['@/components/good-manage/good-manage'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='商品管理'
      	next()
      }
    },
    {
      path: '/licrelist',
      name:'licrelist',
      component: resolve => require(['@/components/lucre-list/lucre-list'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='收益记录'
      	next()
      }
    },
    {
      path: '/gooddel',
      name:'gooddel',
      component: resolve => require(['@/components/good-del/good-del'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='商品删除'
      	next()
      }
    },
    // {
    //   path: '/gooddel',
    //   name:'gooddel',
    //   component: resolve => require(['@/components/good-del/good-del1'], resolve),
    //   beforeEnter:(to,from,next)=>{
    //   	document.getElementById('titleId').innerHTML='商品删除'
    //   	next()
    //   }
    // },
    {
      path: '/phonereg',
      name:'phonereg',
      component: resolve => require(['@/components/phone-reg/phone-reg'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='手机绑定'
      	next()
      }
    },
    {
      path: '/managecount/:id/:str/:end/:address',
      name:'managecount',
      component: resolve => require(['@/components/manage-count/manage-count'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备列表'
      	next()
      }
    },
    {
      path: '/persentimg/:img',
      name:'persentimg',
      component: resolve => require(['@/components/persent_img/persent_img'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='流程说明'
      	next()
      }
    },
    {
      path: '/meal',
      name:'meal',
      component: resolve => require(['@/components/meal/meal'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='优惠设置'
      	next()
      }
    },
    {
      path: '/mealbuy/:mid',
      name:'mealbuy',
      component: resolve => require(['@/components/meal-buy/meal-buy'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='套餐购买'
      	next()
      }
    },
    {
      path: '/lackgood/:aid/:address',
      name:'lackgood',
      component: resolve => require(['@/components/lack_good/lack_good'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='缺货场地'
      	next()
      }
    },
    {
      path: '/mealmanage/:id',
      name:'mealmanage',
      component: resolve => require(['@/components/meal-manage/meal-manage'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备选择'
      	next()
      }
    },
    {
      path: '/sellerreg',
      component: resolve => require(['@/components/seller-reg/seller-reg'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='商户注册'
      	next()
      }
    },
    {
      path: '/goodrevise/:lid',
      name:'goodrevise',
      component: resolve => require(['@/components/good-revise/good-revise'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='商品修改'
      	next()
      },
    },
    // {
    //   path: '/goodrevise/:45',
    //   name:'goodrevise',
    //   component: resolve => require(['@/components/good-revise/good-revise2'], resolve),
    //   beforeEnter:(to,from,next)=>{
    //   	document.getElementById('titleId').innerHTML='商品修改'
    //   	next()
    //   },
    // },

    {
      path: '/stockinfo/:manageid',
      name:'stockinfo',
      component: resolve => require(['@/components/stock-info/stock-info'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='存货详情'
      	next()
      }
    },
    {
      path: '/reviselist/:manageid',
      name:'reviselist',
      component: resolve => require(['@/components/revise-list/revise-list'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='商品管理'
      	next()
      }
    },
    {
      path: '/categoryManage',
      name:'categoryManage',
      component: resolve => require(['@/components/category_manage/category_manage'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='商品类别管理'
      	next()
      }
    },
    {
      path: '/managerevise/:manageid',
      name:'managerevise',
      component: resolve => require(['@/components/manage-revise/manage-revise'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='价格管理'
      	next()
      }
    },
    {
      path: '/addresslist',
      name:'addresslist',
      component: resolve => require(['@/components/address-list/address-list'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='地址管理'
      	next()
      }
    },
    {
      path: '/managetie',
      name:'managetie',
      component: resolve => require(['@/components/manage-tie/manage-tie'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备解绑'
      	next()
      }
    },
    {
      path: '/selectaddress',
      name:'selectaddress',
      component: resolve => require(['@/components/select-address/select-address'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='地址选择'
      	next()
      }
    },
    {
      path: '/goodexhibit',
      name:'goodexhibit',
      component: resolve => require(['@/components/goodexhibit/goodexhibit'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='商品上架'
      	next()
      }
    },
    {
      path: '/passrevise',
      name:'passrevise',
      component: resolve => require(['@/components/pass-revise/pass-revise'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='密码修改'
      	next()
      }
    },
    {
      path: '/dailydetail/:mid',
      name:'dailydetail',
      component: resolve => require(['@/components/daily-detail/daily-detail'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='订单详情'
      	next()
      }
    },
    
    {
      path: '/profitlist/:addressid',
      name:'profitlist',
      component: resolve => require(['@/components/profitlist/profitlist'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='场地收益详情'
      	next()
      }
    },
    {
      path: '/profitdel/:manageid/:str/:end',
      name:'profitdel',
      component: resolve => require(['@/components/profitdel/profitdel'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备收益详情'
      	next()
      }
    },
    {
      path: '/manage_daily/:manageid',
      name:'managedaily',
      component: resolve => require(['@/components/manage_daily/manage_daily'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='订单列表'
      	next()
      }
    },
    {
      path: '/cargoswitch/:manageid',
      name:'cargoswitch',
      component: resolve => require(['@/components/cargo-switch/cargo-switch'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='货到开关'
      	next()
      }
    },
    {
      path: '/register',
      component: resolve => require(['@/components/register/register'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='账号注册'
      	next()
      }
    },
    {
      path: '/mychange',
      component: resolve => require(['@/components/my-change/my-change'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='我的钱包'
      	next()
      }
    },
    {
      path: '/changeStatements',
      component: resolve => require(['@/components/change-statements/change-statements'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='财务报表'
      	next()
      }
    },
    {
      path: '/changestatementsDel/:addressId/:machineNum',
      name:'changestatementsDel',
      component: resolve => require(['@/components/change-statements_del/change-statements_del'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='财务报表详情'
      	next()
      }
    },
    {
      path: '/ChangeStatementsList/:addressId',
      name:'ChangeStatementsList',
      component: resolve => require(['@/components/change-statements-list/change-statements-list'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备财务报表详情'
      	next()
      }
    },
    {
      path: '/changerecord',
      component: resolve => require(['@/components/change-record/change-record'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='零钱记录'
      	next()
      }
    },
    {
      path: '/changecash',
      component: resolve => require(['@/components/change-cash/change-cash'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='零钱提现'
      	next()
      }
    },
    {
      path: '/moneycount/:manageid',
      name:'moneycount',
      component: resolve => require(['@/components/money-count/money-count'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='销售统计'
      	next()
      }
    },
    {
      path: '/gift',
      component: resolve => require(['@/components/gift/gift'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='礼品消耗'
      	next()
      }
    },
    //不用的货道管理
    // {
    //   path: '/goodslist/:manageid/:typeid',
    //   name:'goodslist',
    //   component: resolve => require(['@/components/goods-list/goods-list1'], resolve),
    //   beforeEnter:(to,from,next)=>{
    //   	document.getElementById('titleId').innerHTML='货道管理'
    //   	next()
    //   }
    // },
    //现在在用的货道管理
    {
      path: '/goodslist/:manageid/:typeid',
      name:'goodslist',
      component: resolve => require(['@/components/goods-list/goods-list3'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='货道管理'
      	next()
      }
    },
    {
      path: '/parameterSet/:manageid/:typeid',
      name:'parameterSet',
      component: resolve => require(['@/components/parameter_set/parameter_set'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='参数设置'
      	next()
      }
    },
    {
      path: '/goodsStock/:manageid/:typeid',
      name:'goodsStock',
      component: resolve => require(['@/components/goods-stock/goods-stock'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='缺货'
      	next()
      }
    },
    {
      path: '/nogoodslist/:manageid/:machineNum',
      name:'nogoodslist',
      component: resolve => require(['@/components/no_goods_list/no_goods_list'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='机器货道'
      	next()
      }
    },
    {
      path: '/cargorevise',
      name:'cargorevise',
      component: resolve => require(['@/components/good-revise-detail/good-revise-detail'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='更改商品'
      	next()
      }
    },
    {
      path: '/manageinfo/:mid/:type',
      name:'manageinfo',
      component: resolve => require(['@/components/manageinfo/manageinfo'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备信息'
      	next()
      }
    },
    {
      path: '/manageparam/:mid',
      name:'manageparam',
      component: resolve => require(['@/components/manage-param/manage-param'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备参数修改'
      	next()
      }
    },
    {
      path: '/twistedEggMachine/:mid',
      name:'twistedEggMachine',
      component: resolve => require(['@/components/manage-param/twistedEggMachine'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备参数修改'
      	next()
      }
    },
    {
      path: '/gameparam/:mid',
      name:'gameparam',
      component: resolve => require(['@/components/game_param/game_param'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='游戏通关修改'
      	next()
      }
    },
    {
      path: '/setcell',
      name:'setcell',
      component: resolve => require(['@/components/setcell/setcell'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='货道设置'
      	next()
      }
    },
    {
      path: '/usercore',
      name:'usercore',
      component: resolve => require(['@/components/user_core/user_core'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='个人设置'
      	next()
      }
    },
    {
      path: '/getcell',
      name:'getcell',
      component: resolve => require(['@/components/getcell/getcell'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='货道映射'
      	next()
      }
    },
    {
      path: '/site_list',
      name:'site_list',
      component: resolve => require(['@/components/site_list/site_list'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='场地列表'
      	next()
      }
    },
    {
      path: '/manage',
      name: 'manage',
      component: resolve => require(['@/components/manage/manage'], resolve),
      redirect:'/managedev',
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='设备管理'
      	next()
      },
      children:[
      	{
      		name:'manageana',
      		path:'/manageana',
      		component:resolve => require(['@/components/manageana/manageana'], resolve),
      	},
      	{
      		name:'managedev',
      		path:'/managedev',
      		component:resolve => require(['@/components/managedev/managedev'], resolve),
      	},
      ]
    },

    {
      path: '/create',
      name:'create',
      component: resolve => require(['@/components/create/create'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='子账号权限设置'
      	next()
      }
    },
    {
      path: '/theOrderManagement',
      name:'theOrderManagement',
      component: resolve => require(['../components/theOrderManagement/theOrderManagement'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='订单管理'
      	next()
      }
    },
    {
      path: '/theOrderManagement1',
      name:'theOrderManagement1',
      component: resolve => require(['../components/theOrderManagement/theOrderManagement1'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='订单管理'
      	next()
      }
    },
    {
      path: '/theOrder/:machineNum',
      name:'theOrder',
      component: resolve => require(['../components/theOrderManagement/theOrder'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='订单管理'
      	next()
      }
    },
    // {
    //   path: '/purchaseDetails',
    //   name:'purchaseDetails',
    //   component: resolve => require(['../components/theOrderManagement/purchaseDetails'], resolve),
    //   beforeEnter:(to,from,next)=>{
    //   	document.getElementById('titleId').innerHTML='购买详情'
    //   	next()
    //   }
    // },
    {
      path: '/createAccount',
      name:'createAccount',
      component: resolve => require(['@/components/create/createAccount'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='新增子页面'
      	next()
      }
    },
    {
      path: '/toCreateJobs',
      name:'toCreateJobs',
      component: resolve => require(['@/components/create/toCreateJobs'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='创建岗位'
      	next()
      }
    },
    {
      path: '/jobs',
      name:'jobs',
      component: resolve => require(['@/components/create/jobs'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='创建岗位'
      	next()
      }
    },
    {
      path: '/editSubpage/:accountId',
      name:'editSubpage',
      component: resolve => require(['@/components/create/editSubpage'], resolve),
      beforeEnter:(to,from,next)=>{
      	document.getElementById('titleId').innerHTML='编辑子页面'
      	next()
      }
    },
  ]
})
