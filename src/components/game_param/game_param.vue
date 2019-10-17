<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="游戏参数设置"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="good-img-div">
			<div class="good-img">
				<div class="img-title">出奖局数</div>
				<div class="good-imgs">
					<div class="game_sum">
						<div class="game_sum_top" v-if="!sumstatus1">
							<van-stepper v-model="gameData.gameSum" integer :min="0" :max="40"/>
							<van-button size="small" type="primary" v-if="!sumstatus1" @click='handleSumYes1' class='game_sum_yes'>确认</van-button>
						</div>
						<div class="game-text">
							当前设置<span class="game-value">{{gameData.gameSum}}</span>局可以中奖
							<van-button size="small" type="danger" v-if="sumstatus1" @click='handleSumNo1' class='game_sum_no'>修改</van-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="good-img-div">
			<div class="good-img">
				<div class="img-title">游戏时间</div>
				<div class="good-imgs">
					<div class="game-li">
						<div class="game-li-div">
							<span>第一关游戏时间 <span class="game-time">{{gameData.gameTime1}}</span>秒</span>
							<van-stepper v-model="gameData.gameTime1" integer :min="0" :max="40" v-if="!timestatus1"/>
							<van-button size="small" type="danger" v-if="timestatus1" @click='handleTimeNo1'>修改</van-button>
							<van-button size="small" type="primary" v-if="!timestatus1" @click='handleTimeYes1'>确认</van-button>
						</div>
					</div>
					<div class="game-li">
						<div class="game-li-div">
							<span>第二关游戏时间 <span class="game-time">{{gameData.gameTime2}}</span>秒 </span>
							<van-stepper v-model="gameData.gameTime2" integer :min="0" :max="40" v-if="!timestatus2"/>
							<van-button size="small" type="danger" v-if="timestatus2" @click='handleTimeNo2'>修改</van-button>
							<van-button size="small" type="primary" v-if="!timestatus2" @click='handleTimeYes2'>确认</van-button>
						</div>
					</div>
					<div class="game-li">
						<div class="game-li-div">
							<span>第三关游戏时间 <span class="game-time">{{gameData.gameTime3}}</span>秒 </span>
							<van-stepper v-model="gameData.gameTime3" integer :min="0" :max="40" v-if="!timestatus3"/>
							<van-button size="small" type="danger" v-if="timestatus3" @click='handleTimeNo3'>修改</van-button>
							<van-button size="small" type="primary" v-if="!timestatus3" @click='handleTimeYes3'>确认</van-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="good-img-div">
			<div class="good-img">
				<div class="img-title">每关子弹</div>
				<div class="good-imgs">
					<div class="game-li">
						<div class="game-li-div">
							<span>第一关游戏子弹 <span class="game-time">{{gameData.gameclip1}}</span>个</span>
							<van-stepper v-model="gameData.gameclip1" integer :min="0" :max="40" v-if="!clipstatus1"/>
							<van-button size="small" type="danger" v-if="clipstatus1" @click='handleClipNo1'>修改</van-button>
							<van-button size="small" type="primary" v-if="!clipstatus1" @click='handleClipYes1'>确认</van-button>
						</div>
					</div>
					<div class="game-li">
						<div class="game-li-div">
							<span>第二关游戏子弹 <span class="game-time">{{gameData.gameclip2}}</span>个</span>
							<van-stepper v-model="gameData.gameclip2" integer :min="0" :max="40" v-if="!clipstatus2"/>
							<van-button size="small" type="danger" v-if="clipstatus2" @click='handleClipNo2'>修改</van-button>
							<van-button size="small" type="primary" v-if="!clipstatus2" @click='handleClipYes2'>确认</van-button>
						</div>
					</div>
					<div class="game-li">
						<div class="game-li-div">
							<span>第三关游戏子弹 <span class="game-time">{{gameData.gameclip3}}</span>个</span>
							<van-stepper v-model="gameData.gameclip3" integer :min="0" :max="40" v-if="!clipstatus3"/>
							<van-button size="small" type="danger" v-if="clipstatus3" @click='handleClipNo3'>修改</van-button>
							<van-button size="small" type="primary" v-if="!clipstatus3" @click='handleClipYes3'>确认</van-button>
						</div>
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
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
      	gameSum:0,
      	sumstatus1:true,
      	timestatus1:true,
      	timestatus2:true,
      	timestatus3:true,
      	clipstatus1:true,
      	clipstatus2:true,
      	clipstatus3:true,
      	gameData:{
      		gameSum:0,
      		gameTime1:0,
	      	gameTime2:0,
	      	gameTime3:0,
	      	gameclip1:0,
	      	gameclip2:0,
	      	gameclip3:0,
      	}
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//时间和子弹事件 可以优化成一个事件，采用封装的形式，以后再改
	
	//出奖局数设置
	handleSumNo1(){
		this.sumstatus1=!this.sumstatus1;
	},
	handleSumYes1(){
		this.sumstatus1=!this.sumstatus1;
		let gameSum=this.gameData.gameSum
		var fromData=qs.stringify({
			gameSum
		})
	},
	//第一关游戏时间控制
	handleTimeNo1(){
		this.timestatus1=!this.timestatus1;
	},
	handleTimeYes1(){
		this.timestatus1=!this.timestatus1;
		let gameTime1=this.gameData.gameTime1
		var fromData=qs.stringify({
			gameTime1
		})
	},
	//第二关游戏时间控制
	handleTimeNo2(){
		this.timestatus2=!this.timestatus2;
	},
	handleTimeYes2(){
		this.timestatus2=!this.timestatus2;
		let gameTime2=this.gameData.gameTime2
		var fromData=qs.stringify({
			gameTime2
		})
	},
	//第三关游戏时间控制
	handleTimeNo3(){
		this.timestatus3=!this.timestatus3;
	},
	handleTimeYes3(){
		this.timestatus3=!this.timestatus3;
		let gameTime3=this.gameData.gameTime3
		var fromData=qs.stringify({
			gameTime3
		})
	},
	//第一关游戏子弹数量控制
	handleClipNo1(){
		this.clipstatus1=!this.clipstatus1;
	},
	handleClipYes1(){
		this.clipstatus1=!this.clipstatus1;
		let gameclip1=this.gameData.gameclip1
		var fromData=qs.stringify({
			gameclip1
		})
	},
	//第二关游戏子弹数量控制
	handleClipNo2(){
		this.clipstatus2=!this.clipstatus2;
	},
	handleClipYes2(){
		this.clipstatus2=!this.clipstatus2;
		let gameclip2=this.gameData.gameclip2
		var fromData=qs.stringify({
			gameclip2
		})
		// console.log(fromData)
	},
	//第三关游戏子弹数量控制
	handleClipNo3(){
		this.clipstatus3=!this.clipstatus3;
	},
	handleClipYes3(){
		this.clipstatus3=!this.clipstatus3;
		let gameclip3=this.gameData.gameclip3
		var fromData=qs.stringify({
			gameclip3
		})
		// console.log(fromData)
	},
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
.getcell-main{
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
}
</style>