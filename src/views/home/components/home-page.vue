<template>
  <div class="content">
    <div class="banner-box">
      <div class="job-card">
        <el-popover
          :class="['job-card-content', flag == index ? 'ishover' : '']"
          placement="right-start"
          width="500"
          trigger="hover"
          :close-delay="0"
          v-for="(item, index) in s_typeList"
          :key="index"
          @show="flag = index"
          @hide="flag = ''"
        >
          <ul slot="reference">
            <li>{{ item.p_type }}</li>
            <li v-for="(tItem,tIndex) in item.content[0].s_type" :key="tIndex" v-show="tIndex < 3">{{tItem}}</li>
            <li><i class="el-icon-arrow-right"></i></li>
          </ul>
          <div class="unfold">
            <h4>{{ item.p_type }}</h4>
            <div
              class="unfold-content"
              v-for="(pItem, pIndex) in item.content"
              :key="pIndex"
            >
              <span class="unfold-title">{{ pItem.summary }}</span>
              <ul>
                <li v-for="(sItem, sIndex) in pItem.s_type" :key="sIndex" @click="searchJob(sItem)">
                  {{ sItem }}
                </li>
                <el-divider></el-divider>
              </ul>
            </div>
          </div>
        </el-popover>
      </div>
      <div class="ad-card">
        <span>广告</span>
        <a href="#"><img src="../../../assets/images/ad.png" alt="" /></a>
      </div>
      <el-divider>热招职位</el-divider>
      <div class="recommend-card">
        <div class="job-sort-content">
          <div
            class="job-sort-card"
            v-for="(item, index) in hotJobList"
            :key="index"
            @click="toJumpWeb(item)"
          >
            <div class="job-name">
              <span class="job-title">{{ item.job_name }}</span>
              <span>{{ item.salary }}</span>
            </div>
            <ul class="job-requirement">
              <li>{{ item.location }}</li>
              <li>{{ item.experience }}</li>
              <li>{{ item.eduction }}</li>
            </ul>
            <span class="line"></span>
            <div class="company">
              <div class="company-logo">
                <img src="../../../assets/images/xiaomi.png" alt="" />
              </div>
              <span class="company-name">{{ item.com_name }}</span>
              <ul class="company-info">
                <li>{{ item.financing }}</li>
                <li>{{ item.personNum }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="watchMore" @click="toAllJob"><button>查看更多</button></div>
      <el-divider>热门企业</el-divider>
      <div class="hot-company">
        <div
          class="hot-company-content"
          v-for="(item, index) in hotCompanyList"
          :key="index"
          @click="toCompanyDetails(item)"
        >
          <div class="logo">
            <img src="../../../assets/images/xiaomi.png" alt="" />
          </div>
          <span class="company-name">{{ item.companyName }}</span>
          <div class="intro">
            <span>{{ item.financing }}</span>
            <span> | </span>
            <span>{{ item.nature }}</span>
          </div>
        </div>
      </div>
      <div class="watchMore" @click="toAllCompany">
        <button @click="toAllCompany">查看更多</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotJobInfo, getHotCompanyInfo, getJobTypeList } from "@/apis/index";
export default {
  data() {
    return {
      flag: "",
      hotJobList: [], // 热门职位列表
      hotCompanyList: [], // 热门公司列表
      p_typeList: [
        {
          p_type: "",
          content: [
            {
              summary: "",
              s_type: [],
            },
          ],
        },
      ],
      s_typeList: [],
      arr: [],
    };
  },
  created() {
    this.getJobType();
  },
  mounted() {
    this.getList();
    this.getCompanyInfo();
  },
  methods: {
    searchJob(item) {
      this.$router.push({path:"/index/alljob",query:{job_name: item}})
    },
    toJumpWeb(item) {
      this.$router.push({
        path: "/job/details",
        query: { jobInfo: JSON.stringify(item) },
      });
    },
    toCompanyDetails(item) {
      this.$router.push({
        path: "/company/details",
        query: { companyInfo: JSON.stringify(item) },
      });
    },
    toAllJob() {
      this.$router.push("/index/alljob");
    },
    toAllCompany() {
      this.$router.push("/index/allcompany");
    },
    async getJobType() {
      const { data: res } = await getJobTypeList();
      if (res.code == 200) {
        this.arr = res.data.list;
        for (let i = 0, j = 0; i < this.arr.length; i++) {
          this.p_typeList[0].p_type = this.arr[0].p_type;
          if (this.p_typeList[j].p_type == this.arr[i].p_type) {
            this.p_typeList[j].p_type = this.arr[i].p_type;
            this.p_typeList[j].content[i].summary = this.arr[i].summary;
            this.p_typeList[j].content[i].s_type = this.arr[i].s_type.split(
              ","
            );
            this.p_typeList[j].content[i + 1] = [
              {
                summary: "",
                s_type: [],
              },
            ];
          } else {
            this.p_typeList[j].content = this.p_typeList[j].content.slice(0,this.p_typeList[j].content.length - 1)
            this.s_typeList.push(this.p_typeList[j]);
            this.p_typeList = [
              {
                p_type: "",
                content: [
                  {
                    summary: "",
                    s_type: [],
                  },
                ],
              },
            ];
            this.arr = this.arr.slice(i, this.arr.length);
            i = -1;
          }
        }
        return this.s_typeList;
      }
    },
    async getList() {
      const { data: res } = await getHotJobInfo();
      if (res.code == 200) {
        this.hotJobList = res.data.list;
      }
    },
    async getCompanyInfo() {
      const { data: res } = await getHotCompanyInfo();
      if (res.code == 200) {
        this.hotCompanyList = res.data.list;
      }
    },
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
.el-popover {
  margin-left: 0 !important;
  .popper__arrow {
    display: none !important;
  }
  .unfold {
    h4 {
      margin-top: 0;
    }
    .unfold-content {
      @extend %row;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      ul {
        width: 400px;
        font-size: 14px;
        color: rgb(141, 146, 161);
        li {
          margin: 0 20px 10px 0;
        }
        li:hover {
          color: rgb(255, 81, 0);
        }
      }
      .el-divider--horizontal {
        margin-top: 0;
        opacity: 0.3;
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
  .job-card {
    @extend %col;
    justify-content: flex-start;
    width: 35%;
    height: 350px;
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
    }
    .ishover {
      ul {
        color: #fff;
      }
      background-color: rgb(187, 222, 185);
    }
  }
  .ad-card {
    position: relative;
    width: 62%;
    height: 350px;
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
    height: 466px;
    background-color: #fff;
    box-shadow: 2px 2px #9991;
    .job-sort {
      width: 100%;
    }
    .job-sort-content {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px;
      width: 100%;
      .job-sort-card {
        cursor: pointer;
        @extend %col;
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    width: 100%;
    height: 510px;
    background-color: #fff;
    box-shadow: 2px 2px #9991;
    .hot-company-content {
      @extend %col;
      justify-content: space-around;
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