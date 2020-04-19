<template>
  <div id="app" style="background-color: #f6f5fb;">
    <van-nav-bar title="个人信息" :left-arrow="!noLeft" @click-left="onClickLeft"
               />
    <div class="mainMessage">
      <div class="headerUrl">
        <div class="left">头像</div>
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
<!--          <van-icon name="arrow" size="20px" class="icon" @click=""/>-->
        </div>
      </div>
      <div class="headerUrl">
        <div class="left">昵称</div>
        <div class="right">
          <div class="userName"
          >{{pageName}}
          </div>
          <van-icon name="arrow" size="20px" class="icon" @click="product(1)"/>
        </div>
      </div>
      <div class="headerUrl">
        <div class="left">手机号</div>
        <div class="right">
          <div class="userPhone"
          >{{contactPhone}}
          </div>
          <van-icon name="arrow" size="20px" class="icon" @click="product(2)"/>
        </div>
      </div>
    </div>
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
<!--    <div class="bot">-->
      <van-action-sheet
        v-model="showBot"
        :actions="actions"
        cancel-text="取消"
<!--        @cancel="onCancel"-->
<!--        @select="onSelect"-->
<!--      />-->
    </div>
</template>

<script>
  import MyHeader from "@com/header"
  import methods from './m/myStore2'

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
        backgroundImage:"",
        show:false,
        title:'',
        value:'',
        placeholder:'',
        userMessage:"",
        userPhoto:true,
        actions: [
          {name: '从相册中选取'},
          {name: '拍照'},
        ],
        showBot:false,
        id:'',
        fileList: [],
        go:'-1'
      }
    },
    components: {
      MyHeader
    },
    created() {
      this.init()
    },
    methods: methods
  }
</script>

<style scoped lang="less" type="text/less">
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
