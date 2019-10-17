
<template>
<!-- 
    现在用的
 -->
	<div class="goods-main">
		<div class="goods-batch">
			<div class="batch-div">
				<div class="batch-title">
					<!--主柜-->
					<span v-show='checkboxStatus' @click='checkedAll'>
						<input type='checkbox' class='input-checkbox' v-model='checked'>全选
					</span>
				</div>
				<span>
					<van-button class="batch-btn" size="small" type="primary" @click='handleCheck'>批量管理</van-button>
				</span>
			</div>
		</div>
       
		<div class="goods-list">
			<div class="googs-li">
				<div class="li-goods">
					<div class="li-goods-div" v-for="(item,index) in goodslist" :key="index">
						<div class="good-check" v-show='checkboxStatus'>
							<input type='checkbox' name='checkboxinput' class='input-checkbox' v-model='checkboxList' :value="item.id">
						</div>
						<div class="good-img">
							<img :src="item.imgUrl" alt="" />
						</div>
						<div class="good-info">
							<div class="good-name"><van-tag type="success" style='font-size: 16px;'>{{item.boxNum}}</van-tag><span class="good-name-text">{{item.title}}</span></div>
							<div class="good-price">
								<span class="good-price-value">商品价格：{{item.price|moneyFilter}}</span>
								<van-button size="small"  plain type="primary" @click='handleshow(1,item.id)'  v-show='!checkboxStatus'>编辑</van-button>
							</div>
							<div class="good-stock">游戏单价: {{item.priceGame|moneyFilter}}元/局</div>
							<div class="good-stock">
								<span>现有库存：<div class="inventory" @click="inventory(index)">{{item.remainder}}</div></span>
								<span>货道容量： <div class="capacity" @click="capacity(index)">{{item.maxSize}}</div></span>
							</div>
						</div>
					</div>
					
					<van-pagination 
					  v-model="page" 
					  :total-items="googs_list" 
					  :items-per-page="30"
					  :show-page-size="pageList" 
					  @change='goodsListP'
					/>
				</div>
			</div>
		</div>
		<div class="revise-btn" @click='handleshow(2,"id")' v-if='checkboxStatus'>
			更改商品
		</div>
			<!-- 批量设置货道设置下拉块 -->
		<van-popup v-model="showspeedall" position="bottom" :overlay="true">
		  	<div class="popup-div">
		  		<div class="popup-title">
		  			<div class="popup-title-div">
		  				<span class="title-s1" @click="handlepopupnoall">取消</span>
		  				<span class="title-s2">批量货道设置</span>
		  				<span class="title-s3" @click="confim_handlepopupokall">确定</span>
		  			</div>
		  		</div>
		  		
		  		<div class="popup-li" v-show="isAll">
		  			<div class="popup-li-div">
		  				<span class="li-name">货道数量</span>
		  				<span class="li-value">
		  					<span>已选择{{selectsum}}个货道</span>
		  					<i class="icon iconfont icon-icon11"></i>
		  				</span>
		  			</div>
		  		</div>
		  		
		  		<div class="popup-li" @click='handleSelectGoods'>
			  		<div class="popup-li-div">
			  			<span class="li-name">商品名称</span>
			  			<span class="li-value">
			  				<span>{{goods_name}}</span>
			  				<i class="icon iconfont icon-icon11"></i>
			  			</span>
			  		</div>
				</div>
				
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">商品售卖价格</span>
			  			<span class="li-value">
			  				<span class="li-value-input">
			  					<input type="text" v-model="goods_price"/>
			  				</span>
			  				<span>元/个</span>
			  			</span>
			  		</div>
			  	</div>
			  	<div class="popup-li" v-show="manage_type==1||manage_type==2||manage_type==4">
			  		<div class="popup-li-div">
			  			<span class="li-name">游戏价格</span>
			  			<span class="li-value">
			  				<span class="li-value-input">
			  					<input type="text" v-model="priceGame"/>
			  				</span>
			  				<span>元</span>
			  			</span>
			  		</div>
			  	</div>
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">现有库存</span>
			  			<span class="li-value">
			  				<van-stepper v-model="remainder" integer :min="0" :max="1000"/>
			  			</span>
			  		</div>
			  	</div>
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">货道容量</span>
			  			<span class="li-value">
			  				<van-stepper v-model="volume" integer :min="0" :max="1000"/>
			  			</span>
			  		</div>
			  	</div>
		  	</div>
		  	
		</van-popup>
		
		<van-popup v-model="showgoodlist" position="bottom" :lock-scroll="true" class='popup-goodlist'>
			<van-tabs v-model="active" animated @click="onClick">
				<van-tab title="我的商品">
					<div class="list-title">
						<div class="title-div">
							<span>共{{listsum}}条数据</span>
						</div>
					</div>
					<!-- 分类 -->
					<van-tabs @click="GoodsClick">
  						<van-tab v-for="(value,index) in dataGoods" :key="index"  :title="value.name"  >
  						</van-tab>
					</van-tabs>
					<div class="goods-lists">
						<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
							<van-list v-model="loading" :finished="finished" @load="onLoad">
								<div class="li-goods-div" v-for='(item,index) in listData' :key='index'>
									<div class="li-goods" @click="handleGood(item.id)" :data-goodid = "index">
										<div class="good-img">
											<img :src="item.imgUrl" alt="" />
										</div>
										<div class="good-info">
											<div class="good-name"><span class="good-name-text">{{item.title}}</span></div>
											<div class="good-price">商品价格：{{item.sellPrice|moneyFilter}}</div>
										</div>
									</div>
								</div>
							</van-list>
						</van-pull-refresh>
					</div>
					
				</van-tab>
				
			</van-tabs>
		</van-popup>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {toMoney} from '@/moneyFilter.js'
import {submitTest} from '@/common/js/loginTest.js'
import { Dialog,Tab, Tabs, } from 'vant';
import { ActionSheet } from 'vant';
import Footer from '../index/index'
export default {
	data () {
		return {
			id:'',
			dataGoods:[],
			checkboxStatus:false,
			manage_type: 0, //设备id
			checkIdex:0,
			goodslist:[],
			checked:true,
			checkboxList:[],
			category:false,
			showspeedall: false,
			selectsum:'', //货道数
			goods_name:'', //商品名称
			goods_price:'', //商品价格
			priceGame:'',   //游戏价格
			remainder:'',   //现有库存
			volume: '',  //货道容量
			goodsId:'', //商品id
			boxNums:[], //盒子编号
			machineNum:'', //机器编号
			onclickIndex:'',
			isAll:false,
			showgoodlist:false, //商品列表
			active:0,
			listData:[], //商品列表
			otherListData:[],  //其他商品列表
			listsum:0,
			listsum2:0,
			googs_list:0,
			page:1,
			pageList:30,
			tabIndex:0,
			loading: false,//控制上拉加载的加载动画
            finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
			isLoading: false,//控制下拉刷新的加载动画
			deviceList: [],//用于存放加载的数据
            pageNumber: 0,
		}
	},
	methods: {
		/**-------- 是否批量修改(start) --------*/
		handleCheck(){
			this.checkboxStatus=!this.checkboxStatus;
			this.checkboxList=[];
			this.boxNums=[];
		},
		/**-------- 是否批量修改(end) --------*/
		/**-------- 是否选择(start) --------*/

		checkedAll() {
            if (this.checked) {//实现反选
                this.checkboxList = [];
            } else { //实现全选
                this.checkboxList = [];
                this.goodslist.forEach( (item) => {
                    this.checkboxList.push(item.id);
                });
            }
        },
		/**------- 单个商品修改(start)----------*/
		handleshow(index,id){
			this.onclickIndex=index;
			if(index==1){
				this.isAll=false;
				var boxNum,ids;
				for (let index = 0; index < this.goodslist.length; index++) {
					if(this.goodslist[index].id==id){
						this.goods_name=this.goodslist[index].title;
						this.goods_price=this.goodslist[index].price;
						this.priceGame=this.goodslist[index].priceGame;
						this.remainder=this.goodslist[index].remainder;
						this.volume=this.goodslist[index].maxSize;
						this.machineNum=this.goodslist[index].machineNum
						this.goodsId=this.goodslist[index].productId;
						boxNum=this.goodslist[index].id;
						ids=this.goodslist[index].boxNum;
					}
				}
				this.checkboxList.push(boxNum);
				this.boxNums.push(ids);
			}else if(index==2){
				this.goods_price='';
				this.priceGame='';
				this.goodsId='';
				this.remainder=0;
				this.goods_name=''
				this.isAll=true;
				this.selectsum=this.checkboxList.length;
				this.volume=10;
				for(var i = 0; i < this.goodslist.length; i++){
					var obj = this.goodslist[i];
					var num = obj.id;
					this.machineNum=obj.machineNum
					var isExist = false;
					for(var j = 0; j < this.checkboxList.length; j++){
						var aj = this.checkboxList[j];
						var n = aj;
						if(n == num){
							isExist = true;
							break;
						}
					}
					if(isExist){
						this.boxNums.push(obj.boxNum);
					}
				}
			}
			this.showspeedall=true;
		},
		/**------- 单个商品修改(end)----------*/
		/**---------------- 取消商品修改(start) -------------------*/
		handlepopupnoall(){
			this.showspeedall=false;
			this.checkboxList=[];
			this.boxNums=[];
			this.machineNum='';
			this.goods_price='';
			this.priceGame='';
			this.goodsId='';
			this.remainder=0;
			// console.log(this.goodslist)
			// console.log(this.checkboxList)
		},
		/**---------------- 取消商品修改(end) -------------------*/
		/**---------------- 确定商品修改(start) -----------------*/
		confim_handlepopupokall(){
			let _this=this;
			if(this.onclickIndex==1){
				// let isprice=true;
				// if(this.manage_type==3){
				// 	if(this.goods_price>=150||this.priceGame>=150){
				// 		isprice=false
				// 		Dialog.alert({
				// 			message: '无屏售货机商品售价和游戏价格均不得超过150元'
				// 		}).then(() => {
				// 			_this.showspeedall=true
				// 		});
				// 	}else{
				// 		isprice=true
				// 	}
				// }
				if(this.goods_name==null||this.goods_name==''){
					Dialog.alert({
						message: '请选择商品'
					}).then(() => {
						_this.showspeedall=true
					});
				}else if(this.goods_price==null||this.goods_price==''){
					Dialog.alert({
						message: '请填写商品价格'
					}).then(() => {
						_this.showspeedall=true
					});
				}else if(this.remainder>this.volume){
					Dialog.alert({
						message: '库存数不能大于货道容量'
					}).then(() => {
						_this.showspeedall=true
					});
				}else{
					let fromData={
						ids: this.checkboxList,
						boxNums: this.boxNums,
						machineNum: this.machineNum,
						maxSize: this.volume,
						price: this.goods_price,
						priceGame: this.priceGame,
						productId: this.goodsId,
						remainder: this.remainder,
					}
					Dialog.confirm({
					message: "是否确认修改"
					}).then(() => {
						axios({
							method:'post',
							url:url.adminurl+'/api/MachineBoxApi/Edit',
							data:fromData,
							responseType:'json'
						}).then(res=>{
							if(res.data.status=='Success'){
								_this.goodsListP();
								alert(res.data.msg)
								_this.showspeedall=false;
								this.checkboxList=[];
								this.boxNums=[];
								this.machineNum='';
								this.goods_price='';
								this.priceGame='';
								this.goodsId='';
								this.remainder=0;
								this.goods_name=''
							}else if(res.data.status=='Fail'){
								alert(res.data.msg)
							}
						}).catch(err=>{
							submitTest(err,_this);
						})
					}).catch(() => {
					
					});
				}
			}else if(this.onclickIndex==2){
				// let isprice=true;
				// if(this.manage_type==3){
				// 	if(this.goods_price>=150||this.priceGame>=150){
				// 		isprice=false
				// 		Dialog.alert({
				// 			message: '无屏售货机商品售价和游戏价格均不得超过150元'
				// 		}).then(() => {
				// 			_this.showspeedall=true
				// 		});
				// 	}else{
				// 		isprice=true
				// 	}
				// }
				if(this.checkboxList.length==0){
					Dialog.alert({
						message: '请选择货道'
					}).then(() => {
						_this.showspeedall=false
					});
  				}else if(this.goods_name==null||this.goods_name==''){
					Dialog.alert({
						message: '请选择商品'
					}).then(() => {
						_this.showspeedall=true
					});
				}else if(this.goods_price==null||this.goods_price==''){
					Dialog.alert({
						message: '请填写商品价格'
					}).then(() => {
						_this.showspeedall=true
					});
				}else if(this.remainder>this.volume){
					Dialog.alert({
						message: '库存数不能大于货道容量'
					}).then(() => {
						_this.showspeedall=true
					});
				}else{
					let fromData={
						ids: this.checkboxList,
						boxNums: this.boxNums,
						machineNum: this.machineNum,
						maxSize: this.volume,
						price: this.goods_price,
						priceGame: this.priceGame,
						productId: this.goodsId,
						remainder: this.remainder,
					}
					Dialog.confirm({
					message: "是否确认修改"
					}).then(() => {
						axios({
							method:'post',
							url:url.adminurl+'/api/MachineBoxApi/Edit',
							data:fromData,
							responseType:'json'
						}).then(res=>{
							// console.log(res)
							if(res.data.status=='Success'){
								_this.goodsListP();
								alert(res.data.msg)
								_this.showspeedall=false;
								this.checkboxList=[];
								this.boxNums=[];
								this.machineNum='';
								this.goods_price='';
								this.priceGame='';
								this.goodsId='';
								this.remainder=0;
								this.goods_name=''
							}else if(res.data.status=='Fail'){
								alert(res.data.msg)
							}
						}).catch(err=>{
							submitTest(err,_this);
						})
					}).catch(() => {
					
					});
				}
			}
		},
		// 选着商品分类
		GoodsClick(name, title){
			this.dataGoods[name].name
			var aaa =	this.$toast(title);
			this.id = this.dataGoods[name].id
			this.pageNumber = 0
			// this.showgoodlist=true;
			this.onRefresh();
		},
		chooseGoods(){
			axios({
				method:'get',
				url:url.adminurl+'/api/ProductTypeApi/List?isAll='+true,
				responseType:'json'
			}).then((res)=>{
				// console.log(res.data)
				this.dataGoods = res.data
				this.id = this.dataGoods[0].id
			}).catch(()=>{
				submitTest(err,_this);
			})
		},
		/**---------------- 确定商品修改(end) -----------------*/

		/**--------------- 商品选择(start) -----------------*/
		handleSelectGoods(){
			this.category = true 
			this.showgoodlist=true;

		},
		
		goodsListP(){
			let _this=this
			_this.manage_type=this.$route.params.typeid;
			axios({
				method: 'get',
				url:url.adminurl+'/api/MachineBoxApi/List?machineId='+_this.$route.params.manageid+'&page='+this.page+'&size=30',
			}).then((res)=>{
				_this.goodslist=res.data.data;
				_this.googs_list=res.data.totalCount
				_this.pageList=parseInt(res.data.totalCount%30)
			}).catch(err=>{
				submitTest(err,_this);
			})
		},
		
		/**---------------获取其他商品信息列表(end) ---------------------- */
		
		onClick(index, title) {
			this.tabIndex=index;
			this.onRefresh();
		},
		/**------------ 点击商品(start) --------------*/
		handleGood(id){
			if(this.tabIndex==0){
				for (let index = 0; index < this.listData.length; index++) {
					if(this.listData[index].id==id){
						this.goods_name=this.listData[index].title
						this.goods_price=this.listData[index].sellPrice;
						this.goodsId=this.listData[index].id;
					}
				}
			}else{
				for (let index = 0; index < this.otherListData.length; index++) {
					if(this.otherListData[index].id==id){
						this.goods_name=this.otherListData[index].title
						this.goods_price=this.otherListData[index].sellPrice;
						this.goodsId=this.otherListData[index].id;
					}
				}
			}
			this.showgoodlist=false;
		},
		/**------------ 点击商品(end) --------------*/
		
		 init() {
			if(this.tabIndex==0){
				var pageNumber= this.pageNumber + 1
				let _this=this
				axios({
					method: 'get',
					url:url.adminurl+'/api/ProductApi/List?page='+pageNumber+'&status=0'+'&productTypeId='+this.id,
				}).then((res)=>{
					_this.isLoading = false; //关闭下拉刷新效果
					_this.listData=res.data.data;
					_this.listsum=res.data.totalCount
				}).catch(err=>{
					submitTest(err,_this);
				})
			}else{
				var pageNumber= this.pageNumber + 1
				let _this=this
				axios({
					method: 'get',
					url:url.adminurl+'/api/ProductApi/ListCommon?page='+pageNumber+'&productTypeId='+this.id,
				}).then((res)=>{
					_this.isLoading = false; //关闭下拉刷新效果
					_this.otherListData=res.data.data;
					_this.listsum2=res.data.totalCount
				}).catch(err=>{
					submitTest(err,_this);
				})
			}
		},
		 //下拉刷新
        onRefresh() {
            let _this = this;
            setTimeout(() => {
                _this.pageNumber = 0;
                _this.init(); //加载数据
            }, 500);
        },
        //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
        onLoad() {
			if(this.tabIndex==0){
				let _this = this;
				setTimeout(() => {
					var pageNumber=_this.pageNumber+1
					axios({
					method: 'get',
					url:url.adminurl+'/api/ProductApi/List?page='+pageNumber+'&status=0'+'&productTypeId='+this.id,
				}).then((res)=>{
					// console.log(pageNumber)
					// console.log(res)
					_this.listData=res.data.data.concat(_this.listData);
					_this.listsum=res.data.totalCount
					_this.loading = false;; //关闭下拉刷新效果
					_this.pageNumber++;
					if(_this.pageNumber*10>res.data.totalCount){
						_this.finished = true;
					}
				}).catch(err=>{
					submitTest(err,_this);
				})
				}, 500);
			}else{
				 let _this = this;
				setTimeout(() => {
					var pageNumber=_this.pageNumber+1
					axios({
					method: 'get',
					url:url.adminurl+'/api/ProductApi/ListCommon?page='+pageNumber+'&productTypeId='+this.id,
				}).then((res)=>{
					_this.otherListData=res.data.data.concat(_this.otherListData);
					_this.listsum2=res.data.totalCount
					_this.loading = false;; //关闭下拉刷新效果
					_this.pageNumber++;
					if(_this.pageNumber*10>res.data.totalCount){
						_this.finished = true;
					}
				}).catch(err=>{
					submitTest(err,_this);
				})
				}, 500);
			}
		},
		
	},
	created () {
		this.goodsListP();
		this.manage_type=this.$route.params.typeid;
		
	},
	 watch: { //深度 watcher
        checkboxList: {
            handler: function (val, oldVal) { 
                if (this.checkboxList.length == this.goodslist.length) {
                    this.checked=true;
                } else {
                    this.checked=false;
				}
				if(this.goodslist.length==0){
					this.checked=false;
				}
			}		
		}
	 },
	 filters:{
		moneyFilter(money){
			return toMoney(money)
		}
	},
	modules(){
		var data = [
		{name:"jay",age:10},
		{name:"jay",age:15},
		{name:"jay",age:12},
		{name:"jay",age:14},
		{name:"jay",age:22}
	]
	console.log(data)
	},
	mounted () {
		this.chooseGoods()
		
	},
	components: {
		Footer,
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
.kucun{
	display: flex;
	justify-content: center;
	padding-top:5px;
	padding-bottom: 5px; 
}
.goods-main{
	background: @BGGrey;
	input[type="checkbox"]{
		-webkit-appearance: none;
		vertical-align:middle;
		margin-top:0;
		background:#fff;
		border:#999 solid 1px;
		border-radius: 3px;
		min-height: 16px;
		min-width: 16px;
	}
	input[type="checkbox"]:checked {
		background: #3190e8;
		position: relative;
	}
	input[type=checkbox]:checked::after{
		content: '';
		top: 0;
		left: 0;
		position: absolute;
		background: transparent;
		border: #fff solid 2px;
		border-top: none;
		border-right: none;
		height: 6px;
		width: 10px;
		-moz-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg); 
		transform: rotate(-45deg);
	}
	.goods-batch{
		background: #fff;
		padding: 5px 0;
		box-shadow: @BOXcurrency;
		position: fixed;
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
				font-size: 16px;
			}
			.batch-btn{
				
			}
		}
    }
    .classification{
        width: 100%;
		height: 60px;
        border: 1px solid red;
		padding-top: 20px;
		display: flex;
		.aaa{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 40px;
		}
    }
	.goods-list{
		margin-bottom: 51px;
		padding-top: 20px;
		.googs-li{
			background: #fff;
			margin-top: 10px;
			box-shadow: 0 2px 2px #cbc9c9;
			font-size: 16px;
			padding-bottom: 47px;
			.li-goods{
				width: 100%;
				.li-goods-div{
					width: 97%;
					margin: 0 auto;
					padding: 8px 0;
					border-bottom: 1px solid #f2f6fc;
					display: flex;
					justify-content: space-between;
					margin-top: 5px;
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
						max-height: 75px;
						padding: 1px;
						border: 1px solid @BOX4;
						min-height: 60px;
						max-height: 80px;
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
							span{
								display: flex;
							}
							.inventory{
								max-width: 20px; 
								border: 1px solid #999;
								padding-left:5px;
								padding-right: 5px;
							}
							.capacity{
								max-width: 20px; 
								border: 1px solid #999;
								padding-left:5px;
								padding-right: 5px;
							}
						}
					}
				}
			}
		}
	}
	.revise-btn{
		position: fixed;
		bottom: 51px;
		width: 100%;
		padding: 13px 0;
		background: #67c23a;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
	.popup-div{
		.popup-title{
			padding:10px 0;
			background: @BGGrey;
			.popup-title-div{
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				.title-s1{
					color: @BGblue;
				}
				.title-s2{
					font-size: 17px;
				}
				.title-s3{
					color: @BGblue;
				}
			}
		}
		.popup-li{
			padding:15px 0;
			border-bottom: 1px solid @BOX3;
			border-top: 1px solid @BOX3;
			.popup-li-div{
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				.li-name{
					
				}
				.li-value{
					.li-value-input{
						padding: 5px 10px;
						border: 1px solid @BOX3;
						input{
							border: none;
							width: 40px;
							text-align: center;
						}
					}
				}
			}
		}
	}
	.categoryClass{
		width: 100%;
		height: 220px;
		.ificationOfGoods{
			width: 100%;
			height: 60px;
			border-bottom: 1px solid #f2f2f2;
			font-size: 16px;
			color: #000000;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.Goods{
			width: 100%;
			height: 60px;
			border-bottom: 1px solid #f2f2f2;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.popup-goodlist{
		z-index: 1000;
		max-height: 90%;
		.van-pagination{
			background: #fff;
		}
	}
	.goods-lists{
		 height: 375px;
    	 overflow-y: scroll;
		.hot-good{
			padding: 6px 0;
			background: #FFFBE8;
			.hot-good-div{
				width: 90%;
				margin: 0 auto;
				color: @FTC2;
				font-size: 16px;
				.icon-redu2{
					color: @BGdanger;
					margin-right: 5px;
					font-size: 18px;
				}
			}
		}
		.li-goods-div{
			background: #fff;
			padding: 5px 0;
			box-shadow: @BOXcurrency;
			margin-top: 10px;
			.li-goods{
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.good-img{
					width: 20%;
					max-height: 75px;
					padding: 1px;
					border: 1px solid @BOX4;
					min-height: 60px;
					max-height: 80px;
					img{
						width: 99%;
						height: 99%;
					}
				}
				.good-info{
					width: 75%;
					height: 68px;
					margin-top: 9px;
				    display: flex;
				    flex-direction: column;
				    justify-content: space-between;
					.good-name{
						.good-name-text{
							font-size: 16px;
							color: #2c3e50;
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
			}
		}
	}
	.list-title{
		padding: 10px 0;
		background: @BGGrey;
		border-bottom:1px solid @BOX3;
		.title-div{
			width: 97%;
			margin: 0 auto;
			font-size: 14px;
			color: @FTC3;
			display: flex;
			justify-content: space-between;
		}
	}
}
</style>
