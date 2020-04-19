<template>
  <div id="myPurchase">
    <MyHeader title="我的采购"/>
    <van-tabs class="tabBox" v-model="active">
      <van-tab :title="item" v-for="item in titles">
        <div class="list van-hairline--bottom" v-for="item in 3">
          <van-row>
            <van-col span="6"
                     :style="'background-image: url(' + commodity + '); background-size:cover; background-position:50% 50%; '"  >
              <van-checkbox v-model="checked" class="check" checked-color="#2cbcb3"></van-checkbox>
              <div class="iconfont iconbofang"></div>
              <div class="time">{{time}}</div>
            </van-col>
            <van-col span="6"
                     :style="'background-image: url(' + commodity + '); background-size:cover; background-position:50% 50%; '"  >
              <van-checkbox v-model="checked" class="check"></van-checkbox>
              <div class="iconfont iconbofang"></div>
              <div class="time">{{time}}</div>
            </van-col>
            <van-col span="6"
                     :style="'background-image: url(' + commodity + '); background-size:cover; background-position:50% 50%; '"  >
              <van-checkbox v-model="checked" class="check"></van-checkbox>
              <div class="iconfont iconbofang"></div>
              <div class="time">{{time}}</div>
            </van-col>
            <van-col span="6"
                     :style="'background-image: url(' + commodity + '); background-size:cover; background-position:50% 50%; '"  >
              <van-checkbox v-model="checked" class="check"></van-checkbox>
              <div class="iconfont iconbofang"></div>
              <div class="time">{{time}}</div>
            </van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>
    <router-link to="/">
      <van-button size="large" square :style="'background-image: url('+btBgImg+');'" class="submitBtn">上传</van-button>
    </router-link>
  </div>
</template>

<script>
  import MyHeader from "@com/header"

  export default {
    components: {
      MyHeader
    },
    data() {
      return {
        titles: ['视频', '照片'],
        tipImg: require('@/assets/img/qt_03.png'),
        commodity: require('../../assets/img/commodity.jpg'),
        time:"01:20",
        active: 0,
        btBgImg: require('@/assets/img/20190619120234.png'),
        tagImg: require('@/assets/img/20190620175913.png'),
        checked:true
      }
    }
  }
</script>

<style lang="less">
  #myPurchase .list {

    /deep/ .van-col--6{
      height: 232px;
      width: 24.7%;
      margin-right: 2px;
      position: relative;
      &:last-child{
        margin-right: 0;
        width: 25%;
      }
      .check{
        position: absolute;
        right: 14px;
        top: 0;
      }
      /deep/ .van-icon-success{
        width: 44px;
        height: 44px;
        line-height: 44px;
      }
      /deep/ .van-checkbox__icon{
        font-size: 27px;
        height: auto;
      }
      .iconfont {
        position: absolute;
        left: 80px;
        color: #fff;

        bottom:7px;
      }
      .time{
        position: absolute;
        right: 14px;
        bottom: 11px;
        color: #fff;
        font-size: 15px;

      }
    }
  }

  .submitBtn {
    height: 100px;
    position: absolute;
    bottom: 0;
    background-size: cover;
    background-position: 50% 50%;
    color: white;
  }

  .tabBox .tag {
    width: 62px;
    height: 68px;
  }
</style>
