<template>
	<div class="getcell-main">
		<!-- <div class="lack_header">{{title_name}}</div> -->
		<div class="list-title">
			<div class="title-div">
				<span style="color: #F56C6C;">缺货设备{{lack.length}}台</span>
			</div>
			<div class="title-div">
				<!-- <span style="color: #F56C6C;">4545454</span> -->
				<span class="" style="color: #000;">库存剩余(%):</span>
				<van-stepper v-model="value" step="5" min="30" max="100"/>
			</div>
			<span class="span" @click="theQuery">查询</span>
		</div>
		<div class="supply-list">
			<div class="supply-list-div">
				<div class="supply-no" v-show="lack.length==0">
					<img src="../../common/img/5a93c51cN3bb5e37b.png" alt="" />
					<br />
					<p>暂时没有待补货的场地喔~</p>
				</div>
				<div class="supply-ul">
					<router-link :to="{path:'stockinfo',name:'stockinfo',params:{machineNum:item.machineNum,address:item.address}}" tag="div" class="info-summary" v-for="(item,index) in lack" :key="index">
					<!--<div class="info-summary" v-for="(item,index) in 3">-->
						<div class="summary-img">
							<img src="http://119.23.218.210/allPHP/imgs/manage3.jpg" alt="口红机" />
							<!-- <img src="http://119.23.218.210/allPHP/imgs/manage2.jpg" alt="售货机" v-show="!item.manage_class"/> -->
						</div>
						<div class="summary-text">
							<div class="info-div">设备编号：<i class="color-warning">{{item.machineNum}}</i></div>
							<div class="info-div">设备类型：<i class="color-warning">{{item.machineType}}</i></div>
							<div class="info-div">详细地址：{{item.address}}</div>
						</div>
					</router-link>					
				</div>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'
import { Circle } from 'vant';
export default {
	name: 'HelloWorld',
	data () {
		return {
			lack:[],
			listsum:0,
			title_name:'',
			value:30,
		}
	},
	methods:{
		//返回上一页
		onClickLeft(){
			this.$router.go(-1);
		},
		// 库存查询
		theQuery(){
			axios({
				method:"get",
				url:url.adminurl+"/api/MachineStocksApi/List?stockPercent="+this.value,
			}).then((err)=>{
				this.lack = err.data
			})
		}
	},
	
	//实例化
	components:{
		Footer
	},
	//开始创建
	created(){
		this.title_name=this.$route.params.address
		// this.lack=[{
		// 	manageid:'071j7dskladhlah81hsd',
		// 	manage_class:1,
		// 	address:'娱乐广场'
		// },{
		// 	manageid:'071j7dskladhlah81hsd',
		// 	manage_class:0,
		// 	address:'娱乐广场'
		// },{
		// 	manageid:'071j7dskladhlah81hsd',
		// 	manage_class:0,
		// 	address:'娱乐广场'
		// },{
		// 	manageid:'071j7dskladhlah81hsd',
		// 	manage_class:1,
		// 	address:'娱乐广场'
		// }]
	},
	//计算属性
	computed:{
		
	},
	//挂载完成
	mounted(){
		axios({
		  	method:"get",
		  	url:url.adminurl+"/api/MachineStocksApi/List?stockPercent="+this.value,
	  	}).then((err)=>{
		  	console.log(err.data,"30")
		  	this.lack = err.data
	  	})
	}
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	box-sizing: border-box;
}
.getcell-main{
	.lack_header{
		width: 100%;
		box-sizing: border-box;
		text-align: center;
		padding: 10px 0;
		font-size: 16px;
		border-bottom: 1px solid @BOX3;
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
					height: 96px;
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
	.list-title{
		padding: 10px 0;
		background: #FFFFCC;
		border-bottom:1px solid @BOX3;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.title-div{
			// margin: 0 auto;
			font-size: 14px;
			color: @FTC3;
			display: flex;
			justify-content: space-between;
			align-items: center;
			input{
				width: 40px;
				background: #FFFFCC;
				border: none;
			}
			// border: 1px solid red;
		}
		.span{
			width: 40px;
			height: 20px;
			background: red;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>