<template>
    <div id="editPaypw">
        <form action="" id="myForm">
            <div class="row">
                <label for="mobile">手机号</label>
                <span class="input">{{mobile}}</span>
            </div>
            <div class="row">
                <label for="password">新密码</label>
                <input type="password" id="password" name="password" v-model="password" placeholder="请输入新密码">
            </div>
            <div class="row">
                <label for="c_password">确认新密码</label>
                <input type="password" id="c_password" name="c_password" v-model="password_confirmation" placeholder="再次输入密码">
            </div>
            <div class="row">
                <label for="code">验证码</label>
                <input type="text" id="code" name="code" v-model="verification_code" placeholder="请输入短信验证码" style="width: 45%;">
                <div class="code" :disabled="getCodeShow" :class="[{getCode:getCodeShow==true},{getCode_angin:time==0}]" @click="sendcode">{{btntxt}}</div>
            </div>
            <div class="next-btn" @click="confirm">确认</div>
        </form>
        <div class="error" v-show="errorShow">{{errorMessage}}</div>
        <Footer></Footer>
    </div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import {submitTest} from '@/common/js/loginTest.js'
import { Dialog } from 'vant';
import Footer from '../index/index'
export default {
    data(){
        return{
            errorShow:false,
            errorMessage:"",
            mobile:'',
            password:"",
            password_confirmation:"",
            verification_code:"",
            time: 0,
            btntxt: "获取验证码",
            getCodeShow: false,
        }
    },
    methods:{
          //获取验证码
        sendcode(){
            this.time = 120;
			//验证码的时间设置 可有可无
			this.timer();
			//手机号争取后调取接口
			axios({
				method:'get',
				url:'/api/SystemApi/SetMsg?mobile='+'',
				responseType:'json'
			}).then((res)=>{
				if(res.data.status=="Success"){ 
					alert(res.data.msg)
				}else if(res.data.status=='Fail'){
					alert(res.data.msg)
				}
			}).catch((err)=>{
				submitTest(err,_this);
			})
        },
        //验证码的倒计时
        timer() {
            if (this.time > 0) {
                this.time--;
                this.btntxt = this.time + "s后获取";
                setTimeout(this.timer, 1000);
            } else {
                this.time = 0;
                this.btntxt = "重新获取";
                this.disabled = false;
            }
        },
        confirm(){
            let _this=this
            let reg=/^[0-9A-Za-z]{8,20}$/
            if(!reg.test(this.password)){
                this.errorShow=true;
                this.errorMessage = "密码长度在8~20之间，只能包含字母和数字";
                setTimeout( () => {
                    this.errorShow=false;
                }, 3000);
            }else if(this.password_confirmation!=this.password){
                this.errorShow=true;
                this.errorMessage = "两次输入密码不一样";
                setTimeout( () => {
                    this.errorShow=false;
                }, 3000);
            }else if(this.verification_code==""||this.verification_code==null){
                this.errorShow=true;
                this.errorMessage = "验证码不能为空";
                setTimeout( () => {
                    this.errorShow=false;
                }, 3000);
            }else{
			    Dialog.confirm({
                message: "是否确认修改密码"
                }).then(() => {
                    axios({
                        method:'get',
                        url:'/api/AccountApi/ModifyPwd?code='+this.verification_code+'&pwd='+this.password_confirmation,
                        responseType:'json'
                    }).then(res=>{
                        console.log(res)
                        if(res.data.status=='Success'){
                            alert('修改成功')
                        }else if(res.data.status=='Fail'){
                            alert(res.data.msg)
                        }
                    }).catch(err=>{
                        submitTest(err,_this);
                    })
                }).catch(() => {
                
                });
            }
        }
	},
	created () {
		axios({
			method:'get',
			url:'/api/AccountApi/GetMobile',
			responseType:'json'
		}).then((res)=>{
			this.mobile=res.data
		}).catch((err)=>{
			submitTest(err,_this);
		})
    },
    components: {
        Footer
    }
}
</script>

<style lang="less">
#editPaypw{
    width: 100%;
    height: 100%;
    position: fixed;
    background: #f5f5f5;
    #myForm{
        padding: 20px;
        background: #FFF;
        position: relative;
        .row {
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #F5F5F5;
            overflow: hidden;
            label {
				display: inline-block;
				float: left;
				font-size: 14px;
				height: 40px;
				width: 25%;
				color: #333;
            }
            input,.input{
                width: 75%;
				height: 40px;
				line-height: 40px;
				padding: 0;
				border: none;
				float: left;
				font-size: 14px;
				color: #666;
				background: none;
            }
            input:-moz-placeholder{
                color: #999999;
            }
            ::-webkit-input-placeholder{
                color: #999999;
            }
            :-ms-input-placeholder{
                color: #999999;
            }
            .code {
                float: right;
                width: 30%;
                display: inline-block;
                height: 20px;
                line-height: 20px;
                border-radius: 5px;
                background: #4194FE;
                color: #fff;
                font-size: 14px;
				text-align: center;
				margin-top: 5px;
    			padding: 6px 0;
            }
            .getCode{
                background: #DFDFDF;
                color: #fff;
                font-size: 14px;
            }
            .getCode_angin{
                background: #93BDF5;
                color: #fff;
                font-size: 14px;
            }
        }
        .next-btn {
            width: 70%;
			height: 40px;
			background: #4194FE;
			font-size: 18px;
			line-height: 40px;
			text-align: center;
			border-radius: 1rem;
			color: #FFF;
			cursor: pointer;
			margin: 80px auto 20px;
        }
    }
    .error{
        position: fixed;
        left: 50%;
        width: 50%;
        bottom: 70px;
        padding: 10px 20px;
        background: #efefef;
        text-align: center;
        margin-left: -25%;
        border-radius: 5px;
        font-size: 16px;
    }
}
</style>
