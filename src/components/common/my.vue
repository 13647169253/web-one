<template>
	<div id="myPurchase">
		<MyHeader :title="$route.query.type=='purchase'?'我的采购':'我的出售'" />
		<!-- 无限滚动（滚动加载） -->
		<yd-infinitescroll :callback="loadList" ref="infinitescroll">
			<div slot="list"><van-pull-refresh v-model="$store.state.isLoading" @refresh="onRefresh">
				<!--loading提示-->
				<center style="top:50%;left:50%;position:absolute;" v-show="loading">
					<x-spinner type="lines" size="40px"></x-spinner>
				</center>
				<van-tabs class="tabBox" v-model="active">
					<van-tab :title="item" v-for="item in titles">
						<router-link v-for="item in list[active]" :to="{
							path:'/details',
							query:{
								type:$route.query.type,
								id:item.id,
								state:active//是否结束，0是未结束，1是已结束
							}
							}">
							<div v-if="$route.query.type == 'purchase'" class="list van-hairline--bottom" v-show="!loading">
								<div class="listImg" :style="'background: url('+baseurl + '/file/readFile/'+item.logo+') no-repeat;'">
									<van-image v-show="active==1" class="tag" :src="tagImg" />
								</div>
								<div class="listDiv">
									<strong>{{item.goodsName}}</strong>
									<span class="span1">采购价位：<font color="red">¥{{item.heartPrice.split('元/')[0]}}</font>&nbsp;/{{item.heartPrice.split('元/')[1]}}&nbsp;&nbsp;采购规格：{{item.buyNorms}}</span>
									<span class="span2">{{item.createTime}}</span>
								</div>
							</div>
							<div v-if="$route.query.type == 'sell'" class="list van-hairline--bottom" v-show="!loading">
								<div class="listImg" :style="'background: url('+baseurl + '/file/readFile/'+item.logo+') no-repeat;'">
									<van-image v-show="active==1" class="tag" :src="tagImg" />
								</div>
								<div class="listDiv">
									<strong>{{item.goodsName}}</strong>
									<span class="span1"><font color="red">¥{{item.unitPrice.split('元/')[0]}}</font>/{{item.unitPrice.split('元/')[1]}}&nbsp;&nbsp;起订量：{{item.minimumOrder}}</span>
									<span class="span2">{{item.createTime}}</span>
								</div>
							</div>
						</router-link>
					</van-tab>
				</van-tabs></van-pull-refresh>
			</div>
		</yd-infinitescroll>
		
		<div class="submitDiv"></div>
		<van-button @click="$router.push($route.query.type == 'purchase' ?'/purchase':'/sell')" size="large" square :style="'background-image: url('+btBgImg+');'"
		 class="submitBtn">发布</van-button>
		 <yd-backtop />
	</div>
</template>

<script>
	import MyHeader from "@com/header"
	export default {
		components: {
			MyHeader
		},
		data() {
			return {
				loading: true,
				baseurl: window.baseurl,
				titles: this.$route.query.type == 'purchase' ? ['采购中', '已结束'] : ['出售中', '已下架'],
				tipImg: require('@/assets/img/qt_03.png'),
				active: 0,
				btBgImg: require('@/assets/img/20190619120234.png'),
				tagImg: this.$route.query.type == 'purchase' ? require('@/assets/img/20190620175913.png') : require(
					'@/assets/img/20190624093503.png'),
				url: this.$route.query.type == 'purchase' ? '/appServiceBuyGoods/ownList' : '/appServiceSellGoods/ownList',
				pageNum: [1, 1],
				list: [
					[],
					[]
				]
			}
		},
		created() {
			let that = this;
			this.load(0)
				.then(res => {
					return this.load(1);
				})
				.then(res => {
					that.loading = false;
				})
				.catch(err => {
					that.loading = false;
				})
		},
		methods: {
			onRefresh(){
				this.$store.commit("setShowView",false);
				this.$nextTick(function(){
					this.$store.commit("setIsLoading",false);
					this.$store.commit("setShowView",true);
				})
			},
			load(index) {
				let that = this;
				return this.$axios.post(that.url, this.$qs.stringify({
						pageNum: that.pageNum[that.active],
						pageSize: 10,
						status: index ? index + 1 : that.active + 1
					}))
					.then(res => {
						if (res.data.code == 100) {
							that.list[index || that.active].push(...res.data.info.rows);
						}
						//让下面的then链可以继续用res
						return Promise.resolve(res)
					})
			},
			loadList() {
				let that = this;
				this.pageNum[that.active] += 1;
				this.load()
					.then(res => {
						if (res.data.code == 100) {
							if (res.data.info.total > 0) {
								//加载完毕
								that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
							} else {
								//没有更多数据
								that.pageNum[that.active] -= 1;
								that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
							}
						}
					})
			}
		}
	}
</script>

<style lang="less">
	#myPurchase .list {
		height: 232px;
		float: left;
		.listImg {
			float: left;
			height: 144px;
			width: 144px;
			background-size: cover !important;
			background-position: 50% 50% !important;
			border-radius: 15px;
			margin: 43px 27px 43px 27px;
			img{
				border-radius: 15px;
			}
		}

		.listDiv {
			max-width: 500px;
			min-width: 500px;
			float: left;
			margin: 49px 0 49px 0;
			span {
				color: gray;
				font-size: 30px;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				overflow: hidden;
				-webkit-box-orient: vertical;
				&.span1{
					margin-top: 10px;
					margin-bottom: 5px;
				}
				&.span2{
					display:block;
				}
			}
			strong {
				display: -webkit-box!important;
				-webkit-line-clamp: 1;
				overflow: hidden;
				-webkit-box-orient: vertical;
				font-size: 30px;
				color: #000000;display:block;
			}
		}
	}

	.submitDiv {
		height: 100px;
	}

	.submitBtn {
		height: 100px;
		position: fixed!important;
		bottom: 0!important;
		left: 0!important;
		background-size: cover;
		background-position: 50% 50%;
		color: white!important;
	}

	.tabBox .tag {
		width: 62px;
		height: 68px;
	}
</style>
