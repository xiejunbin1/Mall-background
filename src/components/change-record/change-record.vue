<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="设备收益详情"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="profit-list">
			<div class="profit-li">
				<div class="profit-li-div">
					<div class="li-top">
						<div class="top-name">{{manageData.manage_name}}</div>
					</div>
					<van-tabs v-model="active" @click="onClick">
					  <van-tab title="已审核"></van-tab>
					  <van-tab title="未审核"></van-tab>
					</van-tabs>
				</div>
			</div>
		</div>
		<div class="supply-no" v-show="listData.length==0">
			<img src="../../common/img/bg4.png" alt="" />
			<br />
			<p>暂时没有零钱记录喔~</p>
		</div>
		<div class="list-box">
			<div class="pro-list" v-for="(item,index) in listData" :key='index'>
				<div class="pro-title">
					<span class="title-text">提现金额：&nbsp;<span class="pro-status2">￥{{item.amount}}</span></span>
					<van-button size="mini" type="warning">零钱提现</van-button>
				</div>
				<div class="pro-body">
					<!--<div class="pro-li">提现金额：￥&nbsp;<span class="pro-status2">{{item.money|moneyFilter}}</span></div>-->
					<div class="pro-li">提交时间：{{item.createTime}}</div>
					<div class="pro-li">审核状态：<span class="pro-status1" v-show="item.statusText=='已审核'">{{item.statusText}}</span><span class="pro-status2" v-show="item.statusText!='已审核'">{{item.statusText}}</span></div>
				</div>
				<div class="pro-floor">
					
				</div>
			</div>
		</div>
		
		
		<!--<van-popup v-model="show1" position="bottom" :overlay="true">
		  	<van-datetime-picker
			  v-model="currentDate1"
			  type="date"
			  @confirm='onConfirm1'
			  :max-date="maxDate2"
			/>
		</van-popup>
		<van-popup v-model="show2" position="bottom" :overlay="true">
		  	<van-datetime-picker
			  v-model="currentDate2"
			  type="date"
			  @confirm='onConfirm2'
			  :max-date="maxDate2"
			/>
		</van-popup>-->
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
    	active:0,
    	show1:false,
		show2:false,
		currentDate1: new Date(),
		maxDate2: new Date(),
		currentDate2: new Date(),
		str_time:'',
		end_time:'',
      	manageData:{
      		manage_name:'零钱记录',
	  		manage_id:'qazwsxe3',
	  		all_profit:100,
	  		on_profit:70,
	  		off_profit:30,
	  		coin_sum:84,
      	},
      	listData:[]
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//标签也点击事件
	onClick(index, title) {
	  let _this=this;
      if(index==0){
      	console.log('已通过')
      	axios({
			method:'get',
			url:'/api/WalletApi/WithdrawalLog?status=1',
			responseType:'json'
		}).then((res)=>{
			console.log(res);
			this.listData=res.data
		}).catch((err)=>{
			submitTest(err,_this);
		})
      }else{
      	console.log('未通过')
      	axios({
		method:'get',
			url:'/api/WalletApi/WithdrawalLog?status=0',
			responseType:'json'
		}).then((res)=>{
			console.log(res);
			this.listData=res.data
		}).catch((err)=>{
			submitTest(err,_this);
		})
      }
   	},
	
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	let _this=this;
  	axios({
		method:'get',
		url:'/api/WalletApi/WithdrawalLog?status=1',
		responseType:'json'
	}).then((res)=>{
		this.listData=res.data
	}).catch((err)=>{
		submitTest(err,_this);
	})
//	this.listData=[{}]
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
	.search-list{
		/*box-shadow: @BOXcurrency;*/
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
					width: 56%;
					overflow: hidden;
					color: @BGblue;
				}
				.li-icon{
					width: 24%;
					text-align: right;
				}
			}
		}
	}
	.profit-list{
		background: #fff;
		box-shadow: @BOXcurrency;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10000;
		.profit-li{
			.profit-li-div{
				width: 100%;
				margin: 0 auto;
				.li-top{
					display: flex;
					justify-content: space-between;
					font-size: 16px;
					padding: 10px;
					border-bottom: 1px solid @BOX3;
					margin:0 auto;
					.top-name{
						width: 100%;
						font-weight: bold;
						text-align: center;
					}
				}
				.li-bottom{
					display: flex;
					flex-wrap:wrap;
					padding: 10px 0;
					.bottom-div{
						text-align: center;
						padding-top: 8px;
						width: 48%;
						font-size: 15px;
						color: @FTC2;
						.bottom-sum{
							color: @BGdanger;
							font-size: 16px;
						}
					}
				}
			}
		}
	}
	.supply-no{
		margin-top: 92px;
		text-align: center;
		font-size: 16px;
		color: @FTC3;
		img{
			width: 230px;
			height: 200px;
			display: block;
			margin: auto;
		}
		p{
			margin: 0;
			padding: 0;
		}
	}
	.list-box{
		width:100%;
		box-sizing: border-box;
		padding: 1px 10px 10px 10px;
		background: @BGgrey;
		margin-top: 88px;
		.pro-list{
			background: #fff;
			box-sizing: border-box;
			padding: 5px;
			border-radius: 5px;
			margin-top: 10px;
			.pro-title{
				display: flex;
				justify-content: space-between;
				padding-bottom: 5px;
				border-bottom: 1px solid @BOX3;
				.title-text{
					font-size: 14px;
					color: @BGsuccess;
				}
				.pro-status2{
					color: @BGdanger;
				}
			}
			.pro-body{
				padding-bottom: 5px;
				padding-top: 5px;
				border-bottom: 1px solid @BOX3;
				.pro-li{
					padding: 0px 0 5px 0;
					color: @FTC2;
					font-size: 13px;
					.pro-status1{
						color: @BGsuccess;
					}
					.pro-status2{
						color: @BGdanger;
					}
				}
			}
			.pro-floor{
				width: 100%;
				height: 30px;
			}
		}
	}
}
</style>