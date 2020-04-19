import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

let router = new Router({
	mode: 'hash',
	//每次进入下一个路由都滚动到顶部（避免vue组件的底部dom是v-for渲染导致页面自动滚动到底部了）
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	},
	routes: [
		//首页
		{
			path: '/',
			name: 'index',
			component: () =>
				import('@/components/index')
		},
		{
			path: '/search',
			name: 'search',
			component: () =>
				import('@com/search')
		},
		//我要买
		{
			path: '/purchase',
			name: 'purchase',
			component: () =>
				import('@/components/purchase')
		},
		//买/卖成功
		{
			path: '/success',
			name: 'success',
			component: () =>
				import('@com/success')
		},
		//我的买/卖列表
		{
			path: '/my',
			name: 'my',
			component: () =>
				import('@com/my')
		},
		//买/卖详情
		{
			path: '/details',
			name: 'dDetails',
			component: () =>
				import('@com/details')
		},
		//我要卖
		{
			path: '/sell',
			name: 'sell',
			component: () =>
				import('@/components/sell')
		},
		//视频
		{
			path: '/video',
			name: 'video',
			component: () =>
				import('@/components/video')
		},
		//农户主页
		{
			path: '/farmer',
			name: 'farmer',
			component: () =>
				import('@/components/farmer')
		},
		//直播入口
		{
			path: '/live',
			name: 'live',
			component: () =>
				import('@/components/live')
		},
		// 我的  -----------------------------------------

		// 手机登录
		{
			path: "/phonelogin",
			name: 'phonelogin',
			component: () => import('@/components/login/phoneLogin')
		},
		// 账号登录
		{
			path: "/accountLogin",
			name: 'accountLogin',
			component: () => import('@/components/login/accountLogin')
		},
		// 密码找回
		{
			path: "/passwordback",
			name: 'passwordback',
			component: () => import('@/components/login/passwordback')
		},
		// 重置密码
		{
			path: "/newpassword",
			name: 'newpassword',
			component: () => import('@/components/login/newpassword')
		},
		// 注册
		{
			path: "/register",
			name: 'register',
			component: () => import('@/components/register/register')
		},
		// 注册-设置密码
		{
			path: "/setpassword",
			name: 'setpassword',
			component: () => import('@/components/register/setpassword')
		},
		// 我的信息
		{
			path: "/myMessage",
			name: 'myMessage',
			component: () => import('@/components/personMessage/myMessage')
		},
		// 个人信息
		{
			path: "/personDetail",
			name: 'personDetail',
			component: () => import('@/components/personMessage/personDetail')
		},
		// 我的关注
		{
			path: "/myattention",
			name: 'myattention',
			component: () => import('@/components/personMessage/myattention')
		},
		// 我的收藏
		{
			path: "/mycollect",
			name: 'mycollect',
			component: () => import('@/components/personMessage/myCollect')
		},
		// 我的店铺
		{
			path: "/mystore",
			name: 'mystore',
			component: () => import('@/components/personMessage/myStore')
		},


		// 商品管理 ---------------------------------------------------

		// 店铺管理
		{
			path: "/goodsmana",
			name: 'goodsmana',
			component: () => import('@/components/goodsManagemet/goodsManagement')
		},
		// 发布直播
		{
			path: "/releaselive",
			name: 'releaselive',
			component: () => import('@/components/releaseLive/releaseLive')
		},
		// 我的视频
		{
			path: "/myvideo",
			name: 'myvideo',
			component: () => import('@/components/myVideo/myVideo')
		},
		// 视频播放
		{
			path: "/myplay",
			name: 'myplay',
			component: () => import('@/components/myPlay/myPlay')

		},
		// 视频播放
		{
			path: "/publicvideo",
			name: 'publicVideo',
			component: () => import('@/components/publicVideo/publicVideo')
		},
		// 视频上传
		{
			path: "/uploadvideo",
			name: 'uploadvideo',
			component: () => import('@/components/publicVideo/uploadVideo')
		},
		// 发布视频
		{
			path: "/releasevideo",
			name: 'releaseVideo',
			component: () => import('@/components/publicVideo/releaseVideo')
		},
		// 城市选择
		{
			path: "/selectcity",
			name: 'selectCity',
			component: () => import('@/components/selectCity/selectCity')
		},
		// 直播协议认证
		{
			path: '/liveagament',
			name: 'liveagament',
			component: () =>
				import('@/components/live/liveAgament')
		},
		// 开始直播-选择商品
		{
			path: '/startlive',
			name: 'startLive',
			component: () =>
				import('@/components/live/startLive')
		},
		// 开始直播-商品管理
		{
			path: '/goodsmanment',
			name: 'goodsmanMent',
			component: () =>
				import('@/components/live/goodsmanMent')
		},
		//=====================================================================
		//直播详情页（开直播）
		{
			path: '/liveDetails',
			name: 'liveDetails',
			component: () =>
				import('@/components/live/liveDetails')
		},
		//直播详情页（看直播）
		{
			path: '/liveDetails2',
			name: 'liveDetails2',
			component: () =>
				import('@/components/live/liveDetails2')
		},
		{
			path: '/liveControl',
			name: 'liveControl',
			component: () =>
				import('@/components/live/liveControl')
		},
		{
			path: '/liveControl2',
			name: 'liveControl2',
			component: () =>
				import('@/components/live/liveControl2')
		},
		{
			path: '/liveControl3',
			name: 'liveControl3',
			component: () =>
				import('@/components/live/liveControl3')
		},
		{
			path: '/compose',
			name: 'compose',
			component: () =>
				import('@/components/live/compose')
		},
		//其它路由都重定向到首页
		{
			path: '*',
			name: 'index',
			redirect: '/'
		}
	]
})
/*
 * TODO：路由拦截器
 * 每个路由进入都需要判断：这个路由是否需要验证token，token是否存在(即token是否可被验证)
 */
router.beforeEach((to, from, next) => {
	//黑名单策略，登录拦截：如果to.pat包含在此数组中则需要验证token是否存在（即需要登录），因为这些vue路由需要发送token
	let routeArr = ["/myMessage", "/purchase", "/sell", "liveagament", "startlive"];
	if (routeArr.indexOf(to.path) != -1) {
		//验证token是否存在
		let token = store.state.user.token;
		if (token === null || token === '' || token === undefined) {
			next({
				path: '/accountLogin',
				query: {
					redirect: from.fullPath //redirect是告诉登录的路由：登录成功后跳入浏览的当前页面
				}
			});
		} else {
			next();
		}
	} else {
		next();
	}
})
export default router;
