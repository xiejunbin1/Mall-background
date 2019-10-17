<template>
	<div class="revise-main">
		<!--<van-nav-bar
		  title="商品管理"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="list-title">
			<div class="title-div">
				已上架商品
			</div>
		</div>
		<div class="revise-list" v-for='(item,index) in listData' :key='index'>
			<div class="list-div">
				<div class="li-left">
					<div class="li-img">
						<img :src="item.imgUrl" alt="" />
					</div>
					<div class="li-text">
						<div class="li-text-div">
							<div class="good-name">{{item.title}}</div>
							<div class="good-price">零售价：￥{{item.sellPrice|moneyFilter}}</div>
						</div>
					</div>
				</div>
				<router-link class="li-right" tag='div' :to="{path:'/goodrevise',name:'goodrevise',params:{lid:item.id}}">
					<van-button round type="default" size="small" class='li-btn' :data-goodlid='item.good_lid' @click='goodInfo'>商品编辑</van-button>
				</router-link>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {toMoney} from '@/moneyFilter.js'
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
      	listData:[],
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//编辑
	goodInfo(e){
		const lid = e.currentTarget.dataset.goodlid;
		
	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	let _this=this;
	let idData=qs.stringify({
		manage_id:this.$route.params.manageid
	})
	axios({
		method:'post',
		url:url.url+'mobileAdmin/good_revise.php',
		data:idData,
	}).then(res=>{
		this.goodslist=res.data.data;
	})
	//获取已上架商品信息列表
	axios({
		method: 'get',
	    url:'/api/ProductApi/List',
	}).then((res)=>{
		if(res.status==200){
			_this.listData=res.data;
		}else{
			alert('请求错误')
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
  	
  },
  filters:{
	moneyFilter(money){
		return toMoney(money)
	}
  }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
.span{
	padding: 10px 0;
	background: @BGGrey;
	display: flex;
	justify-content: space-between;
}
.revise-main{
	.list-title{
		padding: 10px 0;
		background: @BGGrey;
		border-bottom:1px solid @BOX3;
		.title-div{
			width: 97%;
			margin: 0 auto;
			font-size: 14px;
			color: @FTC3;
		}
	}
	.revise-list{
		padding: 8px 0;
		border-bottom:1px solid @BOX3;
		background: #fff;
		.list-div{
			width: 97%;
			margin: 0 auto;
			font-size: 14px;
			color: @FTC3;
			display: flex;
			justify-content: space-between;
			.li-left{
				width: 65%;
				/*display: flex;
				justify-content: space-between;*/
				.li-img{
					min-height: 80px;
					width: 75px;
					float: left;
					border:1px solid @BOX3;
					padding:1px;
					img{
						width: 98%;
						height: 98%;
					}
				}
				.li-text{
					width: 60%;
					height: 100%;
					margin-left: 8px;
					float: left;
					.li-text-div{
						height: 80%;
						margin-top: 8px;
						display: flex;
					    flex-direction: column;
					    justify-content: space-between;
					    .good-name{
					    	font-size: 16px;
					    	color: @FTC2;
					    }
					    .good-price{
					    	color: @BGblue;
					    }
					}
				}
			}
			.li-right{
				width: 20%;
				line-height: 75px;
				.li-btn{
					border-color: @BGblue;
					color: @BGblue;
				}
			}
		}
	}
}
</style>