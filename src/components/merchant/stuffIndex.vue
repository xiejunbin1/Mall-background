<template>
    <div class="stuffIndex">
       <div class="warp-title" id='warp-title' v-show="tips">
            温馨提示：	
            <i class="icon iconfont icon-guanbi4"></i>
            <div>&nbsp;&nbsp;&nbsp;* 开通支付功能必须严格按照格式填写真实资料</div>
            <div>&nbsp;&nbsp;&nbsp;* 结束日期是长期的,请勾选按钮,结束日期不是长期的不能勾选</div>
        </div>
        <div class="list">
            <!-- <div class="list-item">
                 <div class="list-item-title">———— 商户信息  ————</div>
                 <div class="item-box item-box2">
                    <div class="item-title"><span>商户类型：</span></div>
                    <div class="item-select">
                       	<button id="company_type" class="form-control" @click="select_company_type">{{company_type}}</button>
                    </div>
                </div>
                <div class="item-msg" id="company_type_p_t">{{company_type_p_t}}</div>
                 <div class="item-box item-box2">
                    <div class="item-title"><span>行业类型：</span></div>
                    <div class="item-select">
                        <button id="trade_code" class="form-control" @click="select_trade_code">{{trade_code}}</button>
                    </div>
                </div>
                <div class="item-msg" id="license_name_p_t">{{trade_code_p_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>签约通道：</span></div>
                    <div class="item-select">
                        <button id="channel" class="form-control" @click="select_channel">{{channel}}</button>
                    </div>
                </div>
                <div class="item-msg" id="license_name_p_t">{{channel_p_t}}</div>
            </div> -->
            <div class="list-item">
                <div class="list-item-title">———— 身份证信息  ————</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>身份证姓名：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="license_name_p" v-model="license_name" placeholder="请输入身份证姓名" />
                    </div>
                </div>
                <div class="item-msg" id="license_name_p_t">{{license_name_p_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>身份证号码：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="license_number_p" v-model="license_number" value="" placeholder="请输入身份证号码" />
                    </div>
                </div>
                <div class="item-msg" id="license_number_p_t">{{license_number_p_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>身份证开始时间：</span></div>
                    <div class="item-select" >
                        <button id="license_start_t" class="form-control" @click="start_time">{{license_start_t}}</button>
                    </div>
                </div>
                <div class="item-msg" id="license_start_p_t">{{license_start_p_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>身份证结束时间：</span></div>
                    <div class="item-select">
                        <button id="license_end_t" class="form-control" @click="end_time">{{license_end_t}}</button>
                    </div>
                </div>
                <div class="item-msg"><van-checkbox v-model="checked">结束日期是长期的,请勾选按钮</van-checkbox></div>
                <div class="item-msg" id="license_end_p_t">{{license_end_p_t}}</div>
                 <div class="list-item-upload">
                    <div class="upload-left">
                        <p class="upload_name"><span><i class="icon iconfont icon-xiugai1"></i>身份证正面图片：</span></p>
                        <p class="upload_demo" @click="tips_btn(1)">查看示例</p>
                    </div>
                    <div class="upload-right">
                        <span class="img-box" v-show="!front_picture==''"><img :src="front_picture" alt=""></span>
                        <van-uploader :after-read="onRead(1)" accept="image/*">
                            <img src="../../common/img/tianjia.png" alt="" class="addImg">
                        </van-uploader>
                    </div>
                </div>
                <div class="item-msg" id="license_end_p_t">{{front_picture_p_t}}</div>
                 <div class="list-item-upload">
                    <div class="upload-left">
                        <p class="upload_name"><span><i class="icon iconfont icon-xiugai1"></i>身份证反面图片：</span></p>
                        <p class="upload_demo" @click="tips_btn(2)">查看示例</p>
                    </div>
                    <div class="upload-right">
                        <span class="img-box" v-show="!reverse_picture==''"><img :src="reverse_picture" alt=""></span>
                        <van-uploader  :after-read="onRead(2)" accept="image/*">
                            <img src="../../common/img/tianjia.png" alt="" class="addImg">
                        </van-uploader>
                    </div>
                </div>
                <div class="item-msg" id="license_end_p_t">{{reverse_picture_p_t}}</div>
                <div class="list-item-upload">
                    <div class="upload-left">
                        <p class="upload_name"><span><i class="icon iconfont icon-xiugai1"></i>手持身份证照：</span></p>
                        <p class="upload_demo" @click="tips_btn(3)">查看示例</p>
                    </div>
                    <div class="upload-right">
                        <span class="img-box" v-show="!handheld_picture==''"><img :src="handheld_picture" alt=""></span>
                        <van-uploader  :after-read="onRead(3)" accept="image/*">
                            <img src="../../common/img/tianjia.png" alt="" class="addImg">
                        </van-uploader>
                    </div>
                </div>
                <div class="item-msg" id="license_end_p_t">{{handheld_picture_p_t}}</div>
            </div>
            <div class="list-item">
                <div class="list-item-title">———— 银行卡信息  ————</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>银行卡号：</span></div>
                    <div class="item-select">
                        <input type="number" class="form-control" id="bank_card" v-model="bank_card" placeholder="请输入银行卡号" />
                    </div>
                </div>
                <div class="item-msg" id="bank_account_number_t">{{bank_account_number_t}}</div>
                 <div class="item-box item-box2">
                <div class="item-title"><span>银行预留手机：</span></div>
                    <div class="item-select">
                        <input type="number" class="form-control" id="bank_phone" v-model="bank_phone" placeholder="请输入银行预留手机号" />
                    </div>
                </div>
                <div class="item-msg" id="bank_reserved_mobile_t">{{bank_reserved_mobile_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>开户姓名：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="subbranch_name" v-model="subbranch_name" placeholder="请输入开户名称" />
                    </div>
                </div>
                <div class="item-msg" id="open_account_name_t">{{open_account_name_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>银行类型：</span></div>
                    <div class="item-select">
                       	<button id="bank_type" class="form-control" @click="select_bank_type">{{bank_type}}</button>
                    </div>
                </div>
                 <div class="item-msg" id="open_account_name_t">{{bank_type_t}}</div>
                <div class="item-box item-box2" id="star_subbranch_box">
                    <div class="item-title"><span>开户支行：</span></div>
                    <div class="item-select">
                        <button id="star_subbranch" class="form-control" @click="select_star_subbranch">{{star_subbranch}}</button>
                    </div>
                </div>
                <div class="item-msg" id="branch_bank_name_t">{{branch_bank_name_t}}</div>
                <div class="item-msg" id="tips">提示:可左右滑动查看支行全称</div>
            </div>
            <div class="list-item">
                 <div class="list-item-title">———— 联系信息  ————</div>
                 <div class="item-box item-box2">
                    <div class="item-title"><span>联系人：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="uname" v-model="uname" placeholder="请输入联系人" />
                    </div>
                </div>
                <div class="item-msg" id="name_t">{{name_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>邮箱：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="uemail" v-model="uemail" placeholder="请输入邮箱" />
                    </div>
                </div>
                <div class="item-msg" id="email_t">{{email_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>电话：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="uphone" v-model="uphone" placeholder="选填，默认为银行预留手机号" />
                    </div>
                </div>
                <div class="item-msg" id="uphone_pt">{{uphone_pt}}</div>
            </div>
            <div class="list-item">
                <div class="list-item-title">———— 场地信息  ————</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>商户全称：</span></div>
                    <div class="item-select" id="shop_name_tip">
                        <input type="text" class="form-control" id="shop_name" v-model="shop_name" placeholder="请输入商户全称" />
                        <span class="tip_text" @click="shop_name_show=true">?</span>
                    </div>
                </div>
                <div class="item-msg" id="merchant_name_t">{{merchant_name_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>场地地址：</span></div>
                    <div class="item-select">
                        <button id="site_address" class="form-control" @click="select_site_address">{{site_address}}</button>
                    </div>
                </div>
                <div class="item-msg" id="branch_bank_name_t">{{site_address_t}}</div>
                <div class="item-box item-box2">
                    <div class="item-title"><span>详细地址：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="run_address" v-model="run_address" placeholder="请输入经营地址" />
                    </div>
                </div>
                <div class="item-msg" id="business_address_t">{{business_address_t}}</div>
                <!-- <div class="item-box item-box2" id="license_name_box">
                    <div class="item-title"><span>公司名称：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="company_name" v-model="company_name" placeholder="请输入公司名称，个体和公司必填" />
                    </div>
                </div>

                <div class="item-box item-box2" id="license_number_box">
                    <div class="item-title"><span>信用代码：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="company_number" v-model="company_number" placeholder="请输入信用代码，个体和公司必填" />
                    </div>
                </div> -->
                <div class="item-box item-box2">
                    <div class="item-title"><span>客服电话：</span></div>
                    <div class="item-select">
                        <input type="text" class="form-control" id="service_phone" v-model="service_phone" placeholder="选填，默认为银行预留手机号" />
                    </div>
                </div>
                <div class="list-item-upload">
                    <div class="upload-left">
                        <p class="upload_name"><span style="color: red" ><i class="icon iconfont icon-xiugai1"></i>门头与本人合照：</span></p>
                        <p class="upload_demo" @click="tips_btn(4)">查看示例</p>
                    </div>
                    <div class="upload-right">
                        <span class="img-box" v-show="!door_head_picture==''"><img :src="door_head_picture" alt=""></span>
                        <van-uploader  :after-read="onRead(4)" accept="image/*">
                            <img src="../../common/img/tianjia.png" alt="" class="addImg">
                        </van-uploader>
                    </div>
                </div>
                <div class="item-msg" id="branch_bank_name_t">{{door_head_picture_t}}</div>
                <div class="list-item-upload">
                    <div class="upload-left">
                        <p class="upload_name"><span style="color: red" ><i class="icon iconfont icon-xiugai1"></i>门店内景照：</span></p>
                        <p class="upload_demo" @click="tips_btn(5)">查看示例</p>
                    </div>
                    <div class="upload-right">
                        <span class="img-box" v-show="!site_interior_picture==''"><img :src="site_interior_picture" alt=""></span>
                        <van-uploader  :after-read="onRead(5)" accept="image/*">
                            <img src="../../common/img/tianjia.png" alt="" class="addImg">
                        </van-uploader>
                    </div>
                </div>
                <div class="item-msg" id="branch_bank_name_t">{{site_interior_picture_t}}</div>
                <!-- <div class="list-item-upload">
                    <div class="upload-left">
                        <p class="upload_name"><span><i class="icon iconfont icon-xiugai1"></i>营业执照：</span></p>
                        <p class="upload_demo" @click="tips_btn(6)">查看示例</p>
                    </div>
                    <div class="upload-right">
                        <span class="img-box" v-show="!license_picture==''"><img :src="license_picture" alt=""></span>
                        <van-uploader  :after-read="onRead(6)" accept="image/*">
                            <img src="../../common/img/tianjia.png" alt="" class="addImg">
                        </van-uploader>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="btn-submit" id="submit1">
            <button type="button" style="width: 100%;font-size: 22px;" class="btn btn-info dropdown-toggle" @click="save_confim">保存提交</button>
        </div>
        <van-popup v-model="company_type_show"  position="bottom"  >
             <van-picker show-toolbar :columns="columns" @confirm="oncompany_typeConfim" :default-index="company_typeIndex"  v-model="company_type"  @cancel="company_type_show = false"/>
        </van-popup>
        <van-popup v-model="select_trade_show"  position="bottom"  >
             <van-picker show-toolbar :columns="trade_code_list" :default-index="trade_codeIndex" @confirm="trade_codeConfim"  v-model="trade_code"  @cancel="select_trade_show = false"/>
        </van-popup>
         <van-popup v-model="select_channel_show"  position="bottom"  >
             <van-picker show-toolbar :columns="channel_list" @confirm="channelConfim"  @cancel="select_channel_show = false"/>
        </van-popup>
        <van-popup v-model="select_bank_type_show"  position="bottom"  >
             <van-picker show-toolbar :columns="bank_type_list" :default-index="bank_typeIndex" @confirm="bank_typeConfim"  @cancel="select_bank_type_show = false"/>
        </van-popup>
        <van-popup v-model="start_time_show"  position="bottom" >
            <van-datetime-picker v-model="start_currentDate" :min-date="minDate" :max-date="maxDate" type="date"  @confirm="start_time_confim"  @cancel="start_time_cancel"/>
        </van-popup>
         <van-popup v-model="end_time_show"  position="bottom" >
            <van-datetime-picker v-model="end_currentDate" type="date" :min-date="minDate" :max-date="maxDate"  @confirm="end_time_confim"  @cancel="end_time_cancel"/>
        </van-popup>
        <van-popup v-model="star_subbranch_show"  position="right" >
            <div class="main_top">
                <div class="warp-title" id='warp-title'>
                    温馨提示：	
                    <i class="icon iconfont icon-guanbi4" @click="star_subbranch_show=false"></i>
                    <div>&nbsp;&nbsp;&nbsp;1:当您开户支行名称是 "中国人民银行鞍山市中心支行",请在支行关键字输入类似如"鞍山市","中心支行"或者"鞍山市中心支行"以便精准搜索开户银行支行</div>
                    <div>&nbsp;&nbsp;&nbsp;2:为您开通平台支付功能需要精准开户银行支行信息,请确保支行信息正确</div>
                </div>
                <div class="seach_box">
                    <div id='showCityPicker' class="chooseBtn" @click="select_city">
                        {{select_bank_city}}
                    </div>
                    <div><input type="text" class="mui-input-clear sg-area-result" v-model="subbranch_value"></div>
                    <div class="search" id="search" @click="onSearch">查询</div>
                </div>
            </div>
            <div class="dataList" id="divScroll">
                    <ul class="list-group" id="wrapper">
                        <li v-for="(item,index) in citydata" :key="index" @click="select_branch(item.bank_branch_name)">{{item.bank_branch_name}}</li>
                    </ul>
            </div>
        </van-popup>
         <van-popup v-model="shop_name_show">
            <div class="main_top" style="width: 280px;">
                <div class="warp-title" id='warp-title' style="padding:20px">
                    温馨提示：	
                    <i class="icon iconfont icon-guanbi4" @click="shop_name_show=false"></i>
                    <div>&nbsp;&nbsp;&nbsp;1、不要填写常用的名称，尽量做到唯一性,例如便利店,应该填写XXX便利店；</div>
                    <div>&nbsp;&nbsp;&nbsp;2、不要涉及敏感字段，例如反政治、宗教、赌博等</div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="imgAddTipsShow">
            <div class="imgAddTips">
                <img :src="imgUrl" alt="">
            </div>
        </van-popup>
        <van-popup v-model="select_city_show"  position="bottom">
            <van-area :area-list="areaList" :columns-num="2" title="请选择支行城市" @confirm="Confim" @cancel="Cancel"/>
        </van-popup>
         <van-popup v-model="site_address_show"  position="bottom">
            <van-area :area-list="area" :columns-num="3" :value="cityIndex" title="请选择场地地址" @confirm="onConfim" @cancel="onCancel"/>
        </van-popup>
    </div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import {Toast} from 'vant'
import { Dialog } from 'vant';
import areaList from '../../city.js'
import area from '../../area.js'
export default {
    data () {
        return {
            tips:true,
            company_type_show:false,
            company_type:'PERSONAL', //商户类型
            columns: [
                { text: '个人' ,value:"PERSONAL"},
                { text: '个体', value:"PERSONAL_COMPANY"},
                { text: '公司',value:"COMPANY"}
            ],
            trade_code:'2016070600196537', //行业类型
            select_trade_show:false,
            trade_code_list:[
                { text: '自动售卖机',value:'2016070600196537'},
                { text: '超市',value:'2015091000058486'},
                { text: '便利店',value:'2015091000060134'},
                { text: '棋牌休闲',value:'2015090700041394'},
                { text: '手机',value:'2016062900190194'},
                { text: '通讯设备',value:'2016062900190195'},
                { text: '其它',value:'2015061690000025'}
            ],
            channel:'WECHAT', //签约通道
            select_channel_show:false,
            channel_list:[
                { text: '网商银行',value:'WECHAT' },
            ],
            license_name:'', //身份证名字
            license_number:'',//身份证号
            license_start_t:'请输入身份证有效期开始时间', //身份证有效期开始时间
            license_end_t:'请输入身份证有效期结束时间', //身份证有效期结束时间
            front_picture:'',
            imgIndex:'',
            reverse_picture:'',
            handheld_picture:'',
            imgUrl:'',
            imgAddTipsShow:false,
            bank_card:'', //银行卡号
            bank_phone:'', //银行预留手机号
            subbranch_name:'', //开户姓名
            bank_type:'请选择开户支行，必填', //银行类型
            select_bank_type_show:false,
            bank_type_list:[
                { text: '农村商业银行' },
                { text: '农村信用联社'},
                { text: '城市商业银行'},
                { text: '中国农业银行' },
                { text: '中国建设银行'},
                { text: '中国工商银行'},
                { text: '中国银行'},
                { text: '中国人民银行' },
                { text: '中国邮政储蓄银行'},
                { text: '交通银行'},
                { text: '中国农业发展银行' },
                { text: '招商银行'},
                { text: '中信银行'},
                { text: '中国民生银行' },
                { text: '兴业银行'},
                { text: '中国光大银行'},
                { text: '上海浦东发展银行' },
                { text: '华夏银行'},
                { text: '广东发展银行'},
                { text: '平安银行'},
                { text: '农村合作银行'},
                { text: '恒丰银行'},
                { text: '香港清算行' },
                { text: '浙商银行'},
                { text: '东亚银行'},
                { text: '其它'}
            ],
            star_subbranch:'', //支行名称
            star_subbranch_show:false,
            subbranch_value:'',
            select_city_show:false,
            areaList: areaList,
            area:area,
            uname:'', //联系人
            uemail:'', //邮箱
            uphone:'', //银行预留手机号
            shop_name:'', //商户名称
            site_address:'', //场地地址
            site_address_show: false,
            run_address:'',  //经营地址
            company_name:'', //公司名称
            company_number:'', //信用代码
            service_phone:'', //客服电话
            door_head_picture:'',  //门头照
            site_interior_picture:'', //营业场地内景照
            license_picture:'',  //营业执照
            company_type_p_t:'',
            trade_code_p_t:'',
            channel_p_t:'',
            license_name_p_t:'',
            license_number_p_t:'',
            license_start_p_t:'',
            license_end_p_t:'',
            front_picture_p_t:'',
            reverse_picture_p_t:'',
            handheld_picture_p_t:'',
            bank_account_number_t:'',
            bank_reserved_mobile_t:'',
            open_account_name_t:'',
            branch_bank_name_t:'',
            name_t:'',
            email_t:'',
            merchant_name_t:'',
            site_address_t:'',
            business_address_t:'',
            door_head_picture_t:'',
            site_interior_picture_t:'',
            bank_type_t:'',
            site_province:'',
            site_city:'',
            site_county:'',
            city_code:'',
            citydata:[],
            select_bank_city:'请选择城市',
            start_time_show: false,
            end_time_show: false,
            start_currentDate:'',
            end_currentDate:'',
            license_startgetTime:'',
            id:0,
            accountId:0,
            trade_code_v:'2016070600196537',
            company_type_v:'PERSONAL',
            channel_v:'WECHAT',
            trade_codeIndex:0,
            company_typeIndex:0,
            bank_typeIndex:0,
            cityIndex:'',
            status:0,
            signStatus:'',
            dealleval:'',
            minDate:new Date(1990, 1, 1),
            maxDate:new Date(2100, 1, 1),
            checked:false,
            uphone_pt:'',
            shop_name_show:false,
        }
    },
    methods: {
        handleTitle(){
            this.tips=false
        },
        /** ------ 商户类型的选择(start)--------*/
        oncompany_typeConfim(picker, values){
            this.company_type=picker.text;
            this.company_type_v=picker.value;
            this.company_type_show=false;
        },
        select_company_type(){
            this.company_type_show=true;
        },
         /** ------ 商户类型的选择(end)--------*/
         
          /** ------ 行业类型的选择(start)--------*/
        trade_codeConfim(picker, values){
            this.trade_code=picker.text;
            this.trade_code_v=picker.value;
            this.select_trade_show=false;
        },
        select_trade_code(){
            this.select_trade_show=true;
        },
         /** ------ 行业类型的选择(end)--------*/
         /** ------ 行业类型的选择(start)--------*/
        channelConfim(picker, values){
            this.channel=picker.text;
            this.channel_v=picker.value;
            this.select_channel_show=false;
        },
        select_channel(){
            this.select_channel_show=true;
        },
         /** ------ 行业类型的选择(end)--------*/

        /** ------ 开户银行类型的选择(start)--------*/
        bank_typeConfim(picker, values){
            this.bank_type=picker.text;
            this.select_bank_type_show=false;
        },
        select_bank_type(){
            this.select_bank_type_show=true;
        },
         /** ------ 开户银行类型的选择(end)--------*/

        /** -------- 图片上传(start) ---------*/
        onRead(index){
             return file => {
                let query = {
                    file:file.content
                }
                this.imgIndex=index;
                let img = new Image();
                var _this=this;
                img.src = query.file;
                img.onload=function(){
                    _this.ontpys(img);
                }
            };
        },
        //压缩图片的方法
		ontpys(img){
            let originWidth = img.width; // 压缩后的宽
            let originHeight=img.height;
            if(originWidth>1000){
                    originWidth=1000;
                    originHeight=img.height*(1000/img.width);
            }
            let canvas = document.createElement('canvas');
            let drawer = canvas.getContext("2d");
            let  quality = 0.8;
            canvas.width=originWidth;
            canvas.height=originHeight;
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            let base64 = canvas.toDataURL("image/jpeg", quality); // 压缩后的base64图片
            let file = this.dataURLtoFile(base64,Date.parse(Date())+'.jpg');
            file={content:base64,file:file};
            this.onimg(file);

		},
		//base64转file
		dataURLtoFile(dataurl,filename){
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                    u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr],filename,{type:mime});
		},
        //图片上传
        onimg(file){
            this.show1=false
            let _this=this;
            let imgStr=file.content;
            imgStr=_this.getCaption(imgStr);
            let fromData=qs.stringify({
                base64Data:imgStr,
                filename:file.file.name
            })
            axios({
                    method:'post',
                    url:'/api/SystemApi/UploadFile',
                    data:fromData,
                    responseType:'json'
                    }).then((res)=>{
                        if(res.data.status=='Success'){
                            if(_this.imgIndex==1){
                                _this.front_picture=res.data.uri
                            }else if(_this.imgIndex==2){
                                _this.reverse_picture=res.data.uri
                            }else if(_this.imgIndex==3){
                                _this.handheld_picture=res.data.uri
                            }else if(_this.imgIndex==4){
                                _this.door_head_picture=res.data.uri
                            }else if(_this.imgIndex==5){
                                _this.site_interior_picture=res.data.uri
                            }else if(_this.imgIndex==6){
                                _this.license_picture=res.data.uri
                            }
                            alert('上架成功')
                        }else{
                            alert(res.data.msg)
                        }
                    }).catch(err=>{
                            submitTest(err,_this);
            })
        },
        getCaption(obj){
            var index=obj.lastIndexOf("\,");
            obj=obj.substring(index+1,obj.length);
            return obj;
        },
          /** -------- 图片上传(end) ---------*/
        tips_btn(index){
            if(index==1){
                this.imgUrl=require("../../common/img/user_on.jpg")
            }else if(index==2){
                this.imgUrl=require("../../common/img/user_off.jpg")
            }else if(index==3){
                this.imgUrl=require("../../common/img/user_all.jpg")
            }else if(index==4){
                this.imgUrl=require("../../common/img/shop_wai.jpg")
            }else if(index==5){
                this.imgUrl=require("../../common/img/show_nei.jpg")
            }else if(index==6){
                this.imgUrl=require("../../common/img/shop_1.jpg")
            }
            this.imgAddTipsShow=true;
        },

        start_time(){
            this.start_time_show=true
        },
        start_time_confim(value){
            this.license_startgetTime=value.getTime()
            this.license_start_t=value.toLocaleDateString()
            this.start_time_show=false
        },
        start_time_cancel(){
            this.start_time_show=false
        },
        end_time(){
            this.end_time_show=true
        },
        end_time_confim(value){
            this.license_end_t=value.getTime()
            this.license_end_t=value.toLocaleDateString()
            if(this.license_startgetTime<=value.getTime()+86400*1000){
   			
            }else{
                Dialog.alert({
                message: '结束日期不低于开始日期'
                }).then(() => {
                 this.end_time_show=true
                });
            }
            this.end_time_show=false
        },
        end_time_cancel(){
            this.end_time_show=false
        },
        /**------ 开户支行的选择(start) --------*/
        select_star_subbranch(){
            if(this.bank_type=="请选择开户支行，必填"){
                Toast('请先选择开户银行类型');
            }else{
                this.star_subbranch_show=true;
                
            }
        },
        select_city(){
            this.select_city_show=true
        },
        onSearch(){
            let _this=this
            axios({
                method:'get',
                url:url.adminurl+'/api/BankApi/GetCbBchBanks?keyword='+_this.subbranch_value+'&bank_name='+_this.bank_type+'&city_code='+_this.city_code,
                responseType:'json'
                }).then((res)=>{
                    console.log(res)
                    if(res.data.status=="Fail"){
                        alert(res.data.msg);
                    }else{
                        _this.citydata=res.data.data
                    }
                }).catch(err=>{
                   submitTest(err,_this);
                })
        },
        Confim(value){
            for(let i in area.city_list){
                if(area.city_list[i] == value[1].name){
                    this.city_code=i;
                    this.select_bank_city=value[1].name;
                    this.select_city_show=false;              
                }
            }
            
        },
        Cancel(){
            this.select_city_show=false
        },

        /**---------- 选择支行(start) -----------*/
        select_branch(branch){
            this.star_subbranch=branch;
            Dialog.confirm({
            title: '是否选中该支行',
            message: branch
            }).then(() => {
                this.star_subbranch=branch
                this.star_subbranch_show=false
            }).catch(() => {

            });

        },
         /**---------- 选择支行(end) -----------*/
         /**------------- 选择场地地址(start) ---------------*/
         select_site_address(){
             this.site_address_show=true;
         },
         onCancel(){
             this.site_address_show=false;
         },
         onConfim(value){
            this.site_province=value[0].name;
            this.site_city=value[1].name;
            this.site_county=value[2].name;
            this.site_address=this.site_province+this.site_city+this.site_county
            this.site_address_show=false;
         },
         /**------------- 选择场地地址(start) ---------------*/
         
         /**-------------- 提交(start) --------------- */
         save_confim(){
             let _this=this
             if(this.checked==true){
                this.license_end_t="3000/1/1"
             }
             if(this.service_phone==''||this.service_phone==null){
                 this.service_phone=this.bank_phone
             }
             if(this.uphone==''||this.uphone==null){
                  this.uphone=this.bank_phone
             }
             var reg=/^((1[3,5,8,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
             if(!/^((1[3,5,8,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.uphone)){
                  this.uphone_pt="手机号格式不正确"
             }else if(this.company_type==''){
                 this.company_type_p_t="商户类型不能为空"
             }else if(this.trade_code==''){
                 this.trade_code_p_t="行业类型不能为空"
             }else if(this.channel==''){
                 this.channel_p_t="签约通道不能为空"
             }else if(this.license_name==''){
                 this.license_name_p_t="身份证姓名不能为空"
             }else if( this.license_number==''){
                 this.license_number_p_t="身份证号码不能为空"
             }else if( this.license_start_t=='请输入身份证有效期开始时间'|| this.license_start_t==''){
                 this.license_start_p_t="身份证有效开始时间不能为空"
             }else if(this.license_end_t=='请输入身份证有效期结束时间'||this.license_end_t==''){
                 this.license_end_p_t="身份证有效结束时间不能为空"
             }else if(this.front_picture==''){
                 this.front_picture_p_t="身份证正面图片不能为空"
             }else if(this.reverse_picture==''){
                 this.reverse_picture_p_t="身份证反面图片不能为空"
             }else if(this.handheld_picture==''){
                 this.handheld_picture_p_t="手持身份证照不能为空"
             }else if(this.bank_card==''){
                 this.bank_account_number_t="银行卡号不能为空"
             }else if(!/^((1[3,5,8,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.bank_phone)){
                 this.bank_reserved_mobile_t="银行预留手机号格式不正确"
             }else if( this.subbranch_name==''){
                 this.open_account_name_t="开户姓名不能为空"
             }else if(this.bank_type==''){
                 this.bank_type_t="银行类型不能为空"
             }else if(this.star_subbranch==''){
                 this.branch_bank_name_t="支行名称不能为空"
             }else if(this.uname==''){
                 this.name_t="联系人不能为空"
             }else if(this.uemail==''){
                 this.email_t="邮箱不能为空"
             }else if(this.shop_name==''){
                 this.merchant_name_t="商户全称不能为空"
             }else if(this.site_address==''){
                 this.site_address_t="场地地址不能为空"
             }else if(this.run_address==''){
                 this.business_address_t="经营地址不能为空"
             }else if(this.door_head_picture==''){
                 this.door_head_picture_t="营业场所门头照不能为空"
             }else if(this.site_interior_picture==''){
                 this.site_interior_picture_t="营业场所内景照不能为空"
             }else if(this.license_name!=this.subbranch_name){
                 alert("银行卡开户名称必须与身份证姓名一致")
             }else if(!reg.test(this.bank_phone)){
                 alert("银行预留手机号格式不正确")
             }else{
                this.company_type_p_t='';
                this.trade_code_p_t='';
                this.channel_p_t='';
                this.license_name_p_t='';
                this.license_number_p_t='';
                this.license_start_p_t='';
                this.license_end_p_t='';
                this.front_picture_p_t='';
                this.reverse_picture_p_t='';
                this.handheld_picture_p_t='';
                this.bank_account_number_t='';
                this.bank_reserved_mobile_t='';
                this.open_account_name_t=''
                this.bank_type_t='';
                this.branch_bank_name_t='';
                this.name_t='';
                this.email_t='';
                this.merchant_name_t='';
                this.site_address_t='';
                this.business_address_t='';
                this.door_head_picture_t='';
                this.site_interior_picture_t='';
                this.uphone_pt='';
              	let fromData=qs.stringify({
                    id:this.id,
                    accountId:this.accountId,
                    company_type: this.company_type_v,
                    channel: this.channel_v,
                    merchant_name: this.shop_name,
                    abbreviation: this.shop_name,
                    trade_code: this.trade_code_v,
                    province: this.site_province,
                    city: this.site_city,
                    area: this.site_county,
                    business_address: this.run_address,
                    service_telephone: this.service_phone,
                    email: this.uemail,
                    name: this.uname,
                    phone: this.uphone,
                    license_name: this.company_name,
                    license_number: this.company_number,
                    license_name_p:  this.license_name,
                    license_number_p: this.license_number,
                    begin_time: this.license_start_t,
                    end_time: this.license_end_t,
                    bank_account_number: this.bank_card,
                    bank_reserved_mobile: this.bank_phone,
                    open_account_bank: this.bank_type,
                    branch_bank_name: this.star_subbranch,
                    open_account_name: this.subbranch_name,
                    ID_CARD_FRONT: this.front_picture,
                    ID_CARD_BACK: this.reverse_picture,
                    BUSINESS_LICENSE: this.license_picture,
                    BUSINESS_PLACE_DOOR_HEAD: this.door_head_picture,
                    BUSINESS_PLACE_INTERIOR: this.site_interior_picture,
                    HAND_HOLD_ID_CARD: this.handheld_picture,
                    status:this.status,
                    signStatus:this.signStatus,
                    dealleval: this.dealleval,
                })
                Dialog.confirm({
                message: "是否确认保存"
                }).then(() => {
                    axios({
                        method:'post',
                        url:url.adminurl+'/api/MerchantApi/SaveStuff',
                        data:fromData,
                        responseType:'json'
                    }).then(res=>{
                        console.log(res)
                        if(res.data.status=='Success'){
                            alert(res.data.msg)
                            this.getInfo()
                        }else if(res.data.status=='Fail'){
                            alert(res.data.msg)
                        }
                    }).catch(err=>{
                        submitTest(err,_this);
                    })
                }).catch(() => {
                
                });
             }
         },
         /**-------------- 提交(end) --------------- */
         /**------------- 获取信息(start) ---------------*/
         getInfo(){
            let _this=this
            axios({
                method:'post',
                url:url.adminurl+'/api/MerchantApi/GetStuffDetail',
                responseType:'json'
                }).then((res)=>{
                    console.log(res)
                if(res.data==''||res.data==null){
                    
                }else{
                    this.id=res.data.id;
                    this.accountId=res.data.accountId
                    if(res.data.company_type=="PERSONAL"){
                        this.company_type="个人"
                    }else if(res.data.company_type=="PERSONAL_COMPANY"){
                        this.company_type="个体"
                    }else if(res.data.company_type=="COMPANY"){
                        this.company_type="公司"
                    }
                    if(res.data.channel=="WECHAT"){
                        this.channel="网络银行"
                    }
                    this.channel_v=res.data.channel
                    this.company_type_v=res.data.company_type;
                    this.trade_code_v=res.data.trade_code;
                    this.shop_name=res.data.merchant_name;
                    if(res.data.trade_code=="2016070600196537"){
                        this.trade_code="自动售卖机";
                    }else if(res.data.trade_code=="2015091000058486"){
                        this.trade_code="超市";
                    }else if(res.data.trade_code=="2015091000060134"){
                        this.trade_code="便利店";
                    }else if(res.data.trade_code=="2015090700041394"){
                        this.trade_code="棋牌休闲";
                    }else if(res.data.trade_code=="2016062900190194"){
                        this.trade_code="手机";
                    }else if(res.data.trade_code=="2016062900190195"){
                        this.trade_code="通讯设备";
                    }else if(res.data.trade_code=="2015061690000025"){
                        this.trade_code="其它";
                    }
                    this.site_address=res.data.province+res.data.city+res.data.area
                    this.site_province=res.data.province;
                    this.site_city=res.data.city
                    this.site_county=res.data.area;
                    this.run_address=res.data.business_address;
                    this.service_phone=res.data.service_telephone;
                    this.uemail=res.data.email;
                    this.uname=res.data.name;
                    this.uphone=res.data.phone;
                    this.company_name=res.data.license_name;
                    this.company_number=res.data.license_number;
                    this.license_name=res.data.license_name_p;
                    this.license_number=res.data.license_number_p;
                    var start_time=new Date(res.data.begin_time);
                    var end_time=new Date(res.data.end_time);
                    this.start_currentDate=start_time;
                    this.end_currentDate=end_time;
                    if(res.data.begin_time==null||res.data.begin_time==''){
                        this.license_start_t="请输入身份证有效期开始时间"
                    }
                    this.license_start_t=start_time.toLocaleDateString();
                    if(res.data.end_time==null||res.data.end_time==''){
                        this.license_end_t="请输入身份证有效期结束时间"
                    }
                    this.license_end_t=end_time.toLocaleDateString()
                    if(this.license_end_t=="3000/1/1"){
                        this.license_end_t="长期";
                        this.checked=true;
                    }
                    this.bank_card=res.data.bank_account_number
                    this.bank_phone=res.data.bank_reserved_mobile;
                    this.bank_type=res.data.open_account_bank
                    this.star_subbranch=res.data.branch_bank_name
                    this.subbranch_name=res.data.open_account_name
                    this.front_picture=res.data.ID_CARD_FRONT
                    this.reverse_picture=res.data.ID_CARD_BACK
                    this.license_picture=res.data.BUSINESS_LICENSE
                    this.door_head_picture=res.data.BUSINESS_PLACE_DOOR_HEAD
                    this.site_interior_picture=res.data.BUSINESS_PLACE_INTERIOR
                    this.handheld_picture=res.data.HAND_HOLD_ID_CARD;
                    this.status=res.data.status;
                    this.signStatus=res.data.signStatus;
                    this.dealleval=res.data.dealleval,
                    this.trade_code_list.map(function (item,index,input) {  
                        if(item.value==res.data.trade_code){
                            _this.trade_codeIndex=index
                        }
                    })
                    this.columns.map(function (item,index,input) {  
                        if(item.value==res.data.company_type){
                            _this.company_typeIndex=index
                        }
                    })
                    this.bank_type_list.map(function (item,index,input) {  
                        if(item.text==res.data.open_account_bank){
                            _this.bank_typeIndex=index
                        }
                    })
                    axios({
                        method:'get',
                        url:url.adminurl+'/api/CityApi/GetCbCity?cityName='+this.site_county,
                        responseType:'json'
                        }).then((res)=>{
                            console.log(res)
                            this.cityIndex=res.data.city_code;
                        }).catch(err=>{
                            submitTest(err,_this);
                        })
                }
                }).catch(err=>{
                    submitTest(err,_this);
                })
         }
    },
    mounted() {
        
    },
    created () {
      this.getInfo()
    }
}
</script>

<style lang="less">
.stuffIndex{
    .warp-title{
        width: 100%;
        box-sizing: border-box;
        padding: 10px 10px;
        background: #FFFFCC;
        color: rgb(245, 108, 108);
        font-size: 14px;
        i{
            float: right;
        }
    }
    .van-popup{
        overflow: hidden;
    }
    .van-popup--right{
        width: 100%;
        height: 100%;
        background: #fff;
        
        .main_top{
            // position: fixed;
            // top:0;
            width: 100%;
            z-index: 2;
            height: 190px;
            background: #fff;
             .seach_box{
                width: 100%;
                height: 40px;
                margin: 20px 7px 10px;
                .chooseBtn {
                    width: 20%;
                    height: 40px;
                    border: 1px solid #eee;
                    text-align: center;
                    float: left;
                    line-height: 40px;
                    font-size: 14px;
                }
                input{
                    width: 65%;
                    height: 38px;
                    float: left;
                    border: 1px solid #eee;
                    font-size: 14px;
                }
                .search {
                    width: 10%;
                    height: 42px;
                    text-align: center;
                    float: left;
                    background: #23b7e5;
                    color: #fff;
                    line-height: 40px;
                    font-size: 14px;
                }
            }
        }
        .dataList{
            // position: absolute;
            // top: 190px;
            width: 100%;
            background: #fff;
            height: calc(73vh);
            overflow: hidden;
            ul{
                width: 100%;
                overflow: auto;
                height: calc(73vh);
                li{
                    border-bottom: 1px solid #eee;
                    padding: 10px;
                    line-height: 20px;
                    font-size: 14px;
                }    
            }
        }
    }
    .imgAddTips{
        width: 340px;
        img{
            width: 100%;
        }
    }
    .list {
        width: 95%;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 55px;
        .list-item {
            width: 99%;
            margin: 0 auto;
            padding: 3px 10px 20px 10px;
            box-sizing: border-box;
            border-radius: 10px;
            background: #fff;
            margin-top: 20px;
            box-shadow: 0 3px 3px #cbc9c9;
            .list-item-title {
                padding: 5px 0;
                background: transparent;
                font-size: 16px;
                font-weight: bold;
                color: #606266;
                text-align: center;
                border-bottom: 1px solid #EBEEF5;
            }
            .item-box {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .item-title {
                    width: 40%;
                    line-height: 34px;
                    text-align: center;
                }
                .item-select {
                    width: 69%;
                    overflow: hidden;
                    .form-control {
                        background-color: #fff;
                        opacity: 1;
                        width: 100%;
                        height: 34px;
                        border: 1px solid #eee;
                        border-radius: 5px;
                        text-align: left;
                        padding-left: 10px;
                        overflow-x: auto;
                        white-space: nowrap;
                    }
                    input{
                        width: 95% !important;
                    }
                   
                }
                #shop_name_tip{
                     position: relative;
                     .tip_text{
                        width: 20px;
                        position: absolute;
                        right: 10px;
                        top: 7px;
                        display: inline-block;
                        line-height: 20px;
                        height: 20px;
                        text-align: center;
                        font-size: 18px;
                        color: #31c1e7;
                        border: 1px solid #31c1e7;
                        border-radius: 50%;
                    }
                }
            }
            .item-box2 {
                margin-top: 15px;
            }
            .list-item-upload {
                margin: 10px 0;
                padding: 20px 0;
                border-bottom: 1px solid #EBEEF5;
                overflow: hidden;
                .upload-left{
                    width: 50%;
                    float: left;
                    .upload_name{
                        font-size: 14px;
                        margin: 0 20px 0 0;
                        i{
                            margin-right: 5px;
                        }
                    }
                    .upload_demo{
                        font-size: 14px;
                        margin: 0;
                        color: #31b0d5
                    }
                }
                .upload-right{
                    width: 50%;
                    float: left;
                    .img-box{
                        display: inline-block;
                        width: 60px;
                        height: 60px;
                        margin-right: 10px;
                        img{
                            width: 60px;
                            height: 60px;
                        }
                    }
                    .addImg{
                        display: inline-block;
                        width: 60px;
                        height: 60px;
                    }
                }
            }
            .item-msg {
                color: #F56C6C;
                font-size: 12px;
                margin-left: 30%;
                padding-top: 5px;
                padding-left: 20px;
                .van-checkbox__label{
                   color: #F56C6C; 
                }
            }
        }
    }
    .btn-submit {
        position: fixed;
        width: 100%;
        bottom: 0;
        .btn-info{
            height: 46px;
            line-height: 46px;
            border: none;
            color: #fff;
            background-color: #31b0d5;
        }
    }
}
</style>
