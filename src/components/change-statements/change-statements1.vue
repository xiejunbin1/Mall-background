<template>
    <div class="changeStatements">
        <van-tabs :active="active">
            <van-tab :title="item.day" v-for="(item,index) in tabs" :key="index">
                <div class="choose_time">
                    <span>请选择时间:</span>
                    <span @click="handletime1">{{str_time}}</span>
                    <span style="color: #606266;">&nbsp;至&nbsp;</span>
                    <span @click="handletime2">{{end_time}}</span>
                </div>
                <div class="choose_time site">
                    <span>场地:</span>
                    <span @click="chooseSite">请选择场地</span>
                </div>
                 <div class="choose_time site">
                    <span>设备:</span>
                    <span @click="chooseEquipment">请选择设备</span>
                </div>
                <div v-if="index==0">
                    <div class="all_order">
                        <p class="all_order_title">总销售金额</p>
                        <p class="all_order_num">{{all_order_num}}</p>
                    </div>
                    <div class="order_item">
                        <div class="all_profits order_item_box">
                            <p class="tile">总利润</p>
                            <p class="num">{{all_profits}}</p>
                        </div>
                        <div class="all_cost order_item_box">
                            <p class="tile">总成本</p>
                            <p class="num">{{all_cost}}</p>
                        </div>
                    </div>
                    <div class="order_item item_border">
                        <div class="all_profits border_right">
                            <p class="tile">直购总额</p>
                            <p class="num">{{all_purchase}}</p>
                        </div>
                        <div class="all_cost">
                            <p class="tile">游戏总额</p>
                            <p class="num">{{all_game}}</p>
                        </div>
                    </div>
                     <div class="order_item">
                        <div class="purchase_all_cost item_box">
                            <p class="tile">直购成本</p>
                            <p class="num">{{purchase_all_cost}}</p>
                        </div>
                        <div class="purchase_all_profits item_box">
                            <p class="tile">直购利润</p>
                            <p class="num">{{purchase_all_profits}}</p>
                        </div>
                        <div class="game_all_cost item_box">
                            <p class="tile">游戏成本</p>
                            <p class="num">{{game_all_cost}}</p>
                        </div>
                        <div class="game_all_profits item_box">
                            <p class="tile">游戏利润</p>
                            <p class="num">{{game_all_profits}}</p>
                        </div>
                    </div>
                     <div class="btn" @click="del_info">查看详情</div>
                </div>
                <div v-if="index==1">
                    <div class="all_order">
                        <p class="all_order_title">总销售金额</p>
                        <p class="all_order_num">{{all_order_num}}</p>
                    </div>
                    <div class="order_item">
                        <div class="all_profits order_item_box">
                            <p class="tile">总利润</p>
                            <p class="num">{{all_profits}}</p>
                        </div>
                        <div class="all_cost order_item_box">
                            <p class="tile">总成本</p>
                            <p class="num">{{all_cost}}</p>
                        </div>
                    </div>
                    <div class="order_item item_border">
                        <div class="all_profits ">
                            <p class="tile">直购总额</p>
                            <p class="num">{{all_purchase}}</p>
                        </div>
                        <div class="all_cost">
                            <p class="tile">游戏总额</p>
                            <p class="num">{{all_game}}</p>
                        </div>
                    </div>
                     <div class="order_item">
                        <div class="purchase_all_cost item_box">
                            <p class="tile">直购成本</p>
                            <p class="num">{{purchase_all_cost}}</p>
                        </div>
                        <div class="purchase_all_profits item_box">
                            <p class="tile">直购利润</p>
                            <p class="num">{{purchase_all_profits}}</p>
                        </div>
                        <div class="game_all_cost item_box">
                            <p class="tile">游戏成本</p>
                            <p class="num">{{game_all_cost}}</p>
                        </div>
                        <div class="game_all_profits item_box">
                            <p class="tile">游戏利润</p>
                            <p class="num">{{game_all_profits}}</p>
                        </div>
                    </div>
                     <div class="btn" @click="del_info">查看详情</div>
                </div>
                <div v-if="index==2">
                    <div class="all_order">
                        <p class="all_order_title">总销售金额</p>
                        <p class="all_order_num">{{all_order_num}}</p>
                    </div>
                    <div class="order_item">
                        <div class="all_profits order_item_box">
                            <p class="tile">总利润</p>
                            <p class="num">{{all_profits}}</p>
                        </div>
                        <div class="all_cost order_item_box">
                            <p class="tile">总成本</p>
                            <p class="num">{{all_cost}}</p>
                        </div>
                    </div>
                    <div class="order_item item_border">
                        <div class="all_profits">
                            <p class="tile">直购总额</p>
                            <p class="num">{{all_purchase}}</p>
                        </div>
                        <div class="all_cost">
                            <p class="tile">游戏总额</p>
                            <p class="num">{{all_game}}</p>
                        </div>
                    </div>
                     <div class="order_item">
                        <div class="purchase_all_cost item_box">
                            <p class="tile">直购成本</p>
                            <p class="num">{{purchase_all_cost}}</p>
                        </div>
                        <div class="purchase_all_profits item_box">
                            <p class="tile">直购利润</p>
                            <p class="num">{{purchase_all_profits}}</p>
                        </div>
                        <div class="game_all_cost item_box">
                            <p class="tile">游戏成本</p>
                            <p class="num">{{game_all_cost}}</p>
                        </div>
                        <div class="game_all_profits item_box">
                            <p class="tile">游戏利润</p>
                            <p class="num">{{game_all_profits}}</p>
                        </div>
                    </div>
                     <div class="btn" @click="del_info">查看详情</div>
                </div>
                <div v-if="index==3">
                    <div class="all_order">
                        <p class="all_order_title">总销售金额</p>
                        <p class="all_order_num">{{all_order_num}}</p>
                    </div>
                    <div class="order_item">
                        <div class="all_profits order_item_box">
                            <p class="tile">总利润</p>
                            <p class="num">{{all_profits}}</p>
                        </div>
                        <div class="all_cost order_item_box">
                            <p class="tile">总成本</p>
                            <p class="num">{{all_cost}}</p>
                        </div>
                    </div>
                    <div class="order_item">
                        <div class="all_profits order_item_box">
                            <p class="tile">直购总额</p>
                            <p class="num">{{all_purchase}}</p>
                        </div>
                        <div class="all_cost order_item_box">
                            <p class="tile">游戏总额</p>
                            <p class="num">{{all_game}}</p>
                        </div>
                    </div>
                     <div class="order_item">
                        <div class="purchase_all_cost item_box">
                            <p class="tile">直购成本</p>
                            <p class="num">{{purchase_all_cost}}</p>
                        </div>
                        <div class="purchase_all_profits item_box">
                            <p class="tile">直购利润</p>
                            <p class="num">{{purchase_all_profits}}</p>
                        </div>
                        <div class="game_all_cost item_box">
                            <p class="tile">游戏成本</p>
                            <p class="num">{{game_all_cost}}</p>
                        </div>
                        <div class="game_all_profits item_box">
                            <p class="tile">游戏利润</p>
                            <p class="num">{{game_all_profits}}</p>
                        </div>
                    </div>
                     <div class="btn" @click="del_info">查看详情</div>
                </div>

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
        <van-popup v-model="siteShow" position="bottom" :overlay="true">
		   <van-picker show-toolbar :columns="site_list" @confirm="siteShowConfim"  @cancel="siteShow = false"/>
		</van-popup>
         <van-popup v-model="equipmentShow" position="bottom" :overlay="true">
		   <van-picker show-toolbar :columns="equipment_list" @confirm="equipmentConfim"  @cancel="equipmentShow = false"/>
		</van-popup>
    </div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import { Uploader } from 'vant';
import {submitTest} from '@/common/js/loginTest.js'
import { Dialog } from 'vant';
import {toMoney} from '@/moneyFilter.js'
export default {
    data(){
        return{
           // activeName:'1',
           active: 0,
           tabs:[{"day":"今天"},{"day":"昨天"},{"day":"一周内"},{"day":"一月内"}],
           startShow:false,
           endShow:false,
           siteShow:false,
           equipmentShow:false,
           currentDate1: new Date(),
           maxDate2: new Date(),
           currentDate2: new Date(),
           str_time:'',
           end_time:'',
           str_time_t:new Date().getTime(),
           end_time_t:new Date().getTime(),
           all_order_num:6112,
           all_profits: 117.5,
           all_cost:60,
           all_purchase:102,
           all_game:420,
           purchase_all_cost:94,
           purchase_all_profits:10,
           game_all_cost:666,
           game_all_profits:700,
           site_list:[],
           equipment_list:[],
        }
    },
    methods: {
        handletime1(){
            this.startShow=!this.startShow;
        },
        handletime2(){
            this.endShow=!this.endShow;
        },
        chooseSite(){
             this.siteShow=!this.siteShow
        },
        chooseEquipment(){
            this.equipmentShow=!this.equipmentShow
        },
        siteShowConfim(picker, values){
           
        },
        equipmentConfim(picker, values){

        },
        startShowConfirm(value){
            this.startShow=!this.startShow;
            this.str_time_t=value.getTime()
            this.str_time=value.toLocaleDateString()
        },
        endShowConfirm(value){
            let _this=this
            if(this.str_time_t<=value.getTime()+86400*1000){
                this.endShow=!this.endShow;
                this.end_time_t=value.getTime()
                this.end_time=value.toLocaleDateString() 
            }else{
                alert('结束日期不低于开始日期')
                 this.endShow=true;
            }
        },
        del_info(){
            this.$router.push({path:'/changestatementsDel'});
        }
    },
    created () {
        console.log("000000011111111111111111")
        let nowtime=new Date();
        this.str_time=nowtime.toLocaleDateString();
        this.end_time=nowtime.toLocaleDateString();
    }
}
</script>

<style scoped lang="less">
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
    .all_order{
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        background: #fff;
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
        }
        .all_cost{
            width: 50%;
            float: left;
        }
        .order_item_box{
          border-top: 5px solid #eee;
          padding: 10px 0;
          text-align:  center;
          p{
              margin: 0;
              padding: 5px 0;
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
              padding: 5px 0;
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
        margin: 35px auto 0;
        background: #409eff;
        height: 40px;
        border-radius: 20px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
    }

}
</style>
