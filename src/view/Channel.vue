<template>
  <div ref="box" class="detail-list" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
    <div class="dropDown" v-show="dropDown">
        下拉加载最新数据
      </div>
    <ul class="list-box">
      <li v-for="(item,i) in newsList" :key="i">
        <router-link :to="{path:'/home/datail'}">
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
    <!--<div class="loading" v-show="showLoading">
                  <loading></loading>
                </div>-->
    <div class="getMore" v-show="getMore">
      上拉加载更多...
    </div>
  </div>
</template>

<script>
import loading from '../components/Loading'
export default {
  components: {
    loading
  },
  data() {
    return {
      newsList: [],
      defaultChannel: '头条',
      showLoading: false,
      getMore: false,
      dropDown: false,
      startNum: 10,
      moveEventData: {
        startY: 0,
        endY: 0,
        distanceY: 0,
        currentY: 0,
        maxY: 20,
        minY: 0,
        isMove: false,
        toMove: 0,
        el: null,
      }
    }
  },
  methods: {
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
        console.log('路由改变了');
        this.$store.commit("hideLoading");
        this.$store.commit("hideWelcome");
        this.moveEventData.el.style.transform = "translateY(0)";
      })
    },
    getMoreData(channel, start, num) {
      const APP_KEY = "1643de435f1495f7";
      this.axios.get('/api/get', {
        params: {
          appkey: APP_KEY,
          channel: channel,
          start: start,
          num: num
        }
      }).then((response) => {
        let resultArr = response.data.result.list;
        for (let i = 0; i < resultArr.length; i++) {
          this.newsList.push(resultArr[i]);
        };
        this.startNum += 10;
        this.moveEventData.el.style.transition = "all .5s";
        this.moveEventData.el.style.transform = "translateY(" + (this.moveEventData.minY + 30) + "px)";
        this.moveEventData.currentY = (this.moveEventData.minY + 30);
        this.getMore = false;
      })
    },
    touchStart(e) {
      e.preventDefault();
      this.moveEventData.startY = e.touches[0].clientY;
    },
    touchMove(e) {
      e.preventDefault();
      let ulBox = this.moveEventData.el = document.querySelector(".detail-list");
      let ulBoxHeight = ulBox.querySelector("ul").offsetHeight;
      let contentHeight = document.querySelector(".content").offsetHeight - 40 - 80;
      // console.log(contentHeight);
      // console.log(ulBoxHeight);
      this.moveEventData.isMove = true;
      this.moveEventData.endY = e.touches[0].clientY;
      this.moveEventData.distanceY = this.moveEventData.endY - this.moveEventData.startY;
      let toMove = this.moveEventData.toMove = this.moveEventData.currentY + this.moveEventData.distanceY;
      let maxY = this.moveEventData.maxY;
      let minY = this.moveEventData.minY = contentHeight - ulBoxHeight - 30;
      if (toMove > 0) {
        this.dropDown = true;
      }
      if (toMove < (contentHeight - ulBoxHeight)) {
        this.getMore = true;
      }
      if (toMove < maxY && toMove > minY) {
        ulBox.style.transition = "none";
        ulBox.style.transform = "translateY(" + toMove + "px)";
      }

    },
    touchEnd(e) {
      if (this.moveEventData.toMove > 0) {
        this.moveEventData.el.style.transition = "all .5s";
        this.moveEventData.el.style.transform = "translateY(0)";
        this.moveEventData.currentY = 0;
        //加载最新数据、加载成功购执行下面函数
        this.dropDown = false;
      } else if (this.moveEventData.toMove < (this.moveEventData.minY + 30)) {
        //加载更多数据
        // if (!this.$route.query.channel) {
        //   this.getMoreData("头条", this.startNum, 10);
        // } else {
          this.getMoreData(this.$route.query.channel, this.startNum, 10);
        // }
        // this.moveEventData.el.style.transition = "all .5s";
        // this.moveEventData.el.style.transform = "translateY(" + (this.moveEventData.minY + 30) + "px)";
        // this.moveEventData.currentY = (this.moveEventData.minY + 30);
      } else {
        this.moveEventData.currentY = this.moveEventData.toMove;
      }
      this.moveEventData.startY = 0;
      this.moveEventData.endY = 0;
      this.moveEventData.distanceY = 0;
      this.moveEventData.isMove = false;
      e.preventDefault();
    }
  },
  watch: {
    '$route': function () {
      console.log('路由改变了');
      this.fetchData(this.$route.query.channel, 0, 10);

    }
  },
  created() {

  },
  mounted() {
    this.moveEventData.el = this.$refs.box;
  },


} 
</script>

<style lang="less" scoped>
.detail-list {
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

  .loading {
    width: 100%; // min-height: 400px;
    height: 100%;
    position: fixed; // top: 80px;
    // left: 0;
  }

  .getMore,
  .dropDown {
    width: 100%;
    text-align: center;
    line-height: 30px;
    color: #999;
  }
}
</style>

