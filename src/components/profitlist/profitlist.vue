<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="场地收益详情"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="profit-header">
			<div class="header-top">
				<div class="count-title">
					<div class="count-title-div">
						<div class="title-name">
							儿童乐园
							<van-tag mark type="primary">3台</van-tag>
						</div>
						<div class="title-price">
							总计：0.00元
						</div>
					</div>
					<div class="count-time">
						<div class="count-time-div" style="color: #409EFF;">
							<span>2018/10/05</span><span style="color: #606266;">&nbsp;至&nbsp;</span><span>2018/11/01</span>
						</div>
					</div>
				</div>
			</div>
			<div class="search-li" @click="handleDig">
				<div class="search-li-div">
					<div class="li-title">设备类型</div>
					<div class="li-value">
						<span class="manaeg-input"/>{{address_value}}</span>
					</div>
					<div class="li-icon">
						<span class="value-check">请选择</span>
						<i class="icon iconfont icon-icon11"></i>
					</div>
				</div>
			</div>
		</div>
		
		<div class="profit-list" v-for="(item,index) in listData" :key="index">
			<router-link :to="{path:'profitdel',name:'profitdel',params:{manageid:item.manage_id}}" tag="div" class="profit-li">
			<!--<div class="profit-li">-->
				<div class="profit-li-div">
					<div class="li-top">
						<div class="top-name">{{item.manage_name}}</div>
						<div class="top-price">合计：&nbsp;{{item.all_profit|moneyFilter}}元</div>
					</div>
					<div class="li-bottom">
						<div class="bottom-div">线上收益: <span>{{item.on_profit|moneyFilter}}元</span></div>
						<div class="bottom-div">线下收益: <span>{{item.off_profit|moneyFilter}}元</span></div>
						<div class="bottom-div">合计投币: <span>{{item.coin_sum}}个</span></div>
					</div>
				</div>
			</router-link>
		</div>
		
		<van-popup v-model="show" position="bottom" :overlay="true">
		  	<van-picker :columns="columns" show-toolbar @confirm='onConfirm'/>
		</van-popup>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {toMoney} from '@/moneyFilter.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
      	show: false,
      	address_value:'售货机',
      	columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      	listData:[],
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	handleDig(){
   		this.show=!this.show;
   	},
   	onConfirm(value){
   		console.log(value);
   		this.address_value=value;
   		this.show=!this.show
   	},
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	let address_id=this.$route.params.addressid
  	this.listData=[{
  		manage_name:'娃娃机第一号',
  		manage_id:'qazwsxe1',
  		all_profit:120,
  		on_profit:70,
  		off_profit:50,
  		coin_sum:99,
  	},{
  		manage_name:'娃娃机第二号',
  		manage_id:'qazwsxe2',
  		all_profit:139,
  		on_profit:79,
  		off_profit:60,
  		coin_sum:50,
  	},{
  		manage_name:'娃娃机第三号',
  		manage_id:'qazwsxe3',
  		all_profit:100,
  		on_profit:70,
  		off_profit:30,
  		coin_sum:84,
  	},]
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
  	
  },
  filters:{
	moneyFilter(money){
		return toMoney(money)
	}
  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.getcell-main{
	background: @BGGrey;
	.profit-header{
		background: #fff;
		box-shadow: @BOXcurrency;
		.search-li{
			background: #fff;
			padding: 10px;
			font-size: 14px;
			border-bottom: 1px solid @BOX3;
			.search-li-div{
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				.li-title{
					
				}
				.li-value{
					width: 50%;
					overflow: hidden;
					color: @BGblue;
				}
				.li-icon{
					width: 30%;
					text-align: right;
				}
			}
		}
		.header-top{
			.count-title{
				.count-title-div{
					width: 95%;
					margin: 0 auto;
					padding: 10px 0;
					display: flex;
					justify-content: space-between;
					.title-name{
						width: 45%;
						font-size: 15px;
					}
					.title-price{
						width: 45%;
						text-align: right;
						font-size: 17px;
						font-weight: bold;
					}
				}
				.count-time{
					border-bottom: 1px solid @BOX3;
					.count-time-div{
						width: 95%;
						margin: 0 auto;
						font-size: 16px;
					}
					
				}
			}
		}
	}
	.profit-list{
		background: #fff;
		.profit-li{
			margin-top: 15px;
			.profit-li-div{
				width: 97%;
				margin: 0 auto;
				.li-top{
					display: flex;
					justify-content: space-between;
					font-size: 16px;
					padding: 10px;
					border-top: 1px solid @BOX3;
					border-bottom: 1px solid @BOX3;
				}
				.li-bottom{
					display: flex;
					flex-wrap:wrap;
					.bottom-div{
						padding-top: 8px;
						width: 48%;
						font-size: 15px;
						color: @BGblue;
					}
				}
			}
		}
	}
}
</style>