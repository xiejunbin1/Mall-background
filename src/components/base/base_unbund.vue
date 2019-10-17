<template>
    <div class="base_unbund">
        <div class="pass2">
			<div class="pass2-div">
				<div class="pass2-btn">
					<div class="pass2-input pass2-input1">
						<span class="input-title">出厂编号:</span>
						<input v-model="fromData.machineNum" placeholder="设备码"  style="background: #fff;"/>
					</div>
					<div class="pass2-test">{{passTest1}}</div>
					
					<div class="pass2-input pass2-input2">
						<span class="input-title">出厂编码:</span>
						<input  v-model="fromData.machineCode" placeholder="请输入设备编号" maxlength="10"/>
					</div>
					<div class="pass2-test">{{passTest2}}</div>
					
					<div class="pass2-input pass2-input2">
						<span class="input-title">代理商:</span>
						<input  v-model="fromData.agentNo" placeholder="请输入代理商名称"/>
					</div>
					<van-button size="large" type="primary"  class='pass2-btn' @click="search">查询</van-button>
					<van-button size="large" type="primary"  class='pass2-btn' @click="ubbund">设备解绑</van-button>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import {submitTest} from '@/common/js/loginTest.js'
export default {
    data () {
        return {
            fromData:{
                machineNum:'',   //设备编号
                machineCode:'',    //设备码
                agentNo:''    //代理商
            },
            passTest1:'',
            passTest2:'',
        }
	},
	methods: {
		search(){
			let _this=this
			if(!_this.fromData.machineNum){
				this.passTest1='出厂编号不能为空'
			}else{
				this.passTest1='';
				axios({
					method: 'get',
					url:'/api/MachineWhiteApi/Detail?machineNum='+this.fromData.machineNum+'&machineCode='+this.fromData.machineCode,
				}).then((res)=>{
					if(res.data.status=="Success"){
						_this.fromData.machineNum=res.data.data.machineNum
						_this.fromData.machineCode=res.data.data.machineCode
						_this.fromData.agentNo=res.data.data.agentNo
					}else if(res.data.status=="Fail"){
						alert(res.data.msg)
					}
				}).catch(err=>{
					submitTest(err,_this);
				})
			}

		},
		ubbund(){
			let _this=this
			if(!_this.fromData.machineNum){
				this.passTest1='出厂编号不能为空'
			}else{
				this.passTest1=''
			}
			axios({
				method: 'get',
			    url:'/api/MachineWhiteApi/RemoveBinged?machineNum='+this.fromData.machineNum,
			}).then((res)=>{
				console.log(res)
				if(res.data.status=="Success"){
					alert(res.data.msg);
				}else if(res.data.status=="Fail"){
					alert(res.data.msg)
				}
			}).catch(err=>{
				submitTest(err,_this);
			})
		}
	}
}
</script>

<style lang="less">
@import '../../style/main.less';
.base_unbund{
    .pass2{
		padding: 50px 0;
		.pass2-div{
			width: 90%;
			margin: 0 auto;
			.pass2-test{
				color: @BGdanger;
			}
			.pass2-input{
				padding: 10px 5px;
				border: 1px solid @BOX1;
				border-radius: 8px;
				background: #fff;
				.input-title{
					font-size: 14px;
					color: @FTC2;
				}
				.icon-xiugaimima1{
					font-size: 18px;
					color: @BGdanger;
				}
				.icon-xiugaimima2{
					font-size: 18px;
					color: @BGsuccess;
				}
				input{
					min-height: 60%;
					max-width: 80%;
					margin-left: 15px;
					border:none;
					font-size: 15px;
				}
			}
			.pass2-input2{
				margin-top: 20px;
			}
			.pass2-btn{
				margin-top: 20px;
			}
        }
    }
}
</style>

