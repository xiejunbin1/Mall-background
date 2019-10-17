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
						<!--<div class="top-price">合计：&nbsp;{{manageData.all_profit|moneyFilter}}元</div>-->
					</div>
					<div class="search-list">
						<div class="search-li">
							<div class="search-li-div">
								<div class="li-title">时间</div>
								<div class="li-value">
									<span class="manaeg-input"/>
									<span @click="handletime1">{{str_time}}</span>
									<span style="color: #606266;">&nbsp;至&nbsp;</span>
									<span @click="handletime2">{{end_time}}</span></span>
									<!--<input type="date">-->
								</div>
								<div class="li-icon">
									<span class="value-check">请选择</span>
									<i class="icon iconfont icon-icon11"></i>
								</div>
							</div>
						</div>
					</div>
					<div class="li-bottom">
						<div class="bottom-div">线上收益: <span class="bottom-sum">{{manageData.on_profit|moneyFilter}}</span>元</div>
						<!--<div class="bottom-div">线下收益: <span>{{manageData.off_profit|moneyFilter}}元</span></div>-->
						<div class="bottom-div">合计投币: <span class="bottom-sum">{{manageData.coin_sum}}</span>个</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="revise-list" v-for='(item,index) in listData' :key='index'>
			<div class="list-div">
				<div class="li-left">
					<div class="li-img">
						<img :src="item.good_img" alt="" />
					</div>
					<div class="li-text">
						<div class="li-text-div">
							<div class="good-name">{{item.good_name}}</div>
							<div class="good-price">
								<span>销量：{{item.good_sum}}</span>
								<span class="good_price">销售额：￥{{item.good_price|moneyFilter}}</span>
							</div>
							<div class="li-time">
								交易时间：{{item.good_time}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		
		<van-popup v-model="show1" position="bottom" :overlay="true">
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
		</van-popup>
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
    	show1:false,
		show2:false,
		currentDate1: new Date(),
		maxDate2: new Date(),
		currentDate2: new Date(),
		str_time:'',
		end_time:'',
      	manageData:{
      		manage_name:'娃娃机第三号',
	  		manage_id:'qazwsxe3',
	  		all_profit:100,
	  		on_profit:70,
	  		off_profit:30,
	  		coin_sum:84,
      	},
      	listData:[{
      		good_img:'http://119.23.218.210/allPHP/imgs/58d22765Ned3b6c3b.jpg',
      		good_name:'脉动实惠装',
      		good_sum:'12',
      		good_price:'95',
      		good_time:'2018-11-13 08:06:57'
      	},{
      		good_img:'http://119.23.218.210/allPHP/imgs/5ac2fcfbNadff326a.jpg',
      		good_name:'水葡萄特饮',
      		good_sum:'10',
      		good_price:'100',
      		good_time:'2018-11-13 08:06:57'
      	},{
      		good_img:'http://119.23.218.210/allPHP/imgs/58661e56N263e903b.jpg',
      		good_name:'大桶可口可乐',
      		good_sum:'11',
      		good_price:'199',
      		good_time:'2018-11-13 08:06:57'
      	},]
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	handletime1(){
   		this.show1=!this.show1;
   	},
   	handletime2(){
   		this.show2=!this.show2;
   	},
   	onConfirm1(value){
   		this.show1=!this.show1;
   		this.str_time_t=value.getTime()
   		this.str_time=value.toLocaleDateString()
   	},
   	onConfirm2(value){
   		let _this=this
   		this.show2=!this.show2;
   		this.end_time_t=value.getTime()
   		this.end_time=value.toLocaleDateString()
   		if(this.str_time_t<=value.getTime()+86400*1000){
   			
   		}else{
   			alert('结束日期不低于开始日期')
   		}
   	},
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  		let manage_id=this.$route.params.manageid
  		let nowtime=new Date();
	  	this.str_time='1970/1/1';
	  	this.end_time=nowtime.toLocaleDateString();
	  	let _this=this;
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
	.revise-list{
		padding: 8px 0;
		border-bottom:1px solid @BOX3;
		background: #fff;
		border-top: 1px solid @BOX3;
		margin-top: 20px;
		.list-div{
			width: 97%;
			margin: 0 auto;
			font-size: 14px;
			color: @FTC3;
			display: flex;
			justify-content: space-between;
			.li-left{
				width: 100%;
				
				.li-img{
					min-height: 80px;
					width: 75px;
					float: left;
					border:1px solid @BOX3;
					padding:1px;
					img{
						width: 98%;
						height: 98%;
					}
				}
				.li-text{
					width: 60%;
					height: 100%;
					margin-left: 8px;
					float: left;
					.li-text-div{
						height: 80%;
						margin-top: 8px;
						display: flex;
					    flex-direction: column;
					    justify-content: space-between;
					    .good-name{
					    	font-size: 16px;
					    	color: @FTC2;
					    }
					    .good-price{
					    	color: @BGblue;
					    	display: flex;
							justify-content: space-between;
							.good_price{
								text-align: right;
							}
					    }
					}
				}
			}
			.li-right{
				width: 20%;
				line-height: 75px;
				.li-btn{
					border-color: @BGblue;
					color: @BGblue;
				}
			}
		}
	}
}
</style>