<template>
  <div class="all-job-box">
    <nav-box></nav-box>
    <div class="main">
      <div class="condition-box">
        <el-form ref="searchForm" :model="searchForm" label-width="100px">
          <el-form-item label="工作地点：">
            <el-input v-model="searchForm.location"></el-input>
          </el-form-item>
          <el-form-item label="职位：">
            <el-input v-model="searchForm.job_name"></el-input>
          </el-form-item>
          <el-form-item label="薪资：">
            <el-select v-model="searchForm.salary">
              <el-option
                v-for="item in salaryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历要求：">
            <el-select v-model="searchForm.eduction">
              <el-option
                v-for="item in eductionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="融资状态：">
            <el-select v-model="searchForm.financing">
              <el-option
                v-for="item in financingOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司规模：">
            <el-select v-model="searchForm.personNum">
              <el-option
                v-for="item in personNumOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="searchBtn" @click="toSearchJob"
          >搜 索</el-button
        >
      </div>
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
            <div class="right">
              <div class="info">
                <div class="title">{{ item.com_name }}</div>
                <div>
                  <span>{{ item.job_type }} |</span>
                  <span>{{ item.financing }} |</span>
                  <span>{{ item.personNum }}</span>
                </div>
              </div>
              <div class="icon">
                <img :src="item.icon" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBox from "@/components/nav-box.vue";
import { searchJob } from "@/apis/index";
export default {
  components: {
    navBox,
  },
  data() {
    return {
      searchForm: {
        location: "全国",
        job_name: "",
        salary: "不限",
        eduction: "不限",
        financing: "不限",
        personNum: "不限",
      },
      salaryOptions: [
        {
          value: "不限",
          label: "不限",
        },
        {
          value: "3k以下",
          label: "3k以下",
        },
        {
          value: "3k-5k",
          label: "3k-5k",
        },
        {
          value: "5k-8k",
          label: "5k-8k",
        },
        {
          value: "10k-20k",
          label: "10k-20k",
        },
        {
          value: "20k以上",
          label: "20k以上",
        },
      ],
      financingOptions: [
        {
          value: "不限",
          label: "不限",
        },
        {
          value: "未融资",
          label: "未融资",
        },
        {
          value: "天使轮",
          label: "天使轮",
        },
        {
          value: "A轮",
          label: "A轮",
        },
        {
          value: "B轮",
          label: "B轮",
        },
        {
          value: "C轮",
          label: "C轮",
        },
        {
          value: "D轮及以上",
          label: "D轮及以上",
        },
        {
          value: "已上市",
          label: "已上市",
        },
        {
          value: "不需要融资",
          label: "不需要融资",
        },
      ],
      eductionOptions: [
        {
          value: "不限",
          label: "不限",
        },
        {
          value: "初中及以下",
          label: "初中及以下",
        },
        {
          value: "中专",
          label: "中专",
        },
        {
          value: "高中",
          label: "高中",
        },
        {
          value: "专科",
          label: "专科",
        },
        {
          value: "本科",
          label: "本科",
        },
        {
          value: "硕士",
          label: "硕士",
        },
        {
          value: "博士",
          label: "博士",
        },
      ],
      personNumOptions: [
        {
          value: "不限",
          label: "不限",
        },
        {
          value: "0-20人",
          label: "0-20人",
        },
        {
          value: "20-99人",
          label: "20-99人",
        },
        {
          value: "100-499人",
          label: "100-499人",
        },
        {
          value: "500-999人",
          label: "500-999人",
        },
        {
          value: "1000-9999人",
          label: "1000-9999人",
        },
        {
          value: "10000人以上",
          label: "10000人以上",
        },
      ],
      jobList: [],
    };
  },
  mounted() {
    if (this.$route.query.job_name) {
      this.searchForm.job_name = this.$route.query.job_name
    } 
    this.getList();
  },
  methods: {
    toSearchJob() {
      this.getList();
    },
    toDetail(item) {
      this.$router.push({
        path: "/job/details",
        query: { jobInfo: JSON.stringify(item) },
      });
    },
    async getList() {
      const obj = {
        location:
          this.searchForm.location == "全国" ? "" : this.searchForm.location,
        job_name: this.searchForm.job_name,
        salary: this.searchForm.salary == "不限" ? "" : this.searchForm.salary,
        eduction:
          this.searchForm.eduction == "不限" ? "" : this.searchForm.eduction,
        financing:
          this.searchForm.financing == "不限" ? "" : this.searchForm.financing,
        personNum:
          this.searchForm.personNum == "不限" ? "" : this.searchForm.personNum,
      };
      const { data: res } = await searchJob(obj);
      if (res.code == 204) {
        this.$message.error(res.message);
      } else if (res.code == 200) {
        this.jobList = res.data.list;
      }
    },
  },
};
</script>

<style lang="scss">
.all-job-box {
  .el-form {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
  }
  .el-form-item {
    width: 317px;
  }
}
.el-select-dropdown__item {
  display: block !important;
}
</style>
<style lang="scss" scoped>
.all-job-box {
  width: 100%;
  min-height: 100vh;
  background-color: rgb(248, 248, 248);
  box-sizing: border-box;
  .main {
    margin: 0 auto;
    padding-top: 40px;
    width: 1200px;
    min-height: 100vh;
    box-sizing: border-box;
    .condition-box {
      padding-top: 20px;
      width: 100%;
      height: 200px;
      background-color: #fff;
      box-sizing: border-box;
      .searchBtn {
        display: block;
        margin: 0 auto;
        width: 100px;
      }
    }
    .job-list-box {
      width: 100%;
      .first {
        margin-top: 15px;
        padding-right: 20px;
        width: 64%;
        height: 50px;
        background-color: #fff;
        text-align: right;
        line-height: 50px;
        box-sizing: border-box;
        box-shadow: 2px 2px #9991;
        span {
          color: rgb(103, 221, 250);
        }
      }
      .job-list {
        margin-top: 20px;
        width: 80%;
        .card {
          margin-top: 20px;
          position: relative;
          @extend %row;
          width: 80%;
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
            width: 55%;
            height: 80%;
            border-right: 1px dashed #999999;
          }
          .right {
            @extend %row;
            padding-left: 20px;
            width: 45%;
            height: 80%;
            .info {
              @extend %col;
              justify-content: space-around;
              align-items: flex-start;
              width: 80%;
              height: 100%;
            }
            .icon {
              margin-right: 20px;
              width: 80px;
              height: 80px;
            }
          }
        }
      }
    }
  }
}
</style>