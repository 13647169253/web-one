<template>
  <div>
    <MyHeader title="店铺管理" rightText=""/>
    <div class="message">
      <div class="title">
        <div class="titlebtn"
             :style="'background-image: url(' + goodsmana + '); background-size:cover; background-position:50% 50%; '"></div>
        <div class="titleMain">商品管理</div>
      </div>
      <van-row class="publish" >
        <van-col span="3">
          <div class="pubtn"
               :style="'background-image: url(' + qt_06 + '); background-size:cover; background-position:50% 50%; '"></div>
        </van-col>
        <van-col span="16" class="vanmid" >
          <div class="midtitle">发布视频</div>
          <div class="midmiss">发布商品可以有商品视频吸引更多客户</div>
        </van-col>
        <van-col span="4"  offset="1" >
          <router-link
                class="puright"
               :style="'background-image: url(' + btnBc + '); background-size:cover; background-position:50% 50%; '"
                :to="{name:'releasevideo'}"
          >发布</router-link>
        </van-col>
      </van-row>
      <van-row class="publish">
        <van-col span="3">
          <div class="pubtn"
               :style="'background-image: url(' + qt_07 + '); background-size:cover; background-position:50% 50%; '"></div>
        </van-col>
        <van-col span="16" class="vanmid" >
          <div class="midtitle">发布视频</div>
          <div class="midmiss">发布社交视频可以有更多人关注你</div>
        </van-col>
        <van-col span="4"  offset="1">
          <router-link
               class="puright"
               :style="'background-image: url(' + btnBc + '); background-size:cover; background-position:50% 50%; '"
               :to="{name:'releaseVideo'}"
          >发布</router-link>
        </van-col>
      </van-row>
      <van-row class="publish">
        <van-col span="3">
          <div class="pubtn"
               :style="'background-image: url(' + qt_08 + '); background-size:cover; background-position:50% 50%; '"></div>
        </van-col>
        <van-col span="16" class="vanmid" >
          <div class="midtitle">发布直播</div>
          <div class="midmiss">发布直播还可以选择商品增加商品人气</div>
        </van-col>
        <van-col span="4"  offset="1">
          <router-link class="puright"
               :style="'background-image: url(' + btnBc + '); background-size:cover; background-position:50% 50%; '"
               :to="{name:'live'}"
          >发布</router-link>
        </van-col>
      </van-row>
    </div>
    <div class="jiange"></div>
    <div class="message">
      <div class="title">
        <div class="titlebtn"
             :style="'background-image: url(' + goodsmana + '); background-size:cover; background-position:50% 50%; '"></div>
        <div class="titleMain">发布管理</div>
      </div>
      <van-row class="publish">
        <van-col span="3">
          <div class="pubtn"
               :style="'background-image: url(' + qt_10 + '); background-size:cover; background-position:50% 50%; '"></div>
        </van-col>
        <van-col span="16" class="vanmid" >
          <div class="midtitle">我的在售管理</div>
          <div class="midmiss">我的在售商品的价格、上架下架调整等</div>
        </van-col>
        <van-col span="4"  offset="1">
          <router-link class="puright"
               :style="'background-image: url(' + btnBc2 + '); background-size:cover; background-position:50% 50%; '"
               :to="{name:'releaselive'}"
          >管理</router-link>
        </van-col>
      </van-row>
      <van-row class="publish">
        <van-col span="3">
          <div class="pubtn"
               :style="'background-image: url(' + qt_09 + '); background-size:cover; background-position:50% 50%; '"></div>
        </van-col>
        <van-col span="16" class="vanmid" >
          <div class="midtitle">我的采购管理</div>
          <div class="midmiss">发布商品可以有商品视频吸引更多客户</div>
        </van-col>
        <van-col span="4"  offset="1">
          <div class="puright"
               :style="'background-image: url(' + btnBc2 + '); background-size:cover; background-position:50% 50%; '"
               :to="{name:'releaselive'}"
          >管理</div>
        </van-col>
      </van-row>
      <van-row class="publish">
        <van-col span="3">
          <div class="pubtn"
               :style="'background-image: url(' + qt_11 + '); background-size:cover; background-position:50% 50%; '"></div>
        </van-col>
        <van-col span="16" class="vanmid" >
          <div class="midtitle">我发布的视频</div>
          <div class="midmiss">发布商品可以有商品视频吸引更多客户</div>
        </van-col>
        <van-col span="4"  offset="1">
          <div class="puright"
               :style="'background-image: url(' + btnBc2 + '); background-size:cover; background-position:50% 50%; '">管理</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@com/header"

  export default {
    name: "goodsManagement",
    data() {
      return {
        goodsmana: require("../../assets/img/goodsmana.png"),
        qt_06: require("../../assets/img/qt_06.png"),
        qt_07: require("../../assets/img/qt_07.png"),
        qt_08: require("../../assets/img/qt_08.png"),
        qt_09: require("../../assets/img/qt_09.png"),
        qt_10: require("../../assets/img/qt_10.png"),
        qt_11: require("../../assets/img/qt_11.png"),
        btnBc: require("../../assets/img/man3.png"),
        btnBc2: require("../../assets/img/mana2.png"),
      }
    },
    components: {
      MyHeader
    },
    methods:{
      router(name){
        console.log(123);
        this.$router.push({name: name})
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style.css";

  .message{
    padding: 0 30px;
    .title {
      border-bottom: var(--basebtom);
      display: flex;
      align-items: center;
      height: 86px;
      font-size: 27px;
      color: #000000;

      .titlebtn {
        width: 31px;
        height: 27px;
        float: left;
        margin-right: 20px;
      }

      .titleMain {
        font-weight: 550;
        margin-top: 2px;
        letter-spacing: 2px;
      }
    }

    .publish{
      padding: 49px 0;
      border-bottom: var(--basebtom);

      .pubtn{
        width: 69px;
        height: 69px;
        border-radius: 50%;
      }
      .vanmid{
        letter-spacing: 2px;
        .midtitle{
          font-size: 26px;
          font-weight: 550;
        }
        .midmiss{
          font-size:22px;
          color: #646368;
        }
      }
      .puright{
        margin-top: 3px;
        padding: 6px 28px;
        color: #fff;
        font-size: 29px;
        border-radius: 35px;
        text-align: center;
      }
    }

  }
  .jiange{
    width: 100%;
    height: 22px;
    background-color: #f6f5fb;
    border-bottom: var(--basebtom);
  }
</style>
