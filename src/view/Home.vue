<template>
  <div class="index-box">
    <div class="header">
      <div class="topbar clearfix">
        <div class="logo fl">
          <img src="./images/logo.png">
        </div>
        <div class="search">
          <router-link to="/search">
            <input type="text" placeholder="搜索其它内容" @click="hideNav()">
          </router-link>
        </div>
      </div>
      <div class="tabsbar">
        <ul>
          <li v-for="(item,i) in tabsTitle">
            <router-link :to="{path:item.url,query:{type:item.type}}">{{item.text}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
  
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="autoFill" ref="loadmore">
        <ul class="list-box">
          <li v-for="(item,i) in newsList" :key="i" @click="sendData(i)">
            <router-link to="/detail">
              <div class="news-detail">
                <h3>{{item.title}}</h3>
                <div class="extra">
                  <span class="news-from">{{item.src}}</span>
                  <span class="news-time">{{item.time}}</span>
                </div>
              </div>
              <div class="news-pic">
                <img :src='item.pic' alt="">
              </div>
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabsTitle: [
        {
          text: "头条",
          url: "/home/all",
          type: "头条"
        },
        {
          text: "新闻",
          url: "/home/news",
          type: "新闻"
        },
        {
          text: "财经",
          url: "/home/finance",
          type: "财经"
        },
        {
          text: "体育",
          url: "/home/sports",
          type: "体育"
        },
        {
          text: "娱乐",
          url: "/home/finance",
          type: "娱乐"
        },
        {
          text: "军事",
          url: "/home/military",
          type: "军事"
        },
        {
          text: "科技",
          url: "/home/tech",
          type: "科技"
        },
        {
          text: "NBA",
          url: "/home/nba",
          type: "NBA"
        }
      ],
      newsList: [],
      APP_KEY: "1643de435f1495f7",
      allLoaded: false,
      autoFill: false,
      start: 10,
      channel: "头条",
      totalNum:0,
    }
  },
  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      // this.allLoaded = true;// 若数据已全部获取完毕
      this.getMore(this.channel, 0, 10);
    },

    fetchData(channel, start, num) {
      const APP_KEY = "1643de435f1495f7";
      this.$store.commit("showLoading");
      this.newsList = [];
      this.axios.get('/api/get', {
        params: {
          appkey: APP_KEY,
          channel: channel,
          start: start,
          num: num
        }
      }).then((response) => {
        let resultArr = response.data.result.list;
        this.newsList = resultArr;
        this.$store.commit("hideLoading");
      })
    },

    getMore(channel, start, num) {
      this.axios.get('/api/get', {
        params: {
          appkey: this.APP_KEY,
          channel: channel,
          start: this.start,
          num: num
        }
      }).then((response) => {
        let resultArr = response.data.result.list;
        for (let i = 0; i < resultArr.length; i++) {
          this.newsList.push(resultArr[i]);
        }
        this.start += 10;
        this.$refs.loadmore.onBottomLoaded();
      })
    },

    hideNav() {
      this.$store.commit("hideNav");
    },

    sendData(i) {
      this.$store.commit("sendData", this.newsList[i]);
      this.$store.commit("hideNav");
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to.query.type) {
        this.channel = to.query.type;
        this.fetchData(this.channel, 0, 10);
      }
    }
  },
  created() {
    this.fetchData("头条", 0, 10);
  },
}
</script>

<style lang="less" scoped>
.index-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
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
          height: 25px;
          padding-left: 10px;
          margin-right: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
    .tabsbar {
      width: 100%;
      height: 40px; 
      border-bottom: 1px solid #eee;
      line-height: 40px;
      background: #fff;
      overflow: hidden;
      ul {
        li {
          float: left;
          padding: 0 5px;
          a.router-link-exact-active {
            color: red;
          }
        }
      }
    }
  }
  .container {
    width: 100%;
    height: 100%;
    background: #eee;
    padding-top: 80px;
    position: relative;
    .list-box {
      width: 100%;
      padding: 0 10px;
      background: #fff;
      li {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        a {
          display: flex;
          .news-detail {
            flex: 1;
            margin-right: 5px;
            h3 {
              font-size: 14px; // line-height: 30px;
              font-weight: 400;
              color: #000;
            }
            .extra {
              margin-top: 5px;
              font-size: 12px;
              color: #999;
            }
          }
          .news-pic {
            width: 65px;
            height: 45px;
            img {
              width: 65px;
              height: 45px;
            }
          }
        }
      }
    }
  }
}
</style>

