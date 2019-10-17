<template>
    <div id="bow">
        <div class="tou">店铺:
            <div style="color:red">{{ address }}</div>
        </div>
        <div class="equipment" v-for="(value,index) in List" :key="index" @click="handleToInfo(value.id,value.machineTypeId,value.machineNum)">
            <div class="equipment_div">设备编号:<div class="equipment_DIV">{{ value.machineNum }}</div></div>
            <div>设备类型:{{ value.machineType }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';	
import qs from 'qs';
import url from '@/urlRouter.js'
import {submitTest} from '@/common/js/loginTest.js'
export default {
    data () {
        return {
            List:[],
            address:"",
        }
    },
    methods:{
        handleToInfo(id,typeid,machineNum){
            this.$router.push({path: '/theOrder/'+ machineNum});
        }
    },
    created () {
        let _this = this
        axios({
            method:'get',
            url:url.adminurl+'/api/MachineApi/List?page=1&status=-1&machineTypeId=0&addressId='+localStorage.getItem("id"),
            responseType:'json'
        }).then((res)=>{
            // console.log(res)
            this.List=res.data.data;
            for(let i in res.data.data){
               this.address = res.data.data[i].address
            }
        }).catch(err=>{
            submitTest(err,_this);
        })
    }
}
</script>

<style scoped lang="less">
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    #bow{
        width: 100%;
        background: #f2f2f2;
        .tou{
            width: 100%;
            padding: 10px;
            font-size: 18px;
            background: #33ccff;
            display: flex;
            justify-content: center;
        }
        .equipment{
            width: 100%;
            padding: 10px;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            background: #fff;
            border: 1px solid #f2f2f2;
            margin-top: 5px;
            box-shadow: 0 0 10px #99ffff;
            .equipment_div{
                display: flex;
                align-items: center;
            }
            .equipment_DIV{
                color: #ff0088;
            }
        }
    }
</style>