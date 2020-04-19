<template>
	<div>
		<div class="wall" :style="'background: url('+(backgroundImage.split('file/readFile/')[1]?backgroundImage:bgImg)+');'">
			<van-image @click="$router.go(-1)" class="back" :src="backImg" />
			<!-- <van-icon class="back" size="25px" name="arrow-left" @click="$router.go(-1)" /> -->
			<van-image
				@click="follow"
				class="likeImg"
			  :src="isFollow==1?like2:like1"
			/>
			<button v-if="isLive==1" class="bt" :style="'background-image: url('+liveOnLine+');'">直播中</button>
			<van-tag class="mytag" mark><span class="tagc">发布数&nbsp;{{count}}&nbsp;件</span></van-tag>
			<div class="info">
				<van-image
					class="infoImg"
				  :src="headImage?baseurl + '/file/readFile/' +headImage:headImg2"
				/>
				<div class="font">
					<font class="strong">{{nickname}}</font><br style="clear: both;" />
					<div style="float: left;">
						<img :src="phoneImg" class="phoneImg" /><span class="wechatText">&nbsp;{{contactPhone}}</span>
						<!-- <van-icon class="phone" name="phone" /><font class="span">{{contactPhone}}</font> -->
					</div>
					<font style="float: left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
					<div style="float: left;">
					<img :src="wechatImg" class="phoneImg2" /><span class="wechatText">&nbsp;{{wexNo}}</span>
					<!-- <i class="fa fa-weixin wechat" aria-hidden="true"></i>&nbsp;{{wexNo}}</font> -->
					</div>
				</div>
			</div>
			<div class="text">
				地址:{{address}}
			</div>
			<div class="bottomText">
				主营产品:{{mainProduct}}
			</div>
		</div>
		<!-- 无限滚动（滚动加载） -->
		<yd-infinitescroll :callback="loadList" ref="infinitescroll">
			<div slot="list">
				<van-tabs class="tabBox" v-model="active" style="overflow-x: hidden;">
					<van-tab :title="item" v-for="(item,index) in titles">
						<router-link v-show="active==0" v-for="(item,index) in list[active]" :to="{
							path:'/details',
							query:{
								type:'sell',
								id:item.id,
								state:0,
								isIndex:true
							}
						}">
						<div v-if="index !=0" class="splitDiv2"></div>
						<div class="main van-hairline--bottom">
							<span class='time'>
								发表于{{item.createTime}}
							</span>
							<div class="tip">
								<van-image class="sell"
								  :src="sellImg"
								/>
								<span class='num'><font color="red">¥<font size="4">{{item.unitPrice1}}</font></font>&nbsp;/&nbsp;{{item.unitPrice2}}</span>
								<!--<span class='num'><font color="red">¥<font size="4">{{item.unitPrice.split('元/')[0]}}</font></font>&nbsp;/&nbsp;{{item.unitPrice.split('元/')[1]}}</span>-->
							</div>
							<div class='imgs'>
							  <van-image class="img" v-for="item2 in item.banners"
								:src="baseurl + '/file/readFile/' +item2"
							  />
							</div>
							<span class='text'>{{item.goodsExplain}}</span>
						</div>
						</router-link>
						<router-link v-show="active==1" v-for="(item,index) in list[active]" :to="{
							path:'/details',
							query:{
								type:'purchase',
								id:item.id,
								state:0,
								isIndex:true
							}
						}">
						<div v-if="index !=0" class="splitDiv2"></div>
						<div class="main van-hairline--bottom">
							<span class='time'>
								发表于{{item.createTime}}
							</span>
							<div class="tip">
								<van-image class="sell"
								  :src="purchaseImg"
								/>
								<span class='num'><font color="red">¥<font size="4">{{item.heartPrice1}}</font></font>&nbsp;/&nbsp;{{item.heartPrice2}}</span>
								<!--<span class='num'><font color="red">¥<font size="4">{{item.heartPrice.split('元/')[0]}}</font></font>&nbsp;/&nbsp;{{item.heartPrice.split('元/')[1]}}</span>-->
							</div>
							<div class='imgs'>
							  <van-image class="img" v-for="item2 in item.banners"
								:src="baseurl + '/file/readFile/' +item2"
							  />
							</div>
							<span class='text'>采购名称：{{item.goodsName}}&nbsp;|&nbsp;采购数量：{{item.buyNumber}}{{item.heartPrice2}}</span>
						</div>
						</router-link>
						<div v-show="active==2">
							<van-row v-for="(item,index) in list[active]">
							  <van-col class="imgs2" span="8" v-for="item2 in item">
								  <van-image @click="$router.push({name:'video',params:item2})" class="img2"
									:src="baseurl + '/file/readFile/' +item2.previewPicture"
								  />
								  <van-icon name="like-o" class="iconImg" />
								  <span class="num">{{item2.praisePoints}}</span>
							  </van-col>
							</van-row>
						</div>
					</van-tab>
				</van-tabs>
			</div>
		</yd-infinitescroll>
		<!-- <div class="bottom">
			<span>暂无更多</span>
		</div> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				baseurl:window.baseurl,
				headImage:'',
				nickname:'',
				contactPhone:'',
				wexNo:'',
				mainProduct:'',
				count:'',
				isLive:'',
				address:'',
				isFollow:1,
				like1:require('@/assets/img/like.png'),
				like2:require('@/assets/img/like2.png'),
				phoneImg: require('@/assets/img/20190711172853.png'),
				wechatImg: require('@/assets/img/20190711172901.png'),
				backgroundImage:'',
				backImg: require('@/assets/img/20190620151549.png'),
				bgImg:require('@/assets/img/20190624143227.png'),
				headImg2: require('@/assets/img/20190709165431.png'),
				liveOnLine:require('@/assets/img/20190624143234.png'),
				active:0,
				titles:['出售动态','采购动态','视频动态'],
				sellImg:require('@/assets/img/out.png'),
				purchaseImg:require('@/assets/img/buy.png'),
				pageNum:[1,1,1],
				list:[[],[],[]]
			}
		},
		created(){
			this.$axios.post('/appServiceUser/isFollow', this.$qs.stringify({
				userId:this.$route.query.id
			}))
			.then(res => {
				if (res.data.code == 100) {
					this.isFollow = res.data.info;
				}
				return this.$axios.post('/appServiceUser/homepageDetail', this.$qs.stringify({
					userId:this.$route.query.id
				}))
			})
			.then(res => {
				if (res.data.code == 100) {
					this.headImage = res.data.info.headImage;
					this.nickname = res.data.info.pageName;
					this.contactPhone = res.data.info.contactPhone;
					this.wexNo = res.data.info.wexNo;
					this.mainProduct = res.data.info.mainProduct;
					this.isLive = res.data.info.isLive;
					this.address = res.data.info.address;
					this.backgroundImage = this.baseurl + '/file/readFile/' +res.data.info.backgroundImage;
				}
				return this.$axios.post('/appServiceUser/count', this.$qs.stringify({
					userId:this.$route.query.id
				}))
			})
			.then(res => {
				if (res.data.code == 100) {
					this.count = res.data.info;
				}
				return this.getSellList(0)
			})
			.then(res => {
				return this.getPurchaseList(1)
			})
			.then(res => {
				return this.getVideoList(2)
			})
		},
		methods:{
			follow(){
				if(this.$route.query.id==this.$store.state.user.id){
					this.$toast('你不能关注自己哦！');
				}else{
					this.$axios.post(this.isFollow==1?'/appServiceUser/follow':'/appServiceUser/notFollow', this.$qs.stringify({
						userId:this.$route.query.id
					}))
					.then(res => {
						if (res.data.code == 100) {
							this.isFollow=this.isFollow==1?0:1;
							this.$toast.success(res.data.info);
						}
					})
				}
			},
			getSellList(index){
				return this.$axios.post('/appServiceUser/sellGoodsList', this.$qs.stringify({
					userId:this.$route.query.id,
					pageNum:this.pageNum[index || this.active],
					pageSize:10
				}))
				.then(res => {
					if (res.data.code == 100) {
						let rows = res.data.info.rows;
						for (let i = 0;i< rows.length;i ++) {
							let banners = [];
							for (let m = 0;m< rows[i].banners.split(',').length;m ++) {
								banners.push(rows[i].banners.split(',')[m]);
							}
							rows[i].banners = banners;
							rows[i].unitPrice1 = rows[i].unitPrice.split('元/')[0];
							rows[i].unitPrice2 = rows[i].unitPrice.split('元/')[1];
						}
						this.list[index || this.active].push(...rows);
					}
					//让下面的then链可以继续用res
					return Promise.resolve(res)
				})
			},
			getPurchaseList(index){
				return this.$axios.post('/appServiceUser/buyGoodsList', this.$qs.stringify({
					userId:this.$route.query.id,
					pageNum:this.pageNum[index || this.active],
					pageSize:10
				}))
				.then(res => {
					if (res.data.code == 100) {
						let rows = res.data.info.rows;
						for (let i = 0;i< rows.length;i ++) {
							let banners = [];
							for (let m = 0;m< rows[i].banners.split(',').length;m ++) {
								banners.push(rows[i].banners.split(',')[m]);
							}
							rows[i].banners = banners;
							rows[i].heartPrice1 = rows[i].heartPrice.split('元/')[0];
							rows[i].heartPrice2 = rows[i].heartPrice.split('元/')[1];
						}
						this.list[index || this.active].push(...rows);
					}
					//让下面的then链可以继续用res
					return Promise.resolve(res)
				})
			},
			getVideoList(index){
				return this.$axios.post('/appServiceUser/videoList', this.$qs.stringify({
					userId:this.$route.query.id,
					pageNum:this.pageNum[index || this.active],
					pageSize:10
				}))
				.then(res => {
					if (res.data.code == 100) {
						//this.list[index || this.active].push(...res.data.info.rows);
						let total = res.data.info.total;
						let rows = res.data.info.rows;
						let arr = [];
						for(let key in this.list[index || this.active]){
							for(let key2 in this.list[index || this.active][key]){
								total += 1;
								arr.push(this.list[index || this.active][key][key2]);
							}
						}
						arr.push(...rows);
						this.list[index || this.active].splice(0,this.list[index || this.active].length);
						if (total % 3 == 0) {
							for (let i = 0; i < (total - 1); i += 3) {
								this.list[index || this.active].push([arr[i], arr[i + 1], arr[i + 2]])
							}
						} else {
							for (let i = 0; i < (total - (total % 3)); i += 3) {
								this.list[index || this.active].push([arr[i], arr[i + 1], arr[i + 2]])
							}
							let tempArr = [];
							for (let i = total-total % 3; i < total; i ++) {
								tempArr.push(arr[i]);
							}
							this.list[index || this.active].push(tempArr)
						}
					}
					//让下面的then链可以继续用res
					return Promise.resolve(res)
				})
			},
			loadList(){
				let fun = null;
				this.pageNum[this.active]+=1;
				switch (this.active){
					case 0:
						fun = this.getSellList;
						break;
					case 1:
						fun = this.getPurchaseList;
						break;
					case 2:
						fun = this.getVideoList;
						break;
				}
				fun()
					.then(res => {
						if (res.data.code == 100) {
							if (res.data.info.total > 0) {
								//加载完毕
								this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
							} else {
								//没有更多数据
								this.pageNum[this.active] -= 1;
								this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
							}
						}
					})
			}
		}
	}
</script>

<style lang="less">
	.wall{
		position: relative;
		height: 427px;
		background-size:cover!important;
		color:white;
		.mytag{
			background-color: rgba(243, 243, 243, 0.27058823529411763)!important;
			transform: rotate(180deg);
			text-align: center;
			position: absolute;
			top: 311px;
			right: 0px;
			min-width: 242px;
			height: 60px;
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
			border-top-right-radius: 30px;
			border-bottom-right-radius: 30px;
			.tagc{
				transform: rotate(180deg);
				display: block;
				padding-bottom:8px;
				padding-left: 10px;
				padding-right: 10px;
				font-size: 30px;
				
			}
		}
		.back{
			// margin: 20px;
			position: absolute;
			width: 68px;
			height: 68px;
			top: 20px;
			left: 32px;
		}
		.info{
			position: absolute;
			top: 157px;
			height: 91px;
			.strong{
				float: left;
				font-size: 38px;
				margin-top: 32px;
			}
			.font{
				float: left;
				.phone{
					font-size: 35px;
					line-height: 40px;
					float: left;
				}
				.wechat{
					font-size: 30px;
					line-height: 45px;
					float: left;
				}
			}
			.infoImg{
				float: left;
				img{
					height: 90px;
					width: 90px;
					margin: 35px 27px 35px 27px;
					border-radius: 45px;
				}
			}
		}
		.text{
			font-size: 30px;
			clear: both;
			position: absolute;
			top: 300px;
			margin: 5px 0 0 36px;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			overflow: hidden;
			-webkit-box-orient: vertical;
			max-width: 60%;
		}
		.bottomText{
			font-size: 30px;
			clear: both;
			position: absolute;
			top: 340px;
			margin: 5px 0 0 36px;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			overflow: hidden;
			-webkit-box-orient: vertical;
			max-width: 60%;
		}
		.bt{
			position: absolute;
			width: 192px;
			height:64px;
			background-size:cover;
			background-position:50% 50%;
			background-repeat: no-repeat;
			border: 0px;
			border-radius: 45px;
			right: 27px;
			top: 90px;
			color: white;
		}
	}
	.tabBox{
		.splitDiv2 {
			margin-left: -25px !important;
			margin-right: -25px !important;
			height: 27px;
			background-color: #f6f5fa;
			margin-left: 0;
		}
		.main{
			span{
				font-size: 30px;
			}
			.splitDiv2{
				height: 30px;
				background-color: #f6f5fa;
			}
			min-height: 450px;
			overflow-x: hidden;
			position: relative;
			padding-left: 20px;
			padding-right: 22px;
			.time{
				position: absolute;
				top:53px;
				margin-left: 3px;
				color: gray;
			}
			.tip{
				position: absolute;
				top:43px;
				right: 26px;
				.sell{
					height: 35px;
					width: 68px;
				}
				.num{
					color: gray;
				}
			}
			 //！！！！这里子元素设置了滚动条。在父元素需要加上  style="overflow-x: hidden;" 否则这个子元素的宽度长到可以滚动时，此时整个屏幕的宽度会变长，导致往最右边滑动出现白色侧边。
			.imgs{
				position: absolute;
				top: 99px;
				margin-right: 26px;
				margin-top: 3px;
				white-space: nowrap;
				width: 100%;
				overflow-x: scroll;
				.img{
					width: 222px;
					height: 219px;
					margin-left: 10px;
					margin-right: 10px;
				}
			}
			.text{
				position: absolute;
				top: 341px;
				color: black;
				margin-left: 3px;
				font-size: 30px;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				overflow: hidden;
				-webkit-box-orient: vertical;
			}
		}
		.imgs2{
			position: relative;
			.img2{
				margin: 10px;
				height: 327px;
			}
			.iconImg{
				position: absolute;
				bottom: 28px;
				left: 21px;
				color: white;
			}
			.num{
				position: absolute;
				bottom: 21px;
				left: 55px;
				color: white;
			}
		}
	}
	.bottom{
		background-color: #f6f5fb;
		height: 180px;
		text-align: center;
		padding-top: 30px;
		span{
			color: #cccbd1;
		}
	}
	.phoneImg{
		width: 30px;
		height: 30px;
		vertical-align: sub;
	}
	.phoneImg2{
		width: 35px;
		height: 35px;
		vertical-align: middle;
	}
	.wechatText{
		font-size: 25px;
		line-height: 40px;
	}
	.likeImg{
		height: 52px;
		width: 52px;
		position: absolute!important;
		top: 25px;
		right: 40px;
	}
</style>
