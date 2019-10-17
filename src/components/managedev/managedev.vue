<template>
	<div class="main">
		<div class="manage-classify">
			<div class="search-classfiy">
				<div class="search-classfiy-div">
					<div class="search-term search-status" @click="handleShowstatus">
						<div class="search-title">
							设备状态选择<i class="icon iconfont icon-f11"></i>
						</div>
						<div class="search-value">
							<span style="color:#67C23A;"><i class="icon iconfont icon-quanbu2"></i>{{manage_status}}</span>
						</div>
					</div>
					<div class="search-term search-ganre search-status" @click="handleShowclassfiy">
						<div class="search-title">
							设备类型选择<i class="icon iconfont icon-f11"></i>
						</div>
						<div class="search-value">
							<span style="color: #F56C6C;"><i class="icon iconfont icon-shebeiguanli1"></i>{{manage_ganre}}</span>
						</div>
					</div>
					<div class="search-term search-ganre" @click="handleShowAddress">
						<div class="search-title">
							设备地址选择<i class="icon iconfont icon-f11"></i>
						</div>
						<div class="search-value">
							<span style="color: #409EFF;"><i class="icon iconfont icon-xiangxidizhi3"></i>{{manage_address}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="manage-list">
				<div class="list-title">
					<div class="title-div">
						<span style="color: #F56C6C;">查询到{{listsum}}件商品</span>
						<span>
							<van-button size="mini" type="primary" @click='handleSearch' style='margin-top: 8px;'>查询</van-button>
							<van-button type="danger" size="mini" style='margin-left: 15px;' @click='handlenew'>重置搜索</van-button>
						</span>
					</div>
				</div>
				<div class="manage-li" v-for='(item,index) in manageList' :key='index'>
					<!--manageList-->
					<div class="manaeg-title" @click="handleToInfo(item.id,item.machineTypeId)">设备编号：{{item.machineNum}}</div>
					<div class="manaeg-text"  @click="handleToInfo(item.id,item.machineTypeId)">
						<div class="manage-img">
							<img src="../../common/img/afaz.png" alt="口红机" v-show="item.machineType=='口红机'"/>
							<img src="../../common/img/asdz.png" alt="售货机" v-show="item.machineType!='口红机'"/>
						</div>
						<div class="manaeg-syn">
							<div class="manaeg-class">
								类型：{{item.machineType}}
							</div>
							<div class="manage-name">
								名称：<span v-show="!item.remark==''"><span class="income">{{item.remark}}</span></span>
								<span class="noname" v-show="item.remark==''">请先设置</span>
							</div>
							<div class="manage-income">
								店铺：<span class="income">{{item.address}}</span>
							</div>
							<div class="manage-status-div">
								<div class="manage-status">
									<span v-show="item.status==0">
										<i class="icon iconfont icon-lixianmoshi"></i>
										{{item.statusText}}
									</span>
									<span v-show="item.status!=0">
										<i class="icon iconfont icon-zaixianbaoming"></i>
										{{item.statusText}}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="game_switch" v-show="item.machineTypeId=='3'||item.machineTypeId=='5'" v-if="item.gameEnable">
						<span style="margin-right: 5px;">
							商城游戏开关: <span class="switch_on" v-show="item.gameOnOff">开</span> <span class="switch_off" v-show="!item.gameOnOff">关</span>
						</span>
						<van-switch
						  v-model="item.gameOnOff"
						  size="20px"
						  @input="onInput(item.gameOnOff,item.machineNum)"
						/>
					</div>
				</div>
				<!-- 分页  -->
				<van-pagination 
				  v-model="pno" 
				  :total-items="listsum" 
				  :show-page-size="5" 
				  @change='handlePno'
				/>
				
			</div>
		</div>
		<van-popup v-model="showStatus">
			<div class="popup-status" style="min-width: 200px;padding: 10px;">
				<div v-for="(item,index) in manage_status_list" style="padding: 5px 0;font-size: 16px;" :data-index = "index" :key="index" @click="handleStatus">
					<i class="icon iconfont icon-weixuanzhong1" v-if="!item.check"></i> 
					<i class="icon iconfont icon-radio-checked" v-if="item.check"></i> 
					<span>{{item.text}}</span>
				</div>
			</div>
		</van-popup>
		<van-popup v-model="showclassfiy">
			<div class="popup-status" style="min-width: 200px;padding: 10px;">
				<div v-for="(item,index) in manage_classfiy_list" style="padding: 5px 0;font-size: 16px;" :data-index = "index" :key="index" @click="handleClassfiy">
					<i class="icon iconfont icon-weixuanzhong1" v-if="!item.check"></i> 
					<i class="icon iconfont icon-radio-checked" v-if="item.check"></i> 
					<span>{{item.name}}</span>
				</div>
			</div>
		</van-popup>
		<van-popup v-model="showaddress">
			<div class="popup-status" style="min-width: 200px;padding: 10px;">
				<div v-for="(item,index) in manage_address_list" style="padding: 5px 0;font-size: 16px;" :data-index = "index" :key="index" @click="handleAddress">
					<i class="icon iconfont icon-weixuanzhong1" v-if="!item.check"></i> 
					<i class="icon iconfont icon-radio-checked" v-if="item.check"></i> 
					<span>{{item.name}}</span>
				</div>
			</div>
		</van-popup>
		<!--<img src="../../common/img/manage3.jpg" alt="" />-->
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import { ContactCard } from 'vant';

export default {
  name: 'managedev',
  data () {
    return {
		
		tou:"11",
    	game:false,
    	pno:1,
    	manage_status_id:-1,
    	manage_ganre_id:0,
    	manage_address_id:0,
    	kouhongImg:'../../common/img/manage3.jpg',
    	shouhuoImg:'../../common/img/manage2.jpg',
      	searchData:'',
		  active:0,
		  switch1:true,//控制设备显示开关
      	tabdatas:[{"title":'全部',"icons":'icon-quanbu2','ip':1},
				{"title":'离线',"icons":'icon-lixianmoshi','ip':2},
				{"title":'在线',"icons":'icon-zaixianbaoming','ip':3},
		],
		manageList:[
			// {"statusText":"离线","remark":"爱心福利","machineNum":"1","id":5,"address":"123","machineType":"有屏售货机","machineTypeId":4,"status":0,"gameOnOff":true,"check":false},
			// {"statusText":"在线","remark":"测试配备4","machineNum":"4","id":22,"address":"123","machineType":"无屏售货机","machineTypeId":3,"status":1,"gameOnOff":true,"check":false}
			],
		manageListdata:{},
		listsum:0,
		manage_status_list:[],
		manage_status:'全部',
		manage_ganre:'全部',
		manage_address:localStorage.getItem("address"),
		showStatus:false,
		showclassfiy:false,
		showaddress:false,
		manage_classfiy_list:[],
		manage_address_list:[],
    }
  },
  methods:{
  	//跳转设备信息
  	handleToInfo(id,typeid){
  		this.$router.push({name: 'manageinfo',params:{mid:id,type:typeid}});
  	},
  	//设备开关选择事件
  	onInput(status,num){
  		console.log(status,num)
  		let _this=this;
		axios({
			method:'get',
			url:url.adminurl+'/api/MachineApi/GameOnOff?machineNum='+num+'&gameOnOff='+status,
			responseType:'json'
		}).then((res)=>{
			
		}).catch(err=>{
			submitTest(err,_this);
		})
  	},
  	//重置搜索
	handlenew(){
		this.manage_status='全部'
		this.manage_status_id=-1
		this.manage_ganre='全部'
		this.manage_ganre_id=0
		this.manage_address=localStorage.getItem("address")
		this.manage_address_id=localStorage.getItem("id")
		this.pno=1;
		let _this=this;
		axios({
			method:'get',
			url:url.adminurl+'/api/MachineApi/List?page=1&status=-1&machineTypeId=0&addressId=0',
			responseType:'json'
		}).then((res)=>{
			this.manageList=res.data.data;
			this.listsum=res.data.tatalCount;
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
  	//搜索事件
  	handleSearch(){
  		let _this=this;
  		axios({
			method:'get',
			url:url.adminurl+'/api/MachineApi/List?page='+this.pno+'&status='+this.manage_status_id+'&machineTypeId='+this.manage_ganre_id+'&addressId='+this.manage_address_id,
			responseType:'json'
		}).then((res)=>{
			this.manageList=res.data.data;
			this.listsum=res.data.tatalCount;
		}).catch(err=>{
			submitTest(err,_this);
		})
  	},
  	//页码切换事件
	handlePno(){
		let type_id=this.classfiy_id;
		let pno=this.pno;
		let status_id=this.good_status_id;
		let _this=this;
		axios({
			method:'get',
			url:url.adminurl+'/api/MachineApi/List?page='+this.pno+'&status='+this.manage_status_id+'&machineTypeId='+this.manage_ganre_id+'&addressId='+this.manage_address_id,
			responseType:'json'
		}).then((res)=>{
			this.manageList=res.data.data;
			this.listsum=res.data.tatalCount;
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
  	//搜索事件
  	onSearch(){
  		console.log(this.searchData);
  	},
  	//开启弹出层---设备状态
  	handleShowstatus(){
  		this.showStatus=!this.showStatus
  	},
  	//弹出层----选择设备状态
  	handleStatus(e){
  		let _this=this
  		const index = e.currentTarget.dataset.index;
		for(var i=0;i<this.manage_status_list.length;i++){
			this.manage_status_list[i].check=false
		}
  		this.manage_status_list[index].check=!this.manage_status_list[index].check
  		this.showStatus=false,
		this.manage_status=this.manage_status_list[index].text;
		this.manage_status_id=this.manage_status_list[index].value
  	},
  	//开启弹出层---设备类型
  	handleShowclassfiy(){
  		this.showclassfiy=!this.showclassfiy
  	},
  	//弹出层----选择设备类型
  	handleClassfiy(e){
  		let _this=this
  		const index = e.currentTarget.dataset.index;
		for(var i=0;i<this.manage_classfiy_list.length;i++){
			this.manage_classfiy_list[i].check=false
		}
  		this.manage_classfiy_list[index].check=!this.manage_classfiy_list[index].check
  		this.showclassfiy=false,
		this.manage_ganre=this.manage_classfiy_list[index].name;
		this.manage_ganre_id=this.manage_classfiy_list[index].id;
  	},
  	//开启弹出层---地址选择
  	handleShowAddress(){
		  this.showaddress=!this.showaddress
  	},
  	//弹出层----选择设备地址
  	handleAddress(e){
  		let _this=this
  		const index = e.currentTarget.dataset.index;
		for(var i=0;i<this.manage_address_list.length;i++){
			this.manage_address_list[i].check=false
		}
  		this.manage_address_list[index].check=!this.manage_address_list[index].check
  		this.showaddress=false,
		this.manage_address=this.manage_address_list[index].name;
		this.manage_address_id=this.manage_address_list[index].id;
	  },
	//   control(){
	// 	  axios({
	// 		  method:'get',
	// 		  url:url.adminurl+"/api/MachineApi/List",
	// 		  responseType:'json'
	// 	  }).then((res)=>{
	// 		  console.log(res)
	// 		  console.log("成功")
	// 	  }).catch(err=>{
	// 		  console.log("5555")
	// 		  submitTest(err,_this);
	// 	  })
	//   }

	xxx(){
		this.tou = 888
	}
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
	let _this=this
	//调用控制开关的函数
	// this.control()
  	//页面初始化获取设备列表
  	axios({
		method:'get',
		url:url.adminurl+'/api/MachineApi/List?page=1&status=-1&machineTypeId=0&addressId='+localStorage.getItem("id"),
		responseType:'json'
	}).then((res)=>{
		console.log(res)
		this.manageList=res.data.data;
		// 控制底部开关的隐藏只有machineTypeId==3||==5的时候才有开关其他没有
		// for(let i in this.manageList){
		// 	// console.log(this.manageList[i].gameEnable)
		// 	if(this.manageList[i].machineTypeId == 3 || this.manageList[i].machineTypeId == 5){
		// 		this.switch1=this.manageList[i].gameEnable
		// 	}
		// }
	}).catch(err=>{
		submitTest(err,_this);
	})
	
	//获取设备类别列表数据
	axios({
		method:'GET',
		url:url.adminurl+'/api/MachineApi/GetMachineTypes',
		responseType:'json'
	}).then((res)=>{
		this.manage_classfiy_list=res.data
	}).catch(err=>{
		submitTest(err,_this);
	})
	
	//获取设备状态列表数据
	axios({
		method:'get',
		url:url.adminurl+'/api/MachineApi/GetMachineStatus',
		responseType:'json'
	}).then((res)=>{
		this.manage_status_list=res.data
	}).catch(err=>{
		submitTest(err,_this);
	})
	
	//获取设备地址列表数据
	axios({
		method:'get',
		url:url.adminurl+'/api/MachineAddressApi/List',
		responseType:'json'
	}).then((res)=>{
		this.manage_address_list=res.data;
	}).catch(err=>{
		submitTest(err,_this);
	})
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
	//asyuc await
	// function text(){
	// 	return new Promise((resolve)=>{
	// 		setTimeout(()=>{
	// 			resolve()
	// 			console.log("111")
	// 		},3000)
	// 	})
	// }
	
	// async function xian(value,ms){
	// 	await text()
	// 	console.log("1111111")
	// }
	// xian("xxx")

  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	margin: 0 auto;
	background: #fff;
}
.main{
	.manage-classify{
		.popup-status{
			min-width: 300px;
		}
		.search-classfiy{
			background: #fff;
			.search-classfiy-div{
				background: #fff;
				padding: 10px 0;
				width:97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.search-status{
					border-right: 2px solid @BOX3;
				}
				.search-term{
					width: 50%;
					box-sizing: border-box;
					font-size:14px;
					color:#666;
					.search-title{
						text-align: center;
					}
					.search-value{
						text-align: center;
					}
				}
				.search-btn{
					padding-left: 10px;
					border-left: 2px solid @BOX3;
				}
			}
		}
		.iconfont{
			margin-right: 3px;
		}
		.icon-quanbu2{
			font-size: 18px;
		}
		.icon-zaixianbaoming{
			font-size: 18px;
		}
		.good-list-sum{
			text-align: center;
		}
		.manage-list{
			width: 100%;
			background: #fff;
			padding-bottom: 55px;
			.manage-li{
				background: #fff;
				box-shadow:@BOXcurrency;
				margin-top: 10px;
				/*width: 100%;*/
				height: 150px;
				padding-left: 5px;
				padding-top: 3px;
				padding-bottom: 5px;
				overflow: hidden;
				.manaeg-title{
					width: 100%;
					color: @FTC1;
					font-size: 15px;
					font-weight: bold;
					padding-bottom: 3px;
					border-bottom: 1px solid @BOX2;
				}
				.game_switch{
					box-sizing: border-box;
					height: 34px;
					width: 100%;
					padding: 5px;
					border-top: 1px solid @BOX3;
					font-size: 13px;
					display: flex;
					justify-content: flex-end;
					line-height: 23px;
					.switch_on{
						color: @BGsuccess;
					}
					.switch_off{
						color: @BGdanger;
					}
				}
				.manaeg-text{
					margin-top: 3px;
					width: 100%;
					height: 80px;
					display: flex;
					justify-content: space-between;
					overflow: hidden;
					padding-bottom: 13px;
					.manage-img{
						width: 20%;
						img{
							width: 80%;
						}
					}
					.manaeg-syn{
						width: 80%;
						font-size: 14px;
						.manage-status-div{
							.manage-status{
								width: 85%;
								text-align: right;
								.icon-lixianmoshi{
									color: @BGdanger;
								}
								.icon-zaixianbaoming{
									color: @BGsuccess;
								}
							}
						}
						.manaeg-address{
							.noaddress{
								color: @FTC3;
							}
						}
						.manage-name{
							.noname{
								color: @FTC3;
							}
						}
						.manage-income{
							.income{
								color: @BGdanger;
							}
						}
					}
				}
			}
			.income{
				color: @BGdanger;
			}
		}
	}
	.list-title{
		padding: 10px 0;
		background: #FFFFCC;
		border-bottom:1px solid @BOX3;
		.title-div{
			width: 97%;
			margin: 0 auto;
			font-size: 14px;
			color: @FTC3;
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>