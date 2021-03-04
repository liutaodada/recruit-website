<template>
  <div class="nav-box">
    <div class="header-content">
      <div class="left">
        <div class="logo" @click="toHome">
          <img src="../assets/images/logo3.png" alt="" />
        </div>
        <ul>
          <li @click="toHome">首页</li>
          <li>职位</li>
          <li>公司</li>
          <li>资讯</li>
          <li>发现</li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li><button @click="toLogin('login')">登录</button></li>
          <li>上传简历</li>
          <li>个人中心</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-box {
  width: 100%;
  height: 40px;
  background-color: rgb(50,55,62);
  color: #fff;
  .header-content {
    @extend %row;
    justify-content: space-between;
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    line-height: 40px;
    .left {
      @extend %row;
      .logo {
        height: 40px;
        cursor: pointer;
        img {
          height: 100%;
        }
      }
      ul {
        width: 300px;
        @extend %row;
        li {
          font-size: 14px;
        }
      }
    }
    .right {
      ul {
        width: 300px;
        @extend %row;
        li {
          font-size: 14px;
          button {
            width: 60px;
            color: #fff;
            background: none;
            border: 1px solid rgb(164, 235, 191);
            border-radius: 10px;
            outline-style: none;
            cursor: pointer;
          }
          button:hover {
            color: rgb(85, 221, 137);
          }
        }
      }
    }
  }
}
</style>