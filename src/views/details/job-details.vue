<template>
  <div class="company-details">
    <nav-box></nav-box>
    <div class="content-box">
      <div class="left">
        <div class="intro-top">
          <div>{{ jobInfo.job_name }}</div>
          <div>{{ jobInfo.com_name }}</div>
        </div>
        <div class="intro-center">
          <div>
            <span>{{ jobInfo.salary }}</span>
            <button
              @click="pullResume"
              :style="btn == '简历已发送' ? 'background-color: #a0a0a0;' : ''"
            >
              {{ btn }}
            </button>
          </div>
          <div>
            <span>{{ jobInfo.location }}</span>
            <span>|</span>
            <span>{{ jobInfo.eduction }}</span>
            <span>|</span>
            <span>{{ jobInfo.experience }}</span>
            <span @click="toCollection">{{ collection }}</span>
          </div>
        </div>
        <div class="position-intro">
          <h4>职位描述：</h4>
          <div>
            <span>职责描述：</span>
            <div id="duty"></div>
          </div>
          <div>
            <span>任职要求：</span>
            <div id="requirement"></div>
          </div>
        </div>
        <div class="company-intro">
          <h4>企业介绍：</h4>
          <div id="intro"></div>
        </div>
      </div>
      <div class="right">
        <img :src="imgUrl" alt="" />
        <div class="company">
          <span>{{ jobInfo.com_name }}</span>
        </div>
        <div>
          <span>融资：</span>
          <span>{{ jobInfo.financing }}</span>
        </div>
        <div>
          <span>公司规模：</span>
          <span>{{ jobInfo.personNum }}</span>
        </div>
        <div>
          <span>公司地址：</span>
          <span>{{ jobInfo.location }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBox from "@/components/nav-box";
import { handResumeInfo } from '@/apis/users'
import {
  toCollectionJob,
  isCollectionJob,
  getTheCompanyInfo,
  isHandResume,
} from "@/apis/index";
var qs = require("qs");
export default {
  components: {
    navBox,
  },
  data() {
    return {
      jobInfo: {},
      btn: "投递简历", // 投递简历状态
      collection: "收藏", // 是否收藏
      imgUrl: require("@/assets/images/didi.png"),
    };
  },
  created() {
    this.getInfo();
    this.getHandInfo()
    this.getCompanyInfo();
  },
  mounted() {
    if (this.$route.query) {
      this.jobInfo = JSON.parse(this.$route.query.jobInfo);
      let divbox = document.getElementById("duty");
      if (this.jobInfo.duty) {
        divbox.innerHTML = this.jobInfo.duty;
      }
      let divbox2 = document.getElementById("requirement");
      if (this.jobInfo.requirement) {
        divbox2.innerHTML = this.jobInfo.requirement;
      }
    }
  },
  methods: {
    // 投递简历
    async pullResume() {
      if (JSON.parse(localStorage.getItem('userInfo')).f_url == '') {
        return this.$message.error('您还没有上传简历，请先上传简历后再试')
      }
      if (this.btn == "投递简历") {
        const obj = {
          user_id: JSON.parse(localStorage.getItem("userInfo")).id,
          username: JSON.parse(localStorage.getItem("userInfo")).username,
          f_url: JSON.parse(localStorage.getItem("userInfo")).f_url,
          f_name: JSON.parse(localStorage.getItem("userInfo")).f_name
        };
        const {data:res} = await handResumeInfo(qs.stringify(Object.assign(obj,this.jobInfo)))
        if (res.code == 200) {
          this.btn = "简历已发送";
        } else {
          this.$message.error("投递简历失败，请重试");
        }
      }
    },
    // 收藏
    async toCollection() {
      if (this.collection == "收藏") {
        const obj = {
          user_id: JSON.parse(localStorage.getItem("userInfo")).id,
        };
        const { data: res } = await toCollectionJob(
          qs.stringify(Object.assign(obj, this.jobInfo))
        );
        if (res.code == 200) {
          this.collection = "已收藏";
        } else {
          this.$message.error("收藏失败，请重试");
        }
      }
    },
    async getInfo() {
      const { data: res } = await isCollectionJob({
        job_id: JSON.parse(this.$route.query.jobInfo).id,
        user_id: JSON.parse(localStorage.getItem("userInfo")).id,
      });
      if (res.code == 200) {
        if (res.data.length != 0) {
          this.collection = "已收藏";
        }
      }
    },
    async getHandInfo() {
      const { data: res } = await isHandResume({
        job_id: JSON.parse(this.$route.query.jobInfo).id,
        user_id: JSON.parse(localStorage.getItem("userInfo")).id,
      });
      if (res.code == 200) {
        if (res.data.length != 0) {
          this.btn = "简历已发送";
        }
      }
    },
    async getCompanyInfo() {
      const { data: res } = await getTheCompanyInfo({
        id: JSON.parse(this.$route.query.jobInfo).com_id,
      });
      if (res.code == 200) {
        let divbox3 = document.getElementById("intro");
          divbox3.innerHTML = res.data.doc;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.company-details {
  margin-top: 40px;
  padding-top: 20px;
  width: 100%;
  min-height: calc(100vh - 40px);
  background-color: #f8f8f8;
  .content-box {
    @extend %row;
    align-items: flex-start;
    width: 1200px;
    margin: 0 auto;
    .left {
      width: 900px;
      background-color: #fff;
      box-shadow: 2px 2px #9991;
      .intro-top {
        @extend %col;
        justify-content: space-around;
        margin-top: 20px;
        width: 100%;
        height: 100px;
        background-color: skyblue;
        & > div:first-child {
          font-size: 26px;
          color: #fff;
          font-weight: 600;
        }
        & > div:last-child {
          font-size: 16px;
          color: #fff;
        }
      }
      .intro-center {
        @extend %col;
        justify-content: flex-start;
        width: 100%;
        border-bottom: 1px solid #3333;
        & > div:first-child {
          @extend %row;
          justify-content: space-between;
          margin-top: 20px;
          width: 90%;
          span {
            font-size: 25px;
            color: orange;
          }
          button {
            width: 150px;
            height: 40px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            color: #fff;
            background-color: rgb(144, 202, 241);
            outline-style: none;
            cursor: pointer;
          }
          & > button:active {
            background-color: rgb(144, 202, 241);
            opacity: 0.6;
          }
        }
        & > div:last-child {
          @extend %row;
          justify-content: flex-start;
          width: 90%;
          margin: 20px 0;
          span {
            margin-right: 10px;
          }
          & > span:last-child {
            margin-left: auto;
            margin-right: 60px;
            cursor: pointer;
          }
        }
      }
      .position-intro,
      .company-intro {
        width: 100%;
        border-bottom: 1px solid #3333;
        h4,
        div {
          margin: 20px auto 20px;
          width: 90%;
          span {
            margin-left: 5px;
          }
          p {
            margin-left: 10px;
          }
        }
      }
      .company-intro {
        p {
          width: 90%;
          margin: 0 auto 20px;
        }
      }
    }
    .right {
      width: 280px;
      height: 300px;
      background-color: #fff;
      box-shadow: 2px 2px #9991;
      img {
        display: block;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        box-shadow: 2px 2px #9991;
      }
      div {
        margin: 10px 0 0 20px;
      }
      .company {
        display: flex;
        justify-content: center;
        margin: 20px 0 50px 0;
        width: 100%;
      }
    }
  }
}
</style>