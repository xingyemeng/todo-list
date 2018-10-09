<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app{
      width: 100%;
      margin: 0 auto;
  }
  #app h1{
    text-align: center;
    margin: 2rem 0;
  }
</style>
