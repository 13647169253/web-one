<template>
  <div class="myPlay"
       :style="'background-image: url(' + commodity + '); background-size:cover; background-position:50% 50%; '">
    <div class="header">
      <van-row type="flex" justify="space-between">
        <van-col span="6">
          <van-icon name="arrow-left" size="44" class="icon"/>
        </van-col>
        <van-col span="6">
          <!--<van-icon name="more-o" size="46" class="icon"/>-->
          <div class="iconfont iconxiangjizhuanhuan icon"></div>
          <div class="fan">翻转</div>
        </van-col>
      </van-row>
    </div>
    <div class="bottom">
      <van-row type="flex" justify="center">
        <van-col span="6" class="midImage":style="'background-image: url(' + video + '); background-size:cover; background-position:50% 50%; '"></van-col>
      </van-row>
      <div class="right">
        <div class="rightUrl":style="'background-image: url(' + commodity + '); background-size:cover; background-position:50% 50%; '"></div>
        <div class="rightBot">上传</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "publicVideo",
    data() {
      return {
        commodity: require('../../assets/img/commodity.jpg'),
        video: require('../../assets/img/video.png'),
        name: "卖灵芝的小女孩",
        videoName: "农业农场视频",
        nums1: "11.11",
        nums2: "11.11",
      }
    }
  }
</script>

<style scoped lang="less">
  .myPlay {
    height: 100%;
    width: 100%;
    position: fixed;

    .header {
      padding-top: 56px;

      .icon {
        color: #fff;
        font-weight: 100;
        text-align: center;
        font-size: 46px;
      }

      .iconfont {
        font-size: 76px;
        margin-top: -20px;
      }

      .fan {
        margin-top: -19px;
        color: #fff;

      }
    }

    .bottom {
      position: fixed;
      bottom: 46px;
      left: 0px;
      color: #fff;
      width: 100%;

      .midImage {
        width: 164px;
        height: 164px;
        border-radius: 50%;
      }

      .right {
        position: absolute;
        right: 132px;
        bottom: 40px;
        .rightUrl{
          width: 57px;
          height: 57px;
          border-radius: 12px;
          border: 1px solid #fff;
          margin-bottom: 10px;
        }
        .rightBot{
          margin-top: 15px;
          font-size: 25px;
        }
      }

    }
  }

  .header /deep/ .van-col--6 {
    text-align: center;
  }
</style>
