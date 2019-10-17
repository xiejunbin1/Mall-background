<template>
    <div id="parameter_set">
        <div class="announcement">
            参数设置
        </div>
        <div class="warp-title" id='warp-title'>
            温馨提示：	
            <div>&nbsp;&nbsp;&nbsp;* 游戏数值在0~50之间</div>
        </div>
        <div class="mainInput">
              <div class="row" v-for="(item,index) in clitk" :key="index">
                 <div class="lable">{{item.fieldtext}}:</div>
                 <div class="input"><input type="number" v-model="item.fieldvalue" placeholder="游戏数值在0~50之间"></div>
             </div>
             <div class="aRefund" v-show="xians">
                <div class="aRefund_left">自动退款:</div>
                <div class="aRefund_right">
                    <van-switch
                        v-model="checked"
                        size="20px"
                        @input="onInput"
                    />
                </div>
            </div>
        </div>
        
        <div class="title-div" @click="submint">
             <button class="manage-btn-div van-button van-button--primary van-button--large">
                 <span class="van-button__text">保存</span>
             </button>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
import { Toast } from 'vant';
import { Dialog } from 'vant';
import Footer from '../index/index'
export default {
    data () {
        return {
            checked:"",//自动退款开关默认关
            xians:false,
            rowList:[{"id":0,"fieldname":"gamePrize","fieldtext":"游戏数值","fieldvalue":"","machineNum":this.$route.query.mid}],//接收后台返回的数据
            clitk:[],//吧aaa里面的数据放到clitk里面用于页面显示
            aaa:[],//吧rowList里面的数据放到clitk
        }
    },
    methods: {
        getAnnouncementList(){
			let _this=this
			axios({
				method: 'get',
				url:url.adminurl+'/api/MachineArgsApi/List?machineNum='+this.$route.query.mid,
			}).then((res)=>{
                for(let i in res.data){
                    if(res.data[i].fieldtext == "自动退款"){
                        if(res.data[i].fieldvalue==1){
                            this.checked = true
                        }
                        if(res.data[i].fieldvalue==0){
                            this.checked = false
                        }
                    }
                }
                if(res.data.length!=0){
                    this.rowList=res.data;//用于操作数据页面是页面数据是数据
                    this.aaa = this.aaa.concat(this.rowList)
                    this.clitk=this.aaa;//用于页面显示
                    //把用于页面显示的数据里面的自动退款对象删除
                    for(var item in this.clitk){
                        if(this.clitk.hasOwnProperty(item)){
                            if(this.clitk[item].fieldtext === "自动退款"){
                                this.clitk.splice(item,1);
                                continue;
                            }
                        }
                    }
                    //有自动退款的数据就显示按钮没有就隐藏
                    
                   this.rowList.map((value,index)=>{
                        if(value.fieldtext == "自动退款"){
                            this.xians = true
                        }
                    });
                   
                }
			}).catch(err=>{
				submitTest(err,_this);
			})
        },
        onInput(){
           if(this.checked == true){
               this.rowList.map((value,index)=>{
                    if(value.fieldtext=="自动退款"){
                        value.fieldvalue = 1
                   }
                });
           }else{
               this.rowList.map((value,index)=>{
                    if(value.fieldtext=="自动退款"){
                        value.fieldvalue = 0
                   }
                });
           }
        },
        submint(){
            Dialog.confirm({
            title: '提示',
            message: '是否保存'
            }).then(() => {
                let _this=this
                for (let i in this.clitk) {
                    console.log(this.clitk[i].fieldvalue)
                    if(this.clitk[i].fieldvalue == ""||this.clitk[i].fieldvalue == null){
                        Toast.fail('数据不能为空');
                    }else{
                        for (let index = 0; index < this.rowList.length; index++) {
                            this.rowList[index].fieldname
                            console.log(this.rowList.length)
                            if(this.rowList[index].fieldname=="gameLevel"){
                                if(this.rowList[index].fieldvalue>-1&&this.rowList[index].fieldvalue<51){
                                    axios({
                                        method:'post',
                                        url:url.adminurl+'/api/MachineArgsApi/Edit',
                                        data:this.rowList,
                                        responseType:'json'
                                    }).then(res=>{
                                        console.log(this.rowList,"index")
                                        if(res.data.status=='Success'){
                                            Toast.success('保存成功');
                                            // this.getAnnouncementList();
                                            // this.getAnnouncementList();
                                        }else if(res.data.status=='Fail'){
                                            alert(res.data.msg)
                                        }
                                    }).catch(err=>{
                                        submitTest(err,_this);
                                    })
                                }else{
                                    alert("游戏数值需在5~30之间")
                                }
                            }else if(this.rowList[index].fieldname=="gamePrize"){
                                axios({
                                    method:'post',
                                    url:url.adminurl+'/api/MachineArgsApi/Edit',
                                    data:this.rowList,
                                    responseType:'json'
                                }).then(res=>{
                                    if(res.data.status=='Success'){
                                        Toast.success('保存成功');
                                        // this.getAnnouncementList();
                                        // this.getAnnouncementList();
                                    }else if(res.data.status=='Fail'){
                                        alert(res.data.msg)
                                    }
                                }).catch(err=>{
                                    submitTest(err,_this);
                                })
                            }else if(this.rowList[index].fieldname=="autoRefund"){
                                axios({
                                    method:'post',
                                    url:url.adminurl+'/api/MachineArgsApi/Edit',
                                    data:this.rowList,
                                    responseType:'json'
                                }).then(res=>{
                                    if(res.data.status=='Success'){
                                        Toast.success('保存成功');
                                        // this.getAnnouncementList();
                                        // this.getAnnouncementList();
                                    }else if(res.data.status=='Fail'){
                                        alert(res.data.msg)
                                    }
                                }).catch(err=>{
                                    submitTest(err,_this);
                                })
                            }
                    
                        }
                    }
                }
            }).catch(() => {
            // on cancel
            });
        },
    },
    created () {
        this.getAnnouncementList();
    },
    mounted () {
       
    },
    components: {
        Footer
    }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';
#parameter_set{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    .announcement{
        text-align: center;
        padding: 12px 0;
        font-size: 20px;
        color: #fff;
        background: #409eff;
    }
    .warp-title{
        width: 100%;
        box-sizing: border-box;
        padding: 10px 10px;
        background: #FFFFCC;
        color: rgb(245, 108, 108);
        font-size: 14px;
    }
    .mainInput{
        margin: 10px 5px;
        .row{
            height: 30px;
            border: 1px solid #eee;
            padding: 5px 0;
            margin-top: 10px;
            .lable{
                width:35%;
                line-height: 30px;
                height: 30px;
                float: left;
                color: #000;
                font-size: 14px;
                padding-left: 12px;
            }
            .input{
                width: 60%;
                height: 30px;
                line-height: 30px;
                float: left;
                font-size: 14px;
                input{
                    border: none;
                    height: 28px;
                    line-height: 28px;
                    padding: 0 10px;
                }
            }
        }
    }
    .aRefund{
        width: 100%;
        height: 30px;
        display: flex;
        .aRefund_left{
            width: 20%;
            height: 100;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 14px;
            padding-left: 10px;
            color: #000;
        }
        .aRefund_right{
            width: 80%;
            height: 100;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 14px;
        }
    }
    .title-div{
        width: 100%;
        position: fixed;
        bottom: 51px;
        .manage-btn-div{
            background: #409eff;
        }
    }
}
.yin{
    width: 100px;
    height: 20px;
    border: 1px solid red;
}
</style>
