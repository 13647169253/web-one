<template>
	<transition name="van-fade">
		<div id="details" style="position: relative;">
			<div v-if="banners.length<=0 && !videoAddress" class="banner"></div>
			<van-swipe indicator-color="white">
				<van-swipe-item v-if="videoAddress">
					<video class="banner" :src="videoAddress" :poster="previewPicture" controls></video>
				</van-swipe-item>
				<van-swipe-item v-for="item in banners">
					<center>
						<van-image @click="$ImagePreview(banners)" class="banner" :src="item" />
					</center>
				</van-swipe-item>
			</van-swipe>
			<van-image @click="back" class="backImg" :src="backImg" />
			<van-image :src="isCollect=='1'?starImg2:starImg" class="starImg" @click="collect" />
			<van-image v-if="!$route.query.isIndex" class="updateImg" :src="updateImg" @click="update" />
			<van-image @click="showShare=true" class="shareImg" :src="shareImg" />
			<div class="detailsContent">
				<template v-if="$route.query.type=='purchase'">
					<span><font color="red">¥
							<font size="5">{{heartPrice.split('元/')[0].split('-')[0]}}</font>
						</font>&nbsp;/&nbsp;{{buyNumber}}{{heartPrice.split('元/')[1]}}起</span><br />
				</template>
				<template v-if="$route.query.type=='sell'">
					<span><font color="red">¥
							<font size="5">{{unitPrice.split('元/')[0]}}</font>
					</font>&nbsp;/&nbsp;{{unitPrice.split('元/')[1]}}</span><br />
				</template>
				<van-image class="buy" :src="buy" />
				<strong class="title" style="word-wrap: break-word;word-break: normal;">
					{{title}}
				</strong><br />
				<span style="word-wrap: break-word;word-break: normal;" v-if="$route.query.type=='purchase'" :class="showText?'showAllSpan grayspan':'grayspan'">产地要求：{{originRequirement}}</span>
				<span style="word-wrap: break-word;word-break: normal;" :class="showText?'showAllSpan grayspan':'grayspan'" v-else>{{goodsExplain}}</span>
				<center>
					<span @click="showText=showText?false:true" style="color: #2087FD;">{{showText?('查看全部'):'隐藏全部'}}<van-icon :name="showText?'arrow-down':'arrow-up'" />
					</span>
				</center>
					<div class="splitDiv" />
				<div class="info">
					<van-image class="infoImg" :src="userHeadImage?(baseurl+'/file/readFile/'+userHeadImage):headImage" />
					<div class="font">
						<strong>{{nickname}}</strong>
						<span class="grayspan">{{phone}}</span>
						<router-link :to='{
								path:"/farmer",query:{
									id:userId
								}
							}'>
							<button class="bt" :style="'background-image: url('+btImg+');'">查看主页</button>
						</router-link>
					</div>
				</div>
				<div class="splitDiv" />
				<template v-if="$route.query.type=='purchase'">
					<van-field label="订购量" readonly v-model="buyNumber" />
					<van-field label="心理价位" readonly v-model="heartPrice" />
					<van-field label="其他说明" readonly v-model="otherRequire" />
				</template>
				<template v-if="$route.query.type=='sell'">
					<van-field label="起订量" readonly v-model="minimumOrder" />
					<!-- <van-row>
					  <van-col class="productAreaName" style="white-space:nowrap;padding: 10px 15px;font-weight: bold;font-size: 14px;color: gray;" span="8">产地</van-col>
					  <van-col class="productAreaText" style="font-size: 14px;color: black;" span="16">{{productArea}}</van-col>
					</van-row> -->
					<van-field label="产地" readonly v-model="productArea" />
					<!-- <div style="white-space:nowrap;padding: 10px 15px;"><span style="font-weight: bold;margin-right: 60px;">产地</span><span style="white-space:nowrap;color: black;word-break: normal;width: auto; white-space: pre-wrap; word-wrap: break-word;overflow: hidden;">{{productArea}}</span></div> -->
				</template>
				<div class="splitDiv" />
				<div v-if="details.length<=0" class="mainImg" />
				<div class="read">商品详情</div>
				<div>
					<van-image v-for="item in details" class="mainImg" :src="item" />
				</div>
			</div>
			<div class="nullDiv"></div>
			<template v-if="!$route.query.isIndex">
				<template v-if="$route.query.state==0">
					<van-button size="large" square :style="'background-image: url('+btImg+');'" class="submitBtn submitBtnByBottom" @click="notClose = true;">{{$route.query.type=='purchase'?'结束采购':'下架商品'}}</van-button>
				</template>
				<template v-if="$route.query.state==1">
					<van-button :disabled="$route.query.type=='purchase'?true:false" size="large" square :style="$route.query.type=='sell'?'background-image: url('+btImg+');':'opacity:1!important'"
					 :class="$route.query.type=='purchase'?'submitBtn3 submitBtnByBottom':'submitBtn submitBtnByBottom'" @click="notClose = true;">{{$route.query.type=='purchase'?'已结束':'重新上架'}}</van-button>
				</template>
			</template>
			<template v-else>
				<van-button size="large" square :style="'background-image: url('+btImg+');'" class="submitBtn submitBtnByBottom" @click="notClose = true;">立即联系</van-button>
			</template>
			<div>
				<x-dialog v-model="notClose" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
					<center>
						<div class="tips">
							<template v-if="!$route.query.isIndex">
								<span v-if="$route.query.state==0">是否确认{{$route.query.type=='purchase'?'结束采购':'下架商品'}}？</span>
								<span v-if="$route.query.state==1">是否确认重新上架？</span>
							</template>
							<template v-else>
								<span>确认拨打{{phone}}吗？</span>
							</template>
							<a :href="'tel:'+phone">
								<van-button @click="notClose = false;" v-if="$route.query.isIndex" size="large" square :style="'background-image: url('+btImg+');'"
								 class="submitBtn2">确认拨打</van-button>
							</a>
							<van-button v-if="!$route.query.isIndex" @click="updateStatus($route.query.state==0?2:1)" size="large" square
							 :style="'background-image: url('+btImg+');'" class="submitBtn2">确认</van-button>
						</div>
					</center>
					<br><br><br>
					<x-icon @click="notClose = false;" type="ios-close-outline" size="46px" style="fill:white;"></x-icon>
				</x-dialog>
			</div>
			<!-- 分享 -->
			<Share @closeShare="isCloseShare" v-if="showShare" :logo="banners[0]" :commodityTitle="title"  :goodsExplain="goodsExplain" />
		</div>
	</transition>
</template>

<script>
	/**
	 * query.type有2种
	 * 1.purchase（我要买进来的）
	 * 2.sell（我要卖进来的）
	 * 并且传参query.state。query.state有2种
	 * 0，采购中/出售中
	 * 1，已结束
	 */
	import Share from "@com/share"
	export default {
		components: {
			Share
		},
		data() {
			return {
				showShare:false,
				baseurl:window.baseurl,
				title: '',
				originRequirement: '',
				phone: '',
				notClose: false,
				buyNorms: '',
				buyNumber: '',
				banners: [],
				details: [],
				goodsExplain: '',
				minimumOrder: '',
				productArea: '',
				previewPicture: '',
				videoAddress: '',
				unitPrice: '',
				nickname:'',
				userId:'',
				userHeadImage:'',
				showText:true,
				backImg: require('@/assets/img/20190620151549.png'),
				starImg: require('@/assets/img/20190620151601.png'),
				starImg2: require('@/assets/img/20190711111716.png'),
				isCollect:'',
				headImage: require('@/assets/img/20190709164736.png'),//默认头像
				updateImg: require('@/assets/img/20190620151543.png'),
				shareImg: require('@/assets/img/20190620151516.png'),
				buy: this.$route.query.type == 'purchase' ? (require('@/assets/img/buy.png')) : (require('@/assets/img/out.png')),
				btImg: require('@/assets/img/20190619120234.png'),
				heartPrice: "",
				otherRequire: "",
				url: this.$route.query.type == 'purchase' ? '/appServiceBuyGoods/detail' : '/appServiceSellGoods/detail'
			}
		},
		created() {
			let that = this;
			this.$axios.post(this.$route.query.type == 'purchase' ? '/appServiceBuyGoods/homeDetail' : '/appServiceSellGoods/homeDetail',this.$qs.stringify({
						id: this.$route.query.id,
					}))
				.then(res => {
					if (res.data.code == 100) {
						this.userHeadImage = res.data.info.headImage;
						this.nickname = res.data.info.nickname;
						this.phone = res.data.info.contactPhone;
						this.userId = res.data.info.userId;
					}
					return this.$axios.post(this.url, this.$qs.stringify({
						id: this.$route.query.id,
					}))
				})
				.then(res => {
					if (res.data.code == 100) {
						if (this.$route.query.type == 'purchase') {
							let banners = res.data.info.banners.split(',');
							for (let key in banners) {
								banners[key] = window.baseurl + '/file/readFile/' + banners[key]
							}
							that.banners = banners;
							let details = res.data.info.details.split(',');
							for (let key in details) {
								details[key] = window.baseurl + '/file/readFile/' + details[key]
							}
							that.details = details;
							that.title = res.data.info.goodsName;
							that.originRequirement = res.data.info.originRequirement;
							that.buyNorms = res.data.info.buyNorms;
							that.buyNumber = res.data.info.buyNumber;
							that.heartPrice = res.data.info.heartPrice;
							that.otherRequire = res.data.info.otherRequire;
							that.isCollect = res.data.info.isCollect;
						} else {
							that.title = res.data.info.goodsName;
							that.goodsExplain = res.data.info.goodsExplain;
							that.minimumOrder = res.data.info.minimumOrder;
							that.productArea = res.data.info.productArea;
							that.unitPrice = res.data.info.unitPrice;
							that.previewPicture = window.baseurl + '/file/readFile/' + res.data.info.previewPicture;
							that.videoAddress = res.data.info.videoAddress?window.baseurl + '/file/readFile/' + res.data.info.videoAddress:'';
							let banners = res.data.info.banners.split(',');
							for (let key in banners) {
								banners[key] = window.baseurl + '/file/readFile/' + banners[key]
							}
							that.banners = banners;
							let details = res.data.info.details.split(',');
							for (let key in details) {
								details[key] = window.baseurl + '/file/readFile/' + details[key]
							}
							that.details = details;
							that.isCollect = res.data.info.isCollect;
						}
					}
				})
		},
		methods: {
			isCloseShare(data){
				this.showShare=false;
			},
			back(){
				if(this.$route.query.isWebViewBack){
					plus.webview.close('details');
				}else{
					this.$router.go(-1);
				}
			},
			update() {
				this.$router.push({
					path: this.$route.query.type == 'purchase' ? 'purchase' : 'sell',
					query: {
						id: this.$route.query.id
					}
				})
			},
			updateStatus(status) {
				this.$axios.post(this.$route.query.type == 'purchase' ? '/appServiceBuyGoods/status' :
						'/appServiceSellGoods/status', this.$qs.stringify({
							id: this.$route.query.id,
							status: status
						}))
					.then(res => {
						if (res.data.code == 100) {
							this.$toast.success(res.data.info);
							this.$navigation.cleanRoutes();
							this.notClose = false;
							this.$router.go(-1)
						}
					})
					.catch(res => {
						this.$toast.fail(res.data.info),
							this.notClose = false;
					})
			},
			collect() {
				let collectionUrl = '';
				if(this.isCollect==0){
					collectionUrl = this.$route.query.type == 'purchase' ? '/appServiceBuyGoods/collection' :'/appServiceSellGoods/collection';
				}else{
					collectionUrl = this.$route.query.type == 'purchase' ? '/appServiceBuyGoods/notCollection' :'/appServiceSellGoods/notCollection';
				}
				this.$axios.post(collectionUrl, this.$qs.stringify({
							id: this.$route.query.id
						}))
					.then(res => {
						if (res.data.code == 100) {
							this.isCollect=this.isCollect==1?0:1;
							this.$toast.success(res.data.info);
						}
					})
					.catch(res => {
						this.$toast.fail(res.data.info);
					})
			}
		}
	}
</script>

<style lang="less">
	#details {
		.banner {
			width: 100%;
			height: 754px;
		}

		.detailsContent {
			margin: 0 25px 0 25px;
		}

		.detailsContent span {
			color: gray;
			font-size: 30px;
		}

		.backImg {
			position: absolute;
			width: 68px;
			height: 68px;
			top: 20px;
			left: 32px;
		}

		.starImg {
			position: absolute;
			width: 68px;
			height: 68px;
			top: 20px;
			right: 129px;
		}

		.updateImg {
			position: absolute;
			width: 68px;
			height: 68px;
			top: 20px;
			right: 230px;
		}

		.shareImg {
			position: absolute;
			width: 68px;
			height: 68px;
			top: 20px;
			right: 30px;
		}

		.buy {
			top: 4px;
			height: 39px;
			width: 70px;
		}

		.title {
			font-size: 40px;
			color: black
		}

		.splitDiv {
			margin-left: -25px !important;
			margin-right: -25px !important;
			height: 27px;
			background-color: #f6f5fa;
			margin-left: 0;
		}

		.van-cell__title span {
			font-weight: bold !important;
		}

		.info {
			position: relative;
			height: 160px;

			strong {
				float: left;
				color: black;
				font-size: 30px;
				// margin-top: 47px;
			}
			
			.font {
				float: left;
				strong{
					margin-top: 35px;
					float:none!important;
					display: -webkit-box;
					-webkit-line-clamp: 1;
					overflow: hidden;
					-webkit-box-orient: vertical;
					max-width: 350px;
				}
			}

			.infoImg {
				float: left;

				img {
					height: 90px;
					width: 90px;
					margin: 35px 27px 35px 27px;
					border-radius: 45px;
				}
			}

			.bt {
				position: absolute;
				width: 187px;
				height: 61px;
				background-size: cover;
				background-position: 50% 50%;
				background-repeat: no-repeat;
				border: 0px;
				border-radius: 45px;
				right: 0px;
				top: 49px;
				color: white;
			}
		}

		.read {
			margin: 29px;
			font-size: 30px;
			font-weight: bold;
			color: black;
		}

		.mainImg {
			margin-left: -25px !important;
			margin-right: -25px !important;
			display: block;
		}

		.submitBtn {
			height: 100px;
			background-size: cover;
			background-position: 50% 50%;
			color: white
		}

		.submitBtn2 {
			height: 100px;
			background-size: cover;
			background-position: 50% 50%;
			color: white;
			margin-top: 125px;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
		}
		.submitBtnByBottom{
			position: fixed!important;
			bottom: 0!important;
		}

		.submitBtn3 {
			height: 100px;
			color: white;
			background-color: gray;
		}
		.nullDiv{
			height: 100px;
		}
		.tips {
			border-radius: 10px;
			color: #000000;
			background-color: white;
			height: 351px;
			width: 588px;
			padding-top: 126px;

			span {
				font-weight: bold;
				font-size: 40px;
			}
		}
		/*
	 *文本超过5行显示省略号 
	 */
		.showAllSpan {
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
		.productAreaName{
			
		}
		.productAreaText{
			margin-left: -28px;
		}
	}
</style>
