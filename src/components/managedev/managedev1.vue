<template>
	<div class="main">
		<van-search
		  v-model="searchData"
		  placeholder="请输入机器编号或机器名称查询"
		  show-action
		  @search="onSearch"
		>
		  <div slot="action" @click="onSearch">搜索</div>
		</van-search>
		<div class="manage-classify">
			<van-tabs v-model="active" sticky swipeable class="tabs" @click='onClick' >
				<van-tab v-for="(item,index) in tabdatas" :key="index">
					<div slot='title' class="vant-tab">
						<i class="icon iconfont" :class="item.icons" :key="index"></i>{{item.title}}
					</div>
				</van-tab>	
			</van-tabs>	
			<div class="manage-list">
				<van-notice-bar  :scrollable="false">
				  共{{listsum}}条数据
				</van-notice-bar>
				<router-link tag='div' class="manage-li" v-for='(item,index) in manageList' :to="{path:'manageinfo',name:'manageinfo',params:{mid:item.id}}" :key='index'>
					
					<div class="manaeg-title">设备ID：{{item.machineNum}}</div>
					<div class="manaeg-text">
						<div class="manage-img">
							<img :src="kouhongImg" alt="口红机" v-show="item.machineType=='口红机'"/>
							<img :src="shouhuoImg" alt="售货机" v-show="item.machineType=='售货机'"/>
						</div>
						<div class="manaeg-syn">
							<div class="manaeg-class">
								类型：<span v-show="item.machineType=='售货机'"><span class="income">自助售货机</span></span><span v-show="item.machineType=='口红机'"><span class="income">游戏口红机</span></span>
							</div>
							<div class="manage-name">
								名称：<span v-show="!item.remark==''"><span class="income">{{item.remark}}</span></span>
								<span class="noname" v-show="item.remark==''">请先设置</span>
							</div>
							<!--<div class="manaeg-address">
								设备地址：<span v-show="!item.manage_address==''">{{item.manage_address}}</span>
								<span class="noaddress" v-show="item.manage_address==''">请先设置</span>
							</div>-->
							<div class="manage-income">
								地址：<span class="income">{{item.address}}</span>
							</div>
							<div class="manage-status-div">
								<div class="manage-status">
									<span v-show="item.status==0">
										<i class="icon iconfont icon-lixianmoshi"></i>
										离线中
									</span>
									<span v-show="item.status==1">
										<i class="icon iconfont icon-zaixianbaoming"></i>
										在线中
									</span>
								</div>
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
export default {
  name: 'managedev',
  data () {
    return {
    	kouhongImg:url.url+'allPHP/imgs/manage3.jpg',
    	shouhuoImg:url.url+'allPHP/imgs/manage2.jpg',
      	searchData:'',
      	active:0,
      	tabdatas:[{"title":'全部',"icons":'icon-quanbu2','ip':1},
				{"title":'离线',"icons":'icon-lixianmoshi','ip':2},
				{"title":'在线',"icons":'icon-zaixianbaoming','ip':3},
		],
		manageList:[],
		manageListdata:{},
		listsum:0
    }
  },
  methods:{
  	//搜索事件
  	onSearch(){
  		console.log(this.searchData);
  	},
  	//标签点击事件
  	onClick(index, title) {
      if(index==0){
      	let fromData=qs.stringify({
	  		manage_status:-1
	  	})
	  	axios({
			method:'post',
			url:url.url+'mobileAdmin/manage_classfly.php',
			data:fromData,
			responseType:'json'
		}).then((res)=>{
			console.log(res.data)
			this.manageList=res.data.data;
			this.manageListdata=res.data
		})
      }else if(index==1){
      	let fromData=qs.stringify({
	  		manage_status:0
	  	})
	  	axios({
			method:'post',
			url:url.url+'mobileAdmin/manage_classfly.php',
			data:fromData,
			responseType:'json'
		}).then((res)=>{
			console.log(res.data)
			this.manageList=res.data.data;
			this.manageListdata=res.data
		})
      }else if(index==2){
      	let fromData=qs.stringify({
	  		manage_status:1
	  	})
	  	axios({
			method:'post',
			url:url.url+'mobileAdmin/manage_classfly.php',
			data:fromData,
			responseType:'json'
		}).then((res)=>{
			console.log(res.data)
			this.manageList=res.data.data;
			this.manageListdata=res.data
			
		})
      }
      
   }
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  	let _this=this
//	let fromData=qs.stringify({
//		manage_status:-1
//	})
//	axios({
//		method:'post',
//		url:url.url+'mobileAdmin/manage_classfly.php',
//		data:fromData,
//		responseType:'json'
//	}).then((res)=>{
//		console.log(res.data)
//		this.manageList=res.data.data;
//		this.manageListdata=res.data
//	})

  	//页面初始化获取商品信息详情
  	axios({
		method:'get',
		url:'/api/MachineApi/List',
		responseType:'json'
	}).then((res)=>{
		console.log(res)
		this.manageList=res.data;
		this.listsum=res.data.length;
	}).catch(err=>{
		submitTest(err,_this);
	})
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
.main{
	.manage-classify{
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
}
</style>