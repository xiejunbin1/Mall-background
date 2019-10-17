<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="地址列表"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		
		<div class="addresslist">
			<div class="addresslist-div" v-for="(item,index) in addressData" :data-values='item.address' :data-ids='item.id' :key="index" @click="handleSelect">
				<div class="li-text">
					<van-tag type="success">{{index+1}}</van-tag>
					<span>{{item.address}}</span>
				</div>
				<div class="add-revise">
					<div class="li-handle0"></div>
					<div class="li-handle" @click="handleDialog1" :data-index = "item.id" :data-add = "item.address">
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
		
		<div class="revise-btn" @click="handleDialog">
			新增地址
		</div>
		
		<van-dialog
		  v-model="show"
		  show-cancel-button
		  :before-close="beforeClose"
		>
		  <van-field
		    v-model="add_address"
		    label="地址"
		    placeholder="请输入地址"
		  />
		</van-dialog>
		
		<van-dialog
		  v-model="show1"
		  show-cancel-button
		  :before-close="beforeClose1"
		>
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
import url from '@/urlRouter.js'
import { Dialog } from 'vant';
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
    	show:false,
    	show1:false,
    	add_address:'',
      	addressData:[{
      		address:'番禺广场',
      		id:2
      	}],
      	revise_add:{
      		id:'',
      		address:''
      	}
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
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
			    url:'/api/MachineAddressApi/Delete?id='+indexs,
			}).then(res=>{
				if(res.data.status=='Success'){
					alert(res.data.msg)
					axios({
						method: 'get',
					    url:'/api/MachineAddressApi/List',
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
		localStorage.setItem('address_value',values)
		localStorage.setItem('address_id',ids)
		this.$router.go(-1);
	},
	//点击增加
	handleDialog(){
		this.show=!this.show
	},
	//点击修改
	handleDialog1(e){
		let _this=this
		const id = e.currentTarget.dataset.index;
		const address = e.currentTarget.dataset.add;
		_this.revise_add.id=id
		_this.revise_add.address=address
		this.show1=!this.show1
		
	},
	// 新增确认事件
	beforeClose(action, done) {
	  let _this=this;
      if (action === 'confirm') {
        setTimeout(()=>{
        	if(_this.add_address){
        		let fromData=qs.stringify({
					address:_this.add_address
				})	
	        	axios({
					method: 'post',
				    url:'/api/MachineAddressApi/Add',
				    data:fromData
				}).then((res)=>{
					if(res.data.status=='Success'){
						axios({
							method: 'get',
						    url:'/api/MachineAddressApi/List',
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
        	}else{
        		alert('输入地址不能为空');
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
        	if(_this.revise_add.address){
        		let fromData=qs.stringify({
					address:_this.revise_add.address,
					id:_this.revise_add.id
				})	
	        	axios({
					method: 'post',
				    url:'/api/MachineAddressApi/Edit',
				    data:fromData
				}).then((res)=>{
					if(res.data.status=='Success'){
						axios({
							method: 'get',
						    url:'/api/MachineAddressApi/List',
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
        	}else{
        		alert('输入地址不能为空');
        		done();
        	}
        }, 300);
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
		let _this=this
		axios({
			method: 'get',
		    url:'/api/MachineAddressApi/List',
		}).then((res)=>{
			console.log(res);
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
	padding: 10px 0;
}
.getcell-main{
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
	.revise-btn{
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 13px 0;
		background: @BGsuccess;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
}
</style>