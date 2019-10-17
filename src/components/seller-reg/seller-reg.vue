<template>
	<div class="seller-main">
		<!--<van-nav-bar
		  title="商户进件"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="seller-ul">
			<van-cell-group>
		  		<van-field
				    v-model="username"
				    label="商户名称"
				    placeholder="2-15位，必填"
				    :error-message="msg1"
				    
				    clearable
				  />
				<van-field
				    v-model="usernamereuse"
				    label="商户简称"
				    placeholder="2-15位，必填"
				    :error-message="msg2"
				    
				    clearable
				/>
				<van-field
				    v-model="photo"
				    label="商户手机号"
				    placeholder="11位，必填"
				    :error-message="msg3"
				    
				    clearable
				  />
				<van-field
				    v-model="omit"
				    label="省"
				    placeholder="完整名称，必填"
				    :error-message="msg4"
				    
				    clearable
				/>
				<van-field
				    v-model="agora"
				    label="市"
				    placeholder="完整名称，必填"
				    :error-message="msg5"
				    
				    clearable
				  />
				<van-field
				    v-model="areas"
				    label="区"
				    placeholder="完整名称，必填"
				    :error-message="msg6"
				    
				    clearable
				/>
				
				
				
			</van-cell-group>
			
			<van-button size="large"  :disabled='isbtn' :loading='btnLoding' @click="handlereg" class='loginBtn'>{{btndata}}</van-button>
			
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import {Toast} from 'vant'
import url from '@/urlRouter.js'
import {toRes} from '@/res_return.js'
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
    	isbtn:false,
    	btnLoding:false,
    	issmsbtn:true,
    	username:'',
      	msg1:'',
      	err1:false,
      	usernamereuse:'',
      	msg2:'',
      	err2:false,
      	photo:'',
      	msg3:'',
      	err3:false,
      	omit:'',
      	err4:false,
      	msg4:'',
      	agora:'',
      	err5:false,
      	msg5:'',
      	areas:'',
      	err6:false,
      	msg6:'',
      	btndata:'立即注册'
    }
  },
  methods:{
  	//提交按钮
  	handlereg(){
  		if(!this.username){
  			this.msg1='名称不能为空';
  			this.err1=true;
  		}else if(this.username.length<2){
  			this.msg1='名称在2-15位';
  			this.err1=true;
  		}else if(this.username.length>15){
  			this.msg1='名称在2-15位';
  			this.err1=true;
  		}else{
  			this.msg1='';
  			this.err1=false;
  		}
  		
  		if(!this.usernamereuse){
  			this.msg2='简称不能为空';
  			this.err2=true;
  		}else if(this.usernamereuse.length<2){
  			this.msg2='简称在2-15位';
  			this.err2=true;
  		}else if(this.usernamereuse.length>15){
  			this.msg2='简称在2-15位';
  			this.err2=true;
  		}else{
  			this.msg2='';
  			this.err2=false;
  		}
  		
  		let photoreg=/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/
  		if(!this.photo){
  			this.msg3='手机号不能为空';
  			this.err3=true;
  		}else if(!photoreg.test(this.photo)){
  			this.msg3='手机号格式不正确';
  			this.err3=true;
  		}else{
  			this.msg3='';
  			this.err3=false;
  		}
  		
  		if(!this.omit){
  			this.msg4='省份不能为空';
  			this.err4=true;
  		}else if(this.omit.length<2){
  			this.msg4='省份长度2位以上';
  			this.err4=true;
  		}else{
  			this.msg4='';
  			this.err4=false;
  		}
  		
  		if(!this.agora){
  			this.msg5='市不能为空';
  			this.err5=true;
  		}else if(this.agora.length<2){
  			this.msg5='市级长度2位以上';
  			this.err5=true;
  		}else{
  			this.msg5='';
  			this.err5=false;
  		}
  		
  		if(!this.areas){
  			this.msg6='区不能为空';
  			this.err6=true;
  		}else if(this.areas.length<2){
  			this.msg6='区域长度2为以上';
  			this.err6=true;
  		}else{
  			this.msg6='';
  			this.err6=false;
  		}
//		this.isbtn=true;
//		let second=20;
//		const timer = setInterval(() => {
//			second--;
//		  	if (second) {
//		    	this.btndata = `${second}秒后可重新注册 `;
//		  	} else {
//		  		this.isbtn=false;
//		  		this.btndata = `立即注册 `;
//			    clearInterval(timer);
//			}
//		}, 1000);
		let fromData=qs.stringify({
			merchant_name:this.username,
			abbreviation:this.usernamereuse,
			user_phone:this.photo,
			province:this.omit,
			city:this.agora,
			_area:this.areas
		})
//		console.log(url.setcell);
		if(this.username&&this.usernamereuse&&this.photo&&photoreg.test(this.photo)&&this.omit&&this.agora&&this.areas){
			axios({
				method:'post',
				url:url.setcell+'/Merchant/Register',
				data:fromData,
			}).then(res=>{
				toRes(res.data.status,res.data.msg,res.data);
				if(res.data.status=='Success'){
					window.location.href=res.data.data.url;
				}
			}).catch((err)=>{
				let _this=this;
				submitTest(err,_this);
			})
		}
  	},
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	
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
	width: 97%;
	margin: 0 auto;
}
.seller-main{
	.seller-ul{
		width: 97%;
		margin: 0 auto;
	}
	.loginBtn{
		margin-top: 50px;
		background: @BGsuccess;
		color: #fff;
	}
}
</style>