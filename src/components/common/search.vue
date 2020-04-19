<template>
	<div id="search2">
		<van-row>
			<van-col span="1"><van-icon class="back" name="arrow-left" @click="$router.go(-1)" /></van-col>
			<van-col span="23">
				<van-search v-model="search" placeholder="请输入搜索关键词" shape="round" style="background-color:transparent;" />
			</van-col>
		</van-row>
		<div class="van-hairline--surround"></div>
		<div class="main">
			<span class="span">搜索历史</span>
			<van-icon @click="del" class="del" name="delete" />
			<div class="tagBox">
				<van-tag v-for="item in list" class="tag" size="large" round color="#ecebf1"><font color="black">{{item}}</font></van-tag>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search:'',
				list:[]//搜索记录
			}
		},
		methods:{
			del(){
				this.list.splice(0,this.list.length);
			}
		}
	}
</script>

<style lang="less">
	#search2{
		.back{
			font-size: 60px;
			margin: 30px 20px 0 5px;
		}
		.main{
			margin: 30px;
			position: relative;
			.span{
				font-size: 30px;
				color: gray;
			}
			.del{
				position: absolute;
				right: 10px;
				font-size: 45px;
			}
			.tagBox{
				margin: 10px;
				.tag{
					margin:10px;
				}
			}
		}
	}
</style>
