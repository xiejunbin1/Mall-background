<template>
	<div class="getcell-main">
		<van-tabs v-model="active" sticky swipeable class="tabs" @click='onClick' >
			<van-tab v-for="(item,index) in tabdatas" :key="index">
				<div slot='title' class="vant-tab">
					{{item.title}}
				</div>
			</van-tab>	
		</van-tabs>	
		<div class="search-list">
			<div class="search-li">
				<div class="search-li-div">
					<div class="li-title">时间</div>
					<div class="li-value">
						<span class="manaeg-input"/>
						<span @click="handletime1">{{str_time}}</span>
						<span style="color: #606266;">&nbsp;至&nbsp;</span>
						<span @click="handletime2">{{end_time}}</span>
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
				<van-button size="small" type="primary" >查询</van-button>
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
		<div style="margin-top: -20px;">
			<div v-if="listData.length==0" class="no-list">
				<img src="../../common/img/bg4.png" alt="" />
				<div class="no-text">暂 无 数 据</div>
			</div>
			<div class="count-list" v-for="(item,index) in listData" :key='index' @click="handleToNext(item.addressId,item.address)">
				<div class="count-title">
					<div class="count-title-div">
						<div class="title-name">
							<span>店铺：{{item.address}}</span>
						</div>
						<div class="title-more">
							<span >查看详情</span>
							<i class="icon iconfont icon-icon11"></i>
						</div>
					</div>
				</div>
				<div class="count-ui" style="border-bottom: 1px solid #EBEEF5;">
					<div class="count-ui-div">
						<div class="count-li">
							<div class="count-name">线上收益</div>
							<div class="count-value">{{item.amount}}元</div>
						</div>
					</div>
				</div>
				<div class="count-ui" style="border-bottom: 1px solid #EBEEF5;padding-bottom: 15px;">
					<div class="count-ui-div">
						<div class="count-li count-li2">
							<div class="count-name">合计投币</div>
							<div class="count-value">{{item.coinsLine+item.coins}}个</div>
						</div>
						<div class="count-bili">
							线上{{item.coinsLine}}个，线下{{item.coins}}个
						</div>
					</div>
				</div>
				<div class="count-ui">
					<div class="count-ui-div">
						<div class="count-li count-li2">
							<div class="count-name">礼品消耗</div>
							<div class="count-value">0个，0.00元</div>
						</div>
						<div class="count-bili">
							出礼比例 0/0
						</div>
					</div>
				</div>
			</div>
			<!--</router-link>-->
		</div>
		<div style="margin-top: 20px;margin-bottom: 60px;">
			<van-pagination 
			  v-model="pno" 
			  :total-items="total" 
			  :show-page-size="3" 
			  force-ellipses
			  @change='handlePno'
			/>
		</div>
		
		<van-popup v-model="addressDig" :overlay="true">
		  	<div class="cargo-title">
				货道初始化
			</div>
			<div class="cargo" style="min-width: 250px;padding: 10px;">
				<div class="cargo-box">
		  			<span class="cargo-name">货道数量：</span>
		  			<span class="cargo-value">
		  			</span>
		  		</div>
			</div>
			<div class="cargo-btns">
				<div class="cargo-no" @click='intmanage=false'>取消</div>
			</div>
		</van-popup>
		
		<van-popup v-model="show" position="bottom" :overlay="true">
		  	<van-picker :columns="columns" show-toolbar @confirm='onConfirm'/>
		</van-popup>
		
		<van-popup v-model="show1" position="bottom" :overlay="true">
		  	<van-datetime-picker
			  v-model="currentDate1"
			  type="date"
			  @confirm='onStateTimeConfirm'
			  :max-date="maxDate2"
			/>
		</van-popup>
		<van-popup v-model="show2" position="bottom" :overlay="true">
		  	<van-datetime-picker
			  v-model="currentDate2"
			  type="date"
			  @confirm='onEndTimeConfirm'
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
    	totalMount:0,
		totalCoinsLine:0,
		totalCoins:0,
    	pno:1,
    	total:0,
    	addressDig:false,
      	active:0,
      	tabdatas:[{"title":'今日','ip':1},
				{"title":'昨天','ip':2},
				{"title":'一周内','ip':3},
				{"title":'一月内','ip':4}
		],
		listData:[],
		columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
		show: false,
		address_value:'全部',
		show1:false,
		show2:false,
		currentDate1: new Date(),
		maxDate2: new Date(),
		currentDate2: new Date(),
		str_time:'',
		end_time:'',
		manage_status_list:[],
		str_time_t:new Date().getTime(),
		end_time_t:new Date().getTime(),
		manage_classfiy_list:[],
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//跳转到设备列表页
	handleToNext(val,val2){
		this.$router.push({name: 'managecount',params:{ id:val,str:this.str_time,end:this.end_time,address:val2}});
	},
	//页码切换事件
	handlePno(){
		let _this=this
		axios({
			method:'get',
			url:url.adminurl+'/api/OrderApi/AddresseSummary?page='+this.pno+'&beginTime='+this.str_time+'&endTime='+this.end_time,
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
	//查询
	handlesubmit(){
		let _this=this;
		let isTime=this.str_time_t<=this.end_time_t+86400*1000
		
		if(isTime){
			this.pno=1
			axios({
				method:'get',
				url:url.adminurl+'/api/OrderApi/AddresseSummary?page=1&beginTime='+this.str_time+'&endTime='+this.end_time,
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
	handleSearch(n){
		
	},
	handleDig1(){
		this.addressDig=!this.addressDig
	},
	//标题点击事件
	onClick(index, title){
		console.log(index)
		let _this=this;
		if(index==0){
			this.str_time=new Date().toLocaleDateString()
			this.end_time=new Date().toLocaleDateString()
			axios({
				method:'get',
				url:url.adminurl+'/api/OrderApi/AddresseSummary?page='+this.pno+'&beginTime='+new Date().toLocaleDateString()+'&endTime='+new Date().toLocaleDateString(),
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
				url:url.adminurl+'/api/OrderApi/AddresseSummary?page='+this.pno+'&beginTime='+beginTime+'&endTime='+endTime,
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
				url:url.adminurl+'/api/OrderApi/AddresseSummary?page='+this.pno+'&beginTime='+beginTime+'&endTime='+endTime,
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
				url:url.adminurl+'/api/OrderApi/AddresseSummary?page='+this.pno+'&beginTime='+beginTime+'&endTime='+endTime,
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
   	onConfirm(value){
   		this.address_value=value;
   		this.show=!this.show
   	},
   	onStateTimeConfirm(value){
   		this.show1=!this.show1;
   		this.str_time_t=value.getTime()
		this.str_time=value.toLocaleDateString()
		let _this=this;
		let isTime=this.str_time_t<=this.end_time_t+86400*1000
		if(isTime){
			this.pno=1
			axios({
				method:'get',
				url:url.adminurl+'/api/OrderApi/AddresseSummary?page=1&beginTime='+this.str_time+'&endTime='+this.end_time,
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
   	onEndTimeConfirm(value){
   		let _this=this
   		this.show2=!this.show2;
   		if(this.str_time_t<=value.getTime()+86400*1000){
   			this.end_time_t=value.getTime()
			this.end_time=value.toLocaleDateString()
			this.pno=1
			axios({
				method:'get',
				url:url.adminurl+'/api/OrderApi/AddresseSummary?page=1&beginTime='+this.str_time+'&endTime='+this.end_time,
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
   	handleDig(){
   		this.show=!this.show;
   	},
   	handletime1(){
   		this.show1=!this.show1;
   	},
   	handletime2(){
   		this.show2=!this.show2;
   	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
	let _this=this;
	// this.str_time=nowtime.toLocaleDateString();
	// this.end_time=nowtime.toLocaleDateString();
	const promise = new Promise((resolve,reject)=>{
		let nowtime=new Date();
		resolve(nowtime)
	})
	//获取场地流水列表数据
  	promise.then((nowtime)=>{
		this.str_time=nowtime.toLocaleDateString();
		this.end_time=nowtime.toLocaleDateString();
		axios({
			method:'get',
			url:url.adminurl+'/api/OrderApi/AddresseSummary?page='+this.pno+'&beginTime='+nowtime.toLocaleDateString()+'&endTime='+nowtime.toLocaleDateString(),
			responseType:'json'
		}).then((res)=>{
			_this.listData=res.data.data
			_this.total=res.data.totalCount
			_this.totalMount=res.data.totalMount
			_this.totalCoinsLine=res.data.totalCoinsLine
			_this.totalCoins=res.data.totalCoins
		}).catch(err=>{
			submitTest(err,_this);
		})
	})
	//获取场地流水列表数据
	// setTimeout(() => {
	// 	axios({
	// 	method:'get',
	// 	url:url.adminurl+'/api/OrderApi/AddresseSummary?page='+this.pno+'&beginTime='+nowtime.toLocaleDateString()+'&endTime='+nowtime.toLocaleDateString(),
	// 	responseType:'json'
	// }).then((res)=>{
	// 	_this.listData=res.data.data
	// 	_this.total=res.data.totalCount
	// 	_this.totalMount=res.data.totalMount
	// 	_this.totalCoinsLine=res.data.totalCoinsLine
	// 	_this.totalCoins=res.data.totalCoins
	// }).catch(err=>{
	// 	submitTest(err,_this);
	// })
	// },300);
//	this.listData=[{},{}]
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
	.span{
		border-bottom:1px solid @BOX3;
		justify-content: flex-end;
	}
	.warp-title{
		width: 100%;
		box-sizing: border-box;
	    padding: 10px 10px 5px 10px;
	    font-size: 16px;
	    display: flex;
	    justify-content: flex-end;
		
	    
	}
	.warp-total{
		background: #FFFFCC;
		box-sizing: border-box;
		padding: 10px;
		.title-name{
			/*width: 33%;*/
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
	    .title-more{
	    	/*text-align: end;*/
	    }
	}
	.cargo-title{
		padding: 10px 0;
		text-align: center;
		font-size: 16px;
		font-weight: bold;
		border-bottom: 1px solid @BOX4;
	}
	.cargo-btns{
		display: flex;
		justify-content: space-between;
		.cargo-no{
			width: 50%;
			text-align: center;
			font-size: 15px;
			padding: 10px 0;
			border-top: 1px solid @BOX4;
			border-right: 1px solid @BOX4;
		}
		.cargo-yes{
			width: 50%;
			text-align: center;
			font-size: 15px;
			padding: 10px 0;
			border-top: 1px solid @BOX4;
		}
	}
	.cargo{
		.cargo-box{
			display: flex;
			justify-content: space-between;
			.cargo-name{
				line-height: 30px;
				font-size: 15px;
			}
		}
	}
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
	.no-list{
		margin-top: 20px;
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
		}
	}
	.count-list{
		margin-top: 20px;
		padding-bottom: 10px;
		box-shadow: @BOXcurrency;
		.count-title{
			background: #CECECE;
			border-radius: 8px 8px 0 0;
			.count-title-div{
				width: 97%;
				margin: 0 auto;
				padding: 10px 0;
				display: flex;
				justify-content: space-between;
				.title-name{
					/*width: 100%;*/
					font-size: 15px;
					font-weight: bold;
				}
				.title-more{
					font-size: 14px;
					line-height: 20px;
					color: #409EFF;
					.icon{
						margin-top: -2px;
					}
				}
				.title-price{
					width: 45%;
					text-align: right;
					font-size: 17px;
					font-weight: bold;
				}
			}
		}
		.count-ui{
			.count-ui-div{
				width: 97%;
				margin: 0 auto;
				.count-li{
					padding:10px 0;
					display:flex;
					justify-content:space-around;
					font-size:15px;
					.count-name{
						width: 30%;
						text-align: left;
					}
					.count-value{
						width: 65%;
						text-align: right;
						.count-s{
							font-size: 12px;
							color: @FTC3;
						}
					}
				}
				.count-li2{
					padding:10px 0 0 0;
				}
				.count-bili{
					padding: 0 10px 0 5px;
					text-align: end;
					font-size: 12px;
					color: @FTC3;
				}
			}
		}
	}
}
</style>