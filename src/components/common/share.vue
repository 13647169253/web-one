<template>
	<!-- 如果要通过选择来使用哪种分享，而非直接调起“系统分享”，则应该去掉v-show -->
	<van-popup
	class="share"
	  v-model="show"
	  v-show="false"
	  round
	  position="bottom"
	 
	>
	<Divider class="shareText"><font class="shareTextFont">&nbsp;分享出去让更多人知道&nbsp;</font></Divider>
	<center>
		<div class="shareImg2" @click="shareBySys"><img :src="systemImg" /><span>&nbsp;&nbsp;系统分享&nbsp;</span></div>
		<!-- <div class="shareImg2" @click="share1"><img :src="friendImg" /><span>分享给好友</span></div> -->
		<div class="shareImg2" @click="share2"><img :src="friendsImg" /><span>分享到朋友圈</span></div>
		<!-- <span class="closeShare">取消</span> -->
	</center>
	</van-popup>
</template>

<script>
	export default {
		props:['logo','commodityTitle','goodsExplain'],
		data() {
			return {
				show:true,
				friendImg: require('@/assets/img/20190715112318.png'),
				friendsImg: require('@/assets/img/20190715112307.png'),
				systemImg: require('@/assets/img/20190729221952.png'),
			}
		},
		created(){
			this.shareBySys();
		},
		methods:{
			share1(){
				this.share('WXSceneSession');
			},
			share2(){
				this.share('WXSceneTimeline');
			},
			//系统分享
			shareBySys(){
				let that= this;
				let msg={};
				msg.type='web',
				msg.title=that.commodityTitle,
				msg.thumbs=[that.logo],
				//msg.pictures=[that.logo];
				msg.content = that.goodsExplain;
				msg.href='http://mushroom.runfkj.com/download';
				//msg.media='';
				//msg.geo={};
				//msg.miniProgram={};
				msg.interface='auto';
				that.$emit('closeShare','');
				plus.share.sendWithSystem(msg, function(){}, function(e){});
			},
			//TODO：分享至微信（【plus的分享功能】支持分享到新浪微博，腾讯微博，微信，qq）
			share(scene){
				let that= this;
				// 扩展API加载完毕，现在可以正常调用扩展API
				plus.share.getServices(function(services){
					let shares = {};
					for(let i in services){
						let t=services[i];
						shares[t.id]=t;
					}
					let sweixin=shares['weixin'];
					if(!sweixin){
						that.$toast('当前环境不支持微信分享操作!');
					}else{
						let msg={};
						msg.type='web',
						msg.title=that.commodityTitle,
						msg.thumbs=[that.logo],
						//msg.pictures=[that.logo];
						msg.content = that.goodsExplain;
						msg.href='http://mushroom.runfkj.com/download';
						msg.extra={
							scene:scene
						}
						//msg.media='';
						//msg.geo={};
						//msg.miniProgram={};
						msg.interface='auto';
						
						//发送分享
						if(sweixin.authenticated){
							doShare(sweixin, msg);
						}else{
							sweixin.authorize(function(){
								doShare(sweixin, msg);
							}, function(e){
								console.log('认证授权失败：'+JSON.stringify(e));
							});
						}
					}
				},function(error){
					that.$toast("获取分享服务列表失败："+error.message+" - "+error.code);
				});
				// 发送分享（srv:给一个分享对象，这里给微信分享）
				function doShare(srv, msg){
					srv.send(msg, function(){//1.微信分享
					//plus.share.sendWithSystem(msg, function(){//2.系统分享
						that.$emit('closeShare','');
						//console.log('分享到"'+srv.description+'"成功！');
					}, function(e){
						that.$emit('closeShare','');
						console.log('分享到"'+srv.description+'"失败: '+JSON.stringify(e));
					});
				}
			}
		},
		watch:{
			//通知父组件销毁这个分享弹出层，因为父组件无法操作这个弹出层的v-model值，也就是关了就打不开了。所以让父组件重新创建此弹出层。
			show(val,oval){
				this.$emit('closeShare','')
			}
		}
	}
</script>

<style lang="less">
	.share{
		height: 423px;
		border-top-left-radius: 25px;
		border-top-right-radius: 25px;
		.shareText{
			margin-top: 76px!important;
			.shareTextFont{
				color:gray;
				font-size: 26px;
			}
		}
		.shareImg2{
			width: 125px;
			height: 125px;
			&:nth-child(1){
				display: inline-block;
				margin-fight: 91px;
				img{
					width: 100%;
					height: 100%;
					vertical-align: middle;
				}
				span{
					margin-top: 23px;
					display: flex;
				}
			}
			&:nth-child(2){display: inline-block;
				margin-left: 91px;
				img{
					width: 100%;
					height: 100%;
					vertical-align: middle!important;
				}
				span{
					margin-top: 23px;
					display: flex;
					width: 150px;
					margin-left: -10px;
				}
			}
		}
		.closeShare{
			display: block;
			font-size: 26px;
		}
	}
</style>
