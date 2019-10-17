import {Toast} from 'vant';
export function toRes(res,msg){
 	console.log(res,msg);
    if(res=='Success'){
		
	}else if(res=='Fail'){
		Toast.fail(msg);
	}else if(res=='Exception'){
		Toast.fail(msg);
	}else if(res=='Unauthorize'){
		Toast.fail(msg);
	}else if(res=='UnSignStores'){
		Toast.fail(msg);
	}else if(res=='NoPower'){
		Toast.fail(msg);
	}else if(res=='ValidateFail'){
		Toast.fail(msg);
	}else{
		Toast.fail('网络错误');
	}
    
 
}


/// <summary>
//         /// 操作成功
//         /// </summary>
//         Success=1,
//         /// <summary>
//         /// 操作失败
//         /// </summary>
//         Fail=2,
//         /// <summary>
//         /// 程序异常
//         /// </summary>
//         Exception=3,
//         /// <summary>
//         /// 身份认证没有通过
//         /// </summary>
//         Unauthorize = 4,
//         /// <summary>
//         /// 没有注册商家
//         /// </summary>
//         UnSignStores = 5,
//         /// <summary>
//         /// 权限不足
//         /// </summary>
//         NoPower= 6,
//         /// <summary>
//         /// 数据验证不通过
//         /// </summary>
//         ValidateFail = 7,