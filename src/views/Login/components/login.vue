<template>
  <div class="banner-demo">
    <div class="login-logo">
      <img src="../../../assets/images/logo2.png" alt="" />
    </div>
    <el-form
      :model="loginRuleForm"
      :rules="loginRules"
      ref="loginRuleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input
          v-model="loginRuleForm.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passwd">
        <el-input
          prefix-icon="el-icon-lock"
          type="password"
          v-model="loginRuleForm.passwd"
          placeholder="请输入密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <span class="forget-pwd">忘记密码？</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toLogin('loginRuleForm')" class="btn"
          >登录</el-button
        >
      </el-form-item>
      <span class="tip"
        >登录即同意<a href="#">《用户协议》</a> &<a href="#"
          >《隐私政策》</a
        ></span
      >
    </el-form>
    <div class="demo-foot">
      <span @click="isLogin">还没有账号，立即注册</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginRuleForm: {
        passwd: "",
        username: "",
      },
      loginRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        passwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    toLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success("登录成功");
        } else {
          this.$message.error("用户名或密码错误，请检查无误后重试");
          return false;
        }
      });
    },
    isLogin() {
      this.$emit("isLogin");
    },
  },
};
</script>

<style lang="scss">
.demo-ruleForm {
  width: 80%;
  .el-form-item {
    .el-form-item__content {
      margin-left: 70px !important;
    }
  }
  .el-input__inner {
    width: 80%;
  }
  .el-input__inner:focus {
    border-color: rgb(173, 233, 196);
  }
}
</style>

<style lang="scss" scoped>
.banner-demo {
  @extend %col;
  justify-content: flex-start;
  width: 500px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  opacity: 0.85;
  .login-logo {
    width: 100%;
    height: 20%;
    text-align: center;
    img {
      margin-top: 10px;
    }
  }
  .demo-ruleForm {
    position: relative;
    margin-top: 40px;
    .forget-pwd {
      position: absolute;
      right: 75px;
      top: -20px;
      display: block;
      width: 60px;
      font-size: 12px;
      cursor: pointer;
    }
    .btn {
      width: 80%;
      text-align: center;
      font-size: 16px;
      border: none;
      background-color: rgb(173, 233, 196);
    }
    .tip {
      display: block;
      margin-bottom: 10px;
      text-align: center;
      font-size: 12px;
    }
  }
  .demo-foot {
    font-size: 14px;
    color: rgb(116, 211, 152);
    cursor: pointer;
  }
}
</style>