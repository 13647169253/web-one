<template>
	<div class="">
		<div id="pusher" style="width:100%;height:300px;background-color:#000000;margin:auto"></div>
		<div id="video" enable-danmu danmu-btn style="width:100%;height:300px;background-color:#000000;margin:auto"></div>
		<center>
			<button @click="start">开始</button>
			<button @click="end">结束</button>
			<button @click="switchCamera">切换摄像头</button>
			<!--<button @click="sendDanmu">发送弹幕</button>-->
		</center>
	</div>
</template>

<script>
	//let videoJs = require('video.js')

	export default {
		name: 'App',
		data() {
			return {
				pusher:null,
				video:null
			}
		},
		methods: {
			start() {
				// 开始推流,播放直播（拉流）
				let that = this;
				this.pusher.start();
				this.video.play();
			},
			end() {
				//停止推流，停止播放直播（停止拉流）
				this.pusher.stop();
				this.video.stop();
			},
			switchCamera(){
				this.pusher.switchCamera();
			},
			sendDanmu(){
				this.video.sendDanmu({
					text:'测试弹幕233333',
					color:'#FF0000'
				})
			}
		},
		mounted(){
			let that = this;
			// H5 plus事件处理
			function plusReady(){
				// 创建直播推流控件
				var pusher = new plus.video.LivePusher('pusher',{
					url:'rtmp://push.runfkj.com/mushroom/11561545814099?auth_key=1561563814-64fee1e8439e4d8a87e01ba7c376d8e1-0-c4703156107064841b79afde671f8873',
					mode:'FHD',//推流视频模式（清晰度）
					muted:false//（是否录制声音）
				});
				pusher.preview();
				that.pusher = pusher;
				// 创建视频播放控件
				var video = new plus.video.VideoPlayer('video',{
					src:'rtmp://pull.runfkj.com/fff/dddd?auth_key=1560265301-0-0-0705b7ff187bef81160a90d6bda41f93'
				});
				that.video = video;
			}
			if(window.plus) {
			 　　plusReady();
			} else {
			 　　document.addEventListener('plusready', plusReady, false);
			}
		}
	}
</script>

<style>
	.video-js {
		height: 40%;
	}
</style>