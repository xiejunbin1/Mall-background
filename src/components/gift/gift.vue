<template>
	<div class="main">
		{{msg1}}
	</div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';

export default {
  name: 'gift',
  data () {
    return {
      msg1: '移动端管理后台主页',
      msg2: '从这里出发'
    }
  },
  methods:{
  	
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
.main{
	
}
</style>