/*
一 、axios的安装
	运行 → cmd回车 → 进入项目路径 → 执行以下命令 
	npm install axios
引入:
	在main.js引入或页面引入
	import axios from 'axios'


   
   
   
三 、less css预处理器的安装  npm install less less-loader --save-dev
	安装成功后，打开 build/webpack.base.conf.js ，在 module.exports = 的对象的 module.rules 后面添加一段
	module.exports = {
	    //  此处省略无数行，已有的的其他的内容
	    module: {
	        rules: [
	          //  此处省略无数行，已有的的其他的规则
	          {
	            test: /\.less$/,
	            loader: "style-loader!css-loader!less-loader",
	          }
	        ]
	    }
	}
引入:
	最后，在代码中的 style 标签中 加上 lang="less" 属性即可 (style标签里加上 scoped 为只在此作用域 有效)
	<style scoped lang="less">

	</style>



四、qs (是一个增加了一些安全性的查询字符串解析和序列化字符串的库) 的安装
	npm install qs
引入:
	在main.js引入或页面引入
	import qs from 'qs'
	

五、图片懒加载 vue-lazyload 的安装
	npm install vue-lazyload --save-dev
引入:
	在main.js引入插件
	import VueLazyLoad from 'vue-lazyload'
	导入懒加载示例图片  (正确/错误)
	例如:
		Vue.use(VueLazyLoad,{
		    error:'./static/error.png',
		    loading:'./static/loading.png'
		})
	


六、 babel-plugin-import  按需引入插件 的安装
	npm install babel-plugin-import --save-dev
引入：
	在.babelrc中配置plugins（插件）
	"plugins": [
	    "transform-vue-jsx", 
	    "transform-runtime",
	    ["import",{"libraryName":"vant","style":true}]
	]
	我们设置好.babelrc后，就可以按需引入组件库了。



七、Element 组件库的安装
	npm i element-ui -S
引入：
	在main.js引入element UI的css 和 插件
	import ElementUI from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css';
    Vue.use(ElementUI);
按需引入：
	找到.babelrc 配置文件
	"plugins": [
	            [
	              "component",
	              {
	            "libraryName": "element-ui",
	            "styleLibraryName": "theme-chalk"
	              }
	            ]
          	]
        例：
    import { Button, Select } from 'element-ui';

    Vue.use(Button)
    Vue.use(Select)



八，环形菜单 vue-circle-menu 的安装
	npm install vue-circle-menu
引入：
	全局
	import CircleMenu from 'vue-circle-menu'
	Vue.component('CircleMenu', CircleMenu)
	局部
	import CircleMenu from 'vue-circle-menu'
	export default {
	  components: {
	    CircleMenu
	  }
	}
	
	
	
九，配合环形菜单的  animate.css 动画库
	下载：
	https://raw.github.com/daneden/animate.css/master/animate.css
	动画演示地址：
	https://www.cnblogs.com/xiaohuochai/p/7372665.html
引入：
	在App.vue的style中引入对应的本地地址
	例：
	<style>
	@import 'style/animate.css';
	
	</style>
	


十， vant ui插件的安装
	npm i vant -S
引入：
	按需引入： 先安装并配置好babel-plugin-import
		在需要的页面 按需引入   
			例：import { Button, Cell } from 'vant';
	
	全局引入： 
	import Vant from 'vant';
	import 'vant/lib/vant-css/index.css';
	
	Vue.use(Vant);

十一、Vuex的安装 
	运行 → cmd回车 → 进入项目路径 → 执行以下命令 
	npm install vuex –save
引入:
	import {mapState,mapMutation,mapAction} from 'vuex'
	先创建js文件 配置基础数据
	在main.js或者 需要状态的页面先引入创建的js文件地址 (例如:import store from '../../store/store.js')
	然后再计算属性中接收状态数据
	例如:
		computed:{
			...mapState(['user','showLeftFlag','loginState'])		
		}


十二、 Sass Loader   css预处理器的安装 
	npm install sass-loader node-sass webpack --save-dev
	npm install style-loader css-loader --save-dev
配置
	在build文件夹下的   webpack.base.conf.js 里面加
	{
	test: /.scss$/,
	loaders: ["style", "css", "sass"]
	},

*/