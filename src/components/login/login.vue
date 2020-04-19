<template>
  <div class="headerBc"  :style="'background-image: url('+img+' );'" >
    <MyHeader title="" rightText="注册"/>
    <div class="main">
      <div class="login">手机号登录</div>

      <div class="mainMess">
        <div class="message">
          <van-cell-group>
            <van-field
              left-icon="phone-circle-o"
              v-model="username"
              clearable
              placeholder="请输入用户名"
              @click-right-icon="$toast('question')"
            />

            <van-field
              left-icon="bag-o"
              v-model="password"
              placeholder="请输入验证码"
            >
              <van-button slot="button" size="small" type="primary">60秒后重新获取</van-button>
            </van-field>
          </van-cell-group>
        </div>
        <div class="btn" @click="login">登录</div>
        <div class="others">使用账号密码登录</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@com/header"

  export default {
    name: "login",
    data() {
      return {
        img: require("@/assets/img/qt_24.png"),
        username:"",
        password:"",
      }
    },
    components: {
      MyHeader
    },
    methods:{
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .headerBc {
    height:849px;
  }
  .headerBc /deep/ .van-nav-bar {
    /* position: relative; */
    color: white;
    height: 117px;
    line-height: 117px;
    background-color: rgba(255, 255, 255, 0);
  }
  .headerBc /deep/ .van-nav-bar__text{
    color: white;
    font-size: 36px;
  }
  .headerBc /deep/ .van-nav-bar .van-icon{
    color: white;
    font-size: 36px;
  }
  .headerBc /deep/ .van-hairline--bottom::after{
    border: none;
  }
  .headerBc /deep/ .van-field__left-icon{
    margin-right: 29px;
    margin-top: 4px;
  }
  .message /deep/ .van-button{
    padding: 14px 30px;
    height: 53px;
    background-color: #e7e6ec;
    color: #646369;
    font-size: 22px;
    border: none;
    border-radius: 44%;
    line-height: 30px;
  }
   .main{
    padding: 0 30px;
     /*background-color: #ffffff;*/
  .mainMess{
    background-color: #ffffff;
  }
     .login{
      font-size: 36px;
      color: #fff;
      font-weight: 550;
    }
    .message{
    }
     .btn{
       background: url("../../assets/img/btnBc.png") no-repeat;
       width: 100%;
       padding: 33px 0;
       text-align: center;
       margin-top: 50px;
       font-size: 35px;
       color: #fff;
       border-radius: 13px;
       width: 90%;
       margin-left: 5%;
     }
     .others{
       text-align: center;
       color: #8b8a8f;
       font-size: 30px;
       margin-top: 1rem;
       height: 5rem;

     }
  }
</style>
