<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="收益记录"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		
		<div class="search-list">
			<div class="search-li">
				<div class="search-li-div">
					<div class="li-title">时间</div>
					<div class="li-value">
						<span @click="handletime1" class="value_span">{{str_time}}</span>
						<span class="time_text">&nbsp;至&nbsp;
						</span><span @click="handletime2" class="value_span">{{end_time}}</span>
					</div>
				</div>
			</div>
			<div class="search-li">
				<div class="search-li-div">
					<div class="search-title">设备编号：</div>
					<div class="search-input">
						<input type="text" placeholder="默认全部" v-model="user_id"/>
					</div>
				</div>
			</div>
			<!--<div class="search-li">
				<div class="search-li-div">
					<div class="search-title">订单id：</div>
					<div class="search-input">
						<input type="text" placeholder="默认全部" v-model="recharge_id" />
					</div>
				</div>
			</div>-->
			<div class="search-li" @click="handleshowstatus">
				<div class="search-li-div">
					<div class="search-title2">设备场地：</div>
					<div class="search-check">
						<span>{{status_text}}</span>
						<span>请选择<i class="icon iconfont icon-iconfontjiantou5"></i></span>
					</div>
				</div>
			</div>
			<div class="search-li">
				<div class="search-li-div2">
					<van-button size="small" type="warning" style='margin-right: 30px;' @click='handlenow'>重置搜索</van-button>
					<van-button size="small" type="primary" @click='handlesubmit'>确认查询</van-button>
				</div>
			</div>
		</div>
		
		<div class='mael-title'>
		  <div class="meal-title-div">
		  	<span>共{{listsum}}条数据</span>
		  	<!--<span class="title-icon" style="color: #666;">
		  		点击列表可修改
		  	</span>-->
		  </div>
		</div>
		
		<div class="log-body">
			<div class="log-li" v-for="(item,index) in dataList" :key="index" :data-index = "index" >
				<div class="li-tier li-tier3">
					<div class="li-tier-div">
						<div>用户ID：<span class="li-tier-value">{{item.userId}}</span></div>
						<!--<div class="li-tier-d1">昵称：<span class="li-tier-value">{{item.nickName}}</span></div>-->
					</div>
				</div>
				<div class="li-tier">
					<div class="li-tier-div">
						<div class="li-tier-d1">昵称：<span class="li-tier-value">{{item.nickName}}</span></div>
						<div class="li-tier-d1">
							发货状态：
							<span class="color1" v-show="item.status">{{item.statusText}}</span>
							<span class="color2" v-show="!item.status">{{item.statusText}}</span>
						</div>
					</div>
				</div>
				<div class="li-tier">
					<div class="li-tier-div">
						<div class="li-tier-d1">收货人：<span class="li-tier-value">{{item.name}}</span></div>
						<!--<div class="li-tier-d1">发货人：<span class="li-tier-value">{{item.toName}}</span></div>-->
					</div>
				</div>
				<div class="li-tier ">
					<div class="li-tier-div">
						<div class="li-tier-d1">商品名称：<span class="li-tier-value">{{item.title}}</span></div>
						<div class="li-tier-d1">商品价格：<span class="li-tier-value">{{item.price|moneyFilter}}</span></div>
					</div>
				</div>
				<div class="li-tier">
					<div class="li-tier-div2">
						中奖时间：<span class="li-tier-value">{{item.createTime}}</span>
					</div>
				</div>
				<div class="li-tier">
					<div class="li-tier-div2">
						收货地址：<span class="li-tier-value">{{item.address}}</span>
					</div>
				</div>
				<div class="li-tier li-tier2">
					<div class="li-tier-div2">
						物流号：<span class="li-tier-value">{{item.expressNo}}</span>
					</div>
				</div>
				
			</div>
		</div>
		<!-- 分页 -->
		<van-pagination 
		  v-model="pno" 
		  :total-items="listsum" 
		  :show-page-size="5" 
		  @change='handlePno'
		  :items-per-page='15'
		/>
		
		<van-dialog
		  v-model="show"
		  show-cancel-button
		  :before-close="beforeClose1"
		>
		  <div class="dia-item">
		  	<div class="dia-item-div">
		  		<div class="dia-title">设备场地</div>
			  	<div class="check-item" v-for="(item,index) in revise_list" :key='index'>
					<i class="icon iconfont icon-fuxuankuang" v-if="!item.check" @click='oncheck1' :data-value = "item.address" :data-index = "index"></i>
					<i class="icon iconfont icon-fuxuankuang3" v-if="item.check" @click='oncheck1' :data-value = "item.address" :data-index = "index"></i>
					<span>{{item.address}}</span>
				</div>
		  	</div>
		  </div>
		  <van-field
		    v-model="reviseData.mobile"
		    label="物流号"
		    placeholder="请输入物流号"
		  />
		</van-dialog>
		
		<!-- 开始时间选择 -->
		<van-popup v-model="show1" position="bottom" :overlay="false">
		  	<van-datetime-picker
			  v-model="currentDate1"
			  type="date"
			  title='开始时间'
			  @confirm='onConfirm1'
			  @cancel='onCancel1'
			  :max-date="maxDate2"
			/>
		</van-popup>
		<!--  结束时间选择 -->
		<van-popup v-model="show2" position="bottom" :overlay="false">
		  	<van-datetime-picker
			  v-model="currentDate2"
			  type="date"
			  title='结束时间'
			  @confirm='onConfirm2'
			   @cancel='onCancel2'
			  :max-date="maxDate2"
			/>
		</van-popup>
		<van-popup v-model="showstatus">
			<div class="popup-status" style="min-width: 200px;padding: 10px;">
				<div v-for="(item,index) in revise_list" style="padding: 5px 0;font-size: 16px;" :key="index" :data-index = "index" @click="handlestatusdia">
					<i class="icon iconfont icon-weixuanzhong" v-if="!item.check"></i> 
					<i class="icon iconfont icon-danxuanxuanzhong" v-if="item.check"></i> 
					<span>{{item.address}}</span>
				</div>
			</div>
		</van-popup>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {toMoney} from '@/moneyFilter.js'
import { Dialog } from 'vant';
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'

export default {
  name: 'rechargelog',
  data () {
    return {
    	manage_status_list:[],
    	showstatus:false,
    	status_text:'全部',
    	status_id:-1,
    	user_id:'',   //查询用户id
    	type_id:-1,   //当前选择订单类型id
    	type_recharge:[],
    	revise_list:[],
    	recharge_id:'',    //订单id
    	currentDate1: new Date(),
    	currentDate1_time:new Date().toLocaleDateString(),   //当前选中开始时间的时间戳
		maxDate2: new Date(),
		currentDate2: new Date(),
		currentDate2_time:new Date().toLocaleDateString(),   //当前选中结束时间的时间戳
		str_time:'',
		end_time:'',
    	pno:1,    //当前页码
    	listsum:0,
    	totalAmount:0,
    	show1:false,
    	show2:false,
      	dataList:[],
      	reviseData:{
      		status:0,
      		mobile:'',
      		orderId:0
      	},
      	show:false,
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	handleshowstatus(){
		this.showstatus=!this.showstatus
	},
	//修改类型选择复选框
	oncheck1(e){
		let values = e.currentTarget.dataset.value;
		let index = e.currentTarget.dataset.index;
		console.log(values,index)
		console.log(this.revise_list)
		for (var i=0;i<this.revise_list.length;i++) {
			if(i!=index){
				this.revise_list[i].check=false
			}
			this.revise_list[index].check=true
		}
	},
	//选择场地弹出层
  	handlestatusdia(e){
  		let _this=this
  		const index = e.currentTarget.dataset.index;
  		// console.log(index)
		for(var i=0;i<this.revise_list.length;i++){
			this.revise_list[i].check=false
		}
  		this.revise_list[index].check=!this.revise_list[index].check
  		this.showstatus=false,
		this.status_text=this.revise_list[index].address
		this.status_id=this.revise_list[index].id
  	},
	//修改弹出层开关
	handleshow(e){
		let index = e.currentTarget.dataset.index;
		// console.log(this.dataList[index].mobile)
		
		for (var i=0;i<this.revise_list.length;i++) {
			if(i!=index){
				this.revise_list[i].check=false
			}
			this.revise_list[index].check=true
		}
		// console.log(this.revise_list)
		this.reviseData.mobile=this.dataList[index].expressNo
		this.reviseData.orderId=this.dataList[index].id
		this.show=!this.show
	},
	//修改确认
	beforeClose1(action, done){
		let _this=this;
		this.show=!this.show
		if (action === 'confirm') {
			// console.log(this.reviseData)
			let n=this.reviseData
			if(n.mobile&&n.orderId){
				let fromData=qs.stringify({
					id:n.orderId,
					expressNo:n.mobile,
				})
		  		
		  		axios({
					method: 'post',
				    url:'/Shop/ShStateUpdate',
				    data:fromData
				}).then(res=>{
					// console.log(res.data)
					
				}).catch(err=>{
					submitTest(err,_this);
				})
			}else{
				alert('物流号不能为空')
			}
			done();
		}else{
			done();
		}
	},
	//重置搜索按钮
	handlenow(){
		let _this=this;
		this.pno=1;
		this.type_id=-1;
		for (var i=0;i<this.manage_status_list.length;i++) {
			if(i!=0){
				this.manage_status_list[i].check=false
			}
			this.manage_status_list[0].check=true
		}
		this.user_id=''
		this.status_id=0
		this.status_text='全部'
		this.recharge_id=''
		this.currentDate1_time=new Date().toLocaleDateString()
		this.currentDate2_time=new Date().toLocaleDateString()
		this.currentDate1=new Date()
		this.currentDate2=new Date()
		this.str_time=new Date().toLocaleDateString()
		this.end_time=new Date().toLocaleDateString()
		
		let time=new Date().toLocaleDateString()
	  	axios({
			method:'get',
			url:'/api/GamePrizeApi/List?userId=0&endTime='+time+'&beginTime='+time+'&page=1&status=-1',
			responseType:'json'
		}).then((res)=>{
			// console.log(res)
			this.listsum=res.data.totalCount
			this.totalAmount=res.data.totalAmount
			this.dataList=res.data.data
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
	//确认查询按钮
	handlesubmit(){
		let _this=this;
		let userId;
  		let orderId;
		if(this.user_id){
			userId=this.user_id  //用户id
		}else{
			userId=0  //用户id
		}
		if(this.recharge_id){
			orderId=this.recharge_id
		}else{
			orderId=0   //订单id
		}
		let beginTime=this.currentDate1_time,  //开始时间
			endTime=this.currentDate2_time,   //结束时间
			page=this.pno,   //当前页码
			type=this.status_id   //订单类型id
		
	  	axios({
			method:'get',
			url:'/api/GamePrizeApi/List?userId='+userId+'&endTime='+endTime+'&beginTime='+beginTime+'&page='+page+'&status='+type,
			responseType:'json'
		}).then((res)=>{
			// console.log(res)
			this.listsum=res.data.totalCount
			this.totalAmount=res.data.totalAmount
			this.dataList=res.data.data
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
	//订单类型选择复选框
	oncheck(e){
		let values = e.currentTarget.dataset.value;
		let index = e.currentTarget.dataset.index;
		console.log(values,index)
		for (var i=0;i<this.type_recharge.length;i++) {
			if(i!=index){
				this.type_recharge[i].check=false
			}
			this.type_recharge[index].check=true
		}
		this.type_id=values;
	},
	//开始时间确定
	onConfirm1(value){
   		this.show1=!this.show1;
   		// console.log(value.toLocaleDateString(),value.getTime())
   		this.str_time=value.toLocaleDateString()
   		this.currentDate1_time=value.toLocaleDateString();
   	},
   	//开始时间取消
   	onCancel1(){
   		this.show1=!this.show1;
   	},
   	//结束时间确定
   	onConfirm2(value){
   		this.show2=!this.show2;
   		// console.log(value.toLocaleDateString(),value.getTime())
   		this.end_time=value.toLocaleDateString()
   		this.currentDate2_time=value.toLocaleDateString();
   	},
   	//开始时间取消
   	onCancel2(){
   		this.show2=!this.show2;
   	},
	//切换页码
	handlePno(){
		let _this=this;
		let userId;
  		let orderId;
		if(this.user_id){
			userId=this.user_id  //用户id
		}else{
			userId=0  //用户id
		}
		if(this.recharge_id){
			orderId=this.recharge_id
		}else{
			orderId=0   //订单id
		}
		let beginTime=this.currentDate1_time,  //开始时间
			endTime=this.currentDate2_time,   //结束时间
			page=this.pno,   //当前页码
			type=this.status_id   //订单类型id
		
	  	axios({
			method:'get',
			url:'/api/GamePrizeApi/List?userId='+userId+'&endTime='+endTime+'&beginTime='+beginTime+'&page='+page+'&status='+type,
			responseType:'json'
		}).then((res)=>{
			// console.log(res)
			this.listsum=res.data.totalCount
			this.totalAmount=res.data.totalAmount
			this.dataList=res.data.data
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
	//开始时间开关
	handletime1(){
   		this.show1=!this.show1;
   	},
   	//结束时间开关
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
  	let nowtime=new Date();
  	this.str_time=nowtime.toLocaleDateString();
  	this.end_time=nowtime.toLocaleDateString();
  	
  	let userId;
  	let orderId;
	if(this.user_id){
		userId=this.user_id  //用户id
	}else{
		userId=0  //用户id
	}
	if(this.recharge_id){
		orderId=this.recharge_id
	}else{
		orderId=0   //订单id
	}
	let beginTime=this.currentDate1_time,  //开始时间
		endTime=this.currentDate2_time,   //结束时间
		page=this.pno,   //当前页码
		type=this.status_id   //订单类型id
	
  	axios({
		method:'get',
		url:'/api/GamePrizeApi/List?userId='+userId+'&endTime='+endTime+'&beginTime='+beginTime+'&page='+page+'&status='+type,
		responseType:'json'
	}).then((res)=>{
		// console.log(res.data.data)
		this.listsum=res.data.totalCount
		this.dataList=res.data.data
	}).catch(err=>{
		submitTest(err,_this);
	})
//	//获取发货状态--修改时发货状态选择
//	axios({
//		method:'get',
//		url:'/api/GamePrizeApi/PrizeStatusList',
//		responseType:'json'
//	}).then((res)=>{
//		console.log(res)
//		this.revise_list=res.data
//	}).catch(err=>{
//		submitTest(err,_this);
//	})
	//获取场地列表数据
	axios({
		method:'get',
		url:'/api/MachineAddressApi/List',
		responseType:'json'
	}).then((res)=>{
		// console.log(res.data)
		this.revise_list=res.data
	}).catch(err=>{
		submitTest(err,_this);
	})
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
.span{
	display: flex;
}
.getcell-main{
	.log-body{
		margin-top: -10px;
		.log-li{
			margin-top: 10px;
			border-top: 1px solid @BOX3;
			box-shadow: @BOXcurrency;
			.li-tier{
				padding: 10px 0;
				.li-tier-div{
					width: 97%;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					.li-tier-d1{
						width: 49%;
					}
					.li-tier-value{
						color: @BGwarning;
					}
					.li-tier-value1{
						color: @BGsuccess;
					}
					.li-tier-value2{
						color: @BGdanger;
					}
				}
				.li-tier-div2{
					width: 97%;
					margin: 0 auto;
					.li-tier-d1{
						width: 49%;
						.color1{
							color: @BGdanger;
						}
						.color1{
							color: @BGsuccess;
						}
					}
					.li-tier-value{
						color: @BGwarning;
					}
				}
			}
			.li-tier2{
				border-bottom: 1px solid @BOX3;
			}
			.li-tier3{
				border-bottom: 1px solid @BOX3;
			}
		}
	}
	.mael-title{
		margin-top: 5px;
		background:#FFFBE8;
		padding:10px 0;
		.meal-title-div{
			width: 95%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			color: @BGdanger;
			font-size:15px;
			.title-icon{
				.icon-fuxuankuang3{
					color: @BGsuccess;
					font-size: 22px;
				}
				.icon-fuxuankuang{
					background: #fff;
					font-size: 22px;
				}
			}
		}
	}
	.search-list{
		box-shadow: @BOXcurrency;
		.search-li{
			background: #fff;
			padding: 10px;
			font-size: 14px;
			border-bottom: 1px solid @BOX3;
			.search-li-div2{
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: flex-end;
			}
			.search-li-div{
				width: 97%;
				margin: 0 auto;
				display: flex;
			    flex-wrap: wrap;
				font-size: 16px;
				.li-title{
					width: 40px;
					text-align: left;
				}
				.li-value{
					width: 85%;
					height: 21px;
					overflow: hidden;
					color: @BGblue;
					display: flex;
					justify-content: space-between;
					.time_text{
						color: #606266;
					}
					.value_span{
						text-align: center;
						height: 100%;
						width: 45%;
						line-height: 21px;
						box-sizing: border-box;
						border: 1px solid @BGblue;
						border-radius: 5px;
					}
				}
				.search-input{
					border: 1px solid @BGblue;
					border-radius: 5px;
					padding:1px 5px;
					input{
						border:none;
						background: #fff;
						color: @BGblue;
					}
					
				}
				.search-title2{
					width: 80px;
				}
				.search-check{
					width: 75%;
					display: flex;
					justify-content: space-between;
					.check-item{
						margin-left: 5px;
						width: 33%;
						.icon{
							font-size: 22px;
						}
						.icon-fuxuankuang3{
							color: @BGsuccess;
						}
					}
				}
			}
		}
	}
	.dia-item{
		width: 100%;
		padding: 10px 0 0px 5px;
		.dia-item-div{
			width: 92%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.dia-title{
				color: #666;
				font-size: 14px;
			}
		}
	}
}
</style>