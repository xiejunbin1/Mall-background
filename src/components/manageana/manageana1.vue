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
				<div class="manageana-li-value" style="width: 70%;">
					<a href="http://sao315.com/w/api/saoyisao?redirect_uri=http%3a%2f%2fterminalmobile.dingyou168.xyz%2fmobile%2findex.html%23%2fmanageana" class="qr-code">{{test}}</a>
					<a href="http://sao315.com/w/api/saoyisao?redirect_uri=http%3a%2f%2fterminalmobile.dingyou168.xyz%2fmobile%2findex.html%23%2fmanageana" class="qr-icon">
						<i class="icon iconfont icon-saomiao"></i>
					</a>
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
		
		<router-link to="/selectaddress" class="manage-li manage-address " tag="div">
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
		</router-link>
		
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
		code_v1
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
				<van-button size="large" type="primary" class='manage-btn-div' @click='handleNext'>下一步</van-button>
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



export default {
  name: 'HelloWorld',
  data () {
    return {
      show:false,
      classifyCheck1:false,
      classifyCheck2:false,
      manageclassifyData:0,    //选择设备类型标记1
      manageName:'',
      manageAddress:'',
      test:'请扫描安卓板上方二维码'
      //WIFI%3AT%3AWPA%3BP%3Ady123456%3BS%3ADingYou-Guest%3B
    }
  },
  methods:{
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
  	//下一步按钮
  	handleNext(){
  		let testval=this.test
  		if(testval=='请扫描安卓板上方二维码'){
  			testval==''
  		}
  		alert(testval);
  		if(!this.manageName){
  			Toast.fail('机器名称不为空');
  		}else if(this.manageclassifyData==0){
  			Toast.fail('机器类型不为空');
  		}else{
  			
  		}
  	}
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){

  		let _this=this
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
		
		if (location.href.indexOf("qrresult=")>-1){
			alert(decodeURIComponent(location.href.split("qrresult=")[1])) //在您的程序中可对此数据进行处理
//			this.test=decodeURIComponent(location.href.split("qrresult=")[1])
			let manage_id=decodeURIComponent(location.href.split("qrresult=")[1])
			let fromData=qs.stringify({
				manage_id
			})
		  	console.log(fromData)
		  	axios({
				method:'post',
				url:url.url+'mobileAdmin/base_test.php',
				data:fromData,
				responseType:'json'
			}).then((res)=>{
				if(res.data.status=='Success'){
					_this.test=manage_id
					alert(res.data.msg)
				}else{
					alert(res.data.msg)
				}
			}).catch(err=>{
				alert('网络错误')
			})
  		}
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
  	 let address=localStorage.getItem('address_value')
  	 console.log(address)
  	 if(address){
  	 	this.manageAddress=address
  	 	setTimeout(()=>{
  	 		localStorage.removeItem('address_value');
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