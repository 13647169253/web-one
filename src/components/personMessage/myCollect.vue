<template>
  <div id="app">
    <MyHeader title="我的收藏"/>


    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <yd-infinitescroll :callback="loadList" ref="infinitescroll">
        <div slot="list" style="overflow-x: hidden;">
          <div class="list" v-for="(item,index) in goodsList" :key="index" @click="details(item)">

            <van-row>
              <van-col span="4" class="listLeft">
                <div class="userPhoto"
                     :style="'background-image: url(' +baseurl+'/file/readFile/' + item.logo + '); background-size:cover; background-position:50% 50%; '"></div>
              </van-col>
              <van-col span="15" offset="3">
                <div class="goodsInfo">
                  <div class="sale"
                       :style="'background-image: url(' + (item.goodsType==1?out:buy) + '); background-size:cover; background-position:50% 50%; '"></div>
                  <div class="name">{{item.goodsName}}</div>
                </div>
                <div class="price">
                  <p>采购价为:</p>
                  <div class="iconfont iconfl-renminbi icon1"></div>
<!--                  {{item.price.substring(0, 2)}}-->
                  <div class="icon4">{{parseInt(item.price)}}.</div>
                  <div class="icon3">00</div>
                  <!--<div class="icon4">{{item.highprice}}.</div>-->
                  <!--<div class="iconfont iconfl-renminbi icon1">00/</div>-->
                  <div class="icon3 icon5">/斤</div>
                </div>

              </van-col>
            </van-row>

          </div>

        </div>

      </yd-infinitescroll>
    </van-pull-refresh>

    <!--    <div class="bot"></div>-->

  </div>
</template>

<script>
  import MyHeader from "@com/header"

  export default {
    name: "myCollect",
    data() {
      return {
        baseurl: window.baseurl,

        out: require("../../assets/img/out.png"),
        buy: require("../../assets/img/buy.png"),
        goodsList: [],
        baseUrl: "http://47.94.37.25:3325",
        count: 0,
        isLoading: false,
        loadingCommodity: true, //是否显示骨架屏
        listIndex1: 1
      }
    },
    components: {
      MyHeader
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        return this.$axios.post('appServiceUser/collectList', this.$qs.stringify({
          pageNum: this.listIndex1,
          pageSize: "10"
        })).then(res => {
          if (res.data.code == 100) {
            this.goodsList.push(...res.data.info.rows);
          }
          console.log(this.goodsList);

          return Promise.resolve(res)
        })
      },
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          this.goodsList=[]
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
      details(item){
        console.log(item);
        var state=''
        if (item.goodsType==2){
          item.goodsType="purchase"
        }
        if (item.goodsType==1){
          item.goodsType="sell"
        }

        this.$router.push({name:'dDetails',query:{
            id:item.id,
            state:0,
            type:item.goodsType,
            isIndex:true
          }})

      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style.css";

  #app {
    background-color: #f6f5fb;

  }

  .bot {
    height: 17rem;
    background-color: #f6f5fb;
    width: 100%;
  }

  .list {
    padding: 38px 24px;
    width: 100%;
    border-bottom: var(--basebtom);;
    background: #fff;

    .listLeft {
      /*margin-right:60px;*/
    }

    .userPhoto {
      width: 140px;
      height: 140px;
      border-radius: 10px;
      float: left;
    }

    .goodsInfo {
      position: relative;

      .sale {
        width: 68px;
        height: 34px;
        border-radius: 5px;
        position: absolute;
        left: 0px;
        top: 0;
      }

      .name {
        display: inline-block;
        text-indent: 85px;
        /*line-height: 48px;*/
        font-weight: 550;
        color: #212025;
        margin-top: -2px;
        min-height: 106px;
      }


    }
  }

  .price {
    p {
      color: #8b8a8f;
      font-size: 26px;
      float: left;
    }

    div {
      color: #fe1f20;
      float: left;
    }

    .icon1 {
      font-size: 30px;
    }

    .icon4 {
      font-weight: 550;
      font-size: 36px;
      margin-top: -10px;
    }

    .icon3 {
      margin-top: 2px;
      font-size: 26px;

    }

    .icon5 {
      color: #c5c5c7;
    }
  }
</style>
