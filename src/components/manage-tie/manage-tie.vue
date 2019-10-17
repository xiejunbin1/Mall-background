<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="设备解绑"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="tie-list">
			<div class="tie-li" v-for="(item,index) in datalist" :key='index'>
				<div class="tie-li-div">
					<div class="li-check">
						<i class="icon iconfont icon-xuanzhong" v-if="item.check" @click='oncheck'  :data-index='index'></i>
						<i class="icon iconfont icon-checkbox-copy" v-if="!item.check" @click='oncheck'  :data-index='index'></i>
					</div>
					<div class="li-info">
						<div class="li-id">设备ID：<span style="color: #F56C6C;">{{item.machineNum}}</span></div>
						<div>类型：<span style="color: #F56C6C;">{{item.machineType}}</span></div>
						<div>
							设备地址：<span style="color: #F56C6C;">{{item.address}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 分页  -->
		<van-pagination 
		  v-model="pno" 
		  :total-items="listsum" 
		  :show-page-size="5" 
		  @change='handlePno'
		/>
		
		<div class="revise-btn" @click='handleshowall'>
			确认解绑
		</div>
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

export default {
  name: 'HelloWorld',
  data () {
    return {
		pno:1,
		listsum:0,
      	datalist:[],
      	olddatalist:[]
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//
	handleClick(){
		
	},
	//复选框事件
  	oncheck(e){
  		let _this=this;
  		const index = e.currentTarget.dataset.index;
		this.datalist[index].check=!this.datalist[index].check;
  	},
  	//页码切换
  	handlePno(){
  		axios({
			method: 'get',
		    url:'/api/MachineApi/List?page='+this.pno+'&status=-1&machineTypeId=0',
		}).then((res)=>{
			console.log(res);
			this.listsum=res.data.tatalCount
			this.datalist=res.data.data
		}).catch(err=>{
			submitTest(err,_this);
		})
  	},
  	//批量解绑确认事件
  	handleshowall(){
  		let _this=this;
  		var arr=[];
  		Dialog.confirm({
		  title: '确认操作',
		}).then(()=>{
			
			for(var i=0;i<this.datalist.length;i++){
				if(this.datalist[i].check){
					arr.push(_this.datalist[i].machineNum)
				}
			}
			console.log(arr)
			if(arr.length!=0){
				let fromData=qs.stringify({
					machineNums:arr
				})
			  	console.log(fromData)
			  	
			  	axios({
					method:'post',
					url:'/api/MachineApi/RemoveBinged',
					data:arr,
					responseType:'json'
				}).then((res)=>{
					console.log(res)
					if(res.data.status=='Success'){
						axios({
							method: 'get',
						    url:'/api/MachineApi/List?page=1&status=-1&machineTypeId=0',
						}).then((res)=>{
							console.log(res);
							this.listsum=res.data.tatalCount
							this.datalist=res.data.data
						}).catch(err=>{
							submitTest(err,_this);
						})
					}else if(res.data.status=='Fail'){
						alert(res.data.msg)
					}
				})
			}else{
				alert('请先选择设备')
			}
			
		}).catch(()=>{
			console.log('no')
		})
  	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
    
    axios({
		method: 'get',
	    url:'/api/MachineApi/List?page=1&status=-1&machineTypeId=0',
	}).then((res)=>{
		console.log(res);
		this.listsum=res.data.tatalCount
		this.datalist=res.data.data
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
	.tie-list{
		padding-bottom: 50px;
		.tie-li{
			padding: 10px 0;
			border-bottom: 1px solid @BOX3;
			.tie-li-div{
				display: flex;
				justify-content: space-between;
				.li-check{
					width:10%;
					padding: 0 5px;
					line-height: 70px;
					text-align: center;
					.icon-xuanzhong{
						color: @BGsuccess;
					}
				}
				.li-info{
					width: 90%;
					display: flex;
					flex-direction: column;
				    justify-content: space-between;
				    font-size: 16px;
				}
			}
		}
	}
	.icon-xuanzhong{
		color: @BGsuccess;
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