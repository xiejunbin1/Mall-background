<template>
	<div class="manageana-main">
		<!--<van-nav-bar
		  title="设备修改"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="announcement">
			欢迎使用  自助售货机系统
		</div>
		<div class="ana-placeholder">
			<div class="title-div">请填写下方资料完成机器修改</div>
		</div>
		
		<div class="manage-li manage-name ">
			<div class="title-div">
				<div class="manageana-li-title">机器名称</div>
				<div class="manageana-li-value">
					<input type="text" placeholder="请输入设备名称" v-model="manageName" class="manaeg-input"/>
				</div>
			</div>	
		</div>
		
		<div class="manage-li manage-address " tag="div" @click="handlepopupno">
			<div class="title-div">
				<div class="manageana-li-title">机器地址</div>
				<span class="manageana-li-value">
					<span style="color: #409EFF;margin-right: 10px;">{{manageAddress}}</span>					
					<i class="icon iconfont icon-icon11"></i>
				</span>
				
			</div>	
		</div>
		
		<div class="manage-li manage-classify" @click='manageclassify'>
			<div class="title-div">
				<div class="manageana-li-title">机器类型</div>
				<span class="manageana-li-value">
					<span style="color: #409EFF;margin-right: 10px;">{{managetype_name}}</span>
					<i class="icon iconfont icon-icon11"></i>
				</span>
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
				<div class="manageana-li-title">货道预览</div>
				<div class="manageana-li-value">
					<span class="value-check">可预览</span>
					<i class="icon iconfont icon-icon11"></i>
				</div>
			</div>
		</router-link>-->
		
		<div class="manage-btn">
			<div class="title-div">
				<van-button size="large" type="primary" class='manage-btn-div' @click='handleNext'>保存</van-button>
			</div>
		</div>
		
		<van-dialog
		  v-model="show"
		  show-confirm-button
		  close-on-click-overlay
		  :before-close="beforeClosei"
		>
		  <div class="manageclassify">
		  	<div class="classify-div" v-for="(item,index) in typeList" :key="index" v-show="index!=0">
		  		<span>{{item.name}}</span>
		  		<span @click='classifyDialog' :data-typeid = "item.id" :data-index = "index"><van-checkbox v-model="item.check" ></van-checkbox></span>
		  	</div>
		  </div>
		</van-dialog>
		
		<van-popup v-model="showspeedall" position="bottom" :overlay="true">
			<div class="popup-title">
	  			<div class="popup-title-div">
	  				<span class="title-s1" @click="handlepopupnoall">取消</span>
	  				<span class="title-s2">地址选择</span>
	  				<span class="title-s3" @click="handleDialog">新增地址</span>
	  			</div>
	  		</div>
			<div class="addresslist">
				<div class="addresslist-div" v-for="(item,index) in addressData" :key="index" :data-values='item.address' :data-ids='item.id' @click="handleSelect">
					<div class="li-text">
						<van-tag type="success">{{index+1}}</van-tag>
						<span>地址：{{item.address}}</span>
					</div>
					<div class="li-text" style="text-align: left;margin-left: 20px;">
						<span>店铺:</span>
						<span>{{item.name}}</span>
					</div>
					<div class="add-revise">
						<div class="li-handle0"></div>
						<div class="li-handle" @click="handleDialog1" :data-index = "item.id" :data-name = "item.name" :data-add = "item.address">
							<i class="icon iconfont icon-shanchu"></i>
							<span style="font-size: 16px;">修改</span>
						</div>
						<div class="li-handle" @click="handleDel" :data-index = "item.id">
							<i class="icon iconfont icon-shanchu"></i>
							<span style="font-size: 16px;">删除</span>
						</div>
					</div>
				</div>
			</div>
		</van-popup> 
		<!--  新增弹出层  -->
		<van-dialog
		  v-model="showq"
		  show-cancel-button
		  :before-close="beforeClose"
		>
		  <van-field
		    v-model="add_name"
		    label="店铺"
		    placeholder="请输入店铺名称"
		  />
		  <van-field
		    v-model="add_address"
		    label="地址"
		    placeholder="请输入地址"
		  />
		</van-dialog>
		
		<!-- 修改弹出层  -->
		<van-dialog
		  v-model="showa"
		  show-cancel-button
		  :before-close="beforeClose1"
		>
		  <van-field
		    v-model="revise_add.name"
		    label="店铺"
		    placeholder="请输入店铺名称"
		  />	
		  <van-field
		    v-model="revise_add.address"
		    label="地址"
		    placeholder="请输入地址"
		  />
		</van-dialog>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import {Toast} from 'vant'
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import { Dialog } from 'vant';
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
      show:false,
      showq:false,
      showa:false,
      managetype_name:'',
      managetype_id:'',
      manageName:'',
      manageAddress:'',
      manageAddress_id:'',
      typeList:[],
      addressData:[],
      showspeedall:false,
      revise_add:{
  		id:'',
  		name:'',
  		address:''
  	  },
  	  add_address:'',
  	  add_name:'',
    }
  },
  methods:{
  	//编辑触发下拉窗口
  	handleshow(e){
  		const index = e.currentTarget.dataset.index;
  		this.showspeedall=!this.showspeedall
  		
  	},
  	//地址选择下拉框 开启
  	handlepopupno(){
  		this.showspeedall=!this.showspeedall
  	},
  	//地址选择下拉框 取消事件
  	handlepopupnoall(){
  		this.showspeedall=false
  	},
  	//点击删除
	handleDel(e){
		const indexs = e.currentTarget.dataset.index;
		let _this=this
		Dialog.confirm({
		  title: '确认删除该地址',
		}).then(() => {
        	axios({
				method: 'get',
			    url:url.adminurl+'/api/MachineAddressApi/Delete?id='+indexs,
			}).then(res=>{
				if(res.data.status=='Success'){
					alert(res.data.msg)
					axios({
						method: 'get',
					    url:url.adminurl+'/api/MachineAddressApi/List',
					}).then((res)=>{
						if(res.status==200){
							_this.addressData=res.data
						}else{
							alert(res.data.msg)
						}
					}).catch(err=>{
						submitTest(err,_this);
					})
				}else if(res.data.status=='Fail'){
					alert(res.data.msg)
				}
			}).catch(err=>{
				submitTest(err,_this);
			})
		}).catch(() => {
		});
	},
	//选择地址事件
	handleSelect(e){
		const values = e.currentTarget.dataset.values;
		const ids = e.currentTarget.dataset.ids;
		this.manageAddress=values
		this.manageAddress_id=ids
		this.showspeedall=false
	},
	//点击修改
	handleDialog1(e){
		let _this=this
		const id = e.currentTarget.dataset.index;
		const address = e.currentTarget.dataset.add;
		const name = e.currentTarget.dataset.name;
		_this.revise_add.id=id
		_this.revise_add.address=address
		_this.revise_add.name=name
		this.showa=!this.showa
	},
	//点击增加  地址弹出层
	handleDialog(){
		this.showq=!this.showq
	},
	// 新增地址弹出层 确认事件
	beforeClose(action, done) {
	  let _this=this;
      if (action === 'confirm') {
        setTimeout(()=>{
        	if(_this.add_address&&_this.add_name){
        		let fromData=qs.stringify({
					address:_this.add_address,
					name:_this.add_name
				})	
	        	axios({
					method: 'post',
				    url:url.adminurl+'/api/MachineAddressApi/Add',
				    data:fromData
				}).then((res)=>{
					if(res.data.status=='Success'){
						axios({
							method: 'get',
						    url:url.adminurl+'/api/MachineAddressApi/List',
						}).then((res)=>{
							if(res.status==200){
								_this.addressData=res.data
							}else{
								alert(res.data.msg)
							}
						}).catch(err=>{
							submitTest(err,_this);
						})
					}else{
						alert(res.data.msg)
					}
				}).catch(err=>{
					submitTest(err,_this);
				})
	        	done();
        	}else if(!_this.add_address){
        		alert('输入地址不能为空');
        		done();
        	}else if(!_this.add_name){
        		alert('输入店铺不能为空');
        		done();
        	}
        }, 300);
      } else {
        done();
      }
    },
    // 修改确认事件
    beforeClose1(action, done){
    	let _this=this;
      if (action === 'confirm') {
        setTimeout(()=>{
        	if(_this.revise_add.address&&_this.revise_add.name){
        		let fromData=qs.stringify({
					address:_this.revise_add.address,
					name:_this.revise_add.name,
					id:_this.revise_add.id
				})	
	        	axios({
					method: 'post',
				    url:url.adminurl+'/api/MachineAddressApi/Edit',
				    data:fromData
				}).then((res)=>{
					if(res.data.status=='Success'){
						axios({
							method: 'get',
						    url:url.adminurl+'/api/MachineAddressApi/List',
						}).then((res)=>{
							if(res.status==200){
								_this.addressData=res.data
							}else{
								alert(res.data.msg)
							}
						}).catch(err=>{
							submitTest(err,_this);
						})
					}else{
						alert(res.data.msg)
					}
				}).catch(err=>{
					submitTest(err,_this);
				})
	        	done();
        	}else if(!_this.revise_add.name){
        		alert('输入店铺不能为空');
        		done();
        	}else if(!_this.revise_add.address){
        		alert('输入地址不能为空');
        		done();
        	}
        }, 300);
      } else {
        done();
      }
    },
  	//设备类型对话框
  	classifyDialog(e){
  		const index = e.currentTarget.dataset.index;
  		const typeid = e.currentTarget.dataset.typeid;
  		for (var i=0;i<this.typeList.length;i++) {
  			this.typeList[i].check=false
  		}
  		this.typeList[index].check=true;
  		this.managetype_id=this.typeList[index].id
  		this.managetype_name=this.typeList[index].name
  	},
  	//返回上一页
  	onClickLeft(){
  		this.$router.go(-1);
  	},
  	manageclassify(){
  		this.show=!this.show;
  	},
  	beforeClosei(action, done){
  	  if (action === 'confirm') {
        setTimeout(done, 100);
      } else {
        done();
      }
  	},
  	//保存提交事件
  	handleNext(){
  		let _this=this;
  		if(!this.manageName){
  			Toast.fail('设备名称不为空');
  		}
  		if(!this.manageAddress){
  			Toast.fail('设备地址不为空');
  		}
  		if(!this.managetype_name){
  			Toast.fail('设备类型不为空');
  		}
  		if(this.manageName&&this.manageAddress&&this.managetype_name){
  			axios({
				method: 'get',
			    url:url.adminurl+'/api/MachineApi/Edit?id='+this.$route.params.manageid+'&machineTypeId='+this.managetype_id+'&addressId='+this.manageAddress_id+'&remark='+this.manageName,
			}).then(res=>{
				alert(res.data.msg)
			}).catch(err=>{
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
  	//获取设备信息
  	let _this=this;
  	axios({
		method: 'get',
	    url:url.adminurl+'/api/MachineApi/Detail?id='+this.$route.params.manageid,
	}).then(res=>{
		this.manageAddress=res.data.address;
		this.manageAddress_id=res.data.addressId;
		this.managetype_name=res.data.machineType;
		this.managetype_id=res.data.machineTypeId;
		this.manageName=res.data.remark;
	}).catch(err=>{
		submitTest(err,_this);
	})
	
	//获取设备类型
  	axios({
		method: 'get',
	    url:url.adminurl+'/api/MachineApi/GetMachineTypes',
	}).then(res=>{
		this.typeList=res.data;
	}).catch(err=>{
		submitTest(err,_this);
	})
	
	//获取地址列表
	axios({
		method: 'get',
	    url:url.adminurl+'/api/MachineAddressApi/List',
	}).then((res)=>{
		if(res.status==200){
			_this.addressData=res.data
		}else{
			alert(res.data.msg)
		}
	}).catch(err=>{
		submitTest(err,_this);
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
	text-align: center;
}
.manageana-main{
	background: @BGGrey;
	.announcement{
		text-align: center;
		padding: 12px 0;
		font-size: 20px;
		color: #fff;
		background: @BGblue;
	}
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
	.addresslist{
		padding-bottom: 50px;
		.addresslist-div{
			padding: 10px 0 8px 0;
			width: 95%;
			margin: 0 auto;
			margin-top: 8px;
			box-shadow: @BOXcurrency;
			.li-text{
				font-size: 16px;
			}
			.add-revise{
				display: flex;
				justify-content: space-between;
			}
			.li-handle0{
				width: 55%;
			}
			.li-handle{
				width: 20%;
				margin-top: 5px;
				text-align: center;
				color: red;
			}
		}
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
				/*width: 78%;*/
				color: @FTC3;
				.manaeg-input{
					text-align: right;
					border: none;
					width: 100%;
				}
				.value-check{
					margin-right: 0px;
				}
				.qr-code{
					margin-right: 30px;
				}
				.icon-saomiao{
					color: @BGblue;
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
		margin-top: 10px;
	}
	.manage-address{
		margin-top: 15px;
	}
	.manage-name{
		margin-top: 10px;
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
		.classify-div{
			margin-top: 15px;
		}
	}
	.popup-div{
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
		.addresslist{
			padding-bottom: 50px;
			.addresslist-div{
				padding: 10px 0 8px 0;
				width: 95%;
				margin: 0 auto;
				margin-top: 8px;
				box-shadow: @BOXcurrency;
				.li-text{
					font-size: 16px;
				}
				.add-revise{
					display: flex;
					justify-content: space-between;
				}
				.li-handle0{
					width: 55%;
				}
				.li-handle{
					width: 20%;
					margin-top: 5px;
					text-align: center;
					color: red;
					z-index: 100;
				}
			}
		}
	}
}

</style>