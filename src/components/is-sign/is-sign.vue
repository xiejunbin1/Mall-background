<template>
	<div class="main">
		<!-- 网络错误   -->
		<div v-show="status_err" class="status_err">
			<div id="err" @click="handleNew">
				<div id="succss-box" class="img-box"><img src="../../common/img/bg4.png" alt="" class="err-img"/></div>
				<div class="err-text" id="err-text2">网络错误,点击刷新</div>
			</div>
		</div>
		
		<!--  前去修改   -->
		<div v-show="status_revise" class="status_revise">
			<div id="err-box" class="img-box"><img src="../../common/img/bg3.png" alt="" class="err-img"/></div>
			<div class="err-text" id="err-text">{{status_msg}}</div>
			<div class="err-btn" id="err-btn" @click="handleToRevise">
				<van-button size="large" type="warning">前去修改</van-button>
			</div>
		</div>
		
		<!--   审核成功  -->
		<div v-show="status_success" class="status_success">
			<div id="succss-box" class="img-box">
				<p class="img_title" v-show="wimgShow">长按二维码开通微信支付</p>
				<img :src="wxQrCode" alt="" class="err-img"/>
			</div>
			<div id="succss-box1" class="img-box">
				<p class="img_title" v-show="zimgShow">长按二维码开通支付宝支付</p>
				<img :src="zfbQrCode" alt="" class="err-img"/>
			</div>
			<div class="succss-text" id="succss-text">{{status_msg}}</div>
			<div class="success-btn" id="success-btn" @click="handleToback">
				<van-button size="large" type="primary">返回上一页</van-button>
			</div>
			<div class="success-btn" id="success-btn" @click="handleToback2" >
				<van-button size="large" type="warning">修改资料</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      	status_err:false,
      	status_revise:false,
      	status_success:false,
				status_msg:'',
				wxQrCode:'',
				zfbQrCode:'',
				wimgShow: true,
				zimgShow:true
    }
  },
  methods:{
  	//返回上一页
	handleToback(){
		this.$router.go(-1);
	},
	handleToback2(){
		 this.$router.push({path:'/stuffIndex'})
	},
	handleToRevise(){
		 this.$router.push({path:'/stuffIndex'})
	},
	handleNew(){
		location.reload();
	},
	
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
	let _this=this;
  	axios({
		method:'get',
		url:url.adminurl+'/api/MerchantApi/SignDetail',
		responseType:'json'
	}).then((res)=>{
		if (res.data.status == 'Success') {
			this.status_msg=res.data.msg
				axios({
					method:'get',
					url:url.adminurl+'/api/MerchantApi/AuthQrcode',
					responseType:'json'
				}).then((res)=>{
					this.wxQrCode=res.data.wxQrCode
					this.zfbQrCode=res.data.zfbQrCode
					if(this.wxQrCode==null||this.wxQrCode==''){
						this.wimgShow=false
					}
					if(this.zfbQrCode==null||this.zfbQrCode==''){
						this.zimgShow=false
					}
					this.status_success=true				
				}).catch(err=>{
					submitTest(err,_this);
				})
			this.status_success=true
		} else if (res.data.status == 'Fail') {
			if(res.data.msg){
				this.status_msg=res.data.msg
				this.status_revise=true;
			}else{
//				console.log('跳转签约页面')
				// this.$router.push({path:'/stuffIndex'})
				//var hrefs=window.location.host;
				//window.location.href='/Merchant/StuffIndex'
//				window.location.href='http://terminalmobile.dingyou168.xyz/Merchant/StuffIndex'    //测试版本地址
//				window.location.href='http://terminal.dingyou168.xyz/Merchant/StuffIndex'        //正式版本地址
			}
		}
	}).catch(err=>{
		submitTest(err,_this);
		this.status_err=true;
		
	})
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
.main{
	background: #fff;	
}
.status_err{
	position: absolute;
	top: 50%;
	margin-top: -192px;
	width: 100%;
}
.status_revise{
	position: absolute;
	top: 50%;
	margin-top: -143px;
	width: 100%;
}
.status_success{
	position: absolute;
	top: 35%;
	margin-top: -202px;
	width: 100%;
}
.err-img{
	width: 100%;
}
img{
	width: 100%;
}
#succss-box,#succss-box1{
	box-sizing: border-box;
	padding: 10px 0;
	width: 50%;
	margin: 0 auto;
	height: 50%;
}
.img_title{
	text-align: center;
	font-size: 16px;
	margin-bottom: 10px;
}
#err-box{
	box-sizing: border-box;
	padding: 10px 0;
}
.img-box{
	width: 100%;
}
.err-text{
	text-align: center;
	color: rgba(0,0,0,.45);
	font-size: 20px;
	font-weight: bold;
}
.err-btn{
	width: 100%;
	box-sizing: border-box;
	padding: 10px 20px;
}
.succss-text{
	text-align: center;
	color: rgba(0,0,0,.45);
	font-size: 20px;
	font-weight: bold;
}
.success-btn{
	width: 100%;
	box-sizing: border-box;
	padding: 10px 20px;
}
</style>