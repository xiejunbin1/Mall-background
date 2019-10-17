<template>
	<div class="getcell-main">
		<!--<van-nav-bar
		  title="货道预览"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>-->
		<div class="getcell-body">
			<div class="title-row">
				<!--<div class="row-name">格</div>-->
				<!--<div class="row-sum" v-for='(item,index) in 9' :key='index'>{{item}}</div>-->
				<div class="row-sum row-sum1">1</div><div class="row-sum">2</div><div class="row-sum">3</div><div class="row-sum">4</div><div class="row-sum">5</div><div class="row-sum">6</div>
				<div class="row-sum">7</div><div class="row-sum">8</div>
			</div>
			<div class="title-colimn">
				<div class="colimn-names">层</div>
				<!--<div class="colimn-sum" v-for='(item,index) in colimnlist' :key='index'>{{item}}</div>-->
				<div class="colimn-sum colimn-sum1">A</div><div class="colimn-sum">B</div><div class="colimn-sum">C</div><div class="colimn-sum">D</div><div class="colimn-sum">E</div>
				<div class="colimn-sum">F</div><div class="colimn-sum">G</div><div class="colimn-sum">H</div><div class="colimn-sum">I</div>
			</div>
			<div class="getcell-list">
				<div class="list-colimn" v-for='(item,indexs) in listData' :index='indexs'>
					<div class="list-row" v-for='(vo,index) in item.data' :index='index' @click="handlecell" :data-indexs='indexs' :data-index='index'>{{vo}}</div>
				</div>
			</div>
			<div class="cell-info">
				<div class="info-div">
					<span class="cell-id">货道编号：0-{{cellIndexsname}}{{cellIndex}}</span>
					<span class="cell-sum">映射货道： <i>{{shine}}</i></span>
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
    	shine:'',   //选中映射货道
    	cellIndex:0,  //选中格子
    	cellIndexs:0,  //选中货道标记
    	cellIndexsname:'',   //选中货道名称
    	colimnlist:['A','B','C','D','E','F','G','F','G','H','I'],
      	listData:[{
      		title:'A',
      		data:[1,2,3,4,5,6]
      	},{
      		title:'B',
      		data:[7,8,9,10,11]
      	},{
      		title:'C',
      		data:[12,13,14,15,16,17,18]
      	},{
      		title:'D',
      		data:[19,20,21,22]
      	},{
      		title:'E',
      		data:[23,24,25,26]
      	},{
      		title:'F',
      		data:[27,28,29,30,31,32]
      	},{
      		title:'G',
      		data:[33,34,35,36]
      	},]
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	handlecell(e){
		const index = parseInt(e.currentTarget.dataset.index)+1;
		const indexs = parseInt(e.currentTarget.dataset.indexs)+1;
  		this.cellIndex=index;
  		this.cellIndexs=indexs;
  		this.cellIndexsname=this.listData[parseInt(e.currentTarget.dataset.indexs)].title;
  		this.shine=this.listData[parseInt(e.currentTarget.dataset.indexs)].data[parseInt(e.currentTarget.dataset.index)];
//		console.log(this.cellIndex,this.cellIndexs);
		
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
	border-radius: 10px;
}
.getcell-main{
	.getcell-body{
		margin-top: 10px;
		position: absolute;
		.title-row{
			margin-left: 30px;
			color: #fff;
			background: @BGGrey2;
			border-radius: 10px;
			padding: 1px 0;
			height: 18px;
			/*width: 100%;*/
			box-sizing: border-box;
			.row-name{
				color: @BGblue;
				width: 20px;
				float: left;
			}
			.row-sum{
				box-sizing: border-box;
				width: 40px;
				text-align: center;
				float: left;
				
			}
			.row-sum1{
				margin-left: 0px;
			}
		}
		.title-colimn{
			box-sizing: border-box;
			color: #fff;
			background: @BGGrey2;
			border-radius: 10px;
			width: 16px;
			height: 600px;
			position: relative;
			left: 10px;
			top: -18px;
			.colimn-names{
				color: @BGblue;
				height: 18px;
				width: 100%;
				/*line-height: 18px;*/
				/*margin-top: -18px;*/
			}
			.colimn-sum{
				width: 100%;
				box-sizing: border-box;
				height: 50px;
				text-align: center;
				float: left;
				line-height: 50px;
			}
			.colimn-sum1{
				margin-top: 0px;
			}
		}
		.getcell-list{
			box-sizing: border-box;
			width: 95%;
			height: 600px;
			position: absolute;
			top: 20px;
			left: 28px;
			.list-colimn{
				float:left;
				width:100%;
				.list-row{
					float: left;
					margin-left: 5px;
					margin-top: 13px;
					box-sizing: border-box;
					width: 35px;
					height: 35px;
					line-height: 35px;
					text-align: center;
					border: 2px solid @BOX2;
				}
			}
		}
		.cell-info{
			width: 100%;
			position: fixed;
			bottom: 10px;
			.info-div{
				width: 90%;
				margin: 0 auto;
				padding: 10px 8px;
				border-radius: 5px;
				box-shadow:0 0 1px #000;
				font-size: 16px;
				.cell-sum{
					margin-left: 30px;
					i{
						color: @BGblue;
					}
				}
			}
		}
		.cell-bg{
			background: @BGblue;
		}
	}
}
</style>