<template>
  <div class="myAtt">
    <MyHeader title="我的关注"/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
      <yd-infinitescroll :callback="loadList" ref="infinitescroll">

    <div slot="list" class="maIn">
      <div class="message">
        <div class="list" v-for="(item,index) in nameList" :key="index">
          <div class="userPhoto"
               :style="'background-image: url(' +'http://47.94.37.25:3325'+'/file/readFile/' + item.headImage + '); background-size:cover; background-position:50% 50%; '"></div>
          <div class="userInfo">
            <div class="name">{{item.nickname}}</div>
            <div class="phone">{{item.mobile }}</div>
          </div>
          <router-link class="btn"
               :style="'background-image: url(' + btnBc + '); background-size:cover; background-position:50% 50%; '"
                :to="{
                path:'/farmer',
                query:{id:item.id
                }}"
          >查看主页
          </router-link>
        </div>
      </div>
    </div>
      </yd-infinitescroll>

    </van-pull-refresh>

  </div>
</template>

<script>
  import MyHeader from "@com/header"

  export default {
    name: "myAttention",
    data() {
      return {
        isLoading: false,
        loadingCommodity: true, //是否显示骨架屏
        listIndex1: 1,
        headImg: require("../../assets/img/qt_02.png"),
        btnBc: require("../../assets/img/btnBc.png"),
        nameList: []
      }
    },
    components: {
      MyHeader
    },
    created() {
      this.init()
    },
    methods:{
      init(){
        return this.$axios.post('appServiceUser/followList',this.$qs.stringify({
          pageNum:this.listIndex1,
          pageSize:"10"
        })).then(res=>{
          if (res.data.code == 100){
            this.nameList.push(...res.data.info.rows);
          }
          console.log(this.nameList);
          return Promise.resolve(res)

        })

      },
      onRefresh() {
        setTimeout(() => {
          this.isLoading = false;
          this.listIndex1=1

          this.nameList=[]
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

      }

    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style.css";

  .maIn{
    height: 100%;
  }
  .bot {
    height: 17rem;
    background-color: #f6f5fb;
    width: 100%;
  }

  .message {
    background-color: #fff;
    .list {
      min-height: 160px;
      vertical-align: middle;
      padding: 0 28px;
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      border-bottom: var(--basebtom);;

      .userPhoto {
        width: 83px;
        height: 83px;
        border-radius: 50%;
        margin-right: 30px;
      }

      .userInfo {
        .name {
          font-size: 26px;
          color: #010005;
          font-weight: 550;
          margin-bottom: 20px;
          margin-top: 9px;
        }

        .phone {
          color: #646369;
          font-size: 17px;
        }
      }

      .btn {
        position: absolute;
        right: 23px;
        padding: 15px 40px;
        font-size: 27px;
        color: #fff;
        border-radius: 45px;
      }
    }
  }
</style>
