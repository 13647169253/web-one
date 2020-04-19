<template>
	<div style="position: relative;height: 100%;">
		<!-- 控件1 -->
		<div class="tool">
			<div class="header">
				<div class="p" :style="'background-image: url('+(headImage?baseurl+'/file/readFile/'+headImage:headImage2)+'); background-size:cover; background-position:50% 50%;color:white'"></div>
					<div class="text">
						<span>{{nickname}}</span>
						<span>{{liveUsers}}</span><span>观看</span>
					</div>
			</div>
			<div class="commodityP">
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
			<van-icon class="close" name="cross" @click="showClose()" />
		</div>
		<!-- 控件2 -->
		<div class="camera">
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
			<!-- <van-icon v-if="$route.query.hideHeader" class="exchange" name="exchange" @click="switchCamera" /> -->
			<!-- <van-icon v-if="!$route.query.hideHeader" class="exchange" name="replay" @click="replay" /> -->
			<!-- 分享 -->
			<Share style="position: absolute;" @closeShare="isCloseShare" v-if="showShare" :logo="coverImage" commodityTitle="仙草田" :goodsExplain="'直播间:'+liveTitle" />
		</div>
		<!-- 控件3 -->
		<x-dialog v-model="notClose" :dialog-style="{'max-width': '100%', width: '100%', height: '20%','background-color': 'transparent!important'}">
			<center>
				<div>
					<van-button @click="close" size="large" square :style="'background-image: url('+btImg+');'" class="submitBtn2 wd">关闭直播</van-button>
				   <van-button @click="closeBox" size="large" square class="submitBtn2 wd2">继续直播</van-button>
				</div>
			</center>
		</x-dialog>
	</div>
</template>

<script>
	export default {
		props:['headImage','nickname','liveUsers','showUnitPrice','goodsName','unitPrice'],
		data() {
			return {
				headImage2: require('@/assets/img/20190709164736.png'),
				shareImg: require('@/assets/img/20190715112128.png'),
				notClose:true,
				btImg:require('@/assets/img/20190619120234.png')
			}
		},
		methods: {
			//跳到详情页
			toDetails(){},
			//关闭直播
			showClose(){
				this.notClose = true;
			},
			close(){
				this.notClose = false;
				localStorage.setItem('liveControlClose','true');
				localStorage.removeItem('showCloseBox');
			},
			closeBox(){
				this.notClose = false;
				localStorage.removeItem('showCloseBox');
			}
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
	//控件2
	.camera{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
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
	//控件3
	.submitBtn2{
		&.wd{
			width: 90%;
			height: 100px;
			background-size:cover; background-position:50% 50%;color:white;
			border-radius: 10px;
		}
		&.wd2{
			width: 90%;
			height: 100px;
			background-size:cover; background-position:50% 50%;color:white;
			margin-top: 30px;
			border-radius: 10px;
			background: transparent!important;
		}
	}
</style>
