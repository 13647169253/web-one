<template>
  <div class="headerBc"  :style="'background-image: url('+img+' );'" >
    <MyHeader title="" rightText=""/>
    <div class="main">
      <div class="login">密码找回</div>

      <div class="mainMess">
        <div class="message">
          <van-cell-group>
            <van-field
              left-icon="phone-circle-o"
              v-model="username"
              clearable
              placeholder="请输入注册手机号码"
              @click-right-icon="$toast('question')"
            />

            <van-field
              left-icon="bag-o"
              v-model="password"
              placeholder="请输入验证码"
            >
              <van-button slot="button" size="small" type="primary" class="btnPass" @click="sendCode"
                          v-show="sendAuthCode" ></van-button>
              <van-button slot="button" size="small" type="primary" v-show="!sendAuthCode">{{auth_time}}秒后重新获取
              </van-button>
            </van-field>
          </van-cell-group>
        </div>
        <div class="btn" @click="login">下一步</div>
        <div class="others"></div>
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
        username: "",
        password: "",
        auth_time: "",
        sendAuthCode: true,
      }
    },
    components: {
      MyHeader
    },
    methods: {
      sendCode() {  //发送验证码
        if (this.username !== "") {
          if (!(/^1[3456789]\d{9}$/.test(this.username))) {
            this.$toast("手机号码格式有误，请重填");
            return false;
          } else {
            this.sendAuthCode = false;
            this.auth_time = 120;
            let auth_timetimer = setInterval(() => {
              this.auth_time--;
              if (this.auth_time <= 0) {
                this.sendAuthCode = true;
                clearInterval(auth_timetimer);
              }
            }, 1000);
            this.$axios.post('/appServiceUser/produceCode', this.$qs.stringify({
              phone: this.username,
              type: "1"
            })).then(
              res => {
                if (res.data.code == '100') {
                  this.$toast('验证码发送成功')
                } else {
                  this.$toast(res.data.info)
                }
              }
            ).catch(error => {
              //this.$toast('网络错误');
            })
          }
        } else {
          this.$toast("手机号码不能为空");

        }


      },
      login() {

        if (this.username !== "") {
          if (!(/^1[3456789]\d{9}$/.test(this.username))) {
            this.$toast("手机号码格式有误，请重填");
            return false;

          } else {
            if (this.password !== "") {
              localStorage.setItem("phone", this.username)

              this.$axios.post('/appServiceUser/verification', this.$qs.stringify({
                code: this.password,
                phone: this.username,
                type: 1
              })).then(
                res => {
                  this.$toast('请设置新密码')
                  localStorage.setItem("phone", this.username)
                  this.$router.push({path: '/newpassword'})

                  setTimeout(function () {
                  }, 300)
                })
            } else {
              this.$toast("验证码不能为空");
            }
          }
        } else {
          this.$toast("手机号码不能为空");

        }


      },
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .headerBc {
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
      margin-top: 50px;
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
</style>
