<template>
	<div class="usercore-main">
		<!--<van-nav-bar
		  title="商品管理"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="core-ul">
			<div class="core-li" v-if="this.GLOT.product_add">
				<router-link tag='div' to='/goodexhibit' class="core-li-div">
					<span class="li-name">
						<i class="icon iconfont icon-xiugaimima2"></i>
						<span class="name-text">商品上架</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
			</div>
			
			<!--<div class="core-li">
				<router-link class="core-li-div" :to="{path:'reviselist',name:'reviselist',params:{manageid:0}}">
					<span class="li-name">
						<i class="icon iconfont icon-guanggao"></i>
						<span class="name-text">商品修改</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
			</div>-->
			<div class="core-li" v-if="this.GLOT.product_typeMger">
				<router-link class="core-li-div" :to="{path:'categoryManage',name:'categoryManage'}">
					<span class="li-name">
						<i class="icon iconfont icon-leixing1"></i>
						<span class="name-text">商品类别管理</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
			</div>
			<div class="core-li" v-if="this.GLOT.product_set">
				<router-link tag='div' to='/gooddel' class="core-li-div">
					<span class="li-name">
						<i class="icon iconfont icon-dizhi"></i>
						<span class="name-text">商品修改</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
			</div>
			
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
      	
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
  	
  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	padding: 10px 0;
}
.usercore-main{
	.core-ul{
		.core-li{
			padding: 10px 0;
			box-shadow: @BOXcurrency;
			border-top: 1px solid @BOX4;
			margin-top: 10px;
			.core-li-div{
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				color: @FTC2;
				.li-name{
					.name-text{
						margin-left: 5px;
					}
					.icon-xiugaimima2{
						font-size: 18px;
						color: @BGwarning;
					}
					.icon-leixing1{
						font-size: 20px;
						color: @BGsuccess;
					}
					.icon-dizhi{
						font-size: 20px;
						color: @BGblue;
					}
					.icon-mingcheng1{
						color: @BGdanger;
					}
				}
				.li-value{
					.icon-icon11{
						font-size: 20px;
					}
				}
			}
		}
	}
}
</style>