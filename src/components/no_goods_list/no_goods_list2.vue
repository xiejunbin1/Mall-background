<template>
	<div class="goods-main">
		<div class="tabs_box">
			<van-tabs @click="onClick">
				<van-tab v-for="(item,index) in tabData" :title="'第' + item.name +'层'" :key='index' >
				</van-tab>    
			</van-tabs>
		</div>
		<div class="goods-batch">
			<div class="batch-div">
				<div class="batch-title">
					<!--主柜-->
					<span v-show='checkboxStatus'>
						<i class="icon iconfont icon-xuanzhong" v-if="allcheck" @click='oncheckall'  ></i>
						<i class="icon iconfont icon-checkbox-copy" v-if="!allcheck" @click='oncheckall'  ></i>全选
					</span>
					<span v-show='checkboxStatus2'>
						<i class="icon iconfont icon-xuanzhong" v-if="allcheck" @click='oncheckall'  ></i>
						<i class="icon iconfont icon-checkbox-copy" v-if="!allcheck" @click='oncheckall'  ></i>全选
					</span>
				</div>
				<span>
					<van-button class="batch-btn" size="small" type="warning" @click='handleCheck2'>货道开关管理</van-button>
					<van-button class="batch-btn" size="small" type="primary" @click='handleCheck'>商品批量管理</van-button>
				</span>
			</div>
		</div>
		
		<div class="goods-list">
			<div class="googs-li">
				<div class="li-goods">
					<div class="li-goods-div" v-for='(vo,index) in goodslist' :key='index'>
						<div class="good-check" v-show='checkboxStatus'>
							<i class="icon iconfont icon-xuanzhong" v-if="vo.check" @click='oncheck'  :data-index='index'></i>
							<i class="icon iconfont icon-checkbox-copy" v-if="!vo.check" @click='oncheck'  :data-index='index'></i>
						</div>
						<div class="good-check" v-show='checkboxStatus2'>
							<i class="icon iconfont icon-xuanzhong" v-if="vo.check" @click='oncheck'  :data-index='index'></i>
							<i class="icon iconfont icon-checkbox-copy" v-if="!vo.check" @click='oncheck'  :data-index='index'></i>
						</div>
						<div class="good-img">
							<img :src="vo.imgUrl" alt="" />
						</div>
						<div class="good-info">
							<div class="good-name">
								<van-tag type="success" style='font-size: 16px;'>{{floorSum}}{{index+1}}</van-tag><span class="good-name-text">{{vo.title}}</span>
								<!--<span style="font-size: 12px; color: #67C23A; "><i class="icon iconfont icon-blue-dot"></i>已开启</span>-->
								<span style="font-size: 12px; color: #E6A23C; "><i class="icon iconfont icon-blue-dot"></i>已关闭</span>
								<van-button size="small"  plain type="primary" @click='handleBase' :data-index='index' v-show='checkboxStatusT' >电机检测</van-button>
								<van-button size="small"  plain type="primary" @click='handleshow' :data-index='index' v-show='checkboxStatusT' >编辑</van-button>
							</div>
							<div class="good-price">
								<span class="good-price-value">商品价格：{{vo.price|moneyFilter}}</span>
							</div>
							<div class="good-stock">游戏单价: {{vo.priceGame|moneyFilter}}元/局</div>
							<div class="good-stock">
								<span>现有库存：{{vo.remainder}}</span>
								<span>货道容量： {{vo.maxSize}}</span>
							</div>
							<div class="good-stock">礼品获得概率： {{vo.game_sum}}局/个</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!--<router-link :to="{path:'cargorevise',name:'cargorevise',params:{mid:manage_id}}" tag="div" class="revise-btn" @click='handleRevise'>
			更改商品
		</router-link>-->
		
		<!-- 批量设置货道设置下拉块 -->
		<van-popup v-model="showspeedall" position="bottom" :overlay="true">
		  	<div class="popup-div">
		  		<div class="popup-title">
		  			<div class="popup-title-div">
		  				<span class="title-s1" @click="handlepopupnoall">取消</span>
		  				<span class="title-s2">批量货道设置</span>
		  				<span class="title-s3" @click="handlepopupokall">确定</span>
		  			</div>
		  		</div>
		  		
		  		<div class="popup-li">
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
			  				<span>{{fromData2.title}}</span>
			  				<i class="icon iconfont icon-icon11"></i>
			  			</span>
			  		</div>
				</div>
				
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">商品售卖价格</span>
			  			<span class="li-value">
			  				<span class="li-value-input">
			  					<input type="text" v-model="fromData2.price"/>
			  				</span>
			  				<span>元/个</span>
			  			</span>
			  		</div>
			  	</div>
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">游戏价格</span>
			  			<span class="li-value">
			  				<span class="li-value-input">
			  					<input type="text" v-model="fromData2.priceGame"/>
			  				</span>
			  				<span>元</span>
			  			</span>
			  		</div>
			  	</div>
			  	<!--<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">礼品获得概率</span>
			  			<span class="li-value">
			  				<span class="li-value-input">
			  					<input type="text" v-model="fromData.game_sum"/>
			  				</span>
			  				<span>局/个</span>
			  			</span>
			  		</div>
			  	</div>-->
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">现有库存</span>
			  			<span class="li-value">
			  				<van-stepper v-model="fromData2.remainder" integer :min="0" :max="1000"/>
			  			</span>
			  		</div>
			  	</div>
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">货道容量</span>
			  			<span class="li-value">
			  				<van-stepper v-model="fromData2.volume" integer :min="0" :max="1000"/>
			  			</span>
			  		</div>
			  	</div>
		  	</div>
		  	
		</van-popup>
		
		<!-- 编辑货道设置下拉块 -->
		<van-popup v-model="showspeed" position="bottom" :overlay="true">
		  	<div class="popup-div">
		  		<div class="popup-title">
		  			<div class="popup-title-div">
		  				<span class="title-s1" @click="handlepopupno">取消</span>
		  				<span class="title-s2">货道设置</span>
		  				<span class="title-s3" @click="handlepopupok">确定</span>
		  			</div>
		  		</div>
		  		
		  		<div class="popup-li" @click='handleSelectGood'>
			  		<div class="popup-li-div">
			  			<span class="li-name">商品名称</span>
			  			<span class="li-value">
			  				<span>{{fromData.title}}</span>
			  				<i class="icon iconfont icon-icon11"></i>
			  			</span>
			  		</div>
			  	</div>
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">商品售卖价格</span>
			  			<span class="li-value">
			  				<span class="li-value-input">
			  					<input type="text" v-model="fromData.price"/>
			  				</span>
			  				<span>元/个</span>
			  			</span>
			  		</div>
			  	</div>
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">游戏价格</span>
			  			<span class="li-value">
			  				<span class="li-value-input">
			  					<input type="text" v-model="fromData.priceGame"/>
			  				</span>
			  				<span>元</span>
			  			</span>
			  		</div>
			  	</div>
			  	<!--<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">礼品获得概率</span>
			  			<span class="li-value">
			  				<span class="li-value-input">
			  					<input type="text" v-model="fromData.game_sum"/>
			  				</span>
			  				<span>局/个</span>
			  			</span>
			  		</div>
			  	</div>-->
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">现有库存</span>
			  			<span class="li-value">
			  				<van-stepper v-model="fromData.remainder" integer :min="0" :max="1000"/>
			  			</span>
			  		</div>
			  	</div>
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">货道容量</span>
			  			<span class="li-value">
			  				<van-stepper v-model="fromData.maxSize" integer :min="0" :max="1000"/>
			  			</span>
			  		</div>
			  	</div>
			  	<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">货道开关</span>
			  			<span class="li-value">
			  				<!-- fromData.switch  -->
			  				<span style="position: relative;top: -8px;">{{checked==false?'关闭':'开启'}}</span>
			  				<van-switch
							  v-model="checked"
							  size="24px"
							/>
			  			</span>
			  		</div>
			  	</div>
		  	</div>
		  	
		</van-popup>
		
		<van-popup v-model="showgoodlist" position="bottom" :overlay="true" class='popup-goodlist'>
			<van-tabs v-model="active" animated>
				<van-tab title="我的商品">
					<div class="list-title">
						<div class="title-div">
							<span>共{{listsum}}条数据</span>
						</div>
					</div>
					<div class="goods-lists">
						<div class="li-goods-div" v-for='(item,index) in listData' :key='index'>
							<div class="li-goods" @click="handleGood" :data-goodid = "index">
								<div class="good-img">
									<img :src="item.imgUrl" alt="" />
								</div>
								<div class="good-info">
									<div class="good-name"><span class="good-name-text">{{item.title}}</span></div>
									<div class="good-price">商品价格：{{item.sellPrice|moneyFilter}}</div>
								</div>
							</div>
						</div>
					</div>
					<van-pagination 
					  v-model="pno" 
					  :total-items="listsum" 
					  :show-page-size="5" 
					  @change='handlePno'
					/>
				</van-tab>
				<van-tab title="其他商品">
					<div class="list-title">
						<div class="title-div">
							<span>共{{listsum2}}条数据</span>
						</div>
					</div>
					<div class="goods-lists">
						<div class="li-goods-div" v-for='(item,index) in listData2' :key='index'>
							<div class="li-goods" @click="handleGood2" :data-goodid = "index">
								<div class="good-img">
									<img :src="item.imgUrl" alt="" />
								</div>
								<div class="good-info">
									<div class="good-name"><span class="good-name-text">{{item.title}}</span></div>
									<div class="good-price">商品价格：{{item.sellPrice|moneyFilter}}</div>
								</div>
							</div>
						</div>
					</div>
					<van-pagination 
					  v-model="pno2" 
					  :total-items="listsum2" 
					  :show-page-size="5" 
					  @change='handlePno2'
					/>
				</van-tab>
			</van-tabs>
			<!--<div class="list-title">
				<div class="title-div">
					<span>共{{listsum}}条数据</span>
				</div>
			</div>
			<div class="goods-lists">
				<div class="li-goods-div" v-for='(item,index) in listData' :key='index'>
					<div class="li-goods" @click="handleGood" :data-goodid = "index">
						<div class="good-img">
							<img :src="item.imgUrl" alt="" />
						</div>
						<div class="good-info">
							<div class="good-name"><span class="good-name-text">{{item.title}}</span></div>
							<div class="good-price">商品价格：{{item.sellPrice|moneyFilter}}</div>
						</div>
					</div>
				</div>
			</div>
			<van-pagination 
			  v-model="pno" 
			  :total-items="listsum" 
			  :show-page-size="5" 
			  @change='handlePno'
			/>-->
		</van-popup>
		
		<van-popup v-model="intmanage">
			<div class="cargo-title">
				货道初始化
			</div>
			<div class="cargo" style="min-width: 250px;padding: 10px;">
				<div class="cargo-box">
		  			<span class="cargo-name">货道数量：</span>
		  			<span class="cargo-value">
		  				<van-stepper v-model="cargosum" integer :min="0" :max="1000"/>
		  			</span>
		  		</div>
			</div>
			<div class="cargo-btns">
				<div class="cargo-no" @click='intmanage=false'>取消</div>
				<div class="cargo-yes" @click="handlecargoyes">保存</div>
			</div>
		</van-popup>
		
		<div class="revise-btn" @click='handleshowall' v-if='checkboxStatus'>
			更改商品
		</div>
		<div class="revise-btn2" @click='handleshowall' v-if='checkboxStatus2'>
			货道开关
		</div>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {toMoney} from '@/moneyFilter.js'
import {submitTest} from '@/common/js/loginTest.js'
import { Dialog } from 'vant';

export default {
  name: 'HelloWorld',
  data () {
    return {
    	checkboxStatusT:true,
    	checked:false,
    	active:0,
    	cargosum:10,
    	allcheck:false,
	    checkboxStatus:false,
	    intmanage:false,
	    selectsum:0,
	    goodslist:[],
	    manage_id:'',
	    showspeed:false,
	    showgoodlist:false,
	    showspeedall:false,
	    newBoxid:'',
	    pno2:1,
	    tabData:[{
	    	name:'一',
	    	value:10
	    },{
	    	name:'二',
	    	value:20
	    },{
	    	name:'三',
	    	value:30
	    },{
	    	name:'四',
	    	value:40
	    },{
	    	name:'五',
	    	value:50
	    },{
	    	name:'六',
	    	value:60
	    },{
	    	name:'七',
	    	value:7
	    },{
	    	name:'八',
	    	value:80
	    },{
	    	name:'九',
	    	value:90
	    },{
	    	name:'十',
	    	value:100
	    },],
	    fromData2:{
	    	ids:[],
      		price:'',
      		priceGame:'',
      		machineNum:'',
      		productId:'',
      		remainder:0,
      		imgUrl:'',
      		sellPrice:'',
      		game_price:'',
      		volume:10
	    },
	    fromData:{
	      		ids:[],
	      		price:'',
	      		priceGame:'',
	      		machineNum:'',
	      		productId:'',
	      		remainder:0,
	      		imgUrl:'',
	      		sellPrice:'',
	      		game_price:'',
	      		maxSize:10
	    },
	    searchData:'',
      	listData:[],
      	listDat2:[],
      	listsum2:0,
      	machineNum:'',  //设备编号
      	boxNum:'',
      	boxNum1:'',
      	pno:1,
      	listsum:0,
      	productId:0,
      	floorSum:10,
      	checkboxStatus2:false,
    }
  },
  methods:{
  	//货道初始化弹框
  	handlenew(){
  		this.intmanage=!this.intmanage
  	},
  	//货道测试对话框
  	handleBase(){
  		Dialog.confirm({
		  message: '是否对改货道进行电机检测'
		}).then(() => {
		 	// on confirm
		 	alert('测试完毕')
		}).catch(() => {
		  // on cancel
		  console.log('no')
		});
  	},
  	//标签栏点击事件
  	onClick(index, title) {
  		let n=index+1
      	this.floorSum=n*10
      	let _this=this
      	this.allcheck=false
      	this.checkboxStatus=false
  		for(var i=0;i<this.goodslist.length;i++){
  			this.goodslist[i].check=false
  		}
	  	axios({
			method: 'get',
		    url:'/api/MachineBoxApi/List?machineId='+_this.$route.params.manageid+'&floor='+n,
		}).then((res)=>{
			if(res.data.length>0){
				_this.machineNum=res.data[0].machineNum
				for(var i=0;i<res.data.length;i++){
					if(res.data[i].check=='0'){
						res.data[i].check=false
					}else{
						res.data[i].check=true
					}
				}
			}
			_this.goodslist=res.data;
		}).catch(err=>{
			submitTest(err,_this);
		})
    },
  	//货道初始化弹框保存事件
  	handlecargoyes(){
  		Dialog.confirm({
		  title: '警告',
		  message: '若继续确定保存，该设备上所有原数据将清空，请慎重决定'
		}).then(() => {
		  	let fromData=qs.stringify({
				machineId:this.$route.params.manageid,
				count:this.cargosum
			})
	  		axios({
				method:'get',
				url:'/api/MachineBoxApi/InitBoxs?machineId='+this.$route.params.manageid+'&count='+this.cargosum,
				responseType:'json'
			}).then((res)=>{
				this.intmanage=false;
				if(res.data.status=='Fail'){
					alert(res.data.msg)
				}else if(res.data.status=='Success'){
					alert(res.data.msg)
					let _this=this
				  	axios({
						method: 'get',
					    url:'/api/MachineBoxApi/List?machineId='+this.$route.params.manageid+'&machineNum='+_this.machineNum,
					}).then((res)=>{
						for(var i=0;i<res.data.length;i++){
							if(res.data[i].check=='0'){
								res.data[i].check=false
							}else{
								res.data[i].check=true
							}
						}
						_this.goodslist=res.data;
						this.allcheck=false
					}).catch(err=>{
						submitTest(err,_this);
					})
				}
			})
		}).catch(() => {
		  // on cancel
		});
  	},
  	//全选事件
  	oncheckall(){
  		this.allcheck=!this.allcheck
  		for(var i=0;i<this.goodslist.length;i++){
  			this.goodslist[i].check=this.allcheck
  		}
  	},
  	onClickLeft(){
  		this.$router.go(-1);
  	},
  	//批量管理事件
  	handleCheck(){
  		this.checkboxStatus=!this.checkboxStatus;
  		this.checkboxStatusT=!this.checkboxStatus;
  		this.checkboxStatus2=false
  	},
  	//批量货道开关
  	handleCheck2(){
  		this.checkboxStatus=false;
  		this.checkboxStatus2=!this.checkboxStatus2;
  		this.checkboxStatusT=!this.checkboxStatus2;
  	},
  	//复选框事件
  	oncheck(e){
  		const index = e.currentTarget.dataset.index;
		this.goodslist[index].check=!this.goodslist[index].check
  	},
  	//编辑触发下拉窗口
  	handleshow(e){
  		const index = e.currentTarget.dataset.index;
  		this.showspeed=!this.showspeed
  		this.fromData=this.goodslist[index]
  		this.newBoxid=this.goodslist[index].id;   //货道id
  		this.boxNum1=this.goodslist[index].boxNum;    //盒子编号
  		this.productId=this.goodslist[index].productId;  //商品id
  	},
  	//编辑的下拉窗口取消事件
  	handlepopupno(){
  		let _this=this
	  	axios({
			method: 'get',
		    url:'/api/MachineBoxApi/List?machineId='+_this.$route.params.manageid,
		}).then((res)=>{
			if(res.data.length>0){
				_this.machineNum=res.data[0].machineNum
	//			_this.boxNum=res.data.boxNum
				for(var i=0;i<res.data.length;i++){
					if(res.data[i].check=='0'){
						res.data[i].check=false
					}else{
						res.data[i].check=true
					}
				}
			}
			_this.goodslist=res.data;
		}).catch(err=>{
			submitTest(err,_this);
		})
		this.showspeed=!this.showspeed
  	},
  	//编辑的下拉窗口确定事件
  	handlepopupok(){
  		let _this=this;
  		this.showspeed=!this.showspeed;
  		let n=this.fromData;
  		var arr=[];
  		var arr1=[];
		arr.push(parseInt(_this.newBoxid))
		arr1.push(parseInt(_this.boxNum1))
  		let fromData={
			boxNums:arr1,     //盒子编码数组
      		remainder:n.remainder,
      		price:n.price,
      		productId:this.productId,    //商品id
      		machineNum:_this.machineNum,
      		priceGame:n.priceGame,
      		ids:arr,    //盒子id数组
      		maxSize:n.maxSize
		}
  		if(arr.length==0){
  			alert('请选择货道')
  		}else if(!this.boxNum1){
  			alert('请选择商品')
  		}else if(!n.price){
  			alert('请填写商品价格')
  		}else if(n.remainder>n.maxSize){
  			alert('库存数不能大于货道容量')
  		}
  		
  		if(arr.length!=0&&n.price&&this.boxNum1&&(n.remainder<=n.maxSize)){
  			axios({
				method:'post',
				url:'/api/MachineBoxApi/Edit',
				data:fromData,
				responseType:'json'
			}).then((res)=>{
				if(res.data.status=='Fail'){
					alert(res.data.msg)
				}else if(res.data.status=='Success'){
					alert(res.data.msg)
					let _this=this
				  	axios({
						method: 'get',
					    url:'/api/MachineBoxApi/List?machineId='+this.$route.params.manageid+'&machineNum='+_this.machineNum,
					}).then((res)=>{
						for(var i=0;i<res.data.length;i++){
							if(res.data[i].check=='0'){
								res.data[i].check=false
							}else{
								res.data[i].check=true
							}
						}
						_this.goodslist=res.data;
					}).catch(err=>{
						submitTest(err,_this);
					})
				}
			})
  		}
  	},
  	//批量设置触发下拉窗口
  	handleshowall(e){
  		let _this=this
//		const index = e.currentTarget.dataset.index;
  		this.showspeedall=!this.showspeedall
//		this.fromData=this.goodslist[index]
		var arr=0;
		for(var i=0;i<_this.goodslist.length;i++){
			if(_this.goodslist[i].check){
				arr++;
			}
		}
		this.selectsum=arr;
		let n=this.fromData2;
		n.machineNum=this.goodslist[0].machineNum
		n.remainder=0
		n.price=0
		n.productId=0
		n.priceGame=0
		n.title=''
  	},
  	//批量设置的下拉窗口取消事件
  	handlepopupnoall(){
  		this.showspeedall=!this.showspeedall
  	},
  	//批量设置的下拉窗口确定事件
  	handlepopupokall(){
  		let _this=this;
  		this.showspeedall=!this.showspeedall;
  		let n=this.fromData2;
  		var arr=[];
  		var arr1=[];
		for(var i=0;i<_this.goodslist.length;i++){
			if(_this.goodslist[i].check){
				arr.push(_this.goodslist[i].id)
				arr1.push(_this.goodslist[i].boxNum)
			}
		}
		
  		let fromData={
			boxNums:arr1,   //盒子id数组
      		remainder:n.remainder,  //库存
      		price:n.price,  //价格
      		productId:n.productId,  //商品id
      		machineNum:_this.machineNum,   //设备编号
      		priceGame:n.priceGame,   //游戏价格
      		ids:arr,
      		maxSize:n.volume
		}
  		
  		if(arr.length==0){
  			alert('请选择货道')
  		}else if(!n.productId){
  			alert('请选择商品')
  		}else if(!n.price){
  			alert('请填写商品价格')
  		}else if(n.remainder>n.volume){
  			alert('库存数不能大于货道容量')
  		}
  		if(arr.length!=0&&n.productId&&n.price&&(n.remainder<=n.volume)){
  			axios({
				method:'post',
				url:'/api/MachineBoxApi/Edit',
				data:fromData,
				responseType:'json'
			}).then((res)=>{
				if(res.data.status=='Fail'){
					alert(res.data.msg)
				}else if(res.data.status=='Success'){
					alert(res.data.msg)
					let _this=this
				  	axios({
						method: 'get',
					    url:'/api/MachineBoxApi/List?machineId='+this.$route.params.manageid+'&machineNum='+_this.machineNum,
					}).then((res)=>{
						for(var i=0;i<res.data.length;i++){
							if(res.data[i].check=='0'){
								res.data[i].check=false
							}else{
								res.data[i].check=true
							}
						}
						_this.goodslist=res.data;
						this.allcheck=false
					}).catch(err=>{
						submitTest(err,_this);
					})
				}
			})
  		}
  	},
//	handleRevise(){
//		let _this=this;
//		var arr=[];
//		for(var i=0;i<_this.goodslist.length;i++){
//			if(_this.goodslist[i].check){
//				arr.push(_this.goodslist[i].id)
//			}
//		}
//		console.log(arr) 
//		localStorage.setItem('goodslist',JSON.stringify(arr))
//		
//	},
  	//批量管理礼品名称选择事件
  	handleSelectGoods(){
  		let _this=this;
		_this.showgoodlist=true;
  	},
  	//编辑管理礼品名称选择事件
  	handleSelectGood(){
  		let _this=this
  		_this.showgoodlist=true;
  	},
  	//搜索框
	onSearch(){
		let fromData=qs.stringify({
			searchData:this.searchData
		})
		axios({
			method:'post',
			url:'/api/ProductApi/List?page='+this.pno+'&status=0',
			data:fromData,
			responseType:'json'
		}).then((res)=>{
			if(res.data.status=='success'){
				this.listData=res.data.data[0];
			}else if(res.data.status=='fail'){
			}
		}).catch(err=>{
		})
	},
	//选择商品
	handleGood(e){
		let _this=this;
		const good_lid = e.currentTarget.dataset.goodid;
		_this.fromData.title=_this.listData[good_lid].title;
		_this.fromData.productId=_this.listData[good_lid].id;
		_this.productId=_this.listData[good_lid].id
		this.boxNum=_this.listData[good_lid].id;
		_this.fromData.price=_this.listData[good_lid].sellPrice;
		
		_this.fromData2.title=_this.listData[good_lid].title;
		_this.fromData2.productId=_this.listData[good_lid].id;
		_this.fromData2.price=_this.listData[good_lid].sellPrice;
//		_this.fromData.id=_this.listData[good_lid].id
//		_this.fromData.imgUrl=_this.listData[good_lid].imgUrl
//		_this.fromData.title=_this.listData[good_lid].title
//		_this.fromData.sellPrice=_this.listData[good_lid].sellPrice
		_this.showgoodlist=!_this.showgoodlist
	},
	//选择商品2
	handleGood2(e){
		let _this=this;
		const good_lid = e.currentTarget.dataset.goodid;
		let n=_this.listData2
		_this.fromData.title=n[good_lid].title;
		_this.fromData.productId=n[good_lid].id;
		_this.productId=n[good_lid].id
		this.boxNum=n[good_lid].id;
		_this.fromData.price=n[good_lid].sellPrice;
		
		_this.fromData2.title=n[good_lid].title;
		_this.fromData2.productId=n[good_lid].id;
		_this.fromData2.price=n[good_lid].sellPrice;
//		_this.fromData.id=_this.listData[good_lid].id
//		_this.fromData.imgUrl=_this.listData[good_lid].imgUrl
//		_this.fromData.title=_this.listData[good_lid].title
//		_this.fromData.sellPrice=_this.listData[good_lid].sellPrice
		_this.showgoodlist=!_this.showgoodlist
	},
	//商品分页切换
	handlePno(){
		let _this=this;
		axios({
			method: 'get',
		    url:'/api/ProductApi/List?page='+this.pno+'&status=0',
		}).then((res)=>{
			_this.listData=res.data.data;
			this.listsum=res.data.totalCount
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
	//商品分页切换2
	handlePno2(){
		axios({
			method: 'get',
		    url:'/api/ProductApi/ListCommon?page='+this.pno2,
		}).then((res)=>{
			_this.listData2=res.data.data;
			this.listsum2=res.data.totalCount
		}).catch(err=>{
			submitTest(err,_this);
		})
	}
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  	//获取设备所有盒子
  	let _this=this
  	axios({
		method: 'get',
	    url:'/api/MachineBoxApi/List?machineId='+_this.$route.params.manageid,
	}).then((res)=>{
		if(res.data.length>0){
			_this.machineNum=res.data[0].machineNum
//			_this.boxNum=res.data.boxNum
			for(var i=0;i<res.data.length;i++){
				if(res.data[i].check=='0'){
					res.data[i].check=false
				}else{
					res.data[i].check=true
				}
			}
		}
		_this.goodslist=res.data;
	}).catch(err=>{
		submitTest(err,_this);
	})
	_this.goodslist=[{},{}]
	//获取已上架商品信息列表
	axios({
		method: 'get',
	    url:'/api/ProductApi/List?page='+this.pno+'&status=0',
	}).then((res)=>{
		this.listData=res.data.data;
		this.listsum=res.data.totalCount
	}).catch(err=>{
		submitTest(err,_this);
	})
	//获取其他商品信息列表
	axios({
		method: 'get',
	    url:'/api/ProductApi/ListCommon?page='+this.pno2,
	}).then((res)=>{
		_this.listData2=res.data.data;
		this.listsum2=res.data.totalCount
	}).catch(err=>{
		submitTest(err,_this);
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
	.cargo-title{
		padding: 10px 0;
		text-align: center;
		font-size: 16px;
		font-weight: bold;
		border-bottom: 1px solid @BOX4;
	}
	.cargo-btns{
		display: flex;
		justify-content: space-between;
		.cargo-no{
			width: 50%;
			text-align: center;
			font-size: 15px;
			padding: 10px 0;
			border-top: 1px solid @BOX4;
			border-right: 1px solid @BOX4;
		}
		.cargo-yes{
			width: 50%;
			text-align: center;
			font-size: 15px;
			padding: 10px 0;
			border-top: 1px solid @BOX4;
		}
	}
	.cargo{
		.cargo-box{
			display: flex;
			justify-content: space-between;
			.cargo-name{
				line-height: 30px;
				font-size: 15px;
			}
		}
	}
	.goods-title{
		width: 100%;
		position: fixed;
		top: 0;		
		z-index: 10 !important;
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
	.tabs_box{
		position: fixed;
		/*top: 46px;*/
		width: 100%;
		z-index: 10;
	}
	.goods-batch{
		background: #fff;
		padding: 5px 0;
		box-shadow: @BOXcurrency;
		position: fixed;
		/*top: 46px;*/
		width: 100%;
		z-index: 10;
		margin-top: 44px;
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
		padding-top: 84px;
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
						}
					}
				}
			}
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
	}
	.revise-btn2{
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 13px 0;
		background: #E6A23C;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
	.popup-goodlist{
		z-index: 1000;
		max-height: 90%;
	}
	.goods-lists{
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
				    /*position: relative;*/
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