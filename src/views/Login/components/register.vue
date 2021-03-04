<template>
  <div class="banner-demo">
    <div class="login-logo">
      <img src="../../../assets/images/logo2.png" alt="" />
    </div>
    <div class="type-btn">
      <button @click="changeType('staff')" :class="chooseNum == 0 ? 'cur' : ''">
        我要应聘
      </button>
      <button @click="changeType('boss')" :class="chooseNum == 1 ? 'cur' : ''">
        我要招聘
      </button>
    </div>
    <el-form
      :model="registerRuleForm"
      :rules="registerRules"
      ref="registerRuleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="email">
        <el-input
          v-model="registerRuleForm.email"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-message"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="registerRuleForm.code"
          placeholder="请输入验证码"
          prefix-icon="el-icon-chat-line-square"
        ></el-input>
      </el-form-item>
      <el-form-item prop="username">
        <el-input
          v-model="registerRuleForm.username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passwd">
        <el-input
          prefix-icon="el-icon-lock"
          type="password"
          v-model="registerRuleForm.passwd"
          placeholder="请输入密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="passwd">
        <el-input
          prefix-icon="el-icon-lock"
          type="password"
          v-model="registerRuleForm.passwd"
          placeholder="确认密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="toRegister('registerRuleForm')"
          class="btn"
          >注册</el-button
        >
      </el-form-item>
      <span class="tip"
        >注册即同意<a href="#">《用户协议》</a> &<a href="#"
          >《隐私政策》</a
        ></span
      >
    </el-form>
    <div class="demo-foot">
      <span @click="isRegister">已有账号，直接登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerRuleForm: {
        passwd: "",
        username: "",
      },
      registerRules: {
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
      chooseNum: 0,
    };
  },
  methods: {
    toRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success("登录成功");
        } else {
          this.$message.error("用户名或密码错误，请检查无误后重试");
          return false;
        }
      });
    },
    isRegister() {
      this.$emit("isRegister");
    },
    changeType(type) {
      if (type == "staff") {
        this.chooseNum = 0;
      }
      if (type == "boss") {
        this.chooseNum = 1;
      }
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
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  opacity: 0.85;
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
  .login-logo {
    width: 100%;
    height: 20%;
    text-align: center;
    img {
      margin-top: 10px;
    }
  }
  .demo-ruleForm {
    margin-top: 20px;
    .tip {
      display: block;
      margin-bottom: 10px;
      text-align: center;
      font-size: 12px;
    }
    .btn {
      margin-top: 10px;
      width: 80%;
      text-align: center;
      font-size: 16px;
      border: none;
      background-color: rgb(173, 233, 196);
    }
  }
  .demo-foot {
    margin-bottom: 30px;
    font-size: 14px;
    color: rgb(116, 211, 152);
    cursor: pointer;
  }
}
</style>