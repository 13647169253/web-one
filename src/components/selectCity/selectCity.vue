<template>
  <div id="city" class="container">
    <div class="topBar">
      <MyHeader title="选择收件城市"/>
    </div>
    <div style="width:100%; height:.92rem;"></div>
    <div class="contain-in" style="margin-bottom: .2rem">
      <p class="titin titin-noborder">定位城市</p>
      <div style="padding-bottom: .2rem">
        <div class="act-button">
          <img style="width: 0.28rem; height: 0.28rem;vertical-align: middle; margin-top: -.04rem" src="../../assets/img/site.png" alt="">
          <span style="line-height: 0.28rem;height: 0.28rem; vertical-align: middle; margin-top: -0.08rem;display:inline-block">武汉</span>
        </div>
        <div class="refresh" @click="refreshChange">
          <img :style="{transition: refresh.transition,transform: refresh.transform}" src="../../assets/img/refresh.png" alt="">
          <!--  {} -->
        </div>
      </div>
      <p class="titin">热门城市</p>
      <div style="padding-bottom: .2rem">
        <div class="act-button hisotory-box" v-for="item in actBtn">
          {{item}}
        </div>
      </div>

    </div>
    <div class="block"></div>
    <div class="contain-in" style="padding:0">
      <p class="titin titin-pad">X (以X开头的字母)</p>
      <van-cell-group>
        <van-cell v-for="item in actBtn" class="search-item" value="" is-link>
          <template slot="title">
            <span class="van-cell-text">新洲</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="indexList" :style="{height:cityListheight,top:cityListTop}">
      <template v-for="(item,index) in zmCityInfos"><p @click="checkCity(index)">{{item}}</p></template>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@com/header"

  export default {
    components:{
      MyHeader
    },
    name: "search",
    data() {
      return {
        title: '选择城市',
        actBtn: ['北京', '北京', '北京', '北京', '北京', '北京', '北京', '北京', '北京', ],
        zmCityInfos: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        map: '搜索',
        // 刷新控制
        refresh:{
          transition: ".5s linear",
          transform: "rotate(0deg)",
          clickTimes: 1,
        },

        searchData: {
          value: ''
        }
      }
    },
    methods: {
      refreshChange(){
        var clickTimes = this.refresh.clickTimes
        this.refresh.transition = ".5s linear",
          this.refresh.transform = "rotate(" + 360 * clickTimes + "deg)"
        setTimeout(res => {
          clickTimes++
          this.refresh.clickTimes = clickTimes
        }, 1800)
      }
    },
    computed: {},
    created: function () {
    },
    mounted: function () {
    },

  }
</script>

<style scoped lang="less" type="text/less">
  .container{  	position: relative;


    .topBar{
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      z-index: 9999;
    }
    // 内容部分
    .contain-in{
      padding: 0 .3rem;
      // 搜索及历史
      .titin{
        color:#5A5A5B;
        font-size: .24rem;
        line-height: 3;
        position: relative;
        &.titin-pad{
          padding-left: .3rem;
          padding-right: .3rem;
          line-height: 1rem;
        }
        &.titin-pad::after,&.titin-noborder::after{display: none}
      }
      .titin::after{
        content: '';
        position: absolute;
        top: -.1rem;
        left: 0;
        width: 100%;
        height: .01rem;
        border-top: #E6E6E6 .01rem solid
      }
      .refresh{
        width: .58rem;
        height: .58rem;
        padding: .06rem;
        box-sizing: border-box;
        float: right;
        margin-top: .1rem;
        img{
          width: .58rem;
          height: .58rem;
          padding: .06rem;
        }
      }
      .act-button{
        width: 1.53rem;
        height: .54rem;
        line-height: .54rem;
        border-radius: .27rem;
        display: inline-block;
        background: #F1F0F6;
        color: #27262C;
        text-align: center;
        font-size: .24rem;
        margin: .1rem .128rem .2rem;
        text-indent: 0
      }
      .act-button:nth-of-type(4n+1){
        margin-left: 0;
      }
      .act-button:nth-of-type(4n){
        margin-right: 0;
      }
      .hisotory-box{
        .act-button{
          width: auto;
          padding: 0 .2rem;
          margin-left: 0;
          margin-right: .256rem;
        }
      }
      // 搜索结果
      .search-item{
        font-size: .24rem;
        padding: .2rem .3rem;
        width: 100%;
        span{
          color: #2D2D30
        }
        .van-cell::after {
          margin-right: 0.3rem;
        }
      }

    }
    .block{
      width: 100%;
      height: .2rem;
      background: #F1F0F6;
    }
  }
  .indexList {
    width: 0.31rem;
    text-align: center;
     height:11.8rem;
    font-family: PingFang-SC-Medium;
    font-size: 0.29333333333333333rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.44rem;
    letter-spacing: 0rem;
    color: #ffffff;
    /**/
    background-color: rgba(0,0,0,0.5);
    border-radius: 0.26666666666666666rem;
    z-index: 99999;
    float: right;
    right: 0.2rem;
    top: 2.6rem;
    word-wrap:break-word;
    word-break:break-all;
    position:fixed;
    p{
      margin-bottom: 17px;
    }
  }
</style>
<style>
  #city .van-cell:not(:last-child)::after{
    margin-right: .3rem
  }
</style>
