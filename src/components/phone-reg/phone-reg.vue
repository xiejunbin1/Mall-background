<template>
	<div class="getcell-main">
		<div class="from-body">
			<van-cell-group>
			  <van-field v-model="phone" placeholder="请输入手机号码" clearable/>
			</van-cell-group>
			<van-cell-group>
			  <van-field
			    v-model="test"
			    center
			    clearable
			    label="短信验证码"
			    placeholder="请输入短信验证码"
			  >
			    <van-button slot="button" size="small" type="primary" @click='handleTest' :disabled='isDis'>{{btnValue}}</van-button>
			  </van-field>
			</van-cell-group>
			<div class="msg-reg">{{msgreg}}</div>
			<div class="phone-btn">
				<van-button size="large" type="primary" @click='handleSubmit' :disabled='isbtn'>确认提交</van-button>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
      	phone:'',
      	test:'',
      	msgreg:'',
      	isDis:false,
      	isbtn:true,
      	isbtn1:0,
      	isbtn2:0,
      	isbtns:0,
      	btnValue:'获取验证码',
      	openid:'',
    }
  },
  methods:{
	//发送验证码
	handleTest(){
		let n=this.phone
		let _this=this;
		if(n){
			var reg=/^((1[3,5,8,7,4,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
			if(reg.test(n)){
				let second = 120;
				this.isDis=true
				const timer = setInterval(() => {
				  second--;
				  if (second) {
				    this.btnValue = `(${second})s后可获取 `;
				  } else {
				  	this.isDis=false
				  	clearInterval(timer);
				  	this.btnValue = `获取验证码 `;
				  }
				}, 1000);
				
				this.msgreg=''
				let formData=qs.stringify({
					model:this.phone
				})
				axios({
					method:'get',
					url:'/api/SystemApi/SetMsg?mobile='+this.phone,
				}).then((res)=>{
					if(res){
						alert(res.data.msg)
					}
				}).catch((err)=>{
					submitTest(err,_this);
				})
			}else{
				this.msgreg='手机号码格式不正确'
			}
		}else{
			this.msgreg='手机号码不能为空'
		}
	},
	//确认提交
	handleSubmit(){
		let n=this.phone
		let _this=this;
		var reg=/^((1[3,5,8,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
		if(n){
			if(reg.test(n)){
				this.msgreg=''
			}else{
				this.msgreg='手机号码格式不正确'
			}
		}else{
			this.msgreg='手机号码不能为空'
		}
		
		if(reg.test(n)&&this.test){
			axios({
			method:'get',
				url:'/api/AccountApi/Bingding?mobile='+this.phone+'&code='+this.test+'&openid='+this.openid,
			}).then((res)=>{
				alert(res.data.msg)
				if(res.data.status=='Fail'){
					this.msgreg(res.data.msg);
				}else{
					_this.$router.push({path:'/home'})
				}
			}).catch((err)=>{
				submitTest(err,_this);
			})
		}
	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	var url = document.location.toString();
　　var arrUrl = url.split("?");
　　var para = arrUrl[1];
	let openid=url.split("=")[1];
//	alert(openid);
  	if(openid){
  		this.openid=openid
  	}
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
  	
  },
  watch:{
  	phone:function(val){
  		if(val){
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
  	test:function(val){
  		if(val){
  			console.log(val.length)
			if(val.length==4){
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
.span{
	position: absolute;
}
.getcell-main{
	.from-body{
		margin-top: 20px;
		/*position: absolute;
		top: 50%;
		margin-top: -47px;*/
		.msg-reg{
			font-size: 14px;
			color: @BGdanger;
			width: 100%;
			box-sizing: border-box;
			padding: 10px 5px 0 10px;
			text-align: center;
		}
		.phone-btn{
			width: 100%;
			box-sizing: border-box;
			padding: 10px 15px;
		}
	}
}
</style>