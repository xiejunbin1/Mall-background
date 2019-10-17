// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store/store'
import 'vant/lib/index.css';
import http from './http.js'   //axios实例化后引入取名http
import index3 from './components/index/index3'//引用文件
import global_ from './components/index/index1'//引用文件
// Vue.prototype.GLOT = index3//挂载到Vue实例上面复制代码
const promise = new Promise((resolve,reject)=>{
  Vue.prototype.GLOT = index3//挂载到Vue实例上面复制代码
  resolve(Vue.prototype.GLOT)
})
promise.then((data)=>{
  Vue.prototype.GLOBAL = global_//挂载到Vue实例上面复制代码
})

Vue.prototype.http = http   //放入全局
// Vue.use(base);//将全局函数当做插件来进行注册复制代码
import { List,Row,Col,Button, Collapse, CollapseItem, Cell, CellGroup,Icon,RadioGroup,Radio,Tag, Badge, BadgeGroup, NoticeBar,Slider, Toast,Switch, Tab, Tabs,Swipe, SwipeItem,GoodsAction,  GoodsActionBigBtn,  GoodsActionMiniBtn, SubmitBar,
	Card,Checkbox, CheckboxGroup, Field, Search, Dialog, NavBar, Actionsheet, Picker,Uploader,Popup,DatetimePicker,Stepper,Pagination,Circle,Area,PullRefresh,Loading} from 'vant'
Vue.config.productionTip = false

Vue.use(Mint).use(List).use(Row).use(Col).use(Button).use(Collapse).use(CollapseItem).use(Cell).use(CellGroup).use(Icon).use(Tag).use(Badge).use(BadgeGroup).use(NoticeBar)
.use(Slider).use(Toast).use(Switch).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn).use(SubmitBar).use(Card)
.use(Checkbox).use(CheckboxGroup).use(Field).use(Search).use(Dialog).use(NavBar).use(Actionsheet).use(Picker).use(Uploader).use(Popup).use(DatetimePicker).use(Stepper)
.use(Pagination).use(Area).use(PullRefresh).use(Loading).use(RadioGroup).use(Radio).use(Circle);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
