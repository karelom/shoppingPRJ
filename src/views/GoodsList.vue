<template>
    <div>
      这是商品列表页面
      <span>{{ $route.params.goodsId }}  {{ $route.params.name}}</span><br>
      <router-link to="/goods/title">显示商品标题</router-link>
         <!--      这里要写绝对子地址-->
      <router-link to="/goods/img">显示商品图片</router-link>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsList.vue"
    }
</script>

<style scoped>

</style>
