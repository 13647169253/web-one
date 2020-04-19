<template>
	<div style="position: relative;">
		<div class="tool">
			<div class="header" v-show="show">
				<div class="p" :style="'background-image: url('+(headImage?baseurl+'/file/readFile/'+headImage:headImage2)+'); background-size:cover; background-position:50% 50%;color:white'"></div>
					<div class="text">
						<span>{{nickname}}</span>
						<span>{{liveUsers}}</span><span>观看</span>
					</div>
			</div>
			<div v-if="this.goodsId" class="commodityP">
				<div class="commodityPicture" @click="showUnitPrice=showUnitPrice?false:true" :style="'background-image: url('+(baseurl+'/file/readFile/'+commodityPicture)+'); background-size:cover; background-position:50% 50%;color:white'"></div>
				<div v-if="!showUnitPrice" class="commodityText">
					<center>看货▶</center>
				</div>
			</div>
			<div class="commodityP2" v-show="showUnitPrice" @click="toDetails()">
				<span>{{goodsName}}</span>
				<span>{{unitPrice}}</span>
				<van-icon name="arrow" class="arrow" />
			</div>
			<van-image @click="share" class="shareImg" :src="shareImg" />
			<van-icon class="close" name="cross" @click="close()" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showUnitPrice: false,
				baseurl: window.baseurl,
				show: true,//this.$route.query.hideHeader ? false : true,
				nickname: this.$route.query.nickname,
				liveUsers: this.$route.query.liveUsers,
				headImage: this.$route.query.headImage,
				coverImage: this.$route.query.coverImage,
				headImage2: require('@/assets/img/20190709164736.png'),
				commodityPicture: this.$route.query.commodityPicture,
				unitPrice: this.$route.query.unitPrice,
				goodsName: this.$route.query.goodsName,
				shareImg: require('@/assets/img/20190715112128.png'),
				appIcon:require("../../assets/img/xiancaotian.png")
			}
		},
		methods: {
			//关闭直播
			close() {
				//liveControlClose:是否点击了关闭直播图标
				if (!this.hideHeader) {
					localStorage.setItem('liveControlClose', 'true');
				} else {
					localStorage.setItem('showCloseBox', 'true');
				}
			},
			//跳到详情页
			toDetails(){
				let that = this;
				localStorage.setItem('toDetails','/details?type='+(that.goodsType=='1'?'sell':'purchase')+'&id='+that.goodsId+'&state=0&isIndex=true&isWebViewBack=true');
			},
			share(){
				let that = this;
				let msg={};
				msg.type='web',
				msg.title='仙草田app下载',
				msg.thumbs=[that.appIcon],
				//msg.pictures=[that.logo];
				msg.content = '仙草田app下载';
				msg.href='http://mushroom.runfkj.com/download';
				plus.share.sendWithSystem(msg, function(){}, function(e){
					console.log(e.message)
				});
				//localStorage.setItem('showShare', 'true');
			}
		},
		mounted() {
			if(window.p){
				let p = window.p;
				let arr = p.split('&');
				for(let key in arr){
					this[arr[key].split('=')[0]]=arr[key].split('=')[1];
					console.log(arr[key].split('=')[0])
				}
			}
			let that = this;
			//实时获取观看人数
			setInterval(function() {
				let liveUsersNum = localStorage.getItem('liveUsersNum');
				if (liveUsersNum !== '' && liveUsersNum !== null && liveUsersNum !== undefined) {
					that.liveUsers = liveUsersNum;
				}
			})
		}
	}
</script>

<style lang="less">
	.tool {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		
		.header {
			width: 309px;
			height: 82px;
			background-color: rgba(23, 20, 20, 0.48);
			border-radius: 45px;
			margin: 28px 0 0 39px;
			padding-top: 5px;
			padding-bottom: 5px;
			padding-left: 10px;
			color: white;

			.p {
				float: left;
				height: 70px;
				width: 70px;
				border-radius: 45px;
			}

			.text {
				margin-left: 10px;
				float: left;
				span{
					display: -webkit-box;
					-webkit-line-clamp: 1;
					overflow: hidden;
					-webkit-box-orient: vertical;
					&:nth-child(1){
						max-width: 180px;
					}
					&:nth-child(2){
						float: left;
						max-width: 120px;
					}
					&:nth-child(3){
						float: left;
					}
				}
			}
		}

		.commodityP {
			background: white;
			position: absolute;
			top: 157px;
			left: 42px;
			width: 96px;
			max-height: 127px;

			.commodityText {
				height: 31px;
				line-height: 31px;
				font-size: 20px;
			}

			.commodityPicture {
				height: 96px;
			}
		}

		.commodityP2 {
			background: white;
			position: absolute;
			top: 157px;
			left: 138px;
			width: 252px;
			height: 96px;
			.arrow{
					font-size: 40px;
					left: 210px;
					top:30px;
					position: absolute;
			}
			span {
				-webkit-line-clamp: 1;
				overflow: hidden;
				-webkit-box-orient: vertical;
				display: -webkit-box;
				font-size: 24px;
				max-width: 70%;
				&:nth-child(1) {
					margin-top: 14px;
					margin-left: 22px;
				}

				&:nth-child(2) {
					color: red;
					margin-left: 22px;
				}
			}
		}
		.shareImg{
			position: absolute;
			right: 140px;
			top: 45px;
			height: 53px;
			width: 53px;
			color: white;
		}
		.close {
			position: absolute;
			right: 40px;
			top: 40px;
			font-size: 70px;
			color: white;
		}
	}
</style>
