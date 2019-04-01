<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container" align="left">
      <nav class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot ></slot>
      </nav>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NavBread"
    }
</script>

<style scoped>
</style>
