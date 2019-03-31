<template>
    <div>
      <button @click="increment">+</button>
      <button v-on:click="decrement">-</button>
      <p><span>{{ num1 }}</span></p>
    </div>
</template>

<script>
    export default {
        props:['num1'],   //在子组件中声获取父组件的数据
        name: "Counter",
      data(){
          return{
          }
      },
      methods:{
          increment(){
            this.$emit("incr");  //用$emit方法调用父组件中的方法

          },
         decrement(){
            this.$emit("decr");

        }
      }

    }
</script>

<style scoped>

</style>
