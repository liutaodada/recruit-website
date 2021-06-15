<template>
  <div class="nav-box">
    <div class="header-content">
      <div class="left">
        <div class="logo" @click="toHome">
          <img src="../assets/images/logo3.png" alt="" />
        </div>
        <ul>
          <li @click="toHome">首页</li>
          <li @click="toAllJob">全部职位</li>
          <li @click="toAllCompany">全部公司</li>
        </ul>
      </div>
      <div class="right">
        <ul>
          <li v-if="user == ''">
            <button @click="toLogin('login')">登录</button>
          </li>
          <el-dropdown :show-timeout="0" v-else>
            <li>{{ "用户_" + user }}</li>
            <el-dropdown-menu class="menu" slot="dropdown">
              <el-dropdown-item @click.native="jumpWeb('personalCenter')"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item @click.native="toMyCollection"
                >我的收藏</el-dropdown-item
              >
              <el-dropdown-item @click.native="goOut"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("userInfo")).username) {
      this.user = JSON.parse(localStorage.getItem("userInfo")).username;
    }
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    toAllJob() {
      this.$router.push('/index/alljob')
    },
    toAllCompany() {
      this.$router.push('/index/allcompany')
    },
    toLogin() {
      this.$router.push("/login");
    },
    jumpWeb(type) {
      if (type == "personalCenter") {
        if (JSON.parse(localStorage.getItem("userInfo")).id) {
          return this.$router.push("/users/personal-center");
        }
        this.$message.error("请先登录");
      }
    },
    // 去我的收藏
    toMyCollection() {
      this.$router.push({path:"/users/collection",query: {activeIndex: '2'}});
    },
    // 退出登录
    goOut() {
      localStorage.setItem("userInfo", JSON.stringify({}));
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
.nav-box {
  .el-dropdown-selfdefine {
    color: #fff;
  }
}
.el-dropdown-menu__item {
  display: block !important;
}
</style>
<style lang="scss" scoped>
.nav-box {
  position: fixed;
  top: 0;
  z-index: 2001;
  width: 100%;
  height: 40px;
  background-color: rgb(50, 55, 62);
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