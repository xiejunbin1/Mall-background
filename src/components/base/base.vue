<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="设备进库"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="manage-li manage-encode " v-show="showtest">
			<!--<div class="title-div">
				<div class="manageana-li-title">出厂编码</div>
				<div class="manageana-li-value" style="width: 70%;" @click="handleScan">
					<span  class="qr-code">{{test}}</span>
					<span  class="qr-icon">
						<i class="icon iconfont icon-saomiao"></i>
					</span>
				</div>
			</div>-->
			<div class="cover">
				<span class="cover_title">二维码输入选择</span>
				<van-button size="large" type="primary" @click="handleScan">扫描设备二维码</van-button>
				<van-button size="large" type="warning" style='margin-top: 20px;' @click="handleScan2">手动输入二维码</van-button>
			</div>
		</div>
		
		<div class="pass2" v-if="showPass">
			<div class="pass2-div">
				<div class="pass2-btn">
					<div class="pass2-input pass2-input1">
						<span class="input-title">出厂编号</span>
						<input v-model="fromData.machineNum" placeholder="设备码"  style="background: #fff;"/>
					</div>
					<div class="pass2-test">{{passTest1}}</div>
					
					<div class="pass2-input pass2-input2">
						<span class="input-title">出厂编码</span>
						<input  v-model="fromData.machineCode" placeholder="请输入设备编号" maxlength="10"/>
					</div>
					<div class="pass2-test">{{passTest2}}</div>
					
					<div class="pass2-input pass2-input2">
						<span class="input-title">代理商</span>
						<input  v-model="fromData.agentNo" placeholder="请输入代理商名称"/>
					</div>
					<div class="pass2-test">{{passTest3}}</div>
					
					<van-button size="large" type="primary" @click='handleBtn2' :loading='isLoading' class='pass2-btn'>保存提交</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import wx from 'weixin-js-sdk'
import {submitTest} from '@/common/js/loginTest.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      	test:'扫描设备二维码',
      	showPass:false,
      	fromData:{
      		machineNum:'',   //设备编号
      		machineCode:'',    //设备码
      		agentNo:''    //代理商
      	},
      	passTest1:'',
      	passTest2:'',
      	passTest3:'',
      	isLoading:false,
      	showtest:true,
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//手动输入二维码
	handleScan2(){
		this.showtest=false
		this.showPass=true
	},
	//扫描二维码事件
  	handleScan(){
//		alert('点击了扫描二维码')
  		let _this=this
  		wx.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: function (res) {
				var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				_this.fromData.machineNum=result;
//				alert(result);
				_this.showtest=false
				_this.showPass=true
			}
		});
  	},
  	//保存提交
  	handleBtn2(){
  		let _this=this
  		if(!_this.fromData.machineCode){
  			this.passTest2='设备编号不能为空'
  		}else{
  			this.passTest2=''
  		}
  		if(!_this.fromData.machineNum){
  			this.passTest1='设备码不能为空'
  		}else{
  			this.passTest1=''
  		}
  		if(!_this.fromData.agentNo){
  			this.passTest3='代理商不能为空'
  		}else{
  			this.passTest3=''
  		}
		let passData=qs.stringify({
			machineNum:_this.fromData.machineCode,
			machineCode:_this.fromData.machineNum,
			agentNo:_this.fromData.agentNo
		})
		if(_this.fromData.machineCode&&_this.fromData.agentNo&&this.fromData.machineNum){
			axios({
				method: 'post',
			    url:'/api/MachineApi/RecordWhite',
				data:passData 
			}).then((res)=>{
				alert(res.data.msg)
			}).catch(err=>{
				submitTest(err,_this);
			})
		}
  	},
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  	let _this=this
	axios({
	  method: 'get',
	  url:'/api/SystemApi/GetWxJsapiConfig?url='+location.href.split('#')[0],
//	  data:fromData //向服务端提供授权url参数，并且不需要#后面的部分
	}).then((res)=>{
//	  alert(res)
	  wx.config({
	    debug: res.data.debug, // 开启调试模式,
	    appId: res.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
	    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
	    nonceStr: res.data.noncestr, // 必填，生成签名的随机串
	    signature: res.data.signature,// 必填，签名，见附录1
	    jsApiList:  res.data.jsApiList// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	  });
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
.span{
	border-radius: 10px;
}
body{
	background: #fff;
}
.getcell-main{
	font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
	.manage-li{
		background: #fff;
		padding-top: 20px;
		
		.cover{
			width: 90%;
			margin:0 auto;
			box-sizing: border-box;
			border-radius: 10px;
			padding: 41px 10px 30px 10px;
			border: 1px solid @BOX3;
			position: relative;
			.cover_title{
				padding: 5px 10px;
				font-size: 16px;
				font-weight: bold;
				position: absolute;
				z-index: 10;
				top: -15px;
				left: 50%;
				margin-left: -66px;
				background: #fff;
			}
		}
		/*padding: 10px;
		font-size: 14px;
		border-bottom:1px solid @BOX4;
		margin-top: 20px;
		border-top: 1px solid @BOX4;*/
		/*.title-div{
			display: flex;
			justify-content: space-between;
			.manageana-li-title{
				font-size: 16px;
				width: 20%;
			}
			.manageana-li-value{
				font-size: 16px;
				text-align: right;
				width: 60%;
				color: @FTC3;
				display: flex;
				justify-content: space-between;
				.manaeg-input{
					border: none;
					width: 100%;
				}
				.value-check{
					margin-right: 0px;
				}
				.qr-code{
					color: @BGblue;
					width: 80%;
					overflow:hidden;
				    text-overflow:ellipsis;
				    white-space:nowrap;
				    display: block;
				}
				.qr-icon{
					display: block;
					width: 20%;
				}
				.icon-saomiao{
					color: @BGblue;
				}
			}
			.manageana-li-value1{
				max-width: 70%;
				min-width: 30%;
				text-align: center;
				overflow:hidden;
			    text-overflow:ellipsis;
			    white-space:nowrap;
			    display: block;
			}
			.manageana-li-value2{
				width: 70px;
				.icon{
					line-height: 27px;
				}
			}
		}*/
	}
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