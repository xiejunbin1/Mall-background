<template>
	<div class="goodrevise-main">
		<van-nav-bar
		  title="修改商品价格"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>
		<van-notice-bar mode="closeable">
		  	商品价格修改成功后将应用及其所有同类商品中
		</van-notice-bar>
		<div class="list-title">
			<div class="title-div">
				已选商品
			</div>
		</div>
		<div class="revise-list">
			<div class="list-div">
				<div class="li-left">
					<div class="li-img">
						<img :src="goodData.good_img" alt="" />
					</div>
					<div class="li-text">
						<div class="li-text-div">
							<div class="good-name">{{goodData.good_name}}</div>
							<div class="good-price">当前零售价：￥{{goodData.good_price|moneyFilter}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="list-title">
			<div class="title-div">
				零售价
			</div>
		</div>
		<div class="revise-price">
			<div class="revise-price-div">
				<input type="text" v-model="revise_price" :placeholder="price|moneyFilter"/>
			</div>
		</div>
		<!--<div class="list-title">
			<div class="title-div">
				<span class="vip-price">会员价</span>
				<van-switch v-model="checked" />
			</div>
		</div>-->
		<!--<div class="revise-price">
			<div class="revise-price-div">
				<input type="text" :value="vip_price|moneyFilter"/>
			</div>
		</div>-->
		<div class="list-title">
			<div class="title-div">
				商品售卖货道
			</div>
		</div>
		<div class="cargo-list">
			<div class="cargo-list-div">
				<div class="cargo-li" v-for='(item,index) in cargoList'>{{item.cargo_id}}</div>
			</div>
		</div>
		
		<van-button size="large" class="submit-div" @click='handleSubmit' :loading='btnStatus'>保存提交</van-button>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {Toast} from 'vant'
import {toMoney} from '@/moneyFilter.js'

export default {
  name: 'goodrevise',
  data () {
    return {
      	goodData:[],
      	price:'',
      	revise_price:'',
      	vip_price:'',
      	checked:false,
      	cargoList:[],
      	btnStatus:false
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//提交
	handleSubmit(){
		this.btnStatus=true;
		let formData=qs.stringify({
			good_lid:this.$route.params.lid,
			price:this.revise_price==''?this.price:this.revise_price,
//			vip_price:this.vip_price,
//			checked:this.checked
		})
		// console.log(formData)
		setTimeout(()=>{
			this.btnStatus=false;
			axios({
				method:'post',
				url:url.url+'mobileAdmin/good_revise_submit.php',
				data:formData,
				responseType:'json'
			}).then((res)=>{
				// console.log(res.data)
				this.cargoList=res.data.data;
				if(res.data.status=='success'){
					Toast.success('价格修改成功');
					setTimeout(()=>{
						this.$router.go(-1);
					},3000)
				}else{
					Toast.fail(res.data.msg);
				}
			})
		},500)
	}
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  	let idData=qs.stringify({
			good_lid:this.$route.params.lid
		})
  	console.log(idData)
  	axios({
		method:'post',
		url:url.url+'mobileAdmin/good_lid.php',
		data:idData,
		responseType:'json'
	}).then((res)=>{
		console.log(res.data)
		this.goodData=res.data.good_data[0];
		this.price=res.data.good_data[0].good_price;
		this.vip_price=res.data.good_data[0].good_price;
		this.cargoList=res.data.cargo_data;
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
.goodrevise-main{
	.list-title{
		padding: 10px 0;
		background: @BGGrey;
		border-bottom:1px solid @BOX3;
		.title-div{
			width: 97%;
			margin: 0 auto;
			font-size: 14px;
			color: @FTC3;
			display: flex;
			justify-content: space-between;
			.vip-price{
				line-height: 32px;
			}
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
	.revise-price{
		padding: 8px 0;
		background: #fff;
		.revise-price-div{
			width: 97%;
			margin: 0 auto;
			input{
				border: none;
				font-size: 15px;
			}
		}
	}
	.cargo-list{
		.cargo-list-div{
			width: 97%;
			margin: 0 auto;
		}
		.cargo-li{
			float: left;
			width: 22%;
			margin-left: 10px;
			margin-top: 5px;
			text-align: center;
			background: @BGgrey;
			padding: 10px 0;
		}
	}
	.submit-div{
		width: 100%;
		margin-top: 30px;
		background: @BGblue;
		font-size: 16px;
		color: #fff;
	}
}
</style>