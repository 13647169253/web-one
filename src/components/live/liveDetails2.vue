<template>
	<div style="width:100%;height:100%;overflow-y: hidden;position: relative;">
		<div id="video"></div>
	</div>
</template>

<script>
	import otherUtils from "@/utils/other"
	export default {
		name: "liveDetails",
		data() {
			return {
				baseurl: window.baseurl,
				video: null,
				liveId:null,
				pullUrl: '',
				commodityPicture : '',
				unitPrice : '',
				goodsName : '',
				goodsId:'',
				goodsType:1,//1是出售，2是采购
				coverImage:''
			}
		},
		methods: {
			start() {
				// 开始拉流
				this.video.play();
			},
			end() {
				//停止拉流
				this.video.stop();
			},
			replayVideo(){
				let that = this;
				that.$axios.post('/appServiceLive/lookLive1', that.$qs.stringify({
					liveId:that.liveId
				}))
				.then(res => {
					if(res.data.code==100){
						that.pullUrl = res.data.info.pullUrl;
						that.video.setStyles({src:that.pullUrl});
					}
				})
			}
		},
		mounted() {
			//检查网络状态
			let netTimer = otherUtils.hasNet2(function(){},function(){
				localStorage.setItem('liveControlClose','true');
				localStorage.setItem('liveControlCloseTis','您网络可能存在问题，已断开连接');
			});
			let that = this;
			this.liveId = this.$route.query.liveId;//拉流的直播间id
			// H5 plus事件处理
			function plusReady() {
				that.$axios.post('/appServiceLive/lookLive1', that.$qs.stringify({
					liveId:that.liveId
				}))
				.then(res => {
					if(res.data.code==100){
						if(res.data.info.isLive==0){
							localStorage.setItem('liveControlClose','true');
							localStorage.setItem('liveControlCloseTis','主播已下播');
						}
						that.coverImage = res.data.info.coverImage;
						that.pullUrl = res.data.info.pullUrl;
						if(res.data.info.isAddgoods==1){
							that.goodsType = res.data.info.goodsType;
							that.goodsId = res.data.info.goodsId;
							that.commodityPicture = res.data.info.goodsCoverImage;
							that.unitPrice = res.data.info.unitPrice;
							that.goodsName = res.data.info.goodsName;
						}
						// 创建视频播放控件
						var video = new plus.video.VideoPlayer('video',{
							src:that.pullUrl,
							width:'100%',
							height:'100%',
							controls:false,//隐藏控件
							objectFit:'fill'//当视频大小与 video 容器大小不一致时，视频的表现形式为“填充铺满”
						});
						//实时监听错误，然后重新获取拉流地址
						video.addEventListener('error', function(e){
							that.replayVideo();
						}, false);
						that.video = video;
						that.video.play();
						//依赖goodsCoverImage，unitPrice，goodsName这些数据，所以打开webview必须写在then链里。
						plus.webview.open(window.location.href.split('#/')[0] + '#/liveControl', 'c1', {
							'height': '200px',
							'width': '100%',
							'background': 'transparent',
							'overflow-y': 'hidden',
							'overflow-x': 'hidden'
						});
						plus.webview.getWebviewById('c1').evalJS('window.p="nickname='+that.$route.query.nickname+'&liveUsers='+that.$route.query.liveUsers+'&headImage='+that.$route.query.headImage+'&commodityPicture='+that.commodityPicture+'&unitPrice='+that.unitPrice+'&goodsName='+that.goodsName+'&goodsType='+that.goodsType+'&goodsId='+that.goodsId+'&coverImage='+that.coverImage+'"')
					}
					/*加载新的webview窗口,窗口样式设为背景透明.加载的窗口是悬浮在最顶部的。
					 * 这个窗口是为了加载dom元素
					 * 因为原生的推流控件/拉流控件都会覆盖掉html标签，所以用webview加载
					 * 这里加载的是直播画面之上的工具按钮
					 * */
					 plus.webview.open(window.location.href.split('#/')[0] + '#/liveControl2?liveId='+that.$route.query.liveId, 'c2', {
					 	'bottom':'-220px',
					 	'height': '471px',
					 	'width': '100%',
					 	'background': 'transparent',
					 	'overflow-y': 'hidden',
					 	'overflow-x': 'hidden'
					 });
					//关闭按钮
					let timer = setInterval(function() {
						let liveControlClose = localStorage.getItem('liveControlClose');
						if(liveControlClose !== '' && liveControlClose !== null && liveControlClose !== undefined && liveControlClose == 'true'){
							//获取所有webview
							let wvArr = plus.webview.all();
							//打开首页（这个要写在关闭所有webview之前。否则所有webview关闭后会直接退出应用，而不会继续打开这个webview）
							//plus.webview.open(window.location.href.split('#/')[0] + '#/');
							//关闭所有webview（除了当前weibview）
							wvArr.map(function(item){
								if(item.id == 'c1' || item.id == 'c2'){
									item.close();
								}
							})
							let liveControlCloseTis = localStorage.getItem('liveControlCloseTis');
							if(liveControlCloseTis !== '' && liveControlCloseTis !== null && liveControlCloseTis !== undefined){
								that.$toast(liveControlCloseTis);
								localStorage.removeItem('liveControlCloseTis');
							}
							that.video.close();
							that.$router.go(-1);
							localStorage.removeItem('liveControlClose');
							window.clearInterval(timer);
						}
						/**
						刷新视频，重新获取拉流地址（因为用户手机锁屏就会停止推流，打开又重新推流。而重新推流，拉流地址会改变，需要重新获取拉流地址）
						let replayVideo = localStorage.getItem('replayVideo');
						if(replayVideo !== '' && replayVideo !== null && replayVideo !== undefined && replayVideo == 'true'){
							that.replayVideo();
							localStorage.removeItem('replayVideo');
						}
						*/
					   //跳到商品详情页
					   let toDetails = localStorage.getItem('toDetails');
					   if(toDetails !== '' && toDetails !== null && toDetails !== undefined){
						   localStorage.removeItem('toDetails');
							plus.webview.open(window.location.href.split('#/')[0] + '#'+toDetails,'details');
					  }
					}, 500)
				})
			}
			plusReady();
		}
	}
</script>

<style lang="less">
	#video {
		width: 100%;
		height: 100%;
		background-color: #000000;
	}
</style>
