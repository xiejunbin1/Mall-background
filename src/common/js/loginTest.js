import {Toast} from 'vant';
export function submitTest(err,_this){
	if (err.response.status==200) {
		return;
	}
	if(err.response.statusText=='Unauthorized'||err.response.status==401){
		Toast.fail('登录过期,请重新登录');
		setTimeout(()=>{
			var hrefs=window.location.host;
			var username=localStorage.getItem("username");
			var password=localStorage.getItem("password");
			if(username==''||username==null&&password==''||password==null){
				window.location.href='http://'+hrefs;
			}else{
				_this.$router.push({path:'/login'})
			}
		},3000);
	}else if(err.response.statusText=='RequestTimeout'){
		Toast.fail(err.response.data);
	}else if(err.response.statusText=='InternalServerError'||err.response.status==500){
		Toast.fail(err.response.data);
	}else{
		Toast.fail(err.response.status+'网络错误，请稍后重试');
	}
}