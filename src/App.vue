<template>
	<div style="height: 100%;">
		<!-- 下拉刷新 !!!!这个会影响直播功能-->
		<!-- 1<van-pull-refresh v-model="$store.state.isLoading" @refresh="onRefresh"> -->
		<!-- 2<yd-pullrefresh :callback="loadList" :show-init-tip="true" ref="pullrefreshDemo"> -->
		<div v-if="$store.state.showView" id="app">
			<!--视图过渡动画-->
			<!-- <transition :name="animation" :duration="{ enter: 300, leave: 300 }" :css="false"> -->
			<!-- 留出沉浸状态栏的位置 -->
			<!-- <div v-if="$route.path != '/'" style="height:30px;"></div> -->
			<navigation>
				<!--视图-->
				<!-- <yd-pullrefresh :callback="loadList" :show-init-tip="true" ref="pullrefreshDemo"> -->
				<router-view></router-view>
				<!-- </yd-pullrefresh> -->
			</navigation>
			<!-- </transition> -->
		</div>
		<x-dialog class="versionBox" v-model="notClose" :hide-on-blur="false" :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
			<center>
				<div>
					<img :src="newVersionImg" class="newVersionImg" />
					<center>
						<strong>发现新版本</strong>
						<div class="span">
							（当前版本:<font color="red">{{nowEditionNo}}</font>，最新版本:<font color="red">{{editionNo}}</font>）<br />
						</div>
					</center>
					<template v-for="item in updateText">
						<span class="span2">{{item}}</span><br style="clear: both;" />
					</template>
					<div class="nullDiv"></div>
					<!-- <a :href="downloadCode" download> -->
						<van-button @click="downloadFile" size="large" square :style="'background-image: url('+btBgImg+');'" class="whiteBtn" :loading="isDown" :loading-text="'正在下载中...（'+(downloadedSize/totalSize*100).toFixed(2)+'%）'">立即更新</van-button>
					<!-- </a> -->
				</div>
			</center>
			<!-- <br><x-icon @click="notClose = false;" type="ios-close-outline" size="46px" style="fill:white;"></x-icon> -->
		</x-dialog>
	</div>
	<!-- 2</van-pull-refresh> -->
	<!-- 1</yd-pullrefresh> -->
</template>

<script>
	import otherUtils from "@/utils/other"
	export default {
		name: 'App',
		data() {
			return {
				//animation:"van-fade"
				//isLoading: false,
				//showView:true,
				notClose: false,
				newVersionImg: require('@/assets/img/20190725145020.png'),
				btBgImg: require('@/assets/img/20190619120234.png'),
				updateText: [], //版更新本说明
				editionNo: '', //最新版本
				downloadCode: '', //下载地址
				nowEditionNo: '1.11', //当前版本！（每次安装包发布都要手动在这里更改当前版本号，而且每个版本的安装包在这里写死！！！）
				isDown:false,//是否正在下载
				totalSize:0,
				downloadedSize:0
			}
		},
		created() {
			let that = this;
			/**
			 * main.js只会执行一次。而app.vue由于页面的下拉刷新功能，app.vue组件会经常销毁并重新创建。
			 * 所以通过“alreadyUpdateVersion”变量让监测版本更新的请求只会发送一次。即打开应用只会请求一次。即使页面下拉刷新也不会重新请求。（不会运行时弹窗“有版本更新”）
			 */
			let auv = localStorage.getItem('alreadyUpdateVersion');//alreadyUpdateVersion有值代表已经发出过检测版本的请求。
			if (auv != 'true' && !otherUtils.IsPC()) {//检测平台类型。不是pc端才发出监测版本的请求
				//检测平台类型
				var isAndroid = otherUtils.IsAndroid();
				//查询app版本号
				that.$axios.post('/appServiceEdition/testEdition', that.$qs.stringify({
						appType: isAndroid ? 1 : 2//1：安卓 2：ios
					}))
					.then(res => {
						if (res.data.code == 100) {
							if (res.data.info.editionNo != that.nowEditionNo) {
								this.$store.commit("setShowView", false);
								that.notClose = true;
								that.editionNo = res.data.info.editionNo;
								that.updateText = res.data.info.updateText.split(';;');
								that.downloadCode = window.baseurl + '/file/downloadFile/' + res.data.info.downloadCode;
							}
						}
					})
				localStorage.setItem('alreadyUpdateVersion', 'true');
			}
			/**
			 * 
			 * 
			 * 在这个根组件进行全局的配置（除了“路由管理”，其它的也可以写在main.js里）
			 * 
			 * 
			 */
			//公共样式加载！
			require('@/public/style.css')
			//引用此库。打包为app后，会阻止按物理返回键后直接退出了应用。
			//require('@/assets/js/mui.min.js')
			// 监听“返回”按钮事件
			if (plus) {
				var firstBack = 0;
				var handleBack = function() {
					var currentWebview = plus.webview.currentWebview();
					var topWebview = plus.webview.getTopWebview();
					var now = Date.now || function() {
						return new Date().getTime();
					};
					currentWebview.canBack(function(evt) {
						/**  
						 * 有可后退的历史记录，则后退。  
						 * 否则，关闭当前窗口。  
						 * 如果当前窗口是入口页，那么执行退出的逻辑。  
						 */
						if (currentWebview.id === plus.runtime.appid && that.$route.path == '/') { //必须是在首页才询问是否退出应用！
							if (!firstBack) {
								firstBack = now();
								plus.nativeUI.toast('再按一次退出应用');
								setTimeout(function() {
									firstBack = 0;
								}, 2000);
							} else if (now() - firstBack < 2000) {
								plus.runtime.quit();
							}
						} else {
							//像这些直播控件的webview则不做处理
							if (that.$route.path == '/liveDetails' || that.$route.path == '/liveDetails2' || that.$route.path ==
								'/liveControl' || that.$route.path == '/liveControl2' || that.$route.path == '/liveControl3') {

							} else {
								//既不是首页，也不是直播控件的页面则能返回就返回。
								if (evt.canBack) {
									history.back();
								} else {
									currentWebview.close('auto');
								}
							}
						}
					})
				}
				//开始调用【监听返回键】的方法
				plus.key.addEventListener("backbutton", handleBack);
			}
			//引用图标库“fontawesome”（改为在首页index.html中使用）
			//require('@/assets/other/css/font-awesome.min.css')
			/**
			 * 路由管理
			 */
			//路由前进时
			this.$navigation.on('forward', (to, from) => {
				//设置过渡动画类型（“vant ui”自带）
				//this.animation="van-slide-left";
			})
			//路由后退时
			this.$navigation.on('back', (to, from) => {
				console.log(to.route.path, from.route.path)
				//this.animation="van-slide-right";
				//业务逻辑处理
				/*(后退到这个to的路由页面时，强制刷新当前路由地址！即当前路由页面不去使用“vue-navigation”的后退缓存功能！！！
				* （from的地址即使是通过router.go方法进入的to页面，to页面依然会刷新）)
				* 
				if((to.route.path=="/purchase" || to.route.path=="/sell") && from.route.path=="/success"){
					this.$navigation.cleanRoutes();//清除所有的路由缓存
					this.$router.replace({path:to.route.path})//重定向
				}
				* 
				* TIP:上面已弃用。改为在/success路由里执行【$navigation.cleanRoutes();$router.go(-1);】来清除to页面缓存。
				*/
			})
		},
		methods: {
			loadList() {
				/**
				this.$refs.pullrefreshDemo.$emit('ydui.pullrefresh.finishLoad');
				//利用v-if可以销毁组件然后创建组件，达到只是重新调用created方法而不是刷新整个页面的效果。
				this.showView = false;
				this.$nextTick(function(){
					this.showView = true;
				})
				*/
				/**
				 * 为避免影响直播功能，只能在需要下拉刷新的页面单独加“下拉刷新”功能，而不是在根组件加此功能。
				 * 为了可以复用，在store里保存下拉刷新的状态和销毁root组件的状态。
				 * 上面代码弃用，现代码如下：
				 * （把<yd-pullrefresh>改用<van-pull-refresh>是因为好看，没别的原因）
				 */
				this.$store.commit("setShowView", false);
				this.$nextTick(function() {
					this.$store.commit("setIsLoading", false);
					this.$store.commit("setShowView", true);
				})
			},
			//下载安装包
			downloadFile(){
				let that = this;
				//检查网络状态
				let netTimer = otherUtils.hasNet2(function(){},function(){
					that.isDown=false;
					that.$toast('您的网络似乎出现了问题')
				});
				that.isDown=true;
				//检测平台类型
				var isAndroid = otherUtils.IsAndroid();
				var downLoadUrL = this.downloadCode+(isAndroid ? '.apk' : '.ipa'); // 下载文件地址  
				var dtask = plus.downloader.createDownload(downLoadUrL, {}, function(download, status) {
					if (status == 200) {
						// 下载成功  
						that.isDown=false;
						var path = download.filename;
						plus.runtime.install(path);
					} else {
						//下载失败  
						that.isDown=false;
						alert("Download failed: " + status);
					}
				});
				dtask.addEventListener("statechanged", function(download, status ) {
					that.downloadedSize = download.downloadedSize;
					that.totalSize = download.totalSize;
					//console.log('已下载文件大小：'+download.downloadedSize);
					//console.log('总文件大小：'+download.totalSize);
				}, false);
				dtask.start();
			}
		}
	}
</script>

<style lang="less">
	#app {
		height: 100%;
	}

	.whiteBtn {
		color: white !important;
		position: absolute;
		left: 0;
		bottom: 0;
		background-size: cover;
		background-position: 50% 50%;
		height: 100px !important;
	}

	.versionBox {
		.weui-dialog {
			background-color: white !important;
			width: 570px !important;
			height: 637px !important;

			strong {
				font-size: 40px;
			}

			.span {
				margin-left: 48px;
				margin-right: 48px;
				font-size: 30px;
			}

			.span2 {
				margin-left: 48px;
				margin-right: 48px;
				font-size: 30px;
				float: left;
				word-wrap: break-word;
				text-align: left;
			}

			.nullDiv {
				clear: both;
				height: 100px;
			}
		}
	}

	.newVersionImg {
		width: 204px;
		height: 204px;
		margin-top: 70px;
		margin-bottom: 52px;
	}
</style>
