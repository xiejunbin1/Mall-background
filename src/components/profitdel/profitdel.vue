<template>
	<div class="getcell-main">
		<div class="profit-list">
			<van-tabs v-model="active" sticky swipeable class="tabs" @click='onClick' >
			<van-tab v-for="(item,index) in tabdatas" :key="index">
				<div slot='title' class="vant-tab">
					{{item.title}}
				</div>
			</van-tab>	
		</van-tabs>	
			<div class="profit-li">
				<div class="profit-li-div">
					<div class="li-top">
						<div class="top-name">{{manage_id}}</div>
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
									<span @click="handletime2">{{end_time}}</span>
									<!--<input type="date">-->
								</div>
								<!-- <div class="li-icon">
									<span class="value-check">请选择</span>
									<i class="icon iconfont icon-icon11"></i>
								</div> -->
							</div>
						</div>
					</div>
					<!-- <div class="warp-title">
						<span @click='handlesubmit'>
							<van-button size="small" type="primary">查询</van-button>
						</span>
					</div> -->
					<div class="warp-total">
						<span class="title-name">
							<div>
								<div class="title_name">线上总收益(元)</div>
								<br />
								<div class="title-sum">{{totalMount}}</div>
							</div>
							<div>
								<div class="title_name">线上总投币(个)</div>
								<br />
								<div class="title-sum">{{totalCoinsLine}}</div> 
							</div>
							<div>
								<div class="title_name">线下总投币 (个)</div>
								<br />
								<div class="title-sum">{{totalCoins}}</div>
							</div>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div v-if="listData.length==0" class="no-list">
			<img src="../../common/img/bg4.png" alt="" />
			<div class="no-text">暂 无 数 据</div>
		</div>
		<div style="position: relative;margin-top: 0px;">
			<div class="list-box" v-if="listData.length!=0">
				<div class="pro-list" v-for="(item,index) in listData" :key='index'>
					<div class="pro-title">
						<span class="title-text">订单号：{{item.orderNo}}</span>
						<van-button size="mini" type="warning">线上支付</van-button>
					</div>
					<div class="pro-body">
						<div class="pro-li">订单id：{{item.id}}</div>
						<div class="pro-li">金额：￥&nbsp;<span class="pro-status2">{{item.amount|moneyFilter}}</span></div>
						<div class="pro-li">订单时间：{{item.createTime}}</div>
						<div class="pro-li">订单状态：<span class="pro-status1" v-show="item.status=='已支付'">{{item.orderStatus}}</span><span class="pro-status2" v-show="item.status!='已支付'">{{item.orderStatus}}</span></div>
					</div>
					<div class="pro-floor">
						
					</div>
				</div>
			</div>
		</div>
		
		<div style="margin-top: 20px;margin-bottom:60px">
			<van-pagination 
			  v-model="pno" 
			  :total-items="total" 
			  :show-page-size="3" 
			  force-ellipses
			  @change='handlePno'
			/>
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
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {toMoney} from '@/moneyFilter.js'
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
    	active:0,
    	tabdatas:[{"title":'今日','ip':1},
				{"title":'昨天','ip':2},
				{"title":'一周内','ip':3},
				{"title":'一月内','ip':4}
		],
    	manage_id:0,
    	totalMount:0,
		totalCoinsLine:0,
		totalCoins:0,
    	pno:1,
    	total:0,
    	show1:false,
		show2:false,
		currentDate1: new Date(),
		maxDate2: new Date(),
		currentDate2: new Date(),
		str_time:'',
		end_time:'',
		str_time_t:new Date().getTime(),
		end_time_t:new Date().getTime(),
      	manageData:{
      		manage_name:'Dadsk23k12gsad',
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
	//标题点击事件
	onClick(index, title){
		let _this=this;
		if(index==0){
			this.str_time=new Date().toLocaleDateString()
			this.end_time=new Date().toLocaleDateString()
			axios({
				method:'get',
				url:'/api/OrderApi/MachineSummaryDetail?page='+this.pno+'&beginTime='+new Date().toLocaleDateString()+'&endTime='+new Date().toLocaleDateString()+'&machineNum='+this.$route.params.manageid,
				responseType:'json'
			}).then((res)=>{
				this.listData=res.data.data
				this.total=res.data.totalCount
				this.totalMount=res.data.totalMount
				this.totalCoinsLine=res.data.totalCoinsLine
				this.totalCoins=res.data.totalCoins
			}).catch(err=>{
				submitTest(err,_this);
			})
		}else if(index==1){
			let beginTime=new Date(new Date().getTime() - 24*60*60*1000).toLocaleDateString();
			let endTime=new Date(new Date().getTime() - 24*60*60*1000).toLocaleDateString();
			this.str_time=beginTime
			this.end_time=endTime
			axios({
				method:'get',
				url:'/api/OrderApi/MachineSummaryDetail?page='+this.pno+'&beginTime='+beginTime+'&endTime='+endTime+'&machineNum='+this.$route.params.manageid,
				responseType:'json'
			}).then((res)=>{
				this.listData=res.data.data
				this.total=res.data.totalCount
				this.totalMount=res.data.totalMount
				this.totalCoinsLine=res.data.totalCoinsLine
				this.totalCoins=res.data.totalCoins
			}).catch(err=>{
				submitTest(err,_this);
			})
		}else if(index==2){
			let beginTime=new Date(new Date().getTime() - 6*24*60*60*1000).toLocaleDateString();
			let endTime=new Date(new Date().getTime()).toLocaleDateString();
			this.str_time=beginTime
			this.end_time=endTime
			axios({
				method:'get',
				url:'/api/OrderApi/MachineSummaryDetail?page='+this.pno+'&beginTime='+beginTime+'&endTime='+endTime+'&machineNum='+this.$route.params.manageid,
				responseType:'json'
			}).then((res)=>{
				this.listData=res.data.data
				this.total=res.data.totalCount
				this.totalMount=res.data.totalMount
				this.totalCoinsLine=res.data.totalCoinsLine
				this.totalCoins=res.data.totalCoins
			}).catch(err=>{
				submitTest(err,_this);
			})
		}else if(index==3){
			let beginTime=new Date(new Date().getTime() - 29*24*60*60*1000).toLocaleDateString();
			let endTime=new Date(new Date().getTime()).toLocaleDateString();
			this.str_time=beginTime
			this.end_time=endTime
			axios({
				method:'get',
				url:'/api/OrderApi/MachineSummaryDetail?page='+this.pno+'&beginTime='+beginTime+'&endTime='+endTime+'&machineNum='+this.$route.params.manageid,
				responseType:'json'
			}).then((res)=>{
				this.listData=res.data.data
				this.total=res.data.totalCount
				this.totalMount=res.data.totalMount
				this.totalCoinsLine=res.data.totalCoinsLine
				this.totalCoins=res.data.totalCoins
			}).catch(err=>{
				submitTest(err,_this);
			})
		}
	},
	//页码切换
	handlePno(){
		let _this=this;
		axios({	
			method:'get',
			url:'/api/OrderApi/MachineSummaryDetail?page='+this.pno+'&beginTime='+this.str_time+'&endTime='+this.end_time+'&machineNum='+this.$route.params.manageid,
			responseType:'json'
		}).then((res)=>{
			this.listData=res.data.data
			this.total=res.data.totalCount
			this.totalMount=res.data.totalMount
			this.totalCoinsLine=res.data.totalCoinsLine
			this.totalCoins=res.data.totalCoins
		}).catch(err=>{
			submitTest(err,_this);
		})
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
		let _this=this;
		let isTime=this.str_time_t<=this.end_time_t+86400*1000
		if(isTime){
			this.pno=1
			axios({
			method:'get',
				url:'/api/OrderApi/MachineSummaryDetail?page=1&beginTime='+this.str_time+'&endTime='+this.end_time+'&machineNum='+this.$route.params.manageid,
				responseType:'json'
			}).then((res)=>{
				this.listData=res.data.data
				this.total=res.data.totalCount
				this.totalMount=res.data.totalMount
				this.totalCoinsLine=res.data.totalCoinsLine
				this.totalCoins=res.data.totalCoins
			}).catch(err=>{
				submitTest(err,_this);
			})
		}else{
   			alert('结束日期不低于开始日期')
   		}
   	},
   	onConfirm2(value){
   		let _this=this
   		this.show2=!this.show2;
   	
   		if(this.str_time_t<=value.getTime()+86400*1000){
			this.end_time_t=value.getTime()
   			this.end_time=value.toLocaleDateString()
   			this.pno=1
			axios({
			method:'get',
				url:'/api/OrderApi/MachineSummaryDetail?page=1&beginTime='+this.str_time+'&endTime='+this.end_time+'&machineNum='+this.$route.params.manageid,
				responseType:'json'
			}).then((res)=>{
				this.listData=res.data.data
				this.total=res.data.totalCount
				this.totalMount=res.data.totalMount
				this.totalCoinsLine=res.data.totalCoinsLine
				this.totalCoins=res.data.totalCoins
			}).catch(err=>{
				submitTest(err,_this);
			})
   		}else{
			   alert('结束日期不低于开始日期');
			   this.show2=true;
   		}
   	},
   	//查询
	handlesubmit(){
//		console.log('阿富汗喀')
		let _this=this;
		let isTime=this.str_time_t<=this.end_time_t+86400*1000
		
		if(isTime){
			this.pno=1
			axios({
			method:'get',
				url:'/api/OrderApi/MachineSummaryDetail?page=1&beginTime='+this.str_time+'&endTime='+this.end_time+'&machineNum='+this.$route.params.manageid,
				responseType:'json'
			}).then((res)=>{
				this.listData=res.data.data
				this.total=res.data.totalCount
				this.totalMount=res.data.totalMount
				this.totalCoinsLine=res.data.totalCoinsLine
				this.totalCoins=res.data.totalCoins
			}).catch(err=>{
				submitTest(err,_this);
			})
		}else{
   			alert('结束日期不低于开始日期')
   		}
	},
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  		let manage_id=this.$route.params.manageid
  		this.manage_id=manage_id
  		let _this=this
  		axios({
		method:'get',
			url:'/api/OrderApi/MachineSummaryDetail?page='+this.pno+'&beginTime='+this.$route.params.str+'&endTime='+this.$route.params.end+'&machineNum='+this.$route.params.manageid,
			responseType:'json'
		}).then((res)=>{
			console.log(res)
			this.listData=res.data.data
			this.total=res.data.totalCount
			this.totalMount=res.data.totalMount
			this.totalCoinsLine=res.data.totalCoinsLine
			this.totalCoins=res.data.totalCoins
		}).catch(err=>{
			submitTest(err,_this);
		})
  		let nowtime=new Date();
  		
	  	this.str_time=this.$route.params.str
	  	this.end_time=this.$route.params.end
	  	if(!this.$route.params.end){
	  		this.str_time='1970/1/1';
		  	this.end_time=nowtime.toLocaleDateString();
		  	let _this=this;
	  	}
//	  	this.listData=[{},{}]
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
					width: 20%;
				}
				.li-value{
					width: 80%;
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
	.warp-title{
		width: 100%;
		box-sizing: border-box;
	    padding: 10px 10px 5px 10px;
	    font-size: 16px;
	    display: flex;
	    justify-content: flex-end;
	    .title-name{
	    	color:@FTC2;
	    	font-size:14px;
	    	.title-sum{
	    		color: rgb(245, 108, 108);
	    	}
	    }
	}
	.warp-total{
		background: #FFFFCC;
		box-sizing: border-box;
		padding: 10px;
		.title-name{
	    	font-size:14px;
	    	color:@FTC2;
	    	display: flex;
			justify-content: space-between;
			.title_name{
				text-align: center;
			}
	    	.title-sum{
	    		margin-top: -10px;
	    		text-align: center;
	    		color: rgb(245, 108, 108);
	    	}
	    }
	}
	.no-list{
		/*position: relative;*/
		margin-top: 234px;
		background: #fff;
		width: 100%;
		img{
			width: 280px;
			height: 260px;
			position: relative;
			left: 50%;
			margin-left: -140px;
		}
		.no-text{
			font-size: 20px;
			color: @FTC4;
			text-align: center;
			padding-bottom: 10px;
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
	.list-box{
		width:100%;
		box-sizing: border-box;
		padding: 11px 10px 10px 10px;
		background: @BGgrey;
		position: relative;
		margin-top: 222px;
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