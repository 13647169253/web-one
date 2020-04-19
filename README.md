不需要的包
video.js
rtmp-streamer

web端和app端样式不一致的唯一解决方式就是!important，加权重

不要在{{}}里用变量的split之类的方法动态渲染。否则会报错，数据在加到data里之前就要确定最终数据。
比如：
×   {{a.split(',')[0]}}
√   {{a}}     data(){a:b..split(',')[0]}

用HbuilderX打包，不要用Hbuilder。
打包的app配置的"targetSdkVersion" >= 23 时不会询问用户是否开启闪光灯和麦克风之类的权限。
如果写上【plus.android.requestPermissions(['android.permission.CAMERA','android.permission.RECORD_AUDIO'], function(){}, function(){});】这行代码则都可以用HbuilderX打包，因为这代码意思是主动请求摄像头和音频权限（当然也可以加上其他权限）。不过Hbuilder不支持这个代码!
所以如果用Hbuilder打包，"targetSdkVersion"最好不要改，用默认的21，那样请求任何权限都是会正常弹窗询问用户的。
不过应用市场对这个"targetSdkVersion"有要求，至少26，所以最终非改不可。

当某个子元素的宽度长到可以滚动时，如果此时整个屏幕的宽度变长，导致往最右边滑动出现白色侧边。就在出现滚动条的父元素上加上  style="overflow-x: hidden;" 

注释掉：（为了确保css样式在打包后没有出现“没效果”的情况）
new OptimizeCSSPlugin({
  cssProcessorOptions: config.build.productionSourceMap
	? { safe: true, map: { inline: false } }
	: { safe: true }
})

写原生的app就不应该使用cdn资源！！否则离线时用到的图标和字体会显示空方框！

报错“ Uncaught SyntaxError: Use of const in strict mode.”就使用【babel-preset-es2015】而不是【babel-preset-env】,即使用
【.babelrc】 的 "presets": [ ["es2015"] ]
因为【babel-preset-env】没有真正的把es6语法编译成es5

报错“ Uncaught SyntaxError: Unexpected strict mode reserved word.”就去掉严格模式,即使用
【.babelrc】 的 "plugins": ["transform-remove-strict-mode"]
注意：使用【"babel-plugin-transform-remove-strict-mode"】则plugins里不能有其他插件。


（2019年7月30日09:13:19）
1.应“http://www.taf.net.cn/News_detail.aspx?_NOTICE_ID=231”所述要求，app的targetSdkVersion已兼容至26及以上版本，不会影响直播等核心功能。满足大部分应用市场上架要求。

2.app向下兼容至5.x，大部分安卓5.x及以上系统可正常使用，不会出现启动后白屏。（es6=>es5处理）

3.分享功能已新增“系统分享”，去掉“分享至微信好友”（“系统分享”一般包含此功能,而且plus的此功能在Hbuilder/HbuilderX打包时都不可用。）
去掉“分享至微信朋友圈”（plus的此功能在用HbuilderX打包时不可用）

4.“版本更新提示”不会影响正在使用app的用户，下载新版本时可看到下载进度，并下载后自动弹出安装页面。


压缩图片的处理会导致ios端的webview上传控件选择文件时报错“未选择任何文件”

plus.pusher.close();尽量不要用。因为用了这个方法，下次再创建pusher去推流，可能推流异常，导致拉流看不到画面。

ios上，用plus.webview打开一个地址，如果地址较长，会打不开。所以我用window.p来传参。