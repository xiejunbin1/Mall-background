<template>
    <div id="pow">
        <van-cell-group class="van-cell-group">
            <van-field
                v-model="username"
                label="岗位名称"
                placeholder="如店长、员工等"
                readonly
            />
        </van-cell-group>
        <div class="postPermissions">
            <div>岗位权限</div>
            
        </div>
        <div class="Equipment" v-for="(value,index) in data" :key="index">
            <div class="Equipment_div">
                <div class="equipment_div">{{ value.F_ModuleName }}(全选)</div>
                <van-switch
                    v-model="value.length"
                    size="20px"
                    @change='Vanswitch(index)'
                />
            </div>
            <div class="Equipment_D" v-for="(value,e) in value.modules" :key="e">
                <div class="name">{{ value.F_ModuleName }}</div>
                <van-switch
                    v-model="value.F_Status"
                    size="20px"
                    @change='vanswitch(e,index)'
                />
            </div>
        </div>
        <div class="aaa"></div>
        <div class="bottm_div">
            <div class="bottm" @click="save" :disabled="isDisable">保存</div>
            <button class="bottm" @click="shanchu" :disabled="Disable">删除</button>
        </div>
    </div>
</template>

<script>
import { Field,Switch,Toast,Dialog } from 'vant';
import axios from 'axios';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
export default {
    data () {
        return {
            isDisable:false,
            Disable:false,
            username:this.$route.params.name,
            FRoleId:this.$route.params.FRoleId,
            data:[
                // {
                //     Equipment:"设备管理",
                //     dataLic:[
                //         {
                //             name:"日志上传",
                //             checked:false,
                //         },
                //         {
                //             name:"一件补货",
                //             checked:false,
                //         },
                //         {
                //             name:"设备修改",
                //             checked:false,
                //         },
                        
                //     ],
                // },
                // {
                //     Equipment:"个人中心",
                //     dataLic:[
                //         {
                //             name:"我的钱包",
                //             checked:false,
                //         },
                //         {
                //             name:"消息中心",
                //             checked:false,
                //         },
                //         {
                //             name:"充值管理",
                //             checked:false,
                //         },
                //     ],
                // },
                // {
                //     Equipment:"商品管理",
                //     dataLic:[
                //         {
                //             name:"设备管理",
                //             checked:false,
                //         },
                //         {
                //             name:"货道管理",
                //             checked:false,
                //         },
                //         {
                //             name:"商品上架",
                //             checked:false,
                //         },
                        
                //     ],
                // },
                
            ],
            tey:[],
            
        }
    },
    methods: {
         vanswitch(e,index){
            this.data[index].modules[e].F_Status
            if(this.data[index].modules[e].F_Status == false){
                this.data[index].length = false
            }
        },
        Vanswitch(index){
            for(let i in this.data[index].modules){
                this.data[index].length == true ? this.data[index].modules[i].F_Status = true : this.data[index].modules[i].F_Status = false
            }
        },
        //保存
        save(){
            if(this.username==""||this.username == null){
                Toast.fail('岗位角色不能为空');
            }else{
                this.isDisable=true
                let i
                let e
                var xxx = {
                    F_RoleName:this.$route.params.name,
                    F_RoleId:'',
                    F_ModuleIds:[]
                }
                for(i in this.data){
                    for(e in this.data[i].modules){
                        if(this.data[i].modules[e].F_Status == true){
                            // console.log(this.data[i].modules[e])
                            xxx.F_RoleId = this.data[i].modules[e].F_RoleId
                            var F_ModuleIds
                            F_ModuleIds = this.data[i].modules[e].F_ModuleId
                            // console.log(F_ModuleIds)
                            xxx.F_ModuleIds.push(F_ModuleIds)
                        }
                    }
                }
                let _this = this
                axios({
                    method:"POST",
                    url:url.adminurl+'/api/AuthRoleModuleApi/SaveRoleModule',
                    data:xxx
                }).then((err)=>{
                    // console.log(err)
                    this.isDisable = false
                    if(err.data.msg == "成功"){
                        this.isDisable = true
                        Toast.success(err.data.msg);
                        console.log("111")
                        let _this = this
                        setTimeout(()=>{
                            _this.$router.go(-1);
                        },2000)
                    }else{
                        Toast.success(err.data.msg);
                        this.isDisable = false
                    }
                    
                }).catch(err=>{
                    submitTest(err,_this);
                })
                
            }
        },
        shanchu(){
            this.Disable = true
            let _this = this
            Dialog.confirm({
                message: '确定删除这个角色,删除角色后会删除改角色的所有数据'
                }).then(() => {
                    axios({
                        method:'POST',
                        url:url.adminurl+'/api/AuthRoleModuleApi/RemoveRole?F_RoleId='+this.FRoleId,
                    }).then((err)=>{
                        this.Disable = false,
                        console.log(err)
                        if(err.data.msg == "成功"){
                            this.Disable = true
                            Toast.success(err.data.msg);
                            let _this = this
                            setTimeout(()=>{
                                _this.$router.go(-1);
                            },2000)
                        }else{
                            Toast.success(err.data.msg);
                            this.Disable = false
                        }
                        
                    }).catch(err=>{
                        submitTest(err,_this);
                    })
                }).catch(() => {
                // on cancel
                });
        },
        
    },
    created () {
        var _this = this
        let FRoleId = this.$route.params.FRoleId
        // console.log(this.$route.params.FRoleId)
        axios({
            method:"get",
            url:url.adminurl+'/api/AuthRoleModuleApi/List_Module?F_RoleId='+FRoleId,
        }).then((err)=>{
            this.data = err.data
        }).catch(err=>{
                submitTest(err,_this);
        })
        
    },
    mounted () {
    }
}
</script>

<style lang="less" scoped>
@import '../../style/main.less';
    #pow{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: @BGGrey;
    }
    .van-cell-group{
        margin-top: 10px;
    }
    .postPermissions{
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        div{
            padding-left: 15px;
            font-size: 15px;
            
        }
    }
    .Equipment{
        width: 100%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        .Equipment_div{
            width: 95%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 700;
        }
        .Equipment_D{
            width: 95%;
            height: 40px;
            border: 1px solid @BOX3;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name{
                font-size: 15px;
                margin-left: 10px
            }
        }
    }
    .bottm_div{
        width: 100%;
        height: 45px;
        background: #fff;
        position: fixed;
        bottom: 0;
        z-index: 9;
        font-size: 16px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .bottm{
        width: 40%;
        height: 30px;
        background: @BGblue;
        color: #fff;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:5px; 
        border: none;
    }
    .aaa{
        width: 100%;
        height: 45px;
    }
</style>