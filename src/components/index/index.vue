<template>
	<div :style="'background-image: url(' + bgImg + ');background-repeat:no-repeat;background-size:100% 400px;background-color: #F7F7F7'"
	 :class="loadingCommodity?'seat':''">
		<van-pull-refresh v-model="$store.state.isLoading" @refresh="onRefresh">
			<!-- 顶部导航 -->
			<x-header id="search" style="background-color:transparent;">
				<!-- <van-search slot="overwrite-title" v-model="search" placeholder="请输入搜索关键词" @click="$router.push('/search')" shape="round"
				 style="width: 80%;margin-top: -8px;background-color:transparent;color: white!important;" /> -->
				<div slot="overwrite-left" style="color: white;font-size: 20px;margin-top: -6px;">
					<van-icon size="22px" name="location" style="top: 4px;" /><span style="color: white;">{{city?city:'未知'}}<!-- 城市 --></span>
				</div>
				<div @click="$router.push({path:'/myMessage'});" slot="right" class="headPortrait" :style="'background: url(' + (headImg.split('file/readFile/')[1] !='undefined' && headImg.split('file/readFile/')[1] !=''?headImg:headImg2) + '); background-size:cover;  '"></div>
			</x-header>
			<!-- 轮播banner -->
			<van-swipe :autoplay="3000" indicator-color="white" style="margin-top: 15px;">
				<!--style="height: 150px;background-image: url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2458914123,541076108&fm=27&gp=0.jpg); background-size:cover; background-position:50% 50%;"-->
				<van-swipe-item v-for="item in bannerList">
					<center>
						<img v-if="item.jumpMode==1" :src="baseurl+'/file/readFile/'+item.banner" @click="openUrl('http://'+item.jumpUrl)"
						 lazy-load style="height: 180px;width: 93%;border-radius:10px;" />
						<router-link v-if="item.jumpMode==2" :to="'/details?isIndex=true&type=sell&id='+item.fgoodsId"><img :src="baseurl+'/file/readFile/'+item.banner"
							 lazy-load style="height: 180px;width: 93%;border-radius:10px;" /></router-link>
						<router-link v-if="item.jumpMode==3" :to="'/details?isIndex=true&type=purchase&id='+item.fgoodsId"><img :src="baseurl+'/file/readFile/'+item.banner"
							 lazy-load style="height: 180px;width: 93%;border-radius:10px;" /></router-link>
					</center>
				</van-swipe-item>
			</van-swipe>
			<!-- 直播入口banner -->
			<div style="position: relative;width: 100%;">
				<div @click="$router.push('/live?index=1')" :style="'height: 18px;width:40px;background-image: url('+liveImg+'); background-size:cover; background-position:50% 50%;margin:10px 0 0 20px;'">
					<span style="margin-left: 50px;display: inline-block;white-space: nowrap;color: white;font-size: 15px;width: 50px;line-height: 18px;;">为您推荐</span>
					<van-icon name="arrow" size="20px" color="white" style="position: absolute;right: 15px;top: 0;" />
				</div>
				<van-row style="margin-top: 10px;">
					<van-col span="12" v-for="(item,index) in liveList">
						<div @click="liveRoom(item.noLive,item.liveId,item.nickname,item.liveUsers,item.headImage)" :style="'background-image: url('+item.coverImage+'); background-size:cover; background-position:50% 50%; height:160px;background-color:#000000; margin:'+(index==0?'5px 5px 5px 10px':'5px 10px 5px 5px')+'; border-radius: 10px;position:relative;'">
							<div v-if="!item.noLive" style="position:absolute;background-color: #5E5E5E;height: 18px;top: 10px;color: white;right: 5px;padding:0 5px 0 5px;border-radius: 15px;">
								<img :src="liveTag" style="position:absolute;height: 19px;left: -25px;top: -1px;" />&nbsp;&nbsp;&nbsp;{{item.liveUsers}}观看&nbsp;
							</div>
							<strong v-if="!item.noLive" class="liveTitle">{{item.liveTitle}}</strong>
							<div style="position:absolute;right: 5px;bottom: 5px;" v-if="false">
								<img :src="liveTag2" style='height: 13px;margin-bottom: -3px;' />
								<span style="color: white;bottom: 5px;">0</span>
							</div>
						</div>
					</van-col>
				</van-row>
			</div>
			<!--默认水平
			<flexbox style="margin-top: 5px;">
				<flexbox-item>
					<img src="" style='height: 4.31rem;width: 100%;' />
				</flexbox-item>
				<flexbox-item>
					垂直
					<flexbox orient="vertical" :gutter="0">
						<flexbox-item>
							<img src="" style='height: 2.17rem;width: 100%;' />
						</flexbox-item>
						<flexbox-item>
							<img src="" style='height: 2.17rem;width: 100%;' />
						</flexbox-item>
					</flexbox>
				</flexbox-item>
			</flexbox>-->
			<!-- 列表标签页 -->
			<center style="margin-top: 10px;margin-bottom: 20px;">
				<button :style="'width: 140px;height:40px;background-image: url('+(BtnColor==0?bt1a:bt1b)+'); background-size:100%; background-position:50% 50%;background-repeat: no-repeat;border: 0px;'"
				 @click="BtnColor=0"></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button :style="'width: 140px;height:40px;background-image: url('+(BtnColor==1?bt2a:bt2b)+'); background-size:100%; background-position:50% 50%;background-repeat: no-repeat;border: 0px;'"
				 @click="BtnColor=1"></button>
			</center>
			<!-- <van-button @click='loadingCommodity=loadingCommodity==true?false:true'>显示/隐藏骨架屏</van-button> -->
			<!-- 骨架屏（获得列表数据前展示） -->
			<van-row v-if="loadingCommodity" v-for="item in 2" style="background-color: white;">
				<van-col span="12">
					<van-skeleton avatar :row="1" style="margin-top: 20px;" :row-width="0" avatar-size="160" avatar-shape="square" />
					<van-skeleton :row="BtnColor==0?2:3" :row-width="BtnColor==0?['50%','90%']:['50%','90%','80%']" style="margin-top: 5px;" />
				</van-col>
				<van-col span="12">
					<van-skeleton avatar :row="1" style="margin-top: 20px;" :row-width="0" avatar-size="160" avatar-shape="square" />
					<van-skeleton :row="BtnColor==0?2:3" :row-width="BtnColor==0?['50%','90%']:['50%','90%','80%']" style="margin-top: 5px;" />
				</van-col>
			</van-row>
			<!-- 列表数据 -->
			<!-- 无限滚动（滚动加载） -->
			<yd-infinitescroll :callback="loadList" ref="infinitescroll" v-if="!loadingCommodity">
				<div slot="list" style="overflow-x: hidden;">
					<!-- 【我要卖】列表 -->
					<van-row style="margin-top: 10px;" v-for="item in sellList" v-show="BtnColor==0">
						<router-link v-for="item2 in item" :to="{
							path:'/details',
							query:{
								type:'sell',
								id:item2.id,
								state:0,
								isIndex:true
							}
						}">
							<van-col span="12" class="commodityDiv">
								<van-image :src="baseurl+'/file/readFile/'+item2.logo" class="commodity" lazy-load>
									<template v-slot:loading>
										<van-loading type="spinner" size="20" />
									</template>
								</van-image>
								<img :src="moreP" class="commodityTag" />
								<div class="commodityInfo">
									<strong class="commodityTitle">
										<br />{{item2.goodsName}}
									</strong><br />
									<span :class="BtnColor==0?'moreSpan':''">
										<font color="red">¥<font size="4">&nbsp;{{item2.unitPrice.split('元/')[0]}}</font>
										</font>&nbsp;/&nbsp;{{item2.unitPrice.split('元/')[1]}}
									</span>
									<!--<van-tag color="#f2826a" plain style="margin-left: 10px;top: -5px;">自营</van-tag>-->
									<img :src="phoneImg" class="phone1" />
									<span class='moreSpan'>产自{{item2.productArea}}</span><br />
								</div>
							</van-col>
						</router-link>
					</van-row>
					<!-- 【我要买】列表 -->
					<van-row style="margin-top: 10px;" v-for="item in purchaseList" v-show="BtnColor==1">
						<router-link v-for="item2 in item" :to="{
							path:'/details',
							query:{
								type:'purchase',
								id:item2.id,
								state:0,
								isIndex:true
							}
						}">
							<van-col span="12" class="commodityDiv">
								<van-image :src="baseurl+'/file/readFile/'+item2.logo" class="commodity" lazy-load>
									<template v-slot:loading>
										<van-loading type="spinner" size="20" />
									</template>
								</van-image>
								<img :src="moreP" class="commodityTag" />
								<div class="commodityInfo">
									<strong class="commodityTitle">
										<br />{{item2.goodsName}}
									</strong><br />
									<span>价位：<font color="red">¥{{item2.heartPrice.split('元/')[0]}}</font>&nbsp;/&nbsp;{{item2.heartPrice.split('元/')[1]}}</span>
									<span style="display: block; width: 80%;">规格：{{item2.buyNorms}}</span>
									<span>{{item2.createTime}}</span>
									<img :src="phoneImg" class="phone2" />
								</div>
							</van-col>
						</router-link>
					</van-row>
				</div>
			</yd-infinitescroll>
		</van-pull-refresh>
		<!-- 底部导航 -->
		<Footer :loadingCommodity="loadingCommodity" />
		<!-- 返回顶部 -->
		<!-- <yd-backtop /> -->
		<transition name="van-fade">
			<img :src="toLiveImg" v-show="showLive" class="toLiveImg" @click="$router.push('/live')" />
		</transition>
	</div>
</template>

<script>
	import Footer from "@com/footer"
	export default {
		components: {
			Footer
		},
		data() {
			return {
				baseurl: window.baseurl,
				bannerList: [],
				liveList: [], //直播列表（最多2个）
				noLiveImg: require('@/assets/img/20190806101347.png'),
				bgImg: require('@/assets/img/qt_24.png'),
				phoneImg: require('@/assets/img/20190708162539.png'),
				search: '',
				city:'',
				bt1a: require('@/assets/img/20190806104724.png'),
				bt1b: require('@/assets/img/20190806104731.png'),
				bt2a: require('@/assets/img/20190806104703.png'),
				bt2b: require('@/assets/img/20190806104739.png'),
				moreP: require('@/assets/img/20190619095938.png'),
				liveImg: require('@/assets/img/live.png'),
				headImg2: this.$store.state.user.id ? require('@/assets/img/20190709165431.png') : require(
					'@/assets/img/20190709164736.png'),
				headImg: window.baseurl + '/file/readFile/' + this.$store.state.user.headImage,
				liveTag: require('@/assets/img/20190619095923.png'),
				liveTag2: require('@/assets/img/20190619095851.png'),
				BtnColor: 0,
				loadingCommodity: true, //是否显示骨架屏
				sellList: [],
				sellList2: [], //序列化之后的列表
				purchaseList: [],
				purchaseList2: [], //序列化之后的列表
				listIndex1: 1, //我要卖分页，默认第一页
				listIndex2: 1, //我要买分页，默认第一页
				toLiveImg:require('@/assets/img/20190806110233.png'),
				showLive:true
			}
		},
		methods: {
			onRefresh() {
				let that = this;
				this.$store.commit("setShowView", false);
				this.$nextTick(function() {
					this.$store.commit("setIsLoading", false);
					this.$store.commit("setShowView", true);
					let user = that.$store.state.user;
					if (that.$store.state.user.id) {
						//重新获取头像
						this.$axios.post('/appServiceUser/homepageDetail', this.$qs.stringify({
								userId: that.$store.state.user.id
							}))
							.then(res => {
								user.headImage = res.data.info.headImage;
								that.$store.commit("setUser", user);
							})
					}
				})
			},
			init() {
				//请求banner列表
				this.$axios.post('/appBanner/bannerList')
					.then(res => {
						if (res.data.code == 100) {
							this.bannerList = res.data.info;
						}
						//请求我要卖列表
						return this.reqSell();
					})
					.then(res => {
						//请求我要买列表
						return this.reqPurchase();
					})
					.then(res => {
						//请求直播列表
						return this.$axios.post('/appServiceLive/liveList', this.$qs.stringify({
							pageNum: 1, //第一页
							pageSize: 2, //2条数据
						}))
					})
					.then(res => {
						if (res.data.code == 100) {
							let rows = res.data.info.rows;
							for (let i = 0; i <= res.data.info.rows.length - 1; i++) {
								rows[i].coverImage = this.baseurl + '/file/readFile/' + rows[i].coverImage;
							}
							this.liveList.push(...rows);
						}
						for (let i = 0; i <= 1 - res.data.info.rows.length; i++) {
							this.liveList.push({
								noLive: true, //自定义属性，代表是添加的“无直播图片”
								coverImage: this.noLiveImg,
								headImage: "",
								liveId: 0,
								liveTitle: "",
								liveUsers: 0,
								nickname: ""
							})
						}
					})
			},
			//请求我要卖列表
			reqSell() {
				return this.$axios.post('/appServiceSellGoods/list', this.$qs.stringify({
						pageNum: this.listIndex1,
						pageSize: 10,
					}))
					.then(res => {
						if (res.data.code == 100) {
							let total = res.data.info.total;
							let rows = res.data.info.rows;
							let arr = [];
							for (let key in this.sellList) {
								for (let key2 in this.sellList[key]) {
									total += 1;
									arr.push(this.sellList[key][key2]);
								}
							}
							arr.push(...rows);
							this.sellList.splice(0, this.sellList.length);
							if (total % 2 == 0) {
								for (let i = 0; i < (total - 1); i += 2) {
									this.sellList.push([arr[i], arr[i + 1]])
								}
							} else {
								for (let i = 0; i < (total - 2); i += 2) {
									this.sellList.push([arr[i], arr[i + 1]])
								}
								this.sellList.push([arr[total - 1]])
							}
							this.loadingCommodity = false;
						}
						//让下面的then链可以继续用res
						return Promise.resolve(res)
					})
			},
			//请求我要买列表
			reqPurchase() {
				return this.$axios.post('/appServiceBuyGoods/list', this.$qs.stringify({
						pageNum: this.listIndex2,
						pageSize: 10,
					}))
					.then(res => {
						if (res.data.code == 100) {
							let total = res.data.info.total;
							let rows = res.data.info.rows;
							let arr = [];
							for (let key in this.purchaseList) {
								for (let key2 in this.purchaseList[key]) {
									total += 1;
									arr.push(this.purchaseList[key][key2]);
								}
							}
							arr.push(...rows);
							this.purchaseList.splice(0, this.purchaseList.length);
							if (total % 2 == 0) {
								for (let i = 0; i < (total - 1); i += 2) {
									this.purchaseList.push([arr[i], arr[i + 1]])
								}
							} else {
								for (let i = 0; i < (total - 2); i += 2) {
									this.purchaseList.push([arr[i], arr[i + 1]])
								}
								this.purchaseList.push([arr[total - 1]])
							}
							this.loadingCommodity = false;
						}
						//让下面的then链可以继续用res
						return Promise.resolve(res)
					})
			},
			openUrl(url) {
				window.location.href = url;
			},
			liveRoom(noLive, liveId, nickname, liveUsers, headImage, channel, token) {
				if (!noLive) {
					this.$router.push('/liveDetails2?liveId=' + liveId + '&liveUsers=' + liveUsers + '&nickname=' + nickname +
						'&headImage=' + headImage)
				}
			},
			loadList() {
				let that = this;
				if (this.BtnColor == 0) {
					this.listIndex1 += 1;
					this.reqSell()
						.then(res => {
							if (res.data.code == 100) {
								if (res.data.info.total > 0) {
									//加载完毕
									that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
								} else {
									//没有更多数据
									this.listIndex1 -= 1;
									that.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
								}
							}
						})
				} else {
					this.listIndex2 += 1;
					this.reqPurchase()
						.then(res => {
							if (res.data.code == 100) {
								if (res.data.info.total > 0) {
									//加载完毕
									that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
								} else {
									//没有更多数据
									this.listIndex2 -= 1;
									that.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
								}
							}
						})
				}
			}
		},
		created() {
			this.init();
		},
		mounted() {
			let that = this;
			let getIpscript = document.createElement('script');
			//请求搜狐IP地址查询接口（动态创建script，返回数据类似【var returnCitySN = {"cip": "117.152.197.100", "cid": "CN", "cname": "CHINA"};】）
			getIpscript.src = 'http://pv.sohu.com/cityjson';
			document.body.appendChild(getIpscript);
			getIpscript.onload = function() {
				//获取ip
				let IP = returnCitySN.cip;
				//1.请求太平洋IP地址库API接口（动态创建script,jsonp的形式，jsonp需服务器支持，返回数据类似【if(window.testJson) {testJson({"ip":"117.152.197.100","pro":"湖北省","proCode":"420000","city":"","cityCode":"0","region":"","regionCode":"0","addr":"湖北省 移通","regionNames":"","err":"nocity"});}】）
				window.testJson = function(data){
					if(data.city){
						that.city = data.city;
					}
				}
				let getAddressscript = document.createElement('script');
				getAddressscript.src = 'http://whois.pconline.com.cn/ipJson.jsp?callback=testJson&ip=' + IP;//'http://ip.taobao.com/service/getIpInfo.php?ip=' + IP
				document.body.appendChild(getAddressscript);
			}
			//监测滑动事件
			document.addEventListener("touchmove", function(e){
				that.showLive = false;
			}, false);
			//监测手指离开屏幕
			document.addEventListener("touchend", function(e) {
				that.showLive = true;
			}, false);
		}
	}
</script>
<style lang="less">
	.commodity {
		img {
			border-top-left-radius: 25px;
			border-top-right-radius: 25px;
		}
	}
</style>
<style>
	/*hack “vant”ui框架（首页的搜索框）的颜色设置*/
	#search .van-search {
		opacity: 0.5;
		background-color: transparent !important;
		color: white !important;
	}

	.headPortrait {
		margin-top: -20px;
		display: inline-block;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: solid white 5px;
		box-sizing: border-box;
		background-size: cover;
		background-position: center center;
	}

	#search .vux-header-title-area {
		width: 550px !important;
		/*hack的这个宽度值过长会导致首页莫名有滚动条*/
	}

	.commodity {
		width: 95%;
		height: 350px;
		border-radius: 0.333333rem 0.333333rem 0 0;
		/*no*/
		margin-left: 10px;
		margin-right: 10px;
		border-style: solid;
		border-width: 2px;
		border-color: lightgray;
	}

	.commodityDiv {
		position: relative;
	}

	.commodityTag {
		margin-left: 30px;
		position: absolute;
		top: 330px;
		height: 32px;
	}

	.commodityInfo {
		background-color: white;
		margin-top: -10px;
		margin-left: 10px;
		margin-right: 10px;
		padding: 5px 6px 5px 15px;
	}

	.phone1 {
		height: 45px !important;
		width: 53px !important;
		line-height: 20px !important;
		font-size: 70px !important;
		position: absolute !important;
		right: 30px !important;
		bottom: 60px !important;
	}

	.phone2 {
		height: 45px !important;
		width: 53px !important;
		line-height: 20px !important;
		font-size: 70px !important;
		position: absolute !important;
		right: 30px !important;
		bottom: 33px !important;
	}

	.commodityTitle {
		font-size: 30px;
		color: black;
	}

	.commodityInfo span {
		font-size: 27px;
		color: gray;
		/* width: 80%; */
		/*超出一行就加上省略号*/
		display: -webkit-box !important;
		-webkit-line-clamp: 1;
		overflow: hidden;
		-webkit-box-orient: vertical;
	}

	.commodityInfo strong {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		max-width: 100%;
	}

	/*显示骨架屏用来衬托背景色的，用白色衬托*/
	.seat {
		background-color: white !important
	}

	.moreSpan {
		width: 80% !important;
	}

	.liveTitle {
		position: absolute;
		bottom: 8px;
		color: white;
		left: 8px;
		font-size: 25px;
		background-color: rgba(25, 24, 24, 0.5294117647058824);
		border-radius: 15px;
		padding: 3px 7px;
		-webkit-line-clamp: 1;
		overflow: hidden;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	.toLiveImg{
		display: block;
		width: 144px;
		height: 144px;
		z-index: 100;
		bottom: 105px;
		right: 36px;
		position: fixed;
	}
</style>
