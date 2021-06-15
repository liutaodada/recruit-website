<template>
  <!-- 发布招聘信息 -->
  <div class="release-box">
    <el-button type="primary" @click="openDialog">发布职位</el-button>
    <div class="job-list-box">
      <div class="empty" v-if="empty == true">暂无职位，快去发布吧</div>
      <div class="job-list" v-else>
        <div class="card" v-for="(item, index) in jobList" :key="index">
          <div class="left">
            <div class="title">{{ item.job_name }}</div>
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
            <span class="el-dropdown-link" style="color: #333;">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="editInfo(item)">修改</el-dropdown-item>
              <el-dropdown-item @click.native="delInfo(item.id)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <release-dialog :flag="flag" :list="list" @closeDialog="closeDialog"></release-dialog>
  </div>
</template>

<script>
import releaseDialog from "./components/release-dialog";
import { getCompanyInfo, getJobList,delJobInfo } from "@/apis/boss";
export default {
  components: {
    releaseDialog,
  },
  data() {
    return {
      com_id: "", // 企业id
      flag: "",
      empty: false, // 是否为空
      jobList: [],
      list: {},
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    openDialog() {
      this.flag = "release-job";
    },
    closeDialog() {
      this.flag = "";
      this.list = {}
      this.getList();
    },
    // 修改职位信息
    editInfo(item) {
      this.flag = 'release-job'
      this.list = item
    },  
    // 删除职位信息
    async delInfo(Id) {
      const {data:res} = await delJobInfo({id: Id})
      if (res.code == 200) {
        this.$message.success('删除成功')
        this.getList()
      }
    },
    async getInfo() {
      const { data: res } = await getCompanyInfo({
        id: JSON.parse(localStorage.getItem("userInfo")).id,
      });
      if (res.code == 200) {
        this.com_id = res.data.id;
        this.getList();
      }
    },
    async getList() {
      const { data: res } = await getJobList({ id: this.com_id });
      if (res.code == 200) {
        if (res.data.list.length == 0) {
          this.empty = true;
        } else {
          this.empty = false
          this.jobList = res.data.list;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.release-box {
  .el-form {
    margin: 0 auto;
    width: 80%;
  }
  .el-dropdown {
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .el-icon-more {
    transform: rotate(90deg);
  }
}
</style>
<style lang="scss" scoped>
.job-list-box {
  width: 100%;
  min-height: 200px;
  .empty {
    margin: 100px auto 0;
    width: 200px;
  }
  .job-list {
    margin-top: 20px;
    width: 100%;
    .card {
      margin-bottom: 20px;
      position: relative;
      @extend %row;
      width: 80%;
      height: 120px;
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
      .operation {
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
  }
}
</style>