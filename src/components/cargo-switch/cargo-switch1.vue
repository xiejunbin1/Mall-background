<template>
	<div class="goods-main">
		<van-nav-bar
		  title="货道开关"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>
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
			<div class="googs-li" v-for='(item,indexs) in goodslist' :key='indexs'>
				<div class="li-title">
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
				</div>
				<div class="li-goods">
					<div class="li-goods-div" v-for='(vo,index) in item.data' :key='index'>
						<!--<div class="good-check" v-show='checkboxStatus'>
							<i class="icon iconfont icon-xuanzhong" v-show=" vo.is_check=='1' " @click='oncheck' :data-indexs='indexs' :data-index='index'></i>
							<i class="icon iconfont icon-checkbox-copy" v-show=" vo.is_check=='0' " @click='oncheck' :data-indexs='indexs' :data-index='index'></i>
						</div>-->
						<div class="good-img">
							<img :src="vo.good_img" alt="" />
						</div>
						<div class="good-info">
							<div class="good-name"><van-tag type="success">{{vo.space}}</van-tag><span class="good-name-text">{{vo.good_name}}</span></div>
							<div class="good-price">商品价格：{{vo.good_price|moneyFilter}}</div>
							<div class="good-stock">实际库存：{{vo.good_stock}}/默认库存：5</div>
						</div>
						<van-switch v-model="vo.is_check" class='cargo-switch'/>
					</div>
				</div>
			</div>
		</div>
		
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
		Dialog.confirm({
		  title: '提示',
		  message: '确认操作',
		  
		}).then(() => {
		  	_this.checkboxStatus=!_this.checkboxStatus;
		  	for(var i=0;i<_this.goodslist.length;i++){
				for(var n=0;n<_this.goodslist[i].data.length;n++){
					
					if(_this.checkboxStatus){
						_this.goodslist[i].data[n].is_check=false
					}else{
						_this.goodslist[i].data[n].is_check=true
					}
				}
			}
		}).catch(() => {
		  console.log('no')
		});
  	},
  	//复选框事件
  	oncheck(e){
  		const index = e.currentTarget.dataset.index;
  		const indexs = e.currentTarget.dataset.indexs;
//		console.log(this.goodslist[indexs].data[index].is_check);
		if(this.goodslist[indexs].data[index].is_check=='1'){
			this.goodslist[indexs].data[index].is_check='0'
		}else{
			this.goodslist[indexs].data[index].is_check='1'
		}
  	},
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
	switchrow(e){
		const indexs = e.currentTarget.dataset.indexs;
		let _this=this;
		Dialog.confirm({
		  title: '确认操作',
		}).then(() => {
		  // on confirm
		  console.log('ok')
		  if(this.goodslist[indexs].switchs){
		  	for(var i=0;i<this.goodslist[indexs].data.length;i++){
			  	this.goodslist[indexs].data[i].is_check=0
			}
		  }else{
		  	for(var i=0;i<this.goodslist[indexs].data.length;i++){
			  	this.goodslist[indexs].data[i].is_check=1
			}
		  }
		  
		  this.goodslist[indexs].switchs=!this.goodslist[indexs].switchs;
		  
		}).catch(() => {
		  // on cancel
		  console.log('no')
		});
	}
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  	let idData=qs.stringify({
			manage_id:this.$route.params.manageid
		})
  	axios({
		method:'post',
		url:url.url+'mobileAdmin/goods_list_creatd.php',
		data:idData,
		responseType:'json'
	}).then((res)=>{
		
		if(res.data.status=='success'){
			var k=0;
			for(var i=0;i<res.data.data.length;i++){
				for(var n=0;n<res.data.data[i].data.length;n++){
					k++;
					res.data.data[i].data[n].space=k;
					if(res.data.data[i].data[n].is_check=='0'){
						res.data.data[i].data[n].is_check=false
					}else if(res.data.data[i].data[n].is_check=='1'){
						res.data.data[i].data[n].is_check=true
					}
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
				
	}
	.goods-batch{
		background: #fff;
		padding: 5px 0;
		box-shadow: @BOXcurrency;
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
		.googs-li{
			background: #fff;
			margin-top: 10px;
			box-shadow: @BOXcurrency;
			font-size: 16px;
			padding-bottom: 47px;
			.li-title{
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
			}
			.li-goods{
				width: 100%;
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
						}
						.good-stock{
							font-size: 14px;
							color: @FTC3;
						}
					}
					.cargo-switch{
						margin-top: 30px;
					}
				}
			}
		}
	}
	.revise-btn{
		z-index: 100;
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 13px 0;
		background: @BGsuccess;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
}
</style>