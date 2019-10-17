<template>
	<div class="goods-main">
		<!--<van-nav-bar
		  title="货道开关"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="goods-batch">
			<div class="batch-div">
				<div class="batch-title">
					主柜
					<i class="icon iconfont icon-f11"></i>
				</div>
				<van-button class="batch-btn" size="small" type="primary" @click='handleCheck'>
					<span v-if='checkboxStatus==true'>开启</span>
					<span v-if='checkboxStatus==false'>关闭</span>
					全部
				</van-button>
			</div>
		</div>
		
		<div class="goods-list">
			<div class="googs-li" v-for='(vo,index) in goodslist' :key='index'>
				<!--<div class="li-title">
					<div class="li-title-div">
						<span>{{item.title}}货道</span>
						<span>
							<van-button class="batch-btn" size="small" type="primary" plain :data-indexs='indexs' @click='switchrow'>
								<span v-if='item.switchs==true'>关闭</span>
								<span v-if='item.switchs==false'>开启</span>
								{{item.title}}
							</van-button>
						</span>
					</div>
				</div>-->
				<!--<div class="li-goods">-->
					<div class="li-goods-div">
						<div class="good-img">
							<img :src="vo.good_img" alt="" />
						</div>
						<div class="good-info">
							<!--<div class="good-name"><van-tag type="success">{{index+1}}</van-tag><span class="good-name-text">{{vo.good_name}}</span></div>
							<div class="good-price">商品价格：{{vo.good_price|moneyFilter}}</div>
							<div class="good-stock">实际库存：{{vo.good_stock}}</div>-->
							<div class="good-name"><van-tag type="success">{{index+1}}</van-tag><span class="good-name-text">{{vo.good_name}}</span></div>
							<div class="good-price">
								<span class="good-price-value">商品价格：{{vo.good_price|moneyFilter}}</span>
							</div>
							<div class="good-stock">游戏单价: {{vo.game_price|moneyFilter}}元/局</div>
							<div class="good-stock">
								<span>现有库存：{{vo.good_stock}}</span>
								<span>礼品获得概率： {{vo.game_sum}}局/个</span>
							</div>
							
						</div>
						<span @click="onInput" :data-index='index'>
							<van-switch v-model="vo.is_check" class='cargo-switch' />
						</span>
					</div>
				<!--</div>-->
			</div>
		</div>
		<!--<div class="revise-btn" @click='handleshowall'>
			确认更改
		</div>-->
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {toMoney} from '@/moneyFilter.js'
import { Dialog } from 'vant';

export default {
  name: 'HelloWorld',
  data () {
    return {
      checkboxStatus:true,
      goodslist:[],
    }
  },
  methods:{
  	onClickLeft(){
  		this.$router.go(-1);
  	},
  	//批量管理事件
  	handleCheck(){
  		let _this=this;
  		console.log(_this.goodslist)
		Dialog.confirm({
		  title: '确认操作',
		}).then(() => {
			console.log('yes')
		  	_this.checkboxStatus=!_this.checkboxStatus;
		  	var allArr=[];
		  	for(var i=0;i<_this.goodslist.length;i++){
				allArr.push(_this.goodslist[i].good_lid)
				if(_this.checkboxStatus){
					_this.goodslist[i].is_check=false
				}else{
					_this.goodslist[i].is_check=true
				}
			}
		  	console.log(allArr)
		  	let checkStatus=!_this.checkboxStatus
		  	let fromData=qs.stringify({
				checkStatus,
				checkLid:allArr
			})
		  	console.log(fromData)
		  	axios({
				method:'post',
				url:url.url+'mobileAdmin/goods_list_creatd2.php',
				data:fromData,
				responseType:'json'
			}).then((res)=>{
				// console.log(res.data.data)
			})
		}).catch(() => {
		});
  	},
  	//复选框事件
//	oncheck(e){
//		const index = e.currentTarget.dataset.index;
//		console.log(this.goodslist[indexs].data[index].is_check);
//		if(this.goodslist[indexs].data[index].is_check=='1'){
//			this.goodslist[indexs].data[index].is_check='0'
//		}else{
//			this.goodslist[indexs].data[index].is_check='1'
//		}
//		this.goodslist[index].is_check=!this.goodslist[index].is_check
//		console.log(this.goodslist)
//	},
	//开关控制事件
	onInput(e){
		const index = e.currentTarget.dataset.index;
		let checkStatus=this.goodslist[index].is_check;
		let checkLid=this.goodslist[index].good_lid;
		console.log(checkStatus,checkLid)
		var allArr=[];
		allArr.push(checkLid)
		let fromData=qs.stringify({
			checkStatus,
			checkLid:allArr
		})
	  	console.log(fromData)
	  	axios({
			method:'post',
			url:url.url+'mobileAdmin/goods_list_creatd2.php',
			data:fromData,
			responseType:'json'
		}).then((res)=>{
			// console.log(res.data.data)
		})
	},
  	//确认更改事件
//	handleshowall(){
//		console.log(this.newgoodslist)
//		let _this=this
//		var allArr=[];
//		for(var i=0;i<_this.newgoodslist.length;i++){
//			console.log(_this.newgoodslist[i].is_check)
//			if(_this.newgoodslist[i].is_check!=_this.goodslist[i].is_check){
//				allArr.push(_this.newgoodslist[i].good_lid)
//			}
//		}
//		console.log(allArr)
//	},
//	handleRevise(){
//		var arr=[];
//		for(var i=0;i<this.goodslist.length;i++){
//			var gooddata=this.goodslist[i].data;
//			for(var n=0;n<gooddata.length;n++){
//				if(gooddata[n].is_check=='1'){
//					arr.push(gooddata[n].good_lid)
//				}
//			}
//		}
//		console.log(arr)
//	}
//	switchrow(e){
//		const indexs = e.currentTarget.dataset.indexs;
//		let _this=this;
//		Dialog.confirm({
//		  title: '确认操作',
//		}).then(() => {
//		  // on confirm
//		  console.log('ok')
//		  if(this.goodslist[indexs].switchs){
//		  	for(var i=0;i<this.goodslist[indexs].data.length;i++){
//			  	this.goodslist[indexs].data[i].is_check=0
//			}
//		  }else{
//		  	for(var i=0;i<this.goodslist[indexs].data.length;i++){
//			  	this.goodslist[indexs].data[i].is_check=1
//			}
//		  }
//		  
//		  this.goodslist[indexs].switchs=!this.goodslist[indexs].switchs;
//		  
//		  console.log(this.goodslist);
//		}).catch(() => {
//		  // on cancel
//		  console.log('no')
//		});
//	}
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  	let _this=this
  	let idData=qs.stringify({
			manage_id:this.$route.params.manageid
		})
  	console.log(idData)
  	axios({
		method:'post',
		url:url.url+'mobileAdmin/goods_list_creatd2.php',
		data:idData,
		responseType:'json'
	}).then((res)=>{
		console.log(res.data.data)
		if(res.data.status=='success'){
			for(var i=0;i<res.data.data.length;i++){
//				console.log(res.data.data[i].is_check)
				if(res.data.data[i].is_check=='0'){
					res.data.data[i].is_check=false
				}else if(res.data.data[i].is_check=='1'){
					res.data.data[i].is_check=true
				}
			}
			this.goodslist=res.data.data;
		}
		
	})
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
.span{
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
}
.goods-main{
	background: @BGGrey;
	.goods-title{
		width: 100%;
		position: fixed;
		top: 0;		
		z-index: 10 !important;		
	}
	.goods-batch{
		background: #fff;
		padding: 5px 0;
		box-shadow: @BOXcurrency;	
		position: fixed;
		top: 46px;
		width: 100%;
		z-index: 10;
		.batch-div{
			width:96%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.batch-title{
				color: @BGblue;
				line-height: 30px;
			}
			.batch-btn{
				
			}
		}
	}
	.goods-list{
		padding-top:80px;
		padding-bottom: 55px;
		.googs-li{
			background: #fff;
			margin-top: 5px;
			box-shadow: @BOXcurrency;
			font-size: 16px;
			/*padding-bottom: 47px;*/
			/*.li-title{
				padding: 8px 0;
				border-bottom:1px solid @BOX4;
				.li-title-div{
					width: 97%;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					.goos-short{
						color: @BGdanger;
					}
				}
			}*/
			/*.li-goods{
				width: 100%;*/
				.li-goods-div{
					width: 97%;
					margin: 0 auto;
					padding: 8px 0;
					border-bottom:1px solid @BOX4;
					display: flex;
					justify-content: space-between;
					.good-check{
						padding: 0 5px;
						line-height: 80px;
						.icon-xuanzhong{
							color: @BGsuccess;
						}
						.icon-checkbox-copy{
							
						}
					}
					.good-img{
						width: 20%;
						padding: 1px;
						border: 1px solid @BOX4;
						min-height: 60px;
						img{
							width: 99%;
							height: 99%;
						}
					}
					.good-info{
						width: 75%;
					    display: flex;
					    flex-direction: column;
					    justify-content: space-between;
						.good-name{
							.good-name-text{
								margin-left: 10px;
							}
						}
						.good-price{
							font-size: 15px;
							color: @BGblue;
							display: flex;
							justify-content: space-between;		
							.good-price-value{
								line-height: 30px;
							}					
						}
						.good-stock{
							font-size: 14px;
							color: @FTC3;
							display: flex;
							justify-content: space-between;
						}
					}
					.cargo-switch{
						margin-top: 30px;
					}
				}
			/*}*/
		}
	}
	.revise-btn{
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 13px 0;
		background: @BGsuccess;
		text-align: center;
		color: #fff;
		font-size: 16px;
		z-index: 10;
	}
}
</style>