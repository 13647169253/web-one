<template>
	<div class="headerBc" :style="'background-image: url('+img+' );'" >
		<MyHeader title="" rightText="注册" @click="tores"/>
		<div class="main">
			<div class="login">账号登录</div>

			<div class="mainMess">
				<div class="message">
					<van-cell-group>
						<van-field left-icon="phone-circle-o" v-model="username" clearable placeholder="请输入账号" @blur="telchange" @click-right-icon="$toast('question')" />

						<van-field left-icon="bag-o" v-model="password" type="password" clearable placeholder="请输入密码">
							<!--              <van-button slot="button" size="small" type="primary">60秒后重新获取</van-button>-->
						</van-field>
					</van-cell-group>
				</div>
				<div class="btn" @click="login">登录</div>
				<div class="others">
					<router-link class="left" to='./phonelogin'>使用手机号登录</router-link>
					<router-link class="right" to="/passwordback">忘记密码</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import MyHeader from "@com/header"
	import {validation} from './validate'

  export default {
    name: "accountLogin",
    data() {
      return {
        img: require("@/assets/img/qt_24.png"),
        username: "",
        password: "",
        flag:false,
        flagCount:0
      }
    },
    components: {
      MyHeader
    },
    methods:{
    	telchange(){
    		console.log("失去焦点")
    		console.log(this.username)
    		if(!(/^1[3456789]\d{9}$/.test(this.username))){ 
		        this.$toast("请输入正确的手机号");
		        this.flag=false; 
		    }else{
		    	this.flag=true; 
		    }
    	},
    	
    	
      login(){
				let validationError = validation({
					username:this.username,
					password:this.password
				})
				//效验成功时(没有错误提示，即返回值为'')
				if(validationError === '' && this.flag){
					this.$axios.post('/appServiceUser/nameLogin',this.$qs.stringify({
					  password:require('md5')(this.password),
					  userName:this.username
					})).then(res=>{
							if(res.data.code===100){
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
					  })
				}else if(!flag){
					this.$toast("请输入正确的手机号")
				}else{
					this.$toast(validationError);
				}
      },
      tores(){
        console.log(123);
      }
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
      font-size: 30px;
      margin-top: 1rem;
      height: 5rem;
      padding: 0 30px;
      color: #656469;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
  }
</style>
