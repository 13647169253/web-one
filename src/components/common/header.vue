<template>
  <div>
    <van-nav-bar :title="title" :left-arrow="!noLeft" @click-left="onClickLeft" :right-text="rightText"
                 @click-right="onClickRight"/>
  </div>
</template>

<script>
  export default {
    props: ['title', 'rightText', 'noLeft'],
    data() {
      return {}
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickRight() {
        if (this.rightText === "注册") {
          this.$router.push({name: "register"})
        }
      }
    },
    created() {

    }
  }
</script>

<style>

</style>
