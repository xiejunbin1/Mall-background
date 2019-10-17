<template>
	<div class="getcell-main">
		<div class="change-header">
			<span class="use_tip" @click="onHelp"><i class="icon iconfont icon-tishi"></i>零钱说明</span>
			<div class="header-img">
				<i class="icon iconfont icon-lingqian1"></i>
			</div>
			<div class="header-text header-text1">我的零钱</div>
			<div class="header-text header-text2">￥{{my_totel}}</div>
			
			<!--<router-link to="/changecash" tag="div" class="header-btn1">-->
			<div class="header-btn1" @click="handleliting">
				<van-button size="large" type="primary">零钱提现</van-button>
			</div>
			<!--</router-link>-->
			
			<router-link to="/changerecord" tag="div" class="header-btn2">
				<van-button size="large">提现记录</van-button>
			</router-link>
			<div class="header-btn2" @click="Uploader">
				<van-button size="large" type="warning">上传微信收款二维码</van-button>
			</div>
		</div>
		<van-popup v-model="help">
			<div class="help_box">
				<div class="border_box">
					<div class="help_title">零钱提现须知</div>
					<ol class="help_li">
						<li>未提交商户资料审批通过前,交易金额自动存入钱包</li>
						<li>务必上传微信收款二维码将零钱提现到个人微信帐户</li>
						<li>商户资料通过后,当日营收次日自动汇入商户绑定银行卡</li>
					</ol>
				</div>
			</div>
		</van-popup>
		 <van-popup v-model="Uploader_erw"  position="right">
           <div class="upload_box">
			   <div class="close_box">
				   <i class="icon iconfont icon-guanbi3" @click="Uploader_erw=false"></i>
			   </div>
			   <div class="upload_test">
				   <div class="upload_img"><img :src="imgSrc" alt=""></div>
				   <van-uploader :after-read="onRead" accept="image/*">
				   		<van-button type="primary" class="upload_btn"  size="large"><van-icon name="photograph" class='img-icon'/>上传图片</van-button>
				   </van-uploader>
			   </div>
		   </div>
        </van-popup>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import wx from 'weixin-js-sdk'
import { Dialog } from 'vant';
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
		  my_totel:0,
		  help:false,
		  Uploader_erw:false,
		  imgSrc:require("../../common/kehucode.jpg"),
    }
  },
  methods:{
  	//申请提现
  	handleliting(){
  		Dialog.confirm({
		  title: '确认提现',
		  message: '此操作将申请提现全部零钱，请确认'
		}).then(() => {
		 	// on confirm
		 	let _this=this;
		  	axios({
				method:'get',
				url:'/api/WalletApi/WalletWithdrawal?amount='+this.my_totel,
			}).then((res)=>{
				if(res.data.status=='Success'){
					axios({
						method:'get',
						url:'/api/WalletApi/GetWalletAmount',
					}).then((res)=>{
						this.my_totel=res.data;
						alert(res.data.msg)
					}).catch((err)=>{
						submitTest(err,_this);
					})
				}else if(res.data.status=='Fail'){
					alert(res.data.msg)
				}
			}).catch((err)=>{
				submitTest(err,_this);
			})
		}).catch(() => {
		  // on cancel
		//   console.log('no')
		});
	  },
	  onHelp(){
		  this.help=!this.help;
	  },
	  Uploader(){
		  this.Uploader_erw=!this.Uploader_erw;
	  },
	  //图片上传
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
				url:'/api/AccountApi/UploadQrCode',
				data:fromData,
				responseType:'json'
				}).then((res)=>{
					if(res.data.status=='Success'){
						_this.imgSrc=res.data.uri
						alert('上传成功')
						_this.getInfo()
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
	getInfo(){
		let _this=this;
		axios({
			method:'get',
			url:'/api/WalletApi/GetWalletInfo',
		}).then((res)=>{
			this.my_totel=res.data.amount;
			if(res.data.qrCode==null){
				this.imgSrc=this.imgSrc;
			}else{
				this.imgSrc=res.data.qrCode;
			}
		}).catch((err)=>{
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
	  this.getInfo()
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
	background: #fff;
}
.getcell-main{
	background: #fff;
	.change-header{
		box-sizing: border-box;
		padding: 60px 10px;
		.use_tip{
			position: absolute;
			right: 20px;
			top: 32px;
			font-size: 14px;
			line-height: 1;
			color: @BGblue;
			i{
				padding-right: 5px;
				vertical-align:middle;
			}
		}
		.header-img{
			text-align: center;
			.icon-lingqian1{
				color: @BGwarning;
				font-size:100px;
				line-height: 1;
			}
		}
		.header-text{
			text-align: center;
		}
		.header-text1{
			font-size: 20px;
		}
		.header-text2{
			font-size: 30px;
		}
		.header-btn1{
			margin-top: 20px;
		}
		.header-btn2{
			margin-top: 10px;
		}
	}
	.help_box{
		min-width: 300px;
		box-sizing: border-box;
		padding: 20px 5px;
		font-size: 14px;
		.border_box{
			border-radius: 10px;
			border: 2px solid #e4e7ed;
			padding: 25px 5px 5px;
			position: relative;
			.help_title{
				font-size: 16px;
				color: #303133;
				font-weight: 600;
				display: inline-block;
				padding: 5px 10px;
				background: #fff;
				z-index: 10;
				position: absolute;
				top: -16px;
				left: 50%;
				margin-left: -58px;
			}
			.help_li{
				counter-reset:sectioncounter;
				li{
					list-style-position:outside !important;
					font-size: 14px;
					color: #606266;
					padding: 5px 0;
				}
				li:before {
					content:counter(sectioncounter) "、"; 
					counter-increment:sectioncounter;
				}
			}
		}
	}
	.van-popup--right{
		background: #fff;
		.upload_box{
			height: 100vh;
			width: 100vw;
			background: #fff;
			font-size: 14px;
			.close_box{
				padding: 10px 20px;
				display: -ms-flexbox;
				display: flex;
				-ms-flex-pack: end;
				justify-content: flex-end;
			}
			.upload_test{
				width: 100%;
				box-sizing: border-box;
				padding: 10px 20px;
				.van-uploader{
					width: 100%;
				}
				.upload_img{
					width: 80%;
					margin: 0 auto;
					img{
						width: 100%;
					}
				}
				.upload_btn{
					width: 100%;
					margin-top: 10px;
					font-size: 14px;
				}
			}
		}
	}
}
</style>