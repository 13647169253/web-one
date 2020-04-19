<template>
  <div class="realeVideo">
    <MyHeader title="发布视频" rightText=""/>
    <div class="main">
      <van-cell-group>
        <van-field
          v-model="message"
          type="textarea"
          placeholder="视频描述标题、能让更多人看到话题"
          rows="1"
          :autosize=true
          minHeight="40"
          class="inputTop"
        />
      </van-cell-group>
      <div class="formControl1">
        <span class="requiredStar">*</span><span class="formTitle">商品视频</span><br/><br/>
        <div v-if='isLightImg' class="imgControl color-item"
             :style="'background-image: url('+isLightImg+'); background-size:cover;'">
          <van-icon @click="delImg2" class="clearImg" name="clear" color="#3db5d4" size="25px"/>
        </div>
        <div class="uploadVideoBox imgControl color-item" v-for="(item,index) in fileList1">
          <video class="videos" :src="item"></video>
          <van-icon @click="delImg(index,1)" class="clearImg" name="clear" color="#3db5d4" size="25px"/>
        </div>
        <div class="uploadVideo">
          <van-uploader :after-read="afterRead" multiple accept="video/*">
            <div solt="default" class="uploadControl imgControl">
              <div>
                <van-icon name="plus" size='50px' color='gray'/>
              </div>
              <div>添加视频</div>
            </div>
          </van-uploader>
        </div>
        <br style='clear: both;'/>&nbsp;&nbsp;上传视频时，选择其中某一帧内容作为视频封面。
		<br />&nbsp;&nbsp;上传的视频时长请尽量不要超过1分钟。
      </div>


    </div>
    <div class="others"></div>
    <!-- 两端对齐 -->
    <van-row type="flex" justify="space-between" class="btn">
      <van-col span="12">
        <van-button size="large" square :style="'background-image: url('+btImg+');'" class="submitBtn"
          @click="reset">重新选择
        </van-button>
      </van-col>
      <van-col span="12">
        <van-button size="large" square :style="'background-image: url('+btImg+');'" class="submitBtn"
                    @click="public">发布视频
        </van-button>
      </van-col>

    </van-row>


    <div>
      <x-dialog v-model="notClose" hide-on-blur
                :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <center>
          <div class="tips" @click="notClose = false">
            <span>是否确认重新选择？</span>
            <van-button @click="notClose = false;$router.go(-1)" size="large" square
                        :style="'background-image: url('+btImg+');'" class="submitBtn2">确认
            </van-button>
          </div>
        </center>
        <br><br><br>
        <x-icon @click="notClose = false;" type="ios-close-outline" size="46px" style="fill:white;"></x-icon>
      </x-dialog>
      <x-dialog v-model="notClose2" hide-on-blur
                :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <center>
          <div class="tips" @click="notClose2 = false">
            <span>是否确认结束发布视频？</span>
            <van-button @click="notClose2 = false;$router.go(-1)" size="large" square
                        :style="'background-image: url('+btImg+');'" class="submitBtn2">确认
            </van-button>
          </div>
        </center>
        <br><br><br>
        <x-icon @click="notClose2 = false;" type="ios-close-outline" size="46px" style="fill:white;"></x-icon>
      </x-dialog>
      <x-dialog v-model="notClose3" hide-on-blur
                :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <center>
          <div class="tips" @click="notClose3 = false">
            <span>已上传成功，已储存到我的视频中</span>
            <van-button @click="notClose3 = false;$router.go(-1)" size="large" square
                        :style="'background-image: url('+btImg+');'" class="submitBtn2">确认
            </van-button>
          </div>
        </center>
        <br><br><br>
        <x-icon @click="notClose3 = false;" type="ios-close-outline" size="46px" style="fill:white;"></x-icon>
      </x-dialog>
    </div>
    <van-popup v-model="checkVideoCover" class="videoCover" :close-on-click-overlay="false">
      <font class="tip1">选择视频的封面图：</font>
      <center>
        <video id="myVideo" :src="checkVideoSrc" controls autoplay crossOrigin='anonymous'></video>
      </center>
      <br/>
      <div class="checkBox">
        <div @click="checkP(index)" :class="'p'+(isLight===index?' lightImg':'')"
             :style="'background-image: url('+item+'); background-size:cover;'"
             v-for="(item,index) in base64Arr"/>
        <!-- canvas的v-for循环不确定好数字的话，谷歌浏览器会报错Cannot read property 'getContext' of undefined，火狐浏览器会报错TypeError: $canvas[num] is undefined"。这里确定50 -->
        <canvas hidden v-for="(item,index) in 50" style="height: 150px;width: 150px;"></canvas>
      </div>
      <font class="tip2">从上方视频选择某一帧画面暂停，然后点击【截图】加入待选列表（最多50张候选），点击列表的一张截图并【确定】作为封面</font>
      <center>
        <van-button plain @click="screenshot" icon="video-o" type="primary">截图</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <van-button plain @click="checkOk" icon="passed">确定</van-button>
      </center>
    </van-popup>
    <x-dialog v-model="notClose" :hide-on-blur="false"
              :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
      <center>
        <div class="tips2">
          <van-image v-show="!uploadType" @click="" class="uploadImg" :src="uploadImg1"/>
          <van-image v-show="uploadType" @click="" class="uploadImg" :src="uploadImg2"/>
          <strong v-show="!uploadType">视频上传中（{{(uploadLoaded/uploadTotal*100).toFixed(2)}}%）</strong>
          <span v-show="!uploadType">请耐心等待</span>
          <strong v-show="uploadType">上传成功</strong>
          <span v-show="uploadType">已上传成功，已存储我的视频中</span>
          <div v-show="!uploadType" class="nullDiv2"></div>
          <van-button v-show="uploadType" @click="uploadType = false;notClose = false;checkVideoCover= true"
                      size="large" square
                      :style="'background-image: url('+btBgImg+');'" class="submitBtn5">选择视频封面
          </van-button>
        </div>
      </center>
      <br>
      <!-- <x-icon v-show="uploadType" @click="uploadType = false;notClose = false;checkVideoCover= true" type="ios-close-outline" size="46px" style="fill:white;"></x-icon> -->
    </x-dialog>
  </div>
</template>

<script>
  import MyHeader from "@com/header"
  import otherUtils from "@/utils/other"

  export default {
    name: "releaseVideo",
    data() {
      return {
        message: "",
        fileList: [],
        notClose: false,
        notClose2: false,
        notClose3: false,

        uploadImg1: require('@/assets/img/qt_05.png'),
        uploadImg2: require('@/assets/img/qt_04.png'),
        btImg: require('@/assets/img/20190619120234.png'),
        btBgImg: require('@/assets/img/20190619120234.png'),
        isLight: 0,
        isLightImg: "",
        checkVideoSrc: '',
        fileList1: [],
        checkVideoCover: false,
        base64Arr: [],
        uploadType: false,
        uploadTotal: 0,//上传视频总进度
        uploadLoaded: 0,//上传视频当前进度
        duration: ''
      }
    },
    components: {
      MyHeader
    },
    methods: {
      checkP(index) {
        let that = this;
        this.isLight = index;
      },
      delImg2() {
        this.isLight = 0;
        this.isLightImg = '';
        this.checkVideoCover = true;
      },
      //删除图片/视频
      delImg(index, num) {
        this['fileList' + num].splice(index, 1);
        if (num === 1) {
          this.base64Arr.splice(0, this.base64Arr.length);
          this.isLight = 0;
          this.isLightImg = '';
          this.checkVideoSrc = '';
        }
      },
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
		//获取视频时长
		// var fileurl = URL.createObjectURL(file);
		// var audioElement = new Audio(fileurl);
		// var duration;
		// audioElement.addEventListener("loadedmetadata", function (_event) {
		// 	duration = audioElement.duration;//单位：秒
		// 	if (duration > 60) {
		// 		canUpload = false;
		// 		that.$toast.fail('视频时长不得超过60秒')
		// 	}
		// })
		if (canUpload) {
			let fd = new FormData(); //创建form对象
			fd.append('fileName', file);
			let config = {
			  "Content-Type": "multipart/form-data"
			}
		  that.notClose = true;//显示上传进度
		  let xhr = that.$axios({
		    method: 'post',
		    url: '/file/uploadFile',
		    data: fd,
		    headers: {
		      "Content-Type": "multipart/form-data"
		    },
		    timeout: 0,
		    //上传进度
		    onUploadProgress: function (event) {
		      that.uploadTotal = event.total;
		      that.uploadLoaded = event.loaded;
		      //上传完成
		      if (that.uploadLoaded / that.uploadTotal == 1) {
		        that.uploadTotal = 0;
		        that.uploadLoaded = 0;
		        that.uploadType = true;
		        //that.notClose=false;//不显示上传进度
		        //that.checkVideoCover = true;//显示截图页面
		      }
		    }
		  })
		    .then(function (res) {
		      if (res.data.code == 100) {
		        that.fileList1.push(window.baseurl + '/file/readFile/' + res.data.info);
		        //方法一:加载服务器地址
		        that.checkVideoSrc = window.baseurl + '/file/readFile/' + res.data.info;
		        //that.checkVideoCover = true;//显示截图页面
		        that.$nextTick(function () {
		          //方法二:本地预览视频。设置视频的base64码（content是原生的file对象自带的属性）。
		          //that.checkVideoSrc = oldFile.content;
		        })
		      }
		    })
		    .catch(function (err) {
		      that.notClose = false;//不显示上传进度
		      that.$toast('上传失败，请重新尝试')
		    })
		}
      },
      //视频截图
      screenshot() {
        let that = this;
        let num = -1;
        let $canvas = document.getElementsByTagName('canvas');
        let $video = document.getElementById('myVideo');
        let $oldVideo = document.getElementsByClassName('videos'); //上传到服务器的原视频
        this.duration = $video.duration

        //截图10张

        // for(let i = $video.duration/10;i < $video.duration;i+=($video.duration/10)){
        //     $video.currentTime=i;//设置播放时间为某个时间点（单位：秒）
        //     $video.play();
        //     // setTimeout(function(){
        //     //     setImg();
        //     // },200)//等待加载200毫秒再截图
        // }
        setTimeout(function () {
          setImg();
        }, 200)//等待加载200毫秒再截图

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
            .then(function (res) {
              if (res.data.code == 100) {
                that.isLightImg = window.baseurl + '/file/readFile/' + res.data.info;
              }
              let $video = document.getElementById('myVideo');
              $video.pause();
              that.checkVideoCover = false;
              that.checkVideoCover = false;
            })
            .catch(function (err) {
              that.$toast('封面图上传失败，请重新【确定】上传');
            })
        } else {
          if (that.base64Arr.length > 0 && that.base64Arr[that.isLight].substring(0, 4) == 'http') {
            that.isLightImg = that.base64Arr[that.isLight];
            let $video = document.getElementById('myVideo');
            $video.pause();
            that.checkVideoCover = false;
            that.checkVideoCover = false;
          } else {
            that.$toast('你还没有选择视频封面')
          }
        }
      },


      // 发布视频

      public() {

        this.$axios.post('/appServiceVedio/add', this.$qs.stringify({
          videoTitle: this.message,  //标题
          duration: parseInt(this.duration),  //时长
          previewPicture: this.isLightImg.split('/file/readFile/')[1],  //预览图
          videoAddress: this.fileList1[0].split('/file/readFile/')[1],  //视频
        })).then(res => {
          if (res.data.code === 100) {
            this.$toast(res.data.info)
            var that = this;
            setTimeout(function () {
              that.$router.go(-1);
            },1000)
          }
          console.log(res);
        })
      },

      reset(){
        this.delImg(0,1)

      }

    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style.css";

  .inputTop {
    border: none;
    width: 100%;
    font-size: 0.4rem;
    border-bottom: var(--basebtom);
  }

  .inputTop /deep/ textarea {
    min-height: 235px;
  }

  .video {
    padding: 39px 15px;
    min-height: 300px;

    .top {
      min-height: 64px;

      .iconfont {
        font-size: 12px;
        color: red;
        float: left;
      }

      p {
        float: left;
        font-size: 28px;
        color: #000;
      }
    }
  }

  .main {
    background-color: #fff;
  }

  .realeVideo {
    background-color: #f6f5fb;
    height: 100%;
  }

  #app {
    background-color: #f6f5fb !important;
  }

  .banner {
    height: 723px;
  }

  .detailsContent {
    margin: 0 25px 0 25px;
  }

  .detailsContent .grayspan {
    color: gray;
    font-size: 30px;
  }

  .backImg {
    position: absolute;
    width: 68px;
    height: 68px;
    top: 20px;
    left: 32px;
  }

  .starImg {
    position: absolute;
    width: 68px;
    height: 68px;
    top: 20px;
    right: 129px;
  }

  .shareImg {
    position: absolute;
    width: 68px;
    height: 68px;
    top: 20px;
    right: 30px;
  }

  .buy {
    top: 4px;
    height: 39px;
    width: 70px;
  }

  .title {
    font-size: 40px;
    color: black
  }

  .splitDiv {
    margin-left: -25px !important;
    margin-right: -25px !important;
    height: 27px;
    background-color: #f6f5fa;
    margin-left: 0;
  }

  .van-cell__title span {
    font-weight: bold !important;
  }

  .info {
    position: relative;
    height: 160px;

    strong {
      float: left;
      color: black;
      font-size: 30px;
      margin-top: 47px;
    }

    .font {
      float: left;
    }

    .infoImg {
      float: left;

      img {
        height: 90px;
        width: 90px;
        margin: 35px 27px 35px 27px;
        border-radius: 45px;
      }
    }

    .bt {
      position: absolute;
      width: 187px;
      height: 61px;
      background-size: cover;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      border: 0px;
      border-radius: 45px;
      right: 0px;
      top: 49px;
      color: white;
    }
  }

  .read {
    margin: 29px;
    font-size: 30px;
    font-weight: bold;
    color: black;
  }

  .mainImg {
    height: 453px;
    margin-left: -25px !important;
    margin-right: -25px !important;
    display: block;
  }

  .submitBtn {
    height: 100px;
    background-size: cover;
    background-position: 50% 50%;
    color: white;
    border: none;
  }

  .submitBtn2 {
    height: 100px;
    background-size: cover;
    background-position: 50% 50%;
    color: white;
    margin-top: 125px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .tips {
    border-radius: 10px;
    color: #000000;
    background-color: white;
    height: 351px;
    width: 588px;
    padding-top: 126px;

    span {
      font-weight: bold;
      font-size: 40px;
    }
  }

  .btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>

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
    background: transparent !important;
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

  .uploadImg {
    width: 250px;
    height: 250px;
  }

  .submitBtn5 {
    height: 100px;
    width: 582px;
    background-size: cover;
    background-position: 50% 50%;
    margin-top: 80px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    .van-button__text {
      color: white !important;
    }
  }

  .tips2 {
    border-radius: 15px;
    width: 582px;
    background: white;

    strong {
      display: block;
      font-size: 36px;
    }

    span {
      color: gray;
      display: block;
      font-size: 28px;
    }

    .nullDiv2 {
      height: 82px;
    }
  }
</style>

