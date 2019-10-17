<template>
	<div class="main">
		<div class="header">
			<div class="user-income">
				<div class="user-income-info">
					<div class="user-img">
						<img :src='userImg' alt="" />
					</div>
					<div class="sum-income">
						<span class="income-text">今日总收益（元）</span>
						<br />
						<br />
						<span class="income-num">0.00</span>
					</div>
					<div class="btn-div">
						<span class="btn-info">查看详情</span>
					</div>
				</div>
			</div>
			<div class="income-class">
				<div class="class-pay on-line">
					<span>线上支付</span>
					<br />
					<span>0.00元</span>
				</div>
				<div class="class-pay cash">
					<span>现金收益</span>
					<br />
					<span>0.00元</span>
				</div>
			</div>
		</div>
		<div class="main-anv">
			<div class="carte-list1">
				<div class="carte-classify">
					<router-link to="/manage" class="carte1-li carte1-li1" tag="div">
						<div class="classify-bg-div">
							<div class="bg-div bg-div1">设备管理</div>
							<div class="bg-div bg-div2">在线 
								<span>0</span>
								/
								<span>0</span>
								台
							</div>
						</div>
					</router-link>
					
					<router-link :to="{path:'moneycount',name:'moneycount',params:{manageid:123}}" tag="div" v-if="aaaa" class="carte1-li carte1-li2">
						<div class="classify-bg-div">
							<div class="bg-div bg-div1">销售统计</div>
							<div class="bg-div bg-div2">
								销售数据统计
							</div>
						</div>
					</router-link>
					
					<router-link to="/goodexhibit" tag="div" class="carte1-li carte1-li3">
						<div class="classify-bg-div">
							<div class="bg-div bg-div1">商品上架</div>
							<div class="bg-div bg-div2">
								商品上架管理
							</div>
						</div>
					</router-link>
				</div>
			</div>
			<div class="carte-list2">
				<div class="carte-classify2">
					<router-link to="/manageana" tag="div" class="carte2-li carte2-li1">
						<i class="icon iconfont icon-zhuce1"></i>
						<p class="classify-info">设备注册</p>
					</router-link>
					<router-link to="/base" tag="div" class="carte2-li carte2-li2">
					<!--<div class="carte2-li carte2-li2">-->
						<i class="icon iconfont icon-youhui2"></i>
						<p class="classify-info">优惠设置</p>
					<!--</div>-->
					</router-link>
					<!--<div class="carte2-li carte2-li3">
						<i class="icon iconfont icon-shouchiPOStubiaoku_huabanfuben"></i>
						<p class="classify-info">账务查询</p>
					</div>-->
					<router-link :to="{path:'reviselist',name:'reviselist',params:{manageid:0}}" tag="div" class="carte2-li carte2-li3">
						<i class="icon iconfont icon-tubiaozhizuomoban-"></i>
						<p class="classify-info">商品修改</p>
					</router-link>
					<router-link to="/usercore" class="carte2-li carte2-li4" tag="div">
						<i class="icon iconfont icon-gerenziliao2"></i>
						<p class="classify-info">个人设置</p>
					</router-link>
					<router-link to="/sellerreg" class="carte2-li carte2-li5" tag="div">
						<i class="icon iconfont icon-gongju1"></i>
						<p class="classify-info">商户进件</p>
					</router-link>
				</div>
			</div>
			<div class="carte-list-div"></div>
			<div class='carte-list carte-list3'>
				<van-cell-group>
				  <van-cell icon="shop" label="店铺礼品消耗详情" is-link>
				    <template slot="title">
				      <span class="van-cell-text">礼品消耗</span>
				    </template>
				  </van-cell>
				</van-cell-group>
			</div>
			
		</div>
		<div class="main-body">
			<div class="supply-title">
				<div class="supply-title-div">
					<i class="icon iconfont icon-redu2"></i>
					<span class="supply-text">急需补货</span>
				</div>
			</div>
			<div class="supply-list">
				<div class="supply-list-div">
					<!--<div class="supply-no">
						<img :src="noSupply" alt="" />
						<br />
						<p>暂时没有待补货的机器喔~</p>
					</div>-->
					<div class="supply-ul">
						<router-link :to="{path:'stockinfo',name:'stockinfo',params:{manageid:item.manageid}}" tag="div" class="info-summary" v-for="(item,index) in lack">
						<!--<div class="info-summary" v-for="(item,index) in 3">-->
							<div class="summary-img">
								<img src="http://119.23.218.210/allPHP/imgs/manage3.jpg" alt="口红机" v-show="item.manage_class"/>
								<img src="http://119.23.218.210/allPHP/imgs/manage2.jpg" alt="售货机" v-show="!item.manage_class"/>
							</div>
							<div class="summary-text">
								<div class="info-div">机器编号：<i class="color-warning">{{item.manage_id}}</i></div>
								<div class="info-div">机器类型：<i class="color-warning">{{item.manage_class==0?'自助售货机':'游戏口红机'}}</i></div>
								<div class="info-div">状态：<i class="color-warning"><i class="icon iconfont icon-quehuo1"></i></i></div>
							</div>
						</router-link>					
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
		aaaa:false,
      	userImg: url.url+'allPHP/5a7571fbN1d3be889.jpegq70.jpg',
      	noSupply:'http://127.0.0.1/allPHP/imgs/5a93c51cN3bb5e37b.png',
     	manageinfo:[],
      	manage_class:'',
      	lack:[]
    }
  },
  methods:{
  	
  },
  //实例化
  components:{
  	
  },
  //开始创建
  created(){
  	let idData=qs.stringify({
			manage_id:'18sj1hasdj1lg81md111'
		})
  	axios({
		method:'post',
		url:url.url+'mobileAdmin/manage_id.php',
		data:idData,
		responseType:'json'
	}).then((res)=>{
		console.log(res.data)
		this.manageinfo=res.data.data[0];
		this.manage_class=res.data.data[0].manage_class;
	})
	this.lack=[{
		manageid:'071j7dskladhlah81hsd',
		manage_class:1,
	},{
		manageid:'071j7dskladhlah81hsd',
		manage_class:0,
	},{
		manageid:'071j7dskladhlah81hsd',
		manage_class:0,
	},{
		manageid:'071j7dskladhlah81hsd',
		manage_class:1,
	}]
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
	position: fixed;
	overflow: hidden;
}
.main{
	.header{
		position: fixed;
		width: 100%;
		height: 200px;
		background-image: url('http://119.23.218.210/allPHP/imgs/123.jpg');
		background-repeat: no-repeat;
    	background-size: cover;
    	background-position: center 0;
		overflow: hidden;
		z-index: 1000;
		.user-income{
			position: absolute;
			width: 100%;
			height: 150px;
			.user-income-info{
				width: 90%;
				height: 80px;
				/*background: #f44;*/
				margin: 0 auto;
				margin-top: 35px;
				display: flex;
				justify-content: space-between;
				.user-img{
					box-sizing: border-box;
					height: 100%;
					width: 80px;
					border-radius: 50%;
					border:4px solid #fff;
					overflow: hidden;
					img{
						height: 100%;
						width: 100%;
					} 
				}
				.sum-income{
					margin-left: 5px;
					box-sizing: border-box;
					height: 100%;
					width: 40%;
					/*background: #2C3E50;*/
					text-align: left;
					color: #fff;
					.income-text{
						font-size: 16px;
						margin-left: 5px;
					}
					.income-num{
						margin-left: 5px;
						font-size: 30px;
						font-weight: bold;
					}
				}
				.btn-div{
					box-sizing: border-box;
					height: 100%;
					width: 35%;
					/*background: aqua;*/
					.btn-info{
						text-align: center;
						color: #fff;
						font-size: 14px;
						padding: 3px 20px;
						border: 1px solid #fff;
						border-radius: 10px;
						margin-top: 50%;
						position: relative;
						top: 35px;
					}
				}
			}
		}
		.income-class{
			position: absolute;
			bottom:0;
			width: 100%;
			height: 45px;
			padding-top: 5px;
			background: rgba(72,61,139,0.5);
			display: flex;
			justify-content: space-between;
			.class-pay{
				width: 50%;
				height: 100%;
				box-sizing: border-box;
				text-align: center;
				color: #fff;
				font-size: 15px;
			}
			.on-line{
				border-right: .3px solid @BOX3;
			}
			.cash{
				border-left: .3px solid @BOX3;
			}
		}
	}
	.main-anv{
		width: 100%;
		position: fixed;
		top: 200px;
		.carte-list1{
			width: 100%;
			padding: 10px 0;
			background: #fff;
			.carte-classify{
				width: 92%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.carte1-li{
					width: 32%;
					height: 70px;
					box-sizing: border-box;
					border-radius: 10px;
					background-repeat: no-repeat;
			    	background-size: cover;
			    	background-position: center 0;
					overflow: hidden;
					.classify-bg-div{
						color: #fff;
						.bg-div{
							margin-left: 6%;
						}
						.bg-div1{
							margin-top: 7%;
							font-size: 17px;
							font-weight: 525;
						}
						.bg-div2{
							margin-top: 1%;
							font-size: 10px;
							font-weight: 525;
						}
					}
				}
				.carte1-li1{
					background-image: url('http://119.23.218.210/allPHP/imgs/bg0.jpg');
				}
				.carte1-li2{
					background-image: url('http://119.23.218.210/allPHP/imgs/bg3.jpeg');
				}
				.carte1-li3{
					background-image: url('http://119.23.218.210/allPHP/imgs/bg1.jpeg');
				}
			}
		}
		.carte-list2{
			width: 100%;
			padding: 10px 0;
			padding-top: 0;
			background: #fff;
			.carte-classify2{
				width: 92%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.carte2-li{
					width: 19%;
					padding: 5px 0;
					box-sizing: border-box;
					/*background: #ddd;*/
					text-align: center;
					i{
						width: 100%;
						font-size: 30px;
					}
					.icon-zhuce1{
						color: #42B983;
					}
					.icon-youhui2{
						color: #f40;
					}
					.icon-tubiaozhizuomoban-{
						color: @BGblue;
					}
					.icon-gerenziliao2{
						color: @BGwarning;
					}
					.icon-gongju1{
						color: @BGdanger;
					}
					.classify-info{
						margin: 0;
						font-size: 14px;
						color: @FTC2;
					}
				}
			}
		}
		.carte-list-div{
			width: 100%;
			height: 10px;
			background: #FAF9F9;
		}
		.carte-list3{
			box-shadow: @BOXcurrency;
		}
	}
	.main-body{
		padding-top: 421px;
		width: 100%;
		background: #fff;
		.carte-list{
			width: 100%;
			.van-cell{
				font-size: 16px;
				.van-cell__left-icon{
					font-size: 20px;
				}
			}
		}
		.supply-title{
			background: #FAF9F9;
			padding: 10px 0;
			border-bottom: 1px solid @BOX3;
			.supply-title-div{
				width: 97%;
				margin: 0 auto;
				color: @FTC2;
				font-size: 15px;
				.icon-redu2{
					color: @BGdanger;
					font-size: 17px;
				}
			}
		}
		.supply-list{
			background: #fff;
			padding: 10px 0;
			.supply-list-div{
				width: 97%;
				margin: 0 auto;
				.supply-no{
					text-align: center;
					font-size: 16px;
					color: @FTC3;
					img{
						width: 100px;
						height: 100px;
						display: block;
						margin: auto;
					}
					p{
						margin: 0;
						padding: 0;
					}
				}
				.supply-ul{
					.info-summary{
						width:100%;
						height: 96px;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						padding:8px;
						color: @FTC2;
						border-bottom:1px solid @BOX4;
						.summary-img{
							width:23%;
							overflow: hidden;
							img{
								width: 100%;
								height: 100%;
							}
						}
						.summary-text{
							width:75%;
							font-size: 15px;
							display: flex;
						    flex-direction: column;
						    justify-content: space-between;
							.info-div{
								.icon-quehuo1{
									color: @BGdanger;
									margin: 10px;
									font-size: 20px;
								}
							}
							.info-status{
								.icon-lixianmoshi{
									font-size: 20px;
									color: @BGdanger;
								}
								.icon-zaixianbaoming{
									font-size: 20px;
									color: @BGsuccess;
								}
							}
						}
					}
				}
			}
		}
	}
	
}
</style>