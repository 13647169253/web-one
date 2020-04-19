
<template>
	<div id="video">
		<van-icon @click="$router.go(-1)" class="videoBack" name="arrow-left" />
		<!-- <div
			class="header"
			:style="''"
		/>
		<div class="text">
			<strong>{{$store.state.user.nickname}}</strong><br />
			<span>{{$route.params.videoTitle}}</span>
		</div> -->
		<!-- <van-icon class="videoMore" name="more-o" /> -->
		<van-image
			@click="commend"
			class="likeImg2"
		  :src="like"
		/>
		<div v-if="showHeart" class="heart"></div>
		<div class="likeNum"><center>{{praisePoints}}万</center></div>
		<video controls :src="baseurl+'/file/readFile/'+$route.params.videoAddress" :poster="baseurl+'/file/readFile/'+$route.params.previewPicture" class="video"></video>
		<!-- <div class="tool">
			播放控制项
		</div> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				baseurl: window.baseurl,
				like:require('@/assets/img/like.png'),
				praisePoints:0.00,
				showHeart:false
			}
		},
		created(){
			console.log(this.$route.params);
			this.detail();
		},
		methods:{
			commend(){
				let that = this;
				this.$axios.post('/appServiceVedio/vedioFabulous', this.$qs.stringify({
					id:this.$route.params.id
				}))
				.then(res => {
					if (res.data.code == 100) {
						this.showHeart = true;
						setTimeout(function(){
							that.showHeart = false;
							that.$toast.success(res.data.info);
							that.detail();
						},1000)
					}
				})
				.catch(res => {
					this.$toast.fail(res.data.info);
				})
			},
			detail(){
				this.$axios.post('/appServiceVedio/detail', this.$qs.stringify({
					id:this.$route.params.id
				}))
				.then(res => {
					if (res.data.code == 100) {
						console.log((res.data.info.praisePoints/10000).toFixed(2))
						this.praisePoints=(res.data.info.praisePoints/10000).toFixed(2);
					}
				})
			}
		}
	}
</script>

<style lang="less">
	#video{
		background-color: #000000;
		height: 100%;
		position: relative;
		overflow-y: hidden;
		.videoBack{
			position: absolute;
			font-size: 70px;
			margin: 34px 42px 0 30px;
			color: white;
			z-index:1!important;
		}
		.videoMore{
			position: absolute;
			color: white;
			font-size: 70px;
			right: 33px;
			top: 34px;
			z-index:1!important;
		}
		.video{
			position: absolute;
			right: 0px;
			top: 0px;
			background-color: black;
			// margin-top:119px;
			width: 100%;
			height:100%;// height: 839px;
			object-fit: fill;//让视频文件铺满video容器
		}
		.header{
			position: absolute;
			left: 120px;
			top: 34px;
			height: 66px;
			width: 66px;
			border-radius: 45px;
			background-size:cover!important;
			background-position:50% 50%!important;
		}
		.text{
			position: absolute;
			left: 196px;
			top: 34px;
			color: white;
			strong{
				font-size: 30px;
			}
			span{
				font-size: 30px;
			}
		}
		.tool{
			height: 94px;
			position: absolute;
			top: 978px;
			width: 100%;
			color: gray;
			background-color:#000000;
			opacity: 0.2;
		}
		.likeImg2{
			height: 52px;
			width: 52px;
			position: absolute!important;
			bottom: 142px;
			right: 60px;
			z-index: 1;
			animation: shakeTopx 2.5s .15s linear infinite;
		}
		.likeNum{
			height: 38px;
			color: white;
			min-width: 108px;
			position: absolute!important;
			bottom: 200px;
			right: 34px;
			z-index: 1;
			border-radius: 25px;
			background: #fa3870;
			padding: 2px 10px 5px 10px;
			margin-bottom: 11px;
			
		}
	}
	/*抖动动画*/
	@keyframes shakeTopx {
            0%,
            100% {
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
            -webkit-transform-origin: 50% 50%;
                    transform-origin: 50% 50%;
            }
            5% {
            -webkit-transform: rotate(8deg);
                    transform: rotate(8deg);
            }
            10%,
            20%,
            30% {
            -webkit-transform: rotate(-8deg);
                    transform: rotate(-8deg);
            }
            15%,
            25%,
            35% {
            -webkit-transform: rotate(8deg);
                    transform: rotate(8deg);
            }
            40% {
            -webkit-transform: rotate(-8deg);
                    transform: rotate(-8deg);
            }
            45% {
            -webkit-transform: rotate(6deg);
                    transform: rotate(6deg);
            }
            50% {
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
            }
        }
		 .heart {
			position: absolute;
			top: 500px;
			left:300px;
			z-index: 1;
			animation:heartbeat 1s ;
			-webkit-animation:heartbeat 1s ;
			/* Safari 和 Chrome */
			width:198px;
			height:198px;
			background:#fa3870;
			filter:drop-shadow(0px 0px 20px rgb(255,20,20));
			transform:rotate(45deg);
		}
		.heart:before,.heart:after {
			content:"";
			position:absolute;
			width:200px;
			height:200px;
			background:#fa3870;
			border-radius:100px;
		}
		.heart:before {
			left:-100px;
		}
		.heart:after {
			left:0;
			top:-100px;
		}
		/*心跳动画*/
		@keyframes heartbeat {
			0% {
				transform:rotate(45deg) scale(0.8,0.8);
				opacity:1;
			}
			25% {
				transform:rotate(45deg) scale(1,1);
				opacity:0.8;
			}
			45% {
				transform:rotate(45deg) scale(1,1);
				opacity:0.6;
			}
			65% {
				transform:rotate(45deg) scale(1,1);
				opacity:0.4;
			}
			100% {
				transform:rotate(45deg) scale(0.8,0.8);
				opacity:0.2;
			}
		}
</style>
