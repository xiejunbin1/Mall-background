<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="设备参数修改"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		
		<div class="param-list">
			
			<div class="game-li">
				<div class="game-li-div">
					<span>一局币数<span class="game-time">{{fromData.gameSum}}</span>个</span>
					<van-stepper v-model="fromData.gameSum" integer :min="0" :max="1000"/>
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>游戏背景    <span class="game-time">方案{{fromData.gameBG}}</span></span>
					<van-stepper v-model="fromData.gameBG" integer :min="0" :max="1000"/>
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>购买功能      <span class="game-time" v-if="fromData.gameBuy">当前开</span><span class="game-time" v-if="!fromData.gameBuy">当前关</span></span>
					<van-switch v-model="fromData.gameBuy" />
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>是否试玩      <span class="game-time" v-if="fromData.isPlay">当前开</span><span class="game-time" v-if="!fromData.isPlay">当前关</span></span>
					<van-switch v-model="fromData.isPlay" />
				</div>
			</div>
			
			<!--<div class="game-li" @click="handleDigBuib">
				<div class="game-li-div">
					<span>灯光颜色   <span class="game-time">{{fromData.buib}}</span></span>
					<div class="li-icon">
						<span class="value-check">设置</span>
						<i class="icon iconfont icon-icon11"></i>
					</div>
				</div>
			</div>-->
			
			<div class="game-li">
				<div class="game-li-div">
					<span>自动更新  <span class="game-time" v-if="!fromData.isInfeed">禁用</span><span class="game-time" v-if="fromData.isInfeed">开启</span></span>
					<van-switch v-model="fromData.isInfeed" />
				</div>
			</div>
			
			<!--<div class="game-li" @click="handleDigSpeed">
				<div class="game-li-div">
					<span>圆盘速度   <span class="game-time">{{fromData.speed}}</span></span>
					<div class="li-icon">
						<span class="value-check">设置</span>
						<i class="icon iconfont icon-icon11"></i>
					</div>
				</div>
			</div>-->
			
			<!--<div class="game-li" @click="handleDigMusic">
				<div class="game-li-div">
					<span>游戏音乐   <span class="game-time">{{fromData.music}}</span></span>
					<div class="li-icon">
						<span class="value-check">设置</span>
						<i class="icon iconfont icon-icon11"></i>
					</div>
				</div>
			</div>-->
			
			<div class="game-li">
				<div class="game-li-div">
					<span>广告开关      <span class="game-time" v-if="!fromData.ismusic">当前关</span><span class="game-time" v-if="fromData.ismusic">当前开</span></span>
					<van-switch v-model="fromData.ismusic" />
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>当前设置<span class="game-value">{{gameData.gameSum}}</span>局可以中奖</span>
					<van-stepper v-model="gameData.gameSum" integer :min="0" :max="1000"/>
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>第一关游戏时间 <span class="game-time">{{gameData.gameTime1}}</span>秒</span>
					<van-stepper v-model="gameData.gameTime1" integer :min="0" :max="1000" />
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>第二关游戏时间 <span class="game-time">{{gameData.gameTime2}}</span>秒 </span>
					<van-stepper v-model="gameData.gameTime2" integer :min="0" :max="1000" />
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>第三关游戏时间 <span class="game-time">{{gameData.gameTime3}}</span>秒 </span>
					<van-stepper v-model="gameData.gameTime3" integer :min="0" :max="1000" />
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>第一关游戏子弹 <span class="game-time">{{gameData.gameclip1}}</span>个</span>
					<van-stepper v-model="gameData.gameclip1" integer :min="6" :max="1000" />
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>第二关游戏子弹 <span class="game-time">{{gameData.gameclip2}}</span>个</span>
					<van-stepper v-model="gameData.gameclip2" integer :min="10" :max="1000" />
				</div>
			</div>
			
			<div class="game-li">
				<div class="game-li-div">
					<span>第三关游戏子弹 <span class="game-time">{{gameData.gameclip3}}</span>个</span>
					<van-stepper v-model="gameData.gameclip3" integer :min="12" :max="1000" />
				</div>
			</div>
			
			<!--<div class="game-li">
				<div class="game-li-div">
					<span>音量大小<span class="game-time">当前{{fromData.volume}}</span></span>
					<van-stepper v-model="fromData.volume" integer :min="0" :max="100"/>
				</div>
			</div>-->
			
			<!--<div class="game-li">
				<div class="game-li-div">
					<span>中奖后是否关门      <span class="game-time" v-if="!fromData.isdoor">当前关</span><span class="game-time" v-if="fromData.isdoor">当前开</span></span>
					<van-switch v-model="fromData.isdoor" />
				</div>
			</div>-->
			
			<!--<div class="game-li" @click="handleDigLanguage">
				<div class="game-li-div">
					<span>语言   <span class="game-time">{{fromData.language}}</span></span>
					<div class="li-icon">
						<span class="value-check">设置</span>
						<i class="icon iconfont icon-icon11"></i>
					</div>
				</div>
			</div>-->
			
			<!--<router-link :to="{path:'gameparam',name:'gameparam',params:{mid:manage_id}}" tag="div" class="game-li">
				<div class="game-li-div">
					<span>游戏通关时间及子弹   </span>
					<div class="li-icon">
						<span class="value-check">前往设置</span>
						<i class="icon iconfont icon-icon11"></i>
					</div>
				</div>
			</router-link>-->
			
			<!--<div class="game-li game-li-more">
				<div v-show="moreStatus">
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
				</div>
				<div class="more-title" @click='hanldeMore'>{{more}}</div>
			</div>-->
			
		</div>
		
		<div class="revise-btn" @click='handleRevise'>
			确认提交
		</div>
		
		<!--  下拉颜色选择 -->
		<van-popup v-model="showbuib" position="bottom" :overlay="true">
		  	<van-picker :columns="columns" show-toolbar @confirm='onConfirmbuib' @cancel="onCancelbuib"/>
		</van-popup>
		<!--  下拉速度选择 -->
		<van-popup v-model="showspeed" position="bottom" :overlay="true">
		  	<van-picker :columns="columnspeed" show-toolbar @confirm='onConfirmspeed' @cancel="onCancelspeed"/>
		</van-popup>
		<!--  下拉音乐选择 -->
		<van-popup v-model="showmusic" position="bottom" :overlay="true">
		  	<van-picker :columns="columnmusic" show-toolbar @confirm='onConfirmmusic' @cancel="onCancelmusic"/>
		</van-popup>
		<!--  下拉语言选择 -->
		<van-popup v-model="showlanguage" position="bottom" :overlay="true">
		  	<van-picker :columns="columnlanguage" show-toolbar @confirm='onConfirmlanguage' @cancel="onCancellanguage"/>
		</van-popup>
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
    	newfromData:{},
      	fromData:{
      		gameSum:0,
      		gameBG:1,
      		gameBuy:true,
      		isPlay:true,
      		buib:'紫色',
      		isInfeed:false,
      		speed:'正常',
      		music:'音乐1',
      		ismusic:false,
      		volume:0,
      		isdoor:false,
      		language:'中文',
      	},
      	showbuib:false,
      	showspeed:false,
      	showmusic:false,
      	showlanguage:false,
      	columns:['紫色','红色','黄色','蓝色','橙色'],
      	columnspeed:['缓慢','正常','快速'],
      	columnmusic:['音乐1','音乐2','音乐3','音乐4','音乐5','音乐6'],
      	columnlanguage:['中文','英文'],
      	manage_id:'',
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
      	},
      	more:'更多设置',
      	moreStatus:false,
      	revise_id:0,
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	//查看更多事件
	hanldeMore(){
  		if(this.moreStatus){
  			this.more='更多设置'
  		}else{
  			this.more='收起'
  		}
  		this.moreStatus=!this.moreStatus;
  	},
	//确认提交事件
	handleRevise(){
//		let n=this.newfromData,
//			_this=this,
//			k=this.fromData;
//		//vue钩子函数页面初始化 请求数据后赋值
//
//		var arr=[];
//		for (let i in this.fromData) {
//		    arr[i]=this.fromData[i];
//		}
////		console.log(arr)
//		
//		var newarr=[];
//		for (let i in this.newfromData) {
//		    newarr[i]=this.newfromData[i]
//		}
//		
//		var obj={};
//		for(let i in arr){
//			if(arr[i]!=newarr[i]){
//				obj[i]=arr[i]
//			}
//		}
//		console.log(obj)
		let _this=this;
		let formData=qs.stringify({
			machineNum:this.$route.params.mid,   //设备编号
			id:this.revise_id,   //修改id，0为新增，其他修改
			perRoundCion:this.fromData.gameSum,  //一局币数
			gameBackground:this.fromData.gameBG,   //游戏背景
			buyOnOff:this.fromData.gameBuy,   //购买功能
			tryGameOnOff:this.fromData.isPlay,   //是否试玩
			appAutoUpdate:this.fromData.isInfeed,   //自动更新
			advertOnOff:this.fromData.ismusic,   //广告开关
			prizeRound:this.gameData.gameSum,   //多少局中奖
			round1Time:this.gameData.gameTime1,   //第一关游戏时间
			round2Time:this.gameData.gameTime2,   //第二关游戏时间
			round3Time:this.gameData.gameTime3,   //第三关游戏时间
			round1Count:this.gameData.gameclip1,   //第一关游戏子弹
			round2Count:this.gameData.gameclip2,   //第二关游戏子弹
			round3Count:this.gameData.gameclip3   //第三关游戏子弹
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
	//灯光下拉窗口
	handleDigBuib(){
   		this.showbuib=!this.showbuib;
   	},
   	onConfirmbuib(value){
   		this.fromData.buib=value;
   		this.showbuib=!this.showbuib;
   	},
   	onCancelbuib(){
   		this.showbuib=!this.showbuib;
   	},
   	//速度控制选择
   	handleDigSpeed(){
   		this.showspeed=!this.showspeed
   	},
   	onConfirmspeed(value){
   		this.fromData.speed=value;
   		this.showspeed=!this.showspeed
   	},
   	onCancelspeed(){
   		this.showspeed=!this.showspeed
   	},
   	//音乐控制选择
   	handleDigMusic(){
   		this.showmusic=!this.showmusic
   	},
   	onConfirmmusic(value){
   		this.fromData.music=value;
   		this.showmusic=!this.showmusic
   	},
   	onCancelmusic(){
   		this.showmusic=!this.showmusic
   	},
   	//语言控制选择
   	handleDigLanguage(){
   		this.showlanguage=!this.showlanguage
   	},
   	onConfirmlanguage(value){
   		this.fromData.language=value;
   		this.showlanguage=!this.showlanguage
   	},
   	onCancellanguage(){
   		this.showlanguage=!this.showlanguage
   	},
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