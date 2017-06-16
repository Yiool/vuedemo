<template>
  <div class="v-navBar">
    <ul class="clearfix">
      <router-link v-for="(item,i) in navBar" :to="item.linkTo" tag="li" :key="i">
        <div class="icon">
          <span class="iconfont" :class="item.iconClass"></span>
        </div>
        <div>
          {{item.title}}
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navBar:[
          {
            title:"首页",
            linkTo:'/home/all',
            iconClass:'icon-shouye'
          },
          {
            title:"视频",
            linkTo:'/video',
            iconClass:'icon-shipin'
          },
          {
            title:"收藏",
            linkTo:'/collection',
            iconClass:'icon-qipao'
          },
          {
            title:"我的",
            linkTo:'/personal',
            iconClass:'icon-wo'
          },
        ]
      }
    }
  }
</script>


<style lang="less" scoped>
  .v-navBar {
    width: 100%;
    border-top: 1px solid #eee;
    text-align: center;
    background: #eee;
    ul {
      width: 100%;
      // padding: 3px 0;
      li {
        float: left;
        width: 25%;
        height: 40px;
        line-height: 20px;
        font-size: 12px;
        .iconfont {
          font-size: 12px;
        }
      }
      li.router-link-active {
        color: #F48C8C;
      }
    }
  } 
</style>