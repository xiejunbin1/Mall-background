<template>
	<div class="main">
		<router-view></router-view>
		<div class="tab">
			<router-link to="/home" tag="div" class="tab-item tab-item1">
				<i class="icon iconfont icon-index1"></i>				
				<span class="text">首页</span>
			</router-link>
			<router-link to="/present" tag="div" class="tab-item tab-item1">
				<i class="icon iconfont icon-kucun1"></i>				
				<span class="text">功能介绍说明</span>
			</router-link>
			<router-link to="/usercore" tag="div" class="tab-item tab-item2">
				<i class="icon iconfont icon-wd"></i>				
				<span class="text">我的</span>
			</router-link>			
		</div>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';

export default {
  name: 'manage',
  data () {
    return {
      	searchData:'',
      	active:0,
      	tabdatas:[{"title":'全部',"icons":'icon-quanbu2','ip':1},
				{"title":'离线',"icons":'icon-lixianmoshi','ip':2},
				{"title":'在线',"icons":'icon-zaixianbaoming','ip':3},
		],
		
    }
  },
  methods:{
  	//搜索事件
  	onSearch(){
  		// console.log(this.searchData)
  	},
  	//标签点击事件
  	onClick(index, title) {
      this.$toast(title);
    }
  },
  //实例化
  components:{
  	
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
.main{
	.manage-classify{
		.iconfont{
			margin-right: 3px;
		}
		.icon-quanbu2{
			font-size: 18px;
		}
		.icon-zaixianbaoming{
			font-size: 18px;
		}
	}
	.icon-index1{
		font-size: 20px;
		line-height: 1;
	}
	.icon-kucun1{
		font-size: 24px;
		line-height: 24px;
	}
	.icon-wd{
		font-size: 22px;
		line-height: 22px;
	}
	.tab{
		border-top-color: #E4E4E4;
    	background-color: #fff;
    	line-height: 1.5!important;
    	position: fixed;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	z-index: 1000;
    	border-top: 1px solid @BOX3;
		clear:both;
		width:100%;
		height:50px;
		display: flex;
		.tab-item{
			flex: 1;
			text-align:center;
			height: 49px;
			display: flex;
			justify-content: center;
			flex-direction: column;
			/*border-right: 1px solid @BOX3;*/
			.text{
				font-size: 13px;
			}
		}
		.tab-item2{
			.icon-jihuo{
				font-size: 20px;
			}
		}		
	}
	.router-link-active{
		color: @BGdanger;
	}
	.router-link-active i{
		color: @BGdanger;
	}
}
</style>