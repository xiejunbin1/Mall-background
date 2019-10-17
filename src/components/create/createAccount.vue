<template>
    <div id="pow">
        <div class="accountInformation">账号信息</div>
        <div class="Information">
            <div class="account">
                <van-cell-group>
                    <van-field
                        required
                        clearable
                        maxlength="11"
                        v-model="username"
                        label="账号"
                        placeholder="请输入手机号"
                    />
                </van-cell-group>
            </div>
            <div class="account">
                <van-cell-group>
                    <van-field
                        border
                        required
                        v-model="password"
                        type="password"
                        label="密码"
                        placeholder="请输入用密码8~20位"
                    />
                </van-cell-group>
            </div>
            <div class="account">
                <van-cell-group>
                    <van-field
                        border
                        required
                        v-model="name"
                        label="名称"
                        placeholder="请输入名称"
                    />
                </van-cell-group>
            </div>
        </div>
        <div class="accountInformation">账号权限</div>
        <div class="Information">
            <div class="account">
                <van-cell-group>
                    <van-field
                        required
                        clearable
                        disabled
                        v-model="role"
                        label="岗位角色"
                        placeholder="请选择"
                    />
                </van-cell-group>
                <img src="../../common/img/fanhui.png" class="jiantou" @click="vanfield" />
            </div>
            <div class="account">
                <van-cell-group>
                    <van-field
                        border
                        required
                        disabled
                        v-model="permissions"
                        placeholder="请选择"
                        label="场地权限"
                        
                    />
                </van-cell-group>
                <img src="../../common/img/fanhui.png" class="jiantou1" @click="ClickSite" />
            </div>
        </div>
        <van-popup
            v-model="show"
            position="bottom"
            class="van-popup"
        >
            <div class="tou">岗位角色
                <div class="tou_riet" @click="NEW">新增</div>
            </div>
            <div class="role" v-for="(value,index) in Datagroup" :key="index" @click="choose(index)">
                <label :for="index">{{ value.F_RoleName }}
                    <input type="radio" :name="value" :id="index" >
                </label>
            </div>
        </van-popup>

        <van-popup
            v-model="site"
            position="bottom"
            class="vanPopup"
        >
            <div class="tou">
                <div @click="cancel">取消</div>
                <div @click="determine">确定</div>
            </div>
            <div class="all">
                <div class="all_div">
                    <div class="all_div_div">全部</div>
                    <van-switch
                        v-model="checked"
                        size="20px"
                        @change="all"
                    />
                </div>
            </div>
            <div class="siteSelection" v-for="(value,index) in Datesite" :key="index">
                <div class="siteSelection_div">
                    <div class="siteSelection1">{{ value.address }}</div>
                    <van-switch
                        v-model="value.check"
                        size="20px"
                        @change="siteSelection(index)"
                    />
                </div>
            </div>
        </van-popup>
        <button class="bottom" @click="save" :disabled="isDisable">保存</button>
    </div>
</template>

<script>
import { Field,Popup,Switch,Col,Toast } from 'vant';
import axios from 'axios';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
export default {
    data () {
        return {
            isDisable:false,
            username:'',//用户
            password:'',//密码
            name:'',//名称
            role:'',//角色
            permissions:'',//权限
            show:false,//岗位角色
            site:false,//场地权限
            checked:"",//地址选择全部
            F_RoleId:"",//岗位id
            value:"",//开关
            Datagroup:[
               
            ],// 角色
            checkboxList:[],
            Datesite:[
                // {
                //     siteSelection:"儿童乐园",
                //     check:"",//地址选择
                // },
                // {
                //     siteSelection:"游乐园",
                //     check:"",//地址选择
                // },
                // {
                //     siteSelection:"水上世界",
                //     check:"",//地址选择
                // },
                // {
                //     siteSelection:"森林公园",
                //     check:"",//地址选择
                // },
            ],
            data:[],
            Data:[],
        }
    },
    methods: {
        //选择
        choose(index){
            this.role = this.Datagroup[index].F_RoleName
            this.F_RoleId = this.Datagroup[index].F_RoleId
            // this.show = false
        },
        //新增
        NEW(){
            localStorage.setItem("key",this.username)
            localStorage.setItem("password",this.password)
            localStorage.setItem("name",this.name)
               
            this.$router.push({path:'/toCreateJobs'})
        },
        //岗位角色选择
        vanfield(){
            let _this = this
            this.show = true
            axios({
                method:'get',
                url:url.adminurl+'/api/AuthRoleModuleApi/List_Role',
                responseType:'json'
            }).then((err)=>{
                this.Datagroup = err.data
                // console.log(this.Datagroup)
            }).catch(err=>{
                submitTest(err,_this);
            })
        },
        //场地选择全部选择
        all(){
            if(this.checked == true){
                this.Datesite.filter((item)=> {
                    item.check = true
                    var check ={
                        quanbu:item.check
                    }
                    this.data.push(check)
                });
            }
            if(this.checked == false ){
               this.Datesite.filter( (item)=> {
                    item.check = false
                });
            }
        },
        //场地权限输入
        ClickSite(){
            this.site = true
        },
        //场地选择单个
        siteSelection(index){
            // this.Datesite.filter((item)=> {
            //     console.log(item.check)
            //     item.check == true ? this.checked = true : this.checked = false
                
            // });
            
            var check ={
                quanbu:this.Datesite[index].check
            }
            this.data.push(check)
        },
        //确定场地选择
        determine(){
            console.log()
            if(this.data.length == 0){
                return false
            }else{
                this.site = false
                this.permissions="已选择"
            }
        },
        //取消
        cancel(){
            this.site = false
        },
        //保存
        save(){
            this.isDisable = true
            let reg=/^[0-9A-Za-z]{8,20}$/
            if(!/^((1[3,5,8,9,7][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.username)){
                Toast.fail('手机号码不正确');
                this.isDisable = false
            }else if(this.password==""||this.password==null){
                Toast.fail('密码不能为空');
                this.isDisable = false
            }else if(this.name==""||this.name==null){
                Toast.fail('名称不能为空');
                this.isDisable = false
            }else if(!reg.test(this.password)){
                Toast.fail('密码长度在8~20之间，只能包含字母和数字');
                this.isDisable = false
            }else if(this.role==""||this.role==null){
                Toast.fail('岗位角色不能为空');
                this.isDisable = false
            }else if(this.permissions==""||this.permissions==null){
                Toast.fail('权限设置不能为空');
                this.isDisable = false

            }else{
                console.log(this.Datesite)
                let check ={
                    quanbu:[]
                }
                for(let i in this.Datesite){
                    if(this.Datesite[i].check == true){
                        check.quanbu = this.Datesite[i].id
                        this.Data.push(check.quanbu)
                        // console.log(this.Data)
                    }
                }
                // console.log(this.F_RoleId)
                let _this = this
                axios({
                    method:"POST",
                    url:url.adminurl+'/api/AccountApi/Create',
                    data:{
                        accountId:0,
                        F_RoleId:this.F_RoleId,
                        mobile:this.username,
                        name:this.name,
                        pwd:this.password,
                        addressIds:this.Data,
                    },
                    responseType:'json'
                }).then((err)=>{
                    // console.log(err)
                    this.isDisable = false
                    Toast.success(err.data.msg);
                    if(err.data.msg == "成功"){
                        this.isDisable = true
                        let _this = this
                        setTimeout(()=>{
                            localStorage.removeItem("key"); //移除所有的缓存数据
                            localStorage.removeItem("password"); //移除所有的缓存数据
                            localStorage.removeItem("name"); //移除所有的缓存数据
                            _this.$router.go(-1);
                        },2000)
                    }else{
                        this.isDisable = false
                    }
                    
                }).catch(err=>{
                    submitTest(err,_this);
                })
               
            }
        },
        dizhi(){
            let _this = this
            axios({
                mounted:'GET',
                url:url.adminurl+'/api/MachineAddressApi/List',
            }).then((err)=>{
                // console.log(err.data)
                this.Datesite = err.data
            }).catch(err=>{
                submitTest(err,_this);
            })
        }

    },
    //挂载完成
    mounted () {
        this.dizhi()
        var lastname = localStorage.getItem("key");
        var password = localStorage.getItem("password");
        var name = localStorage.getItem("name");
        this.username=lastname
        this.password = password
        this.name = name
    },
    //开始创建
    created(){
       
       
    },
}
</script>

<style lang="less" scoped>
@import '../../style/main.less';
    #pow{
        width: 100%;
        height: 100%;
        background-color: @BGGrey;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .accountInformation{
        width: 95%;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: @FTC3;
    }
    .Information{
        width: 95%;
        height: 150px;
        background: #fff;
        border-radius:5px; 
        display: flex;
        flex-direction: column;
        align-items: center;
        .account{
            width: 95%;
            height: 50%;
            .jiantou{
                position: absolute;
                top:230px;
                width: 30px;
                height: 25px;
                right: 20px;
            }
        }
    }
    .van-popup{
        height: 40%;
       .tou{
           width: 95%;
           height: 15%;
           border-bottom: 1px solid @BOX3;
           display: flex;
           justify-content: center;
           align-items: center;
           font-size: 15px;
           margin: 0 auto;
           .tou_riet{
               color: #409EFF;
               position: absolute;
               right: 10px
           }
        }
        .role{
            width: 95%;
            height:35px;
            border-bottom: 1px solid @BOX3;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;
            font-size: 14px;
            label{
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: center;
                justify-content: space-between;
            }
           
            
        }
    }
    .vanPopup{
        height: 40%;
        background: #FAF8FA;
        .tou{
            width: 95%;
            height: 15%;
            border-bottom: 1px solid @BOX2;
            display: flex;
            justify-content:space-between;
            align-items: center;
            font-size: 14px;
            color: #409EFF;
        }
    }
    .all{
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #efefef;
        background: #fff;
        display: flex;
        justify-content: center;
        .all_div{
            width: 95%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .all_div_div{
                font-size: 14px;
            }
        }
    }
    .siteSelection{
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #efefef;
        background: #fff;
        display: flex;
        justify-content: center;
        .siteSelection_div{
            width: 95%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .siteSelection1{
                font-size: 14px;
            }
        }
    }
    .bottom{
        width: 100%;
        height: 45px;
        background: #409EFF;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: 0;
        
    }
    .jiantou1{
        position: absolute;
        top:305px;
        width: 30px;
        height: 25px;
        right: 20px;
    }
</style>