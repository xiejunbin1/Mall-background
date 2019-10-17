import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	user:{
		username:'',
		age:'',
		userId:''
	},
	loginState:false,
	showLeftFlag:true
}
const mutations = {
	
}
const actions = {
	showLeftA:()=>{
		state.showLeftFlag = true
	},
	closeLeftA:()=>{
		state.showLeftFlag = false
	},
	clearLoginMes(){
		state.user.username = ''
	    state.user.userId = ''
	    state.loginState = false
	},
	logined(){	
		var top=localStorage.token
		var tmp=top.replace(/"([^"]*)"/g, "$1").replace(/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/g,"").split(',')
//		console.log(tmp[1])
		state.user.username=tmp[1]
		state.user.userId=tmp[0]
		state.loginState=true
		console.log(state.loginState)
	}
}
const getters = {
	
}
export default new Vuex.Store({
     state,
     actions,
     mutations,
     getters
})