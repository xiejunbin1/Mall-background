<template>
	<div class="getcell-main">
		<img :src="imgUrl" alt="" />
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
      	imgUrl:'',
    }
  },
  methods:{
  	//返回上一页
  	onClickLeft(){
		this.$router.go(-1);
	},
  },
  //实例化
  components:{
  	Footer
  },
  //开始创建
  created(){
  	console.log(this.$route.params.img)
  	if(this.$route.params.img==1){
  		this.imgUrl="http://terminal.dingyou168.xyz/img/fun2.jpg"
  	}else if(this.$route.params.img==2){
  		this.imgUrl="http://terminal.dingyou168.xyz/img/fun1.jpg"
  	}
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
	img{
		width:100%;
	}
}
</style>