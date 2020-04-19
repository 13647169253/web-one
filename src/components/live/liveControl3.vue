<template>
	<div>
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
		data() {
			return {
				notClose:true,
				btImg:require('@/assets/img/20190619120234.png')
			}
		},
		methods:{
			//关闭直播
			close(){
				this.notClose = false;
				localStorage.setItem('liveControlClose','true');
				localStorage.removeItem('showCloseBox');
			},
			closeBox(){
				localStorage.removeItem('showCloseBox');
			}
		}
	}
</script>

<style lang="less">
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
