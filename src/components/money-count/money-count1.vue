<template>
	<div class="getcell-main">
		<van-nav-bar
		  title="销售统计"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>
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
						<span class="manaeg-input"/><span @click="handletime1">{{str_time}}</span><span style="color: #606266;">&nbsp;至&nbsp;</span><span @click="handletime2">{{end_time}}</span></span>
					</div>
					<div class="li-icon">
						<span class="value-check">请选择</span>
						<i class="icon iconfont icon-icon11"></i>
					</div>
				</div>
			</div>
			<div class="search-li" @click="handleDig">
				<div class="search-li-div">
					<div class="li-title">场地</div>
					<div class="li-value">
						<span class="manaeg-input"/>{{address_value}}</span>
					</div>
					<div class="li-icon">
						<span class="value-check">请选择</span>
						<i class="icon iconfont icon-icon11"></i>
					</div>
				</div>
			</div>
		</div>
		
		<router-link :to="{path:'profitlist',name:'profitlist',params:{addressid:item.address_id}}" tag="div" class="count-list" v-for="(item,index) in listData">
			<div class="count-title">
				<div class="count-title-div">
					<div class="title-name">
						{{item.addrees_name}}
						<van-tag mark type="primary">{{item.device_sum}}台</van-tag>
					</div>
					<div class="title-price">
						合计：{{item.all_profit|moneyFilter}}元
					</div>
				</div>
			</div>
			<div class="count-ui">
				<div class="count-ui-div">
					<div class="count-li">
						<div class="count-name">在线支付</div>
						<div class="count-value">{{item.on_profit|moneyFilter}}元</div>
					</div>
					<div class="count-li">
						<div class="count-name">现金收益</div>
						<div class="count-value">{{item.off_profit|moneyFilter}}元</div>
					</div>
					<div class="count-li">
						<div class="count-name">礼品消耗</div>
						<div class="count-value">{{item.good_sum}}个</div>
					</div>
				</div>
			</div>
		</router-link>
		
		<van-popup v-model="show" position="bottom" :overlay="true">
		  	<van-picker :columns="columns" show-toolbar @confirm='onConfirm'/>
		</van-popup>
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

export default {
  name: 'HelloWorld',
  data () {
    return {
      	active:0,
      	tabdatas:[{"title":'今日','ip':1},
				{"title":'昨天','ip':2},
				{"title":'本周','ip':3},
				{"title":'本月','ip':4}
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
		end_time:''
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	onClick(index, title){
		if(index==0){
		}else if(index==1){
		}else if(index==2){
		}else if(index==3){
		}
	},
   	onConfirm(value){
   		this.address_value=value;
   		this.show=!this.show
   	},
   	onConfirm1(value){
   		this.show1=!this.show1;
   		this.str_time=value.toLocaleDateString()
   	},
   	onConfirm2(value){
   		this.show2=!this.show2;
   		this.end_time=value.toLocaleDateString()
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
  	
  },
  //开始创建
  created(){
  	let nowtime=new Date();
  	this.str_time=nowtime.toLocaleDateString();
  	this.end_time=nowtime.toLocaleDateString();
  	
  	this.listData=[{
  		address_id:1,
  		addrees_name:'儿童乐园',
  		device_sum:5,
  		all_profit:109,
  		on_profit:69,
  		off_profit:50,
  		good_sum:12
  	},{
  		address_id:2,
  		addrees_name:'有趣乐园',
  		device_sum:7,
  		all_profit:99,
  		on_profit:60,
  		off_profit:30,
  		good_sum:6
  	},{
  		address_id:3,
  		addrees_name:'永痕乐园',
  		device_sum:6,
  		all_profit:290,
  		on_profit:150,
  		off_profit:140,
  		good_sum:16
  	},]
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
	}
	.tabs{
		
	}
	.search-list{
		box-shadow: @BOXcurrency;
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
	.count-list{
		margin-top: 20px;
		padding-bottom: 10px;
		box-shadow: @BOXcurrency;
		.count-title{
			background: #eee;
			.count-title-div{
				width: 97%;
				margin: 0 auto;
				padding: 10px 0;
				display: flex;
				justify-content: space-between;
				.title-name{
					width: 45%;
					font-size: 15px;
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
						width: 45%;
						text-align: left;
					}
					.count-value{
						width: 45%;
						text-align: right;
					}
				}
			}
		}
	}
}
</style>