<template>
  <div class="welcome">
    <div class="txt">
      <p>Welcome to toutiao </p>
      <p class="author">by Yiool</p>
    </div>
  
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.welcome {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('./images/welcome.jpg') no-repeat center/cover;
  background-size: 100% 100%;
  .txt {
    position: absolute;
    bottom: 30px;
    left: 0;
    width: 100%;
    text-align: center;
    color: #ddd;
  }
}
</style>

  

