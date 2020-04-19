<template>
	<div>
		<MyHeader title="农户直播" />
		<van-pull-refresh v-model="$store.state.isLoading" @refresh="onRefresh">
		<!-- 无限滚动（滚动加载） -->
		<yd-infinitescroll :callback="loadList" ref="infinitescroll">
			<div slot="list">
				<!--loading提示-->
				<center style="top:50%;left:50%;position:absolute;" v-show="loading && active !=0">
					<x-spinner type="lines" size="40px"></x-spinner>
				</center>
				<van-tabs class="tabBox" v-model="active">
					<van-tab :title="item" v-for="item in titles">
						<center v-show="active==0">
							<van-button square :style="'background-image: url('+btBgImg+');color:white;'" class="liveBtn" @click="startLive">开直播</van-button>
						</center>
						<van-row v-for="item in liveList" v-show="active==1 && !loading">
							<van-col span="12" v-for="(item2,index) in item">
								<div @click="$router.push('/liveDetails2?liveId='+item2.liveId+'&liveUsers='+item2.liveUsers+'&nickname='+item2.nickname+'&headImage='+item2.headImage)" :style="'background-image: url('+baseurl+'/file/readFile/'+item2.coverImage+'); background-size:cover; background-position:50% 50%;height:160px;background-color:#000000;margin:'+(index==0?'5px 5px 5px 10px':'5px 10px 5px 5px')+';border-radius: 10px;position:relative'">
									<div style="position:absolute;background-color: #5E5E5E;height: 18px;top: 10px;color: white;right: 5px;padding:0 5px 0 5px;border-radius: 15px;">
										<img :src="liveTag" style="position:absolute;height: 19px;left: -25px;top: -1px;" />&nbsp;&nbsp;&nbsp;{{item2.liveUsers}}观看&nbsp;
									</div>
									<strong class="liveTitle">{{item2.liveTitle}}</strong>
									<!-- <div style="position:absolute;right: 5px;bottom: 5px;">
										<img :src="liveTag2" style='height: 13px;margin-bottom: -3px;' />
										<span style="color: white;bottom: 5px;">111100</span>
									</div> -->
								</div>
							</van-col>
						</van-row>
						<van-row v-for="item in videoList" v-show="active==2 && !loading">
							<van-col span="12" v-for="(item2,index) in item">
								<div @click="$router.push({name:'video',params:item2})" :style="'background-image: url('+baseurl+'/file/readFile/'+item2.previewPicture+'); background-size:cover; background-position:50% 50%;height:160px;background-color:#000000;margin:'+(index==0?'5px 5px 5px 10px':'5px 10px 5px 5px')+';border-radius: 10px;position:relative'">
									<div style="position:absolute;background-color: #5E5E5E;height: 18px;top: 10px;color: white;right: 5px;padding:0 5px 0 5px;border-radius: 15px;">
										<img :src="liveTag3" style="position:absolute;height: 19px;left: -25px;top: -1px;" />&nbsp;&nbsp;&nbsp;{{item2.pageviews}}观看&nbsp;
									</div>
									<span style="position:absolute;bottom: 5px;color: white;left:5px ;">{{item2.videoTitle}}</span>
									<div style="position:absolute;right: 5px;bottom: 5px;">
										<img :src="liveTag2" style='height: 13px;margin-bottom: -3px;' />
										<span style="color: white;bottom: 5px;">{{item2.praisePoints}}</span>
									</div>
								</div>
							</van-col>
						</van-row>
					</van-tab>
				</van-tabs>
			</div>
		</yd-infinitescroll>
		</van-pull-refresh>
		<x-dialog v-model="notClose" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
			<center>
				<div class="tips" @click="notClose = false">
					<van-image class="dialogImg" :src="dialogImg" /><br />
					<strong>实名认证</strong><br />
					<span class="span2">直播享有传播权利，认证信息更有效</span>
					<van-button @click="notClose = false;$router.push('/liveagament')" size="large" square :style="'background-image: url('+btBgImg+');'"
					 class="submitBtn2"><span class="span">前往认证</span></van-button>
				</div>
			</center>
			<br><br><br>
			<x-icon @click="notClose = false;" type="ios-close-outline" size="46px" style="fill:white;"></x-icon>
		</x-dialog>
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
				loading:true,
				baseurl: window.baseurl,
				isLived: false,
				notClose: false,
				active: this.$route.query.index ? this.$route.query.index : 0,
				titles: ['发布直播', '农户直播', '农户视频'],
				btBgImg: require('@/assets/img/btnBc.png'),
				liveTag: require('@/assets/img/20190619095923.png'),
				liveTag2: require('@/assets/img/20190619095851.png'),
				liveTag3: require('@/assets/img/20190625093254.png'),
				dialogImg: require('@/assets/img/qt_02.png'),
				pageNum: [1, 1], //第几页
				liveList: [],
				videoList:[]
			}
		},
		created() {
			let that = this;
			this.loadLiveList(0)
			.then(res => {
				return this.loadVideoList(1)
			})
			.then(res => {
				this.loading = false;
			})
			.catch(err => {
				this.loading = false;
			})
		},
		methods: {
			onRefresh() {
				this.$store.commit("setShowView", false);
				this.$nextTick(function() {
					this.$store.commit("setIsLoading", false);
					this.$store.commit("setShowView", true);
				})
			},
			//请求直播列表
			loadLiveList(index) {
				let that = this;
				return this.$axios.post('/appServiceLive/liveList', this.$qs.stringify({
						pageNum: index || that.pageNum[that.active - 1],
						pageSize: 10,
					}))
					.then(res => {
						if (res.data.code == 100) {
							let total = res.data.info.total;
							let rows = res.data.info.rows;
							let arr = [];
							for(let key in this.liveList){
								for(let key2 in this.liveList[key]){
									total += 1;
									arr.push(this.liveList[key][key2]);
								}
							}
							arr.push(...rows);
							this.liveList.splice(0,this.liveList.length);
							if (total % 2 == 0) {
								for (let i = 0; i < (total - 1); i += 2) {
									this.liveList.push([arr[i], arr[i + 1]])
								}
							} else {
								for (let i = 0; i < (total - 2); i += 2) {
									this.liveList.push([arr[i], arr[i + 1]])
								}
								this.liveList.push([arr[total - 1]])
							}
						}
						//让下面的then链可以继续用res
						return Promise.resolve(res)
					})
			},
			//请求视频列表
			loadVideoList(index) {
				let that = this;
				return this.$axios.post('/appServiceVedio/list', this.$qs.stringify({
						pageNum: index || that.pageNum[that.active - 1],
						pageSize: 10,
					}))
					.then(res => {
						if (res.data.code == 100) {
							let total = res.data.info.total;
							let rows = res.data.info.rows;
							let arr = [];
							for(let key in this.videoList){
								for(let key2 in this.videoList[key]){
									total += 1;
									arr.push(this.videoList[key][key2]);
								}
							}
							arr.push(...rows);
							this.videoList.splice(0,this.videoList.length);
							if (total % 2 == 0) {
								for (let i = 0; i < (total - 1); i += 2) {
									this.videoList.push([arr[i], arr[i + 1]])
								}
							} else {
								for (let i = 0; i < (total - 2); i += 2) {
									this.videoList.push([arr[i], arr[i + 1]])
								}
								this.videoList.push([arr[total - 1]])
							}
						}
						//让下面的then链可以继续用res
						return Promise.resolve(res)
					})
			},
			loadList() {
				let that = this;
				this.pageNum[that.active - 1] += 1;
				that.active==0?this.loadLiveList():this.loadVideoList()
					.then(res => {
						if (res.data.code == 100) {
							if (res.data.info.total > 0) {
								//加载完毕
								that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
							} else {
								//没有更多数据
								that.pageNum[that.active - 1] -= 1;
								that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
							}
						}
					})
			},
			//开始直播
			startLive() {
				//查询是否直播过
				this.$axios.post('/appServiceLive/isLived')
				.then(res => {
					if (res.data.code == 100) {
						if (res.data.info.isLived == 1) {
							this.isLived = true;
						}
						if (this.isLived) {
							this.$router.push('/startlive')
						} else {
							this.notClose = true;
						}
					}else if (res.data.code == 250 && res.data.msg=='您已被禁止直播"'){
						//您已被禁止直播
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.liveTitle {
		position: absolute;
		bottom: 8px;
		color: white;
		left: 8px;
		font-size: 20px;
		background: #19181887;
		border-radius: 10px;
		padding: 3px 7px;
		-webkit-line-clamp: 1;
		overflow: hidden;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
	
	.liveBtn {
		height: 100px;
		width: 702px;
		margin-top: 70px;
		border-radius: 15px;
		background-size: cover;
		background-position: 50% 50%;
	}

	.tips {
		border-radius: 10px;
		color: #000000;
		background-color: white;
		height: 500px;
		width: 591px;

		strong {
			font-size: 35px;
		}

		.span {
			font-weight: bold;
			font-size: 40px;
		}

		.span2 {
			color: gray;
			font-size: 30px;
		}

		.dialogImg {
			margin-top: 79px;
			width: 160px;
			height: 160px;
		}

		.submitBtn2 {
			height: 100px;
			margin-top: 80px;
			background-size: cover;
			background-position: 50% 50%;
			color: white;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
		}
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
</style>
