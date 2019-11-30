<template>
	<div class="getcell-main">
		
		<div class="param-list">
			
			<div class="game-li">
				<div class="game-li-div">
					<span>游戏币数</span>
					<van-stepper v-model="fromData.gameSum" integer :min="0" :max="1000"/>
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>小扭蛋机购买金额</span></span>
					<van-stepper v-model="fromData.gameTime1" integer :min="0" :max="1000"/>
				</div>
			</div>
            <div class="game-li">
				<div class="game-li-div">
					<span>小扭蛋机游戏金额</span></span>
					<van-stepper v-model="fromData.gameTime2" integer :min="0" :max="1000"/>
				</div>
			</div>

            <div class="game-li">
				<div class="game-li-div">
					<span>大扭蛋机购买金额</span></span>
					<van-stepper v-model="fromData.gameTime3" integer :min="0" :max="1000"/>
				</div>
			</div>

            <div class="game-li">
				<div class="game-li-div">
					<span>大扭蛋机游戏金额</span></span>
					<van-stepper v-model="fromData.gameTime4" integer :min="0" :max="1000"/>
				</div>
			</div>
		</div>
		<div class="revise-btn" @click='handleRevise'>
			确认提交
		</div>
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
    	newfromData:{},
      	fromData:{
      		
      	},
      
      	gameData:{
      		gameSum:0,
      		gameTime1:0,
	      	gameTime2:0,
	      	gameTime3:0,
	      	gameclip1:0,
	      	gameclip2:0,
	      	gameclip3:0,
      	},
      
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	
	//确认提交事件
	handleRevise(){

		let _this=this;
		let formData=qs.stringify({
			
		})
	  	
	  	var b=this.gameData;
		axios({
			method: 'post',
		    url:'/api/KouHArgsApi/Save',
		    data:formData, 
		}).then((res)=>{
	      	alert(res.data.msg)
		}).catch(err=>{
			submitTest(err,_this);
		})
	},
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	let _this=this;
  	this.manage_id=this.$route.params.mid
  	let idData=qs.stringify({
			manage_id:this.$route.params.mid
		})
  	axios({
		method:'get',
		url:'/api/KouHArgsApi/Detail?machineNum='+this.$route.params.mid,
		responseType:'json'
	}).then((res)=>{
		if(res.data!=''||res.data!=null){
			let n=res.data;
			this.revise_id=n.id;   //修改id，0为新增，其他修改
			this.fromData.gameSum=n.perRoundCion;  //一局币数
			this.fromData.gameBG=n.gameBackground;   //游戏背景
			this.fromData.gameBuy=n.buyOnOff;   //购买功能
			this.fromData.isPlay=n.tryGameOnOff;   //是否试玩
			this.fromData.isInfeed=n.appAutoUpdate;   //自动更新
			this.fromData.ismusic=n.advertOnOff ;   //广告开关
			this.gameData.gameSum=n.prizeRound;   //多少局中奖
			this.gameData.gameTime1=n.round1Time;   //第一关游戏时间
			this.gameData.gameTime2=n.round2Time;   //第二关游戏时间
			this.gameData.gameTime3=n.round3Time;   //第三关游戏时间
			this.gameData.gameclip1=n.round1Count;   //第一关游戏子弹
			this.gameData.gameclip2=n.round2Count;   //第二关游戏子弹
			this.gameData.gameclip3=n.round3Count;   //第三关游戏子弹
		}else{
			this.revise_id=0;
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
.psan{
	padding-bottom: 50px;
}
.getcell-main{
	background: #fff;
	.param-list{
		padding-bottom: 50px;
		.game-li{
			padding: 10px 0;
			border-bottom:1px solid @BOX3;
			.more-title{
				text-align: center;
				padding: 8px 0;
				font-size: 16px;
				color: @BGblue;
				border-bottom:1px solid @BOX3;
			}
			.good-img-div{
				margin-top: 20px;
				text-align: center;
				.good-img{
					background: #fff;
					width: 95%;
					margin: 0 auto;
					border: 1px solid @BOX3;
					box-shadow: @BOXcurrency;
					border-radius: 5px;
					.img-title{
						width: 130px;
						margin: 0 auto;
						background: #fff;
						z-index: 10;
						padding-bottom: 10px;
						color: @FTC1;
						font-size: 20px;
						font-weight: 600;
						margin-top: -14px;
						
					}
					.good-imgs{
						overflow: hidden;
						width: 98%;
						max-height: 200px;
						margin: 0 auto;
						.bulb-value{
							width: 100%;
							border: none;
						}
						.game_sum{
							.game_sum_top{
								display: flex;
								justify-content: center;
								.game_sum_yes{
									margin-left: 15px;
								}
							}
							.game-text{
								font-size: 18px;
								padding: 10px 0;
								.game_sum_no{
									margin-left: 15px;
								}
								.game-value{
									color: @BGdanger;
								}
							}
						}
						.game-li{
							padding: 10px 0;
							.game-li-div{
								font-size: 16px;
								width: 97%;
								margin: 0 auto;
								display: flex;
								justify-content: space-between;
								.game-time{
									color: @BGdanger;
								}
							}
						}
					}
				}
			}
			.game-li-div{
				font-size:16px;
				width: 97%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.game-time{
					color: @BGdanger;
				}
				.li-icon{
					width: 30%;
					text-align: right;
				}
			}
		}
		.game-li-more{
			padding-bottom: 73px;
			border-bottom: none;
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
		z-index: 100;
	}
}
</style>