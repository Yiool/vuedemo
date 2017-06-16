<template>
  <div id="app">
    <!--主页路由显示-->
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    
    <!--底部导航组件-->
    <div class="nav-bar" v-show="showNav">   
      <nav-bar></nav-bar>
    </div>

    <!--引导页组件-->
    <div class="welcome-page" v-show="false">
      <welcome></welcome>
    </div>

    <!--loading组件-->
    <div class="loading-box" v-show="loadingState">
      <loading></loading>
    </div>

    <!--详情页组件-->
    
  </div>
</template>

<script>
import navBar from "./components/navBar"
import loading from "./components/Loading"
import welcome from "./components/Welcome"
export default {
  name: 'app',
  data() {
    return {
      channelDates: [],
      firstPageDatas: []
    }
  },
  components: {
    navBar,loading,welcome
  },
  computed:{
    loadingState:function(){
      return this.$store.state.showLoading;
    },
    showWelcome:function(){
      return this.$store.state.showWelcome;
    },
    showNav:function(){
      return this.$store.state.showNav;
    }
  },
  methods:{
    touchmove:function(e){
      e.preventDefault();
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  // height: 100%;
  // overflow: hidden;
  background: #fff;
  .content {
    width: 100%;
    height: 100%;
    // max-width: 640px;
    // min-width: 320px;
    // margin: 0 auto;
    padding-bottom: 40px;
    // overflow: hidden;
  }

  .nav-bar {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index:999;
    overflow: hidden;
  }

  .loading-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

  .welcome-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
}
</style>
