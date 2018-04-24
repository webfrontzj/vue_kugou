<template>
  <div id="app">
    <Head />
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Player />
    <DetailPlayer />
  </div>
</template>

<script>
  import Head from "./components/header/Head.vue";
  import Player from "./components/Player.vue";
  import DetailPlayer from './components/DetailPlayer.vue'

  export default {
    components:{
      Head,
      Player,
      DetailPlayer
    }
  }
</script>

