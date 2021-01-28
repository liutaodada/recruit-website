<template>
  <div class="login-box">
    <div class="banner">
      <div class="banner-demo">
        <div class="login-logo">
          <img src="../../assets/images/logo.png" alt="" />
        </div>
        <div class="type-btn">
          <button>我要招聘</button>
          <button>我要应聘</button>
        </div>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item>
            <el-input
              v-model="ruleForm.username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              prefix-icon="el-icon-lock"
              type="password"
              v-model="ruleForm.passwd"
              placeholder="请输入密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              v-if="flag == false"
              type="primary"
              @click="submitForm('ruleForm')"
              class="btn"
              >登录</el-button
            >
            <el-button
              v-else
              type="primary"
              @click="toRegister('ruleForm')"
              class="btn"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
        <div class="demo-foot">
          <span v-if="flag == false" @click="toLogin"
            >还没有账号，立即注册</span
          >
          <span v-else @click="toLogin">已有账号，直接登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        passwd: "",
        username: "",
      },
      rules: {
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
      flag: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return this.$message.error("用户名或密码错误，请检查无误后重试");
        } else {
          this.$message.success("登录成功");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      console.log("asdas");
    },
    toLogin() {
      this.flag = !this.flag;
    },
  },
};
</script>

<style lang="scss">
.login-box {
  .demo-ruleForm {
    width: 80%;
    .el-input__inner {
      width: 80%;
    }
  }
}
</style>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100vh;
  background-color: rgb(173, 233, 196);
  .banner {
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    .banner-demo {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin: 0 auto;
      width: 600px;
      height: 500px;
      background-color: rgb(255, 255, 255);
      border-radius: 8px;
      .type-btn {
        button {
          margin: 0 10px;
          width: 100px;
          height: 30px;
          font-size: 14px;
          background-color: #fff;
          border: 1px solid rgb(228, 222, 222);
          outline-color: rgb(173, 233, 196);
          letter-spacing: 1px;
          cursor: pointer;
        }
      }
      .login-logo {
        width: 100%;
        height: 20%;
        text-align: center;
      }
      .demo-ruleForm {
        margin-top: 40px;
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
        font-size: 14px;
        color: rgb(116, 211, 152);
        cursor: pointer;
      }
    }
  }
}
</style>