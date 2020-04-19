<template>
  <div>
    <MyHeader title="商品管理"/>
		<!-- 无限滚动（滚动加载） -->
		<yd-infinitescroll :callback="loadList" ref="infinitescroll">
			<div slot="list">
				<van-tabs v-model="active" class="tabBox">
					<van-tab :title="item" v-for="item in title"></van-tab>
				</van-tabs>
				<div class="list van-hairline--bottom" v-for="(item,index) in goodsList[active]" :key="index">
					<van-row>
						<van-col span="4">
							<div :style="'background-image: url('+baseurl+'/file/readFile/'+ item.logo + ');'" class="img"></div>
						</van-col>
							<van-col span="17" class="rightBox">
								<strong>{{item.goodsName}}</strong>
								<span v-if="item.unitPrice" class="graySpan"><font color="red">¥<font size="3">{{item.unitPrice.split('元/')[0]}}</font></font>&nbsp;/&nbsp;{{item.unitPrice.split('元/')[1]}}</span>
								<span v-if="item.heartPrice" class="graySpan"><font color="red">¥<font size="3">{{item.heartPrice.split('元/')[0]}}</font></font>&nbsp;/&nbsp;{{item.heartPrice.split('元/')[1]}}</span>
								<br>
							<div class="check" :style="'background-image: url('+btBgImg+');'" @click="check(item.id)">选择</div>
						</van-col>
					</van-row>
				</div>
			</div>
		</yd-infinitescroll>
    <div class="bot"></div>
<yd-backtop />
  </div>
</template>

<script>
  import MyHeader from "@com/header"

  export default {
    name: "myCollect",
    data() {
      return {
		title:['采购商品','出售商品'],
		active:0,
		baseurl:window.baseurl,
		pageNum:[1,1],
        out: require("../../assets/img/out.png"),
        buy: require("../../assets/img/buy.png"),
        btBgImg: require('@/assets/img/20190619120234.png'),
        goodsList: [[],[]]
      }
    },
    components: {
      MyHeader
    },
		created(){
			this.init1(0);
			this.init2(1);
		},
		methods: {
			loadList() {
				let that = this;
				this.pageNum[this.active]+=1;
				(this.active==0?this.init1():this.init2())
				.then(res => {
					if (res.data.code == 100) {
						if(res.data.info.total > 0){
							//加载完毕
							that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
						}else{
							//没有更多数据
							that.pageNum[that.active]-=1;
							that.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
						}
					}
				})
			},
			init1(index){
				let that =this;
				return that.$axios.post('/appServiceBuyGoods/ownList', that.$qs.stringify({
					pageNum: that.pageNum[0],
					pageSize:10,
					status:1,//商品状态 1 上架， 2下架
				}))
				.then(res => {
					if (res.data.code == 100) {
						if(res.data.info.total > 0){
							that.goodsList[index || that.active].push(...res.data.info.rows);
						}
					}
					//让下面的then链可以继续用res
					return Promise.resolve(res)
				})
			},
			init2(index){
				let that =this;
				return that.$axios.post('/appServiceSellGoods/ownList', that.$qs.stringify({
					pageNum: that.pageNum[1],
					pageSize:10,
					status:1,//商品状态 1 上架， 2下架
				}))
				.then(res => {
					if (res.data.code == 100) {
						if(res.data.info.total > 0){
							that.goodsList[index || that.active].push(...res.data.info.rows);
						}
					}
					//让下面的then链可以继续用res
					return Promise.resolve(res)
				})
			},
			check(id){
				let that = this;
				sessionStorage.setItem('goodID',JSON.stringify({'id':id}));
				sessionStorage.setItem('goodType',JSON.stringify({'goodType':that.active}));
				this.$router.go(-1);
			}
		}
  }
</script>

<style scoped lang="less">
	.list{
		position: relative;
		.img{
			height: 147px;
			width: 147px;
			margin: 20px;
			background-size:cover;
			background-position:50% 50%;
			border-radius: 15px;
		}
		.rightBox{
			margin-left: 70px;
			margin-top: 40px;
			strong{
				font-size: 35px;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				overflow: hidden;
				-webkit-box-orient: vertical;
			}
			.graySpan{
				margin-top: 10px;
				font-size:30px;
				color: gray;
				max-width: 60%;
				display: -webkit-box;
				-webkit-line-clamp: 1;
				overflow: hidden;
				-webkit-box-orient: vertical;
			}
		}
		.check{
			position: absolute;
			width: 185px;
			height: 63px;
			border-radius: 45px;
			background-size:cover;
			background-position:50% 50%;
			color:white;
			text-align: center;
			padding-top: 15px;
			display: table;
			right: 15px;
			bottom: 20px;
		}
	}
</style>
