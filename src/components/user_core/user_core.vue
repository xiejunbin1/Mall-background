<template>
	<div class="usercore-main">
		<!--<van-nav-bar
		  title="个人设置"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="core-ul">
			<div class="core-li" v-if="this.GLOT.finance_wallet">
				<router-link tag='div' to='/mychange' class="core-li-div">
					<span class="li-name">
						<i class="icon iconfont icon-huobi"></i>
						<span class="name-text">我的钱包</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
			</div>
			
			<div class="core-li" v-if="this.GLOT.finance_income">
				<router-link tag="div" to="/changeStatements" class="core-li-div">
					<span class="li-name">
						<i class="icon iconfont icon-huobi changtable"></i>
						<span class="name-text">财务报表</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
			</div>

			<div class="core-li" v-if="false">
				<div class="core-li-div">
					<span class="li-name">
						<i class="icon iconfont icon-guanggao"></i>
						<span class="name-text">广告管理</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</div>
			</div>
			
			<div class="core-li" v-if="this.GLOT.mine_address">
				<router-link tag='div' to='/addresslist' class="core-li-div">
					<span class="li-name">
						<i class="icon iconfont icon-dizhi"></i>
						<span class="name-text">地址管理</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
			</div>
			
			<div class="core-li" v-if="this.GLOT.mine_setPwd">
				<router-link tag='div' to='/passrevise' class="core-li-div">
					<span class="li-name">
						<i class="icon iconfont icon-xiugaimima2"></i>
						<span class="name-text">修改密码</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
			</div>
			<div class="core-li" @click="setWiff" v-if="this.GLOT.mine_wifi">
				<div class="core-li-div">
					<span class="li-name">
						<i class="icon iconfont icon-wangluo"></i>
						<span class="name-text">wiff配网</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</div>
			</div>
			
			<div class="core-li" v-if="this.GLOT.mine_acctMger">
				<router-link tag='div' to='/create' class="core-li-div">
					<span class="li-name">
						<img src="../../common/img/Thec.png" class="icon-wangluo2" alt="">
						<span class="name-text">创建子用户</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
			</div>

			<!-- <div class="core-li" v-if="this.GLOT.finance_income">
				<router-link tag="div" to="/theOrderManagement" class="core-li-div">
					<span class="li-name">
						<i class="icon iconfont icon-huobi changtable"></i>
						<span class="name-text">订单管理</span>
					</span>
					<span class="li-value">
						<i class="icon iconfont icon-icon11"></i>
					</span>
				</router-link>
				
			</div> -->
		</div>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import store from '../../store/store'
import {zhujian} from '@/common/js/common.js'
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
	setWiff(){
		window.location.href="http://wx.ai-thinker.com/api/old/wifi/config"
	}
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  	zhujian()
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
						font-size: 16px
					}
					.icon-xiugaimima2{
						font-size: 18px;
						color: @BGwarning;
					}
					.icon-guanggao{
						font-size: 20px;
						color: @BGsuccess;
					}
					.icon-huobi{
						font-size: 20px;
						color: @BGwarning;
					}
					.changtable{
						font-size: 20px;
						color: @BGlu1;
					}
					.icon-dizhi{
						font-size: 20px;
						color: @BGblue;
					}
					.icon-mingcheng1{
						color: @BGdanger;
					}
					.icon-wangluo{
						font-size: 20px;
						color: #409eff;
					}
					.icon-wangluo2{
						width: 20px;
						height: 20px;
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