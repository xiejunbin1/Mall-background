<template>
    <div id="pow">
        <!-- 创建子账号 -->
            <div class="Theselector">
                <div :class="{theChildAccount1:theChildAccount1,theChildAccount2:theChildAccount2}" @click="theChildAccount">子账号</div>
                <div :class="{jobRole:jobRole,jobRole1:jobRole1}" @click="jobRole2">岗位角色</div>
            </div>
            <div v-show="Theselector" class="tst">
            <div class="details" v-for="(value,index) in Datadetails" :key="index">
                <div class="details_tou">
                    <div class="name">{{ value.name }}</div>
                    <div class="introduce">{{ value.mobile }}&nbsp &nbsp |&nbsp &nbsp场地管理{{ value.count }}个</div>
                </div>
                <div class="details_bottom">
                    <div class="lest">
                        <div class="bianji" @click="bianji(index)">{{ theEditor }}</div>
                        <div class="shanchu" @click="Delete(index)">{{ Delet }}</div>
                    </div>
                    <div class="right">
                        <van-switch
                            v-model="value.status"
                            size="24px"
                            @change="Switch(index)"
                        />
                    </div>
                </div>
            </div>
            <div class="aaa"></div>
            <router-link tag='div' to='/createAccount' class="bottom">
                <div class="bottom">创建子账号</div>
            </router-link>
        </div>

        <!-- 岗位角色 -->
        <div class="Jobrole" v-show="Jobrole">
            <div class="Jobrole_div" v-for="(value,index) in DataJobrole" :key="index" @click="ClickJobrole(index)">
                <div class="Jobrole_text">{{ value.F_RoleName }}</div>
                <img src="../../common/img/fanhui.png" style="width:22px;height: 22px" alt="">
            </div>
            <div class="aaa"></div>
            <router-link tag='div' to='/toCreateJobs' class="bottom">
                <div class="bottom">创建岗位</div>
            </router-link>
            
        </div>
    </div>
</template>

<script>
import { Switch,Dialog,Toast } from 'vant';
import axios from 'axios';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
export default {
    data () {
        return {
            theChildAccount1:true,
            theChildAccount2:false,
            jobRole:true,
            jobRole1:false,
            Theselector:true,//创建子账号
            Jobrole:false,//岗位角色
            F_RoleId:'',
            theEditor:"编辑",
            Delet:"删除",
            checked:'',//是否开启子账号
            Datadetails:[
                // {
                //     name:"司机",
                //     account:"15254587445",
                //     site:1,
                //     theEditor:"编辑",
                //     Delete:"删除",
                //     checked:true,//是否开启子账号
                // },
                // {
                //     name:"司机",
                //     account:"15254587445",
                //     site:2,
                //     theEditor:"编辑",
                //     Delete:"删除",
                //     checked:false,//是否开启子账号
                // },
                // {
                //     name:"司机",
                //     account:"15254587445",
                //     site:3,
                //     theEditor:"编辑",
                //     Delete:"删除",
                //     checked:true,//是否开启子账号
                // },
                // {
                //     name:"司机",
                //     account:"15254587445",
                //     site:3,
                //     theEditor:"编辑",
                //     Delete:"删除",
                //     checked:true,//是否开启子账号
                // },
                // {
                //     name:"司机",
                //     account:"15254587445",
                //     site:3,
                //     theEditor:"编辑",
                //     Delete:"删除",
                //     checked:true,//是否开启子账号
                // },
                // {
                //     name:"司机",
                //     account:"15254587445",
                //     site:3,
                //     theEditor:"编辑",
                //     Delete:"删除",
                //     checked:true,//是否开启子账号
                // },
                // {
                //     name:"司机",
                //     account:"15254587445",
                //     site:3,
                //     theEditor:"编辑",
                //     Delete:"删除",
                //     checked:true,//是否开启子账号
                // }
            ],
            DataJobrole:[
                // {
                //     name:"员工"
                // },
                // {
                //     name:"店长"
                // },
                // {
                //     name:"时机"
                // },
                // {
                //     name:"洗碗工"
                // },
                
            ]
        }
    },
    methods: {
        //是否开启子账号开关
        Switch(index){
            let accountId = this.Datadetails[index].id
            console.log(accountId)
            console.log(this.checked)
            if(this.Datadetails[index].status == false){
                Dialog.confirm({
                    title: '确定要停用账号',
                    message: '停用后该账号将无法登录后台'
                }).then(() => {
                    axios({
                    method:'GET',
                    url:url.adminurl+'/api/AccountApi/Disabled?status='+this.Datadetails[index].status+'&accountId='+accountId,
                }).then((err)=>{
                    if(err.data.msg == "操作成功"){
                        Toast(err.data.msg);
                    }else{
                        Toast(err.data.msg);
                        this.Datadetails[index].status = false
                    }
                }).catch(err=>{
                    submitTest(err,_this);
                })

                }).catch(() => {
                    this.Datadetails[index].status = true
                });
            }
            if(this.Datadetails[index].status == true){
                axios({
                    method:'GET',
                    url:url.adminurl+'/api/AccountApi/Disabled?status='+this.Datadetails[index].status+'&accountId='+accountId,
                }).then((err)=>{
                    if(err.data.msg == "操作成功"){
                        Toast(err.data.msg);
                    }else{
                        Toast(err.data.msg);
                        this.Datadetails[index].status = false
                    }
                }).catch(err=>{
                    submitTest(err,_this);
                })
            }
            
            
        },
        //删除
        Delete(index){
            let id = this.Datadetails[index].id
            

            Dialog.confirm({
                title: '确定要删除账号',
                message: '删除改账号将无法登录后台'
            }).then(() => {
            // on confirm
                axios({
                    method:"GET",
                    url:url.adminurl+'/api/AccountApi/Remove?accountId='+id,
                }).then((err)=>{
                    this.account()
                })
            }).catch(() => {
            // on cancel
            });
        },
        bianji(index){
            this.Datadetails[index].id
            this.$router.push({path:`/editSubpage/${this.Datadetails[index].id}`})

        },
        //子账号
        theChildAccount(){
            this.theChildAccount1 = true,
            this.theChildAccount2 = false,
            this.jobRole = true,
            this.jobRole1 = false
            this.Theselector = true //创建子账号
            this.Jobrole = false//创建新岗位
        },
        //岗位角色
        jobRole2(){
            this.theChildAccount1 = false,
            this.theChildAccount2 = true,
            this.jobRole = false,
            this.jobRole1 = true
            this.Theselector = false //创建子账号
            this.Jobrole = true//创建新岗位
        },

        ClickJobrole(index){
            this.$router.push({
                name:'jobs',
                params: {
                    FRoleId:this.DataJobrole[index].F_RoleId,
                    name:this.DataJobrole[index].F_RoleName
                }
            })
        },
        //岗位列表
        JobRole(){
            let _this = this
            axios({
                method:'get',
                url:url.adminurl+'/api/AuthRoleModuleApi/List_Role',
                responseType:'json'
            }).then((err)=>{
                this.DataJobrole = err.data
            }).catch(err=>{
                submitTest(err,_this);
            })
        },

        //子账号列表
        account(){
            let _this = this
            axios({
                method:'get',
                url:url.adminurl+'/api/AccountApi/List',
                responseType:'json'
            }).then((err)=>{
                this.Datadetails = err.data
                for(let i in this.Datadetails){
                    if(this.Datadetails[i].status == 0){
                        this.Datadetails[i].status=false
                    }
                    if(this.Datadetails[i].status == 1){
                       this.Datadetails[i].status=true
                    }
                }
                // this.Datadetails.filter((value)=>{
                //     // console.log(value.status)
                    
                // })

            }).catch(err=>{
                submitTest(err,_this);
            })
        }
    },
    created () {
        this.account()
        this.JobRole()

    }
}
</script>

<style scoped lang="less">
@import '../../style/main.less';

    #pow{
        width: 100%;
        height: 100%;
        // position: absolute;
        background-color: @BGGrey;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .tst{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .Theselector{
        width: 40%;
        height: 30px;
        border: 1px solid #409EFF;
        display: flex;
        margin: 0 auto;
        margin-top: 10px;
        .theChildAccount1{
            width: 50%;
            height: 100%;
            background: @BGblue;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 14px;
        }
        .theChildAccount2{
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #409EFF;
            font-size: 14px;
        }
        .jobRole{
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #409EFF;
            font-size: 14px;
        }
        .jobRole1{
            width: 50%;
            height: 100%;
            background: @BGblue;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 14px;
        }
    }
    .details{
        width: 95%;
        height: 100px;
        background: #fff;
        border: 1px solid #f2f2ff;
        border-radius:5px; 
        margin-top: 15px;
        display: flex;
        flex-direction: column;
       
        .details_tou{
            width: 100%;
            height: 60%;
            border-bottom:1px solid #f2f2ff;
            .name{
                font-size: 16px;
                font-weight: 700;
                padding-left: 10px;
                padding-top: 10px;
            }
            .introduce{
                font-size: 14px;
                color: #c8c8cc;
                padding-left: 10px;
                padding-top: 5px;
            }
        }
        .details_bottom{
            width: 100%;
            height: 40%;
            display: flex;
            align-items: center;
            .lest{
                width: 50%;
                height: 100%;
                display: flex;
                align-items: center;
                .bianji{
                    width: 30%;
                    height: 25px;
                    border: 1px solid #f2f2f2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 10px;
                    font-size: 14px;
                }
                .shanchu{
                    width: 30%;
                    height: 25px;
                    border: 1px solid #f2f2f2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 10px;
                    font-size: 14px;
                }
            }
            .right{
                width: 50%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-end
            }
        }
    }
    .bottom{
        width: 100%;
        height: 50px;
        background: #409EFF;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 0;
        color: #fff;
        z-index: 9;
        font-size: 16px;
    }
    .aaa{
        width: 100%;
        height: 60px;
    }
    .Jobrole{
        width: 95%;
        background:#fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin:  0 auto;
        margin-top:10px; 
        .Jobrole_div{
            width: 95%;
            height: 45px;
            border-bottom:1px solid  @BOX3;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .Jobrole_text{
                font-size: 16px;
            }
        }
    }
</style>