<template>
	<div>
		<MyHeader :title="$route.query.id?'修改出售商品':'出售商品'" />
		<div class="formControl2">
			<van-field v-model="commodityName" placeholder="请输入商品名称" label="商品名称" required clearable />
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl1">
			<span class="formTitle"><span class="requiredStar">*</span>商品说明</span>
			<yd-textarea v-model="commodityExplain" slot="right" placeholder=""></yd-textarea>
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl2">
			<van-field v-model="producingArea" placeholder="请输入生产产地" label="生产产地" required clearable />
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl2">
			<van-row>
				<van-col span="16">
					<van-field disabled v-model="price" placeholder="(单位:元)" label="出售价格" required clearable />
				</van-col>
				<van-col span="8" id="pn">
					<yd-spinner height="30px" width="50px" button-style="circle" v-model="priceNum" min="0"></yd-spinner>
				</van-col>
			</van-row>
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl2">
			<!-- <van-row>
				<van-col span="14"> -->
			<van-field v-model="weight" placeholder="请输入价格单位" label="价格单位" required clearable />
			<!-- </van-col>
				<van-col span="10">
					<Dropdown trigger="click" style="padding-top: 5px;padding-left: 35px;">
				        <van-button round size="small" style="background-color: #ecebf1;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{weight}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</van-button>
				        <DropdownMenu slot="list">
				            <DropdownItem @click.native="weight='斤'">斤</DropdownItem>
				            <DropdownItem @click.native="weight='公斤'">公斤</DropdownItem>
				        </DropdownMenu>
					</Dropdown>
				</van-col>
			</van-row> -->
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl2">
			<!-- <van-row>
				<van-col span="14"> -->
			<van-field v-model="number" placeholder="请输入起订数量" label="起订数量" required clearable />
			<!-- </van-col>
				<van-col span="10">
					<Dropdown trigger="click" style="padding-top: 5px;padding-left: 35px;">
				        <van-button round size="small" style="background-color: #ecebf1;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{weight2}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</van-button>
				        <DropdownMenu slot="list">
				            <DropdownItem @click.native="weight2='500g'">500g</DropdownItem>
				            <DropdownItem @click.native="weight2='250g'">250g</DropdownItem>
				        </DropdownMenu>
					</Dropdown>
				</van-col>
			</van-row> -->
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl1">
			<span class="requiredStar">&nbsp</span><span class="formTitle">商品视频</span><br /><br />
			<div v-if='isLightImg' class="imgControl color-item" :style="'background-image: url('+isLightImg+'); background-size:cover;'">
				<van-icon @click="delImg2" class="clearImg" name="clear" color="#3db5d4" size="25px" />
			</div>
			<div class="uploadVideoBox imgControl color-item" v-for="(item,index) in fileList1">
				<video class="videos" :src="item"></video>
				<van-icon @click="delImg(index,1)" class="clearImg" name="clear" color="#3db5d4" size="25px" />
			</div>
			<div class="uploadVideo">
				<van-uploader :after-read="afterRead" multiple accept="video/*">
					<div solt="default" class="uploadControl imgControl">
						<div>
							<van-icon name="plus" size='50px' color='gray' />
						</div>
						<div>添加视频</div>
					</div>
				</van-uploader>
			</div>
			<br style='clear: both;' />&nbsp;&nbsp;上传视频时，选择其中某一帧内容作为视频封面。
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl1">
			<span class="requiredStar">*</span><span class="formTitle">Banner首屏图</span><br /><br />
			<div v-for="(item,index) in fileList2" class="imgControl color-item" v-dragging="{ item: item, list: fileList2, group: 'fileList2' }"
			 :style="'background-image: url('+item+'); background-size:cover; background-position:50% 50%; '">
				<van-icon @click="delImg(index,2)" class="clearImg" name="clear" color="#3db5d4" size="25px" />
			</div>
			<div class="uploadVideo">
				<van-uploader :after-read="afterRead2" multiple>
					<div solt="default" class="uploadControl imgControl">
						<div>
							<van-icon name="plus" size='50px' color='gray' />
						</div>
						<div>添加照片</div>
					</div>
				</van-uploader>
			</div>
			<br style='clear: both;' /><span>&nbsp;&nbsp;外部首屏图最少一张，
				<!-- 第一张封面为视频， -->拖动调整图片顺序</span>
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl1">
			<span class="requiredStar">*</span><span class="formTitle">详情图</span><br /><br />
			<div v-for="(item,index) in fileList3" class="imgControl color-item" v-dragging="{ item: item, list: fileList3, group: 'fileList3' }"
			 :style="'background-image: url('+item+'); background-size:cover; background-position:50% 50%; '">
				<van-icon @click="delImg(index,3)" class="clearImg" name="clear" color="#3db5d4" size="25px" />
			</div>
			<div class="uploadVideo">
				<van-uploader :after-read="afterRead3" multiple>
					<div solt="default" class="uploadControl imgControl">
						<div>
							<van-icon name="plus" size='50px' color='gray' />
						</div>
						<div>添加照片</div>
					</div>
				</van-uploader>
			</div>
			<br style='clear: both;' /><span>&nbsp;&nbsp;详情图最少一张，拖动调整图片顺序</span>
		</div>
		<div class="formControl2">
			<van-field v-model="phone" placeholder="" label="联系方式" required clearable />
		</div>
		<div class="nullDiv"></div>
		<van-button @click="submit" size="large" square :style="'background-image: url('+btBgImg+'); background-size:cover; background-position:50% 50%;color:white'"
		 class="submitBtn2">{{$route.query.id?'修改':'发布'}}</van-button>
		<van-popup v-model="checkVideoCover" class="videoCover" :close-on-click-overlay="false">
			<font class="tip1">选择视频的封面图：</font>
			<center>
				<video id="myVideo" :src="checkVideoSrc" controls autoplay crossOrigin='anonymous'></video>
			</center><br />
			<div class="checkBox">
				<div @click="checkP(index)" :class="'p'+(isLight===index?' lightImg':'')" :style="'background-image: url('+item+'); background-size:cover;'"
				 v-for="(item,index) in base64Arr" />
				<!-- canvas的v-for循环不确定好数字的话，谷歌浏览器会报错Cannot read property 'getContext' of undefined，火狐浏览器会报错TypeError: $canvas[num] is undefined"。这里确定50 -->
				<canvas hidden v-for="(item,index) in 50" style="height: 150px;width: 150px;"></canvas>
			</div>
			<font class="tip2">从上方视频选择某一帧画面暂停，然后点击【截图】加入待选列表（最多50张候选），点击列表的一张截图并【确定】作为封面</font>
			<center>
				<van-button plain @click="screenshot" icon="video-o" type="primary">截图</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
				<van-button plain @click="checkOk" icon="passed">确定</van-button>
			</center>
		</van-popup>
		<x-dialog v-model="notClose" :hide-on-blur="false" :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
			<center>
				<div class="tips2">
					<van-image v-show="!uploadType" @click="" class="uploadImg" :src="uploadImg1" />
					<van-image v-show="uploadType" @click="" class="uploadImg" :src="uploadImg2" />
					<strong v-show="!uploadType">视频上传中（{{(uploadLoaded/uploadTotal*100).toFixed(2)}}%）</strong>
					<span v-show="!uploadType">请耐心等待</span>
					<strong v-show="uploadType">上传成功</strong>
					<span v-show="uploadType">已上传成功，已存储我的视频中</span>
					<div v-show="!uploadType" class="nullDiv2"></div>
					<van-button v-show="uploadType" @click="uploadType = false;notClose = false;checkVideoCover= true" size="large" square
					 :style="'background-image: url('+btBgImg+');'" class="submitBtn5">选择视频封面</van-button>
				</div>
			</center>
			<br>
			<!-- <x-icon v-show="uploadType" @click="uploadType = false;notClose = false;checkVideoCover= true" type="ios-close-outline" size="46px" style="fill:white;"></x-icon> -->
		</x-dialog>
	</div>
</template>

<script>
	import MyHeader from "@com/header"
	import {
		validation
	} from './validate'
	import otherUtils from "@/utils/other"

	export default {
		components: {
			MyHeader
		},
		data() {
			return {
				notClose:false,
				checkVideoSrc: '',
				checkVideoCover: false,
				base64Arr: [],
				isLight: 0, //索引
				isLightImg: '',
				uploadType:false,
				uploadImg1: require('@/assets/img/qt_05.png'),
				uploadImg2: require('@/assets/img/qt_04.png'),
				btBgImg: require('@/assets/img/20190619120234.png'),
				commodityName: "", //商品名称
				commodityExplain: "", //商品说明
				price: "", //出售价格
				priceNum: 0, //价格数量
				weight: "", //价格单位
				number: "", //起订数量
				phone: '', //联系方式
				producingArea: '',
				fileList1: [],
				fileList2: [],
				fileList3: [],
				uploadTotal:0,//上传视频总进度
				uploadLoaded:0//上传视频当前进度
			}
		},
		methods: {
			//上传视频
			afterRead(file) {
				let that = this;
				let oldFile = file;
				let canUpload = true; //效验。是否应该上传到服务器。
				file = file.file;
				let fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLocaleLowerCase();
				if (fileType != 'mp4' && fileType != 'avi' && fileType != 'wma' && fileType != "3GP" && fileType != "rmvb" &&
					fileType != "flv" && fileType != "mov") {
					canUpload = false;
					that.$toast.fail('上传视频格式不正确');
				}
				if (that.fileList1.length >= 1) {
					canUpload = false;
					that.$toast.fail('视频最多上传1个');
				}
				if ((file.size / 1024) > 204800) {
					canUpload = false;
					that.$toast.fail('上传的视频不得大于200MB')
				}
				if (canUpload) {
					let fd = new FormData(); //创建form对象
					fd.append('fileName', file);
					let config = {
						"Content-Type": "multipart/form-data"
					}
					that.notClose=true;//显示上传进度
					let xhr = that.$axios({
							method: 'post',
							url: '/file/uploadFile',
							data: fd,
							headers: {
								"Content-Type": "multipart/form-data"
							},
							timeout:0,
							//上传进度
							onUploadProgress:function(event) {
								that.uploadTotal=event.total;
								that.uploadLoaded=event.loaded;
								//上传完成
								if(that.uploadLoaded/that.uploadTotal==1){
									that.uploadTotal=0;
									that.uploadLoaded=0;
									that.uploadType = true;
									//that.notClose=false;//不显示上传进度
									//that.checkVideoCover = true;//显示截图页面
								}
							}
						})
						.then(function(res) {
							if (res.data.code == 100) {
								that.fileList1.push(window.baseurl + '/file/readFile/' + res.data.info);
								//方法一:加载服务器地址
								//that.checkVideoSrc = window.baseurl + '/file/readFile/' + res.data.info;
								//that.checkVideoCover = true;//显示截图页面
								that.$nextTick(function() {
									//方法二:本地预览视频。设置视频的base64码（content是原生的file对象自带的属性）。
									//document.getElementById('myVideo').src = oldFile.content;
									that.checkVideoSrc = oldFile.content;
								})
							}
						})
						.catch(function(err) {
							that.notClose=false;//不显示上传进度
							that.$toast('上传失败，请重新尝试')
						})
				}
			},
			//上传图片
			afterRead2(file) {
				let canUpload = true; //效验。是否应该上传到服务器。
				let that = this;
				file = file.file;
				let fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLocaleLowerCase();
				if (fileType != 'jpg' && fileType != 'bmp' && fileType != 'png' && fileType != "jpeg") {
					canUpload = false;
					that.$toast.fail('上传图片格式不正确');
				}
				if ((file.size / 1024) > 5120) {
					canUpload = false;
					that.$toast.fail('上传的图片不得大于5MB')
				}
				if (that.fileList2.length >= 5) {
					canUpload = false;
					that.$toast.fail('图片最多上传5张');
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
								that.fileList2.push(window.baseurl + '/file/readFile/' + res.data.info);
							}
						})
				}
			},
			afterRead3(file) {
				let canUpload = true; //效验。是否应该上传到服务器。
				let that = this;
				file = file.file;
				let fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLocaleLowerCase();
				if (fileType != 'jpg' && fileType != 'bmp' && fileType != 'png' && fileType != "jpeg") {
					canUpload = false;
					that.$toast.fail('上传图片格式不正确');
				}
				if ((file.size / 1024) > 5120) {
					canUpload = false;
					that.$toast.fail('上传的图片不得大于5MB')
				}
				if (that.fileList3.length >= 10) {
					canUpload = false;
					that.$toast.fail('图片最多上传10张');
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
								that.fileList3.push(window.baseurl + '/file/readFile/' + res.data.info);
							}
						})
				}
			},
			//删除图片/视频
			delImg(index, num) {
				this['fileList' + num].splice(index, 1);
				if (num == 1) {
					this.base64Arr.splice(0, this.base64Arr.length);
					this.isLight = 0;
					this.isLightImg = '';
					this.checkVideoSrc = '';
				}
			},
			delImg2() {
				this.isLight = 0;
				this.isLightImg = '';
				this.checkVideoCover = true;
			},
			//视频截图
			screenshot() {
				let that = this;
				let num = -1;
				let $canvas = document.getElementsByTagName('canvas');
				let $video = document.getElementById('myVideo');
				let $oldVideo = document.getElementsByClassName('videos'); //上传到服务器的原视频
				//截图10张
				/*
				for(let i = $video.duration/10;i < $video.duration;i+=($video.duration/10)){
					$video.currentTime=i;//设置播放时间为某个时间点（单位：秒）
					$video.play();
					setTimeout(function(){
						setImg();
					},200)//等待加载200毫秒再截图
				}
				*/
				//截图
				function setImg() {
					num += 1;
					let w = $oldVideo[num].videoWidth; //视频原尺寸
					let h = $oldVideo[num].videoHeight; //视频原尺寸
					$canvas[num].width = w; //设置画布的宽度
					$canvas[num].height = h; //设置画布的高度
					let ctx = $canvas[num].getContext('2d');
					ctx.drawImage($video, 0, 0, w, h); //canvas上绘制图片
					let base64 = $canvas[num].toDataURL('images/png'); //cnavas转图片base64码
					that.base64Arr.push(base64);
				}
				setImg();
			},
			checkP(index) {
				let that = this;
				this.isLight = index;
			},
			checkOk() {
				let that = this;
				//图片是请求详情页加载的网络地址还是canvas转的base64码字符串
				if (this.isLight !== '' && this.isLight !== undefined && that.base64Arr.length > 0 && this.base64Arr[this.isLight].substring(
						0, 4) != 'http') {
					//本地封面图
					//this.isLightImg = this.base64Arr[index];
					//上传到服务器的封面图
					let fd = new FormData(); //创建form对象
					fd.append('fileName', otherUtils.baseToFile(that.base64Arr[that.isLight], 'fileName.png'));
					let config = {
						"Content-Type": "multipart/form-data"
					}
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
								that.isLightImg = window.baseurl + '/file/readFile/' + res.data.info;
							}
							//暂停播放
							let $video = document.getElementById('myVideo');
							$video.pause();
							that.checkVideoCover = false;
						})
						.catch(function(err) {
							that.$toast('封面图上传失败，请重新【确定】上传');
						})
				} else {
					if (that.base64Arr.length > 0 && that.base64Arr[that.isLight].substring(0, 4) == 'http') {
						that.isLightImg = that.base64Arr[that.isLight];
						//暂停播放
						let $video = document.getElementById('myVideo');
						$video.pause();
						that.checkVideoCover = false;
					} else {
						that.$toast('你还没有选择视频封面')
					}
				}
			},
			submit() {
				let that = this;
				let validationError = validation({
					commodityName: that.commodityName,
					commodityExplain: that.commodityExplain,
					weight: that.weight,
					number: that.number,
					fileList1: that.fileList1,
					isLightImg: that.isLightImg,
					fileList2: that.fileList2,
					fileList3: that.fileList3,
					phone: that.phone,
					producingArea: that.producingArea
				})
				if (validationError === '') {
					let banners = that.fileList2;
					for (let key in banners) {
						banners[key] = banners[key].split('/file/readFile/')[1]
					}
					let details = that.fileList3;
					for (let key in details) {
						details[key] = details[key].split('/file/readFile/')[1]
					}
					let param = {
						banners: that.fileList2.join(','),
						contactPhone: that.phone,
						details: that.fileList3.join(','),
						goodsExplain: that.commodityExplain,
						goodsName: that.commodityName,
						minimumOrder: that.number,
						previewPicture: that.isLightImg.split('/file/readFile/')[1],
						productArea: that.producingArea,
						unitPrice: that.priceNum + '元/' + that.weight,
						videoAddress: that.fileList1[0].split('/file/readFile/')[1],
					}
					if (this.$route.query.id) {
						param.id = this.$route.query.id;
					}
					this.$axios.post(this.$route.query.id ? '/appServiceSellGoods/update' : '/appServiceSellGoods/add', this.$qs.stringify(
							param))
						.then(res => {
							if (res.data.code == 100) {
								if (this.$route.query.id) {
									that.$toast.success(res.data.info);
									that.$router.go(-1);
								} else {
									that.$toast.fail(res.data.info);
									that.$router.push({
										path: '/success',
										query: {
											type: 'sell',
											text1: '出售单',
											text2: '您的出售供应将展示在商品列中',
											text3: '出售'
										}
									})
								}
							}
						})
					//还原hashcode
					for (let key in banners) {
						banners[key] = window.baseurl + '/file/readFile/' + banners[key]
					}
					for (let key in details) {
						details[key] = window.baseurl + '/file/readFile/' + details[key]
					}
				} else {
					this.$toast(validationError);
				}
			}
		},
		created() {
			let that = this;
			that.$axios.post('/appServiceUser/selectUserHomePage')
				.then(res => {
					if (res.data.code == 100) {
						if (that.phone == '') {
							that.phone = res.data.info.contactPhone;
						}
					}
				})
			if (this.$route.query.id) {
				this.$axios.post('/appServiceSellGoods/detail', this.$qs.stringify({
						id: this.$route.query.id,
					}))
					.then(res => {
						if (res.data.code == 100) {
							let banners = res.data.info.banners.split(',');
							for (let key in banners) {
								banners[key] = window.baseurl + '/file/readFile/' + banners[key]
							}
							that.fileList2 = banners;
							let details = res.data.info.details.split(',');
							for (let key in details) {
								details[key] = window.baseurl + '/file/readFile/' + details[key]
							}
							that.fileList3 = details;
							that.commodityName = res.data.info.goodsName;
							that.commodityExplain = res.data.info.goodsExplain;
							that.producingArea = res.data.info.productArea;
							that.priceNum = res.data.info.unitPrice.split('元/')[0];
							that.weight = res.data.info.unitPrice.split('元/')[1];
							that.number = res.data.info.minimumOrder;
							that.phone = res.data.info.contactPhone;
							that.isLightImg = window.baseurl + '/file/readFile/' + res.data.info.previewPicture;
							that.isLight = 0;
							that.base64Arr = [window.baseurl + '/file/readFile/' + res.data.info.previewPicture];
							that.checkVideoSrc = window.baseurl + '/file/readFile/' + res.data.info.videoAddress;
							that.fileList1 = [window.baseurl + '/file/readFile/' + res.data.info.videoAddress]
						}
					})
			}
		}
	}
</script>

<style lang="less">
	/*hack“ydui”的步进器样式*/
	#pn {
		margin-top: 15px;

		.yd-spinner {
			border-radius: 45px;
			background-color: #ecebf1;
		}

		input {
			background-color: #ecebf1;
		}

		span {
			background-color: #2dbbb2;
		}

		span i:after {
			color: white;
		}
	}

	.uploadVideoBox {
		float: left;
		width: 145px;
		height: 145px;
		margin-top: 20px;

		video {
			height: 100%;
			width: 100%;
			background-color: black;
		}
	}

	.videoCover {
		background: transparent!important;
		width: 100%;
		overflow-x: hidden;
		padding-left: 30px;
		padding-right: 30px;

		.tip1 {
			color: white;
			font-size: 40px;
			margin-top: 120px;
			margin-left: 30px;
		}

		.tip2 {
			color: white;
			font-size: 30px;
			margin-top: 120px;
			margin-left: 30px;
		}

		center {
			margin: 0;

			video {
				width: 350px;
				height: 350px;
			}
		}

		.checkBox {
			height: 200px;
			width: 100%;
			background-color: rgba(23, 20, 20, 0.48);
			white-space: nowrap;
			overflow-x: scroll;
			overflow-y: hidden;

			.p {
				border-radius: 15px;
				width: 180px;
				height: 180px;
				margin-top: 10px;
				margin-left: 10px;
				margin-right: 10px;
				background-color: white;
				box-sizing: border-box;
				white-space: normal;
				word-wrap: break-word;
				word-break: break-all;
				display: inline-block;
			}
		}

		center {
			margin-top: 50px;
		}
	}

	.lightImg {
		border: 12px solid;
		border-image: -webkit-linear-gradient(lightblue, mediumseagreen) 30 30;
		border-image: -moz-linear-gradient(lightblue, mediumseagreen) 30 30;
		border-image: linear-gradient(lightblue, mediumseagreen) 30 30;
	}
	.uploadImg{
		width: 250px;
		height: 250px;
	}
	.submitBtn5{
		height: 100px;
		width: 582px;
		background-size: cover;
		background-position: 50% 50%;
		margin-top: 80px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		.van-button__text{
			color: white!important;
		}
	}
	.tips2{
		border-radius: 15px;
		width: 582px;
		background:white;
		strong{
			display: block;
			font-size: 36px;
		}
		span{
			color: gray;
			display: block;
			font-size: 28px;
		}
		.nullDiv2{
			height: 82px;
		}
	}
</style>
