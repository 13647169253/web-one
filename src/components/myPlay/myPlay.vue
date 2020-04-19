<template>
  <div class="myPlay"
       :style="'background-image: url(' + commodity + '); background-size:cover; background-position:50% 50%; '">
    <div class="header">
      <van-row type="flex" justify="space-between">
        <van-col span="6">
          <van-icon name="arrow-left" size="46" class="icon"/>
        </van-col>
        <van-col span="6">
          <van-icon name="more-o" size="46" class="icon"/>
        </van-col>
      </van-row>
    </div>
    <div class="bottom">
      <van-row>
        <van-col span="12">
          <div class="userInfo clearfix">
            <div class="userImg"
                 :style="'background-image: url(' + commodity + '); background-size:cover; background-position:50% 50%; '"></div>
            <div class="userName">
              <div class="name">{{name}}</div>
              <div class="video">{{videoName}}</div>
            </div>
          </div>

        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="13">
          <div class="userMessage">
            <input type="text" placeholder="我也来说说">
          </div>
        </van-col>
        <van-col span="9"  class="botMessage">

          <div class="rightMessage">
            <div class="nums">{{nums2}}万</div>
            <div class="iconfont iconaixin"></div>
          </div>
          <div class="leftMessage">
            <div class="nums">{{nums1}}万</div>
            <div class="iconfont iconxinxi-copy"></div>
          </div>
        </van-col>
      </van-row>

    </div>
  </div>

</template>

<script>
  export default {
    name: "myPlay",
    data() {
      return {
        commodity: require('../../assets/img/commodity.jpg'),
        name: "卖灵芝的小女孩",
        videoName: "农业农场视频",
        nums1:"11.11",
        nums2:"11.11",
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
      }
    }

    .bottom {
      position: fixed;
      bottom: 50px;
      left: 34px;
      color: #fff;
      width: 100%;
      .userInfo {
        padding: 15px 23px 11px 23px;
        border-radius: 50px;
        letter-spacing: 3px;
        background: rgba(0, 0, 0, 0.5);
        margin-bottom: 50px;

        .userImg {
          float: left;
          width: 61px;
          height: 61px;
          border-radius: 50%;
          margin-top: 6px;
          margin-right: 10px;
        }

        .userName {
          float: left;

          .name {
            font-size: 27px;
            margin-bottom: 12px;
          }

          .video {
            font-size: 20px;
          }
        }
      }

      .userMessage {
        margin-top: 35px;
        input {
          border: none;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50px;
          padding: 20px 42px;
          width: 100%;
        }

        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
          color: #fff;
          font-size: 25px;

        }
      }

      .botMessage{
        margin-right: 23px!important;
        width: 38.5%!important;
        .nums{
          padding: 8px 11px;
          background: #fe3770;
          color: #fff;
          font-size: 16px;
          border-radius: 20px;
        }
        .iconfont{
          text-align: center;
          font-size: 48px;
        }
        .leftMessage{
          float: right;
          margin-right: 20px;
        }
        .rightMessage{
          float: right;
          margin-right: 33px;
        }
      }
    }
  }

  .header /deep/ .van-col--6 {
    text-align: center;
  }
</style>
