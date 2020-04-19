/*
    Created by name: "FuDi", Date:2019/6/25 ,Time:14:58
*/

let m = {

  init() {
    if (localStorage.getItem("user")) {
      this.id = JSON.parse(localStorage.getItem("user")).id;
      console.log(JSON.parse(localStorage.getItem("user")));

    }
    this.$axios.post('/appServiceUser/userInfoDetail', this.$qs.stringify({
      userId: this.id
    })).then(res => {
      console.log(res);
      if (res.data.code === 100) {
        console.log(res.data.info);
        this.backgroundImage = res.data.info.headImage
        this.contactPhone = res.data.info.mobile
        this.pageName = res.data.info.nickname
        // this.fileList.push('http://47.94.37.25:3325'+'/file/readFile/'  +res.data.info.headImage)
        console.log(this.fileList);
      }
    })

  },
  product: function (e) {

    switch (e) {
      case 5:
        this.title = "主营产品"
        this.placeholder = this.mainProduct
        this.userMessage = this.mainProduct
        break;
      case 4:
        this.title = "我的地址"
        this.placeholder = this.address
        this.userMessage = this.address
        break;
      case 3:
        this.title = "微信号"
        this.placeholder = this.wexNo
        this.userMessage = this.wexNo
        break;
      case 2:
        this.title = "联系方式"
        this.placeholder = this.contactPhone
        this.userMessage = this.contactPhone
        break;
      case 1:
        this.title = "昵称"
        this.placeholder = this.pageName
        this.userMessage = this.pageName
        break;
    }

    this.show = true
  },
  beforeClose(action, done) {
    if (action === 'confirm') {
      switch (this.title) {
        case "主营产品":
          this.mainProduct = this.userMessage
          break;
        case "我的地址":
          this.address = this.userMessage
          break;
        case "微信号":
          this.wexNo = this.userMessage
          break;
        case "联系方式":
          this.contactPhone = this.userMessage
          break;
        case "昵称":
          this.pageName = this.userMessage
          break;
      }
      console.log(this.contactPhone);
      this.$axios.post('appServiceUser/userInfoUpdate', this.$qs.stringify({
        phone: this.contactPhone,
        headImage: this.backgroundImage,
        nickname: this.pageName,
        userId: this.id
      })).then(res => {
        if (res.data.code === 200) {
          this.$toast('修改成功');
        }
      })
      setTimeout(done, 1000);

    } else if (action === 'cancel') {
      done()
    }
  },
  // headerUrl() {
  //   this.showBot = true
  //
  // },
  onSelect(item, index) {
    console.log(item);
    console.log(index);
  },
  //上传图片
  afterRead(file) {
    this.userPhoto = false
    let canUpload = true; //效验。是否应该上传到服务器。
    let that = this;
    file = file.file;
    let fileType = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length).toLocaleLowerCase();
    if (fileType != 'jpg' && fileType != 'bmp' && fileType != 'png' && fileType != "jpeg") {
      canUpload = false;
      that.$toast.fail('上传图片格式不正确');
    }
    if ((file.size / 1024) > 5120) {
      canUpload = false;
      that.$toast.fail('上传的图片不得大于5MB')
    }
    if (that.fileList.length >= 2) {
      canUpload = false;
      that.$toast.fail('图片最多上传5张');
    }
    let fd = new FormData(); //创建form对象
    fd.append('fileName', file)
    let config = {
      "Content-Type": "multipart/form-data"
    }
    if (canUpload) {
      that.$axios({
        method: 'post',
        url: '/file/uploadFile',
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(function (res) {
          if (res.data.code == 100) {
            // that.fileList.push(window.baseurl + '/file/readFile/' + res.data.info);
            that.backgroundImage = res.data.info
            that.updatemessage()
            that.$toast("上传成功")

            if (localStorage.getItem("user")) {
              let obj =JSON.parse(localStorage.getItem("user"))
              obj.headImage=res.data.info
              localStorage.setItem('user', JSON.stringify(obj));
            }
          }
        })
    }

  },
  updatemessage() {
    this.$axios.post('appServiceUser/userInfoUpdate', this.$qs.stringify({
      phone: this.contactPhone,
      headImage: this.backgroundImage,
      nickname: this.pageName,
      userId: this.id
    })).then(res => {
      if (res.data.code === 200) {
        this.$toast('修改成功');
      }
    })
  },
  onClickLeft(){
    console.log(123);
    this.$navigation.cleanRoutes()
    ;this.$router.go(-1)
  }


}
export default m
