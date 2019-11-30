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
        <van-tabs @click="onClick" v-if="classification">
            <van-tab :title="value.text"  v-for="(value,index) in stick" :key="index"></van-tab>
        </van-tabs>
        <div class="recordNumber" v-if="recordNumber">
            <div>总条数:</div>
            <div style="color:red">{{ record }}</div>
        </div>
        <div class="detailed" v-show="details1" v-for="(value,index) in theGameDetails" :key="index" >
            <div class="detailed_div">
                <div class="detailed_div_tou">
                    <div class="time">{{ value.payTime }}</div>
                    <div class="time1" v-if="winning">{{ value.statusText }}  {{ value.toReceive }}</div>
                </div>
                <div class="detailed_div_zhong">
                    <img :src="value.imgUrl" class="Img">
                    <div class="introduce">
                        <div class="name">
                            <span class="mingcheng">{{ value.title }}</span>
                            <span class="jiage">￥{{ value.amount }}</span>
                        </div>
                        <!-- <div class="name1">
                            <span class="mingcheng1">机器:{{ value.theMachine }}</span>
                            <span class="jiage1">X{{ value.theNumberOf }}</span>
                        </div> -->
                        <div class="name">
                            <span class="mingcheng">出货口:{{ value.boxNum }}</span>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_lest">
                        <div class="bottom_lest_tou">下单用户:{{ value.customerId }}</div>
                        <div class="bottom_lest_bottom">序号:{{ value.id }}</div>
                    </div>
                    <div class="bottom_reds">实付款:{{ value.amount }}</div>
                </div>
                <div class="bottom1">订单号:{{ value.outOrderNo }}</div>
            </div>
        </div>
        <div class="aaa" v-if="aaa"></div>
        <van-pagination 
             v-model="currentPage" 
            :page-count='numberOfPages'
            :show-page-size="3" 
            force-ellipses
            v-if="paging"
            @change="onClickNumber"
            class="van-pagination"
        />
    </div>
</template>

<script>
import { Tab,Tabs,Pagination } from 'vant';
export default {
    props: {
        str_time:null,//有父组件传过来的开始时间
        end_time:null,//有父组件传过来的结束时间
        itist:null,//根据父组件传过来的值来判断true,和false
        List:null,//有父组件数据购买
        record:null,//有父组件数据条数
        stick:null,//游戏中奖状态
        theGameDetails:null,//有父组件数据游戏
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
            paging:false,
            recordNumber:false,
            aaa:false,
            i:0,
            shebei:this.$route.params.machineNum
        }
    },
    methods:{
        onscroll(){  //滚动条事件
        },
        handletime1(){
            this.show1=!this.show1;
            this.$emit("event",1)
        },
        handletime2(){
            this.show2=!this.show2;
            this.$emit("event",2)
        },
        onClick(name, title){
            this.$emit("eventLuckyDraw",name)
        },
        onClickNumber(){
            this.$emit("onClickNumber1",this.currentPage)
        },
        // handleScroll () {
        //     var docucmnetHeight = document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
        //     var screenHegiht = document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
        //     var scrollTop = document.documentElement.clientHeight || document.body.clientHeight;
        //     var scrollEnd = screenHegiht + scrollTop
        //     if(scrollEnd>=docucmnetHeight){
        //         console.log(this.i++)
        //     }
        // }
    },
    
    created () {
       if(this.itist == "0"){
           this.classification = false
           this.winning = false
           this.details1 = false
           this.paging = false
           this.recordNumber = false
           this.aaa = false
       }
       if(this.itist == "1"){
           this.classification = true
           this.winning = true
           this.details1 = true
           this.paging = true
           this.recordNumber = true
           this.aaa = true
       }
       if(this.itist == "2"){
           this.classification = false
           this.winning = false
           this.details1 = false
           this.paging = false
           this.recordNumber = false
           this.aaa = false
       }
       if(this.itist == "3"){
           this.classification = false
           this.winning = false
           this.details1 = false
           this.paging = false
           this.recordNumber = false
           this.aaa = false
       }
    },
    //挂载完成
    mounted(){
        // window.addEventListener('scroll',this.handleScroll);
        // this.$emit("eventLuckyDraw",this.stick[0].text)
        this.$emit("onClickNumber1",this.currentPage)
    }
}

</script>

<style scoped lang="less">
@import '../../style/main.less';
    .search-list{
        /*box-shadow: @BOXcurrency;*/
        .search-li{
            background: #fff;
            padding: 8px;
            font-size: 14px;
            border-bottom: 1px solid @BOX3;
            box-sizing: border-box;
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
                    // text-align: right;
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
        background: #fff;
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
                align-items: center;
                box-sizing: border-box;
                padding-left: 8px;
                padding-right: 8px;
                .Img{
                    width: 70px;
                    height: 70px;
                }
                .introduce{
                    width: 100%;
                    height: 70px;
                    padding-left: 8px;
                    box-sizing: border-box;
                    .name{
                        width: 100%;
                        font-size: 15px;
                        display: flex;
                        justify-content: space-between;
                        padding-bottom: 5px;
                        .mingcheng{
                            color: #000;
                        }
                        .jiage{
                            color: red;
                        }
                    }
                    .name1{
                        width: 100%;
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