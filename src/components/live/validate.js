/*
 * 返回值：返回值为字符串，返回值不为''时代表没通过效验
 * 逻辑：错误优先原则，通过效验往下继续运行，否则终止
 * 效验对象：页面上用到的data里的属性，而不是最终提交的值parameters
 */
export function validation(obj){
	if(isNull(obj.liveTitle)){
		return '直播标题不能为空'
	}
	if(obj.coverImage.length<=0){
		return '直播标题首屏图没有选择'
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