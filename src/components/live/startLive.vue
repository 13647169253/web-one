<template>
	<div>
		<MyHeader title="开始直播" />
		<div class="formControl3">
			<van-field v-model="liveTitle" required clearable label="直播标题" placeholder="请输入直播标题" />
		</div>
		<div class="upload">
			<div class="top">
				<p><span class="requiredStar">*</span>添加首屏图</p>
			</div>
		</div>
		<div v-for="(item,index) in fileList1" class="imgControl color-item" v-dragging="{ item: item, list: fileList1, group: 'fileList1' }"
		 :style="'background-image: url('+item+'); background-size:cover; background-position:50% 50%; '">
			<van-icon @click="delImg(index,1)" class="clearImg" name="clear" color="#3db5d4" size="25px" />
		</div>
		<div class="uploadVideo">
			<van-uploader :after-read="afterRead">
				<div solt="default" class="uploadControl imgControl">
					<div>
						<van-icon name="plus" size='50px' color='gray' />
					</div>
					<div>添加首屏图</div>
				</div>
			</van-uploader>
		</div>
		<br style="clear: both;">
		<div class="van-hairline--surround"></div>
		<!-- -->
		<div class="upload">
			<div class="top">
				<p>添加直播商品</p>
			</div>
		</div>
		<div class="uploadVideo">
			<div class="uploadControl imgControl" @click="addGood">
				<div>
					<van-icon name="plus" size='50px' color='gray' />
				</div>
				<div>直播商品</div>
			</div>
		</div>
		<br style="clear: both;"><br>
		<div class="van-hairline--surround"></div>
		<van-row class="goodsList" v-for="(item,index) in goodsList" :key="index">
			<van-col span="4" :style="'background-image: url(' + item.commodity + '); background-size:cover; background-position:50% 50%; '"
			 class="backUrl">

			</van-col>
			<van-col span="17" offset="2" class="goodsRight">
				<div class="name">{{item.videoname}}</div>
				<div class="price">
					<p class="nums"><font size="4" color="#fe0000">￥{{item.nums1}}</font><font>&nbsp;/&nbsp;{{item.nums2}}</font></p>
					<div class="delete" @click="delGood(index)">删除</div>
				</div>

			</van-col>

		</van-row>
		<div class="bot" @click="start" :style="'background-image: url('+btBgImg+'); background-size:cover; background-position:50% 50%;color:white'">
			开始直播
		</div>
	</div>
</template>

<script>
	import otherUtils from "@/utils/other"
	import MyHeader from "@com/header"
	import {validation} from './validate'
	import ImageCompressor from 'image-compressor.js';
	const imageCompressor = new ImageCompressor();

	export default {
		name: "startLive",
		data() {
			return {
				liveTitle: "",
				fileList1: [],//图片的hashcode
				//fileList2: [],
				btBgImg: require('@/assets/img/20190619120234.png'),
				goodsList: [],
				goodsType:1,
			}
		},
		methods: {
			//上传图片
			afterRead(file) {
				let that = this;
				let fileType = file.file.name.substring(file.file.name.lastIndexOf('.') + 1, file.file.name.length).toLocaleLowerCase();
				imageCompressor.compress(file.file, {
					quality:0.6
				})
				.then((rst) => {
					let newFile = new File([rst],'filename.'+fileType);
					next(newFile);
				})
				function next(myFile){
					let canUpload = true; //效验。是否应该上传到服务器。
					file = myFile;
					let fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLocaleLowerCase();
					if (fileType != 'jpg' && fileType != 'bmp' && fileType != 'png' && fileType != "jpeg") {
						canUpload = false;
						that.$toast.fail('上传图片格式不正确');
					}
					if (that.fileList1.length >= 1) {
						canUpload = false;
						that.$toast.fail('图片最多上传1张');
					}
					let fd = new FormData(); //创建form对象
					fd.append('fileName', file)
					let config = {
						"Content-Type": "multipart/form-data"
					}
					if (canUpload) {
						that.$axios({
								method: 'post',
								url: '/file/uploadFile',
								data: fd,
								headers: {
									"Content-Type": "multipart/form-data"
								}
							})
							.then(function(res) {
								if (res.data.code == 100) {
									that.fileList1.push(window.baseurl + '/file/readFile/' + res.data.info);
								}
							})
					}
				}
			},
			//删除图片
			delImg(index, num) {
				this['fileList' + num].splice(index, 1);
			},
			addGood(){
				if(this.goodsList.length<=0){
					this.$router.push('/goodsmanment')
				}else{
					this.$toast('商品只能添加一个')
				}
			},
			delGood(index){
				this.goodsList.splice(index, 1);
				sessionStorage.removeItem('goodID')
			},
			start() {
				let that = this;
				toLive();
				//进入直播页面
				function toLive(){
					let validationError = validation({
						liveTitle: that.liveTitle,
						coverImage:that.fileList1,
						goodsList:that.goodsList
					})
					if(validationError === ''){
						let param = {
							liveTitle: that.liveTitle,
							coverImage:that.fileList1[0].split('/file/readFile/')[1] || ''
						}
						if(that.goodsList.length>0){
							param.goodsId = that.goodsList[0].id;
							param.goodsType = that.goodsType
						}
						that.$axios.post('/appServiceLive/startLive1', that.$qs.stringify(param))
						.then(res=>{
							that.$router.push({
								name:'liveDetails',
								params:{
									url:res.data.info.pushUrl,
									liveId:res.data.info.liveId
								}
							})
						})
					}else{
						that.$toast(validationError);
					}
				}
			}
		},
		components: {
			MyHeader
		},
		//进入当前路由触发这个钩子。即使router.go(-1)到本路由也能交互数据
		beforeRouteEnter (to, from, next) {
			next(vm => {
				if(from.name == "goodsmanMent"){
					let id= sessionStorage.getItem('goodID');
					let goodType= sessionStorage.getItem('goodType');
					vm.goodsType = JSON.parse(goodType).goodType=='0'?2:1;
					if(id !== '' && id !== null && id != undefined){
						vm.$axios.post(JSON.parse(goodType).goodType=='0'?'/appServiceBuyGoods/detail':'/appServiceSellGoods/detail', vm.$qs.stringify({
							id:JSON.parse(id).id
						}))
						.then(res => {
							if (res.data.code == 100) {
								vm.goodsList.splice(0,1);
								vm.goodsList.push({
									id:res.data.info.id,
									commodity:window.baseurl + '/file/readFile/' + res.data.info.banners.split(',')[0],
									nums1:res.data.info.unitPrice?res.data.info.unitPrice.split('元/')[0]:res.data.info.heartPrice.split('元/')[0],
									nums2:res.data.info.unitPrice?res.data.info.unitPrice.split('元/')[1]:res.data.info.heartPrice.split('元/')[1],
									videoname:res.data.info.goodsName
								})
							}
						})
					}
				}
			})
		},
		created(){
			let that = this;
			that.$axios.post('/appServiceLive/isLived')
			.then(res=>{
				if (res.data.code == 100) {
					if(res.data.info.isLived==1){
						that.liveTitle = res.data.info.liveTitle;
						that.fileList1.push(window.baseurl + '/file/readFile/' + res.data.info.liveCoverImage);
					}
				}
			})
		}
	}
</script>

<style scoped lang="less">
	@import "../../public/style.css";

	.upload {
		height: 87px;
		line-height: 87px;
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 0.4rem;

		&::before {
			position: absolute;
			left: 13px;
			color: #f44;
			font-size: 14px;
			// content: '*';
		}

		.top {
			height: 87px;
			width: 100%;
			line-height: 87px;

			p {
				color: #323233;
				font-size: 30px;
				line-height: 87px;
			}
		}
	}
	.goodsList {
		padding: 26px 26px;
		border-bottom: var(--basebtom);

		.backUrl {
			width: 140px;
			height: 140px;
			border-radius: 10px;
		}

		.goodsRight {
			line-height: 45px;
			font-size: 26px;
			letter-spacing: 2px;
			font-weight: 550;
			position: relative;

			.delete {
				float: right;
				padding: 12px 55px;
				border-radius: 35px;
				font-size: 27px;
				color: #65646a;
				border: 2px solid #c9c8cd;
				margin-top: -23px;
			}

			.name {
				margin-top:20px;
				font-size: 35px;
				letter-spacing: 2px;
				color: #000;
				line-height: 47px;
				/*一行内的字太多就显示省略号*/
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.price {
				margin-top: 21px;
				 color: gray;

				p {
					float: left;
					font-size: 30px;
				}

				.nums {
					font-size: 30px;
					font-weight: 550;
					float: left;
					margin-top: -5px;
					max-width: 60%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.nums3 {
					font-size: 26px;
					float: left;
				}

				.nums2 {
					font-size: 26px;
					color: #8b8b8d;
					float: left;
				}
			}
		}
	}

	.bot {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 98px;
		text-align: center;
		font-size: 32px;
		letter-spacing: 2px;
		line-height: 98px;
	}
</style>
