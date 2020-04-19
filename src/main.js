// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


//TODO:“开发环境/测试环境”为true,“生产环境”为false
const devOrTest = false;
//TODO:拦截Ajax并模拟数据（“开发环境/测试环境”下不需要时就注释。“生产环境”下不允许使用！）
if(devOrTest){
	//require('../mock')
}

/*
 *TODO:是否打包APP模式，即是否引入html5plus
 * (需要使用html5plus的原生功能时为true)
 * (需要在普通浏览器【即非webview浏览器】打开时必须为false)
 *TIPS:这个变量配置也起到了类似加密的作用。
 *因为html5plus只会存在于打包为app的webview中，如果用户从安装包里解压出打包的dist文件，
 *会因为是在普通浏览器中打开的此web文件，而不处于webview中，从而找不到html5plus从而导致页面空白没有渲染Vue（main.js最底部的代码），起到加密的作用。
*/
let isApp = true;

//阻止启动生产消息（浏览器控制台）
Vue.config.productionTip = false;

//babel默认只转换语法,而不转换新的API,如需使用新的API（例如Promise）,还需要使用对应的转换bael插件或者polyfill这个babel插件。
import "babel-polyfill";

//引入axios进行ajax请求
import axios from 'axios';
import qs from 'qs';
/*
 * 设置axios请求的baseUrl
 */
import { devUrl,proUrl } from '../http'
let baseUrl = '';
if(devOrTest){//开发环境or测试环境
	baseUrl = devUrl;
}else{//生产环境
	baseUrl = proUrl;
}
//设置全局的服务器地址！
window.baseurl=baseUrl;
/*
 * 设置axios的全局默认配置(axios.defaults)
 */
axios.defaults.baseURL = baseUrl; //配置接口请求地址（开发环境/测试环境用devUrl，生产环境用proUrl）
axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"; //配置post的默认请求头信息。
axios.defaults.headers.common['User-Token'] = store.state.user.token || '';//配置所有的http方法的头信息都加入token字段
axios.defaults.timeout = 15000; //设置超时，请求超过15秒中断请求
/*
 * axios 响应拦截器
 */
axios.interceptors.response.use(
	response => {
		if(response.data.code != 100) {//每个响应数据都回显一个code属性，只有100是成功
			if(response.data.code == 200){
				//不提示
				// require('vant').Notify({
				//   message: response.data.msg,
				//   background: 'red'
				// });
			}else if(response.data.code == 250){
				//暂无版本更新不做提示
				if(response.config.url != window.baseurl+'/appServiceEdition/testEdition'){
					require('vant').Notify({
					  message: response.data.msg,
					  background: 'red'
					});
				}
			}else if(response.data.code == 300){
				require('vant').Notify({
				  message: response.data.msg,
				  background: 'red'
				});
				store.commit('delUser');
				router.replace({
					path: '/accountLogin',
					query: {
						/* 属性【redirect】：
						 * WHAT：指的当前页面的vue路由
						 * TODO:登录成功后跳入浏览的当前页面
						 * TIPS:
						 * router.currentRoute.fullPath是全路径，包含query
						 * router.currentRoute.path不包含query
						 */
						redirect: router.currentRoute.fullPath
					}
				})
			}else if(response.data.code == 400){
				require('vant').Notify({
				  message: response.data.msg,
				  background: 'red'
				});
				store.commit('delUser');
				router.replace({
					path: '/accountLogin',
					query: {
						redirect: router.currentRoute.fullPath
					}
				})
			}else if(response.data.code == 500){
				require('vant').Notify({
				  message: response.data.msg,
				  background: 'red'
				});
			}
		}
		return response;
	},
	error => {
		/*
		 * 如果请求报错是因为token不存在，就重新登录
		 */
		if(!axios.defaults.headers.common['User-Token']){
			router.push({
				path: '/accountLogin',
				query: {
					redirect: router.currentRoute.fullPath
				}
			})
		}
		/*
		 * 处理超时
		 */
		if(error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
			require('vant').Notify({
			  message: '网络超时',
			  background: 'red'
			});
			return Promise.reject(error); // reject这个错误信息
		}
		return Promise.reject(error);
	});
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
//引入动态计算“html的font-size”的lib，配合webpack的【px2rem-loader或postcss-px2rem-exclude】插件实现css的“px to rem”
//css不能写在html标签中，要写在style标签或外联文件中，否则无法“px to rem”！！
import 'lib-flexible/flexible.js'

//引入对路由导航行为进行管理的lib，默认实现vue的[router-view]前进缓存后退刷新
import Navigation from 'vue-navigation'
Vue.use(Navigation, {
	router
})
//引入拖拽组件
import VueDND from 'awe-dnd'
Vue.use(VueDND)

//引入“vant ui”（在此全部引入）
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//单独引入vant的懒加载组件
import { Lazyload } from 'vant';
Vue.use(Lazyload);
//单独引入vant的图片预览组件
import { ImagePreview } from 'vant';
Vue.prototype.$ImagePreview = ImagePreview;

/*
 * 引入图片压缩的js库
 */
// import ImageCompressor from 'image-compressor.js';
// Vue.prototype.$ImageCompressor = ImageCompressor;

//引入“vux ui”（此ui库只能按需加载，并且不需要babel-plugin-import插件配合。但是要配置vux-loader、less-loader，以及修改webpack.base.conf.js，有点麻烦）
import { XHeader } from 'vux'
Vue.component('x-header', XHeader)
import { XButton } from 'vux'
Vue.component('x-button', XButton)
import { XDialog } from 'vux'
Vue.component('x-dialog', XDialog);
import { Spinner } from 'vux'
Vue.component('x-spinner', Spinner);
/*
import { Flexbox, FlexboxItem } from 'vux'
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
*/

//引入 “YDUI ui”（此ui库如果按需加载，不需要babel-plugin-import插件配合。)
import 'vue-ydui/dist/ydui.px.css';
import 'vue-ydui/dist/ydui.base.css';
import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
import {BackTop} from 'vue-ydui/dist/lib.px/backtop';
Vue.component(BackTop.name, BackTop);
import {TextArea} from 'vue-ydui/dist/lib.px/textarea';
Vue.component(TextArea.name, TextArea);
import {PullRefresh} from 'vue-ydui/dist/lib.px/pullrefresh';
Vue.component(PullRefresh.name, PullRefresh);
(function(Vue) {
	let {Spinner} = require('vue-ydui/dist/lib.px/spinner');
	Vue.component(Spinner.name, Spinner);
})(Vue)

//引入“iview ui”
import 'iview/dist/styles/iview.css';
import {Dropdown} from 'iview';
Vue.component('Dropdown', Dropdown);
import {DropdownMenu} from 'iview';
Vue.component('DropdownMenu', DropdownMenu);
import {DropdownItem} from 'iview';
Vue.component('DropdownItem', DropdownItem);
Vue.component('DropdownMenu', DropdownMenu);
import {Divider} from 'iview';
Vue.component('Divider', Divider);

//移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这里用fastclick去掉点击延迟300毫秒
const FastClick = require('fastclick')
FastClick.attach(document.body);

//清空浏览器缓存数据（除了user信息）。因为webview之间通信用的“localStorage”，得清理掉。
let user = localStorage.getItem('user');
localStorage.clear();
if (user !== '' && user !== null && user !== undefined) {
	localStorage.setItem('user', user);
}
	
//打包APP模式
if(isApp){
	//引入html5plus(HBuilder/HBuilderX打包APP自带)
	if(window.plus){
		initVue();
	}else{
		document.addEventListener('plusready', function(){
			initVue();
		},false);
	}
}else{
	//非打包APP模式
	initVue();
}

//初始化vue
function initVue(){
	new Vue({
	  el: '#app',
	  router,
	  store,
	  components: { App },
	  template: '<App/>'
	})
}