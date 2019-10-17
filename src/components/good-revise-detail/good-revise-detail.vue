<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="更改商品"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<van-search
		  v-model="searchData"
		  placeholder="请输入商品名称来查询"
		  show-action
		  @search="onSearch"
		>
		  <div slot="action" @click="onSearch">搜索</div>
		</van-search>
		<div class="goods-list">
			<div class="hot-good">
				<div class="hot-good-div">
					<i class="icon iconfont icon-redu2"></i>热搜商品
				</div>
			</div>
			<div class="li-goods-div" v-for='(item,index) in listData' :key='index'>
				<div class="li-goods" @click="handleGood" :data-goodid = "index">
					<div class="good-img">
						<img :src="item.good_img" alt="" />
					</div>
					<div class="good-info">
						<div class="good-name"><span class="good-name-text">{{item.good_name}}</span></div>
						<div class="good-price">商品价格：{{item.good_price|moneyFilter}}</div>
					</div>
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
import {toMoney} from '@/moneyFilter.js'
import Footer from '../index/index'

export default {
  name: 'goodrevisedetail',
  data () {
    return {
      	goodslist:[],
      	searchData:'',
      	listData:[{
	      	good_lid:230,
	      	good_img:'http://119.23.218.210/allPHP/imgs/58d22765Ned3b6c3b.jpg',
	      	good_name:'脉动实惠装',
	      	good_price:9.66
	    },{
	      	good_lid:234,
	      	good_img:'http://119.23.218.210/allPHP/imgs/5ac2fcfbNadff326a.jpg',
	      	good_name:'水葡萄特饮',
	      	good_price:8.99
	    },{
	      	good_lid:237,
	      	good_img:'http://119.23.218.210/allPHP/imgs/58661e56N263e903b.jpg',
	      	good_name:'大桶可口可乐',
	      	good_price:10.99
	    }],
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//搜索框
	onSearch(){
		let fromData=qs.stringify({
			searchData:this.searchData
		})
		axios({
			method:'post',
			url:url.url+'mobileAdmin/manage_revise.php',
			data:fromData,
			responseType:'json'
		}).then((res)=>{
			// console.log(res.data)
			if(res.data.status=='success'){
				console.log(res.data.msg)
				this.listData=res.data.data[0];
			}else if(res.data.status=='fail'){
				// console.log(res.data.msg);
			}
		}).catch(err=>{
			// console.log('修改失败');
		})
	},
	//选择商品
	handleGood(e){
		const good_lid = e.currentTarget.dataset.goodid;
		// console.log(JSON.stringify(this.listData[good_lid]));
		let datalist=this.listData[good_lid];
		datalist.checkboxStatus=true;
		datalist.showspeedall=true;
		JSON.stringify(datalist)
		let good_info=JSON.stringify(this.listData[good_lid])
		localStorage.setItem('revise_good',good_info)
		this.$router.go(-1);
	}
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	// console.log(this.$route.query.manageid)
//	console.log(localStorage.getItem('goodslist'))
  	var listdata=JSON.parse(localStorage.getItem('goodslist'))
  	// console.log(listdata)
  	this.goodslist=listdata
  	// console.log(this.listData)
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
	background: #fff;
}
.getcell-main{
	.goods-list{
		.hot-good{
			padding: 6px 0;
			background: #FFFBE8;
			.hot-good-div{
				width: 90%;
				margin: 0 auto;
				color: @FTC2;
				font-size: 16px;
				.icon-redu2{
					color: @BGdanger;
					margin-right: 5px;
					font-size: 18px;
				}
			}
		}
		.li-goods-div{
			background: #fff;
			padding: 5px 0;
			box-shadow: @BOXcurrency;
			margin-top: 10px;
			.li-goods{
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.good-img{
					width: 20%;
					padding: 1px;
					border: 1px solid @BOX4;
					min-height: 60px;
					img{
						width: 99%;
						height: 99%;
					}
				}
				.good-info{
					width: 75%;
					height: 68px;
					margin-top: 9px;
				    display: flex;
				    flex-direction: column;
				    justify-content: space-between;
					.good-name{
						.good-name-text{
							font-size: 16px;
							color: #2c3e50;
						}
					}
					.good-price{
						font-size: 15px;
						color: @BGblue;							
					}
					.good-stock{
						font-size: 14px;
						color: @FTC3;
					}
				}
			}
		}
	}
}
</style>