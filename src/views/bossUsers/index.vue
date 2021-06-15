<template>
  <!-- boss用户登录首页 -->
  <div class="boss-user-index">
    <el-container>
      <el-header>
        <span class="title">Job直聘 企业版</span>
        <el-dropdown :show-timeout="0">
          <span style="color: #fff;">{{ username }}</span>
          <el-dropdown-menu class="menu" slot="dropdown">
            <el-dropdown-item @click.native="goOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            router
            @select="handleSelect"
          >
            <el-menu-item
              v-for="(item, index) in route"
              :key="index"
              :index="item.path"
              >{{ item.meta.title }}</el-menu-item
            >
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { routes } from "@/router/index";
export default {
  data() {
    return {
      username: "",
      activeIndex: "",
      route: [],
    };
  },
  mounted() {
    this.username = JSON.parse(localStorage.getItem("userInfo")).username;
    this.route = routes[4].children;
    this.activeIndex = this.$route.path;
  },
  methods: {
    // 退出登录
    goOut() {
      localStorage.setItem("userInfo", JSON.stringify({}));
      this.$router.push("/login");
    },
    handleSelect(val) {
      this.activeIndex = val;
      if (this.activeIndex == "1") {
        this.$router.push("/boss/release");
      }
    },
  },
};
</script>

<style lang="scss">
.boss-user-index {
  .el-header {
    position: fixed;
    top: 0;
    z-index: 2001;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(50, 55, 62);
  }
  .el-aside {
    position: fixed;
    top: 60px;
    left: 0;
    min-height: calc(100vh - 60px);
    background-color: rgb(88, 96, 107);
  }
  .el-main {
    margin: 60px 0 0 200px;
  }
  .el-dropdown-selfdefine {
    margin-right: 20px;
    color: #fff;
    cursor: pointer;
  }
  .el-menu {
    border-right: none;
    background-color: transparent;
  }
  .el-menu-item {
    width: 100%;
    text-align: center;
    font-size: 16px;
  }
  .el-menu-item:focus {
    background-color: transparent;
  }
}
.el-dropdown-menu__item {
  display: block !important;
}
</style>
<style lang="scss" scoped>
.boss-user-index {
  width: 100%;
  .title {
    font-size: 20px;
    font-weight: 600px;
    color: #fff;
  }
}
</style>