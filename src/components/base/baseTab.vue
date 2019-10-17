<template>
    <div class="baseTab">
        <div class="per_title">设备功能操作</div>
		<div class="per_li">
			<div class="li_box">
				<div class="box_1" @click="base_inLibrary">
					<i class="icon iconfont icon-shebeiguanli1"></i>
					设备进库
				</div>
				<div class="box_2" @click="base_unbund">
					<i class="icon iconfont icon-lixianbaobiao" ></i>
					设备解绑
				</div>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        //设备进库
        base_inLibrary(){
            this.$router.push({path:'/base_inLibrary'})
        },
        //设备解绑
        base_unbund(){
            this.$router.push({path:'/base_unbund'})
        }
    }
}
</script>

<style lang="less">
@import '../../style/main.less';
.baseTab{
    .per_title{
		font-size:16px;
		box-sizing: border-box;
		width: 100%;
		padding: 10px;
		border-bottom: 1px solid @BOX3;
		background: #fff;
	}
	.per_li{
		padding: 5px 0;
		border-bottom: 1px solid @BOX3;
		background: #fff;
		.li_box{
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.box_1{
				border-right: 1px solid @BOX3;
				width: 50%;
				box-sizing: border-box;
				text-align: left;
				padding: 10px 10px;
				font-size: 14px;
				.icon{
					color: @BGblue;
					font-size: 18px;
				}
			}
			.box_2{
				font-size: 14px;
				width: 50%;
				box-sizing: border-box;
				text-align: left;
				padding: 10px 10px;
				.icon{
					color: @BGblue;
					font-size: 18px;
				}
			}
		}
	}
}
</style>

