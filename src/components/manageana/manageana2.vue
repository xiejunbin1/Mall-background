<template>
	<div class="manageana-main">
		<van-nav-bar
		  title="设备注册"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>
		<div class="announcement">
			欢迎使用  后台管理系统
		</div>
		<div class="ana-placeholder">
			<div class="title-div">请填写下方资料完成机器注册</div>
		</div>
		
		<div class="manage-li manage-encode ">
			<div class="title-div">
				<div class="manageana-li-title">出厂编码</div>
				<div class="manageana-li-value" style="width: 70%;" @click="handleScan">
					<span  class="qr-code">{{test}}</span>
					<span  class="qr-icon">
						<i class="icon iconfont icon-saomiao"></i>
					</span>
				</div>
			</div>	
		</div>
		
		<div class="manage-li manage-name ">
			<div class="title-div">
				<div class="manageana-li-title">机器名称</div>
				<div class="manageana-li-value">
					<input type="text" placeholder="请输入设备名称" v-model="manageName" class="manaeg-input"/>
				</div>
			</div>	
		</div>
		
		<div class="manage-li manage-address " @click='handletoadd'>
			<div class="title-div">
				<div class="manageana-li-title">机器地址</div>
				<div class="manageana-li-value manageana-li-value1">
					{{manageAddress}}
				</div>
				<div class="manageana-li-value manageana-li-value2">
					<span class="value-check">请选择</span>
					<i class="icon iconfont icon-icon11"></i>
				</div>
			</div>	
		</div>
		
		<div class="manage-li manage-classify" @click='manageclassify'>
			<div class="title-div">
				<div class="manageana-li-title">机器类型</div>
				<div class="manageana-li-value manageana-li-value1">
					{{manageclassifyData==1?'售货机':(manageclassifyData==2?'口红机':'')}}
				</div>
				<div class="manageana-li-value manageana-li-value2">
					<span class="value-check">请选择</span>
					<i class="icon iconfont icon-icon11"></i>
				</div>
			</div>
		</div>
		<!--<router-link to='/setcell' tag='div' class="manage-li manage-road">
			<div class="title-div">
				<div class="manageana-li-title">机器货道</div>
				<div class="manageana-li-value">
					<span class="value-check">请选择</span>
					<i class="icon iconfont icon-icon11"></i>
				</div>
			</div>
		</router-link>
		
		<router-link to='/getcell' tag='div' class="manage-li manage-demo">
			<div class="title-div">
				<div class="manageana-li-title">货道映射</div>
				<div class="manageana-li-value">
					<span class="value-check">可预览</span>
					<i class="icon iconfont icon-icon11"></i>
				</div>
			</div>
		</router-link>-->
		
		<div class="manage-btn">
			<div class="title-div">
				<van-button size="large" type="primary" class='manage-btn-div' @click='handleNext'>保存提交</van-button>
			</div>
		</div>
		
		<van-dialog
		  v-model="show"
		  show-confirm-button
		  close-on-click-overlay
		  :before-close="beforeClose"
		>
		  <div class="manageclassify">
		  	<div class="classify-div" >
		  		<span>自动售货机</span>
		  		<span @click='classifyDialog1'><van-checkbox v-model="classifyCheck1" ></van-checkbox></span>
		  	</div>
		  	<div class="classify-div classify-div2" >
		  		<span>游戏口红机</span>
		  		<span @click='classifyDialog2'><van-checkbox v-model="classifyCheck2"></van-checkbox></span>
		  	</div>
		  </div>
		</van-dialog>
		
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import {Toast} from 'vant'
import url from '@/urlRouter.js'
import wx from 'weixin-js-sdk'
import {submitTest} from '@/common/js/loginTest.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      show:false,
      classifyCheck1:false,
      classifyCheck2:false,
      manageclassifyData:0,    //选择设备类型标记1
      manageName:'',
      address_id:'',
      manageAddress:'',
      test:'请扫描安卓板上方二维码'
      //WIFI%3AT%3AWPA%3BP%3Ady123456%3BS%3ADingYou-Guest%3B
    }
  },
  methods:{
  	//扫描二维码事件
  	handleScan(){
  		alert('点击了扫描二维码')
  		let _this=this
  		wx.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success: function (res) {
				var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
//				alert(result);
				axios({
					method: 'get',
				    url:'/api/MachineApi/isBinged?machineNum='+result,
				}).then((res)=>{
//					alert(res.data)
					if(!res.data){
	      				alert('该设备可以绑定')
	      				_this.test=result;
					}else{
						alert('该设备已经绑定，请先去个人设置中解绑')
					}
				}).catch(err=>{
					alert('网络故障，请检查')
				})
			}
		});
  	},
  	//地址选择事件
  	handletoadd(){
  		let _this=this
  		if(_this.test!='请扫描安卓板上方二维码')
  			localStorage.setItem('manage_test',_this.test)
  		if(_this.manageName)
  			localStorage.setItem('manage_name',_this.manageName)
  		if(_this.manageclassifyData!=0)
  			localStorage.setItem('manage_classifyData',_this.manageclassifyData)
  		_this.$router.push({name:'selectaddress'})
  	},
  	//机器类型对话框2
  	classifyDialog2(){
  		this.manageclassifyData=2;
  		this.classifyCheck1=false;
  	},
  	//机器类型对话框1
  	classifyDialog1(){
  		this.manageclassifyData=1;
  		this.classifyCheck2=false;
  	},
  	//返回上一页
  	onClickLeft(){
  		this.$router.go(-1);
  	},
  	manageclassify(){
  		this.show=!this.show;
  	},
  	beforeClose(action, done){
  	  if (action === 'confirm') {
        setTimeout(done, 500);
      } else {
        done();
      }
  	},
  	//确认提交按钮
  	handleNext(){
  		let testval=this.test
  		let _this=this
  		if(testval=='请扫描安卓板上方二维码'){
  			testval==''
  			Toast.fail('出厂编码不能为空');
  		}else if(!this.manageName){
  			Toast.fail('机器名称不为空');
  		}else if(this.manageclassifyData==0){
  			Toast.fail('机器类型不为空');
  		}else if(!this.manageAddress){
  			Toast.fail('机器地址不为空');
  		}
  		if(testval!='请扫描安卓板上方二维码'&&this.manageName&&this.manageclassifyData!=0&&this.address_id){
  			let fromData=qs.stringify({
				addressId:_this.address_id,
				remark:_this.manageName,
				machineTypeId:_this.manageclassifyData,
				machineNum:testval
			})	
			console.log(fromData)
	    	axios({
				method: 'post',
			    url:'/api/MachineApi/SignIn',
			    data:fromData
			}).then(res=>{
				console.log(res.data.status)
				if(res.data.status=='Success'){
					alert(res.data.msg)
					this.$router.go(-1);
				}else{
					alert(res.data.msg)
				}
			}).catch(err=>{
				submitTest(err,_this);
			})
  		}
  	}
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
		  console.log(res)
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
  		
  		
  		
//		if (location.href.indexOf("qrresult=")>-1){
//			alert(decodeURIComponent(location.href.split("qrresult=")[1])) //在您的程序中可对此数据进行处理
//			this.test=decodeURIComponent(location.href.split("qrresult=")[1])
//			let fromData=qs.stringify({
//				manage_id:location.href.split("qrresult=")[1],
//			})
//		  	console.log(fromData)
//		  	axios({
//				method:'post',
//				url:url.url+'mobileAdmin/base_test.php',
//				data:fromData,
//				responseType:'json'
//			}).then((res)=>{
//				if(res.data.status=='Success'){
//					_this.test=decodeURIComponent(location.href.split("qrresult=")[1])
//				}else{
//					alert('该设备已绑定，请先解绑')
//				}
//			}).catch(err=>{
//				console.log('网络错误')
//			})
//		}
		
//		if (location.href.indexOf("qrresult=")>-1){
//			alert(decodeURIComponent(location.href.split("qrresult=")[1])) //在您的程序中可对此数据进行处理
////			this.test=decodeURIComponent(location.href.split("qrresult=")[1])
//			let manage_id=decodeURIComponent(location.href.split("qrresult=")[1])
//			let fromData=qs.stringify({
//				manage_id
//			})
//		  	console.log(fromData)
//		  	axios({
//				method:'post',
//				url:url.url+'mobileAdmin/base_test.php',
//				data:fromData,
//				responseType:'json'
//			}).then((res)=>{
//				if(res.data.status=='Success'){
//					_this.test=manage_id
//					alert(res.data.msg)
//				}else{
//					alert(res.data.msg)
//				}
//			}).catch(err=>{
//				alert('网络错误')
//			})
//		}
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
  	 let address=localStorage.getItem('address_value')
  	 let manage_test=localStorage.getItem('manage_test')
  	 let manage_name=localStorage.getItem('manage_name')
  	 let manage_classifyData=localStorage.getItem('manage_classifyData')
  	 let address_ids=localStorage.getItem('address_id')
  	 if(address){
  	 	this.manageAddress=address
  	 	setTimeout(()=>{
  	 		localStorage.removeItem('address_value');
  	 	},100)
  	 }
  	 if(manage_test){
  	 	this.test=manage_test
  	 	setTimeout(()=>{
  	 		localStorage.removeItem('manage_test');
  	 	},100)
  	 }
  	 if(manage_name){
  	 	this.manageName=manage_name
  	 	setTimeout(()=>{
  	 		localStorage.removeItem('manage_name');
  	 	},100)
  	 }
  	 if(manage_classifyData){
  	 	this.manageclassifyData=manage_classifyData
  	 	setTimeout(()=>{
  	 		localStorage.removeItem('manage_classifyData');
  	 	},100)
  	 }
  	 if(address_ids){
  	 	this.address_id=address_ids
  	 	setTimeout(()=>{
  	 		localStorage.removeItem('address_id');
  	 	},100)
  	 }
  },
  watch:{
  	test:function(val){
  		if(!val){
  			this.istest=false
  		}else{
  			this.istest=true
  		}
  	}
  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	text-align: center;
}
.manageana-main{
	background: @BGGrey;
	padding-bottom: 51px;
	.announcement{
		text-align: center;
		padding: 12px 0;
		font-size: 20px;
		color: #fff;
		background: @BGblue;
		
	}
	.manage-li{
		background: #fff;
		padding: 10px;
		font-size: 14px;
		box-shadow: @BOXcurrency;
		.title-div{
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
					/*margin-right: 30px;*/
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
		}
	}
	.manage-btn{
		background: #fff;
		margin-top: 30px;
		.manage-btn-div{
			background: @BGblue;
		}
	}
	.manage-road{
		margin-top: 5px;
	}
	.manage-demo{
		margin-top: 5px;
	}
	.manage-classify{
		margin-top: 15px;
	}
	.manage-name{
		margin-top: 10px;
	}
	.manage-address{
		margin-top: 15px;
	}
	.ana-placeholder{
		padding: 10px;
		font-size: 14px;
		color: @FTC3;
		background: @BGGrey;
		font-size: 14px;
	}
	.title-div{
		width: 97%;
		margin: 0 auto;
	}
	.manageclassify{
		padding: 20px 10px;
		.classify-div{
			display: flex;
			justify-content: space-between;
		}
		.classify-div2{
			margin-top: 15px;
		}
	}
}

</style>