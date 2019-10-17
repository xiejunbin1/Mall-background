<template>
    <div class="changeStatements">
        <van-tabs :active="active" @click="onClick" class="statement_content">
            <van-tab :title="item.day" v-for="(item,index) in tabs" :key="index">
                <div class="choose_time">
                    <span>请选择时间:</span>
                    <span @click="handletime1">{{str_time}}</span>
                    <span style="color: #606266;">&nbsp;至&nbsp;</span>
                    <span @click="handletime2">{{end_time}}</span>
                </div>
                <div class="theTotalPrice">
                    <b class="jiage">线上总收益(元):</b>
                    <b class="qian">{{ zhongjia }}</b>
                </div>
                <div v-if="index==0">
                    <van-collapse v-model="activeNames" class="content">
                        <van-collapse-item :title="item.addressName" :name="index+1" v-for="(item,index) in addressList" :key="index">
                            <div class="site_list" @click="ChangeStatementsList(item.addressId)">
                                <div class="all_order order_item_box">
                                    <p class="title">总销售金额</p>
                                    <p class="num">{{item.amount}}</p>
                                </div>
                                <div class="all_cost order_item_box">
                                    <p class="title">总成本</p>
                                    <p class="num">{{item.cost}}</p>
                                </div>
                                <div class="all_profits order_item_box">
                                    <p class="title">总利润</p>
                                    <p class="num">{{item.profit}}</p>
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                </div>
                <div v-if="index==1">
                    <van-collapse v-model="activeNames" class="content">
                        <van-collapse-item :title="item.addressName" :name="index+1" v-for="(item,index) in addressList" :key="index">
                            <div class="site_list" @click="ChangeStatementsList(item.addressId)">
                                <div class="all_order order_item_box">
                                    <p class="title">总销售金额</p>
                                    <p class="num">{{item.amount}}</p>
                                </div>
                                <div class="all_cost order_item_box">
                                    <p class="title">总成本</p>
                                    <p class="num">{{item.cost}}</p>
                                </div>
                                <div class="all_profits order_item_box">
                                    <p class="title">总利润</p>
                                    <p class="num">{{item.profit}}</p>
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                </div>
                <!-- <div v-if="index==2">
                    <van-collapse v-model="activeNames" class="content">
                        <van-collapse-item :title="item.addressName" :name="index+1" v-for="(item,index) in addressList" :key="index">
                            <div class="site_list" @click="ChangeStatementsList">
                                <div class="all_order order_item_box">
                                    <p class="title">总销售金额</p>
                                    <p class="num">{{item.amount}}</p>
                                </div>
                                <div class="all_cost order_item_box">
                                    <p class="title">总成本</p>
                                    <p class="num">{{item.cost}}</p>
                                </div>
                                <div class="all_profits order_item_box">
                                    <p class="title">总利润</p>
                                    <p class="num">{{item.profit}}</p>
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                </div>
                <div v-if="index==3">
                    <van-collapse v-model="activeNames" class="content">
                        <van-collapse-item :title="item.addressName" :name="index+1" v-for="(item,index) in addressList" :key="index">
                            <div class="site_list" @click="ChangeStatementsList">
                                <div class="all_order order_item_box">
                                    <p class="title">总销售金额</p>
                                    <p class="num">{{item.amount}}</p>
                                </div>
                                <div class="all_cost order_item_box">
                                    <p class="title">总成本</p>
                                    <p class="num">{{item.cost}}</p>
                                </div>
                                <div class="all_profits order_item_box">
                                    <p class="title">总利润</p>
                                    <p class="num">{{item.profit}}</p>
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                </div> -->

            </van-tab>
      </van-tabs>
      	<van-popup v-model="startShow" position="bottom" :overlay="true">
		  	<van-datetime-picker
			  v-model="currentDate1"
			  type="date"
			  @confirm='startShowConfirm'
			  :max-date="maxDate2"
			/>
		</van-popup>
		<van-popup v-model="endShow" position="bottom" :overlay="true">
		  	<van-datetime-picker
			  v-model="currentDate2"
			  type="date"
			  @confirm='endShowConfirm'
			  :max-date="maxDate2"
			/>
		</van-popup>
        <Footer></Footer>
    </div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import { Uploader } from 'vant';
import {submitTest} from '@/common/js/loginTest.js'
import { Dialog } from 'vant';
import {toMoney} from '@/moneyFilter.js'
import url from '@/urlRouter.js'
import Footer from '../index/index'
export default {
    data(){
        return{
           // activeName:'1',
           active: 0,
          // tabs:[{"day":"今天"},{"day":"昨天"},{"day":"一周内"},{"day":"一月内"}],
          tabs:[{"day":"今天"},{"day":"昨天"}],
           startShow:false,
           endShow:false,
           currentDate1: new Date(),
           maxDate2: new Date(),
           currentDate2: new Date(),
           str_time:'',
           end_time:'',
           str_time_t:new Date().getTime(),
           end_time_t:new Date().getTime(),
           activeNames: [1],
           addressList:[],
           zhongjia:0,//总收益
        }
    },
    components: {
      Footer  
    },
    methods: {
        handletime1(){
            this.startShow=!this.startShow;
        },
        handletime2(){
            this.endShow=!this.endShow;
        },
        startShowConfirm(value){
            if(new Date("2019/7/10").getTime()+86400*1000<=value.getTime()+86400*1000){
                this.startShow=!this.startShow;
                this.str_time_t=value.getTime()
                this.str_time=value.toLocaleDateString()
                this.getData(this.str_time,this.end_time)
            }else{
                alert('不支持查询2019年7月10日之前的财务报表')
                this.startShow=true;
            }
        },
        endShowConfirm(value){
            if(this.str_time_t<=value.getTime()+86400*1000){
                this.endShow=!this.endShow;
                this.end_time_t=value.getTime()
                this.end_time=value.toLocaleDateString() 
                this.getData(this.str_time,this.end_time)
            }else{
                alert('结束日期不低于开始日期')
                 this.endShow=true;
            }
        },
        onClick(index, title){
            let _this=this;
            if(index==0){
                this.str_time=new Date().toLocaleDateString()
                this.end_time=new Date().toLocaleDateString()
                this.getData(this.str_time,this.end_time)
            }else if(index==1){
                let beginTime=new Date(new Date().getTime() - 24*60*60*1000).toLocaleDateString();
                let endTime=new Date(new Date().getTime() - 24*60*60*1000).toLocaleDateString();
                this.str_time=beginTime
                this.end_time=endTime
                this.getData(this.str_time,this.end_time)
            }else if(index==2){
                let beginTime=new Date(new Date().getTime() - 6*24*60*60*1000).toLocaleDateString();
                let endTime=new Date(new Date().getTime()).toLocaleDateString();
                this.str_time=beginTime
                this.end_time=endTime
                this.getData(this.str_time,this.end_time)
            }else if(index==3){
                let beginTime=new Date(new Date().getTime() - 29*24*60*60*1000).toLocaleDateString();
                let endTime=new Date(new Date().getTime()).toLocaleDateString();
                this.str_time=beginTime
                this.end_time=endTime
                this.getData(this.str_time,this.end_time)
            }
        },
        ChangeStatementsList(addressId){
            this.$router.push({name:'ChangeStatementsList',params:{addressId:addressId}});
        },
        //获取场地列表数据
        getData(str_time,end_time){
            let _this=this;
            if(new Date(str_time).getTime()+86400*1000<new Date("2019/7/10").getTime()+86400*1000){
                str_time="2019/7/10"
                axios({
                method:'get',
                    url:url.adminurl+'/api/Income/IncomeAddress?&beginTime='+str_time+'&endTime='+end_time,
                    responseType:'json'
                }).then((res)=>{
                    this.addressList=res.data.list
                    this.zhongjia = res.data.total_amount
                    localStorage.setItem("str_time",str_time)
                    localStorage.setItem("end_time",end_time)
                }).catch(err=>{
                    submitTest(err,_this);
                })
            }else{
                axios({
                method:'get',
                    url:url.adminurl+'/api/Income/IncomeAddress?&beginTime='+str_time+'&endTime='+end_time,
                    responseType:'json'
                }).then((res)=>{
                    this.addressList=res.data.list
                    this.zhongjia = res.data.total_amount
                    localStorage.setItem("str_time",str_time)
                    localStorage.setItem("end_time",end_time)
                }).catch(err=>{
                    submitTest(err,_this);
                })
            }
        }
    },
    created () {
        const promise = new Promise((resolve,reject)=>{
            let nowtime=new Date();
            resolve(nowtime)
        })
        promise.then((nowtime)=>{
            this.str_time=nowtime.toLocaleDateString();
            this.end_time=nowtime.toLocaleDateString();
            this.getData(this.str_time,this.end_time)
        })
    }
}
</script>

<style lang="less">
@import '../../style/main.less';
.changeStatements{
    .choose_time{
        background: #fff;
        padding: 15px 10px;
        font-size: 16px;
        border-bottom: 1px solid #ebeef5;
        span:nth-child(1){
            padding: 0 10px 0 0;
        }
        span:nth-child(2),span:nth-child(4){
            color: #409eff;
        }
    }
    .content{
        margin-bottom: 60px;
        .van-cell__title{
            font-size: 16px;
        }
    }
    .van-collapse-item__content{
        padding: 0;
    }
    .site_list{
        display: flex;
        width: 100%;
        text-align: center;
        .order_item_box{
            width: 33.3%;
            .title,.num{
                font-size: 16px;
                color: #000;
            }
        }
    }

}
.theTotalPrice{
    width: 100%;
    background: #FFFFCC;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .jiage{
        font-size: 18px;
        color: #606266;
        text-align: center;
    }
    .qian{
        text-align: center;
        color: #f56c6c;
        margin-top: 10px;
        font-size: 18px;
    }
}
</style>
