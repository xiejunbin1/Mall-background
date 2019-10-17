<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="套餐购买"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<van-notice-bar :scrollable="false">
		  	本套餐一经出售，不得进行退换
		</van-notice-bar>
		<div class="mael-list">
			<div class="meal-li" v-for="(item,index) in listData" :key="index">
				<div class="meal-li-div">
					<div class="meal-img">
						<div class="meal-img-div">
							<img src="../../common/img/gold01.jpg.png" alt="" />
						</div>
					</div>
					<div class="li-info">
						<div class="info-div">{{item.amount}}元游戏币套餐</div>
						<div class="info-div info-div1">金额：<span class="info-span">￥{{item.amount}}元</span></div>
						<div class="info-div info-div1">游戏币：<span class="info-span">{{item.total-item.giveNum}}游戏币+赠送{{item.giveNum}}游戏币</span></div>
						<div class="info-div info-div1">详情：{{item.amount}}元共获得{{item.total}}游戏币</div>
					</div>
					<div class="li-btn">
						<van-button size="normal" type="primary" class='btn-value' @click='handleBuy' :data-index = "item.id">立即购买</van-button>
					</div>
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

export default {
  name: 'HelloWorld',
  data () {
    return {
      	listData:[],
      	machineNum:''
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//购买事件
	handleBuy(){
		
	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	let machineNum=this.$route.params.mid
  	let _this=this
  	if(machineNum){
  		this.machineNum=machineNum
  		let formData=qs.stringify({
			machineNum:this.$route.params.mid
		})
		axios({
			method:'get',
			url:'/api/MachineMealApi/Detail?machineNum='+this.$route.params.mid,
			responseType:'json'
		}).then((res)=>{
			this.listData=JSON.parse(res.data.meal)
		}).catch((err)=>{
			submitTest(err,_this);
		})
  	}else{
  		alert('页面加载错误')
  	}
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
	padding: 10px 0;
}
.getcell-main{
	.mael-list{
		.meal-li{
			padding: 10px 0;
			border-bottom: 1px solid @BOX3;
			background: #fff;
			.meal-li-div{
				width: 95%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.meal-img{
					width: 20%;
					height:91px;
					.meal-img-div{
						width: 90%;
						height: 100%;
						margin: auto auto;
						display: flex;
						align-items: center;
						img{
							width: 100%;
							height: 70px;
							align-items: center;
						}
					}
				}
				.li-info{
					width: 55%;
					.info-div{
						padding: 1px 0;
						color: #666;
						font-size: 16px;
					}
					.info-div1{
						font-size: 14px;
					}
					.info-span{
						color: @BGwarning;
					}
				}
				.li-btn{
					width: 27%;
					height: 91px;
					display: flex;
					justify-content: flex-end;
					.btn-value{
						margin-top: 23px;
					}
				}
			}
		}
	}
}
</style>