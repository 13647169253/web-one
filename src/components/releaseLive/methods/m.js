/**
 *Author:FuDi
 *Create Time:2019-07-09 13:30
 **/

let m = {
  btn() {

    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (this.fileList.join(',') !== "") {
      if (this.fileList2.join(',') !== "") {
        if (this.contactPhone !== "") {
          if (reg.test(this.contactPhone)) {
            if (this.goodsExplain !== "") {
              if (this.goodsName !== "") {
                if (this.minimumOrder !== "") {
                  if (this.fileList3.join(',') !== "") {
                    if (this.productArea !== "") {
                      if (this.unitPrice !== "") {
                        let param = {
                          banners: this.fileList.join(','),
                          details: this.fileList2.join(','),
                          contactPhone: this.contactPhone,
                          goodsExplain: this.goodsExplain,
                          goodsName: this.goodsName,
                          minimumOrder: this.minimumOrder,
                          previewPicture: this.fileList3.join(','),
                          productArea: this.productArea,
                          unitPrice: this.unitPrice,
                          videoAddress: this.videoAddress,
                        }
                        console.log(param);
                        this.$axios.post('appServiceSellGoods/add',param).then(res=>{
                          console.log(res.data);
                          this.$toast(res.data.info)
                        })
                      } else {
                        this.$toast("请输入出售价格")

                      }
                    } else {
                      this.$toast("请输入产地")

                    }
                  } else {
                    this.$toast("请输入视屏封面")

                  }
                } else {
                  this.$toast("请输入起订数量")

                }
              } else {
                this.$toast("请输入商品名称")

              }
            } else {
              this.$toast("请输入商品说明")

            }
          } else {
            this.$toast("请输入正确手机号格式")

          }
        } else {
          this.$toast("请输入手机号")
        }
      } else {
        this.$toast("请上传详情图")

      }
    } else {
      this.$toast("请上传banner图")
    }



  },
  afterRead2(file) {
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
    if (that.fileList.length >= 10) {
      canUpload = false;
      that.$toast.fail('图片最多上传10张');
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
            that.fileList.push(res.data.info);
          }
        })
    }
  },
  afterRead3(file) {
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
    if (that.fileList2.length >= 10) {
      canUpload = false;
      that.$toast.fail('图片最多上传10张');
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
            that.fileList2.push(res.data.info);
          }
        })
    }
  },
  afterRead4(file) {
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
    if (that.fileList3.length >= 10) {
      canUpload = false;
      that.$toast.fail('图片最多上传10张');
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
            that.fileList3.push(res.data.info);
          }
        })
    }
  },

  delImg(index, num) {
    this['fileList' + num].splice(index, 1);
    if (num == 1) {
      this.base64Arr.splice(0, this.base64Arr.length);
      this.isLight = 0;
      this.isLightImg = '';
      this.checkVideoSrc = '';
    }
  },
  delImg2() {
    this.isLight = 0;
    this.isLightImg = '';
    this.checkVideoCover = true;
  },
}

export default m
