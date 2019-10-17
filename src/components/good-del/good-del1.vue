<template>
	<div class="goodDel-main">
		<!-- <div class="search-classfiy">
			<div class="search-classfiy-div">
				<div class="search-term search-status" @click="handleShowstatus">
					<div class="search-title">
					商品状态选择<i class="icon iconfont icon-f11"></i>
					</div>
					<div class="search-value">
						<span style="color: #F56C6C;"><i class="icon iconfont icon-dizhi"></i>{{manage_status}}</span>
					</div>
				</div>
				<div class="search-btn">
					<van-button size="small" type="primary" @click='handleSearch'>查询</van-button>
				</div>
			</div>
		</div> -->
		
		<div v-show="Delete">
		<div class="list-title">
			<div class="title-div">
				<span>共{{listsum}}条数据</span>
				<span>
					<!-- <van-button type="warning" size="mini" style='margin-right: 15px;' @click='handlenew2'>批量禁用</van-button> -->
					<van-button type="danger" size="small" @click='handlenew3'>批量删除</van-button>
					<!-- <van-button type="danger" size="mini" style='margin-right: 15px;' @click='handlenew'>批量删除</van-button> -->
				</span>
				
			</div>
			<!-- 分类 -->
			<van-tabs @click="GoodsClick">
  				<van-tab v-for="(value,index) in dataGoods" :key="index"  :title="value.name"  >
  				</van-tab>
			</van-tabs>
		</div>
		<div class="revise-list" v-for='(item,index) in listData' :key='index'>
			<div class="list-div">
				<div class="li-left">
					<div class="li-img">
						<img :src="item.imgUrl" alt="" />
					</div>
					<div class="li-text">
						<div class="li-text-div">
							<div class="good-name">{{item.title}}</div>
							<div class="good-price">零售价：￥{{item.sellPrice|moneyFilter}}</div>
							<div class="good-price">成本：￥{{item.costPrice|moneyFilter}}</div>
							<!-- <div class="good-price">商品状态：{{item.statusText}}</div> -->
						</div>
					</div>
				</div>
				<div class="li-right" tag='div' >
					<!-- <span v-show="checkstatus">
						<i class="icon iconfont icon-xuanzhong" v-if="item.check" @click='oncheck' style="color: #67C23A;"  :data-index='index'></i>
						<i class="icon iconfont icon-checkbox-copy" v-if="!item.check" @click='oncheck'  :data-index='index'></i>
					</span> -->
					<!-- <span v-show="checkstatus2">
						<i class="icon iconfont icon-xuanzhong" v-if="item.check" @click='oncheck' style="color: #67C23A;"  :data-index='index'></i>
						<i class="icon iconfont icon-checkbox-copy" v-if="!item.check" @click='oncheck'  :data-index='index'></i>
					</span> -->
					<span v-show="checkstatus3">
						<i class="icon iconfont icon-xuanzhong" v-if="item.check" @click='oncheck' style="color: #67C23A;"  :data-index='index'></i>
						<i class="icon iconfont icon-checkbox-copy" v-if="!item.check" @click='oncheck'  :data-index='index'></i>
					</span>
					<van-button @click='goodInfo(index)' round type="default" size="small" class='li-btn' >商品修改</van-button>
				</div>
			</div>
		</div>
		<van-pagination 
		  v-model="pno" 
		  :total-items="listsum" 
		  :show-page-size="5" 
		  @change='handlePno'
		/>
		<!-- <div class="revise-btn" @click='handleshowall' v-if='checkstatus'>
			确认批量删除
		</div> -->
		<!-- <div class="revise-btn2" @click='handleshowall2' v-if='checkstatus2'>
			确认批量删除
		</div> -->
		<div class="revise-btn3" @click='handleshowall3' v-if='checkstatus3'>
			确认批量删除
		</div>
		<!-- 场地弹出层 -->
		<!-- <van-popup v-model="showStatus">
			<div class="popup-status" style="min-width: 200px;padding: 10px;">
				<div v-for="(item,index) in manage_status_list" :key="index" style="padding: 5px 0;font-size: 16px;" :data-index = "index"  @click="handleStatus">
					<i class="icon iconfont icon-weixuanzhong1" v-if="!item.check"></i> 
					<i class="icon iconfont icon-radio-checked" v-if="item.check"></i> 
					<span>{{item.text}}</span>
				</div>
			</div>
		</van-popup> -->
		<Footer></Footer>
        </div>
        <div v-show="shutDown" class="aaa" @click="guanbi">关闭</div>
        <goodrevise v-if="modifyThe"></goodrevise>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {toMoney} from '@/moneyFilter.js'
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'
import goodrevise from '../../components/good-revise/good-revise2'
export default {
  name: 'HelloWorld',
  data () {
    return {
        shutDown:false,
        Delete:true,
        modifyThe:false,
		id:'',
		dataGoods:[],
    	pno:1,
    	listsum:0,
    	checkstatus:false,
    	checkstatus2:false,
    	checkstatus3:false,
      	listData:[],
      	showStatus:false,
      	manage_status_list:[],
      	manage_status:'全部',
        address_id:-1,
        IDc:'', 
    }
  },
  methods:{
     
	//选择场地弹出层
  	// handleStatus(e){
  	// 	let _this=this
  	// 	const index = e.currentTarget.dataset.index;
  	// 	console.log(index)
	// 	for(var i=0;i<this.manage_status_list.length;i++){
	// 		this.manage_status_list[i].check=false
	// 	}
  	// 	this.manage_status_list[index].check=!this.manage_status_list[index].check
  	// 	this.showStatus=false
  	// 	this.manage_status=this.manage_status_list[index].text
  	// 	this.address_id=this.manage_status_list[index].value
  	// },
	//开启商品状态弹出层
  	// handleShowstatus(){
  	// 	this.showStatus=!this.showStatus
  	// },
	//商品修改
	goodInfo(index){
        this.IDc = this.listData[index].id
        localStorage.setItem('indexUrl',this.IDc);
        console.log(this.IDc)
        console.log(this.listData[index].id)
        this.Delete = false
        this.modifyThe = true
        this.shutDown = true
        
    },
    guanbi(){
        this.Delete = true
        this.modifyThe = false
        this.shutDown = false
    },
	//确认批量删除
//   	handleshowall(e){
//   		let _this=this;
// //		const index = e.currentTarget.dataset.index;
// //		this.fromData=this.goodslist[index]
// 		var arr=[];
// 		for(var i=0;i<_this.listData.length;i++){
// 			if(_this.listData[i].check){
// 				arr.push(_this.listData[i].id);
// 			}
// 		}
// 		if(arr.length!=0){
// 			this.pno=1;
// 			this.address_id=-1;
// 			axios({
// 				method: 'post',
// 			    url:url.adminurl+'/api/ProductApi/Remove',
// 			    data:arr
// 			}).then((res)=>{
// 				_this.listData=res.data;
// 				axios({
// 					method: 'get',
// 				    url:url.adminurl+'/api/ProductApi/List?page=1&status=-1',
// 				}).then((res)=>{
// 					_this.listData=res.data.data;
// 					this.listsum=res.data.totalCount
// 					if(res.data.status=='Success'){
// 						alert(res.data.msg)
// 					}else if(res.data.status=='Fail'){
// 						alert(res.data.msg)
// 					}
// 				}).catch(err=>{
// 					submitTest(err,_this);
// 				})
// 			}).catch(err=>{
// 				submitTest(err,_this);
// 			})
// 		}else{
// 			alert('请先选择商品')
// 		}
//   	},
  	//确认批量启用
  	// handleshowall2(){
  	// 	let _this=this;
  	// 	var arr=[];
	// 	for(var i=0;i<_this.listData.length;i++){
	// 		if(_this.listData[i].check){
	// 			arr.push(_this.listData[i].id);
	// 		}
	// 	}
	// 	if(arr.length!=0){
	// 		this.pno=1;
	// 		this.address_id=-1;
	// 		axios({
	// 			method: 'post',
	// 		    url:url.adminurl+'/api/ProductApi/Up',
	// 		    data:arr,
	// 		}).then((res)=>{
	// 			if(res.data.status=='Success'){
	// 				alert(res.data.msg)
	// 				axios({
	// 					method: 'get',
	// 				    url:url.adminurl+'/api/ProductApi/List?page=1&status=-1',
	// 				}).then((res)=>{
	// 					_this.listData=res.data.data;
	// 					this.listsum=res.data.totalCount
	// 					if(res.data.status=='Success'){
	// 						alert(res.data.msg)
	// 					}else if(res.data.status=='Fail'){
	// 						alert(res.data.msg)
	// 					}
	// 				}).catch(err=>{
	// 					submitTest(err,_this);
	// 				})
	// 			}else if(res.data.status=='Fail'){
	// 				alert(res.data.msg)
	// 			}
	// 		}).catch(err=>{
	// 			submitTest(err,_this);
	// 		})
	// 	}else{
	// 		alert('请先选择商品')
	// 	}
  	// },
  	//确认批量禁用
  	handleshowall3(){
  		let _this=this;
  		var arr=[];
		for(var i=0;i<_this.listData.length;i++){
			if(_this.listData[i].check){
				arr.push(_this.listData[i].id);
			}
		}
		if(arr.length!=0){
			this.pno=1;
			this.address_id=-1;
			axios({
				method: 'post',
			    url:url.adminurl+'/api/ProductApi/Down',
			    data:arr,
			}).then((res)=>{
				if(res.data.status=='Success'){
					alert(res.data.msg)
					axios({
						method: 'get',
					    url:url.adminurl+'/api/ProductApi/List?page='+this.pno+'&status=0'+'&productTypeId='+this.id,
					}).then((res)=>{
						_this.listData=res.data.data;
						this.listsum=res.data.totalCount
					}).catch(err=>{
						submitTest(err,_this);
					})
				}else if(res.data.status=='Fail'){
					alert(res.data.msg)
				}
				
			}).catch(err=>{
				submitTest(err,_this);
			})
		}else{
			alert('请先选择商品')
		}
  	},
	//复选框事件
  	oncheck(e){
  		const index = e.currentTarget.dataset.index;
		this.listData[index].check=!this.listData[index].check
  	},
	//批量删除开关
	// handlenew(){
	// 	this.checkstatus=!this.checkstatus
	// 	this.checkstatus2=false
	// 	this.checkstatus3=false
	// 	for(var i=0;i<this.listData.length;i++){
	// 		this.listData[i].check=false
	// 	}
	// },
	//批量启用开关
	// handlenew2(){
	// 	this.checkstatus2=!this.checkstatus2
	// 	this.checkstatus=false
	// 	this.checkstatus3=false
	// 	for(var i=0;i<this.listData.length;i++){
	// 		this.listData[i].check=false
	// 	}
	// },
	//批量禁用开关
	handlenew3(){
		this.checkstatus3=!this.checkstatus3
		//this.checkstatus=false
		//this.checkstatus2=false
		for(var i=0;i<this.listData.length;i++){
			this.listData[i].check=false
		}
	 },
	//查询
	// handleSearch(){
	// 	let _this=this;
	// 	axios({
	// 		method: 'get',
	// 	    url:url.adminurl+'/api/ProductApi/List?page='+this.pno+'&status='+this.address_id,
	// 	}).then((res)=>{
	// 		_this.listData=res.data.data;
	// 		this.listsum=res.data.totalCount
	// 	}).catch(err=>{
	// 		submitTest(err,_this);
	// 	})
	// },
	//页码切换
	// 选着商品分类
	GoodsClick(name, title){
		this.dataGoods[name].name
		var aaa =	this.$toast(title);
		this.id = this.dataGoods[name].id
			// this.showgoodlist=true;
		var pno = this.pno
        this.inon()
        
	},
	handlePno(){
		let _this=this;
		var pno = this.pno
		axios({
			method: 'get',
		    url:url.adminurl+'/api/ProductApi/List?page='+pno+'&status=0'+'&productTypeId='+this.id,
		}).then((res)=>{
			_this.listData=res.data.data;
			this.listsum=res.data.totalCount
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
	//商品分类
	chooseGoods(){
		axios({
			method:'get',
			url:url.adminurl+'/api/ProductTypeApi/ListAll',
			responseType:'json'
		}).then((res)=>{
			this.dataGoods = res.data
			let i
			var te =""//水饮
			var yanjiu = ''//烟酒
			var lingshi = ''//零食
			for(i in this.dataGoods){
				if(this.dataGoods[i].name == "水饮"){
					console.log(i)
					te = this.dataGoods[i]
					this.dataGoods.splice(i, 1)
				}
			}
			for(i in this.dataGoods){
				if(this.dataGoods[i].name == "烟酒"){
					console.log(i)
					yanjiu = this.dataGoods[i]
					this.dataGoods.splice(i, 1)
				}
			}
			for(i in this.dataGoods){
				if(this.dataGoods[i].name == "零食"){
					console.log(i)
					lingshi = this.dataGoods[i]
					this.dataGoods.splice(i,1)
				}
			}
			this.dataGoods.splice(1,0,te,yanjiu,lingshi);
			// this.dataGoods.splice(1,0,str[0],str1[0],str2[0]);
			this.id = this.dataGoods[0].id
		}).catch(()=>{
			submitTest(err,_this);
		})
	},
	inon(){
		let _this=this;
		//获取已上架商品信息列表
		this.pno = 1
		axios({
			method: 'get',
	    	url:url.adminurl+'/api/ProductApi/List?page='+this.pno+'&status=0'+'&productTypeId='+this.id,
		}).then((res)=>{
			_this.listData=res.data.data;
			this.listsum=res.data.totalCount
		}).catch(err=>{
			submitTest(err,_this);
		})
	}
  },
  //实例化
  components:{
      Footer,
      goodrevise
  },
  //开始创建
  created(){
	this.chooseGoods()
	setTimeout(()=>{
		this.inon()
	},500)
  	
	//获取商品状态
	// axios({
	// 	method:'get',
	// 	url:url.adminurl+'/api/ProductApi/ProductStatus',
	// 	responseType:'json'
	// }).then((res)=>{
	// 	this.manage_status_list=res.data;
	// }).catch(err=>{
	// 	submitTest(err,_this);
	// })
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
    window.onpopstate = () => {
        this.Delete = true
        this.modifyThe = false
        this.shutDown = false
    }
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
	padding: 10px 0;
	background: @BGGrey;
	display: flex;
	justify-content: space-between;
}
.goodDel-main{
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
	.van-pagination{
		margin-bottom: 100px;
	}
	.search-classfiy{
		background: #fff;
		.search-classfiy-div{
			background: #fff;
			padding: 10px 0;
			width:97%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.search-status{
				/*border-right: 2px solid @BOX3;*/
			}
			.search-term{
				width: 98%;
				box-sizing: border-box;
				font-size:14px;
				color:#666;
				.search-title{
					text-align: center;
				}
				.search-value{
					text-align: center;
				}
			}
			.search-btn{
				padding-left: 10px;
				border-left: 2px solid @BOX3;
			}
		}
	}
	.revise-list{
		padding: 8px 0;
		border-bottom:1px solid @BOX3;
		background: #fff;
		.list-div{
			width: 97%;
			margin: 0 auto;
			font-size: 14px;
			color: @FTC3;
			display: flex;
			justify-content: space-between;
			.li-left{
				width: 65%;
				/*display: flex;
				justify-content: space-between;*/
				.li-img{
					min-height: 80px;
					width: 75px;
					max-width: 85px;
					float: left;
					border:1px solid @BOX3;
					padding:1px;
					img{
						width: 98%;
						height: 98%;
						max-height: 90px;
					}
				}
				.li-text{
					width: 60%;
					height: 100%;
					margin-left: 8px;
					float: left;
					.li-text-div{
						height: 80%;
						margin-top: 8px;
						display: flex;
					    flex-direction: column;
					    justify-content: space-between;
					    .good-name{
					    	font-size: 16px;
					    	color: @FTC2;
					    }
					    .good-price{
					    	color: @BGblue;
					    }
					}
				}
			}
			.li-right{
				width: 20%;
				text-align: center;
				.li-btn{
					margin-top: 10px;
					border-color: @BGblue;
					color: @BGblue;
					text-align: center;
				}
				.icon{
					margin-top: 5px;
				}
			}
		}
	}
	.revise-btn{
		position: fixed;
		bottom: 51px;
		width: 100%;
		padding: 13px 0;
		background: @BGdanger;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
	.revise-btn2{
		position: fixed;
		bottom: 51px;
		width: 100%;
		padding: 13px 0;
		background: #67C23A;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
	.revise-btn3{
		position: fixed;
		bottom: 51px;
		width: 100%;
		padding: 13px 0;
		background: red;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
}

</style>