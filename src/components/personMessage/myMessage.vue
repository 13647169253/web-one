<template>
  <div id="appc">
    <div class="headerBc clearfix" :style="'background-image: url('+img+' );'">
      <div class="main ">
        <div class="title">
          <div class="userPhoto"
               v-if="backgroundImage"
               :style="'background-image: url(' +'http://47.94.37.25:3325'+'/file/readFile/'+ backgroundImage + '); background-size:cover; background-position:50% 50%; '"></div>
          <img v-else src="../../assets/img/login2.png" alt style="float: left">
          <div class="userInfo">
            <div class="name">{{name}}</div>
            <div class="phone">手机号:{{phone}}</div>
          </div>
          <div class="right" @click="toME">
            <van-icon name="arrow" size="40px"/>
          </div>
        </div>
        <router-link class="userLink oneLink" to="./releasevideo">
          <div class="ros">
            <div class="iconfont"
                 :style="'background-image: url(' + qt19 + '); background-size:cover; background-position:50% 50%; '"></div>
            <div class="titlement">发布视频</div>
            <van-icon name="arrow" class="iconRight"/>
          </div>
        </router-link>
        <router-link to="./myvideo">
          <div class="userLink">
            <div class="ros">
              <div class="iconfont"
                   :style="'background-image: url(' + qt13 + '); background-size:cover; background-position:50% 50%; '"></div>
              <div class="titlement">我的视频</div>
              <van-icon name="arrow" class="iconRight"/>
            </div>
          </div>
        </router-link>
        <div @click="$router.push({path:'/my?type=purchase'});">
          <div class="userLink">
            <div class="ros">
              <div class="iconfont"
                   :style="'background-image: url(' + qt18 + '); background-size:cover; background-position:50% 50%; '"></div>
              <div class="titlement">我的采购</div>
              <van-icon name="arrow" class="iconRight"/>
            </div>
          </div>
        </div>
        <router-link to="./my?type=sell">
          <div class="userLink">
            <div class="ros">
              <div class="iconfont"
                   :style="'background-image: url(' + qt20 + '); background-size:cover; background-position:50% 50%; '"></div>
              <div class="titlement">我的出售</div>
              <van-icon name="arrow" class="iconRight"/>
            </div>
          </div>
        </router-link>


        <router-link to="./mycollect">
          <div class="userLink">
            <div class="ros">
              <div class="iconfont"
                   :style="'background-image: url(' + qt15 + '); background-size:cover; background-position:50% 50%; '"></div>
              <div class="titlement">我的收藏</div>
              <van-icon name="arrow" class="iconRight"/>
            </div>
          </div>
        </router-link>
        <router-link to="./myattention">
          <div class="userLink">
            <div class="ros">
              <div class="iconfont"
                   :style="'background-image: url(' + qt14 + '); background-size:cover; background-position:50% 50%; '"></div>
              <div class="titlement">我的关注</div>
              <van-icon name="arrow" class="iconRight"/>
            </div>
          </div>
        </router-link>
        <router-link to="./mystore">
          <div class="userLink lastLink">
            <div class="ros">
              <div class="iconfont"
                   :style="'background-image: url(' + qt17 + '); background-size:cover; background-position:50% 50%; '"></div>
              <div class="titlement">我的主页</div>
              <van-icon name="arrow" class="iconRight"/>
            </div>
          </div>
        </router-link>
		<div class="userLink lastLink" @click="share">
			<div class="ros">
				<div class="iconfont"
						 :style="'background-image: url(' + shareImg + '); background-size:cover; background-position:50% 50%; '"></div>
				<div class="titlement">我的分享</div>
				<van-icon name="arrow" class="iconRight"/>
			</div>
		</div>

        <!-- <div class="others">
          <div class="userLink">
            <div class="ros">
              <div class="iconfont"
                   :style="'background-image: url(' + qt13 + '); background-size:cover; background-position:50% 50%; '"></div>
              <div class="titlement">去好评</div>
              <van-icon name="arrow" class="iconRight"/>
            </div>
          </div>
          <div class="userLink">
            <div class="ros">
              <div class="iconfont"
                   :style="'background-image: url(' + qt16 + '); background-size:cover; background-position:50% 50%; '"></div>
              <div class="titlement">推荐给朋友</div>
              <van-icon name="arrow" class="iconRight"/>
            </div>
          </div>
        </div> -->
      </div>
      <div class="othquit">
        <div class="quit" @click="quitLogin">退出登录</div>


      </div>
      <MyFooter :myActive="3"/>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@com/header"
  import MyFooter from "@com/footer"
  import store from '../../store'

  export default {
    name: "myMessage",
    data() {
      return {
        img: require("@/assets/img/qt_24.png"),
        backgroundImage:'',
        qt12: require("../../assets/img/qt_12.png"),
        qt13: require("../../assets/img/qt_13.png"),
        qt14: require("../../assets/img/qt_14.png"),
        qt15: require("../../assets/img/qt_15.png"),
        qt16: require("../../assets/img/qt_16.png"),
        qt17: require("../../assets/img/qt_17.png"),
        qt18: require("../../assets/img/0716buy.png"),
        qt19: require("../../assets/img/0716live.png"),
        qt20: require("../../assets/img/0716sell.png"),
		shareImg: require("../../assets/img/20190806105648.png"),
		appIcon:require("../../assets/img/xiancaotian.png"),
        username: this.$store.state.user.nickname,
        //password: "",
        name: "",
        id: "",
        phone: ""
      }
    },
    components: {
      MyHeader,
      MyFooter
    },
    methods: {
		share(){
			let that = this;
			let msg={};
			msg.type='web',
			msg.title='仙草田app下载',
			msg.thumbs=[that.appIcon],
			//msg.pictures=[that.logo];
			msg.content = '仙草田app下载';
			msg.href='http://mushroom.runfkj.com/download';
			plus.share.sendWithSystem(msg, function(){}, function(e){
				console.log(e.message)
			});
		},
      init() {
        if (localStorage.getItem("user")) {
          this.id = JSON.parse(localStorage.getItem("user")).id;
          console.log(JSON.parse(localStorage.getItem("user")));

        }
        this.$router.push({name: "myMessage"});
        console.log(123);
        this.$axios.post('/appServiceUser/userInfoDetail',this.$qs.stringify({
          userId: this.id
        })).then(res => {
          console.log(res);
          if (res.data.code === 100) {
            console.log(res.data);
            this.backgroundImage = res.data.info.headImage
            this.phone = res.data.info.mobile
            this.name = res.data.info.nickname
          }
        })
      },
      quitLogin() {
		//TODO：为了防止退出登录，token仍然在req请求头中携带！！！！！！！
      	this.$axios.defaults.headers.common['User-Token'] = '';
		
		
        this.$toast('您已退出登录');
        this.$store.commit("delUser")
        this.$router.replace('/');
      },
      toME() {
        this.$router.push({name: "personDetail"})
      },
	  toDownload(){
		  window.open(baseurl+'/download','_self')
	  }
    },
    created() {
      this.init()
      console.log(this.$store.state);
      if (localStorage.getItem("user") === null) {
        this.$router.push({name: "register"})
      } else {
      }
      // if (this.$store.state.user) {
      //   this.name = this.$store.state.user.nickname
      //   this.headImg = this.$store.state.user.headImage
      // }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  #appc {
    height: 100%;
    background: #f6f5fb;
  }

  .headerBc {
    /*background: url("../../assets/img/qt_24.png") no-repeat;*/
    height: 849px;
    background-size: cover;
  }

  .headerBc /deep/ .van-nav-bar {
    color: white;
    height: 117px;
    line-height: 117px;
    background-color: rgba(255, 255, 255, 0);
  }

  .headerBc /deep/ .van-nav-bar__text {
    color: white;
    font-size: 36px;
  }

  .headerBc /deep/ .van-nav-bar .van-icon {
    color: white;
    font-size: 36px;
  }

  .headerBc /deep/ .van-hairline--bottom::after {
    border: none;
  }

  .headerBc /deep/ .van-field__left-icon {
    margin-right: 29px;
    margin-top: 4px;
  }

  .headerBc /deep/ .van-field__left-icon {
    margin-right: 29px;
    margin-top: 4px;
  }

  .message /deep/ .van-button {
    padding: 14px 30px;
    height: 53px;
    background-color: #e7e6ec;
    color: #646369;
    font-size: 22px;
    border: none;
    border-radius: 29px;
    line-height: 30px;
  }

  .main {
    padding: 0 22px;

    .oneLink {
      margin-top: 30px;
      border-radius: 10px 10px 0 0;
    }

    .lastLink {
      border-radius: 0 0 10px 10px
    }

    .title {
      color: #fff;
      margin-top: 71px;
      min-height: 143px;

      .userPhoto {
        width: 145px;
        height: 145px;
        border-radius: 50%;
        float: left;
        margin-right: 21px;
        border: 2px solid #ffffff;
      }

      .smallPhoto {

      }

      .userInfo {
        padding-top: 23px;
        float: left;

        .name {
          font-size: 30px;
          margin-bottom: 21px;
        }

        .phone {
          color: #cdeff1;
          font-size: 27px;
        }
      }

      .right {
        float: right;
        padding-top: 43px;
      }
    }

    .userLink {
      background: #fff;
      position: relative;
      width: 100%;
      height: 96px;
      border-bottom: 1px solid #e7e6eb;
      font-size: 27px;
      color: #414046;
      display: flex;
      padding: 30px 20px;

      .ros {
        width: 95%;
        position: absolute;
        align-self: center;

        .iconfont {
          float: left;
          font-size: 49px;
          width: 38px;
          height: 40px;
          margin-right: 18px;
        }

        .titlement {
          float: left;
        }

        .iconRight {
          float: right;
        }
      }
    }
  }

  .others {
    margin-top: 23px;
  }

  .othquit {
    /*height: 100%;*/
    background: #f6f5fb;
    padding: 0 22px;
    padding-top: 18px;
  }

  .quit {
    height: 102px;
    line-height: 102px;
    color: #42a9e4;
    font-size: 30px;
    border-radius: 10px;
    text-align: center;
    background: #fff;
    font-weight: 550;
  }
</style>
