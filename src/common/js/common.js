import axios from 'axios';
import ccc from '../../components/index/index3'//引用文件
export function zhujian(){
    // let ADMINURL = 'http://10.10.0.204:8083'
    let ADMINURL = ''
    axios({
        method:'get',
        url:ADMINURL+'/api/SystemApi/ModulesConfig',
        responseType:'json'
    }).then((err)=>{
        // finance,//财务营收
        // machine, // 设备
        // product, //商品,礼品
        // mine,//我的
        
        for(let i in err.data){
            if(err.data[i].F_Code == "machine_upScore"){
                //远程上分
               ccc.machine_upScore = err.data[i].F_Status
            }
            if(err.data[i].F_Code == "machine_fill"){
                ////一键补货
               ccc.machine_fill = err.data[i].F_Status
            }                
            if(err.data[i].F_Code == "finance_wallet"){
                //我的钱包
               ccc.finance_wallet = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_qrCode"){
                //商城二维码
               ccc.machine_qrCode = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_boxOnOff"){
                //货道开关
               ccc.machine_boxOnOff = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "mine_address"){
                //地址管理
               ccc.mine_address = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "mine_wifi"){
                //wifi配网
               ccc.mine_wifi = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "product_typeMger"){
                //商品类别
               ccc.product_typeMger = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "mine_setPwd"){
                //修改密码
               ccc.mine_setPwd = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_set"){
                //设备修改
               ccc.machine_set = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_unbing"){
                //设备绑定
               ccc.machine_unbing = err.data[i].F_Status
            }
            if(err.data[i].F_Code == "machine_mger"){
                //设备管理
               ccc.machine_mger = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "mine_merchant"){
                //商户资料
               ccc.mine_merchant = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_args"){
                //参数设置
               ccc.machine_args = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_bing"){
                //设备注册
               ccc.machine_bing = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "product_set"){
                //商品修改
               ccc.product_set = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "finance_income"){
                //财务报表
               ccc.finance_income = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_meal"){
                //充值管理
               ccc.machine_meal = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_argsKH"){
                //参数设置
               ccc.machine_argsKH = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_stockout"){
                //缺货
               ccc.machine_stockout = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_boxMger"){
                //货道管理
               ccc.machine_boxMger = err.data[i].F_Status
            }
            if(err.data[i].F_Code == "mine_acctMger"){
                //子账号管理
               ccc.mine_acctMger = err.data[i].F_Status
            }                
            if(err.data[i].F_Code == "finance_turnover"){
                //销售统计
               ccc.finance_turnover = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "product_add"){
                //商品上架
               ccc.product_add = err.data[i].F_Status
            }        
            if(err.data[i].F_Code == "machine_log"){
                //日志上传
               ccc.machine_log = err.data[i].F_Status
            }
            if(err.data[i].F_Code == "product_mger"){
                //设备管理
               ccc.product_mger = err.data[i].F_Status
            }
            if(err.data[i].F_Code == "finance_today"){
                //今日总收益
               ccc.finance_today = err.data[i].F_Status
            }                
               
        }
        ccc.userSite = err.data
    })
}
