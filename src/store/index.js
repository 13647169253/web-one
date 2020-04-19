import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import otherUtils from "@/utils/other"
let lsUser = localStorage.getItem('user');
let lsHome = localStorage.getItem('home');

const store = new Vuex.Store({
	state: {
		//存储登录后的所有用户信息(每次初始化vuex的user的默认值为localStorage里保存过的user的值,并且判断user必须是json格式)
		user: lsUser ? (otherUtils.isJSON(lsUser) ? JSON.parse(lsUser) : {}) : {},
		showView:true,
		isLoading:false
	},
	mutations: {
		/*
		 * vuex和localStorage都保存了一样的名为“user”的数据。其他key同理。
		 */
		setUser(state, user) {
			state.user = user;
			localStorage.setItem('user', JSON.stringify(user));
		},
		delUser(state, user) {
			state.user = {};
			localStorage.removeItem('user');
		},
		setShowView(state, showView) {
			state.showView = showView;
		},
		setIsLoading(state, isLoading) {
			state.isLoading = isLoading;
		}
	}
})
export default store;
