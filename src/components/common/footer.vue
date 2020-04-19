<template>
	<div>
		<!-- 占位的空div（为了防止底部tabbar挡住了上面的内容，因为tabbar的z-index比较高，是悬浮的） -->
		<div style="height: 60px;" :class="loadingCommodity?'seat':''"></div>
		<!-- 底部导航 -->
		<van-tabbar v-model="active" active-color="#00CCFF" :border="false">
			<van-tabbar-item @click="$router.push({path:'/'});">
				<span>首页</span>
				<img slot="icon" slot-scope="props" :src="props.active ? icon1.active : icon1.normal">
			</van-tabbar-item>
			<van-tabbar-item @click="$router.push({path:'/my?type=purchase'});">
				<span>我要买</span>
				<div slot="icon" slot-scope="props" :style="' background: url('+icon3.normal+') no-repeat;background-size:cover;height:50px;width: 50px;margin-top: -25px;z-index:10;border:4px solid white;border-radius: 45px;'"></div>
				<!--<img slot="icon" slot-scope="props" :src="icon2.normal" style="height:50px;width: 50px;margin-top: -25px;z-index:10;">-->
			</van-tabbar-item>
			<van-tabbar-item @click="$router.push({path:'/my?type=sell'});">
				<span>我要卖</span>
				<div slot="icon" slot-scope="props" :style="' background: url('+icon2.normal+') no-repeat;background-size:cover;height:50px;width: 50px;margin-top: -25px;z-index:10;border:4px solid white;border-radius: 45px;'"></div>
				<!--<img slot="icon" slot-scope="props" :src="icon3.normal" style="height:50px;width: 50px;margin-top: -25px;z-index:10">-->
			</van-tabbar-item>
			<van-tabbar-item @click="$router.push({path:'/myMessage'});">
				<span>我的</span>
				<img slot="icon" slot-scope="props" :src="props.active ? icon4.active : icon4.normal">
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default {
		props: ['loadingCommodity','myActive'],
		data() {
			return {
				active: this.myActive || 0,
				icon1: {
					normal: require('@/assets/img/qt_20.png'),
					active: require('@/assets/img/qt_21.png')
				},
				icon2: {
					normal: require('@/assets/img/qt_19.png')
				},
				icon3: {
					normal: require('@/assets/img/qt_18.png')
				},
				icon4: {
					normal: require('@/assets/img/qt_22.png'),
					active: require('@/assets/img/qt_23.png')
				},
			}
		}
	}
</script>

<style>

</style>