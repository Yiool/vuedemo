<template>
  <div class="header">
    <div class="topbar clearfix">
      <div class="logo fl">
        <img src="./images/logo.png">
      </div>
      <div class="search">
        <input type="text" placeholder="搜索其它内容">
      </div>
    </div>
    <div class="tabsbar">
      <ul>
        <li v-for="(item,i) in tabsTitle">
          <router-link :to="{path:'/home/channel', query:{channel:item}}">{{item}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  position: relative;
  z-index: 999;
  .topbar {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F17070;
    .logo img {
      width: 70px;
      vertical-align: middle;
      margin-left: 15px;
    }
    .search {
      overflow: hidden;
      padding: 0 20px;
      input {
        width: 100%;
        height: 20px;
        padding-left: 10px;
        margin-right: 15px;
        border-radius: 5px;
      }
    }
  }
  .tabsbar {
    width: 100%;
    height: 40px; // padding: 5px;
    border-bottom: 1px solid #eee;
    line-height: 40px;
    background: #fff;
    overflow: hidden;
    ul {
      li {
        float: left;
        padding: 0 5px;
      }
    }
  }
}
</style>

