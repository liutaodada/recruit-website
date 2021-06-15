<template>
  <!-- 申请中心 -->
  <div class="apply-center-box">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="username" label="投递人" width="180">
      </el-table-column>
      <el-table-column prop="email" label="投递人邮箱"> </el-table-column>
      <el-table-column prop="job_name" label="投递职位" width="180">
      </el-table-column>
      <el-table-column prop="salary" label="岗位薪资" width="180">
      </el-table-column>
      <el-table-column label="简历" fixed="right" width="180">
        <template slot-scope="scoped">
          <div @click="watchResume(scoped.row.f_url)">
            {{scoped.row.f_name}}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { watchHandInfo, getCompanyInfo } from "@/apis/boss";
export default {
  data() {
    return {
      tableData: [],
      comForm: {},
    };
  },
  mounted() {
    this.getInfo();
    // this.getList();
  },
  methods: {
    watchResume(url) {
      console.log(url);
      window.open(url, '_blank');
    },
    async getList() {
      const { data: res } = await watchHandInfo({ com_id: this.comForm.id });
      if (res.code == 200) {
        this.tableData = res.data;
      } else if (res.code == 500) {
        this.$message.error("请求错误");
      }
    },
    async getInfo() {
      const { data: res } = await getCompanyInfo({
        id: JSON.parse(localStorage.getItem("userInfo")).id,
      });
      if (res.code == 200) {
        if (res.data) {
          this.comForm = res.data;
          this.getList();
        }
      }
    },
  },
};
</script>

<style lang="scss">
.apply-center-box {
}
</style>
<style lang="scss" scoped>
</style>