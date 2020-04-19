<template>
  <div>
    <MyHeader title="发布商品" />
    <div class="formControl2">
      <van-field v-model="goodsName" placeholder="请输入商品名称" label="商品名称" required clearable />
    </div>
    <div class="formControl3">
      <div class="van-hairline--surround"></div>
    </div>
    <div class="formControl1">
      <span class="formTitle"><span class="requiredStar">*</span>商品说明</span>
      <yd-textarea v-model="goodsExplain" slot="right" placeholder="" maxlength="200"></yd-textarea>
    </div>
    <div class="formControl2">
      <van-field v-model="productArea" placeholder="请输入商品产地" label="商品产地" required clearable />
    </div>
    <div class="formControl3">
      <div class="van-hairline--surround"></div>
    </div>
    <div class="formControl3">
      <div class="van-hairline--surround"></div>
    </div>
    <div class="formControl2">
      <van-row>
        <van-col span="16">
          <van-field v-model="price" placeholder="" label="出售价格(元)" required clearable />
        </van-col>
        <van-col span="8" id="pn">
          <yd-spinner height="30px" width="50px" button-style="circle" v-model="unitPrice" min="0">元</yd-spinner>
        </van-col>
      </van-row>
    </div>
    <div class="formControl3">
      <div class="van-hairline--surround"></div>
    </div>
<!--    <div class="formControl2">-->
<!--      <van-row>-->
<!--        <van-col span="14">-->
<!--          <van-field v-model="price" placeholder="" label="价格单位" required clearable />-->
<!--        </van-col>-->
<!--        <van-col span="10">-->
<!--          <Dropdown trigger="click" style="padding-top: 5px;padding-left: 35px;">-->
<!--            <van-button round size="small" style="background-color: #ecebf1;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{weight}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</van-button>-->
<!--            <DropdownMenu slot="list">-->
<!--              <DropdownItem @click.native="weight='斤'">斤</DropdownItem>-->
<!--              <DropdownItem @click.native="weight='克'">克</DropdownItem>-->
<!--            </DropdownMenu>-->
<!--          </Dropdown>-->
<!--        </van-col>-->
<!--      </van-row>-->
<!--    </div>-->
    <div class="formControl3">
      <div class="van-hairline--surround"></div>
    </div>
    <div class="formControl2">
      <van-row>
        <van-col span="14">
          <van-field v-model="number" placeholder="" label="起订数量" required clearable />
        </van-col>
        <van-col span="10">
          <Dropdown trigger="click" style="padding-top: 5px;padding-left: 35px;">
            <van-button round size="small" style="background-color: #ecebf1;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{minimumOrder}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼</van-button>
            <DropdownMenu slot="list">
              <DropdownItem @click.native="minimumOrder='500g'">500g</DropdownItem>
              <DropdownItem @click.native="minimumOrder='1000g'">1000g</DropdownItem>
              <DropdownItem @click.native="minimumOrder='2000g'">2000g</DropdownItem>
              <DropdownItem @click.native="minimumOrder='3000g'">3000g</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </van-col>
      </van-row>
    </div>
    <div class="formControl3">
      <div class="van-hairline--surround"></div>
    </div>
    <div class="formControl3">
      <div class="van-hairline--surround"></div>
    </div>
    <div class="formControl1">
      <span class="requiredStar">*</span><span class="formTitle">Banner首屏图</span><br /><br />
      <div v-for="(item,index) in fileList" class="imgControl color-item" v-dragging="{ item: item, list: fileList, group: 'fileList' }"
           :style="'background-image: url('+baseurl + '/file/readFile/' +item+'); background-size:cover; background-position:50% 50%; '">
        <van-icon @click="delImg(index,2)" class="clearImg" name="clear" color="#3db5d4" size="25px" />
      </div>
      <div class="uploadVideo">
        <van-uploader :after-read="afterRead2" multiple :max-count="5">
          <div solt="default" class="uploadControl imgControl">
            <div>
              <van-icon name="plus" size='50px' color='gray' />
            </div>
            <div>添加照片</div>
          </div>
        </van-uploader>
      </div>
      <br style='clear: both;' /><span>外部首屏图最少一张，第一张封面为视频，拖动调整图片顺序</span>
    </div>
    <div class="formControl1">
      <span class="requiredStar">*</span><span class="formTitle">视频封面</span><br /><br />
      <div v-for="(item,index) in fileList3" class="imgControl color-item" v-dragging="{ item: item, list: fileList3, group: 'fileList3' }"
           :style="'background-image: url('+baseurl + '/file/readFile/' +item+'); background-size:cover; background-position:50% 50%; '">
        <van-icon @click="delImg(index,2)" class="clearImg" name="clear" color="#3db5d4" size="25px" />
      </div>
      <div class="uploadVideo">
        <van-uploader :after-read="afterRead4" multiple :max-count="1">
          <div solt="default" class="uploadControl imgControl">
            <div>
              <van-icon name="plus" size='50px' color='gray' />
            </div>
            <div>添加照片</div>
          </div>
        </van-uploader>
      </div>
      <br style='clear: both;' /><span>外部首屏图最少一张，第一张封面为视频，拖动调整图片顺序</span>
    </div>
    <div class="formControl1">
      <span class="requiredStar">*</span><span class="formTitle">商品视频</span><br /><br />
      <div v-if='isLightImg' class="imgControl color-item" :style="'background-image: url('+isLightImg+'); background-size:cover;'">
        <van-icon @click="delImg2" class="clearImg" name="clear" color="#3db5d4" size="25px" />
      </div>
      <div class="uploadVideoBox imgControl color-item" v-for="(item,index) in fileList2">
        <video class="videos" :src="item"></video>
        <van-icon @click="delImg(index,1)" class="clearImg" name="clear" color="#3db5d4" size="25px" />
      </div>
      <div class="uploadVideo">
        <van-uploader :after-read="afterRead" multiple accept="video/*">
          <div solt="default" class="uploadControl imgControl">
            <div>
              <van-icon name="plus" size='50px' color='gray' />
            </div>
            <div>添加视频</div>
          </div>
        </van-uploader>
      </div>
      <br style='clear: both;' />&nbsp;&nbsp;上传视频时，选择其中某一帧内容作为视频封面。
    </div>
    <div class="formControl2">
      <van-field v-model="contactPhone" placeholder="18100000000（默认号码）" label="联系方式" required clearable />
    </div>
    <van-button
      size="large"
      square
      :style="'background-image: url('+btBgImg+'); background-size:cover; background-position:50% 50%;color:white'"
      @click="btn"
    >发布</van-button>
  </div>
</template>

<script>
  import MyHeader from "@com/header"
  import methods from './methods/m'
  export default {
    components: {
      MyHeader
    },
    data() {
      return {
        btBgImg:require('@/assets/img/20190619120234.png'),
        price:"",//出售价格
        commodityExplain:"",//商品说明
        priceNum:0,//价格数量
        weight:"斤",//价格单位
        weight2:"500g",//价格单位
        number:"",//起订数量
        videoAddress:'',//视屏
        unitPrice:'',//出售价格
        productArea:'',//产地
        previewPicture:'',//视屏封面
        minimumOrder:'500g',//起订数量
        goodsName:'',//商品的名称
        goodsExplain:'',//商品的说明
        details:'',//详情图
        contactPhone:'',//联系方式
        banners:'',//banner图
        fileList:[],
        fileList2:[],
        fileList3:[],
        isLightImg: '',
        baseurl:window.baseurl
      }
    },
    methods:methods,
    created() {
      // this.init()
    }
  }
</script>

<style>
  /*hack“ydui”的步进器样式*/
  #pn{
    margin-top: 15px;
  }
  #pn .yd-spinner{
    border-radius: 45px;
    background-color: #ecebf1;
  }
  #pn input{
    background-color: #ecebf1;
  }
  #pn span{
    background-color: #2dbbb2;
  }
  #pn span i:after{
    color: white;
  }
</style>
