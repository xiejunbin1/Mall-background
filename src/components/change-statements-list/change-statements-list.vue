<template>
    <div class="change_statements_list">
        <div class="choose_time">
            <span>请选择时间:</span>
            <span @click="handletime1">{{str_time}}</span>
            <span style="color: #606266;">&nbsp;至&nbsp;</span>
            <span @click="handletime2">{{end_time}}</span>
        </div>
        <div class="all_order1">
            <p class="all_order_title1">线上总收益:</p>
            <p class="all_order_num1" style="color:red">{{ zongshouyi }}</p>
        </div>
        <van-collapse v-model="activeNames" class="content">
            <van-collapse-item :title='"设备号:"+item.machineNum' :name="index+1" v-for="(item,index) in statements_list" :key="index">
                <div class="all_order">
                    <p class="all_order_title">总销售金额</p>
                    <p class="all_order_num">{{item.amount}}</p>
                </div>
                <div class="order_item">
                    <div class="all_profits order_item_box">
                        <p class="tile">总成本</p>
                        <p class="num">{{item.cost}}</p>
                    </div>
                    <div class="all_cost order_item_box">
                        <p class="tile">总利润</p>
                        <p class="num">{{item.profit}}</p>
                    </div>
                </div>
                <div class="order_item item_border">
                    <div class="all_profits">
                        <p class="tile">购买总额</p>
                        <p class="num">{{item.amountBuy}}</p>
                    </div>
                    <div class="all_cost">
                        <p class="tile">游戏总额</p>
                        <p class="num">{{item.amountGame}}</p>
                    </div>
                </div>
                <div class="order_item">
                    <div class="purchase_all_cost item_box">
                        <p class="tile">购买成本</p>
                        <p class="num">{{item.costBuy}}</p>
                    </div>
                    <div class="purchase_all_profits item_box">
                        <p class="tile">购买利润</p>
                        <p class="num">{{item.profitBuy}}</p>
                    </div>
                    <div class="game_all_cost item_box">
                        <p class="tile">游戏成本</p>
                        <p class="num">{{item.costGame}}</p>
                    </div>
                    <div class="game_all_profits item_box">
                        <p class="tile">游戏利润</p>
                        <p class="num">{{item.profitGame}}</p>
                    </div>
                </div>
                <div class="btn" @click="del_info(item.machineNum)">查看详情</div>
            </van-collapse-item>
        </van-collapse>
        <div class="no_data" v-show="statements_list.length==0">暂无数据</div>
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
            activeNames:[1],
            statements_list:[],
            zongshouyi:0,//总收益
        }
    },
    methods: {
        del_info(machineNum){
            this.$router.push({name:'changestatementsDel',params:{addressId:this.$route.params.addressId,machineNum:machineNum}});
            //alert("该功能正在完善中...")
        },
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
                this.getStatements_list(this.$route.params.addressId,this.str_time,this.end_time)
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
                this.getStatements_list(this.$route.params.addressId,this.str_time,this.end_time)
            }else{
                alert('结束日期不低于开始日期')
                 this.endShow=true;
            }
        },
        //获取设备报表列表
        getStatements_list(addressId,str_time,end_time){
            let _this=this;
            if(new Date(str_time).getTime()+86400*1000<new Date("2019/7/10").getTime()+86400*1000){
                str_time="2019/7/10"
                axios({
                method:'get',
                    url:url.adminurl+'/api/Income/IncomeMachine?beginTime='+str_time+'&endTime='+end_time+'&addressId='+addressId,
                    responseType:'json'
                }).then((res)=>{
                    this.statements_list=res.data.list
                    this.zongshouyi = res.data.total_amount
                    localStorage.setItem("str_time",str_time)
                    localStorage.setItem("end_time",end_time)
                }).catch(err=>{
                    submitTest(err,_this);
                })
            }else{
                axios({
                method:'get',
                    url:url.adminurl+'/api/Income/IncomeMachine?beginTime='+str_time+'&endTime='+end_time+'&addressId='+addressId,
                    responseType:'json'
                }).then((res)=>{
                    this.statements_list=res.data.list
                    this.zongshouyi = res.data.total_amount
                    localStorage.setItem("str_time",str_time)
                    localStorage.setItem("end_time",end_time)
                }).catch(err=>{
                    submitTest(err,_this);
                })
            }
        }
    },
    mounted () {
        
    },
    components: {
      Footer  
    },
    created () {
       // let nowtime=new Date();
        this.str_time=localStorage.getItem("str_time")
        this.end_time=localStorage.getItem("end_time")
        this.getStatements_list(this.$route.params.addressId,this.str_time,this.end_time)
    }
}
</script>

<style lang="less">
@import '../../style/main.less';
.change_statements_list{
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
    .content{
        // margin-top: 52px;
        margin-bottom: 60px;
        .van-cell__title{
            font-size: 16px;
            color: #3cb908;
        }
    }
    .van-hairline--top-bottom::after{
        border-width: 0;
    }
    .no_data{
        width: 100%;
        text-align: center;
        font-size: 16px;
        color: #000;
        margin-top: 200px;
    }
    .van-collapse-item__content{
        padding: 0;
        .all_order{
            height: 50px;
            font-size: 18px;
            line-height: 50px;
            background: #000;
            color: #fff;
            p{
                margin: 0;
                width: 50%;
                float: left;
                text-align: center;
                height: 40px;
            }
        }
        .order_item{
            font-size: 16px;
            color: #000;
            overflow: hidden;
            background: #fff;
            .all_profits{
                width: 48%;
                float: left;
                border-right: 5px solid #eee;
                padding: 10px 0;
                p{
                    margin: 0;
                }
            }
            .all_cost{
                width: 50%;
                float: left;
                padding: 10px 0;
                 p{
                    margin: 0;
                }
            }
            .order_item_box{
                border-top: 5px solid #eee;
                padding: 10px 0;
                text-align:  center;
            p{
                margin: 0;
            }
            .num{
                font-weight: bold;
            }
            }
            .item_box{
                border-top: 5px solid #eee;
                padding: 10px 0;
                width: 23.5%;
                float: left;
                text-align:  center;
                border-right: 5px solid #eee;
                border-bottom: 5px solid #eee;
            p{
                margin: 0;
            }
            .num{
                font-weight: bold;
            }
            }
            .game_all_cost{
                width: 24.3%;
            }
            .game_all_profits{
                border-right: none;
                width: 24%;
            }
        }
        .item_border{
            border-top: 5px solid #409eff;
            text-align:  center;
        }
        .btn{
            width: 60%;
            margin: 10px auto 20px;
            background: #409eff;
            height: 40px;
            border-radius: 20px;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 40px;
        }
    }
    .all_order1{
        height: 50px;
        font-size: 18px;
        line-height: 50px;
        background: #FFFFCC;
        color: #000;
        margin-top: 52px;
        p{
            margin: 0;
            width: 50%;
            float: left;
            text-align: center;
            height: 40px;
        }
    }
}

</style>

