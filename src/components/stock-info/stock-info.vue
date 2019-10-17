<template>
	<div class="stock-main">
		<div class="stock-title">
			<div class="stock-title-div">
				<div>地址:<span >{{ address }}</span></div>
				<div class="title-p">编号:<span >{{ machineNum }}</span></div>
				<div class="title-info">
					<div class="info-div">
						<div>缺货量(件):{{ stockOutCount }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="stock-good">
			<div class="stock-good-div" v-for='(item,index) in goodlist' :key="index">
				<img :src="item.imgUrl">
				<span class="good-name">{{item.title}}</span>
				<span class="good-value">
					<span class="good-sum">{{item.remainder}}</span>
					<span class="good-stock">/{{item.maxSize}}(件)</span>
				</span>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>
<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import Footer from '../index/index'
import { Tab, Tabs } from 'vant';
import {submitTest} from '@/common/js/loginTest.js'
export default {
	name: 'HelloWorld',
	data () {
		return {
			stockOutCount:"",
			address:this.$route.params.address,//设备地址
			machineNum:this.$route.params.machineNum,//设备编号
			// goodlist:[{
			// 	good_id:1,
			// 	good_name:'脉动实惠装',
			// 	good_sum:15,
			// 	good_stock:15
			// },{
			// 	good_id:2,
			// 	good_name:'可口可乐',
			// 	good_sum:10,
			// 	good_stock:20
			// },{
			// 	good_id:3,
			// 	good_name:'小熊饼干',
			// 	good_sum:8,
			// 	good_stock:20
			// },],
			goodlist:[],
		}
	},
	methods:{
		//返回上一页
		onClickLeft(){
			this.$router.go(-1);
		},
	},
	//实例化
	components:{
		Footer
	},
	//开始创建
	created(){
	},
	//计算属性
	computed:{
		
	},
	//挂载完成
	mounted(){
		console.log(this.$route.params.machineNum)
		let _this = this
		axios({
			method:"get",
			url:url.adminurl+"/api/MachineStocksApi/Detail?machineNum="+this.$route.params.machineNum,
		}).then((err)=>{
			this.stockOutCount = err.data.stockOutCount
			this.goodlist = err.data.data
		}).catch(err=>{
			submitTest(err,_this);
		})
	}
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	padding: 10px 0;
	
}
.stock-main{
	background: @BGGrey;
	.stock-title{
		padding: 10px 0;
		background: #33ccff;
		color:#fff;
		font-size:15px;
		.stock-title-div{
			width: 95%;
			margin: 0 auto;
			.title-p{
				padding: 10px 0;
			}
			.title-info{
				display: flex;
				justify-content: center;
				.info-div{
					width: 50%;
					text-align: center;
				}
				.info-div1{
					border-right: 1px solid #fff;
				}
			}
		}
	}
	.stock-price{
		background: #fff;
		box-shadow: @BOXcurrency;
		padding: 10px 0;
		.stock-price-div{
			width: 95%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			font-size: 15px;
			color: @FTC2;
			.price-value{
				.price-name{
					font-size: 14px;
				}
				.price-sum{
					color: @BGdanger;
					font-size: 16px;
				}
			}
		}
		.stock-price-div2{
			margin-top: 15px;
		}
	}
	.stock-good{
		background: #fff;
		padding: 10px 0;
		.stock-good-div{
			width: 98%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 15px;
			color: @FTC2;
			padding: 8px;
			box-sizing: border-box;
			border-radius:5px; 
			box-shadow: 0 0 10px #99ffff;
			margin-top:10px; 
			/*border-top: 1px solid @FTC4;*/
			img{
				width: 40px;
				height: 40px;
			}
			.good-name{
				color: @FTC1;
			}
			.good-sum{
				color: @BGdanger;
				font-size: 17px;
			}
			.good-stock{
				color: @FTC4;
				font-size: 14px;
			}
		}
	}
}
</style>