<template>
  <div class="content">
    <div class="banner-box">
      <div class="job-card">
        <el-popover
          class="job-card-content"
          placement="right"
          width="400"
          trigger="hover"
          :close-delay="0"
          v-for="index in 8"
          :key="index"
          @mouseover.native="flag = index"
        >
          <ul slot="reference">
            <li>技术</li>
            <li>Java</li>
            <li>PHP</li>
            <li>web前端</li>
            <li>算法工程师</li>
            <li><i class="el-icon-arrow-right"></i></li>
          </ul>
          <div>
            <div class="unfold">sdgds</div>
          </div>
        </el-popover>
      </div>
      <div class="ad-card">
        <span>广告</span>
        <a href="#"><img src="../../../assets/images/ad.png" alt="" /></a>
      </div>
      <el-divider>热招职位</el-divider>
      <div class="recommend-card">
        <div class="job-sort">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item
              v-for="(item, index) in jobList"
              :key="index"
              :index="index.toString()"
              >{{ item }}</el-menu-item
            >
          </el-menu>
        </div>
        <div class="job-sort-content">
          <div class="job-sort-card" v-for="index in 9" :key="index">
            <div class="job-name">
              <span class="job-title">中国区-前端工程师</span>
              <span>15-30K·14薪</span>
            </div>
            <ul class="job-requirement">
              <li>北京</li>
              <li>经验不限</li>
              <li>本科</li>
            </ul>
            <span class="line"></span>
            <div class="company">
              <div class="company-logo">
                <img src="../../../assets/images/xiaomi.png" alt="" />
              </div>
              <span class="company-name">小米</span>
              <ul class="company-info">
                <li>互联网</li>
                <li>已上市</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="watchMore"><button>查看更多</button></div>
      <el-divider>热门企业</el-divider>
      <div class="hot-company">
        <div class="hot-company-content" v-for="index in 8" :key="index">
          <div class="logo">
            <img src="../../../assets/images/xiaomi.png" alt="" />
          </div>
          <span class="company-name">小米</span>
          <div class="intro">
            <span>不需要融资</span>
            <span> | </span>
            <span>互联网金融</span>
          </div>
          <button>100个热招职位</button>
        </div>
      </div>
      <div class="watchMore"><button>查看更多</button></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "",
      jobList: [
        "IT·互联网",
        "教育培训",
        "法律咨询",
        "市场专员",
        "销售经理",
        "新媒体运营",
        "物流管理",
      ],
      flag: "",
    };
  },
  created() {
    this.activeIndex = this.jobList[0];
  },
  methods: {
    handleSelect() {},
  },
};
</script>

<style lang="scss">
.banner-box {
  .el-divider--horizontal {
    margin: 50px 0 !important;
    width: 30% !important;
  }
  .el-divider__text.is-center {
    font-size: 25px;
    font-weight: 500;
    background: rgb(248, 248, 248);
  }
  .job-sort {
    .el-menu {
      @extend %row;
      .el-menu-item.is-active {
        font-weight: 600;
        color: orange;
        border-color: orange;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.banner-box {
  @extend %row;
  flex-wrap: wrap;
  margin: 30px auto;
  width: 1200px;
  font-size: 14px;
  font-weight: 400;
  font-family: PingFangSC-Regular, PingFang SC;
  color: rgb(141, 146, 161);
  .job-card {
    @extend %col;
    justify-content: flex-start;
    width: 35%;
    height: 400px;
    background-color: #fff;
    box-shadow: 2px 2px #9991;
    .job-card-content {
      position: relative;
      width: 100%;
      height: 50px;
      ul {
        @extend %row;
        justify-content: space-between;
        line-height: 50px;
        color: #61687c;
        & > li:first-child {
          padding-left: 20px;
          font-size: 16px;
          font-weight: 600;
          color: #414a60;
          cursor: auto;
        }
        & > li:last-child {
          margin-right: 20px;
          cursor: auto;
        }
      }
      .unfold {
        color: red !important;
      }
    }
    .job-card-content:hover {
      ul {
        color: #fff;
      }
      background-color: rgb(187, 222, 185);
    }
  }
  .ad-card {
    position: relative;
    width: 62%;
    height: 400px;
    background-color: #fff;
    box-shadow: 2px 2px #9991;
    span {
      position: absolute;
      bottom: 1px;
      right: 1px;
      text-align: center;
      width: 28px;
      height: 15px;
      font-size: 4px;
      color: rgba(255, 255, 255, 0.6);
      background: rgb(141, 119, 79);
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .recommend-card {
    width: 100%;
    height: 530px;
    background-color: #fff;
    box-shadow: 2px 2px #9991;
    .job-sort {
      width: 100%;
    }
    .job-sort-content {
      @extend %row;
      flex-wrap: wrap;
      width: 100%;
      height: 400px;
      .job-sort-card {
        cursor: pointer;
        @extend %col;
        margin-top: 10px;
        width: 32%;
        height: 140px;
        border: 1px solid rgba(76, 109, 98, 0.067);
        box-shadow: 2px 2px #9991;
        .job-name {
          @extend %row;
          justify-content: space-between;
          width: 90%;
          font-size: 16px;
          color: #414a60;
          & > span:last-child {
            color: rgb(255, 81, 0);
          }
        }
        .job-requirement {
          width: 90%;
          margin: 10px 0;
          li {
            padding: 0 10px;
            border-right: 1px solid rgb(224, 224, 224);
          }
          & > li:first-child {
            padding-left: 0;
          }
          & > li:last-child {
            border: none;
          }
        }
        .line {
          margin-bottom: 10px;
          width: 90%;
          border-bottom: 1px solid #9991;
        }
        .company {
          @extend %row;
          justify-content: flex-start;
          width: 90%;
          height: 40px;
          .company-logo {
            img {
              width: 30px;
              height: 30px;
              border: 1px solid rgb(224, 224, 224);
            }
          }
          .company-name {
            margin: 0 10px;
          }
          .company-info {
            li {
              padding: 0 10px;
            }
            & > li:first-child {
              border-right: 1px solid rgb(224, 224, 224);
            }
          }
        }
      }
      .job-sort-card:hover {
        .job-title {
          color: rgb(255, 81, 0);
        }
      }
    }
  }
  .hot-company {
    @extend %row;
    flex-wrap: wrap;
    width: 100%;
    height: 510px;
    background-color: #fff;
    box-shadow: 2px 2px #9991;
    .hot-company-content {
      @extend %col;
      justify-content: space-around;
      width: 284px;
      height: 238px;
      border: 1px solid rgba(76, 109, 98, 0.067);
      cursor: pointer;
      .logo {
        margin-top: 20px;
        img {
          width: 60px;
          height: 60px;
          border: 1px solid rgb(224, 224, 224);
          border-radius: 10px;
        }
      }
      .company-name {
        font-size: 16px;
        color: #414a60;
      }
      .intro {
        font-size: 12px;
        & > span:nth-child(2) {
          margin: 0 5px;
        }
      }
      button {
        margin-bottom: 20px;
        width: 180px;
        height: 35px;
        background-color: #fff;
        border: 1px solid rgba(53, 65, 61, 0.067);
        cursor: pointer;
        outline-style: none;
      }
      button:hover {
        color: rgb(0, 179, 138);
        border-color: rgb(0, 179, 138);
      }
    }
    .hot-company-content:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
  .watchMore {
    margin-top: 20px;
    width: 100%;
    height: 40px;
    text-align: center;
    button {
      width: 200px;
      height: 100%;
      font-size: 16px;
      font-weight: 400;
      font-family: PingFangSC-Regular, PingFang SC;
      letter-spacing: 1px;
      color: #fff;
      border: none;
      background-color: rgb(231, 136, 10);
      outline-style: none;
      cursor: pointer;
    }
  }
}
</style>