<template>
  <div class="login-box">
    <div class="bg"></div>
    <nav-box class="nav-box"></nav-box>
    <div class="login-content">
      <login @isLogin="isLogin" v-if="flag == true"></login>
      <register @isRegister="isRegister" v-if="flag == false"></register>
    </div>
  </div>
</template>

<script>
import Login from "@/views/Login/components/login.vue";
import Register from "@/views/Login/components/register.vue";
import navBox from "@/components/nav-box.vue";
export default {
  components: {
    Login,
    Register,
    navBox,
  },
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    isLogin() {
      this.flag = false;
    },
    isRegister() {
      this.flag = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  min-height: 100vh;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../assets/images/背景3.png") no-repeat;
    background-position: center 0;
    background-attachment: fixed;
    background-size: cover;
    -webkit-background-size: cover; /* 兼容Webkit内核浏览器如Chrome和Safari */
    -o-background-size: cover; /* 兼容Opera */
    zoom: 1;
  }
  .nav-box {
    opacity: 0.8;
  }
  .login-content {
    @extend %row;
    margin: 0 auto;
    width: 1200px;
    height: 100vh;
  }
}
</style>