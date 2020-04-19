/*
    Created by name: "FuDi", Date:2019/6/25 ,Time:14:58
*/

let m = {

  init() {
    if (localStorage.getItem("user")) {
      this.id = JSON.parse(localStorage.getItem("user")).id;
    }

    this.$axios.post('/appServiceUser/selectUserHomePage').then(res => {
      console.log(res);
      if (res.data.code === 100) {
        this.address = res.data.info.address
        this.backgroundImage = res.data.info.backgroundImage
        this.contactPhone = res.data.info.contactPhone
        this.mainProduct = res.data.info.mainProduct
        this.pageName = res.data.info.pageName
        this.wexNo = res.data.info.wexNo
        this.id = res.data.info.id
        console.log(this.wexNo);

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
        this.title = "店铺名称"
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
        case "店铺名称":
          this.pageName = this.userMessage
          break;
      }
      this.$axios.post('appServiceUser/updateUserHomePage', this.$qs.stringify({
        mainProduct: this.mainProduct,
        contactPhone: this.contactPhone,
        address: this.address,
        backgroundImage: this.backgroundImage,
        pageName: this.pageName,
        wexNo: this.wexNo,
        id:this.id
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
            that.backgroundImage =  res.data.info
            that.updatemessage()
            that.$toast("上传成功")
          }
        })
    }

  },
  updatemessage() {
    this.$axios.post('appServiceUser/updateUserHomePage', this.$qs.stringify({
      mainProduct: this.mainProduct,
      contactPhone: this.contactPhone,
      address: this.address,
      backgroundImage: this.backgroundImage,
      pageName: this.pageName,
      wexNo: this.wexNo,
      id:this.id
    })).then(res => {
      if (res.data.code === 200) {
        this.$toast('修改成功');
      }
    })
  },


  // 更改地址
  confirm(val){
    this.address =val[0].name+'-'+val[1].name+'-'+val[2].name

    this.show2=false

    this.$axios.post('appServiceUser/updateUserHomePage', this.$qs.stringify({
      mainProduct: this.mainProduct,
      contactPhone: this.contactPhone,
      address: this.address,
      backgroundImage: this.backgroundImage,
      pageName: this.pageName,
      wexNo: this.wexNo,
      id:this.id
    })).then(res => {
      if (res.data.code === 200) {
        this.$toast('修改成功');
      }
    })

  } ,
  cancel(){
    this.show2=false

  } ,
  changeCity(val){
    console.log(val[0]);

  }


}
export default m
