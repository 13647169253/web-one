<template>
  <div id="app" style="background-color: #f6f5fb;">
    <MyHeader title="我的店铺" rightText=""/>
    <div class="mainMessage">
      <div class="headerUrl">
        <div class="left">店铺背景图</div>
        <div class="right">
          <div class="userPhoto"
               v-if="userPhoto"
               :style="'background-image: url(' +'http://47.94.37.25:3325'+'/file/readFile/'  + backgroundImage + '); background-size:cover; background-position:50% 50%; '">

          </div>
          <van-uploader
            v-model="fileList"
            :max-count="1"
            multiple
            class="loader"
            :after-read	="afterRead"
          />
        </div>
      </div>
      <div class="headerUrl">
        <div class="left">店铺名称</div>
        <div class="right">
          <div class="userName"
          >{{pageName}}
          </div>
          <van-icon name="arrow" size="20px" class="icon" @click="product(1)"/>
        </div>
      </div>
      <div class="headerUrl">
        <div class="left">联系方式</div>
        <div class="right">
          <div class="userPhone"
          >{{contactPhone}}
          </div>
          <van-icon name="arrow" size="20px" class="icon" @click="product(2)"/>
        </div>
      </div>
      <div class="headerUrl">
        <div class="left">微信号</div>
        <div class="right">
          <div class="userPhone"
          >{{wexNo}}
          </div>
          <van-icon name="arrow" size="20px" class="icon" @click="product(3)"/>
        </div>
      </div>
      <div class="headerUrl">
        <div class="left">我的地址</div>
        <div class="right">
          <div class="userPhone"
          >{{address}}
          </div>
          <van-icon name="arrow" size="20px" class="icon" @click="show2= true"/>
        </div>
      </div>
      <div class="headerUrl">
        <div class="left">主要产品</div>
        <div class="right">
          <div class="userPhone"
          >{{mainProduct}}
          </div>
          <van-icon name="arrow" size="20px" class="icon" @click="product(5)"/>
        </div>
      </div>
    </div>
    <van-popup
      v-model="show2"
      position="bottom"
    >
      <van-area
        :area-list="areaList"
                value="110101"
        @change="changeCity"
        @cancel="cancel"
        @confirm="confirm"
      />

    </van-popup>
    <van-dialog
      v-model="show"
      :title="title"
      show-cancel-button
      :beforeClose="beforeClose"
    >
      <van-cell-group>
        <van-field v-model="userMessage" :placeholder="placeholder" />
      </van-cell-group>
    </van-dialog>
<!--      <van-action-sheet-->
<!--        v-model="showBot"-->
<!--        :actions="actions"-->
<!--        cancel-text="取消"-->
<!--        @cancel="onCancel"-->
<!--        @select="onSelect"-->
<!--      />-->

    </div>
</template>

<script>
  import MyHeader from "@com/header"
  import methods from './m/myStore'
  import area from './m/area'
  export default {
    name: "personDetail",
    data() {
      return {
        headImg: require("../../assets/img/qt_02.png"),
        pageName:"",
        contactPhone:"",
        wexNo:"",
        address:"",
        mainProduct:"",
        show:false,
        show2:false,
        title:'',
        value:'',
        placeholder:'',
        backgroundImage:'',
        userMessage:"",
        actions: [
          {name: '从相册中选取'},
          {name: '拍照'},
        ],
        showBot:false,
        userPhoto:true,
        id:'',
        fileList: [],
        areaList: {}
      }
    },
    components: {
      MyHeader
    },
    created() {
      this.init()
      this.areaList= area.areaList

    },
    methods: methods
  }
</script>

<style scoped lang="less" type="text/less">

  .show2{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);

  }

  .bot {
    height: 17rem;
    background-color: #f6f5fb;
    width: 100%;
  }

  .mainMessage {
    /*margin-top: 32px;*/
    background: #fff;

    .headerUrl {
      padding: 0 28px;
      height: 98px;
      line-height: 98px;
      width: 100%;
      display: table;
      vertical-align: middle;
      border-top: 1px solid #e7e6eb;

      &:last-child {
        border-bottom: 1px solid #e7e6eb;
      }

      .left {
        font-size: 28px;
        color: #000;
        float: left;
      }

      .right {
        float: right;
        line-height: 98px;
        height: 98px;

        .icon {
          vertical-align: middle;
        }

        .userPhoto {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          float: left;
          margin-top: 16px;
          margin-right: 10px;
        }
        .loader{
          margin-top: 16px;

        }
      }
    }

    .userName, .userPhone {
      float: left;
    }
  }

  .bot /deep/ .van-popup {
    padding: 0 17px;
    width: 100%;
    border-radius: 23px;
    color: #2087fd;
    font-weight: 550;
  }

  .bot /deep/ .van-hairline--top{
    color: #2087fd;
    font-weight: 550;
    &:first-child{
      border-radius: 23px 23px 0 0;
    }
    &:nth-child(2){
      border-radius:0 0 23px 23px ;
    }
  }

  .bot /deep/ .van-action-sheet__cancel {
    margin-top: 16px;
    margin-bottom: 21px;
    border-radius: 23px;
    color: #2087fd;
    font-weight: 550;
  }

  .bot /deep/ .van-action-sheet__cancel::before {
    display: block;
    height: 0px;
    background-color: #4c4c4c;
    content: ' ';
  }
  .loader{
    width: 1rem;
  }
  .loader /deep/ .van-uploader__upload{
    height: 0.8rem;
  }
  .loader /deep/.van-uploader__preview-image{
    width: 1rem;
    height:1rem;
  }
</style>

