<template>
  <div class="banner-demo">
    <div class="login-logo">
      <img src="../../../assets/images/logo2.png" alt="" />
    </div>
    <div class="type-btn">
      <button
        @click="changeType('staff')"
        :class="loginRuleForm.userType == 0 ? 'cur' : ''"
      >
        我找工作
      </button>
      <button
        @click="changeType('boss')"
        :class="loginRuleForm.userType == 1 ? 'cur' : ''"
      >
        我是boss
      </button>
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
import { Login } from "@/apis/login";
export default {
  data() {
    return {
      loginRuleForm: {
        userType: 0,
        username: "",
        passwd: "",
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
    changeType(type) {
      if (type == "staff") {
        this.loginRuleForm.userType = 0;
      }
      if (type == "boss") {
        this.loginRuleForm.userType = 1;
      }
    },
    toLogin(formName) {
      var qs = require("qs");
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await Login(qs.stringify(this.loginRuleForm));
          if (res.code == 200) {
            
            if (this.loginRuleForm.userType == 0) {
              this.$router.push("/");
              this.$message.success('登录成功')
            } else {
              this.$router.push("/boss/index");
            }
            localStorage.setItem("userInfo", JSON.stringify(res.data.list));
          } else {
            this.$message.error("用户名或密码错误，请重试");
          }
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
  height: 500px;
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
  .type-btn {
    button {
      margin: 10px 10px 0 10px;
      width: 100px;
      height: 30px;
      font-size: 14px;
      background-color: #fff;
      border: 1px solid rgb(228, 222, 222);
      outline-style: none;
      letter-spacing: 1px;
      cursor: pointer;
    }
    .cur {
      border: 1px solid rgb(85, 221, 137);
      color: rgb(85, 221, 137);
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
      width: 75%;
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