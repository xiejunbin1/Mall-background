<template>
    <div class="site_list">
        <div class="addresslist">
			<div class="addresslist-div" v-for="(item,index) in addressData" :key="index" :data-shopid = "item.id" :data-name = "item.name" @click="handleTomeal(item.id,item.address)">
				<div class="li-text" >
					<i class="icon iconfont icon-dianpu" style="color: #3DBE51;margin-left: 3%;"></i>
					<span style="margin-left: 5px;">店铺：</span>
					<span  style="color: #606266;">{{item.name}}</span>
				</div>
				<span class="addresslist-look">
					<i class="icon iconfont icon-viewed" style="color: #909399;;font-size: 25px;"></i>
				</span>
				<div class="li-text" style="text-align: left;margin-top: -20px;margin-left: 3%;">
					<i class="icon iconfont icon-xiangxidizhi3" style="color: #0093FF;"></i>
					<span style="margin-left: 5px;">详细地址：</span>
					<span style="color: #606266;">{{item.address}}</span>
				</div>
			</div>
		</div>
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
     data () {
    return {
    	show:false,
    	show1:false,
    	add_address:'',
    	add_name:'',
      	addressData:[]
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	handleTomeal(id,address){
        localStorage.setItem("id",id)
        localStorage.setItem("address",address)
		this.$router.push({name: 'theOrderManagement1'});
	},
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
		    url:url.adminurl+'/api/MachineAddressApi/List',
		}).then((res)=>{
			_this.addressData=res.data
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

<style lang="less">
@import '../../style/main.less';
.site_list{
    .addresslist{
		padding-bottom: 60px;
		.addresslist-div{
			background: #fff;
			padding: 10px 0 8px 0;
			width: 100%;
			margin: 0 auto;
			margin-top: 2px;
			box-shadow: 0 1px 1px #cbc9c9;
			.li-text{
				font-size: 16px;
				/*position: absolute;*/
			}
			.addresslist-look{
				position: relative;
				top: -5px;
				left: 90%;
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

