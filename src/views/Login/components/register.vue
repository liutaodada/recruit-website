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
        我要招人
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
        <span class="codeBtn" @click="sendCode">{{ codeBtn }}</span>
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
      <el-form-item prop="confirmpasswd">
        <el-input
          prefix-icon="el-icon-lock"
          type="password"
          v-model="registerRuleForm.confirmpasswd"
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
import { Register, sendCodeInfo } from "@/apis/login";
import $ from "jquery";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerRuleForm.passwd !== "") {
          this.$refs.registerRuleForm.validateField("confirmpasswd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerRuleForm.passwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerRuleForm: {
        email: "",
        code: "",
        username: "",
        passwd: "",
        confirmpasswd: "",
      },
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        passwd: [{ validator: validatePass, trigger: "blur" }],
        confirmpasswd: [{ validator: validatePass2, trigger: "blur" }],
      },
      chooseNum: 0,
      codeBtn: "发送验证码",
      times: 60,
    };
  },
  methods: {
    async sendCode() {
      if (this.registerRuleForm.email == "") {
        return this.$message.error("请输入邮箱地址");
      }
      const { data: res } = await sendCodeInfo({
        email: this.registerRuleForm.email,
      });
      if (res.code == 200) {
        this.times = 60;
        $(".codeBtn").css("pointer-events", "none");
        var code_clock = window.setInterval(() => {
          this.times -= 1;
          if (this.times <= 0) {
            window.clearInterval(code_clock);
            $(".codeBtn").css("pointer-events", "auto");
            return (this.codeBtn = "重新发送");
          }
          this.codeBtn = "已发送 " + this.times + "s";
        }, 1000);
      }
    },
    toRegister(formName) {
      var qs = require("qs");
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            email: this.registerRuleForm.email,
            code: this.registerRuleForm.code,
            username: this.registerRuleForm.username,
            passwd: this.registerRuleForm.passwd,
            userType: this.chooseNum,
          };
          const { data: res } = await Register(qs.stringify(obj));
          if (res.code == 200) {
            this.$message.success("注册成功，请登录");
            this.isRegister();
          }
          if (res.code == 204) {
            this.$message.error(res.message);
          }
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
  width: 90%;
  .el-form-item {
    .el-form-item__content {
      margin-left: 90px !important;
    }
  }
  .el-input {
    width: 75%;
  }
  .el-input__inner {
    width: 100%;
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
  margin-top: 40px;
  width: 500px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  opacity: 0.85;
  .codeBtn {
    margin-left: 5px;
    cursor: pointer;
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
      width: 75%;
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