<template>
	<div class="getcell-main">
		<van-nav-bar
		  title="地址列表"
		  left-text="返回"
		  left-arrow
		  @click-left="onClickLeft"
		  class='goods-title'
		/>
		<div class="addresslist">
			<div class="addresslist-div" v-for="(item,index) in addressData" :data-values='item.address_value' :data-values='item.address_id' @click="handleSelect">
				<div class="li-text">
					<van-tag type="success">{{index+1}}</van-tag>
					<span>{{item.address_value}}</span>
				</div>
				<div class="li-handle" @click="handleDel" :data-indexs = "item.address_id">
					<i class="icon iconfont icon-shanchu"></i>
					删除
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import { Dialog } from 'vant';

export default {
  name: 'HelloWorld',
  data () {
    return {
    	show:false,
    	add_address:'',
      	addressData:[{
      		address_id:1,
      		address_value:'广东省番禺区城市广场1'
      	},{
      		address_id:2,
      		address_value:'广东省番禺区城市广场2'
      	},{
      		address_id:3,
      		address_value:'广东省番禺区城市广场3'
      	},]
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
	handleDel(e){
		const indexs = e.currentTarget.dataset.indexs;
		Dialog.confirm({
		  title: '确认删除该地址',
		}).then(() => {
		}).catch(() => {
		});
	},
	handleSelect(e){
		const values = e.currentTarget.dataset.values;
		localStorage.setItem('address_value',values)
		this.$router.go(-1);
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
.span{
	padding: 10px 0;
}
.getcell-main{
	.addresslist{
		.addresslist-div{
			padding: 10px 0 8px 0;
			width: 95%;
			margin: 0 auto;
			margin-top: 8px;
			box-shadow: @BOXcurrency;
			.li-text{
				font-size: 16px;
			}
			.li-handle{
				margin-left: 78%;
				width: 20%;
				margin-top: 5px;
				text-align: center;
				color: red;
			}
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
	}
}
</style>