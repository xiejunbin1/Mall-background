<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="订单列表"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<van-search
		  v-model="searchData"
		  placeholder="请输入商品名称或订单号查询"
		  show-action
		  @search="onSearch"
		>
		  <div slot="action" @click="onSearch">搜索</div>
		</van-search>
		
		<div class="daily-main">
			<div class="daily-list">
				<div class="daily-li" v-for="(item,index) in listData" :key='index'>
					<div class="li-title">
						<div class="li-title-div">
							<span class="identifier">No:{{item.identifier}}</span>
							<span v-if="item.deal_status">出货成功</span>
							<span v-if="!item.deal_status">交易失败</span>
						</div>
					</div>
					<div class="li-abstract">
						<div class="li-abstract-div">
							<router-link class="li-name" tag='div' :to="{path:'/dailydetail',name:'dailydetail',params:{mid:item.identifier}}">
							<!--<router-link tag='div' class="li-name" :to="{path:'dailydetail',name:'dailydetail',params:{mid:item.identifier}}">--> 
								<span>[{{item.manage_id}}] [{{item.cargo_id}}] {{item.good_name}}  x{{item.good_sum}}</span><i class="icon iconfont icon-icon11"></i>
							</router-link>
							<span class="li-price">
								<span>￥{{item.good_price}} <i class="price-way">/支付宝[支付成功]</i></span>
								<span class="price-item">{{item.deal_time}}</span>
							</span>
						</div>
					</div>
				</div>
				<div class="daily-floot">没有更多数据！！</div>
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

export default {
  name: 'HelloWorld',
  data () {
    return {
      	searchData:'',
      	listData:[{
      		identifier:'123456789',
      		deal_status:true,
      		manage_id:'071j7dskladhlah81hsd',
      		cargo_id:64,
      		good_name:'脉动实惠装',
      		good_sum:1,
      		good_price:9.99,
      		deal_time:'2018-11-08 11:26'
      	},{
      		identifier:'124578521',
      		deal_status:true,
      		manage_id:'071j7dskladhlah81hsd',
      		cargo_id:64,
      		good_name:'脉动实惠装',
      		good_sum:1,
      		good_price:9.99,
      		deal_time:'2018-11-08 11:26'
      	},{
      		identifier:'12487546',
      		deal_status:true,
      		manage_id:'071j7dskladhlah81hsd',
      		cargo_id:64,
      		good_name:'脉动实惠装',
      		good_sum:1,
      		good_price:9.99,
      		deal_time:'2018-11-08 11:26'
      	},{
      		identifier:'987451137',
      		deal_status:true,
      		manage_id:'071j7dskladhlah81hsd',
      		cargo_id:64,
      		good_name:'脉动实惠装',
      		good_sum:1,
      		good_price:9.99,
      		deal_time:'2018-11-08 11:26'
      	},]
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//搜索事件
  	onSearch(){
  		// console.log(this.searchData);
  	}
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
  	
  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
}
.getcell-main{
	background: @BGGrey;
	.daily-main{
		
		.daily-list{
			.daily-li{
				background: #fff;
				color:@FTC2;
				margin-top:10px;
				box-shadow:@BOXcurrency;
				.li-title{
					border-bottom:1px solid @FTC4;
					.li-title-div{
						width: 96%;
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
						padding: 8px 0;
						font-size: 16px;
						.identifier{
							color:@FTC3;
						}
					}
				}
				.li-abstract{
					font-size: 16px;
					color:@FTC2;
					.li-abstract-div{
						width: 96%;
						margin: 0 auto;
						
						.li-name{
							padding: 8px 0;
							display: flex;
							justify-content: space-between;
						}
						.li-price{
							padding: 5px 0;
							display: flex;
							justify-content: space-between;
							.price-way{
								font-size: 14px;
								color:@FTC3;
							}
							.price-item{
								font-size: 14px;
								color:@FTC3;
							}
						}
					}
				}
			}
			.daily-floot{
				padding: 15px 0;
				text-align: center;
				font-size: 16px;
				color: @FTC3;
			}
		}
	}
}
</style>