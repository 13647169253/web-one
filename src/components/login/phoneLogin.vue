<template>
  <div class="headerBc" :style="'background-image: url('+img+' );'">
    <MyHeader title="" rightText="注册"/>
    <div class="main">
      <div class="login">手机号登录</div>

      <div class="mainMess">
        <div class="message">
          <van-cell-group>
            <van-field left-icon="phone-circle-o" v-model="username" clearable placeholder="请输入手机号"
                       @click-right-icon="$toast('question')"/>

            <van-field left-icon="bag-o" v-model="password"  placeholder="请输入验证码">
              <van-button slot="button" size="small" type="primary" v-show="!sendAuthCode">{{auth_time}}秒后重新获取
              </van-button>
              <van-button slot="button" size="small" type="info" class="huoqu" v-show="sendAuthCode" @click="sendCode">
                获取验证码
              </van-button>
            </van-field>
          </van-cell-group>
        </div>
        <div class="btn" @click="login">登录</div>
        <div class="others">
          <router-link to="./accountLogin">使用账号密码登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from "@com/header"

  export default {
    name: "phonelogin",
    data() {
      return {
        img: require("@/assets/img/qt_24.png"),
        username: "",
        password: "",
        sendAuthCode: true,
        auth_time: "",
      }
    },
    components: {
      MyHeader
    },
    methods: {
      login() {
        // this.$axios.post('/appServiceUser/verification', this.$qs.stringify({
        //   code: this.password,
        //   phone: this.username,
        //   type: 1
        // })).then(
        //   res => {
        //     if (res.data.code == '100') {
        //       this.$axios.post('/appServiceUser/phoneLogin', this.$qs.stringify({
        //         phone: this.username,
        //       })).then(
        //         res => {
        //           console.log(res);
        //         }
        //       )
        //     } else {
        //       this.$toast(res.info)
        //     }
        //   })


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
                  if (res.data.code == '100') {
                    this.$axios.post('/appServiceUser/phoneLogin', this.$qs.stringify({
                      phone: this.username,
                    })).then(
                      res => {
                        //TODO:判断响应数据中是否存在token，如果存在则将axios请求中header的token字段更新成此token！！！
                        let token = res.data.info.token;
                        if(token !== null && token !== '' && token !== undefined){
                          this.$axios.defaults.headers.common['User-Token'] = token;
                        }
                        //TODO:保存用户信息及token
                        this.$store.commit("setUser",res.data.info);
                        this.$toast('登录成功');
                        setTimeout(()=>{
                          this.$router.replace('/')
                        },500)
                      }
                    )
                  } else {
                    this.$toast(res.info)
                  }
                })
            } else {
              this.$toast("验证码不能为空");
            }
          }
        } else {
          this.$toast("手机号码不能为空");

        }
      },


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

    }

  }
</script>

<style scoped lang="less" type="text/less">
  .headerBc {
    height: 849px;
    background-size: cover;
  }

  .headerBc /deep/ .van-nav-bar {
    /* position: relative; */
    color: white;
    height: 117px;
    line-height: 117px;
    background-color: rgba(255, 255, 255, 0);
  }

  .headerBc /deep/ .van-nav-bar__text {
    color: white;
    font-size: 36px;
  }

  .headerBc /deep/ .van-nav-bar .van-icon {
    color: white;
    font-size: 36px;
  }

  .headerBc /deep/ .van-hairline--bottom::after {
    border: none;
  }

  .headerBc /deep/ .van-field__left-icon {
    margin-right: 29px;
    margin-top: 4px;
  }

  .headerBc /deep/ .van-field__left-icon {
    margin-right: 29px;
    margin-top: 4px;
  }

  .message /deep/ .van-button {
    padding: 14px 30px;
    height: 53px;
    background-color: #e7e6ec;
    color: #646369;
    font-size: 22px;
    border: none;
    border-radius: 29px;
    line-height: 30px;
  }

  .main {
    padding: 0 30px;
    /*background-color: #ffffff;*/

    .mainMess {
      background-color: #ffffff;
      margin-top: 50px;
    }

    .login {
      font-size: 36px;
      color: #fff;
    }

    .message {
    }

    .btn {
      background: url("../../assets/img/btnBc.png") no-repeat;
      text-align: center;
      margin-top: 50px;
      font-size: 35px;
      color: #fff;
      border-radius: 13px;
      width: 90%;
      margin-left: 5%;
      height: 80px;
      line-height: 80px;
    }

    .others {
      text-align: center;
      color: #8b8a8f;
      font-size: 30px;
      margin-top: 1rem;
      height: 5rem;

    }

    .huoqu {
      color: #fff;
      background-color: #1989fa;
      border: 1px solid #1989fa;
    }
  }
</style>
