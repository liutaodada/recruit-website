<template>
  <div class="all-company-box">
    <nav-box></nav-box>
    <div class="main">
      <div class="condition-box">
        <el-form ref="searchForm" :model="searchForm" label-width="100px">
          <el-form-item label="公司地点：">
            <el-input v-model="searchForm.location"></el-input>
          </el-form-item>
          <el-form-item label="行业类型">
            <el-select v-model="searchForm.nature">
              <el-option
                v-for="item in natureOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
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
        <el-button type="primary" class="searchBtn" @click="toSearchCompany">搜 索</el-button>
      </div>
      <div class="company-box">
        <div class="hot-company">
          <div
            class="hot-company-content"
            v-for="(item, index) in companyList"
            :key="index"
            @click="toCompanyDetails(item)"
          >
            <div class="logo">
              <img src="@/assets/images/xiaomi.png" alt="" />
            </div>
            <span class="company-name">{{ item.companyName }}</span>
            <div class="intro">
              <span>{{ item.financing }}</span>
              <span> | </span>
              <span>{{ item.nature }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBox from "@/components/nav-box.vue";
import { searchCompany } from "@/apis/index";
export default {
  components: {
    navBox,
  },
  data() {
    return {
      searchForm: {
        location: "全国",
        nature: "不限",
        financing: "不限",
        personNum: "不限",
      },
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
      natureOptions: [
        // 行业类型下拉框选择器
        {
          value: "不限",
          label: "不限",
        },
        {
          value: "电子商务",
          label: "电子商务",
        },
        {
          value: "网络运营",
          label: "网络运营",
        },
        {
          value: "游戏",
          label: "游戏",
        },
        {
          value: "媒体",
          label: "媒体",
        },
        {
          value: "广告营销",
          label: "广告营销",
        },
        {
          value: "生活服务",
          label: "生活服务",
        },
        {
          value: "互联网",
          label: "互联网",
        },
        {
          value: "物流",
          label: "物流",
        },
        {
          value: "工程施工",
          label: "工程施工",
        },
        {
          value: "汽车生产",
          label: "汽车生产",
        },
        {
          value: "其他行业",
          label: "其他行业",
        },
      ],
      companyList: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    toSearchCompany() {
      this.getList()
    },
    toCompanyDetails(item) {
      this.$router.push({
        path: "/company/details",
        query: { companyInfo: JSON.stringify(item) },
      });
    },
    async getList() {
      const obj = {
        location:
          this.searchForm.location == "全国" ? "" : this.searchForm.location,
        nature: this.searchForm.nature == "不限" ? "" : this.searchForm.nature,
        financing:
          this.searchForm.financing == "不限" ? "" : this.searchForm.financing,
        personNum:
          this.searchForm.personNum == "不限" ? "" : this.searchForm.personNum,
      };
      const { data: res } = await searchCompany(obj);
      if (res.code == 204) {
        this.$message.error(res.message);
      } else if (res.code == 200) {
        this.companyList = res.data.list;
      }
    },
  },
};
</script>

<style lang="scss">
.all-company-box {
  .el-form {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
  }
  .el-form-item:last-child {
    margin-left: 43px;
    margin-right: auto;
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
.all-company-box {
  width: 100%;
  height: 100vh;
  background-color: rgb(248, 248, 248);
  box-sizing: border-box;
  .main {
    margin: 0 auto;
    padding-top: 40px;
    width: 1200px;
    height: 100vh;
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
    .company-box {
      margin-top: 20px;
      .hot-company {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 20px;
        width: 100%;
        .hot-company-content {
          @extend %col;
          justify-content: space-around;
          height: 238px;
          background-color: #fff;
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
    }
  }
}
</style>