<template>
  <div class="home-box">
    <nav-box></nav-box>
    <div class="advertise-box">
      <div class="bg-box">
        <img src="../../assets/images/advertise-bg.png" alt="" />
        <div class="card-box">
          <el-carousel
            :interval="4000"
            type="card"
            height="200px"
            indicator-position="none"
          >
            <el-carousel-item v-for="item in advertiseImg" :key="item">
              <img :src="item" alt="" style="width: 100%" height="100%"/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <header-box class="header-box">
      <!-- <div slot="left">asdasd</div> -->
      <div slot="moudel-first" class="moudel-first"></div>
      <div slot="search-engine" class="search-engine">
        <span>猜您搜索：</span>
        <ul v-for="(item, index) in searchEngine" :key="index">
          <li>{{ item }}</li>
        </ul>
      </div>
    </header-box>
    <home-page></home-page>
    <div class="foot"></div>
  </div>
</template>

<script>
import navBox from "@/components/nav-box.vue";
import headerBox from "@/components/header.vue";
import homePage from './components/home-page'
export default {
  components: {
    navBox,
    headerBox,
    homePage,
  },
  data() {
    return {
      searchEngine: ["前端", "美工", "兼职", "日结", "推广", "夜班"],
      advertiseImg: [
        require("../../assets/images/广告1.jpg"),
        require("../../assets/images/广告2.jpg"),
        require("../../assets/images/广告3.jpg"),
      ],
    };
  },
};
</script>

<style lang="scss">
.el-carousel__item img {
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<style lang="scss" scoped>
.home-box {
  width: 100%;
  // height: 100vh;
  background-color: rgb(248, 248, 248);
  .advertise-box {
    margin: 1px 0;
    height: 200px;
    background-color: rgb(187, 222, 185);
    box-shadow: 1px 2px #9991;
    .bg-box {
      position: relative;
      margin: 0 auto;
      width: 1200px;
      height: 100%;
      img {
        position: absolute;
      }
      .card-box {
        float: right;
        width: 50%;
      }
    }
  }
  .header-box {
    margin-top: 20px;
    .moudel-first {
      display: inline-block;
    }
    .search-engine {
      & > span:first-child {
        font-size: 14px;
        color: #aaa;
      }
      ul {
        display: inline-block;
        margin: 0;
        padding-left: 10px;
        font-size: 14px;
        color: #aaa;
        li:hover {
          color: orange;
        }
      }
    }
  }
  .foot {
    width: 100%;
    height: 300px;
    background-color: #fff;
  }
}
</style>