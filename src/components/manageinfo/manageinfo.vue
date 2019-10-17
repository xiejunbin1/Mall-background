<template>
	<div class="main">
		<div class="manage-info">
			<div class="info-summary">
				<div class="summary-img">
					<img src="../../common/img/afaz.png" alt="口红机" v-show="manageinfo.machineType=='口红机'"/>
					<img src="../../common/img/asdz.png" alt="售货机" v-show="manageinfo.machineType!='口红机'"/>
				</div>
				<div class="summary-text">
					<div class="info-div info-status">
						<span v-show="manageinfo.status==0">
							<i class="icon iconfont icon-lixianmoshi"></i>
							<i class="color-danger">已离线</i>
						</span>
						<span v-show="manageinfo.status==1">
							<i class="icon iconfont icon-zaixianbaoming"></i>
							<i class="color-grey">在线中</i>
						</span>
					</div>
					<div class="info-div">机器编号：<i class="color-warning">{{manageinfo.machineNum}}</i></div>
					<div class="info-div">机器地址：<i class="color-warning">{{manageinfo.address}}</i></div>
				</div>
			</div>
		</div>
		<div class="manaeg-domain">
			<div class="domain-title">
				<div class="domain-title-div">全部功能</div>
			</div>
			<div class="domain-ul" v-show="allType">
				<router-link :to="{path:'goodslist',name:'goodslist',params:{manageid:manageinfo.id,typeid:manage_type}}" tag="div" class="domain-li" v-if="this.GLOT.machine_boxMger">
					<div class="domain-sum"><i class="icon iconfont icon-goodsmanagement"></i></div>
					<div class="domain-text">货道管理</div>
				</router-link>
				<router-link :to="{path:'nogoodslist',name:'nogoodslist',params:{manageid:manageinfo.id,machineNum:manageinfo.machineNum}}" tag="div" class="domain-li" v-show='isType' v-if="machine_boxOnOff">
					<div class="domain-sum"><i class="icon iconfont icon-icon-jichushezhi"></i></div>
					<div class="domain-text">开关货道</div>
				</router-link>
				
				<!-- <div class="domain-li" @click="handleTofit">
					<div class="domain-sum"><i class="icon iconfont icon-dingdan"></i></div>
					<div class="domain-text">机器订单</div>
				</div> -->
				<div class="domain-li" @click="handleScore" v-show="isType1" v-if="machine_upScore">
					<div class="domain-sum"><i class="icon iconfont icon-ziyuan"></i></div>
					<div class="domain-text">远程上分</div>
				</div>
				
				<div class="domain-li" @click="handleAnnex" v-if="this.GLOT.machine_fill">
					<div class="domain-sum"><i class="icon iconfont icon-buhuo"></i></div>
					<div class="domain-text">一键补货</div>
				</div>
				<router-link :to="{path:'managerevise',name:'managerevise',params:{manageid:manageinfo.id}}" tag="div" class="domain-li" v-if="this.GLOT.machine_set">
					<div class="domain-sum"><i class="icon iconfont icon-xiugai"></i></div>
					<div class="domain-text">设备修改</div>
				</router-link>
				<router-link :to="{path:'manageparam',name:'manageparam',params:{mid:manageinfo.machineNum}}" tag="div" class="domain-li" v-show='manage_type==1' v-if="machine_argsKH">
					<div class="domain-sum"><i class="icon iconfont icon-shezhi"></i></div>
					<div class="domain-text">设备参数</div>
				</router-link>
				<div class="domain-li" @click="handleLog" v-show="isType1" v-if="machine_log">
					<div class="domain-sum"><i class="icon iconfont icon-jibenxinxi"></i></div>
					<div class="domain-text">日志上传</div>
				</div>
				<div class="domain-li" @click="handleCode" v-show='isType' v-if="machine_qrCode">
					<div class="domain-sum"><i class="icon iconfont icon-erweima1"></i></div>
					<div class="domain-text">商城二维码</div>
				</div>
				<div class="domain-li" @click="handleTie" v-if="this.GLOT.machine_unbing">
					<div class="domain-sum"><i class="icon iconfont icon-xiugaimima2"></i></div>
					<div class="domain-text">设备解绑</div>
				</div>
				
				<router-link :to="{path:'parameterSet',name:'parameterSet',params:{manageid:manageinfo.id,typeid:manage_type},query:{mid:manageinfo.machineNum}}" tag="div" class="domain-li" v-if="this.GLOT.machine_args">
					<div class="domain-sum"><i class="icon iconfont icon-shezhi" aria-hidden="true"></i> </div>
					<div class="domain-text">参数设置</div>
				</router-link>
				<router-link :to="{path:'goodsStock',name:'goodsStock',params:{manageid:manageinfo.id,typeid:manage_type}}" tag="div" class="domain-li" v-if="this.GLOT.machine_stockout">
					<div class="domain-sum"><i class="icon iconfont icon-quehuoshangbao"></i></div>
					<div class="domain-text">缺货</div>
				</router-link>
			</div>
		</div>
		
		<van-dialog
		  v-model="isScore"
		  show-cancel-button
		  :before-close="beforeClose2"
		>
		 	<div class="log_title">远程上分</div> 
		 	<div class="log_time1" >
		 		<van-stepper v-model="score_value" integer :min="0" :max="100000"/>
		 	</div>
		</van-dialog>
		
		<van-popup v-model="iscode">
			<div class="cargo" >
				<img :src="errImg" alt="" />
			</div>
		</van-popup>
		<van-dialog
		  v-model="isLog"
		  show-cancel-button
		  :before-close="beforeClose1"
		>
		 	<div class="log_title">上传日志</div> 
		 	<div class="log_time" @click="handleTime">
		 		<span>日期选择</span>
		 		<span class="time_value">{{timeData}}</span>
		 		<i class="icon iconfont icon-icon11"></i>
		 	</div>
		</van-dialog>
		<van-popup v-model="istime" position="bottom" :overlay="true">
		  	<van-datetime-picker
			  v-model="currentDate1"
			  type="date"
			  @confirm='onConfirm1'
			  :max-date="maxDate2"
			/>
		</van-popup>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import { Dialog } from 'vant';
import Footer from '../index/index'
import {zhujian} from '@/common/js/common.js'
export default {
  name: 'manageinfo',
  data () {
    return {
	  score_value:0,
      isScore:false,
      timeData:new Date().toLocaleDateString(),
      istime:false,
      currentDate1: new Date(),
      maxDate2: new Date(),
      code_url:'',
      iscode:false,
      more:'查看更多',
      moreStatus:false,
      manage_name:'',
      manage_address:'',
      manage_class:'',
      manageinfo:{},
      show:false,
      manage_id:'',
      machineNum:'',
	  manage_type:-1,
	  machine_argsKH:'',
	  isType:true,
	  machine_boxOnOff:'',
	  machine_upScore:'',
	  machine_qrCode:'',
	  isLog:false,
	  allType:false,
	  isType1:false,
	  machine_log:'',
	  errImg:'',
    }
  },
  methods:{
  	//远程上分开关
  	handleScore(){
  		this.score_value=0;
  		this.isScore=!this.isScore
  	},
  	//确认远程上分
  	beforeClose2(action, done){
  	  let _this=this		
  	  if (action === 'confirm') {
        setTimeout(()=>{
        	axios({
				method:'get',
				url:url.adminurl+'/api/MachineApi/RemotePoint?machineNum='+this.machineNum+'&points='+this.score_value,
			}).then((res)=>{
				alert(res.data.msg)
			}).catch(err=>{
				submitTest(err,_this);
			})
        	done();
        }, 300);
      } else {
        done();
      }
  	},
  	//返回
  	onClickLeft(){
  		this.$router.go(-1);
  	},
  	//确认上传日志
  	beforeClose1(action, done){
  	  let _this=this	
  	  if (action === 'confirm') {
        setTimeout(()=>{
        	axios({
				method:'get',
				url:url.adminurl+'/api/MachineApi/SubmitLog?machineNum='+this.machineNum+'&time='+this.timeData,
			}).then((res)=>{
				alert(res.data.msg)
			}).catch(err=>{
				submitTest(err,_this);
			})
        	done();
        }, 300);
      } else {
        done();
      }
  	},
  	//开启时间选择下拉框
  	handleTime(){
  		this.istime=!this.istime
  	},
  	//时间选择确认
  	onConfirm1(value){
  		this.istime=!this.istime;
   		this.timeData=value.toLocaleDateString()
  	},
  	//商城二维码
  	handleCode(){
  		this.iscode=!this.iscode
  	},
  	//日志上传
  	handleLog(){
  		this.isLog=!this.isLog
  	},
  	//设备解绑
  	handleTie(){
  		Dialog.confirm({
		  title: '确认解绑',
		  message: '此操作将解绑该设备，请确认'
		}).then(() => {
		 	// on confirm
		 	let _this=this;
		 	var arr=[];
		 	arr.push(_this.manageinfo.machineNum)
		  	axios({
				method:'post',
				url:url.adminurl+'/api/MachineApi/RemoveBinged',
				data:arr,
				responseType:'json'
			}).then((res)=>{
				alert(res.data.msg)
				if(res.data.status=='Success'){
					this.$router.push({name: 'managedev'});
				}else if(res.data.status=='Fail'){
					
				}
			})
		}).catch(() => {
		  // on cancel
		});
  	},
  	//一键补货
  	handleAnnex(){
  		Dialog.confirm({
		  title: '确认补货',
		  message: '此操作将该设备上所有货道库存补充至满，请确认'
		}).then(() => {
		 	// on confirm
		 	let _this=this;
		  	axios({
				method:'get',
				url:url.adminurl+'/api/MachineBoxApi/FillFull?machineNum='+this.machineNum,
			}).then((res)=>{
				alert(res.data.msg)
			}).catch((err)=>{
				submitTest(err,_this);
			})
		}).catch(() => {
		  // on cancel
		});
  	},
  	//跳转订单页
  	// handleTofit(){
  	// 	this.$router.push({name: 'profitdel',params:{ manageid:this.manageinfo.machineNum,str:new Date().toLocaleDateString(),end:new Date().toLocaleDateString()}});
  	// },
  	//点击更多事件
  	hanldeMore(){
  		if(this.moreStatus){
  			this.more='查看更多'
  		}else{
  			this.more='收起'
  		}
  		this.moreStatus=!this.moreStatus;
  	},
  	setManage(){
  		this.show=true;
  	},
  	beforeClose(action, done) {
  	  
      if (action === 'confirm') {
        setTimeout(()=>{
        	done();
        	let fromData=qs.stringify({
					manage_name:this.manage_name,
					manage_address:this.manage_address,
					manage_id:this.$route.params.mid
				})
        	axios({
				method:'post',
				url:url.url+'mobileAdmin/manage_revise.php',
				data:fromData,
				responseType:'json'
			}).then((res)=>{
				if(res.data.status=='success'){
					this.manageinfo=res.data.data[0];
					this.manage_name=res.data.data[0].manage_name;
					this.manage_address=res.data.data[0].manage_address;
				}else if(res.data.status=='fail'){
				}
			}).catch(err=>{
			})
        }, 1000);
      } else {
        done();
      }
    }
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	zhujian()
	
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
  	let _this=this;
  	_this.manage_id=this.$route.params.mid;
	_this.manage_type=this.$route.params.type;
	_this.machine_argsKH = this.GLOT.machine_argsKH
  	//设备类型码 1为口红机、2为福袋机
	//页面初始化获取商品信息详情
	const promise = new Promise((resolve,reject)=>{
		axios({
			method:'get',
			url:url.adminurl+'/api/MachineApi/Detail?id='+this.$route.params.mid,
			responseType:'json'
		}).then((res)=>{
			this.manageinfo=res.data;
			this.machineNum=res.data.machineNum
			this.allType=true
			this.errImg=url.adminurl+'/api/MachineApi/QRCode?machineNum='+_this.manageinfo.machineNum
			let id = res.data.machineTypeId
			resolve(id)
		}).catch(err=>{
			submitTest(err,_this);
		})
	})
  	
	promise.then((err)=>{
		if(err==3||err==5||err==6){
			this.isType=true
			this.isType1=false
			this.machine_boxOnOff = this.GLOT.machine_boxOnOff
			this.machine_qrCode = this.GLOT.machine_qrCode
		}
		if(err==7){
			this.isType1=true
			this.machine_upScore = true
			this.GLOT.machine_unbing = true
			this.GLOT.machine_args = true
			this.GLOT.machine_set = true
			this.GLOT.machine_boxMger = false
			this.machine_boxOnOff  = false
			this.GLOT.machine_fill = false
			this.machine_argsKH = false
			this.machine_log = false
			this.machine_qrCode = true
			this.GLOT.machine_stockout = false
		}
		if(err !==7 && err !==3 && err !==5&& err !==6){
			console.log("111111")
			this.isType=false
			this.isType1=true
			this.machine_log = this.GLOT.machine_log
			this.machine_upScore = this.GLOT.machine_upScore
		}
	})
  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	box-sizing: border-box;
	float: left;
}
.main{
	background:#FAF8FA;
	.log_title{
		padding: 5px 0;
		text-align: center;
		border-bottom: 1px solid @BOX3;
	}
	.log_time{
		padding: 15px 10px;
		display: flex;
		justify-content: space-between;
		.time_value{
			font-size: 16px;
			line-height: 21px;
			color: @BGblue;
		}
	}
	.log_time1{
		padding: 10px 0;
		display: flex;
		justify-content: center;
	}
	.cargo{
		min-width: 250px;
		max-width: 100%;
		padding: 10px;
		box-sizing: border-box;	
		img{
			width: 100%;
		}
	}
	.manaeg-domain{
		background: #fff;
		width: 100%;
		padding: 8px 0;
		box-sizing: border-box;
		margin-top: 15px;
		color: @FTC2;
		box-shadow: @BOXcurrency;
		.domain-title{
			width: 100%;
			border-bottom:1px solid @BOX4;
			padding-bottom: 3px;
			.domain-title-div{
				width: 96%;
				margin: 0 auto;
				font-size: 16px;
				color: @BGsuccess;
				text-align: center;
			}
		}
		.domain-ul{
			width: 100%;
			margin: 0 auto;
			display: flex;
			flex-wrap:wrap;
			.domain-li{
				width: 25%;
				height: 54px;
				padding: 13px 0;
				text-align: center;
				float: left;
				.domain-text{
					font-size: 15px;
				}
				.domain-sum{
					font-size: 18px;
					padding-top: 5px;
					padding-bottom: 1px;
					.icon{
						font-size: 27px;
					}
					.icon-goodsmanagement{
						color: @BGblue;
					}
					.icon-xiugaimima2{
						color: @BGwarning;
						font-size: 28px;
					}
					.icon-icon-jichushezhi{
						color: @BGsuccess;
					}
					.icon-dingdan{
						color: @BGdanger;
					}
					.icon-jibenxinxi{
						color: @BGwarning;
					}
					.icon-diandeng-off{
						color: @BGsuccess;
						font-size: 29px;
					}
					.icon-xiugai{
						color: @BGblue;
					}
					.icon-shezhi{
						color: @BGsuccess;
					}
					.icon-erweima1{
						color: @BGblue;
					}
					.icon-guanggao1{
						color: @BGlu1;
					}
					.icon-wenjian{
						color: @BGdanger;
					}
					.icon-buhuo{
						color: @BGlu1;
					}
					.icon-ziyuan{
						color: @BGblue;
					}
					.icon-shezhi{
						color: @BGblue
					}
					.icon-quehuoshangbao{
						color: @BGlu1
					}
				}
			}
		}
	}
	.manaeg-census{
		background: #fff;
		width: 100%;
		padding: 8px 0;
		box-sizing: border-box;
		margin-top: 15px;
		color: @FTC2;
		box-shadow: @BOXcurrency;
		.census-ul{
			width: 92%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.cencus-li{
				width: 32%;
				height: 100%;
				text-align: center;
				.cencus-sum{
					font-size: 17px;
				}
				.cencus-text{
					font-size: 15px;
				}
			}
		}
	}
	.manage-info{
		background: #fff;
		width:100%;
		margin-top:10px;
		box-shadow: @BOXcurrency;
		.info-summary{
			width:100%;
			height: 96px;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			padding:8px;
			color: @FTC2;
			border-bottom:1px solid @BOX4;
			.summary-img{
				width:23%;
				overflow: hidden;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.summary-text{
				width:75%;
				font-size: 15px;
				display: flex;
			    flex-direction: column;
			    justify-content: space-between;
				.info-div{
					
				}
				.info-status{
					.icon-lixianmoshi{
						font-size: 20px;
						color: @BGdanger;
					}
					.icon-zaixianbaoming{
						font-size: 20px;
						color: @BGsuccess;
					}
				}
			}
		}
		.info-more{
			.more-title{
				text-align: center;
				padding: 8px 0;
				font-size: 16px;
				color: @BGblue;
			}
			.more-list{
				transition: all 0.5s linear 0s;
				.more-li{
					padding: 8px 0;
					width: 100%;
					box-sizing: border-box;
					border-bottom:1px solid @BOX4;
					color: @FTC2;
					font-size:15px;
					.li-div{
						width: 96%;
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
						.li-value{
							color: @FTC3;
						}
					}
				}
			}
		}
	}
}
.color-grey{
	color: @BGsuccess;
}
.color-warning{
	color: @BGwarning;
}
.color-danger{
	color: @BGdanger;
}
</style>