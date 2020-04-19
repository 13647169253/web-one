import Mock from 'mockjs'
import {
	devUrl
} from '../http'

//登录
Mock.mock(devUrl + '/appBanner/bannerList', 'post', {
	"code": 100,
	"msg": "请求成功",
	"info": [{
		"fgoodsId": 1,
		"jumpMode": 2,
		"sortIndex": 1,
		"banner": "www.baidu.com",
		"id": 1,
		"jumpUrl": "www.baidu.com"
	}]
})

//我要卖
Mock.mock(devUrl + '/appServiceSellGoods/list', 'post', {
	"code": 100,
	"msg": "请求成功",
	"info": {
		"total": 1,
		"rows": [{
			"unitPrice": "55.22",
			"productArea": "生产地",
			"isHavaVideo": 1,
			"previewPicture": "",
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"videoAddress": "视频地址",
			"contactPhone": "联系方式",
			"goodsName": "商品名称"
		}]
	}
})

//直播列表
Mock.mock(devUrl + '/appServiceLive/liveList', 'post', {
	"code": 100,
	"msg": "请求成功",
	"info": {
		"total": 1,
		"rows": [{
			"liveId": 1,
			"liveTitle": "1",
			"coverImage": "060568ad92ab916f391cb553eb5f8066",
			"liveUsers": 0,
			"headImage": "a19675add541213a731618965cf82836",
			"nickname": "昵称"
		}]
	}
})
//直播列表
Mock.mock(devUrl + '/appServiceBuyGoods/ownList', 'post', {
	"code": 100,
	"msg": "请求成功",
	"info": {
		"total": 9,
		"rows": [{
			"buyNorms": "3",
			"createTime": 1560889438000,
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"contactPhone": "联系方式",
			"goodsName": "商品名称",
			"heartPrice": "55256.11"
		}, {
			"buyNorms": "3",
			"createTime": 1560889438000,
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"contactPhone": "联系方式",
			"goodsName": "商品名称",
			"heartPrice": "55256.11"
		}, {
			"buyNorms": "3",
			"createTime": 1560889438000,
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"contactPhone": "联系方式",
			"goodsName": "商品名称",
			"heartPrice": "55256.11"
		}, {
			"buyNorms": "3",
			"createTime": 1560889438000,
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"contactPhone": "联系方式",
			"goodsName": "商品名称",
			"heartPrice": "55256.11"
		}, {
			"buyNorms": "3",
			"createTime": 1560889438000,
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"contactPhone": "联系方式",
			"goodsName": "商品名称",
			"heartPrice": "55256.11"
		}, {
			"buyNorms": "3",
			"createTime": 1560889438000,
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"contactPhone": "联系方式",
			"goodsName": "商品名称",
			"heartPrice": "55256.11"
		}, {
			"buyNorms": "3",
			"createTime": 1560889438000,
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"contactPhone": "联系方式",
			"goodsName": "商品名称",
			"heartPrice": "55256.11"
		}, {
			"buyNorms": "3",
			"createTime": 1560889438000,
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"contactPhone": "联系方式",
			"goodsName": "商品名称",
			"heartPrice": "55256.11"
		}, {
			"buyNorms": "3",
			"createTime": 1560889438000,
			"logo": "a19675add541213a731618965cf82836",
			"id": 1,
			"contactPhone": "联系方式",
			"goodsName": "商品名称",
			"heartPrice": "55256.11"
		}]
	}
})
//视频动态列表
Mock.mock(devUrl + '/appServiceUser/videoList', 'post', {
	"code": 100,
	"msg": "请求成功",
	"info": {
		"total": 10,
		"rows": [{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 1,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		},{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 2,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		},{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 3,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		},{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 4,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		},{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 5,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		},{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 6,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		},{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 7,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		},{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 8,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		},{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 9,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		},{
			"previewPicture": "a19675add541213a731618965cf82836",
			"id": 10,
			"videoAddress": "a19675add541213a731618965cf82836",
			"praisePoints": 12
		}]
	}
})
