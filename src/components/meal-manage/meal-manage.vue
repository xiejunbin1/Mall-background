<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="设备选择"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="manage-main">
			<div class="manage-list">
				<div class="search-classfiy">
					<div class="search-classfiy-div">
						<div class="search-term search-status" @click="handleShowstatus">
							<div class="search-title">
							店铺选择<i class="icon iconfont icon-f11"></i>
							</div>
							<div class="search-value">
								<span style="color: #F56C6C;"><i class="icon iconfont icon-dizhi"></i>{{manage_status}}</span>
							</div>
						</div>
						<div class="search-term search-ganre" @click="handleShowclassfiy">
							<div class="search-title">
								设备类型选择<i class="icon iconfont icon-f11"></i>
							</div>
							<div class="search-value">
								<span style="color: #F56C6C;"><i class="icon iconfont icon-shebeiguanli1"></i>{{manage_ganre}}</span>
							</div>
						</div>
						<div class="search-btn">
							<van-button size="small" type="primary" @click='handleSearch'>查询</van-button>
						</div>
					</div>
				</div>
				<div class='mael-title'>
				  <div class="meal-title-div">
				  	<span>共{{listsum}}条数据</span>
					  <span class="title-icon" @click='oncheckall'>
					  	<i class="icon iconfont icon-xuanzhong" v-if="allcheck" ></i>
						<i class="icon iconfont icon-checkbox-copy" v-if="!allcheck" ></i>
						全选
					  </span>
				  </div>
				</div>
				<div class="manage-li" v-for='(item,index) in manageList' :key='index'>
					
					<router-link tag='div' :to="{path:'mealbuy',name:'mealbuy',params:{mid:item.machineNum}}" class="manaeg-title">设备ID：{{item.machineNum}}</router-link>
					<div class="manaeg-text">
						<router-link tag='div' :to="{path:'mealbuy',name:'mealbuy',params:{mid:item.machineNum}}" class="manage-img">
							<img :src="kouhongImg" alt="口红机" v-show="item.machineType=='口红机'"/>
							<img :src="shouhuoImg" alt="售货机" v-show="item.machineType!='口红机'"/>
						</router-link>
						<router-link tag='div' :to="{path:'mealbuy',name:'mealbuy',params:{mid:item.machineNum}}" class="manaeg-syn">
							<div class="manaeg-syn-div">
								<div class="manaeg-class">
									类型：{{item.machineType}}
								</div>
								<div class="manage-name">
									店铺：<span v-show="!item.remark==''"><span class="income">{{item.address}}</span></span>
									<span class="noname" v-show="item.remark==''">请先设置</span>
								</div>
								<!--<div class="manage-income">
									详细地址：<span class="income">{{item.address}}</span>
								</div>-->
							</div>
						</router-link>
						<div class="manage-check">
							<i class="icon iconfont icon-xuanzhong" v-if="item.check" @click='oncheck'  :data-index='index'></i>
							<i class="icon iconfont icon-checkbox-copy" v-if="!item.check" @click='oncheck'  :data-index='index'></i>
						</div>
					</div>
				</div>
				<!-- 分页条 -->
				<van-pagination 
				  v-model="currentPage" 
				  :total-items="listsum" 
				  :show-page-size="5" 
				  @change='handlePno'
				  style="margin-bottom: 60px;"
				/>
			</div>
		</div>
		<!-- 场地弹出层 -->
		<van-popup v-model="showStatus">
			<div class="popup-status" style="min-width: 200px;padding: 10px;">
				<div v-for="(item,index) in manage_status_list" style="padding: 5px 0;font-size: 16px;" :key="index" :data-index = "index" @click="handleStatus">
					<i class="icon iconfont icon-weixuanzhong1" v-if="!item.check"></i> 
					<i class="icon iconfont icon-radio-checked" v-if="item.check"></i> 
					<span>{{item.name}}</span>
				</div>
			</div>
		</van-popup>
		<!-- 类别弹出层 -->
		<van-popup v-model="showclassfiy">
			<div class="popup-status" style="min-width: 200px;padding: 10px;">
				<div v-for="(item,index) in manage_classfiy_list" style="padding: 5px 0;font-size: 16px;" :key="index" :data-index = "index" @click="handleClassfiy">
					<i class="icon iconfont icon-weixuanzhong1" v-if="!item.check"></i> 
					<i class="icon iconfont icon-radio-checked" v-if="item.check"></i> 
					<span>{{item.name}}</span>
				</div>
			</div>
		</van-popup>
		<div class="revise-btn" @click='handleshowall'>
			编辑套餐
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import {Toast} from 'vant'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
    	currentPage:1,
    	allcheck:false,
      	listsum:0,
      	kouhongImg:url.url+'allPHP/imgs/manage3.jpg',
    	shouhuoImg:url.url+'allPHP/imgs/manage2.jpg',
      	manageList:[],
      	manage_classfiy_list:[],
		manage_status:'全部',
		address_id:0,
		classfiy_id:0,
		manage_ganre:'全部',
		showStatus:false,
		showclassfiy:false,
		manage_status_list:[],
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//复选框事件
	oncheck(e){
  		const index = e.currentTarget.dataset.index;
		this.manageList[index].check=!this.manageList[index].check
  	},
  	//全选事件
  	oncheckall(){
  		this.allcheck=!this.allcheck
  		for(var i=0;i<this.manageList.length;i++){
  			this.manageList[i].check=this.allcheck
  		}
  	},
  	//保存提交事件
  	handleshowall(e){
  		let _this=this
		var arr=[];
		for(var i=0;i<_this.manageList.length;i++){
			if(_this.manageList[i].check){
//				console.log(_this.manageList[i].machineNum)
				arr.push(_this.manageList[i].machineNum);
			}
		}
		if(arr.length>0){
			localStorage.setItem('mobile_select',JSON.stringify(arr));
			this.$router.push({name: 'meal'});
		}else{
			alert('请至少选择一台设备');
		}
		
		
//		if(!arr.length){
//			Toast.fail('请先选择设备');
//		}else{
//			this.$router.push({name: 'meal'});
//		}
		
  	},
  	//开启选择场地弹出层
  	handleShowstatus(){
  		this.showStatus=!this.showStatus
  	},
  	//开启选择类型弹出层
  	handleShowclassfiy(){
  		this.showclassfiy=!this.showclassfiy
  	},
  	//选择场地弹出层
  	handleStatus(e){
  		let _this=this
  		const index = e.currentTarget.dataset.index;
		for(var i=0;i<this.manage_status_list.length;i++){
			this.manage_status_list[i].check=false
		}
  		this.manage_status_list[index].check=!this.manage_status_list[index].check
  		this.showStatus=false
  		this.manage_status=this.manage_status_list[index].name
  		this.address_id=this.manage_status_list[index].id
  	},
  	//选择类型弹出层
  	handleClassfiy(e){
  		let _this=this
  		const index = e.currentTarget.dataset.index;
		for(var i=0;i<this.manage_classfiy_list.length;i++){
			this.manage_classfiy_list[i].check=false
		}
  		this.manage_classfiy_list[index].check=!this.manage_classfiy_list[index].check
  		this.showclassfiy=false,
		this.manage_ganre=this.manage_classfiy_list[index].name
		this.classfiy_id=this.manage_classfiy_list[index].id
  	},
  	//页码切换事件
  	handlePno(){
  		let address_id=this.address_id;
  		let classfiy_id=this.classfiy_id;
  		let pno=this.currentPage
  		let _this=this;
	  	axios({
			method:'get',
			url:'/api/MachineApi/ListToMeal?page='+currentPage+'&machineTypeId='+classfiy_id+'&addressId='+address_id,
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
  		let address_id=this.address_id;
  		let classfiy_id=this.classfiy_id;
  		let pno=this.currentPage
  		let _this=this;
	  	axios({
			method:'get',
			url:'/api/MachineApi/ListToMeal?page='+pno+'&machineTypeId='+classfiy_id+'&addressId='+address_id,
			responseType:'json'
		}).then((res)=>{
			this.manageList=res.data.data;
			this.listsum=res.data.tatalCount;
		}).catch(err=>{
			submitTest(err,_this);
		})
  	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	let _this=this;
	//	获取设备列表数据
	let mid=this.$route.params.id;
	let mname=this.$route.params.name;
	this.manage_status=mname;
  	axios({
		method:'get',
		url:'/api/MachineApi/ListToMeal?page=1&machineTypeId=0&addressId='+mid,
		responseType:'json'
	}).then((res)=>{
		this.manageList=res.data.data;
		this.listsum=res.data.tatalCount;
	}).catch(err=>{
		submitTest(err,_this);
	})
	//获取设备类型数据
	axios({
		method:'GET',
		url:'/api/MachineApi/GetMachineTypes',
		responseType:'json'
	}).then((res)=>{
		this.manage_classfiy_list=res.data;
	}).catch(err=>{
		submitTest(err,_this);
	})
	//获取场地列表数据
	axios({
		method:'get',
		url:'/api/MachineAddressApi/List',
		responseType:'json'
	}).then((res)=>{
		this.manage_status_list=res.data;
	}).catch(err=>{
		submitTest(err,_this);
	})
	
//	let shop_id=JSON.parse(localStorage.getItem('mobile_address_id'))
//	let shop_name=JSON.parse(localStorage.getItem('mobile_address_shop'))
//	if(shop_name&&shop_id){
//		this.address_id=shop_id
//		this.manage_status=shop_name
//	}
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
.getcell-main{
	.manage-main{
		.popup-status{
			min-width: 300px;
		}
		.manage-list{
			width: 100%;
			background: #fff;
			padding-bottom: 55px;
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
			.mael-title{
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
						.icon-xuanzhong{
							color: @BGsuccess;
						}
						.icon-checkbox-copy{
							background: #fff;
						}
					}
				}
			}
			.manage-li{
				background: #fff;
				box-shadow:@BOXcurrency;
				margin-top: 10px;
				/*width: 100%;*/
				height: 110px;
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
				.manaeg-text{
					margin-top: 3px;
					width: 100%;
					height: 80px;
					display: flex;
					justify-content: space-between;
					overflow: hidden;
					.manage-img{
						width: 20%;
						img{
							width: 80%;
						}
					}
					.manaeg-syn{
						width: 70%;
						font-size: 14px;
						.manaeg-syn-div{
							height: 70%;
							display: flex;
						    flex-direction: column;
							justify-content: space-between;
							margin-top: 14px;
						}
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
					.manage-check{
						padding: 0 5px;
						line-height: 80px;
						z-index: 100;
						.icon-xuanzhong{
							color: @BGsuccess;
						}
						.icon-checkbox-copy{
							
						}
					}
				}
			}
			.income{
				color: @BGdanger;
			}
		}
	}
	.revise-btn{
		position: fixed;
		bottom: 51px;
		width: 100%;
		padding: 13px 0;
		background: @BGsuccess;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
}
</style>