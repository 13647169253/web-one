/*
 * 返回值：返回值为字符串，返回值不为''时代表没通过效验
 * 逻辑：错误优先原则，通过效验往下继续运行，否则终止
 * 效验对象：页面上用到的data里的属性，而不是最终提交的值parameters
 */
export function validation(obj){
	if(isNull(obj.commodityName)){
		return '商品名称不能为空'
	}
	if(isNull(obj.commodityExplain)){
		return '商品说明不能为空'
	}
	if(isNull(obj.producingArea)){
		return '生产产地不能为空'
	}
	if(isNull(obj.weight)){
		return '价格单位不能为空'
	}
	if(isNull(obj.number)){
		return '起订数量不能为空'
	}
	// if(obj.fileList1.length<=0){
	// 	return '商品视频必须上传一个'
	// }
	// if(isNull(obj.isLightImg)){
	// 	return '商品视频的封面图不能为空'
	// }
	if(obj.fileList2.length<=0){
		return 'banner图至少上传一张'
	}
	if(obj.fileList3.length<=0){
		return '详情图至少上传一张'
	}
	if(isNull(obj.phone)){
		return '联系方式不能为空'
	}
	return ''
}
function isNull(value){
	if(value === null || value === '' || value === undefined){
		return true;
	}else{
		return false
	}
}