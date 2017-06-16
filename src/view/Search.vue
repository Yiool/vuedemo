<template>
  <div id="search">
    <div class="header">
      <!--<form action="">-->
      <input type="search" placeholder="请输入关键字" autofocus v-model="keyWords" @keypress.enter="search($event)">
      <!--</form>-->
      <p @click="back()">取消</p>
    </div>
    <div class="search-res">
      <ul class="list-box">
        <li v-for="(item,i) in resArr" :key="i">
          <router-link to="/detail">
            <div class="news-detail">
              <h3>{{item.title}}</h3>
              <div class="extra">
                <span class="news-from">{{item.src}}</span>
                <span class="news-time">{{item.time}}</span>
              </div>
            </div>
            <div class="news-pic">
              <img :src='item.pic[0]' alt="">
            </div>
          </router-link>
        </li>
      </ul>
      <div class="no-res" v-show="hasRes">没有相关数据</div>
      <div class="line" v-show="showLine">
        我是有底线的
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
    data(){
      return {
      resArr:[],
      APP_KEY: "1643de435f1495f7",
      keyWords:"",
      totalNum:0,
      hasRes:false,
      showLine:false
      }
    },
    methods:{
      search(e){
        e.stopPropagation();
        this.$store.commit("showLoading");
        this.axios.get('/api/search', {
        params: {
          appkey: this.APP_KEY,
          keyword:this.keyWords,
        }
        }).then((response) => {
          
          let resultArr = response.data.result.list;
          if (response.data.result==="") {
            this.hasRes = true;
            this.$store.commit("hideLoading");
            return false;
          }
          this.resArr = resultArr;
          this.totalNum = response.data.result.num;
          this.$store.commit("hideLoading");
          this.showLine = true;
        })
      },

      back(){
        window.history.go(-1);
        // this.$store.commit("showLoading");
        this.$store.commit("showNav");
      }
    
    }
  }
</script>
  
<style lang="less" scoped>
#search {
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    line-height: 40px;
    border-bottom: 1px solid #ccc; // form {
    flex: 1;

    input {
      height: 30px;
      margin-left: 20px;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 10px;
    } // }
    p {
      // width: 30px;
      padding: 0 30px;
      color: skyblue;
      text-align: center;
    }
  }
  .search-res {
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
    .line {
      width: 80%; // mar
      margin: 20px auto 0 auto;
      text-align: center;
      border-bottom: 1px solid #ccc;
    }
    .no-res {
      padding-top: 10px;
      line-height: 30px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  }
}
</style>
  

