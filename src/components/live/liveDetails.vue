<template>
	<div style="width:100%;height:100%;overflow-y: hidden;position: relative;">
		<div id="pusher"></div>
	</div>
</template>

<script>
	import otherUtils from "@/utils/other"
	export default {
		name: "liveDetails",
		data() {
			return {
				baseurl: window.baseurl,
				pusher: null,
				pushUrl: '',
				nickname:'',
				liveUsers:0,
				headImage:'',
				coverImage:''
			}
		},
		methods: {
			start() {
				// 开始推流
				this.pusher.start(function(){},function(err){
					//alert(JSON.stringify(err));
				});
			},
			end() {
				//停止推流
				this.pusher.stop();
			},
			//切换摄像头
			switchCamera() {
				this.pusher.switchCamera();
			},
		},
		mounted() {
			//检查网络状态
			let netTimer = otherUtils.hasNet2(function(){},function(){
				localStorage.setItem('liveControlClose','true');
				localStorage.setItem('liveControlCloseTis','您网络可能存在问题，已断开连接');
			});
			let that = this;
			this.pushUrl = this.$route.params.url; //推流地址
			// H5 plus事件处理
			function plusReady() {
				that.$axios.post('/appServiceLive/lookLive1', that.$qs.stringify({
					liveId:that.$route.params.liveId
				}))
				.then(res => {
					if(res.data.code==100){
						that.headImage = res.data.info.headImage;
						that.nickname = res.data.info.nickname;
						that.coverImage = res.data.info.coverImage;
					}
					// 创建直播推流控件
					var pusher = new plus.video.LivePusher('pusher', {
						url: that.pushUrl,
						mode:'SD'
					});
					pusher.preview();
					that.pusher = pusher;
					//直接开始推流！
					pusher.start();
					/*加载新的webview窗口,窗口样式设为背景透明.加载的窗口是悬浮在最顶部的。
					 * 这个窗口是为了加载工具按钮
					 * 因为原生的推流控件/拉流控件都会覆盖掉html标签，所以用webview加载工具按钮
					 * */
					plus.webview.open(window.location.href.split('#/')[0] + '#/liveControl', 'c1', {
						'height': '200px',
						'width': '100%',
						'background': 'transparent',//隐藏webview背景
						'overflow-y': 'hidden',
						'overflow-x': 'hidden'
					 });
					plus.webview.getWebviewById('c1').evalJS('window.p="hideHeader=true&nickname='+that.nickname+'&liveUsers='+that.liveUsers+'&headImage='+that.headImage+'&coverImage='+that.coverImage+'";')
					plus.webview.open(window.location.href.split('#/')[0] + '#/liveControl2?hideHeader=true&liveId='+that.$route.params.liveId+'&isAnchor=true', 'c2', {
						'bottom':'-220px',
						'height': '471px',
						'width': '100%',
						'background': 'transparent',
						'overflow-y': 'hidden',
						'overflow-x': 'hidden'
					});
					plus.webview.open(window.location.href.split('#/')[0] + '#/liveControl3', 'wb', {
						'height': '100%',
						'width': '100%',
						'background': 'transparent',
						'overflow-y': 'hidden',
						'overflow-x': 'hidden'
					});
					/*这里的定时器是为了监测webview里工具按钮的点击事件。
					 * */
					let timer = setInterval(function() {
						//切换摄像头按钮
						let switchCamera = localStorage.getItem('switchCamera');
						if(switchCamera !== '' && switchCamera !== null && switchCamera !== undefined && switchCamera == 'true'){
							that.switchCamera();
							localStorage.setItem('switchCamera',false);
						}
						//弹出“询问是否关闭直播”的弹出层
						let showCloseBox = localStorage.getItem('showCloseBox');
						if(showCloseBox !== '' && showCloseBox !== null && showCloseBox !== undefined && showCloseBox == 'true'){
							plus.webview.show('wb');
						}else{
							plus.webview.hide('wb');
						}
						//关闭按钮
						let liveControlClose = localStorage.getItem('liveControlClose');
						if(liveControlClose !== '' && liveControlClose !== null && liveControlClose !== undefined && liveControlClose == 'true'){
							//通知服务器直播间关闭
							that.$axios.post('/appServiceLive/closeLive')
							//获取所有webview
							let wvArr = plus.webview.all();
							//打开首页（这个要写在关闭所有webview之前。否则所有webview关闭后会直接退出应用，而不会继续打开这个webview）
							plus.webview.open(window.location.href.split('#/')[0] + '#/');
							//关闭所有webview
							wvArr.map(function(item){
								item.close();
							})
							// wvArr.map(function(item){
							// 	if(item.id == 'c1' || item.id == 'c2' || item.id == 'wb'){
							// 		item.close();
							// 	}
							// })
							let liveControlCloseTis = localStorage.getItem('liveControlCloseTis');
							if(liveControlCloseTis !== '' && liveControlCloseTis !== null && liveControlCloseTis !== undefined){
								that.$toast(liveControlCloseTis);
								localStorage.removeItem('liveControlCloseTis');
							}
							//that.pusher.close();
							//that.$router.go(-2);
							localStorage.removeItem('switchCamera');
							localStorage.removeItem('liveControlClose');
							window.clearInterval(timer);
						}
					}, 500)
				})
			}
			plusReady();
		}
	}
</script>

<style lang="less">
	#pusher {
		width: 100%;
		height: 100%;
		background-color: #000000;
	}
</style>
