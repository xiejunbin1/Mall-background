<template>
    <div class="goods-stock">
        <div class="goods-stock_top">
            <div class="goods-stock_left">
                <div class="goods_change">零钱余额(元)</div>
                <div class="goods_change_title">¥0</div>
            </div>
            <div class="goods-stock_right">
                <div class="goods_change">缺货量(件)</div>
                <div class="goods_change_title">98</div>
            </div>
        </div>
        <div class="change_type">
            <div class="change_type_one">
                <div class="title">一元零钱<span class="lack_money">紧急</span></div>
                <div class="value">余额: <span>¥0</span></div>
            </div>
            <div class="change_type_one">
                <div class="title">五元零钱<span class="lack_money">紧急</span></div>
                <div class="value">余额: <span>¥ 0</span></div>
            </div>
        </div>
        <div class="goods_list">
            <van-collapse v-model="active">
                <van-collapse-item :title="goods_classification" :value='goods_total'>
                    <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                     <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                     <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                     <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                     <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                </van-collapse-item>
            </van-collapse>
            <van-collapse v-model="active">
                <van-collapse-item :title="goods_classification" :value='goods_total'>
                    <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                     <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                     <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                     <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                     <div class="ul_list">
                        <div class="left">脉动</div>
                        <div class="right"><span>0</span>/10(件)</div>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '../index/index'
export default {
    data () {
        return {
            active:[0],
            goods_classification:"饮料",
            goods_total:19
        }
    },
    components: {
        Footer
    }
}
</script>

<style lang="less">
@import '../../style/main.less';
.goods-stock{
    .goods-stock_top{
        height: 40px;
        padding: 15px 0;
        width: 100%;
        background: #4cadf2;
        display: flex;
        .goods-stock_left,.goods-stock_right{
            width: 50%;
            text-align: center;
            font-size: 14px;
            color: #fff;
            border-right: 1px solid #fff;
            .goods_change_title{
                margin-top: 5px;
            }
        }
        .goods-stock_right{
            border-right:none;
        }
    }
    .change_type{
        background: #fff;
        .change_type_one{
            display: flex;
            height: 40px;
            line-height: 40px;
            .title{
                width: 70%;
                padding-left: 10px;
                font-size: 14px;
                .lack_money{
                    display: inline-block;
                    width: 40px;
                    height: 20px;
                    font-size: 14px;
                    line-height: 20px;
                    text-align: center;
                    background: #fb897f;
                    border-radius: 5px;
                    color: #fff;
                    margin-left: 10px;
                }
            }
            .value{
                width: 30%;
                text-align: center;
                font-size: 14px;
                span{
                    font-size: 16px;
                    color: #f77c7e;
                }
            }
        }
    }
    .goods_list{
        margin-top: 15px;
        margin-bottom: 60px;
        .van-hairline--top-bottom:after{
            border-width: 0px 0;
        }
        .van-collapse-item__content{
            padding: 0;
        }
        .ul_list{
            display: flex;
            height: 40px;
            line-height: 40px;
            padding: 0px 15px;
            border-bottom: 1px solid #eee;
            .left{
                width: 50%;
                color: #000;
                font-size: 14px;
            }
            .right{
                width: 50%;
                text-align: right;
                font-size: 14px;
                span{
                    font-size: 16px;
                    color: #ff9291;
                }
            }
        }
    }
}
</style>

