<template>
    <div class="change-statements_del">
        <div class="choose_time">
            <span>请选择时间:</span>
            <span @click="handletime1">{{str_time}}</span>
            <span style="color: #606266;">&nbsp;至&nbsp;</span>
            <span @click="handletime2">{{end_time}}</span>
        </div>
       <div class="title">
           <div class="item">商品分类</div>
           <div class="item item_img">商品图片</div>
           <div class="item item_count">件数</div>
           <div class="item">销售金额</div>
           <div class="item item_cost">成本</div>
           <div class="item">利润</div>
       </div>
       <div class="content">
            <div class="content_list" v-for="(item,index) in statements_list" :key="index">
                <div class="item">{{item.productType}}</div>
                <div class="item_img">
                    <img :src="item.productImg" alt="">
                    <p class="goods_name">{{item.productTitle}}</p>
                    </div>
                <div class="item item_count">{{item.count}}</div>
                <div class="item">{{item.amount}}</div>
                <div class="item item_cost">{{item.cost}}</div>
                <div class="item">{{item.profit}}</div>
            </div>
            <div class="no_data" v-show="statements_list.length==0">暂无数据</div>
       </div>
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
import {submitTest} from '@/common/js/loginTest.js'
import url from '@/urlRouter.js'
import { Dialog } from 'vant';
import {toMoney} from '@/moneyFilter.js'
import Footer from '../index/index'
export default {
    data () {
        return {
            startShow:false,
            endShow:false,
            currentDate1: new Date(),
            maxDate2: new Date(),
            currentDate2: new Date(),
            str_time:'',
            end_time:'',
            str_time_t:new Date().getTime(),
            end_time_t:new Date().getTime(),
            statements_list:[]
        }
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
               this.getDelData(this.$route.params.addressId,this.str_time,this.end_time,this.$route.params.machineNum)
            }else{
                alert('不支持查询2019年7月10日之前的财务报表')
                this.startShow=true;
            }
        },
        endShowConfirm(value){
            let _this=this
            if(this.str_time_t<=value.getTime()+86400*1000){
                this.endShow=!this.endShow;
                this.end_time_t=value.getTime()
                this.end_time=value.toLocaleDateString() 
                this.getDelData(this.$route.params.addressId,this.str_time,this.end_time,this.$route.params.machineNum)
            }else{
                alert('结束日期不低于开始日期')
                 this.endShow=true;
            }
        },
        //获取列表数据
        getDelData(addressId,str_time,end_time,machineNum){
            let _this=this;
            if(new Date(str_time).getTime()+86400*1000<new Date("2019/7/10").getTime()+86400*1000){
                str_time="2019/7/10"
                axios({
                method:'get',
                    url:url.adminurl+'/api/Income/IncomeMachineSales?beginTime='+str_time+'&endTime='+end_time+'&addressId='+addressId+'&machineNum='+machineNum,
                    responseType:'json'
                }).then((res)=>{
                    this.statements_list=res.data
                    localStorage.setItem("str_time",str_time)
                    localStorage.setItem("end_time",end_time)
                }).catch(err=>{
                    submitTest(err,_this);
                })
            }else{
                axios({
                method:'get',
                    url:url.adminurl+'/api/Income/IncomeMachineSales?beginTime='+str_time+'&endTime='+end_time+'&addressId='+addressId+'&machineNum='+machineNum,
                    responseType:'json'
                }).then((res)=>{
                    this.statements_list=res.data
                    localStorage.setItem("str_time",str_time)
                    localStorage.setItem("end_time",end_time)
                }).catch(err=>{
                    submitTest(err,_this);
                })
            }
        }  
    },
    created () {
       this.str_time=localStorage.getItem("str_time")
       this.end_time=localStorage.getItem("end_time")
       this.getDelData(this.$route.params.addressId,this.str_time,this.end_time,this.$route.params.machineNum);  
    },
    components: {
        Footer
    }
}
</script>

<style lang="less">
.change-statements_del{
    .choose_time{
        background: #fff;
        padding: 15px 10px;
        font-size: 16px;
        border-bottom: 1px solid #ebeef5;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 222;
        span:nth-child(1){
            padding: 0 10px 0 0;
        }
        span:nth-child(2),span:nth-child(4){
            color: #409eff;
        }
    }
    .title{
        width: 100%;
        display: flex;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #409eff;
        color: #fff;
        border: 1px solid #eee;
        position: fixed;
        top: 52px;
        left: 0;
        .item{
            width: 20%;
            height: 30px;
            line-height: 30px;
            border-right: 1px solid #eee;
            margin: 10px 0;
            font-size: 14px;
        }
        .item_img{
            width: 30%;
        }
        .item_count,.item_cost{
            width: 15%;
        }
    }
    .content{
        margin: 110px 0 60px;
        .content_list{
            width: 100%;
            display: flex;
            border-bottom: 1px solid #eee;
            .item{
                width: 20%;
                text-align: center;
                height: 100px;
                line-height: 100px;
                font-size: 14px;
            }
            .item_count,.item_cost{
                width: 15%;
            }
            .item_img{
                width: 30%;
                text-align: center;
                font-size: 14px;
                height: 100px;
                img{
                    width: 60%;
                    height: 40px;
                    vertical-align: middle;
                    margin: 12px 0 5px;
                }
                .goods_name{
                    margin: 0;
                    font-size: 12px;
                }
            }
        }
        .no_data{
            width: 100%;
            text-align: center;
            font-size: 16px;
            color: #000;
            margin-top: 200px;
        }
    }
}
</style>

