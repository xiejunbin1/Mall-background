<template>  
    <div id="bow">
        <van-tabs type="line" class="van-tabs" :sticky="sticky" @click="onClick">
            <van-tab :title="name">
                <!-- <zhujian v-on:event="event"  :str_time="str_time1" :end_time="end_time1" itist = "0"></zhujian> -->
                <zuJian v-on:event="event" v-on:onClickNumber="onClickNumber"  :str_time="str_time1" :end_time="end_time1" :list="List" :record="recordNumber" :numberOfPages="numberOfPages"></zuJian>
            </van-tab>
            <van-tab :title="name1">
                <zhujian v-on:event="event" v-on:eventLuckyDraw="eventLuckyDraw" v-on:onClickNumber1="onClickNumber1"  :str_time="str_time1" :end_time="end_time1" :stick="stick" :theGameDetails="theGameDetails" :record="recordNumber" :numberOfPages="numberOfPages" itist = "1"></zhujian>
            </van-tab>
            <van-tab :title="name2">
                <zhujian v-on:event="event"  :str_time="str_time1" :end_time="end_time1" itist = "2"></zhujian>
                <div class="theTotalNumberOf">
                    <span>总条数:<div>{{ recordNumber }}</div></span>
                    <!-- <span>总金额:<div>100</div></span>     -->
                </div>
                <div class="top-up" v-for="(value,index) in listData" :key="index">
                    <div class="top-up3">
                        <div class="IMG">
                            <img src="../../common/img/chongzhi.png"   style="width: 40px;height: 40px;"  alt="">
                        </div>
                        <div class="class">
                            <div class="top-up1">
                                <div class="name">{{ value.id }}</div>
                                <div class="shijian">{{ value.createTime }}</div>
                            </div>
                            <div class="top-up2">
                                充值:{{ value.amount }}
                            </div>
                        </div>
                    </div>
                    <div class="theSerialNumber">
                        <div >序号:{{ value.id }}</div>
                        <div >订单号:{{ value.outOrderNo }}</div>
                    </div>
                </div>
                <div class="aaa"></div>
                <van-pagination 
                    v-model="currentPage" 
                    :page-count='numberOfPages'
                    :show-page-size="3" 
                    force-ellipses
                    @change="onClickNumber"
                    class="van-pagination"
                />
            </van-tab>
            <van-tab :title="name3">
               <zhujian v-on:event="event"  :str_time="str_time1" :end_time="end_time1" itist = "3"></zhujian>
               <div class="theTotalNumberOf">
                    <span>总条数:<div>{{ recordNumber }}</div></span>
                    <span>总金额:<div>{{ totalAmount }}</div></span>    
                </div>
                <div class="top-up" v-for="(value,index) in listData" :key="index">
                    <div class="top-up3">
                        <div class="IMG">
                            <img src="../../common/img/tuikuan.png"   style="width: 40px;height: 40px;"  alt="">
                        </div>
                        <div class="class">
                            <div class="top-up1">
                                <div class="name">{{ value.name }}</div>
                                <div class="shijian">{{ value.createTime }}</div>
                            </div>
                            <div class="top-up2">
                                退款:{{ value.amount }}
                            </div>
                        </div>
                    </div>
                    <div class="theSerialNumber">
                        <div >序号:{{ value.id }}</div>
                        <div >订单号:{{ value.outOrderNo }}</div>
                    </div>
                </div>
                <div class="aaa"></div>
                <van-pagination 
                    v-model="currentPage" 
                    :page-count='numberOfPages'
                    :show-page-size="3" 
                    force-ellipses
                    @change="onClickNumber"
                    class="van-pagination"
                />
            </van-tab>
        </van-tabs>
        <van-popup v-model="show1" position="bottom" :overlay="true">
            <van-datetime-picker
                v-model="currentDate1"
                @confirm='onStateTimeConfirm'
                type="datetime"
                :formatter="formatter"
                :min-date="minDate"
                :max-date="maxDate"
            />
		</van-popup>
		<van-popup v-model="show2" position="bottom" :overlay="true">
            <van-datetime-picker
                v-model="currentDate2"
                @confirm='onEndTimeConfirm'
                :formatter="formatter"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
		</van-popup>
    </div>
</template>
<script>
import { Tab,Tabs,Pagination } from 'vant';
import zhujian from "../../components/theOrderManagement/zhujian";
import zuJian from "../../components/theOrderManagement/zujian1";
import img from "../../common/img/game1.jpg";
import axios from 'axios';
import url from '@/urlRouter.js';
import {submitTest} from '@/common/js/loginTest.js';
export default {
    data () {
        return {
            sticky:true,
            name:"购买详情",
            name1:"游戏详情",
            name2:"充值详情",
            name3:"退款详情",
            show1:false,
            show2:false,
            minDate: new Date(2015,1,1,1),
            maxDate: new Date(),
            currentDate1: new Date(),
            currentDate2: new Date(),
            str_time1:'',//开始时间
            end_time1:'',//结束时间
            listData:[
            ],
            List:[],//购买详情
            theGameDetails:[],//游戏详情
            stick:[],//游戏状态
            recordNumber:"",
            numberOfPages:0,
            theWinningState:"",//中奖状态码
            Details:"",//功能选着 购买详情 游戏详情 充值详情 退款详情
            currentPage:1,//当前页码
            totalAmount:0//退款总金额
        }
    },
    methods:{  
        //购买详情 游戏详情 充值详情 退款详情
        onClick(name, title){
            this.Details = title
            console.log(title)
            switch(title){
                case "购买详情": this.theOrder(1); break;
                case "游戏详情": this.theGame(1,this.theWinningState); break;
                case "充值详情": this.topUp(1); break;
                case "退款详情": this.aRefund(1); break;
            }
            
        },
        purchaseDetails(){
            this.$router.push({path: '/purchaseDetails'});
            // this.$router.push({path:'/two.html'  })
        },
        //开始的时间选着
        onStateTimeConfirm(value){
            this.show1=!this.show1;
            this.str_time_t=value.getTime()
            let month = value.getMonth()+1
            this.str_time1 = value.getFullYear() + "/" + month + "/" + value.getDate() + " " + value.getHours() + ':' + value.getMinutes()
            let _this=this;
            switch(this.Details){
                case "": this.theOrder(1); break;
                case "购买详情": this.theOrder(1); break;
                case "游戏详情": this.theGame(1,this.theWinningState); break;
                case "充值详情": this.topUp(1); break;
                case "退款详情": this.aRefund(1); break;
            }
        },
        //结束的时间选着
        onEndTimeConfirm(value){
            let _this=this
            this.show2=!this.show2;
            if(this.str_time_t<=value.getTime()+86400*1000){
                this.end_time_t=value.getTime()
                let month = value.getMonth()+1
                this.end_time1 = value.getFullYear() + "/" + month  + "/" + value.getDate() + " " + value.getHours() + ':' + value.getMinutes()
                this.pno=1
                switch(this.Details){
                    case "": this.theOrder(1); break;
                    case "购买详情": this.theOrder(1); break;
                    case "游戏详情": this.theGame(1,this.theWinningState); break;
                    case "充值详情": this.topUp(1); break;
                    case "退款详情": this.aRefund(1); break;
                }
            }else{
                alert('结束日期不低于开始日期');
                this.show2=true;
            }
        },
        //有子组件穿过来的值
        event:function(data) {
            if(data == 1){
                this.show1=!this.show1;
            }
            if(data == 2){
                this.show2=!this.show2;
            }
        },
        //点击下一页请求数据
        onClickNumber:function(data){
            switch(this.Details){
                case "": this.theOrder(data); break;
                case "购买详情": this.theOrder(data); break;
                case "游戏详情": this.theGame(data,this.theWinningState); break;
                case "充值详情": this.topUp(data); break;
                case "退款详情": this.aRefund(data); break;
            }
            document.documentElement.scrollTop = 0;
        },

        //控制时间的显示
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`
            }else if (type === 'day') {
                return `${value}日`
            }else if (type === 'points') {
                return `${value}时`
            }
            return value;
        },
        //在其他地方多处调用(购买详情)
        theOrder(data){
            let _this = this
            axios({
                method:"get",
                url:url.adminurl+"/api/OrderApi/OrderBuys?machineNum="+this.$route.params.machineNum+"&page="+data+"&beginTime="+this.str_time1+"&endTime="+this.end_time1+"&pageSize="+30,
            }).then((err)=>{
                this.List = err.data.data
                this.recordNumber= err.data.totalCount
                this.numberOfPages = Math.ceil(this.recordNumber/30)
                parseInt(this.numberOfPages)
            }).catch(err=>{
                submitTest(err,_this);
            })
        },
       //游戏详情里面的选着
        luckyDraw(){
            let _this = this
            axios({
                method:"get",
                url:url.adminurl+"/api/OrderApi/PrizeStatus",
            }).then((err)=>{
                this.stick=err.data
            }).catch(err=>{
                submitTest(err,_this);
            })
        },
        eventLuckyDraw(data){
            this.theWinningState = this.stick[data].value
            this.theGame(1,this.theWinningState)
        },
         //在其他地方多处调用(游戏详情)
        theGame(data,name){
            let _this = this
            axios({
                method:"get",
                url:url.adminurl+"/api/OrderApi/OrdersGame?machineNum="+this.$route.params.machineNum+"&page="+data+"&beginTime="+this.str_time1+"&endTime="+this.end_time1+"&pageSize="+30+"&status="+name,
            }).then((err)=>{
                // console.log(err)
                this.theGameDetails = err.data.data
                this.recordNumber= err.data.totalCount
                this.numberOfPages = Math.ceil(this.recordNumber/30)
                parseInt(this.numberOfPages)
            }).catch(err=>{
                submitTest(err,_this);
            })
        },
        onClickNumber1:function(data){
            this.theGame(data,this.theWinningState)
            document.documentElement.scrollTop = 0;
        },
        //充值
        topUp(data){
            let _this = this
            axios({
                method:"get",
                url:url.adminurl+"/api/OrderApi/OrdersCions?machineNum="+this.$route.params.machineNum+"&page="+data+"&beginTime="+this.str_time1+"&endTime="+this.end_time1+"&pageSize="+30,
            }).then((err)=>{
                // console.log(err)
                this.listData = err.data.data
                this.recordNumber= err.data.totalCount
                this.numberOfPages = Math.ceil(this.recordNumber/30)
                parseInt(this.numberOfPages)
            }).catch(err=>{
                submitTest(err,_this);
            })
        },
        //退款
        aRefund(data){
            let _this = this
            axios({
                method:"get",
                url:url.adminurl+"/api/OrderApi/OrdersRefund?machineNum="+this.$route.params.machineNum+"&page="+data+"&beginTime="+this.str_time1+"&endTime="+this.end_time1+"&pageSize="+30,
            }).then((err)=>{
                // console.log(err)
                this.listData = err.data.data
                this.recordNumber= err.data.totalCount
                this.numberOfPages = Math.ceil(this.recordNumber/30)
                parseInt(this.numberOfPages)
                this.totalAmount = err.data.totalAmount
            }).catch(err=>{
                submitTest(err,_this);
            })
        }
    },
    created () {
        
    },
    components:{
        zhujian,
        zuJian
    },
    //挂载完成
    mounted(){
        let _this=this;
        const promise = new Promise((resolve,reject)=>{
            let nowtime=new Date();
            resolve(nowtime)
        })
        promise.then((nowtime)=>{
            console.log(nowtime.getMonth()+1)
            let month = nowtime.getMonth()+1
            this.str_time1 = nowtime.getFullYear() + "/" + month + "/" + nowtime.getDate() + " " + nowtime.getHours() + ':' + nowtime.getMinutes()
            this.end_time1 = nowtime.getFullYear() + "/" + month + "/" + nowtime.getDate() + " " + nowtime.getHours() + ':' + nowtime.getMinutes()
            this.theOrder(1)
        })
        this.luckyDraw()
        console.log(this.$route.params.machineNum)
    }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
    #bow{
        background: #f2f2f2;
        .top-up{
            width: 95%;
            margin: 0 auto;
            margin-top: 10px;
            padding-left: 8px;
            padding-right: 8px;
            border-radius:15px;
            box-shadow: 0 0 10px #99ffff;
            box-sizing: border-box;
            background: #fff;
            border-bottom:1px solid #f2f2f2; 
            .top-up3{
                width: 100%;
                padding-left: 8px;
                padding-right: 8px;
                box-sizing: border-box;
                background: #fff;
                display: flex;
                align-items: center;
                .IMG{
                    width: 15%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    img{
                        width: 50px;
                        height: 50px;
                    }
                }
                .class{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .top-up1{
                        height: 50px;
                        padding-left: 8px;
                        padding-right: 8px;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content:space-around;
                        .name{
                            font-size: 16px;
                        }
                        .shijian{
                            font-size: 15px;
                            color: #888
                        }
                    }
                    .top-up2{
                        font-size: 18px;
                    }
                }
            }
            
            
            .theSerialNumber{
                width: 100%;
                padding: 8px;
                box-sizing: border-box;
                background: #FFF;
                div{
                    font-size: 16px;
                    color: #888;
                }
            }
        }    
        .purchaseDetails{
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            background: #FFF;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f2f2f2; 
            .IMG{
                max-width: 80%;
                height: 80px;
                white-space:nowrap;
                overflow-x:auto;
                overflow-y:hidden;
                img{
                    width: 70px;
                    height: 70px;
                    padding: 2px;
                }
            }
            .Details{
                height: 80px;
                display: flex;
                align-items: center;
                font-size: 18px;
            }
        }
        .theTotalNumberOf{
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            span{
                display: flex;
                align-items: center;
                font-size: 18px;
                div{
                    display: flex;
                    align-items: center;
                    color: red;
                    font-size: 18px
                }
            }
        }
    }
    .aaa{
        height: 40px;
        background: #fff;
    }
    .van-pagination{
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
    }
</style>