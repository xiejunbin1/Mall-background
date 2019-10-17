<template>
	<div class="getcell-main">
		<div class="per_title">功能教程</div>
		<div class="per_li">
			<div class="li_box">
				<div class="box_1" @click="handleImg(1)">
					<i class="icon iconfont icon-shebeiguanli1"></i>
					设备注册流程
				</div>
				<div class="box_2" @click="handleImg(2)">
					<i class="icon iconfont icon-mingcheng2" ></i>
					商户资料填写流程
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
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
      	
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//跳转流程页面图
	handleImg(val){
		this.$router.push({name: 'persentimg',params:{ img:val}});
	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	
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
	box-sizing: border-box;
	width: 100%;
	padding: 10px;
}
.getcell-main{
	.per_title{
		font-size:16px;
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
		border-bottom: 1px solid @BOX3;
		background: #fff;
	}
	.per_li{
		padding: 5px 0;
		border-bottom: 1px solid @BOX3;
		background: #fff;
		.li_box{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.box_1{
				border-right: 1px solid @BOX3;
				width: 50%;
				box-sizing: border-box;
				text-align: left;
				padding: 10px 10px;
				font-size: 14px;
				.icon{
					color: @BGblue;
					font-size: 18px;
				}
			}
			.box_2{
				font-size: 14px;
				width: 50%;
				box-sizing: border-box;
				text-align: left;
				padding: 10px 10px;
				.icon{
					color: @BGblue;
					font-size: 18px;
				}
			}
		}
	}
}
</style>