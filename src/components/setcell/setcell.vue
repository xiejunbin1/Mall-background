<template>
	<div class="setcell-main">
		<!--<van-nav-bar
		  title="设置机器货道"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="setcell-li setcell-start " @click='handlestart'>
			<div class="title-div">
				<div class="setcell-li-title">起始编号</div>
				<div class="setcell-li-value">
					<span class="qr-code">货道起始编号{{startSum}}</span>
					<i class="icon iconfont icon-icon11"></i>
				</div>
			</div>	
		</div>
		
		<div class="setcell-placeholder">
			<div class="title-div">货道顺序从上往下排列，A代表最上一层货道</div>
		</div>
		
		<div class="setcell-li setcell-li-sums" @click='handlehShow' v-for='(item,index) in selectdata' :key='index' :data-index='index'>
			<div class="title-div">
				<div class="setcell-li-title">{{item.name}}层货道数量</div>
				<div class="setcell-li-value">
					<span class="li-value-sum">{{item.sum}}</span>
				</div>
			</div>	
		</div>
		
		
		
		<van-dialog
		  v-model="show"
		  show-confirm-button
		  close-on-click-overlay
		  :before-close="beforeClose"
		>
		  	<van-picker :columns="columns" @change="onChange" />
		</van-dialog>
		
		
		<van-dialog
		  v-model="shows"
		  show-confirm-button
		  close-on-click-overlay
		  :before-close="beforeCloses"
		>
		  <div class="manageclassify">
		  	<div class="classify-div" >
		  		<span>10</span>
		  		<span @click='classifyDialog1'><van-checkbox v-model="classifyCheck1" ></van-checkbox></span>
		  	</div>
		  	<div class="classify-div classify-div2" >
		  		<span>20</span>
		  		<span @click='classifyDialog2'><van-checkbox v-model="classifyCheck2"></van-checkbox></span>
		  	</div>
		  </div>
		</van-dialog>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
    	startSum:'(默认1)',
    	classifyCheck1:false,
    	classifyCheck2:false,
    	manageclassifyData:1,     //启始编号数据
    	shows:false,
    	columns:[1,2,3,4,5,6,7,8,9],
      	show:false,
      	selectdata:[{name:'A',sum:0},{name:'B',sum:0},{name:'C',sum:0},{name:'D',sum:0},{name:'E',sum:0},{name:'F',sum:0},{name:'G',sum:0},{name:'H',sum:0},],   //货道数据
      	temporary:0,
      	goodsIndex:0,
    }
  },
  methods:{
  	//对话框显示
  	handlehShow(e){
  		this.show=!this.show;
  		const index = e.currentTarget.dataset.index;
  		this.goodsIndex=index;
  	},
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
  	},
  	//货道数量
  	beforeClose(action, done){
  		this.selectdata[this.goodsIndex].sum=this.temporary;
  		done()
  	},
  	//启始编号对话框
  	handlestart(){
  		this.shows=!this.shows;
  	},
  	//启始编号对话框确认
  	beforeCloses(action, done){
  	  if (action === 'confirm') {
  	  	if(this.classifyCheck1){
  	  		this.startSum=10;
  	  	}else if(this.classifyCheck2){
  	  		this.startSum=20;
  	  	}
        setTimeout(done, 500);
      } else {
        done();
      }
  	},
  	//启始编号选择
  	classifyDialog2(){
  		this.manageclassifyData=1;
  		this.classifyCheck1=false;
  	},
  	//启始编号选择
  	classifyDialog1(){
  		this.manageclassifyData=10;
  		this.classifyCheck2=false;
  	},
  	onChange(picker, value, index) {
      	this.temporary=value;
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
.setcell-main{
	background:@BGGrey;
	.setcell-li{
		background: #fff;
		padding: 10px;
		font-size: 14px;
		.title-div{
			display: flex;
			justify-content: space-between;
			.setcell-li-title{
				font-size: 16px;
				width: 30%;
			}
			.setcell-li-value{
				font-size: 16px;
				text-align: left;
				width: 68%;
				color: @FTC3;
				display: flex;
				justify-content: space-between;
				.qr-code{
					/*margin-right: 30px;*/
				}
			}
		}
	}
	.setcell-li-sums{
		border-bottom: 1px solid @BOX3;
	}
	.setcell-start{
		margin-top: 10px;
		box-shadow: @BOXcurrency;
	}
	.setcell-placeholder{
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