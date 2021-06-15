<template>
  <div class="com-box">
    <nav-box></nav-box>
    <div class="header-box">
      <div class="header">
        <div class="icon">
          <img src="" alt="" />
        </div>
        <div class="info">
          <div class="title">{{ companyInfo.companyName }}</div>
          <div>
            <span>{{ companyInfo.address }} | </span>
            <span>{{ companyInfo.financing }} | </span>
            <span>{{ companyInfo.nature }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="intro">
        <div>公司介绍</div>
        <div id="companyIntro"></div>
        <div @click="openIntro" style="cursor: pointer">
          <i
            :class="[open == false ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"
          ></i>
          <span>{{ open == false ? "展开详情" : "收起全部" }}</span>
        </div>
      </div>
      <div class="job-box">
        <div>该公司全部职位</div>
        <div class="job-list-box">
          <div class="job-list">
            <div class="card" v-for="(item, index) in jobList" :key="index">
              <div class="left">
                <div class="title" @click="toDetail(item)">
                  {{ item.job_name }}
                </div>
                <div>
                  <span>{{ item.salary }} |</span>
                  <span>{{ item.eduction }} |</span>
                  <span>{{ item.experience }}</span>
                </div>
                <div>
                  <span>{{ item.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBox from "@/components/nav-box";
import { getJobList } from "@/apis/boss";
export default {
  components: {
    navBox,
  },
  data() {
    return {
      companyInfo: {},
      jobList: [],
      open: false,
    };
  },
  mounted() {
    if (this.$route.query) {
      this.companyInfo = JSON.parse(this.$route.query.companyInfo);
      let divbox = document.getElementById("companyIntro");
      this.companyInfo.doc = this.companyInfo.doc.substr(0, 100);
      divbox.innerHTML = this.companyInfo.doc;
    }
    this.getList();
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        path: "/job/details",
        query: { jobInfo: JSON.stringify(item) },
      });
    },
    openIntro() {
      let divbox = document.getElementById("companyIntro");
      if (this.open == false) {
        divbox.innerHTML = JSON.parse(this.$route.query.companyInfo).doc;
      } else {
        divbox.innerHTML = this.companyInfo.doc;
      }
      this.open = !this.open;
    },
    async getList() {
      const { data: res } = await getJobList({ id: this.companyInfo.id });
      if (res.code == 200) {
        this.jobList = res.data.list;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.com-box {
  margin-top: 40px;
  width: 100%;
  min-height: 100vh;
  background-color: #f8f8f8;
  .header-box {
    width: 100%;
    height: 200px;
    background-color: rgb(39, 76, 85);
    .header {
      @extend %col;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      .icon {
        width: 80px;
        height: 80px;
        background-color: #fff;
      }
      .info {
        @extend %col;
        height: 50px;
        .title {
          font-size: 20px;
          color: #fff;
        }
        & > div:last-child {
          span {
            color: #fff;
          }
        }
      }
    }
  }
  .content {
    width: 1200px;
    margin: 0 auto;
    .intro {
      margin-top: 20px;
      & > div:first-child {
        height: 40px;
        font-size: 20px;
        font-weight: 600;
        color: rgba(90, 168, 12, 0.404);
        border-bottom: 1px solid #7e7e7e;
      }
    }
    .job-box {
      margin-top: 20px;
      & > div:first-child {
        height: 40px;
        font-size: 20px;
        font-weight: 600;
        color: rgba(90, 168, 12, 0.404);
        border-bottom: 1px solid #7e7e7e;
      }
      .job-list-box {
        width: 100%;
        .job-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 20px;
          margin-top: 20px;
          width: 100%;
          .card {
            margin-top: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 120px;
            background-color: #fff;
            border: 1px solid rgba(76, 109, 98, 0.067);
            box-shadow: 2px 2px #9991;
            .title {
              cursor: pointer;
              font-size: 20px;
              color: rgb(115, 208, 245);
            }
            span {
              margin-right: 5px;
              font-size: 16px;
            }
            .left {
              @extend %col;
              justify-content: space-around;
              align-items: flex-start;
              padding-left: 20px;
              width: 100%;
              height: 80%;
            }
          }
        }
      }
    }
  }
}
</style>