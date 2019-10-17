<template>
	<div class="getcell-main">
		<div style="width: 100%;height: 1px;background: #fff;"></div>
		<div class="good-img-div">
			<div class="good-img">
				<div class="img-title">商品图片</div>
				<div class="good-imgs">
					<img :src="imgUrl" alt="" />
				</div>
				<div class="img_btn">
					<span class="img_btn_left">上传或修改图片(长宽比例1.5 : 1)</span>
						<van-button type="primary"  @click='handleDig'><van-icon name="photograph" class='img-icon'/>上传图片</van-button>
					<!--<van-button type="primary"  @click='handleUpload'><van-icon name="photograph" class='img-icon'/>上传图片</van-button>-->
				</div>
			</div>
		</div>
		
		<div class="good-img-info">
			<div class="good-info">
				<div class="info-title">商品参数</div>
				<div class="info-li">
					<div class="info-li-div">
						<i class="icon iconfont icon-mingcheng1"></i>
						<span class="good_text">商品名称:</span>
						<input type="text" class="info-li-input" placeholder="请输入商品名称" v-model="goodname"/>
						<div class="li-test">{{nametest}}{{base}}</div>
					</div>
				</div>
				<div class="info-li">
					<div class="info-li-div">
						<i class="icon iconfont icon-jiage1"></i>
						<span class="good_text">商品成本:</span>
						<input type="text" class="info-li-input" placeholder="请输入商品成本（单位：元）" v-model="goodcost"/>
						<div class="li-test">{{costtest}}</div>
					</div>	
				</div>
				<div class="info-li">
					<div class="info-li-div">
						<i class="icon iconfont icon-jiage2"></i>
						<span class="good_text">商品价格:</span>
						<input type="text" class="info-li-input" placeholder="请输入商品价格（单位：元）" v-model="goodprice"/>
						<div class="li-test">{{pricetest}}</div>
					</div>
				</div>
				<div class="info-li">
					<div class="info-li-div">
						<i class="icon iconfont icon-leixing1"></i>
						<span class="good_text">商品类别:</span>
						<button class="info-li-input category_btn" @click="choose_goodcategory">{{goodcategory}}</button>
						<div class="li-test">{{category}}</div>
					</div>
				</div>
				
			</div>
		</div>
		<div class="good-btn">
			<div class="good-btn-div">
				<van-button size="large" type="primary" :disabled='isbtn' @click='handleBtn'>提交保存</van-button>
			</div>
		</div>
		<!-- 上传方式选择  -->
		<van-popup v-model="show1" :overlay="true">
			 <van-uploader :after-read="onRead" accept="image/*">
					<div class="dig_box" style="color: #E6A23C;">
						<i class="icon iconfont icon-paizhao1"></i>
						<div class="take_box">
							拍照上传
						</div>
					</div>
				</van-uploader>
		  	<div class="dig_box" style="color: #67C23A;" @click='handleUpload2'>
		  		<i class="icon iconfont icon-hebingxingzhuang"></i>
		  		<div  class="take_box">选择样图</div>
		  	</div>
		</van-popup>
		
		<van-popup v-model="showgoodlist" position="bottom" :overlay="true" class='popup-goodlist'>
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
		</van-popup>
		 <van-popup v-model="goodcategory_show"  position="bottom"  >
             <van-picker show-toolbar :columns="category_list" @confirm="ongoodcategoryConfim" :default-index="goodcategoryIndex"  v-model="goodcategory"  @cancel="goodcategory_show = false"/>
        </van-popup>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {Toast} from 'vant'
import wx from 'weixin-js-sdk'
import {submitTest} from '@/common/js/loginTest.js'
import { Dialog } from 'vant';
import {toMoney} from '@/moneyFilter.js'
import Footer from '../index/index'

export default {
	name: 'HelloWorld',
  data () {
    return {
    	showgoodlist:false,
    	listsum2:0,
    	listData2:[],
    	show1:false,
			imgUrl:require("../../common/img/tianjia.png"),
			goodname:'',
			goodcost:'',
			goodprice:'',
			goodcategory:'请选择商品类别',
			isbtn1:0,
			isbtn2:0,
			isbtn3:0,
			isbtn4:0,
			isbtns:0,
			isbtn:true,
			nametest:'',
			costtest:'',
			pricetest:'',
			category:'',
			imgsize:1024*1024*2,
			base:'',
			pno2:1,
			isUpload:1, //是否上传图片了
			goodcategory_show:false,
			goodcategoryIndex:0,
			category_list:[],
			productType:'', //商品类别id
    }
  },
  methods:{
  	//返回上一页
	handleGood2(e){
		console.log('样品商品点击选择')
		let _this=this;
		const good_lid = e.currentTarget.dataset.goodid;
		let n=_this.listData2
		//console.log(n[good_lid]);
		_this.imgUrl=n[good_lid].imgUrl
		if(!_this.imgUrl==""||!_this.imgUrl==null){
			_this.isUpload=2
		}else{
			_this.isUpload=1
		}
		_this.goodname=n[good_lid].title
		_this.goodprice=n[good_lid].sellPrice
		_this.goodcost=n[good_lid].costPrice
		this.showgoodlist=false
		this.show1=false
	},
	//点击上传
	handleDig(){
		this.show1=!this.show1
	},
	//选图上传
	handleUpload2(){
		//console.log('选择图片')
		this.showgoodlist=!this.showgoodlist
	},
	//样品商品分页切换
	handlePno2(){
		let _this=this
		axios({
			method: 'get',
		    url:url.adminurl+'/api/ProductApi/ListCommon?page='+this.pno2,
		}).then((res)=>{
			//console.log(res);
			_this.listData2=res.data.data;
			this.listsum2=res.data.totalCount
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
	//商品类别选择
	choose_goodcategory(){
		this.goodcategory_show=!this.goodcategory_show;
	},
	ongoodcategoryConfim(picker, values){
		this.goodcategory=picker.text;
		this.productType=picker.productType
		this.goodcategory_show=false
	},

	onRead(file) {
		let _this=this;
		let img = new Image();
		img.src = file.content;
		img.onload=function(){
			_this.ontpys(img);
		}
	},
	//压缩图片的方法
	ontpys(img){
		let originWidth = img.width; // 压缩后的宽
		let originHeight=img.height;
		if(originWidth>1000){
			originWidth=1000;
			originHeight=img.height*(1000/img.width);
		}
		let canvas = document.createElement('canvas');
		let drawer = canvas.getContext("2d");
		let  quality = 0.8;
		canvas.width=originWidth;
		canvas.height=originHeight;
		drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
		let base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
		let file = this.dataURLtoFile(base64,Date.parse(Date())+'.jpg');
		file={content:base64,file:file};
		this.onimg(file);

	},
	//base64转file
	dataURLtoFile(dataurl,filename){
		let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while(n--){
				u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr],filename,{type:mime});
	},
	//图片上传
	onimg(file){
			this.show1=false
			let _this=this;
			let imgStr=file.content;
			imgStr=_this.getCaption(imgStr);
			let fromData=qs.stringify({
					base64Data:imgStr,
					filename:file.file.name
			})
			axios({
				method:'post',
				url:url.adminurl+'/api/SystemApi/UploadFile',
				data:fromData,
				responseType:'json'
				}).then((res)=>{
					console.log(res);
					if(res.data.status=='Success'){
						_this.imgUrl=res.data.uri
						_this.isUpload=2
						alert('上架成功')
					}else{
						alert(res.data.msg)
					}
				}).catch(err=>{
					submitTest(err,_this);
			})
	},
	getCaption(obj){
		var index=obj.lastIndexOf("\,");
		obj=obj.substring(index+1,obj.length);
		return obj;
	},
	//保存提交
   	handleBtn(){
		 let _this=this;
		 let imgurl
   		 if(_this.isUpload==1){
			alert('图片不能为空');
			imgurl=false
		}else{
			 imgurl=true
		}
		if(!this.goodname){
			this.nametest='名称不能为空'
		}else{
			this.nametest=''
		}
		if(!this.goodcost){
			this.costtest='成本不能为空'
		}else if(parseFloat(this.goodcost)!=this.goodcost){
			this.costtest='不得含有汉字或特殊字符'
		}else{
			this.costtest=''
		}
		if(!this.goodprice){
			this.pricetest='价格不能为空'
		}else if(parseFloat(this.goodprice)!=this.goodprice){
			this.pricetest='不得含有汉字或特殊字符'
		}else{
			this.pricetest=''
		}
		if(this.goodcategory=="请选择商品类别"){
			this.category='请选择商品类别'
		}else{
			this.category=''
		}
   		if(this.goodname&&this.goodcost&&(parseFloat(this.goodcost)==this.goodcost)&&this.goodprice&&(parseFloat(this.goodprice)==this.goodprice)&&(imgurl)&&this.goodcategory!="请选择商品类别"){
			let fromData=qs.stringify({
				id:_this.$route.params.lid,
				title:this.goodname,
				costPrice:this.goodcost,
				sellPrice:this.goodprice,
				imgUrl:this.imgUrl,
				productTypeId:this.productType
			})
			axios({
				method:'post',
				url:url.adminurl+'/api/ProductApi/Edit',
				data:fromData,
				responseType:'json'
			}).then(res=>{
				console.log(res)
				if(res.data.status=='Success'){
					alert(res.data.msg)
				}else if(res.data.status=='Fail'){
					alert(res.data.msg)
				}
			}).catch(err=>{
				submitTest(err,_this);
			})
		}
   },
    /**------------- 获取商品类别列表(start) ----------------*/
     getCategoryList(){
        let _this=this
		axios({
			method: 'get',
		    url:url.adminurl+'/api/ProductTypeApi/List?isAll=true',
		}).then((res)=>{
			if(res.status==200){
				for (let index = 0; index < res.data.length; index++) {
					_this.category_list.push({text:res.data[index].name,productType:res.data[index].id})
				}
				_this.getGoodsInfo();
			}else{
				alert(res.data.msg)
			}
		}).catch(err=>{
			submitTest(err,_this);
		})
	 },
	 getGoodsInfo(){
		 let _this=this; 
		 axios({
			method:'get',
			url:url.adminurl+'/api/ProductApi/Detail?id='+_this.$route.params.lid,
			responseType:'json'
		}).then((res)=>{
			_this.goodname=res.data.title
			_this.goodcost=res.data.costPrice
			_this.goodprice=res.data.sellPrice
			_this.good_id=res.data.id
			_this.imgUrl=res.data.imgUrl
			_this.productType=res.data.productTypeId
			if(_this.imgUrl==null){
				_this.isUpload=1
			}else{
				_this.isUpload=2
			}
			for (let index = 0; index < _this.category_list.length; index++) {
				if(_this.category_list[index].productType==res.data.productTypeId){
					_this.goodcategoryIndex=index
					_this.goodcategory=_this.category_list[index].text
				}
				
			}
		}).catch(err=>{
			submitTest(err,_this);
		})
	 }
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  		let _this=this; 
  		let fromData=qs.stringify({
			url:location.href.split('#')[0]
		})	
		_this.getCategoryList();
		//获取样品商品信息列表
		axios({
			method: 'get',
		    url:url.adminurl+'/api/ProductApi/ListCommon?page='+this.pno2,
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
  },
  watch:{
  	goodname:function(val){
  		if(val!==''){
			this.isbtn1=1
			this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}else{
			this.isbtn1=0
			this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}
  	},
  	goodcost:function(val){
  		if(val!==''){
			this.isbtn2=1
			this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}else{
			this.isbtn2=0
			this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}
  	},
  	goodprice:function(val){
  		if(val!==''){
			this.isbtn3=1
			this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}else{
			this.isbtn3=0
			this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}
	  },
	//   goodcategory:function(val){
	// 	  if(val!=='请选择商品类别'){
	// 		this.isbtn4=1
	// 		this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3+this.isbtn4
	// 		if(this.isbtns==4){
	// 			this.isbtn=false
	// 		}else{
	// 			this.isbtn=true
	// 		}
	// 	}else{
	// 		this.isbtn4=0
	// 		this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3+this.isbtn4
	// 		if(this.isbtns==4){
	// 			this.isbtn=false
	// 		}else{
	// 			this.isbtn=true
	// 		}
	// 	}
	//   }
  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	
}
.getcell-main{
	background: #fff;
	.dig_box{
		width: 268px;
		height:150px;
		box-sizing: border-box;
		padding: 20px 30px;
		border:2px solid @BOX2;
		text-align: center;
		font-size: 16px;
		color: @FTC4;
		i{
			display: block;
			font-size: 43px;
			margin-top: 12px;
		}
		.take_box{
			
		}
	}
	.popup-goodlist{
	    max-height: 90%;
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
	}
	
	.good-img-div{
		margin-top: 20px;
		text-align: center;
		.good-img{
			background: #fff;
			width: 95%;
			margin: 0 auto;
			border: 1px solid @BOX3;
			border-radius: 5px;
			.img-title{
				width: 100px;
				margin: 0 auto;
				background: #fff;
				z-index: 10;
				padding-bottom: 10px;
				color: @FTC1;
				font-size: 20px;
				font-weight: 600;
				margin-top: -14px;
				
			}
			.good-imgs{
				overflow: hidden;
				width: 98%;
				min-height: 150px;
				max-height: 200px;
				margin: 0 auto;
				img{
					width: 150px;
					height: 200px;
				}
			}
			.img_btn{
				padding: 10px 0;
			}
			.img_btn_left{
				margin-right: 10px;
				font-size: 15px;
				color: @FTC4;
			}
			.van-uploader{
				padding: 5px 0 10px 0;
				.img-icon{
					margin-right: 5px;
				}
			}
			
		}
	}
	.good-img-info{
		margin-top: 20px;
		text-align: center;
		.good-info{
			background: #fff;
			width: 95%;
			margin: 0 auto;
			border: 1px solid @BOX3;
			border-radius: 5px;
			.info-title{
				width: 100px;
				margin: 0 auto;
				background: #fff;
				z-index: 10;
				padding-bottom: 10px;
				color: @FTC1;
				font-size: 20px;
				font-weight: 600;
				margin-top: -14px;
			}
			.info-li{
				padding: 10px 0;
				.info-li-div{
					width: 85%;
					margin: 0 auto;
					text-align: left;
					border-bottom: 1px solid @BGGrey;
					.li-test{
						color: @BGdanger;
						font-size: 14px;
					}
					.good_text{
						width: 25%;
						font-size: 16px;
						color: #000;
					}
					.info-li-input{
						margin-left: 5px;
						border: none;
						width: 55%;
						font-size: 16px;
					}
					.category_btn{
						background: none;
						text-align: left;
						color: #757575;
					}
					.icon-mingcheng1{
						font-size: 20px;
						color: @BGblue;
					}
					.icon-jiage1{
						font-size: 20px;
						color: @BGwarning;
					}
					.icon-jiage2{
						font-size: 20px;
						color: @BGdanger;
					}
					.icon-zhuangtai4{
						font-size: 25px;
						color: @BGlu1;
					}
					.icon-leixing1{
						font-size: 20px;
						color: #07c160;
					}
				}
				.info-li-status{
					display: flex;
					justify-content: space-between;
					border: none;
					.li-status-name{
						font-size: 16px;
						color: @FTC2;
					}
				}
			}
		}
	}
	.good-btn{
		margin-top: 20px;
		margin-bottom: 60px;
		.good-btn-div{
			width: 95%;
			margin: 0 auto;
		}
	}
}
</style>