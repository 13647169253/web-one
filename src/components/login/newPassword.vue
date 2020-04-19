<template>
  <div class="headerBc"  :style="'background-image: url('+img+' );'" >
    <MyHeader title="" rightText=""/>
    <div class="main">
      <div class="login">设置新密码</div>

      <div class="mainMess">
        <div class="message">
          <van-cell-group>
            <van-field
              left-icon="phone-circle-o"
              v-model="username"
              clearable
              type="password"
              placeholder="请输入新密码"
              @click-right-icon="$toast('question')"
            />

            <van-field
              left-icon="bag-o"
              v-model="password"
              type="password"
              clearable
              placeholder="请确认新密码"
            >
<!--              <van-button slot="button" size="small" type="primary" class="btnPass"></van-button>-->
            </van-field>
          </van-cell-group>
        </div>
        <div class="error" v-if="show">密码长度8-32位,须包含数字、字母,符号至少两种以上</div>
        <div class="error" v-if="show2">请确认两次密码是否一致</div>
        <div class="btn" @click="btnClick">确认提交</div>
        <div class="others"></div>
      </div>
    </div>
    <x-dialog v-model="notClose" hide-on-blur
              :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
      <center>
        <div class="tips" @click="notClose = false">
          <span>密码找回成功</span>
          <van-button @click="notClose = false;$router.go(-1)" size="large" square
                      :style="'background-image: url('+btImg+');'" class="submitBtn2">确认
          </van-button>
        </div>
      </center>
      <br><br><br>
      <x-icon @click="notClose = false;" type="ios-close-outline" size="46px" style="fill:white;"></x-icon>
    </x-dialog>

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
        show: false,
        show2: false,
        notClose: false,
        phone: ""
      }
    },
    components: {
      MyHeader
    },
    methods:{
      btnClick() {
        var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,32}$/
        if (reg.test(this.username) && reg.test(this.username)) {
          if (this.username === this.password) {
            this.show2 = false
            if (localStorage.getItem("phone")) {
              this.phone = localStorage.getItem("phone")
            }
            this.$axios.post('/appServiceUser/passwordRetrieval', this.$qs.stringify({
              password: this.password,
              phone: this.phone,
            })).then(
              res => {
                // this.$toast(res.data.info)
                this.notClose = true

                var that = this
                setTimeout(function () {
                  that.$router.push({name:'accountLogin'})
                }, 800)
              })
          } else {
            this.show2 = true

          }
          this.show = false
        } else {
          this.show = true
        }

      }
    }
  }
</script>

<style scoped lang="less" type="text/less">

  .tips {
    border-radius: 10px;
    color: #000000;
    background-color: white;
    height: 351px;
    width: 588px;
    padding-top: 126px;

    span {
      font-weight: bold;
      font-size: 40px;
    }
  }

  .submitBtn2 {
    height: 100px;
    background-size: cover;
    background-position: 50% 50%;
    color: white;
    margin-top: 125px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .headerBc {
    background: url("../../assets/img/qt_24.png") no-repeat;
    height:849px;
    background-size: cover;
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
    border-radius: 29px;
    line-height: 30px;
  }
  .main{
    padding: 0 30px;
    /*background-color: #ffffff;*/
    .mainMess{
      background-color: #ffffff;
      margin-top: 50px;
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
      padding: 33px 0;
      text-align: center;
      margin-top: 20px;
      font-size: 35px;
      color: #fff;
      border-radius: 13px;
      width: 90%;
      margin-left: 5%;
      height: 80px;
      line-height: 80px;
      padding: 0;
    }
    .others{
      text-align: center;
      color: #8b8a8f;
      font-size: 30px;
      margin-top: 1rem;
      height: 5rem;
    }
  }
  .btnPass{
    width: 187px;
    height: 53px;
    background: url("../../assets/img/password.png") no-repeat;
    background-size:100% 100%;
  }
  .error{
    text-align: center;
    line-height:98px ;
    color: red;
    font-size: 23px;
  }
</style>
