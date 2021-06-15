<template>
  <!-- 个人中心 -->
  <div class="personal-center-box">
    <nav-box></nav-box>
    <div class="content-box">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">个人信息</el-menu-item>
        <el-menu-item index="2">修改密码</el-menu-item>
      </el-menu>
      <div class="personal-info" v-if="activeIndex == '1'">
        <div class="first-module" v-if="showEdit == false">
          <img :src="imageUrl" alt="" />
          <span @click="toEditInfo"><i class="el-icon-edit"></i>编辑</span>
        </div>
        <div class="first-module" v-if="showEdit == true">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="second-module" v-if="showEdit == false">
          <span
            >{{ username }}
            <i
              :class="[
                'sex-box',
                sex == 'man' ? 'el-icon-male' : 'el-icon-female',
              ]"
            ></i
          ></span>
          <span>{{ jobInfo ? jobInfo : "我还没填写职业信息" }}</span>
          <span>{{ intro ? intro : "我还没填写个人介绍" }}</span>
        </div>
        <div class="second-module" v-if="showEdit == true">
          <el-input v-model="username" placeholder="姓名"></el-input>
          <el-radio-group v-model="sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
          <el-input v-model="jobInfo" placeholder="职业"></el-input>
          <el-input v-model="intro" placeholder="个人介绍"></el-input>
        </div>
        <div class="btn-area" v-if="showEdit == true">
          <button class="save-btn" @click="saveInfo">保存</button>
          <button class="cancel-btn" @click="cancelInfo">取消</button>
        </div>
      </div>
      <div class="modify-passwd" v-if="activeIndex == '2'">
        <div>
          <span>登录账号：</span><span>{{ accountNumber }}</span>
        </div>
        <el-input v-model="newPasswd" placeholder="请输入新密码"></el-input>
        <el-input
          v-model="againPasswd"
          placeholder="请再次输入新密码"
        ></el-input>
        <div class="btn-area">
          <button class="save" @click="savePass">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBox from "@/components/nav-box.vue";
import { editUsersInfo, getUsersInfo, modifyPass } from "@/apis/users";
export default {
  components: {
    navBox,
  },
  data() {
    return {
      activeIndex: "1",
      username: "",
      imageUrl: require("C:/Users/yindun/Desktop/personal-project/express-demo/public/夕阳.jpg"),
      jobInfo: "", // 职业信息
      intro: "", // 个人介绍
      sex: 0, // 性别
      showEdit: false, // 是否可编辑
      accountNumber: "", // 账号
      newPasswd: "", // 新密码
      againPasswd: "", // 再次输入新密码
    };
  },
  mounted() {
    this.getList();
    this.accountNumber = JSON.parse(localStorage.getItem("userInfo")).email;
  },
  methods: {
    handleSelect(val) {
      this.activeIndex = val;
    },
    toEditInfo() {
      this.showEdit = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isPNG) {
        this.$message.error("上传头像图片只能是 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isPNG && isLt2M;
    },
    async saveInfo() {
      var qs = require("qs");
      const obj = {
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        username: this.username,
        sex: this.sex,
        jobInfo: this.jobInfo,
        intro: this.intro,
        icon: this.imageUrl,
      };
      const { data: res } = await editUsersInfo(qs.stringify(obj));
      console.log(res);
      this.showEdit = false;
    },
    cancelInfo() {
      this.getList();
      this.showEdit = false;
    },
    savePass() {
      if (this.newPasswd == "" || this.againPasswd == "") {
        this.$message.error("密码不能为空");
      } else if (this.newPasswd != "" && this.againPasswd != "") {
        if (this.newPasswd != this.againPasswd) {
          this.$message.error("两次密码不一致，请检查后再试");
        } else {
          this.modifyPasswd();
        }
      }
    },
    async getList() {
      const { data: res } = await getUsersInfo({
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        userType: 0,
      });
      if (res.code == 200) {
        // this.imageUrl = res.data.icon
        this.intro = res.data.intro;
        this.jobInfo = res.data.jobInfo;
        this.sex = res.data.sex;
        this.username = res.data.username;
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      }
    },
    // 修改密码
    async modifyPasswd() {
      var qs = require("qs");
      const obj = {
        password: this.newPasswd,
        id: JSON.parse(localStorage.getItem("userInfo")).id,
      };
      const { data: res } = await modifyPass(qs.stringify(obj));
      if (res.code == 200) {
        this.$message.success("修改成功");
      }
    },
  },
};
</script>

<style lang="scss">
.personal-center-box {
  .el-menu-demo {
    background-color: transparent;
    .el-menu-item:focus,
    .el-menu-item:hover {
      background-color: transparent;
    }
  }
  .el-input__inner {
    margin-bottom: 20px;
    width: 300px;
    border: none;
    border-bottom: 1px solid #dad7d7;
    border-radius: 0;
    background-color: transparent;
  }
  .modify-passwd {
    .el-input__inner {
      padding-left: 0;
      margin-top: 20px;
      margin-bottom: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
.personal-center-box {
  width: 100%;
  height: 100vh;
  background-color: rgb(248, 248, 248);
  box-sizing: border-box;
  .content-box {
    margin: 0 auto;
    padding-top: 40px;
    width: 1200px;
    height: 100vh;
    box-sizing: border-box;
    .personal-info {
      margin: 50px auto 0;
      @extend %col;
      width: 100%;
      .first-module {
        position: relative;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        span {
          position: absolute;
          top: 0;
          right: -60px;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
        }
      }
      .second-module {
        @extend %col;
        span {
          margin: 5px 0;
          width: 500px;
          text-align: center;
          color: #555;
        }
        & > span:first-child {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          .sex-box {
            display: inline-block;
            padding-top: 1px;
            box-sizing: border-box;
            width: 18px;
            height: 18px;
            color: rgb(248, 248, 248);
            background-color: rgb(90, 184, 230);
            border-radius: 2px;
          }
        }
      }
      .btn-area {
        button {
          width: 100px;
          height: 30px;
          background-color: rgb(0, 160, 255);
          border: 1px solid #999;
          color: #333333;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          outline-style: none;
        }
        .save-btn {
          margin-right: 10px;
          border: none;
          color: #fff;
        }
        .cancel-btn {
          background-color: transparent;
        }
        .save-btn:active {
          background-color: rgb(0, 160, 255);
          opacity: 0.6;
        }
        .cancel-btn:active {
          background-color: #fff;
          opacity: 0.6;
        }
      }
    }
    .modify-passwd {
      margin: 50px auto 0;
      width: 300px;
      @extend %col;
      align-items: flex-start;
      & > div:first-child {
        width: 100%;
        height: 30px;
        border-bottom: 1px dashed #dad7d7;
      }
      .btn-area {
        margin-top: 20px;
        width: 100%;
        .save {
          width: 100%;
          height: 30px;
          border: none;
          background-color: rgb(90, 184, 230);
          outline-style: none;
          color: #fff;
          font-size: 14px;
          border-radius: 4px;
          cursor: pointer;
        }
        .save:active {
          background-color: rgb(90, 184, 230);
          opacity: 0.6;
        }
      }
    }
  }
}
</style>