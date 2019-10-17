<template>
	<div class="getcell-main">
		<van-notice-bar mode="closeable">
		  	该设置将影响货道布局，请谨慎进行操作
		</van-notice-bar>
		<div class="all_play">
			<van-button size="small" plain type="primary" @click='handlelreload' style='margin-right: 10px;' >刷新货道状态</van-button>
			<van-button size="small" type="primary" @click='handleBaseAll' style='margin-right: 10px;' >本层货道电机检测</van-button>
		</div>
		<div class="body">
			<van-badge-group :active-key="activeKey" >
			  	<van-badge v-for='(item,index) in tabData' :title="'第' + item.name +'层'" @click="onChange" :key='index'></van-badge>
			</van-badge-group>
			<div class="road_list">
				<div class="road_li" v-for="(item,index) in 10" :key="index">
					<div class="li_img">
						<img src="https://dingyou-mini-app.oss-cn-shenzhen.aliyuncs.com/Terminal/test/131891684240090000.JPG" alt="" />
					</div>
					<div class="li_info">
						<div class="info_top" >
							<span class="box_num"><span v-show="(activeKey+1)*100+index+1<1000">0</span>{{(activeKey+1)*100+index+1}}</span>
							<span v-for="(item,of) in arr" style="font-size: 12px; color: #67C23A;" v-show="((activeKey+1)*100+index+1)==arr[of].boxNum" :key="of">
								<span v-show="arr[of].status==0" style="font-size: 12px; color: #E6A23C; "><i class="icon iconfont icon-blue-dot"></i>已关闭</span>
								<span v-show="arr[of].status==1" style="font-size: 12px; color: #67C23A; "><i class="icon iconfont icon-blue-dot"></i>已开启</span>
								<van-switch
								  style='position: absolute;right: -2px;bottom: -28px;'
								  v-model="arr[of].status"
								  size="24px"
								  @input="onInput(arr[of].status,(activeKey+1)*100+index+1)"
								/>
							</span>
						</div>
						<div class="info_btn">
							<div class="info_status" v-for="(item,of) in arr" v-show="((activeKey+1)*100+index+1)==arr[of].boxNum && arr[of].status"  :key='of'>
								<span class="success" v-if="arr[of].isbad">
									正常
								</span>
								<span class="error" v-if="!arr[of].isbad">
									故障
								</span>
							</div>
							<van-button size="small"  plain type="warning" @click='handleBase((activeKey+1)*100+index+1)' :data-index='index' style='margin-right: 10px;' >电机检测</van-button>
							<!--<van-button size="small"  plain type="warning" @click='handleshow((activeKey+1)*100+index+1,index)' :data-index='index'>编辑</van-button>-->
							<div style="width: 42px;height: 28px;background: transparent;"></div>
							<!--<van-switch
							  v-model="checked"
							  size="24px"
							/>-->
						</div>
					</div>
				</div>
				<van-loading type="spinner" v-show="loading" />
			</div>
		</div>
		
		<!-- 编辑货道设置下拉块 -->
		<van-popup v-model="showspeed" position="bottom" :overlay="true">
		  	<div class="popup-div">
		  		<div class="popup-title">
		  			<div class="popup-title-div">
		  				<span class="title-s1" @click="handlepopupno">取消</span>
		  				<span class="title-s2">货道设置</span>
		  				<span class="title-s3" @click="handlepopupok">保存</span>
		  			</div>
		  		</div>
		  		
		  		<div class="popup-li">
			  		<div class="popup-li-div">
			  			<span class="li-name">货道开关</span>
			  			<span class="li-value">
			  				<span style="position: relative;top: -8px;">{{checked==false?'关闭':'开启'}}</span>
			  				<van-switch
							  v-model="checked"
							  size="24px"
							/>
			  			</span>
			  		</div>
			  	</div>
		  	</div>
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
import { Toast } from 'vant';
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
    	arr:[],
      	activeKey: 0,
      	tabData:[{
	    	name:'一',
	    	value:10
	    },{
	    	name:'二',
	    	value:20
	    },{
	    	name:'三',
	    	value:30
	    },{
	    	name:'四',
	    	value:40
	    },{
	    	name:'五',
	    	value:50
	    },{
	    	name:'六',
	    	value:60
	    },{
	    	name:'七',
	    	value:7
	    },{
	    	name:'八',
	    	value:80
	    },{
	    	name:'九',
	    	value:90
	    },{
	    	name:'十',
	    	value:100
	    },],
	    showspeed:false,
	    checked:false,
		boxNums:0,
		listIndex: 1,
		loading:false
    }
  },
  methods:{
  	//刷新页面
  	handlelreload(){
		this.loading=true
		setTimeout(() => {
			this.getNoGoodsList()
			this.loading=false
		}, 1500);
  	},
  	//侧边栏事件
  	onChange(key) {
      	this.activeKey = key;
      	let _this=this
      	this.listIndex=key+1;
		axios({
			method: 'get',
		    url:url.adminurl+'/api/MachineBoxApi/ListStatus?machineId='+this.$route.params.manageid+'&row='+this.listIndex,
		}).then((res)=>{
			for(var i=0;i<res.data.length;i++){
				if(res.data[i].status==0){
					res.data[i].status=false
				}else{
					res.data[i].status=true
				}
			}
			this.arr=res.data;
		}).catch(err=>{
			submitTest(err,_this);
		})
    },
    //开关事件
    onInput(val,num){
    	let _this=this
    	let arr=[]
		if(num<1000){
			num='0'+num
		}
		arr.push(num)
    	axios({
			method: 'post',
			data:{
				boxNums:arr,
				status:val,
				machineId:parseInt(this.$route.params.manageid)
			},
		    url:url.adminurl+'/api/MachineBoxApi/EditStatus',
		}).then((res)=>{
			Toast(res.data.msg);
			if(res.data.status=='Success'){
				this.listIndex=this.activeKey+1
				axios({
					method: 'get',
				    url:url.adminurl+'/api/MachineBoxApi/ListStatus?machineId='+this.$route.params.manageid+'&row='+this.listIndex,
				}).then((res)=>{
					for(var i=0;i<res.data.length;i++){
						if(res.data[i].status==0){
							res.data[i].status=false
						}else{
							res.data[i].status=true
						}
					}
					this.arr=res.data;
				}).catch(err=>{
					submitTest(err,_this);
				})
			}
		}).catch(err=>{
			submitTest(err,_this);
		})
    },
	//编辑事件
	handleshow(num,n){
		this.showspeed=!this.showspeed
		let is_on=false;
		for(var i=0;i<this.arr.length;i++){
			if(this.arr[i].boxNum==num){
				if(this.arr[i].status==1){
					is_on=true
				}
				break;
			}
		}
		this.checked=is_on
		this.boxNums=num
	},
	//本层电机检测
	handleBaseAll(){
		let arr=[]
		for(var i=this.arr.length-1;i>=0;i--){
			if(this.arr[i].status==1){
				arr.push(this.arr[i].boxNum)
			}
		}
		let _this=this;
		axios({
			method: 'post',
			data:{
				boxNums:arr,
				machineNum:this.$route.params.machineNum,
			},
		    url:url.adminurl+'/api/MachineBoxApi/PowerTest',
		}).then((res)=>{
			Toast('请求已发送');
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
	//电机检测
	handleBase(val){
		if(val<1000){
			val='0'+val
		}
		let arr=[]
		arr.push(val)
		let _this=this;
		axios({
			method: 'post',
			data:{
				boxNums:arr,
				machineNum:this.$route.params.machineNum,
			},
		    url:url.adminurl+'/api/MachineBoxApi/PowerTest',
		}).then((res)=>{
			Toast('请求已发送');
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
	//编辑取消
	handlepopupno(){
		this.showspeed=false
	},
	//编辑确定
	handlepopupok(){
		this.showspeed=false
		let _this=this
		let arr=[]
		if(this.boxNums<1000){
			this.boxNums='0'+this.boxNums
		}
		arr.push(this.boxNums)
		let status
		if(this.checked){
			status=1
		}else{
			status=0
		}
		axios({
			method: 'post',
			data:{
				boxNums:arr,
				status:status,
				machineId:parseInt(this.$route.params.manageid)
			},
		    url:url.adminurl+'/api/MachineBoxApi/EditStatus',
		}).then((res)=>{
			alert(res.data.msg)
			if(res.data.status=='Success'){
				this.listIndex=this.activeKey+1
				axios({
					method: 'get',
				    url:url.adminurl+'/api/MachineBoxApi/ListStatus?machineId='+this.$route.params.manageid+'&row='+this.listIndex,
				}).then((res)=>{
					for(var i=0;i<res.data.length;i++){
						if(res.data[i].status==0){
							res.data[i].status=false
						}else{
							res.data[i].status=true
						}
					}
					this.arr=res.data;
				}).catch(err=>{
					submitTest(err,_this);
				})
			}
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
	getNoGoodsList(){
		let _this=this
		axios({
			method: 'get',
		    url:url.adminurl+'/api/MachineBoxApi/ListStatus?machineId='+this.$route.params.manageid+'&row='+this.listIndex,
		}).then((res)=>{
			for(var i=0;i<res.data.length;i++){
				if(res.data[i].status==0){
					res.data[i].status=false
				}else{
					res.data[i].status=true
				}
			}
			this.arr=res.data;
		}).catch(err=>{
			submitTest(err,_this);
		})
	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  		this.getNoGoodsList();
  },
  //计算属性
  computed:{
  	
  },
  //挂载完成
  mounted(){
  	
  }
}
</script>

<style lang="less">
@import '../../style/main.less';
.getcell-main{
	.van-badge--select{
		background: #f44 !important;
		color: #fff;
	}
	.van-badge{
		background: #808080;
		color: #fff;
	}
	.all_play{
		width: 100%;
		box-sizing: border-box;
		padding: 5px 10px 5px 10px;
		display: flex;
		justify-content: flex-end;
		background: #fff;
	}
	.body{
		display: flex;
		justify-content: space-between;
		background: #fff;
		margin-bottom: 51px;
		.road_list{
			width: 100%;
			border-top: 1px solid #eee;
			/*width: calc(100%-85px);*/
			.van-loading{
					position: fixed;
					top: 50%;
    				left: 50%;
			}
			.road_li{
				background: #fff;
				box-sizing: border-box;
				padding: 10px 5px;
				border-bottom: 1px solid @BOX4;
				display: flex;
				justify-content: space-between;
				.li_img{
					width: 58px;
					height: 58px;
					border-radius: 5px;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.li_info{
					width: calc(100% - 58px);
					height: 58px;
					box-sizing: border-box;
					padding: 8px 10px;
					.info_top{
						position: relative;
						display: flex;
						justify-content: space-between;
						box-sizing: border-box;
						padding-bottom: 5px;
						.box_num{
							font-size: 14px;
							color: @FTC2;
						}
					}
					.info_btn{
						display: flex;
						justify-content: flex-end;
						.info_status{
							height: 30px;
							line-height: 30px;
							padding: 0 10px;
							.success{
								color: @BGsuccess;
								font-size: 14px;
							}
							.error{
								color: @BGdanger;
								font-size: 14px;
							}
						}
					}
				}
			}
		}
	}
	.popup-div{
		min-height: 300px;
		.popup-title{
			padding:10px 0;
			background: @BGGrey;
			.popup-title-div{
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				.title-s1{
					color: @BGblue;
				}
				.title-s2{
					font-size: 17px;
				}
				.title-s3{
					color: @BGblue;
				}
			}
		}
		.popup-li{
			padding:15px 0;
			border-bottom: 1px solid @BOX3;
			border-top: 1px solid @BOX3;
			.popup-li-div{
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				.li-name{
					
				}
				.li-value{
					.li-value-input{
						padding: 5px 10px;
						border: 1px solid @BOX3;
						input{
							border: none;
							width: 40px;
							text-align: center;
						}
					}
				}
			}
		}
	}
	
}
</style>