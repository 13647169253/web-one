<template>
	<div style="position: relative;" class="camera">
		<div class="text">
			<div class='say2' v-for="(item,index) in sayList" contenteditable="true">
				<strong :style="'color:'+colorArr[index]">{{item[0]}}</strong>
				<strong>{{' : '+item[1]}}</strong>
			</div>
		</div>
		<div class="box"><!-- v-if="!$route.query.hideHeader" -->
			<input maxlength="20" class='say' v-model="say" placeholder='说点什么吧...(最多20个字)' />
			<!-- <div id="say" class='say' contenteditable="true" v-html="say" @input="say=$event.target.innerHTML;" /> --><!-- contenteditable为设置可编辑 -->
			<x-button :disabled="!$store.state.user.id" :show-loading="loading" @click.native="send" mini class="send" :gradients="$store.state.user.id?['#1D62F0', '#19D5FD']:['#696969','#DCDCDC']">发送评论</x-button>
		</div>
		<van-icon v-if="$route.query.hideHeader" class="exchange" name="exchange" @click="switchCamera" />
		<!-- <van-icon v-if="!$route.query.hideHeader" class="exchange" name="replay" @click="replay" /> -->
		<!-- 分享 -->
		<!-- <Share @closeShare="isCloseShare" v-if="showShare" :logo="coverImage" commodityTitle="仙草田" :goodsExplain="'直播间:'+liveTitle" /> -->
	</div>
</template>

<script>
	import Share from "@com/share"
	import otherUtils from "@/utils/other"
	
	export default {
		components: {
			Share
		},
		data() {
			return {
				showShare:false,
				say:"",
				loading:false,
				sayList:[],
				coverImage:"",
				liveTitle:"",
				colorArr:[]
			}
		},
		created(){
			let that = this;
			that.$axios.post('/appServiceLive/lookLive', that.$qs.stringify({
				liveId:that.$route.query.liveId
			}))
			.then(res => {
				if(res.data.code==100){
					that.coverImage=res.data.info.coverImage;
					that.liveTitle=res.data.info.liveTitle;
				}
			})
			
		},
		methods:{
			switchCamera(){
				//switchCamera:是否点击了切换摄像头
				localStorage.setItem('switchCamera','true');
			},
			replay(){
				//switchCamera:是否点击了刷新
				localStorage.setItem('replayVideo','true');
			},
			send(){
				let that = this;
				this.loading = true;
				that.$axios.post('/appServiceLive/sendBarrage',that.$qs.stringify({
					liveId:that.$route.query.liveId,
					text:that.say
				}))
				.then(res => {
					if (res.data.code == 100) {
						that.say = '';
						that.loading = false;
					}
					//滚动到聊天框最底部
					that.colorArr.push(otherUtils.color16());
					let ele = document.getElementsByClassName('text')[0];
					ele.scrollTop = ele.scrollHeight;
				})
				.catch(err => {
					that.$toast('发送失败')
					that.loading = false;
				})
			},
			//关闭分享页面
			isCloseShare(data){
				this.showShare=false;
			}
		},
		created(){
			let that = this;
			let ws = new WebSocket('ws://47.94.37.25:6677/websocket?token='+that.$axios.defaults.headers.common['User-Token']+'&liveId='+that.$route.query.liveId);
			ws.onmessage = function (evt){
				let data = JSON.parse(evt.data);
				if(data.type==1){
					that.sayList.push([data.obj.nickname,data.obj.text]);
					//滚动到聊天框最底部
					that.colorArr.push(otherUtils.color16());
					let ele = document.getElementsByClassName('text')[0];
					ele.scrollTop = ele.scrollHeight;
				//主播退播了
				}else if(data.type==2){
					localStorage.setItem('liveControlClose','true');
					ws.close();
					localStorage.setItem('liveControlCloseTis','主播已下播');
				}else if(data.type==3){
					localStorage.setItem('liveUsersNum',data.obj);//观看人数
				//主播直播违禁内容，强制下播
				}else if(data.type==4){
					localStorage.setItem('liveControlClose','true');
					ws.close();
					localStorage.setItem('liveControlCloseTis','直播内容涉及违禁内容，已强制下播。请选择其它直播间进行观看。');
				//主播断开了连接
				}else if(data.type==5){
					localStorage.setItem('liveControlClose','true');
					ws.close();
					localStorage.setItem('liveControlCloseTis','主播已断开连接');
				}
			}
			//检查网络状态
			let netTimer = otherUtils.hasNet2(function(){},function(){
				ws.close();
			});
			//循环器告诉服务器我仍在连接，否则触发type=5的消息
			if(that.$route.query.isAnchor){
				setInterval(function(){
					ws.send('{liveId:'+that.$route.query.liveId+'}');
				},2000)
			}
		},
		mounted(){
			// let that = this;
			// let timer = setInterval(function() {
			// 	//分享弹窗
			// 	let showShare = localStorage.getItem('showShare');
			// 	if(showShare !== '' && showShare !== null && showShare !== undefined){
			// 		that.showShare=true;
			// 		localStorage.removeItem('showShare');
			// 	}
			// },500)
		}
	}
</script>

<style lang="less">
	.camera{
		height: 521px;
		overflow-x:hidden;
		
		.exchange{
			position: absolute;
			font-size: 60px;
			right: 40px;
			bottom: 150px;
			color: white;
		}
		.box{
			position: absolute;
			left: 40px;
			top: 370px;
			.say{
				// &:before{//模拟input的placeholder
				// 	content: '说点什么吧...';
				// 	color:white;
				// }
				color: white;
				border-radius:45px;
				border:none; 
				min-height: 73px;
				width: 441px;
				background-color: rgba(23, 20, 20, 0.48);
				font-size: 30px;
				padding: 15px 25px 15px 25px;
			}
			.send{
				margin-top: 20px;
			}
		}
		.text{
			position: absolute;
			width: 100%;
			height: 351px;
			overflow-y:auto;
			overflow-x:hidden;
			padding: 20px 40px 20px 40px;
			.say2{
				pointer-events: none;/*禁止交互操作.我只要contenteditable的自适应高度效果,而不想用户真的编辑*/
				max-width: 60%;
				color: white;
				font-size: 25px;
				background-color: black;
				border-radius:45px;
				background-color: rgba(23, 20, 20, 0.48);
				padding: 20px 20px 20px 20px;
				margin-top: 10px;
				margin-bottom: 10px;
			}
		}
	}
</style>
