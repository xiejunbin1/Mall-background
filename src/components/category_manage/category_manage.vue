<template>
	<div class="category_manage">
        <div class="goods-batch" v-show="categoryList.length>0">
			<div class="batch-div">
				<div class="batch-title">
					<span v-show='checkboxStatus' @click='checkedAll'>
						<input type='checkbox' class='input-checkbox' v-model='checked'>全选
					</span>
				</div>
				<span>
					<van-button class="batch-btn" size="small" type="primary" @click='handleCheck'>批量删除</van-button>
				</span>
			</div>
		</div>
		<div class="addresslist">
			<div class="addresslist-div" v-for="(item,index) in categoryList" :key="index">
                <div class="good-check" v-show='checkboxStatus'>
                    <input type='checkbox' name='checkboxinput' class='input-checkbox' v-model='checkboxList' :value="item.id">
                </div>
				<div class="li-text">
					<van-tag type="success">{{index+1}}</van-tag>
					<span>商品类别：{{item.name}}</span>
				</div>
				<div class="add-revise">
					<div class="li-handle0"></div>
					<div class="li-handle" @click="modify(item.id,item.name)">
						<i class="icon iconfont icon-shanchu"></i>
						<span style="font-size: 16px;">修改</span>
					</div>
					<div class="li-handle" @click="handleDel(item.id)" :data-index = "item.id">
						<i class="icon iconfont icon-shanchu"></i>
						<span style="font-size: 16px;">删除</span>
					</div>
				</div>
			</div>
            <p class="no_data" v-show="categoryList.length==0">暂无数据</p>
		</div>
		
		<div class="revise-btn" @click="addCategory" v-show="checkboxStatus==false||categoryList.length>0">
			新增商品类别
		</div>
        <div class="revise-btn" @click="handleDel(1)" v-show="checkboxStatus==true">
			删除商品类别
		</div>
		
		<van-dialog
		  v-model="addCategoryShow"
		  show-cancel-button
		  :before-close="addCategoryComfiy"
		>
		  <van-field
		    v-model="category_name"
		    label="商品类别"
		    placeholder="请输入商品类别"
		  />
		</van-dialog>
		
		<van-dialog
		  v-model="modifyCategoryShow"
		  show-cancel-button
		  :before-close="modifyComify"
		>
		  <van-field
		    v-model="revise_add.name"
		    label="商品类别"
		    placeholder="请输入商品类别"
		  />	
		</van-dialog>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import url from '@/urlRouter.js'
import { Dialog } from 'vant';
import {submitTest} from '@/common/js/loginTest.js'
import Footer from '../index/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
    	addCategoryShow:false,
        modifyCategoryShow:false,
        checkboxStatus:false,
        checked:true,
        checkboxList:[],
    	category_name:'',
      	categoryList:[],
      	revise_add:{
      		id:'',
      		name:'',
      	}
    }
  },
  methods:{
	//点击删除
	handleDel(id){
		let _this=this
		if(id!=1){
			_this.checkboxList.push(id)
		}
		Dialog.confirm({
		  title: '确认删除该商品类别',
		}).then(() => {
        	axios({
				method: 'post',
				url:url.adminurl+'/api/ProductTypeApi/Remove',
				data:_this.checkboxList
			}).then(res=>{
				if(res.data.status=='Success'){
					_this.getCategoryList()
					_this.checkboxList=[]
					alert(res.data.msg)
				}else if(res.data.status=='Fail'){
					alert(res.data.msg)
				}
			}).catch(err=>{
				submitTest(err,_this);
			})
		}).catch(() => {
		//   console.log('已经取消');
		});
	},
	//点击增加
	addCategory(){
		this.addCategoryShow=!this.addCategoryShow
	},
	//点击修改
	modify(id,name){
		let _this=this
		_this.revise_add.id=id
		_this.revise_add.name=name
		this.modifyCategoryShow=!this.modifyCategoryShow
		
	},
	// 新增确认事件
	addCategoryComfiy(action, done) {
	  let _this=this;
      if (action === 'confirm') {
        setTimeout(()=>{
        	if(_this.category_name){
        		let fromData=qs.stringify({
					id:'',
					name:_this.category_name
				})	
	        	axios({
					method: 'post',
				    url:url.adminurl+'/api/ProductTypeApi/Edit',
				    data:fromData
				}).then((res)=>{
					if(res.data.status=='Success'){
                        _this.getCategoryList();
                        alert('添加成功')
					}else{
						alert(res.data.msg)
					}
				}).catch(err=>{
					submitTest(err,_this);
				})
	        	done();
        	}else if(!_this.add_address){
        		alert('商品类别不能为空');
        		done();
        	}
        }, 300);
      } else {
        done();
      }
    },
    // 修改确认事件
    modifyComify(action, done){
     let _this=this;
      if (action === 'confirm') {
        setTimeout(()=>{
        	if(_this.revise_add.name){
        		let fromData=qs.stringify({
					name:_this.revise_add.name,
					id:_this.revise_add.id
				})	
	        	axios({
					method: 'post',
				    url:url.adminurl+'/api/ProductTypeApi/Edit',
				    data:fromData
				}).then((res)=>{
					if(res.data.status=='Success'){
						_this.getCategoryList();
						alert('修改成功')
					}else{
						alert(res.data.msg)
					}
				}).catch(err=>{
					submitTest(err,_this);
				})
	        	done();
        	}else if(!_this.revise_add.name){
                alert('商品类别不能为空');
                done();
        	}
        }, 300);
      } else {
        done();
      }
    },
    /**-------- 是否批量删除(start) --------*/
		handleCheck(){
			this.checkboxStatus=!this.checkboxStatus;
			this.checkboxList=[];
		},
		/**-------- 是否批量删除(end) --------*/
    /**-------- 是否选择(start) --------*/

    checkedAll() {
        if (this.checked) {//实现反选
            this.checkboxList = [];
        } else { //实现全选
            this.checkboxList = [];
            this.categoryList.forEach( (item) => {
                this.checkboxList.push(item.id);
            });
        }
    },
     /**-------- 是否选择(end) --------*/
     /**------------- 获取商品类别列表(start) ----------------*/
     getCategoryList(){
        let _this=this
		axios({
			method: 'get',
		    url:url.adminurl+'/api/ProductTypeApi/List?isAll=false',
		}).then((res)=>{
			if(res.status==200){
				_this.categoryList=res.data
			}else{
				alert(res.data.msg)
			}
		}).catch(err=>{
			submitTest(err,_this);
		})
     }
  },
  //实例化
  components:{
  	Footer
  },
   watch: { //深度 watcher
    checkboxList: {
        handler: function (val, oldVal) { 
            if (this.checkboxList.length == this.categoryList.length) {
                this.checked=true;
            } else {
                this.checked=false;
            }
        }		
    }
    },
  //开始创建
  created(){
      this.getCategoryList();
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
.category_manage{
    input[type="checkbox"]{
		-webkit-appearance: none;
		vertical-align:middle;
		margin-top:0;
		background:#fff;
		border:#999 solid 1px;
		border-radius: 3px;
		min-height: 16px;
		min-width: 16px;
	}
	input[type="checkbox"]:checked {
		background: #3190e8;
		position: relative;
	}
	input[type=checkbox]:checked::after{
		content: '';
		top: 0;
		left: 0;
		position: absolute;
		background: transparent;
		border: #fff solid 2px;
		border-top: none;
		border-right: none;
		height: 6px;
		width: 10px;
		-moz-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg); 
		transform: rotate(-45deg);
	}
    .goods-batch{
		background: #fff;
		padding: 5px 0;
		box-shadow: @BOXcurrency;
		position: fixed;
		width: 100%;
		z-index: 10;
		.batch-div{
			width:96%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			.batch-title{
				color: @BGblue;
				line-height: 30px;
				font-size: 16px;
			}
		}
	}
	.addresslist{
        padding-bottom: 110px;
        padding-top: 40px;
        .good-check{
            float: left;
            margin-top: 5px;
            margin-right: 5px;
        }
        .no_data{
            text-align: center;
            font-size: 14px;
            color: #999;
        }
		.addresslist-div{
			padding: 10px 0 8px 0;
			width: 95%;
			margin: 0 auto;
			margin-top: 8px;
			box-shadow: @BOXcurrency;
			.li-text{
				font-size: 16px;
			}
			.add-revise{
				display: flex;
				justify-content: space-between;
			}
			.li-handle0{
				width: 55%;
			}
			.li-handle{
				width: 20%;
				margin-top: 5px;
				text-align: center;
				color: red;
			}
		}
	}
	.revise-btn{
		position: fixed;
		bottom: 61px;
		width: 100%;
		padding: 13px 0;
		background: @BGsuccess;
		text-align: center;
		color: #fff;
		font-size: 16px;
	}
}
</style>