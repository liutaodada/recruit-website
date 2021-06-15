<template>
  <div class="collection-box">
    <nav-box></nav-box>
    <div class="collection">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">我的投递</el-menu-item>
        <el-menu-item index="2">我的收藏</el-menu-item>
      </el-menu>
      <div class="job-list-box" v-if="activeIndex == '2'">
        <div class="first">
          我收藏的职位 <span>{{ jobList.length }}</span>
        </div>
        <div class="empty" v-if="empty == true">暂无收藏</div>
        <div class="job-list" v-else>
          <div class="card" v-for="(item, index) in jobList" :key="index">
            <div class="left">
              <div class="title" @click="toDetail(item)" style="cursor: pointer;">{{ item.job_name }}</div>
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
            <el-dropdown>
              <span class="el-dropdown-link" style="color: #333">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="tocancelCollection(item.job_id)"
                  >取消收藏</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="job-list-box" v-if="activeIndex == '1'">
        <div class="first">
          我投递的职位 <span>{{ handJobList.length }}</span>
        </div>
        <div class="empty" v-if="empty1 == true">暂无投递记录</div>
        <div class="job-list" v-else>
          <div class="card" v-for="(item, index) in handJobList" :key="index">
            <div class="left">
              <div class="title" @click="toDetail(item)" style="cursor: pointer;">{{ item.job_name }}</div>
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
import { isCollectionJob, cancelCollection, isHandResume } from "@/apis/index";
var qs = require("qs");
export default {
  components: {
    navBox,
  },
  data() {
    return {
      activeIndex: "1",
      empty: true,
      jobList: [],
      handJobList:[],
      empty1:true,
    };
  },
  mounted() {
    this.activeIndex = this.$route.query.activeIndex;
    this.getList("collection");
    this.getList("resume");
  },
  methods: {
    handleSelect(val) {
      this.activeIndex = val;
    },
    toDetail(item) {
      this.$router.push({
        path: "/job/details",
        query: { jobInfo: JSON.stringify(item) },
      });
    },
    async getList(type) {
      if (type == "collection") {
        const { data: res } = await isCollectionJob({
          user_id: JSON.parse(localStorage.getItem("userInfo")).id,
        });
        if (res.code == 200) {
          this.jobList = res.data;
          if (this.jobList.length != 0) {
            this.empty = false;
          } else {
            this.empty = true;
          }
        }
      } else if (type == 'resume') {
        const { data: res } = await isHandResume({
          user_id: JSON.parse(localStorage.getItem("userInfo")).id,
        });
        if (res.code == 200) {
          this.handJobList = res.data;
          if (this.handJobList.length != 0) {
            this.empty1 = false;
          } else {
            this.empty1 = true;
          }
        }
      }
    },
    // 取消收藏
    async tocancelCollection(Id) {
      const obj = {
        job_id: Id,
        user_id: JSON.parse(localStorage.getItem("userInfo")).id,
      };
      const { data: res } = await cancelCollection(qs.stringify(obj));
      if (res.code == 200) {
        this.$message.success("取消成功");
        this.getList('collection');
      } else if (res.code == 204) {
        this.$message.error(res.message);
      }
    },
  },
};
</script>

<style lang="scss">
.collection-box {
  .el-dropdown {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .el-icon-more {
    cursor: pointer;
    transform: rotate(90deg);
  }
}
</style>
<style lang="scss" scoped>
.collection-box {
  width: 100%;
  height: 100vh;
  background-color: rgb(248, 248, 248);
  box-sizing: border-box;
  .collection {
    margin: 0 auto;
    padding-top: 40px;
    width: 1200px;
    height: 100vh;
    box-sizing: border-box;
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
      .empty {
        margin: 100px auto 0;
        width: 200px;
        text-align: center;
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