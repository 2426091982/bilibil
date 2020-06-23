<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<style lang="less">
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f4f4f4;
    font-family: '微软雅黑';
  }
  p {
    margin: 0;
    padding: 0;
  }
</style>
