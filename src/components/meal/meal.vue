<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="优惠设置"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="meal-main">
			<div class="meal-title">
				<div class="meal-title-div">
					<span class="title-name">充值优惠</span>
					<span class="title-value">
						<span class="value-1" @click="handleoff">恢复默认设置</span>
						<span class="value-0">|</span>
						<span class="value-2" @click="handleShowDia">添加</span>
					</span>
				</div>
			</div>
			<div class="meal-list">
				<div class="meal-list-div">
					<div class="meal-li" v-for="(item,index) in mealList" :key='index'>
						<span class="li-value">
							<span class="value-title">价格：</span>
							<span class="value-sum">{{item.amount|moneyFilter}}</span>元
							<br />
							<span class="value-title">游戏币：</span>
							<span class="value-sum">{{item.num}}</span> 游戏币送<span class="value-sum">{{item.giveNum}}</span>游戏币
							<br />
							<span class="value-title">总计：</span>
							共<span class="value-sum">{{item.num+item.giveNum}}</span>游戏币
						</span>
						<span class="li-btns">
							<van-button size="small" style='color: #909399;' @click='handlerevise' :data-index = "index">修改</van-button>
							<van-button size="small" style='color: #909399;' @click='handledel' :data-index = "index">删除</van-button>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="revise-btn" @click='handleshowall'>
			保存提交
		</div>
		<!-- 添加弹出层 -->
		<van-dialog
		  v-model="show"
		  show-cancel-button
		  :before-close="beforeClose"
		>
		  <div class="dia-li">
		  	<div class="dia-li-div">
		  		<div class="li-money">价格</div>
			  	<div class="li-input">
			  		<input type="number" class="li-input-value" v-model="newDia.amount"/>
			  		元
			  	</div>
		  	</div>
		  </div>
		  <div class="dia-li">
		  	<div class="dia-li-div">
		  		<div class="li-money">游戏币数量</div>
			  	<div class="li-input">
			  		<van-stepper v-model="newDia.num" integer :min="0"/>
			  	</div>
		  	</div>
		  </div>
		  <div class="dia-li">
		  	<div class="dia-li-div">
		  		<div class="li-money">赠送游戏币</div>
			  	<div class="li-input">
			  		<van-stepper v-model="newDia.giveNum" integer :min="0"/>
			  	</div>
		  	</div>
		  </div>
		</van-dialog>
		<!-- 修改弹出层 -->
		<van-dialog
		  v-model="reviseshow"
		  show-cancel-button
		  :before-close="beforeClose2"
		>
		  <div class="dia-li">
		  	<div class="dia-li-div">
		  		<div class="li-money">价格</div>
			  	<div class="li-input">
			  		<input type="number" class="li-input-value" v-model="reviseDia.amount"/>
			  		元
			  	</div>
		  	</div>
		  </div>
		  <div class="dia-li">
		  	<div class="dia-li-div">
		  		<div class="li-money">游戏币数量</div>
			  	<div class="li-input">
			  		<van-stepper v-model="reviseDia.num" integer :min="0"/>
			  	</div>
		  	</div>
		  </div>
		  <div class="dia-li">
		  	<div class="dia-li-div">
		  		<div class="li-money">赠送游戏币</div>
			  	<div class="li-input">
			  		<van-stepper v-model="reviseDia.giveNum" integer :min="0"/>
			  	</div>
		  	</div>
		  </div>
		</van-dialog>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import {toMoney} from '@/moneyFilter.js'
import {Toast} from 'vant'
import { Dialog } from 'vant';
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
    	show:false,
    	reviseshow:false,
    	list_index:0,   //修改的索引标记
    	reviseDia:{
    		amount:0,
      		num:0,
      		giveNum:0,
    	},
    	newDia:{
    		amount:0,
      		num:0,
      		giveNum:0,
    	},
      	mealList:[{
    		amount:10,
      		num:10,
      		giveNum:10,
    	},{
    		amount:20,
      		num:20,
      		giveNum:20,
    	},{
    		amount:50,
      		num:50,
      		giveNum:50,
    	},{
    		amount:100,
      		num:100,
      		giveNum:100,
    	}],
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//修改事件
	handlerevise(e){
		this.reviseshow=!this.reviseshow
		const index = e.currentTarget.dataset.index;
		this.list_index=index
		this.reviseDia=this.mealList[index]
	},
	//删除事件
	handledel(e){
		const indexs = e.currentTarget.dataset.index;
		let _this=this
		Dialog.confirm({
		  title: '确认删除该套餐',
		}).then(() => {
			let cookieMeal=JSON.parse(localStorage.getItem('mealdata'));  //获取缓存中的列表数据
			cookieMeal.splice(indexs, 1)
			localStorage.setItem('mealdata',JSON.stringify(cookieMeal));
			_this.mealList=cookieMeal
		}).catch(() => {
		});
	},
	//保存提交
	handleshowall(){
		let _this=this;
//		console.log(_this.mealList)
		let base=_this.mealList;
		for(var i=0;i<base.length;i++){
			base[i].amount=parseFloat(base[i].amount)
			
			base[i].total=base[i].num+base[i].giveNum
		}
		let cookieMeal=JSON.parse(localStorage.getItem('mobile_select'));  //获取缓存中的已选择设备 id数据数组
		Dialog.confirm({
		  message: '是否确认提交'
		}).then(() => {
		  	// on confirm
		 	 axios({
				method:'post',
				url:'/api/MachineMealApi/Set',
				data:{
					mealDetails:base,  //设备套餐
					machineNums:cookieMeal      //设备编码
				},
			}).then((res)=>{
				if(res){
					alert(res.data.msg)
				}else{
					alert('套餐设置失败，请重试')
				}
				
			}).catch(err=>{
				submitTest(err,_this);
			})
		}).catch(() => {
		  // on cancel
		});
		
	},
	//开启弹出层
	handleShowDia(){
		this.show=!this.show
	},
	//修改弹出层确定
	beforeClose2(action, done){
		let _this=this;
		let isinput=true;  //用于验证价格是否重复的标记
		console.log(JSON.parse(localStorage.getItem('mealdata')))
		let cookieMeal=JSON.parse(localStorage.getItem('mealdata'));  //获取缓存中的列表数据
		_this.mealList=cookieMeal
	    if (action === 'confirm') {
	    	for(var i=0;i<cookieMeal.length;i++){
	    		
	    		if(cookieMeal[i].amount==parseFloat(_this.reviseDia.amount)){
	    			Toast.fail('输入的价格已存在');
	    			_this.reviseDia.amount=0
	    			_this.reviseDia.num=0
	    			_this.reviseDia.giveNum=0
	    			isinput=false;
	    			break;
	    		}
	    	}
	    	if(isinput){
	    		let index=this.list_index
	    		_this.mealList[index].amount=_this.reviseDia.amount
	    		_this.mealList[index].num=_this.reviseDia.num
	    		_this.mealList[index].giveNum=_this.reviseDia.giveNum
//	    		console.log(_this.mealList)
//	    		console.log(_this.newDia)
//	    		_this.mealList.push(_this.newDia)
//	    		let base=_this.mealList.push(_this.newDia)
//	    		console.log(_this.mealList.push(_this.newDia))
	    		localStorage.setItem('mealdata',JSON.stringify(_this.mealList));
	    	}
	    	done();
	    }else {
	        done();
	    }
	},
	//添加弹出层确定
	beforeClose(action, done){
		let _this=this;
		let isinput=true;  //用于验证价格是否重复的标记
		let cookieMeal=JSON.parse(localStorage.getItem('mealdata'));  //获取缓存中的列表数据
		_this.mealList=cookieMeal
	    if (action === 'confirm') {
	    	for(var i=0;i<cookieMeal.length;i++){
	    		if(cookieMeal[i].amount==parseFloat(_this.newDia.amount)){
	    			Toast.fail('输入的价格已存在');
	    			_this.newDia.amount=0
	    			_this.newDia.num=0
	    			_this.newDia.giveNum=0
	    			isinput=false;
	    			break;
	    		}
	    	}
	    	if(isinput){
	    		
//	    		_this.mealList.push(_this.newDia)
	    		let base=_this.mealList.push(_this.newDia)
//	    		console.log(_this.mealList.push(_this.newDia))
	    		localStorage.setItem('mealdata',JSON.stringify(_this.mealList));
	    		Toast.success('添加成功');
	    	}
	    	done();
	    }else {
	        done();
	    }
	},
	//恢复默认设置
	handleoff(){
		Dialog.confirm({
		  message: '是否确认恢复默认设置'
		}).then(() => {
		  	let _this=this
			let base=JSON.parse(localStorage.getItem('oldmealdata'));
			_this.mealList=base
			localStorage.setItem('mealdata',JSON.stringify(base));
		}).catch(() => {
		  // on cancel
		});
	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	let base=[{
    		amount:10,
      		num:10,
      		giveNum:10,
    	},{
    		amount:20,
      		num:20,
      		giveNum:20,
    	},{
    		amount:50,
      		num:50,
      		giveNum:50,
    	},{
    		amount:100,
      		num:100,
      		giveNum:100,
    	}]
  	localStorage.setItem('mealdata',JSON.stringify(base));
  	localStorage.setItem('oldmealdata',JSON.stringify(base));
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
	color: @FTC2;
	display: flex;
	justify-content: space-between;
}
.dia-li{
	margin-top:10px;
	.dia-li-div{
		width:95%;
		margin:0 auto;
		display: flex;
		justify-content: space-between;
		color:#666;
		font-size:16px;
	}
	.li-money{
		width:30%;
		height:40px;
		line-height:40px;
	}
	.li-input{
		width: 50%;
		height:40px;
		line-height:40px;
		/*border: 1px solid @BOX3;*/
		.li-input-value{
			width: 70%;
			height: 20px;
			text-align: center;
		}
	}
}
.getcell-main{
	color: @FTC2;
	background:#fff;
	padding-bottom:50px;
	.meal-main{
		.meal-title{
			padding: 10px 0;
			border-bottom:1px solid @BOX3;
			.meal-title-div{
				width:95%;
				margin:0 auto;
				display: flex;
				justify-content: space-between;
				font-size:16px;
				.title-value{
					.value-1{
						color: @BGblue;
					}
					.value-0{
						padding-left: 8px;
						padding-right: 8px;
					}
					.value-2{
						color: @BGblue;
					}
				}
			}
		}
		.meal-list{
			.meal-list-div{
				width:95%;
				margin:0 auto;
				.meal-li{
					font-size: 16px;
					color: #666;
					padding: 10px 0;
					border-bottom: 1px solid @BOX3;
					display: flex;
					justify-content: space-between;
					.li-btns{
						min-width: 125px;
						height: 40px;
						margin-top: 16px;
					}
				}
			}
		}
	}
	.value-sum{
		color: @BGdanger;
	}
	.value-title{
		color: @FTC2;
		font-weight: bold;
	}
	.revise-btn{
		position: fixed;
		bottom: 51px;
		width: 100%;
		padding: 13px 0;
		background: @BGsuccess;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
}
</style>