<template>
	<div class="login-main">
		<div class="header-main">
			<div class="header-div">
				<div class="header-img1">
					<div class="header-img2">
						<div class="header-img3">
							<!--<van-icon name="contact" class='header-img'/>-->
							<!-- <img src="http://119.23.218.210/allPHP/bg_ws.jpg" alt="" /> -->
						</div>
					</div>
				</div>
				<span class="header-regster"><router-link to='/register' class='go-register'>立即注册</router-link></span>
			</div>
		</div>
		<div class="login-inlayer">
			<van-cell-group class='from-all'>
			  <van-field
			    v-model="username"
			    placeholder="请输入手机号"
			    left-icon="contact"
			    clearable
			    style='font-size: 18px;'
			  />
			   <van-field
			    clearable
			    placeholder="请输入密码"
			    type="password"
			    left-icon="records"
			    style='font-size: 18px; position: absolute;  top: 0;  z-index: -1;'
			  />
			  <van-field
			    v-model="password"
			    clearable
			    placeholder="请输入密码"
			    type="password"
			    left-icon="records"
			    style='font-size: 18px;'
			  />
			</van-cell-group>
			<van-checkbox v-model="checked">记住密码</van-checkbox>
			<div class='loginMsg' v-show='mesStatus'>
				<van-icon name="info-o" class='loginMsg-icon'/>
				{{loginMes}}
			</div>
			<van-button size="large" type="primary" :disabled='isbtn' :loading='btnLoding' @click="handleLogin" class='loginBtn'>立即登录</van-button>
		</div>
		<mt-popup class="popup" v-model="popupStatus" position="top" :modal='modal'>
			<div>{{popupMsg}}</div>
		</mt-popup>
		<div class="footer-main">
			<div class="footer">
				<span class="version">当前版本 vs-1.0</span>
			</div>
		</div>
	</div>
</template>

<script>
import {Button,Popup,Field} from 'mint-ui'
import qs from 'qs'
import axios from 'axios'
import {Toast} from 'vant'
import url from '@/urlRouter.js'

export default{
	name:'login',
	data(){
		return {
			popupMsg:'登录成功',
			username:'',
			password:'',
			nameStatus:'success',
			passStatus:'error',
			loginMes:'登录提示',   //登录提示内容
			modal:false,   //popup是否创建一个遮罩层
			popupStatus:false,  //是否关闭popup
			isbtn:true,   //按钮禁用状态
			isbtn1:0,
			isbtn2:0,
			isbtns:0,
			btnLoding:false,  //按钮等待状态
			mesStatus:false,   //登录结果div 状态
			checked:false,
		}
	},
	methods:{
		handleLogin(){
            this.btnLoding=true;
            if(!/^((1[3,5,8,9,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.username)){
				this.btnLoding=false;
				Toast.fail('手机号码不正确');
            }else if(this.password==""||this.password==null){
				this.btnLoding=false;
                Toast.fail('密码不能为空');
            }else{
                var loginData=qs.stringify({
					mobile:this.username,
					pwd:this.password
				})
				setTimeout(()=>{
					this.btnLoding=false;
					axios({
						method:'post',
						url:url.adminurl+'/api/AccountApi/Login',
						data:loginData,
						responseType:'json'
					}).then((response)=>{
						console.log(response.data)
						if(response.data.status=='Success'){
							//判断复选框是否被勾选 勾选则调用配置cookie方法
							if (this.checked == true) {
								//传入账号名，密码，和保存天数3个参数
								this.setlocalStorage(this.username, this.password, this.checked);
							}else if(this.checked==false){
							    this.clear();
							}
							// console.log("登录成功")
							this.popupStatus=true;
							this.loginMes="";
							this.mesStatus=false;
							localStorage.setItem("username",this.username);
							localStorage.setItem("password",this.password);
							this.$router.push({path:'/home'})
							setTimeout(()=>{
								this.popupStatus=false;
							},1500)
							
						}else{
	//						console.log("登录失败")
							this.loginMes=response.data.msg;
							this.mesStatus=true;
							Toast.fail('登录失败');
							this.clear();
						}
					}).catch((err)=>{
						console.log(err)
						this.popupStatus=true;
						this.popupMsg='网络错误，请稍后再试';
						setTimeout(()=>{
							this.popupStatus=false;
							this.popupMsg='';
						},1500)
					})
				},1000)
            }
        },
        //像localStorage里存入从页面获取的用户名和密码；
        setlocalStorage(c_name, c_pwd,isChecked) {
            localStorage.siteName = c_name
            localStorage.sitePassword = c_pwd
            localStorage.siteChecked=isChecked
        },
		 getlocalStorage: function() {
            this.username = localStorage.getItem("siteName") //保存到保存数据的地方
            this.password = localStorage.getItem("sitePassword")
            this.checked = localStorage.getItem("siteChecked")
        },
		 // 点击忘记密码，清空localStorage里的存储
        clear: function() {
            this.setlocalStorage('', '','')
        },
		changePassword(){
			var obj=document.getElementById("newPass");
			obj.setAttribute('type', 'password');
			this.rem_password=this.password;
		}
	},
	mounted () {
		this.getlocalStorage();	
	},
	components:{
		
	},
	watch:{
		username:function(val){
			if(val!==''){
				this.isbtn1=1
				this.isbtns=this.isbtn1+this.isbtn2
				if(this.isbtns==2){
					this.isbtn=false
				}else{
					this.isbtn=true
				}
			}else{
				this.isbtn1=0
				this.isbtns=this.isbtn1+this.isbtn2
				if(this.isbtns==2){
					this.isbtn=false
				}else{
					this.isbtn=true
				}
			}
		},
		password:function(val){
			if(val!==''){
				this.isbtn2=1
				this.isbtns=this.isbtn1+this.isbtn2
				if(this.isbtns==2){
					this.isbtn=false
				}else{
					this.isbtn=true
				}
			}else{
				this.isbtn2=0
				this.isbtns=this.isbtn1+this.isbtn2
				if(this.isbtns==2){
					this.isbtn=false
				}else{
					this.isbtn=true
				}
			}
		}
	}
}
</script>

<style scoped lang="less">
@import '../../style/main.less';

.login-main{
	.header-main{
		width:100%;
		height:222px;
		background:#008DD5;
		position: relative;
		.header-div{
			position: absolute;
			top: 45%;
			margin-top:-90px;
			left: 50%;
			margin-left: -100px;
			width: 200px;
			height: 220px;
			.header-regster{
				position: absolute;
				top: 0px;
				right:-65px;
				font-size:17px;
				.go-register{
					color:#fff;
				}
			}
			.header-img1{
				position: absolute;
				width: 100%;
				height: 200px;
				border-radius: 50%;
				background: #1B97D7;
				.header-img2{
					position: absolute;
					top: 50%;
					margin-top:-72.5px;
					left: 50%;
					margin-left: -72.5px;
					width: 145px;
					height: 145px;
					border-radius: 50%;
					background: #76C0E5;
					.header-img3{
						position: absolute;
						top: 50%;
						margin-top:-45px;
						left: 50%;
						margin-left: -45px;
						width: 90px;
						height: 90px;
						border-radius: 50%;
						background: #D7EDF8;
						.header-img{
							position: absolute;
							top: 50%;
							margin-top:-17.5px;
							left: 50%;
							margin-left: -17.5px;
							color: #1587B5;
							font-size: 35px;
						}
						img{
							position: absolute;
							width: 100%;
							height: 100;
							border-radius: 50%;
						}
					}
				}
			}
		}
		.header-text{
			width: 100%;
			color: #fff;
			font-size: 18px;
			font-weight: bold;
			margin-top: 205px;
			text-align: center;
		}
	}
	.login-inlayer{
		width:90%;
		margin:0px auto;
		font-size:16px;
		margin-top:10px;
		.from-all{
			box-shadow:1px solid @BOX4;
			border-radius:8px;
			margin-bottom:10px;
			.van-field__icon{
				color:@BGdanger !important;
			}
			.van-icon-checked{
				color:@BGsuccess !important;
			}
		}
		.loginBtn{
			border:1px solid transparent;
			margin-top: 15px;
			background: @BGdanger !important;
			border-radius: 5px;
		}
		.loginMsg{
			color: @BGdanger;
			text-align: center;
			padding-top: 15px;
			border: none;
			box-sizing:border-box;
			transition:all .5s linear;
			.loginMsg-icon{
				font-weight: bold;
				margin-right: 8px;
			}
		}
	}
	.popup{
		font-size: 18px;
	  	height:45px;
	  	background-color:rgba(0,0,0,.5) !important;
	 	width:100%;
	  	color:#fff;
	 	text-align:center;
	  	line-height:45px;
	 	transition:all .5s linear;
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