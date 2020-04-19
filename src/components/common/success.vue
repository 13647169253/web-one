<template>
	<div>
		<MyHeader title="发布成功" />
		<center class="successDiv">
			<van-image
				  class="successImg"
				  :src="tipImg"
				/>
				<br />
				<strong>您的{{$route.query.text1}}已发布成功！</strong><br />
				<div class="box">
					<span>{{$route.query.text2}}</span><br />
					<span>请保持手机电话畅通</span><br />
				</div>
		</center>
		<div class="bottomBtn">
			<van-button class="bottomBtnc1" @click="$navigation.cleanRoutes();$router.go(-1);">继续发布</van-button>
				<van-button class="bottomBtnc2" @click="$navigation.cleanRoutes();$router.go(-2)">管理我的{{$route.query.text3}}</van-button>
		</div>
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
				tipImg:require('@/assets/img/qt_03.png'),
			}
		}
	}
</script>

<style>
	.successImg{
		width: 159px;
		height: 160px;
		margin-top: 193px;
	}
	.successDiv .box{
		width: 420px;
	}
	.successDiv strong{
		font-size: 37px;
		margin-bottom: 10px;
	}
	.successDiv span{
		font-size: 30px;
		color: lightgray;
	}
	.bottomBtn{
		position: absolute;bottom: 0;width: 100%;
	}
	.bottomBtnc1{
		width:50% ;float: left;color: white!important;height: 97px;
	}
	.bottomBtnc2{
		width:50% ;float: left;color: white!important;height: 97px;
	}
	.bottomBtnc1{
		background-color: #48d7b9!important;
	}
	.bottomBtnc2{
		background-color: #2cbcb3!important;
	}
</style>