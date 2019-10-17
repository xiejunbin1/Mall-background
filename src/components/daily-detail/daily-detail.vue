<template>
	<div class="daily-main">
		<!--<van-nav-bar
		  title="订单详情"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="good_name">
			<div class="currency-div">
				脉动特惠装 x 1
			</div>
		</div>
		<div class="deily-price">
			<div class="currency-div">
				<span class="price-name">订单金额</span>
				<span class="price-sum">￥9.99</span>
			</div>
		</div>
		<div class="deily-info1">
			<div class="currency-div">
				<div class="info1-li">
					<span class="li-name">支付状态</span>
					<span class="li-value">支付成功</span>
				</div>
				<div class="info1-li">
					<span class="li-name">支付方式</span>
					<span class="li-value">支付宝</span>
				</div>
				<div class="info1-li">
					<span class="li-name">支付时间</span>
					<span class="li-value">2018-11-08 11:26</span>
				</div>
				<div class="info1-li">
					<span class="li-name">交易流水号</span>
					<span class="li-value">718324137785120589574445</span>
				</div>
				<div class="info1-li">
					<span class="li-name">第三方交易号</span>
					<span class="li-value">71832846544137785120589574445</span>
				</div>
			</div>
		</div>
		
		<div class="deily-info2">
			<div class="currency-div">
				<div class="info1-li">
					<span class="li-name">机器编号</span>
					<span class="li-value">1761314434</span>
				</div>
				<div class="info1-li">
					<span class="li-name">货道编号</span>
					<span class="li-value">12</span>
				</div>
				<div class="info1-li">
					<span class="li-name">出货状态</span>
					<span class="li-value">出货成功</span>
				</div>
				<div class="info1-li">
					<span class="li-name">出货异常编码</span>
					<span class="li-value">1</span>
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
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
      	
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
  	
  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	background: @BGGrey;
}
.daily-main{
	background: @BGGrey;
	.currency-div{
		width:96%;
		margin:0 auto;
	}
	.good_name{
		padding: 10px 0;
		color: @FTC3;
		font-size:17px;
		background: @BGGrey;
	}
	.deily-price{
		padding: 10px 0;
		background: #fff;
		color: @FTC3;
		border-bottom: 1px solid @FTC4;
		.currency-div{
			display: flex;
			justify-content: space-between;
			.price-name{
				font-size: 16px;
			}
			.price-sum{
				font-size: 18px;
			}
		}
	}
	.deily-info1{
		background: #fff;
		.currency-div{
			.info1-li{
				padding: 5px 0;
				font-size: 15px;
				display: flex;
				justify-content: space-between;
				.li-name{
					color: @FTC3;
				}
				.li-value{
					color: @FTC2;
				}
			}
		}
	}
	.deily-info2{
		margin-top: 10px;
		background: #fff;
		.currency-div{
			.info1-li{
				padding: 5px 0;
				font-size: 15px;
				display: flex;
				justify-content: space-between;
				.li-name{
					color: @FTC3;
				}
				.li-value{
					color: @FTC2;
				}
			}
		}
	}
}
</style>