/*
 * 返回值：返回值为字符串，返回值不为''时代表没通过效验
 * 逻辑：错误优先原则，通过效验往下继续运行，否则终止
 * 效验对象：页面上用到的data里的属性，而不是最终提交的值parameters
 */
export function validation(obj){
	if(obj.fileList1.length<=0){
		return '采购照片至少上传一张'
	}
	if(isNull(obj.goodsName)){
		return '采购名称不能为空'
	}
	if(isNull(obj.specifications)){
		return '规格要求不能为空'
	}
	if(!(/^\d+(\.\d+)?$/.test(obj.purchaseNum))){
		return '采购数量不能为空且只能是数字'
	}
	if(isNull(obj.producingArea)){
		return '生产产地不能为空'
	}
	if(isNull(obj.price1) || isNull(obj.price2)){
		return '心理价位不能为空'
	}
	if(isNull(obj.weight)){
		return '心理价位的单位不能为空'
	}
	if(!(/^\d+(\.\d+)?$/.test(obj.price1)) || !(/^\d+(\.\d+)?$/.test(obj.price2))){
		return '心理价位不能为空且只能是数字，可以带小数点'
	}
	if(obj.fileList2.length<=0){
		return '采购详情图至少上传一张'
	}
	if(!(/^1[3456789]\d{9}$/.test(obj.phone))){
		return '手机号不能为空且格式不能有误'
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