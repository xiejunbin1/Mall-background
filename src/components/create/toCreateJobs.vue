<template>
    <div id="pow">
        <van-cell-group class="van-cell-group">
            <van-field
                v-model="username"
                label="岗位名称"
                placeholder="如店长、员工等"
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
        <button class="bottm" @click="save" :disabled="isDisable">保存</button>
    </div>
</template>

<script>
import { Field,Switch,Toast } from 'vant';
import axios from 'axios';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
export default {
    data () {
        return {
            username:'',
            isDisable:false,
            checked:'',
            data:[
               
                
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
                this.isDisable = true
                let i
                let e
                var xxx = {
                    F_RoleName:this.username,
                    F_RoleId:'',
                    F_ModuleIds:[]
                }
                for(i in this.data){
                    for(e in this.data[i].modules){
                        // console.log(this.data[i].modules)
                        if(this.data[i].modules[e].F_Status == true){
                            xxx.F_RoleId = this.data[i].modules[e].F_RoleId
                            var F_ModuleIds
                            F_ModuleIds = this.data[i].modules[e].F_ModuleId
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
                     this.isDisable = false;
                    // console.log(err)
                    Toast.success(err.data.msg);
                    if(err.data.msg == "成功"){
                        this.isDisable = true;
                        let _this = this
                        setTimeout(()=>{
                             _this.$router.go(-1);
                        },2000)
                    }else{
                        this.isDisable = false;
                    }
                    
                }).catch(err=>{
                    submitTest(err,_this);
                })
                
            }
        }
    },
    created () {
        var lastname = localStorage.getItem("key");
        var FRoleId = ''
        let _this = this
        axios({
            method:"get",
            url:url.adminurl+'/api/AuthRoleModuleApi/List_Module?F_RoleId='+FRoleId,
        }).then((err)=>{
            this.data = err.data
        }).catch(err=>{
            submitTest(err,_this);
        })
        
    },
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
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid @BOX3;
            .name{
                font-size: 15px;
                margin-left: 10px
            }
        }
    }
    .bottm{
        width: 100%;
        height: 40px;
        background: @BGblue;
        position: fixed;
        bottom: 0;
        z-index: 9;
        color: #fff;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none
    }
    .aaa{
        width: 100%;
        height: 45px;
    }
</style>