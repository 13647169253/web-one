<template>
	<div v-if="show">
		<MyHeader :title="$route.query.id?'修改采购意向':'采购意向'" />
		<div class="formControl1 color-list">
			<span class="requiredStar">*</span><span class="formTitle">添加采购照片（可多张）</span><br /><br />
			<div v-for="(item,index) in fileList1" class="imgControl color-item" v-dragging="{ item: item, list: fileList1, group: 'fileList1' }"
			 :style="'background-image: url('+item+'); background-size:cover; background-position:50% 50%; '">
				<van-icon @click="delImg(index,1)" class="clearImg" name="clear" color="#3db5d4" size="25px" />
			</div>
			<div class="uploadVideo">
				<van-uploader :after-read="afterRead" multiple >
					<div solt="default" class="uploadControl imgControl">
						<div>
							<van-icon name="plus" size='50px' color='gray' />
						</div>
						<div>添加照片</div>
					</div>
				</van-uploader>
			</div>
		</div>
		<!--切割线-->
		<div class="formControl2" style='clear: both;'>
			<div class="van-hairline--surround"></div>
		</div>
		
		<div class="formControl3">
			<van-field v-model="goodsName" placeholder="请输入采购名称" label="采购名称" required clearable />
		</div>
		<div class="formControl1">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl3">
			<van-field v-model="specifications" placeholder="请输入规格要求,例如:  200ml*6" label="规格要求" required clearable />
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl2">
			<van-row>
				<van-col span="24"><van-field v-model="purchaseNum" placeholder="请输入采购数量" label="采购数量" required clearable /></van-col>
				<!-- <van-col span="6" style='padding-top: 10px;margin-right: -20px;padding-left: 13px;'>
					<van-field class="formBtn" v-model="purchaseNum" placeholder="" style='border-radius: 25px;padding: 0;' input-align="center" />
				</van-col> -->
				<!-- <van-col span="6">
					<Dropdown trigger="click" style="padding-top: 10px;padding-left: 22px;">
				        <van-button class="formBtn" round size="small">&nbsp;{{weight}}&nbsp;▼</van-button>
				        <DropdownMenu slot="list">
				            <DropdownItem @click.native="weight='克'">克</DropdownItem>
				            <DropdownItem @click.native="weight='千克'">千克</DropdownItem>
				        </DropdownMenu>
		    		</Dropdown>
				</van-col> -->
			</van-row>
		</div>
		<div class="formControl1">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl3">
			<van-field v-model="producingArea" placeholder="请输入生产产地" label="生产产地" required clearable />
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div><br>
		</div>
		<div class="formControl3">
			<van-row>
				<van-col span="4"><van-field type='number' disabled placeholder="" label="心理价位" required clearable /></van-col>
				<van-col span="5" style="padding-left: 31px;padding-top: 5px;">
					<van-field v-model="price1" class="formBtn" placeholder="最低价位" style='border-radius: 25px;padding: 0;' input-align="center" />
				</van-col>
				<van-col span="1" style="padding-left: 0px;margin-top: 10px;">
					—
				</van-col>
				<van-col span="5" style="padding-left: 20px;margin-top: 5px;">
					<van-field v-model="price2" class="formBtn" placeholder="最高价位" style='border-radius: 25px;padding: 0;' input-align="center" />
				</van-col>
				<van-col span="4" style="padding-left: 20px;margin-top: 10px;">
					<span class="weightText">&nbsp;元&nbsp;/</span>
				</van-col>
				<van-col span="5" style="margin-top: 0px;">
					<van-field v-model="weight" placeholder="单位" />
				</van-col>
			</van-row>
		</div>
		<div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl1">
			<span class="formTitle">其他要求（选填）</span>
			<yd-textarea v-model="demand" slot="right" placeholder="" maxlength="200"></yd-textarea>
	    </div>
	    <div class="formControl3">
			<div class="van-hairline--surround"></div>
		</div>
	    <div class="formControl1">
			<span class="requiredStar">*</span><span class="formTitle">添加采购详情图</span><br /><br />
			<div v-for="(item,index) in fileList2" class="imgControl color-item" v-dragging="{ item: item, list: fileList2, group: 'fileList2' }"
			 :style="'background-image: url('+item+'); background-size:cover; background-position:50% 50%; '">
				<van-icon @click="delImg(index,2)" class="clearImg" name="clear" color="#3db5d4" size="25px" />
			</div>
			<div class="uploadVideo">
				<van-uploader :after-read="afterRead2" multiple >
					<div solt="default" class="uploadControl imgControl">
						<div>
							<van-icon name="plus" size='50px' color='gray' />
						</div>
						<div>添加照片</div>
					</div>
				</van-uploader>
			</div>
		</div>
		<div class="formControl3" style='clear: both;'>
			<div class="van-hairline--surround"></div>
		</div>
		<div class="formControl2">
			<van-field v-model="phone" placeholder="" label="联系方式" required clearable />
		</div>
		<van-button @click="submit" size="large" square :style="'background-image: url('+btBgImg+');background-size:cover; background-position:50% 50%;color:white'" class="submitBtn2">{{$route.query.id?'修改':'发布'}}</van-button>
	</div>
</template>

<script>
	import MyHeader from "@com/header"
	import {validation} from './validate'
	
	export default {
		components: {
			MyHeader
		},
		data() {
			return {
				show:true,
				btBgImg:require('@/assets/img/20190619120234.png'),
				goodsName: '', //采购名称
				specifications:'',//规格要求
				purchaseNum:'',//采购数量
				producingArea:'',//生产产地
				weight:'',//单位
				price1:'',//心理价位
				price2:'',
				phone:'',//联系方式,
				demand:'',//要求
				fileList1:[],//banner图
				fileList2:[],//详情图
			}
		},
		methods:{
			submit(){
				let that = this;
				let validationError = validation({
					fileList1:that.fileList1,
					fileList2:that.fileList2,
					weight:that.weight,
					goodsName:that.goodsName,
					specifications:that.specifications,
					purchaseNum:that.purchaseNum,
					producingArea:that.producingArea,
					price1:that.price1,
					price2:that.price2,
					phone:that.phone
				})
				if(validationError === ''){
					/**
					 * 笔记：
					 * @param {Object} let key in banners
					 * 把data赋值给一个变量，操作这个变量也会改变data！！！
					 * 因为data已经变异了，data被vue绑定了get和set方法！
					 * 例如下面的banners会改变fileList1；所以为了继续使用必须还原data！
					 */
					let banners = that.fileList1;
					for (let key in banners) {
						banners[key] = banners[key].split('/file/readFile/')[1]
					}
					let details = that.fileList2;
					for (let key in details) {
						details[key] = details[key].split('/file/readFile/')[1]
					}
					let param = {
						banners:banners.join(','),
						details:details.join(','),
						buyNorms:that.specifications,
						buyNumber:that.purchaseNum,
						contactPhone:that.phone,
						goodsName:that.goodsName,
						heartPrice:that.price1+'-'+that.price2+'元/'+that.weight,
						originRequirement:that.producingArea,
						otherRequire:that.demand
					}
					if(this.$route.query.id){
						param.id=this.$route.query.id;
					}
					this.$axios.post(this.$route.query.id?'/appServiceBuyGoods/update':'/appServiceBuyGoods/add',this.$qs.stringify(param))
					.then(res => {
						if (res.data.code == 100) {
							if(this.$route.query.id){
								that.$toast.success(res.data.info);
								that.$router.go(-1);
							}else{
								that.$toast.fail(res.data.info);
								that.$router.push({ path: '/success',query:{
									type:'purchase',
									text1:'采购单',
									text2:'供货商收到信息后会与您联系',
									text3:'采购'
								} })
							}
						}
					})
					//还原hashcode
					for (let key in banners) {
						banners[key] = window.baseurl + '/file/readFile/' +banners[key]
					}
					for (let key in details) {
						details[key] = window.baseurl + '/file/readFile/' +details[key]
					}
				}else{
					this.$toast(validationError);
				}
			},
			//上传图片
			afterRead(file) {
				let canUpload = true; //效验。是否应该上传到服务器。
				let that = this;
				file = file.file;
				let fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLocaleLowerCase();
				if (fileType != 'jpg' && fileType != 'bmp' && fileType != 'png' && fileType != "jpeg") {
					canUpload = false;
					that.$toast.fail('上传图片格式不正确');
				}
				if((file.size / 1024) > 5120) {
					canUpload = false;
					that.$toast.fail('上传的图片不得大于5MB')
				}
				if (that.fileList1.length >= 5) {
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
								that.fileList1.push(window.baseurl + '/file/readFile/' + res.data.info);
							}
						})
				}
			},
			afterRead2(file) {
				let canUpload = true; //效验。是否应该上传到服务器。
				let that = this;
				file = file.file;
				let fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLocaleLowerCase();
				if (fileType != 'jpg' && fileType != 'bmp' && fileType != 'png' && fileType != "jpeg") {
					canUpload = false;
					that.$toast.fail('上传图片格式不正确');
				}
				if((file.size / 1024) > 5120) {
					canUpload = false;
					that.$toast.fail('上传的图片不得大于5MB')
				}
				if (that.fileList2.length >= 10) {
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
								that.fileList2.push(window.baseurl + '/file/readFile/' + res.data.info);
							}
						})
				}
			},
			//删除图片
			delImg(index, num) {
				this['fileList' + num].splice(index, 1);
			},
		},
		created(){
			let that=this;
			that.$axios.post('/appServiceUser/selectUserHomePage')
			.then(res=>{
				if (res.data.code == 100) {
					if(that.phone == ''){
						that.phone = res.data.info.contactPhone;
					}
				}
			})
			if(this.$route.query.id){
				this.$axios.post('/appServiceBuyGoods/detail',this.$qs.stringify({
				  id:this.$route.query.id,
				}))
				.then(res=>{
					if(res.data.code==100){
						let banners = res.data.info.banners.split(',');
						for (let key in banners) {
							banners[key] = window.baseurl + '/file/readFile/' +banners[key]
						}
						that.fileList1=banners;
						let details = res.data.info.details.split(',');
						for (let key in details) {
							details[key] = window.baseurl + '/file/readFile/' +details[key]
						}
						that.fileList2=details;
						that.goodsName = res.data.info.goodsName;
						that.specifications = res.data.info.buyNorms;
						that.purchaseNum = res.data.info.buyNumber;
						that.producingArea = res.data.info.originRequirement
						that.price1 = res.data.info.heartPrice.split('元/')[0].split('-')[0];
						that.price2 = res.data.info.heartPrice.split('元/')[0].split('-')[1];
						that.weight = res.data.info.heartPrice.split('元/')[1]
						that.demand = res.data.info.otherRequire;
						that.phone = res.data.info.contactPhone;
					}
				})
			}
		}
	}
</script>
<style>
	.weight{
		text-align: center!important;
		width: 120px!important;
	}
	.weightText{
		font-size: 40px;
	}
</style>