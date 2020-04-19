<template>
  <h1>
    <p v-for="(item,index) in goodsList"> {{item.name}}</p>
    <button  @click="newClick">sosoososo</button>
  </h1>

</template>

<script>
  export default {
    name: "new",
    data() {
      return {
        goodsList:[
          {name:"a",id:"1"},
          {name:"b",id:"2"},
          {name:"b",id:"2"},
          {name:"b",id:"2"},
        ]
      }
    },
    methods:{
      newClick(){
        for(let i = 0;i < this.goodsList.length-1;i ++){
          let obj = this.goodsList[i];
          obj.name = 'hhhh';
        }
        // var itemLen=this.goodsList.length
        // this.$set(this.goodsList,itemLen,{name:"c",id:'10'})

      }
    }
  }
</script>

<style scoped>

</style>
