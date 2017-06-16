<template>
  <div class="detail-box">
    <div class="header-box">
      <div class="back" @click="back()">
        <span class="iconfont icon-back"></span>
      </div>
      <div class="from" v-show="true">{{detailData.src}}</div>
      <div class="collect" @click="collect">
        <span class="iconfont icon-shoucang"></span>
      </div>
    </div>
    <div class="wrapper">
      <h3>{{detailData.title}}</h3>
      <p class="time">{{detailData.time}}</p>
      <div class="content-box">
  
        <div class="txt-box" v-html="detailData.content">
          
        </div>
        <div class="url">
          数据来源：
          <a :href="detailData.url">点我查看原文</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    detailData: function () {
      return this.$store.state.detail;
    }
  },
  methods: {
    back() {
      window.history.go(-1);
      this.$store.commit("showNav");
    },
    collect() {
      let cache = window.localStorage.getItem("collection");
      if (!cache) {
        let arr =[];
        arr.push(this.$store.state.detail);
        let data = JSON.stringify(arr);
        window.localStorage.setItem("collection", data);
      } else {
        let temp = JSON.parse(window.localStorage.getItem("collection")).push(this.$store.state.detail);
        window.localStorage.setItem("collection",JSON.stringify(temp));
      }
      
    }
  },
}
</script>

<style lang="less" scoped>
.detail-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  .header-box {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    background: #fff;
    .back {
      flex: 1;
      height: 100%;
      line-height: 40px;
      padding-left: 10px;
    }
    .from {
      flex: 1;
      text-align: center;
    }
    .collect {
      flex: 1;
      padding-right: 10px;
      text-align: right;
    }
  }
  .wrapper {
    width: 100%;
    height: auto;
    margin-top: 40px;
    padding: 10px;
    overflow: hidden;
    h3 {
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }
    .time {
      padding-right: 20px;
      text-align: right;
      margin-top: 10px;
      color: #666;
      font-size: 12px;
    }
    .content-box {
      margin-top: 15px;
      p {
        text-indent: 2em;
        line-height: 1.5em;
      }
      .url {
        margin-top: 10px;
        color: blue;
        a {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
