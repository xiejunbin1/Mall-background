<template>
	<div class="main">
		<div class="header">
			<van-notice-bar
			  @click='handleToBank'
			  text="根据央行规定需要绑定银行卡,请您尽快绑定，以免影响资金结算"
			  mode="link"
			/>
			<div class="user-income">
				<div class="user-income-info">
					<div class="user-img">
						<img :src='userImg' alt="" />
						<span class="user_name">{{user_name}}</span>
						<!--<span class="user_name">发送卡拿到布鲁克</span>-->
					</div>
					<div class="sum-income">
						<span class="income-text" v-if="this.GLOT.finance_today">今日总收益（元）</span>
						
						<span class="income-num" v-if="this.GLOT.finance_today">{{todayMoney|moneyFilter}}</span>
					</div>
					<!--<div class="btn-div">
						<span class="btn-info">查看详情</span>
					</div>-->
					<span class="user_num">NO:{{numb}}</span>
				</div>
			</div>
			<!--<div class="income-class">
				<div class="class-pay on-line">
					<span>线上支付</span>
					<br />
					<span>0.00元</span>
				</div>
				<div class="class-pay cash">
					<span>现金收益</span>
					<br />
					<span>0.00元</span>
				</div>
			</div>-->
		</div>
		<div class="main-body">
			<div class="carte-list1">
				<div class="carte-classify">
					<router-link to="/site_list" class="carte1-li carte1-li1" tag="div" v-if="this.GLOT.machine_mger">
						<div class="classify-bg-div">
							<div class="bg-div bg-div1">设备管理</div>
							<div class="bg-div bg-div2">在线 
								<span>{{online}}</span>
								/
								<span>{{allline}}</span>
								台
							</div>
						</div>
					</router-link>
					
					<router-link :to="{path:'moneycount',name:'moneycount',params:{manageid:123}}" tag="div" class="carte1-li carte1-li2" v-if="this.GLOT.finance_turnover">
						<div class="classify-bg-div">
							<div class="bg-div bg-div1">销售统计</div>
							<div class="bg-div bg-div2">
								销售数据统计
							</div>
						</div>
					</router-link>
					
					<router-link to="/goodmanage" tag="div" class="carte1-li carte1-li3" v-if="this.GLOT.product_mger" >
						<div class="classify-bg-div">
							<div class="bg-div bg-div1">商品管理</div>
							<div class="bg-div bg-div2">
								上架/修改/删除
							</div>
						</div>
					</router-link>
				</div>
			</div>
			<div class="carte-list2">
				<div class="carte-classify2">
					<router-link to="/manageana" tag="div" class="carte2-li carte2-li1" v-if="this.GLOT.machine_bing">
						<i class="icon iconfont icon-zhuce1"></i>
						<p class="classify-info">设备注册</p>
					</router-link>
					<!--<router-link to="/base" tag="div" class="carte2-li carte2-li2">-->
					<!--<router-link to="/phonereg" tag="div" class="carte2-li carte2-li2">-->
					<div class="carte2-li carte2-li2" @click="handleToSign" v-if="this.GLOT.mine_address">	
						<i class="icon iconfont icon-gongju3"></i>
						<p class="classify-info">地址管理</p>
					</div>
					<!--</router-link>-->
					<!--</router-link>-->
					<!--<div class="carte2-li carte2-li3">
						<i class="icon iconfont icon-shouchiPOStubiaoku_huabanfuben"></i>
						<p class="classify-info">账务查询</p>
					</div>-->
					<router-link to="/mealshop" tag="div" class="carte2-li carte2-li3" v-if="this.GLOT.machine_meal">
						<i class="icon iconfont icon-tubiaozhizuomoban-"></i>
						<p class="classify-info">充值管理</p>
					</router-link>
					<router-link to="/changeStatements" class="carte2-li carte2-li4" tag="div" v-if="this.GLOT.finance_income">
						<i class="icon iconfont icon-huobi changtable"></i>
						<p class="classify-info">财务报表</p>
					</router-link>
					<!--<router-link to="/sellerreg" class="carte2-li carte2-li5" tag="div">-->
					<div class="carte2-li carte2-li5" @click="handleToweb" v-if="this.GLOT.mine_merchant">
						<i class="icon iconfont icon-gongju1"></i>
						<p class="classify-info">商户资料</p>
					</div>
					<!--</router-link>-->
				</div>
			</div>
			<!--<div class='carte-list carte-list3' @click="handleTomeal">
				<van-cell-group>
				  <van-cell icon="shop" label="优惠设置" is-link>
				    <template slot="title">
				      <span class="van-cell-text">优惠设置</span>
				    </template>
				  </van-cell>
				</van-cell-group>
			</div>-->
			
			<div class="supply-title">
				<div class="supply-title-div">
					<i class="icon iconfont icon-redu2"></i>
					<span class="supply-text">缺货店铺</span>
				</div>
			</div>
			<div class="supply-list">
				<div class="supply-list-div">
					<div class="supply-no" v-show="lack.length==0">
						<img src="../../common/img/5a93c51cN3bb5e37b.png" alt="" />
						<br />
						<p>暂时没有待补货的店铺喔~</p>
					</div>
					<!-- <div class="supply-ul">
						<router-link :to="{path:'stockinfo',name:'lackgood',params:{aid:item.addressId,address:item.address}}" tag="div" class="info-summary" v-for="(item,index) in lack" :key="index">
							<div class="summary-img">
								<img src="../../common/hsuwt.jpg" alt="" />
							</div>
							<div class="summary-text">
								<div class="info-div">店铺：<i class="color-warning">{{item.address}}</i></div>
								<div class="info-div">缺货设备数：{{item.sum}}台<i class="color-warning"><i class="icon iconfont icon-quehuo1"></i></i></div>
							</div>
						</router-link>					
					</div> -->
					<lackgood></lackgood>
				</div>
			</div>
		</div>
		<div class="custom" @click="handleCustom">
			<i class="icon iconfont icon-kefu2"></i>
			<div>客服</div>
		</div>
		<van-popup v-model="iscustom">
			<div class="cargo" >
				<div class="cargo_title">客服咨询</div>
				<div class="cargo_content">长按识别二维码,添加微信好友,在线客服会实时为你解答.</div>
				<div class="cargo_img">
					<img src="../../common/img/kehucode.jpg" alt="" />
					
				</div>
				<div class="cargo_phone">
					联系电话: 020-86169815
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
import 'mint-ui/lib/style.css'
import store from '../../store/store' 
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {toMoney} from '@/moneyFilter.js'
import {submitTest} from '@/common/js/loginTest.js'
import {zhujian} from '@/common/js/common.js'
import ccc from '../index/index3.vue'
import lackgood from '../lack_good/lack_good.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      iscustom:false,
      numb:'',
      userImg: '',
      manageinfo:[],
      manage_class:'',
      lack:[],
      todayMoney:'',
      allline:0,
      online:0,
	  user_name:'',
	  ttt:'',
	  finance_today:false,//今日总收益
	  machine_mger:false,//设备管理
	  finance_turnover:false,//销售统计
	  product_mger:false,//商品管理
	  machine_bing:false,//设备注册
	  mine_address:false,//地址管理
	  machine_meal:false,//充值管理
	  finance_income:false,//财务报表
	  mine_merchant:false,//商户资料
    }
  },
  methods:{
  	//点击客服
  	handleCustom(){
  		console.log(123)
  		this.iscustom=!this.iscustom
  	},
  	handleToBank(){
  		this.$router.push({name: 'issign'});
  	},
  	handleTomeal(){
  		this.$router.push({name: 'licrelist'});
  	},
  	//商户资料页面跳转
  	handleToweb(){
		let _this=this;
		axios({
			method:'get',
			url:url.adminurl+'/api/MerchantApi/SignDetail',
			responseType:'json'
		}).then((res)=>{
			if (res.data.status == 'Success') {
				this.$router.push({name: 'issign'});
			} else if (res.data.status == 'Fail') {
				if(res.data.msg){
					this.$router.push({name: 'issign'});
				}else if(res.data.msg==""){
					this.$router.push({path:'/stuffIndex'})
				}
			}
		}).catch(err=>{
			submitTest(err,_this);
			this.status_err=true;
			
		})
  		
  	},
  	handleToSign(){
  		this.$router.push({name: 'addresslist'});
  	}
  },
  //实例化
  components:{
  	lackgood
  },
  //开始创建
  created(){
	  const promise = new Promise ((resolve,reject)=>{
		  zhujian()
		  resolve("成")
	  })
	  promise.then((err)=>{
		    this.finance_today = ccc.finance_today//今日总收益
			this.machine_mger = ccc.finance_today//设备管理
			this.finance_turnover = ccc.finance_today//销售统计
			this.product_mger = ccc.finance_today//商品管理
			this.machine_bing = ccc.finance_today//设备注册
			this.mine_address = ccc.finance_today//地址管理
			this.machine_meal = ccc.finance_today//充值管理
			this.finance_income = ccc.finance_today//财务报表
			this.mine_merchant = ccc.finance_today//商户资料
	  })
	  console.log(ccc.finance)
	  
	  store.state.user.username = this.iscustom//在首页给他赋值
	  
  	let _this=this;
  	axios({
		method:'get',
		url:url.adminurl+'/api/AccountApi/PersonalInfo',
		responseType:'json'
	}).then((res)=>{
		this.numb=res.data.numb
		this.userImg=res.data.headimgurl
		this.user_name=res.data.nickname
		
//		alert(res.data.headimgurl);
	}).catch((err)=>{
		submitTest(err,_this);
	})       
	axios({
		method:'get',
		url:url.adminurl+'/api/OrderApi/IncomeToday',
		responseType:'json'
	}).then((res)=>{
		this.todayMoney=res.data
	}).catch((err)=>{
		submitTest(err,_this);
	})
	axios({
		method:'get',
		url:url.adminurl+'/api/MachineApi/OnlineShow',
		responseType:'json'
	}).then((res)=>{
		this.allline=res.data[0].total
		this.online=res.data[1].total
	}).catch((err)=>{
		submitTest(err,_this);
	})
	this.lack=[{
		address:'开心游乐场',
		sum:1,
		addressId:1,
	},{
		address:'娱乐广场',
		sum:1,
		addressId:2,
	},{
		address:'贸易海港',
		sum:4,
		addressId:3,
	},{
		address:'商贸中心',
		sum:5,
		addressId:4,
	}]
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
	 
	// let _this = this
	// const promise = new Promise(function(resolve,reject){
	// 	axios({
	// 		method:'get',
	// 		url:url.adminurl+'/api/AccountApi/PersonalInfo',
	// 		responseType:'json'
	// 	}).then((res)=>{
	// 		// console.log(res.data.nickname)
	// 		resolve(res.data.nickname)
	// 	}).catch((err)=>{
	// 		submitTest(err,_this);
	// 	})       
	// })
	// function aaa(){
	// 	const promise1 = new Promise(function(resolve,reject){
	// 		promise.then(function(data){
	// 			let aaa = data = "xxx"
	// 			resolve(aaa)
	// 		})     
	// 	})
	// 	return promise1
	// }
	// aaa().then(res=>{
	// 	console.log(res,"444")
	// })
	
	// promise.then(function(data){
	// 	console.log(data,"data")
	// }) 
	
}
  
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	position: fixed;
	overflow: hidden;
}
.main{
	.cargo{
		min-width: 250px;
		max-width: 100%;
		padding: 10px;
		box-sizing: border-box;
		.cargo_title{
			color: #000;
			font-size: 17px;
			text-align: center;
		}	
		.cargo_content{
			color: @FTC2;	
			font-size: 14px;
			padding: 10px 0;		
		}
		.cargo_img{
			width: 100%;
			height: auto;
			padding: 5px 0 15px 0;
			border-bottom: 1px solid @BOX3;
			text-align: center;
			img{
				width: 60%;
				margin: 0 auto;
			}
		}
		.cargo_phone{
			text-align: center;
			font-size: 14px;
			color: @BGblue;
			padding: 10px 0 5px 0;
		}
	}
	.custom{
		position: fixed;
		bottom: 100px;
		right: 10px;
		width: 40px;
		height: 40px;
		background: @BGblue;
		border-radius: 50%;
		z-index: 1000;
		color: #fff;
		text-align: center;
		overflow: hidden;
		i{
			display: block;
			font-size: 18px;
			margin-top: 10px;
			line-height: 10px;
		}
	}
	.header{
		position: fixed;
		width: 100%;
		height: 200px;
		background-image: url('../../common/img/bg_3.jpg');
		background-repeat: no-repeat;
    	background-size: cover;
    	background-position: center 0;
		overflow: hidden;
		z-index: 1000;
		.user-income{
			position: absolute;
			width: 100%;
			height: 150px;
			.user-income-info{
				width: 90%;
				box-sizing: border-box;
			    padding: 17.5px 23px 17.5px 41px;
				/*background: #f44;*/
				margin: 0 auto;
				margin-top: 12px;
				display: flex;
				/*justify-content: space-between;*/
				.user-img{
					box-sizing: border-box;
					height: 80px;
					width: 80px;
					border-radius: 50%;
					border:4px solid #fff;
					/*overflow: hidden;*/
					position: relative;
					.user_name{
						overflow:hidden;
					    text-overflow:ellipsis;
					    white-space:nowrap;
						font-size: 14px;
						position: absolute;
						bottom: -25px;
						left: -38px;
						text-align: center;
						color: #fff;
						width: 150px;
					}
					img{
						height: 100%;
						width: 100%;
						border-radius: 50%;
					} 
				}
				.sum-income{
					margin-left: 30px;
					box-sizing: border-box;
					height: 80px;
					padding: 13px 0;
					/*width: 40%;*/
					/*background: #2C3E50;*/
					text-align: left;
					color: #fff;
					.income-text{
						display: block;
						font-size: 16px;
						margin-left: 5px;
					}
					.income-num{
						display: block;
						margin-left: 5px;
						/*margin-top: 20px;*/
						text-align: center;
						font-size: 30px;
						font-weight: bold;
					}
				}
				.btn-div{
					box-sizing: border-box;
					height: 100%;
					width: 35%;
					/*background: aqua;*/
					.btn-info{
						text-align: center;
						color: #fff;
						font-size: 14px;
						padding: 3px 20px;
						border: 1px solid #fff;
						border-radius: 10px;
						margin-top: 50%;
						position: relative;
						top: 35px;
					}
				}
				.user_num{
					position: absolute;
					right: 10px;
					top: 5px;
					color: #fff;
					font-size: 12px;
				}
			}
		}
		.income-class{
			position: absolute;
			bottom:0;
			width: 100%;
			height: 50px;
			padding-top: 5px;
			background: rgba(72,61,139,0.7);
			display: flex;
			justify-content: space-between;
			.class-pay{
				width: 50%;
				height: 100%;
				box-sizing: border-box;
				text-align: center;
				color: #fff;
				font-size: 15px;
			}
			.on-line{
				border-right: .3px solid @BOX3;
			}
			.cash{
				border-left: .3px solid @BOX3;
			}
		}
	}
	.main-body{
		padding-top: 200px;
		background: #FAF9F9;
		width: 100%;
		.carte-list1{
			width: 100%;
			padding: 10px 0;
			background: #fff;
			.carte-classify{
				width: 92%;
				margin: 0 auto;
				display: flex;
				// justify-content: space-between;
				.carte1-li:nth-child(1){
					margin-left: -0px;
				}
				.carte1-li{
					width: 32%;
					height: 70px;
					box-sizing: border-box;
					border-radius: 10px;
					background-repeat: no-repeat;
			    	background-size: cover;
			    	background-position: center 0;
					overflow: hidden;
					margin-left: 10px;
					
					.classify-bg-div{
						color: #fff;
						.bg-div{
							margin-left: 6%;
						}
						.bg-div1{
							margin-top: 7%;
							font-size: 17px;
							font-weight: 525;
						}
						.bg-div2{
							margin-top: 1%;
							font-size: 10px;
							font-weight: 525;
						}
					}
				}
				.carte1-li1{
					background-image: url('../../common/img/bg0.jpg');
				}
				.carte1-li2{
					background-image: url('../../common/img/bg3.jpeg');
				}
				.carte1-li3{
					background-image: url('../../common/img/bg1.jpeg');
				}
			}
		}
		.carte-list2{
			width: 100%;
			padding: 10px 0;
			padding-top: 0;
			background: #fff;
			.carte-classify2{
				width: 92%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.carte2-li{
					width: 19%;
					padding: 5px 0;
					box-sizing: border-box;
					/*background: #ddd;*/
					text-align: center;
					i{
						width: 100%;
						font-size: 30px;
					}
					.icon-zhuce1{
						color: #42B983;
					}
					.icon-gongju3{
						color: #f40;
					}
					.icon-tubiaozhizuomoban-{
						color: @BGblue;
					}
					.changtable{
						color: @BGwarning;
					}
					.icon-gongju1{
						color: @BGdanger;
					}
					.classify-info{
						margin: 0;
						font-size: 14px;
						color: @FTC2;
					}
				}
			}
		}
		.carte-list3{
			box-shadow: @BOXcurrency;
			margin-top: 8px;
		}
		.carte-list{
			width: 100%;
			.van-cell{
				font-size: 16px;
				.van-cell__left-icon{
					font-size: 20px;
				}
			}
		}
		.supply-title{
			padding: 10px 0;
			border-bottom: 1px solid @BOX3;
			.supply-title-div{
				width: 97%;
				margin: 0 auto;
				color: @FTC2;
				font-size: 15px;
				.icon-redu2{
					color: @BGdanger;
					font-size: 17px;
				}
			}
		}
		.supply-list{
			background: #fff;
			padding: 10px 0 50px 0;
			.supply-list-div{
				width: 97%;
				margin: 0 auto;
				.supply-no{
					/*line-height: 130px;*/
					text-align: center;
					font-size: 16px;
					color: @FTC3;
					img{
						width: 100px;
						height: 100px;
						display: block;
						margin: auto;
					}
					p{
						margin: 0;
						padding: 0;
					}
				}
				.supply-ul{
					.info-summary{
						width:100%;
						height: 72px;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						padding:8px;
						color: @FTC2;
						border-bottom:1px solid @BOX4;
						.summary-img{
							width:23%;
							overflow: hidden;
							img{
								width: 100%;
								height: 100%;
							}
						}
						.summary-text{
							width:75%;
							font-size: 15px;
							display: flex;
						    flex-direction: column;
						    justify-content: space-between;
							.info-div{
								.icon-quehuo1{
									color: @BGdanger;
									margin: 10px;
									font-size: 20px;
								}
							}
							.info-status{
								.icon-lixianmoshi{
									font-size: 20px;
									color: @BGdanger;
								}
								.icon-zaixianbaoming{
									font-size: 20px;
									color: @BGsuccess;
								}
							}
						}
					}
				}
			}
		}
	}
	
}
</style>