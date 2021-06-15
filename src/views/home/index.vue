<template>
  <div class="home-box">
    <nav-box></nav-box>
    <div class="advertise-box">
      <div class="bg-box">
        <img src="../../assets/images/advertise-bg.png" alt="" />
        <!-- <div class="card-box">
          <el-carousel
            :interval="4000"
            type="card"
            height="200px"
            indicator-position="none"
          > 
            <el-carousel-item v-for="item in advertiseImg" :key="item">
              <img :src="item" alt="" style="width: 100%" height="100%" />
            </el-carousel-item>
          </el-carousel>
        </div> -->
        <div class="resume-box">
          <div>简历管理</div>
          <div>
            <el-upload
              class="upload-demo"
              action="http://localhost:3000/upload"
              :before-remove="beforeRemove"
              :before-upload="handleExceed"
              multiple
              :limit="1"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点此选择文件</el-button>
            </el-upload>
            <el-button type="primary" class="upload" @click="upload">上传简历</el-button>
          </div>
        </div>
      </div>
    </div>
    <header-box class="header-box">
      <!-- <div slot="left">asdasd</div> -->
      <div slot="moudel-first" class="moudel-first"></div>
      <div slot="search-engine" class="search-engine">
        <span>猜您搜索：</span>
        <ul v-for="(item, index) in searchEngine" :key="index">
          <li @click="searchJob(item)">{{ item }}</li>
        </ul>
      </div>
    </header-box>
    <home-page></home-page>
    <div class="foot"></div>
    <el-backtop>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaohuojian-b"></use>
      </svg>
    </el-backtop>
  </div>
</template>

<script>
import navBox from "@/components/nav-box.vue";
import headerBox from "@/components/header.vue";
import homePage from "./components/home-page";
import "@/assets/font_kl50xn9hju/iconfont.js";
import { uploadResume } from "@/apis/index";
import { upload, getUsersInfo } from "@/apis/users";
var qs = require("qs");
export default {
  components: {
    navBox,
    headerBox,
    homePage,
  },
  data() {
    return {
      searchEngine: ["前端", "美工", "兼职", "日结", "推广", "夜班"],
      advertiseImg: [
        require("../../assets/images/广告1.jpg"),
        require("../../assets/images/广告2.jpg"),
        require("../../assets/images/广告3.jpg"),
      ],
      fileList: [],
      file: {},
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    searchJob(item) {
      this.$router.push({path:"/index/alljob",query:{job_name: item}})
    },
    handleExceed(file) {
      this.file = file;
      const isPdf = file.type === "application/pdf";
      if (!isPdf) {
        return this.$message.error("只能上传pdf格式的文件");
      }
      this.submit();
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    async upload() {
      if (this.fileList[0].url == "") {
        return this.$message.error("您还未选择文件");
      }
      const obj = {
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        f_name: this.fileList[0].name,
        f_url: this.fileList[0].url,
      };
      const { data: res } = await upload(qs.stringify(obj));
      if (res.code == 200) {
        this.$message.success("上传成功");
        this.getInfo();
      }
    },
    async submit() {
      let fileFormData = new FormData();
      fileFormData.append("file", this.file);
      const { data: res } = await uploadResume(fileFormData);
      if (res.code == 200) {
        this.fileList = [
          {
            name: res.data.f_name,
            url: res.data.f_path,
          },
        ];
      }
    },
    async getInfo() {
      const { data: res } = await getUsersInfo({
        userType: JSON.parse(localStorage.getItem("userInfo")).userType,
        id: JSON.parse(localStorage.getItem("userInfo")).id,
      });
      if (res.code == 200) {
        if (res.data.f_url) {
          this.fileList = [
            {
              name: res.data.f_name,
              url: res.data.f_url,
            },
          ];
        }
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      }
    },
  },
};
</script>

<style lang="scss">
.home-box {
  .upload-demo {
    @extend %col;
  }
}
.el-carousel__item img {
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-backtop {
  bottom: 100px !important;
  width: 60px !important;
  height: 60px !important;
  background: transparent !important;
  box-shadow: none !important;
}
</style>

<style lang="scss" scoped>
.home-box {
  margin-top: 40px;
  width: 100%;
  background-color: rgb(248, 248, 248);
  .advertise-box {
    position: relative;
    margin: 1px 0;
    height: 200px;
    background-color: rgb(187, 222, 185);
    box-shadow: 1px 2px #9991;
    .bg-box {
      position: relative;
      margin: 0 auto;
      width: 1200px;
      height: 100%;
      img {
        position: absolute;
      }
      .card-box {
        float: right;
        width: 50%;
      }
      .resume-box {
        @extend %col;
        justify-content: space-around;
        position: absolute;
        top: 0;
        right: 50px;
        width: 250px;
        height: 200px;
        background-color: #fff;
        // z-index: 2001;
        & > div:last-child {
          @extend %col;
        }
        .upload {
          margin-top: 20px;
        }
      }
    }
  }
  .header-box {
    margin-top: 20px;
    .moudel-first {
      display: inline-block;
    }
    .search-engine {
      & > span:first-child {
        font-size: 14px;
        color: #aaa;
      }
      ul {
        display: inline-block;
        margin: 0;
        padding-left: 10px;
        font-size: 14px;
        color: #aaa;
        li:hover {
          color: orange;
        }
      }
    }
  }
  .foot {
    width: 100%;
    height: 300px;
    background-color: #fff;
  }
}
</style>