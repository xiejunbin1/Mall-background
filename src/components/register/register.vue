<template>
	<div class="register-main">
		<!--<van-nav-bar
		  title="账号注册"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		
		<div class="register-img">
			<span class="register-img-span">
				<i class="icon iconfont icon-zhuce2"></i>
				欢迎注册
			</span>
		</div>
		
		<div class="from-body">
			<van-cell-group>
			  <!--<van-field
			    v-model="username"
			    clearable
			    label="昵称"
			    placeholder="请输入昵称"
			    left-icon="contact"
			    :error-message="msg1"
			  />-->
			
				<van-field
			    v-model="phone"
			    type="text"
			    label="手机号"
			    clearable
			    placeholder="手机号作为账号登录"
			    left-icon="phone"
			    :error-message="msg3"
			  >
			  	<van-button slot="button" size="small" :disabled='testBtn' type="primary" @click='handleTest'>{{testMsg}}</van-button>
			  </van-field>
			  
			  <van-field
			    v-model="sms"
			    center
			    clearable
			    label="短信验证码"
			    placeholder="请输入短信验证码"
			    :error-message="msg4"
			  >
			    
			  </van-field>
			
			  <van-field
			    v-model="password"
			    type="password"
			    label="密码"
			    clearable
			    placeholder="密码长度在8~20之间"
			    left-icon="records"
			    :error-message="msg2"
			  />
			  
			  <van-field
			    v-model="confirmpassword"
			    type="password"
			    label="确认密码"
			    clearable
			    placeholder="确认密码必须一致"
			    left-icon="records"
			    :error-message="msg5"
			  />
			  
			</van-cell-group>
			
			<div class="registerBtn-div">
				<van-button size="large" type="primary" :disabled='isbtn' :loading='btnLoding' @click="handleRegister" class='registerBtn'>立即注册</van-button>
			</div>
		</div>
		<div class="footer-main">
			<div class="footer">
				<span class="version">欢迎注册账号，使用本系统</span>
			</div>
		</div>
		
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import {Toast,Dialog} from 'vant'
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'


export default {
  name: 'HelloWorld',
  data () {
    return {
      	username:'',
      	password:'',
      	confirmpassword:'',
      	phone:'',
      	sms:'',
      	testMsg:'获取验证码',
      	testBtn:true,
      	isbtn:true,
      	isbtns:0,
      	isbtn1:0,
      	isbtn2:0,
      	isbtn3:0,
      	isbtn4:0,
      	msg1:'',
      	msg2:'',
      	msg3:'',
      	msg4:'',
      	msg5:'',
      	btnLoding:false
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//注册提交
	handleRegister(){
		this.btnLoding=true;
		let reg=/^[0-9A-Za-z]{8,20}$/
		if(!reg.test(this.password)){
			this.msg2='密码长度在8~20之间，只能包含字母和数字'
		}else{
			this.msg2=''
		}
		if(!this.sms){
			this.msg4='验证码不能为空'
		}else if(this.sms.length!=4){
			this.msg4='验证码长度在4位'
		}else{
			this.msg4=''
		}
		setTimeout(()=>{
			this.btnLoding=false;
			if(this.password&&this.sms&&(this.sms.length==4)){
	//			console.log('提交')
				let fromData=qs.stringify({
					nickName:this.username,
					mobile:this.phone,
					pwd:this.password,
					authCode:this.sms
				})
				axios({
					method:'post',
					url:url.adminurl+'/api/AccountApi/SignIn',
					data:fromData,
				}).then((res)=>{
					
					if(res.data.status=='Success'){
						Dialog.alert({
						  title: '提示',
						  message: '注册成功，快去登录吧！'
						}).then((res) => {
						  this.$router.push({path:'/login'});
						});
					}else{
						if(res.data.code==-1){
							this.msg1=res.data.msg
						}else{
							Toast.fail(res.data.msg);
						}
					}
				}).catch((err)=>{
					let _this=this;
					submitTest(err,_this);
				})
			}
		},500)
	},
	//获取验证
	handleTest(){
		var reg=/^((1[3,5,8,9,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
		
		if(reg.test(this.phone)){
			this.msg3='';
		}else{
			this.msg3='手机号格式不正确'
		}
		this.testBtn=true;
		let second=120;
		const timer = setInterval(() => {
			second--;
		  	if (second) {
		    	this.testMsg = `${second}秒后可重新获取 `;
		  	} else {
		  		this.testMsg = `获取验证码`;
			    clearInterval(timer);
			    this.testBtn=false;
			}
		}, 1000);
		let mobileData=qs.stringify({
				mobile:this.phone
			})
		axios({
		method:'get',
			url:url.adminurl+'/api/SystemApi/SetMsg?mobile='+this.phone,
		}).then((res)=>{
			if(res.data.status=="Success"){
					alert(res.data.msg)
			}else if(res.data.status=='Fail'){
				alert(res.data.msg)
				 clearInterval(timer);
			}
			
		}).catch((err)=>{
			let _this=this;
			submitTest(err,_this);
//			if(err.response.statusText=='Unauthorized'){
//				Toast.fail(err.response.data);
//				setTimeout(()=>{
//					this.$router.push({path:'/login'})
//				},3000);
//			}else if(err.response.statusText=='RequestTimeout'){
//				Toast.fail(err.response.data);
//			}else if(err.response.statusText=='InternalServerError'){
//				Toast.fail(err.response.data);
//			}else{
//				Toast.fail('网络错误，请稍后重试');
//			}
		})
	}
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  	
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
  	
  },
  watch:{
//	username:function(val){
//		if(val!==''){
//			this.isbtn1=1
//			this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3+this.isbtn4
//			if(this.isbtns==4){
//				this.isbtn=false
//			}else{
//				this.isbtn=true
//			}
//		}else{
//			this.isbtn1=0
//			this.isbtns=this.isbtn1+this.isbtn2+this.isbtn3+this.isbtn4
//			if(this.isbtns==4){
//				this.isbtn=false
//			}else{
//				this.isbtn=true
//			}
//		}
//		console.log(this.isbtns)
//	},
  	password:function(val){
  		if(val!==''){
			this.isbtn2=1
			this.isbtns=this.isbtn2+this.isbtn3+this.isbtn4
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}else{
			this.isbtn2=0
			this.isbtns=this.isbtn2+this.isbtn3+this.isbtn4
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}
		if(val!=this.confirmpassword){
  			this.isbtn4=0
			this.isbtns=this.isbtn2+this.isbtn3+this.isbtn4
			this.msg5='两次密码输入不一致'
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
  		}else{
  			this.isbtn4=1
			this.isbtns=this.isbtn2+this.isbtn3+this.isbtn4
			this.msg5=''
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
  		}
  	},
  	confirmpassword:function(val){
  		if(val!=this.password){
  			this.isbtn4=0
			this.isbtns=this.isbtn2+this.isbtn3+this.isbtn4
			this.msg5='两次密码输入不一致'
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
  		}else{
  			this.isbtn4=1
			this.isbtns=this.isbtn2+this.isbtn3+this.isbtn4
			this.msg5=''
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
  		}
  	},
  	phone:function(val){
  		if(val.length==11){
  			this.testBtn=false
  		}else{
  			this.testBtn=true
  		}
  	},
  	sms:function(val){
  		if(val!==''){
			this.isbtn3=1
			this.isbtns=this.isbtn2+this.isbtn3+this.isbtn4
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}else{
			this.isbtn3=0
			this.isbtns=this.isbtn2+this.isbtn3+this.isbtn4
			if(this.isbtns==3){
				this.isbtn=false
			}else{
				this.isbtn=true
			}
		}
		console.log(this.isbtns)
  	}
  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	width: 90%;
	margin: 0 auto;
	margin-top: 30px;
	box-shadow: @BOXcurrency;
	text-align: center;
	padding:10px 0;
}
.register-main{
	.register-img{
		padding: 10px 0;
		margin-top:10px;
		background: #fff;
		text-align: center;
		.register-img-span{
			/*background: #33ccff;*/
			padding:20px;
			border-radius:5px;
			font-size:20px;
			color:@BGsuccess;
			.icon-zhuce2{
				color: @BGsuccess;
				font-size: 30px;
			}
		}
	}
	.from-body{
		width: 90%;
		margin: 0 auto;
		margin-top: 15px;
		padding:10px 0;
		box-shadow: @BOXcurrency;
		border-radius:5px;
		.registerBtn-div{
			width: 97%;
			margin: 0 auto;
			padding:20px 0;
			.registerBtn{
				
			}
		}
	}
	.footer-main{
		margin-top:25px;
		width: 100%;
		height: 50px;
		
		.footer{
			width: 80%;
			height: 100%;
			margin: 0 auto;
			
			text-align: center;
			font-size: 16px;
			color: #808080;
			.go-register{
				color: @BGblue;
			}
			.version{
				font-size: 14px;
				color: #ddd;
			}
		}
	}
}
</style>