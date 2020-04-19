<template>
  <div id="app">
<!--    <van-row class="header">-->
<!--      <van-col span="2">-->
<!--        <van-icon name="arrow-left" class="leftImg" @click="onClickLeft"/>-->
<!--      </van-col>-->
<!--      <van-col span="19" class="midInput">-->
<!--        <div class="midMess">-->
<!--          <div class="iconfont iconfangdajing"></div>-->
<!--          <input type="text" placeholder="请输入搜索内容" @keyup="getFullname" v-model="sousuo">-->
<!--        </div>-->
<!--      </van-col>-->
<!--      <van-col span="1" class="rightImg" offset="1"-->
<!--               :style="'background-image: url(' + rightImg + '); background-size:cover; background-position:50% 50%; '"-->
<!--               @click.native="$router.push({path:'/releasevideo'});"-->
<!--      >-->
<!--      </van-col>-->
<!--    </van-row>-->

    <MyHeader title="我的视频" rightText=""/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <yd-infinitescroll :callback="loadList" ref="infinitescroll">

    <div  slot="list" class="main clearfix">
      <van-row class="messageVideo" v-for="(item,index) in videoList"

      >

        <van-col span="24" style="    height: 100%;">
          <div class="video"
               :key="index"
               style="    height: 100%;"
          >
            <div class="play"
                 :style="'background-image: url(' +baseUrl+'/file/readFile/'+ item.previewPicture + '); background-size:cover; background-position:50% 50%; '"
                 @click="videoGo(item)"
                 style="    height: 105%;width: 105%;"
            >

            </div>
            <div class="topLeft"
                 :style="'background-image: url(' + hash + '); background-size:cover; background-position:50% 50%; '"
                 @click="clearImg(item)"
            >
            </div>
            <div class="topRight">
              <div>视频</div>
              <p>{{item.pageviews}}观看</p>
            </div>
            <div class="botLeft">{{item.videoTitle}}</div>
            <div style="position:absolute;right: 5px;bottom: 5px;">
              <img :src="liveTag2" style='height: 13px;margin-bottom: -3px;' />
              <span style="color: white;bottom: 5px;">{{item.praisePoints}}</span>
            </div>
          </div>
        </van-col>

      </van-row>

    </div>
      </yd-infinitescroll>

    </van-pull-refresh>

  </div>
</template>

<script>
  import MyHeader from "@com/header"

  export default {
    name: "myVideo",
    data() {
      return {
        isLoading: false,
        rightImg: require('../../assets/img/qt_08.png'),
        hash: require('../../assets/img/hash.png'),
        like:require('../../assets/img/20190619095851.png'),
        liveTag2: require('@/assets/img/20190619095851.png'),

        videoList: [],
        baseUrl :window.baseurl,
        sousuo :'',
        loadingCommodity: true, //是否显示骨架屏
        listIndex1: 1
      }
    },
    components: {
      MyHeader
    },
    methods:{
      init(){
        return this.$axios.post('/appServiceVedio/listOwn',this.$qs.stringify({
          title:this.sousuo,
          pageNum:this.listIndex1,
          pageSize:10
        })).then(res=>{
          console.log(res);
          if(res.data.code===100){
          	this.videoList=[]
            this.videoList.push(...res.data.info.rows)
          }
          console.log(this.videoList[0]);
          return Promise.resolve(res)

        })
      },
      clearImg(item){
        console.log(item);

        this.$axios.post('/appServiceVedio/delete',this.$qs.stringify({
          id:item.id
        })).then(res=>{
          console.log(res);
          if(res.data.code===100){
            this.$toast("删除视频成功")
            this.init()
          }
        })
      },
      videoGo(item){
        this.$router.push({name:'video',params:item})
      },
      release(){
        this.$router.push({name:'releasevideo'})
      },
      onClickLeft(){
        console.log(123);
        this.$router.go(-1);
      },
      getFullname(){
        console.log(this.sousuo);
        this.init()
      },
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          this.listIndex1=1
          this.videoList=[]
          this.init()
        }, 500);
      },
      loadList() {
        let that = this;
        this.listIndex1 += 1;
        this.init()
          .then(res => {
            if (res.data.code == 100) {
              if (res.data.info.total > 0) {
                //加载完毕
                that.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
              } else {
                //没有更多数据
                this.listIndex1 -= 1;
                that.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
              }
            }
          })

      },

    },
    created() {
      this.init()
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style.css";
 #app{
   background: #f6f5fb;
   height: 100%;
 }
  .header {
    padding: 21px 23px;
    display: table;
    height: 100px;
    border-bottom: var(--basebtom);
    width: 100%;
    display: table;
    vertical-align: middle;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: #fff;
    .leftImg {
      font-size: 37px;
      margin-top: 15px;
      font-weight: 550;
    }

    .rightImg {
      width: 37px;
      height: 37px;
      font-size: 37px;
      margin-top: 15px;
    }

    .midInput {
      padding: 9px 90px;
      background-color: #ecebf1;
      border-radius: 30px;
      color: #79787e;
      position: relative;
      height: 65px;

      .midMess {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
      }

      .iconfont {
        float: left;
        font-size: 28px;

      }

      input {
        float: left;
        width: 80%;
        border: none;
        margin-top: 6px;
      }

      input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #79787e;
        font-size: 26px;
        text-align: left;
      }
    }
  }

  .main {
    padding: 27px 24px;
    background: #f6f5fb;
    height: 100%;
    padding-right: 0;
  }

  .messageVideo {
    background-color: #f6f5fb;
    height: 342px;
    border-radius: 15px;
    position: relative;
    padding: 16px 21px;
    float: left;
    margin-bottom: 25px;
    width: 49%;

  /*  &:nth-child(2n+1){*/
  /*padding-left: 0;*/
  /*  }*/
    .video {

      .topLeft {
        position: absolute;
        left: 21px;
        top: 26px;
        width: 47px;
        height: 47px;
      }

      .topRight {
        position: absolute;
        right: 18px;
        top: 26px;
        font-size: 20px;
        text-align: center;
        color: #fff;

        div {
          position: absolute;
          padding: 7px 12px;
          border-radius: 20px;
          right: 90px;
          top: 0px;
          width: 85px;
          z-index: 1;
          background: #ff7a4d;
        }

        p {
          position: absolute;
          right: -13px;
          top: 0px;
          border-radius: 20px;
          padding: 7px 10px 7px 30px;
          width: 137px;
          margin-left: 10px;
          background: rgba(0, 0, 0, 0.5);
        }
      }

      .botLeft {
        position: absolute;
        left: 50px;
        bottom: 21px;
        color: #fff;
        font-size: 26px;
        font-weight: 550;
      }

      .botRight {
        .icon {
        }

        p {
          position: absolute;
          right: 20px;
          bottom: 21px;
          font-size: 19px;
          color: #fff;
          letter-spacing: 2px;
        }
      }
    }
  }
</style>
