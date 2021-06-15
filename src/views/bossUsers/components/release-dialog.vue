<template>
  <div class="release-dialog">
    <el-dialog
      title="发布职位"
      :visible.sync="releaseDialogVisible"
      width="80%"
      @close="closeDialog"
    >
      <el-form ref="jobForm" :model="jobForm" :rules="rules" label-width="80px">
        <el-form-item label="职位名称" prop="jobName">
          <el-input v-model="jobForm.jobName"></el-input>
        </el-form-item>
        <el-form-item label="薪资" prop="salary">
          <el-input v-model="jobForm.salary"></el-input>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-input v-model="jobForm.address" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="学历要求" prop="eduction">
          <el-input v-model="jobForm.eduction"></el-input>
        </el-form-item>
        <el-form-item label="工作经验" prop="experience">
          <el-input v-model="jobForm.experience"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="jobForm.companyName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="公司规模">
          <el-input v-model="jobForm.personNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="融资状态">
          <el-input v-model="jobForm.financing" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="行业类型">
          <el-input v-model="jobForm.nature" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职责描述" class="markdown">
          <template>
            <quill-editor
              ref="text"
              v-model="jobForm.duty"
              class="myQuillEditor"
            />
          </template>
        </el-form-item>
        <el-form-item label="职位要求" class="markdown">
          <template>
            <quill-editor
              ref="text"
              v-model="jobForm.requirement"
              class="myQuillEditor"
            />
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="releaseDialogVisible = false"
            >取消</el-button
          >
          <el-button type="primary" @click="sureRelease('jobForm')">{{
            btn
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyInfo, releaseJobInfo, editJobInfo } from "@/apis/boss";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
var qs = require("qs");
export default {
  props: {
    flag: String,
    list: Object,
  },
  components: {
    quillEditor,
  },
  data() {
    return {
      releaseDialogVisible: false,
      jobForm: {
        companyId: "", // 企业id
        icon: "", // 公司图标
        jobName: "", // 职位名称
        salary: "", // 薪资
        address: "", // 工作地点
        eduction: "", // 学历要求
        experience: "", // 工作经验
        companyName: "", // 公司名称
        personNum: "", // 公司规模
        financing: "", // 融资状态
        nature: "", // 企业类型
        duty: "", // 职责描述
        requirement: "", // 职位要求
      },
      rules: {
        jobName: [
          { required: true, message: "职位名称不能为空", trigger: "blur" },
        ],
        salary: [{ required: true, message: "薪资不能为空", trigger: "blur" }],
        eduction: [
          { required: true, message: "学历要求不能为空", trigger: "blur" },
        ],
        experience: [
          { required: true, message: "工作经验不能为空", trigger: "blur" },
        ],
      },
      btn: "发布",
    };
  },
  methods: {
    closeDialog() {
      this.releaseDialogVisible = false;
      this.$emit("closeDialog");
    },
    sureRelease(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btn == "发布") {
            this.releaseJob();
          } else {
            this.editJob();
          }
        } else {
          alert("输入错误，请检查无误后重试");
          return false;
        }
      });
    },
    async releaseJob() {
      const { data: res } = await releaseJobInfo(qs.stringify(this.jobForm));
      if (res.code == 200) {
        this.$message.success("发布成功");
        this.releaseDialogVisible = false;
      }
    },
    async editJob() {
      const obj = {
        id: this.list.id,
        jobName: this.jobForm.jobName,
        salary: this.jobForm.salary,
        eduction: this.jobForm.eduction,
        experience: this.jobForm.experience,
        duty: this.jobForm.duty,
        requirement: this.jobForm.requirement,
      };
      const { data: res } = await editJobInfo(qs.stringify(obj));
      if (res.code == 200) {
        this.$message.success("修改成功");
        this.releaseDialogVisible = false;
      }
    },
    async getList() {
      const { data: res } = await getCompanyInfo({
        id: JSON.parse(localStorage.getItem("userInfo")).id,
      });
      if (res.code == 200) {
        if (res.data) {
          this.jobForm.companyId = res.data.id;
          this.jobForm.address = res.data.address;
          this.jobForm.companyName = res.data.companyName;
          this.jobForm.personNum = res.data.scale;
          this.jobForm.financing = res.data.financing;
          this.jobForm.nature = res.data.nature;
        }
      }
    },
  },
  watch: {
    flag() {
      if (this.flag == "release-job") {
        this.getList();
        this.releaseDialogVisible = true;
      }
    },
    list() {
      if (this.list) {
        this.btn = "修改";
        this.jobForm.jobName = this.list.job_name;
        this.jobForm.salary = this.list.salary;
        this.jobForm.eduction = this.list.eduction;
        this.jobForm.experience = this.list.experience;
        this.jobForm.duty = this.list.duty
        this.jobForm.requirement = this.list.requirement
      } else {
        this.btn = '发布'
      }
    },
  },
};
</script>

<style lang="scss">
.release-dialog {
  .el-form-item__content {
    line-height: 23px;
  }
  .ql-snow {
    & > span:nth-child(13),
    & > span:nth-child(7),
    & > span:nth-child(9),
    & > span:nth-child(11),
    & > span:last-child {
      display: none !important;
    }
  }
  .myQuillEditor {
    height: 100%;
  }
  .ql-toolbar.ql-snow {
    @extend %row;
    justify-content: space-between;
  }
  .ql-container.ql-snow {
    height: 330px;
    overflow: hidden;
  }
  .ql-snow .ql-picker-options .ql-picker-item {
    color: #000000;
  }
  #ql-picker-options-5 {
    .ql-picker-item {
      .ql-stroke {
        stroke: #000000;
      }
      .ql-stroke:hover {
        stroke: skyblue;
      }
    }
    .ql-picker-item.ql-selected {
      .ql-stroke {
        stroke: skyblue;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
</style>