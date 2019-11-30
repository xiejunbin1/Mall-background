<template>
    <div>
        <div class="ESN">设备编号:<u>{{ shebei }}</u></div>
        <div class="search-list">
            <div class="search-li">
                <div class="search-li-div">
                    <div class="li-title">时间</div>
                    <div class="li-value">
                        <span class="manaeg-input"/>
                        <span @click="handletime1">{{str_time}}</span>
                        <span style="color: #606266;">&nbsp;至&nbsp;</span>
                        <span @click="handletime2">{{end_time}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="recordNumber">
            <div>总记录数:</div>
            <div style="color:red">{{ record }}</div>
        </div>
        <div class="detailed"  v-for="(value,index) in List" :key="index" >
            <div class="detailed_div">
                <div class="detailed_div_tou">
                    <div class="time">{{ value.payTime}}  {{ value.Time }}</div>
                </div>
                <div class="detailed_div_zhong">
                    <div class="thePicture" v-for="(ietm,index) in value.products" :key="index">
                        <img :src="ietm.imgUrl" class="Img">
                        <div class="introduce">
                            <div class="name">
                                <span class="mingcheng">{{ ietm.title }}</span>
                            </div>
                            <div class="name">
                                <span class="jiage">￥{{ ietm.sellPrice }}</span>
                            </div>
                            <div class="name1">
                                <span class="jiage1">X{{ ietm.count }}</span>
                            </div>
                            <!-- <div class="name">
                                <span class="mingcheng">出货口:{{ ietm.shipmentPort }}</span>
                            </div> -->
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_lest">
                        <div class="bottom_lest_tou">下单用户:{{ value.theUser }}</div>
                        <div class="bottom_lest_bottom">序号:{{ value.id }}</div>
                    </div>
                    <div class="bottom_reds">实付款:{{ value.amount }}</div>
                </div>
                <div class="bottom1">订单号:{{ value.outOrderNo }}</div>
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
    </div>
</template>

<script>
import axios from 'axios';
import url from '@/urlRouter.js'
import { Tab,Tabs,Pagination } from 'vant';
export default {
    // props: [
    //     "str_time",
    //     "end_time",
    //     "itist",
    //     "List",
    //     "record",
    //     "numberOfPages"
    // ],
    props: {
        str_time:null,//有父组件传过来的开始时间
        end_time:null,//有父组件传过来的结束时间
        itist:null,//根据父组件传过来的值来判断true,和false
        List:null,//有父组件数据
        record:null,//有父组件数据条数
        numberOfPages:Number//分页页数
    },
        
    
    data () {
        return {
            currentPage:1,
            show1:false,
            show2:false,
            classification:false,//游戏抽奖中奖领取情况和中奖情况,只有游戏详情有
            winning:false,//中奖情况,只有游戏详情有
            details1:false,//数据列表,只有抽奖和购买有
            shebei:this.$route.params.machineNum
        }
    },
    methods:{
        handletime1(){
            this.show1=!this.show1;
            this.$emit("event",1)
        },
        handletime2(){
            this.show2=!this.show2;
            this.$emit("event",2)
        },
        onClickNumber(){
            this.$emit("onClickNumber",this.currentPage)
        },
        onClick(name, title){
        },
        
        
    },
    
    created () {
       
    },
    //挂载完成
    mounted(){
       
       
    }
}

</script>

<style scoped lang="less">
@import '../../style/main.less';
    .search-list{
        /*box-shadow: @BOXcurrency;*/
        .search-li{
            background: #fff;
            padding: 10px;
            font-size: 14px;
            border-bottom: 1px solid @BOX3;
            .search-li-div{
                width: 100%;
                // margin: 0 auto;
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                .li-title{
                        
                }
                .li-value{
                    width: 88%;
                    overflow: hidden;
                    color: @BGblue;
                    // border: 1px solid red;
                }
                .li-icon{
                    width: 24%;
                    text-align: right;
                }
            }
        }
    }
    .recordNumber{
        // border: 1px solid red;
        font-size: 18px;
        display: flex;
        align-items: center;
        padding: 8px;
        box-sizing: border-box;
        background: #fff
    }
    .detailed{
        width: 100%;
        padding: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .detailed_div{
            width: 100%;
            background: #fff;
            border-radius:15px;
            box-shadow: 0 0 10px #99ffff;
            box-sizing: border-box;
            .detailed_div_tou{
                font-size: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px;
                box-sizing: border-box;
                .time{
                    color: #888;
                }
                .time1{
                    color: #0066ff;
                    font-size: 18px;
                }
            }
            .detailed_div_zhong{
                display: flex;
                flex-direction: column;
                align-items: center;
                box-sizing: border-box;
                padding-left: 8px;
                padding-right: 8px;
                .thePicture{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    .Img{
                        width: 40px;
                        height: 40px;
                        padding-bottom: 3px;
                        box-sizing: border-box;
                    }
                    .introduce{
                        width: 100%;
                        padding-left: 8px;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .name{
                            font-size: 15px;
                            display: flex;
                            align-items: center;
                            // justify-content: space-between;
                            padding-bottom: 5px;
                            .mingcheng{
                                color: #000;
                            }
                            .jiage{
                                padding-left: 2px;
                                color: red;
                            }
                        }
                        .name1{
                            font-size: 15px;
                            display: flex;
                            justify-content: space-between;
                            padding-bottom: 5px;
                            .mingcheng1{
                                color: #888;
                            }
                            .jiage1{
                                color: #000;
                            }
                        }
                    }
                }
                
                
            }
            .bottom{
                display: flex;
                box-sizing: border-box;
                padding-left: 8px;
                padding-right: 8px;
                justify-content: space-between;
                .bottom_lest{
                    font-size: 15px;
                    .bottom_lest_tou{
                        padding-top: 5px;
                        box-sizing: border-box;
                        color: #ff3333;
                    }
                    .bottom_lest_bottom{
                        padding-top: 5px;
                        box-sizing: border-box;
                        color: #888;
                    }
                }
                .bottom_reds{
                    font-size: 18px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                }
            }
            .bottom1{
                color: #888;
                font-size: 15px;
                padding-left: 8px;
                padding-right: 8px;
                box-sizing: border-box;
            }
        }
    }
    .aaa{
        height: 40px;
        background: #fff
    }
    .van-pagination{
        width: 100%;
        position:fixed;
        bottom: 0;
        background: #fff;
    }
    .ESN{
        width: 100%;
        background: #fff;
        padding: 8px;
        display: flex;
        align-items: center;
        font-size:16px;
        border-bottom: 1px solid @BOX3; 
        box-sizing: border-box;
        u{
            text-decoration:none;
            color: #0066ff;
        }
    }
</style>