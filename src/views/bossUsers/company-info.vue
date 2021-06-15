<template>
  <!-- 公司信息 -->
  <div class="company-info-box">
    <el-form
      ref="companyForm"
      :model="companyForm"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="companyForm.companyName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="公司图标" prop="companyName">
        <el-upload
          class="avatar-uploader"
          action="https://location:3000/upload"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="require(imageUrl)" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="创始人" prop="author">
        <el-input v-model="companyForm.author"></el-input>
      </el-form-item>
      <el-form-item label="融资状态" prop="financing">
        <el-select v-model="companyForm.financing">
          <el-option
            v-for="item in financingOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司规模" prop="scale">
        <el-select v-model="companyForm.scale">
          <el-option
            v-for="item in personNumOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-input v-model="companyForm.address"></el-input>
      </el-form-item>
      <el-form-item label="行业类型" prop="nature">
        <el-select v-model="companyForm.nature" placeholder="请选择行业类型">
          <el-option
            v-for="item in natureOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司简介" class="markdown">
        <template>
          <quill-editor
            ref="text"
            v-model="companyForm.doc"
            class="myQuillEditor"
          />
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('companyForm')">{{
          btn
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import {
  releaseCompanyInfo,
  modifyCompanyInfo,
  getCompanyInfo,
} from "@/apis/boss";
import { getUsersInfo } from "@/apis/users";
import { uploadResume } from "@/apis/index";
var qs = require("qs");
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      btn: "提交",
      companyForm: {
        bossId: JSON.parse(localStorage.getItem("userInfo")).id, // HR的id
        companyName: "", // 公司名称
        author: "", // 创始人
        financing: "", // 融资状态
        scale: "", // 规模
        address: "", // 地址
        nature: "", // 行业类型
        doc: "", // 公司简介
        icon: "",
      },
      imageUrl: '',
      natureOptions: [
        // 行业类型下拉框选择器
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
      personNumOptions: [
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
      financingOptions: [
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
      rules: {
        companyName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" },
        ],
        author: [
          { required: true, message: "创始人不能为空", trigger: "blur" },
        ],
        financing: [
          { required: true, message: "请选择融资状态", trigger: "change" },
        ],
        scale: [
          { required: true, message: "请选择公司规模", trigger: "change" },
        ],
        address: [
          { required: true, message: "公司地址不能为空", trigger: "blur" },
        ],
        nature: [
          { required: true, message: "公司性质不能为空", trigger: "blur" },
        ],
      },
      file: {},
    };
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("userInfo")).has_company == 1) {
      this.btn = "修改";
    }
    this.getList();
  },
  methods: {
    beforeAvatarUpload(file) {
      this.file = file;
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        return this.$meaagse.error("上传图片的格式为jpg/png");
      } else if (!isLt2M) {
        return this.$meaagse.error("上传图片的大小不超过2M");
      }
      this.toUpload();
    },
    async toUpload() {
      let fileFormData = new FormData();
      fileFormData.append("file", this.file);
      const { data: res } = await uploadResume(fileFormData);
      console.log(res);
      if (res.code == 200) {
        this.imageUrl = res.data.f_path;
        for (let i = 0; i < this.imageUrl.length; i++) {
          this.imageUrl = this.imageUrl.replace("\\", "/");
        }
        console.log(this.imageUrl);
      }
    },
    // 提交/修改公司简章
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.btn == "提交") {
            this.releaseInfo();
          } else {
            this.modifyInfo();
          }
        } else {
          alert("输入错误，请检查无误后重试");
          return false;
        }
      });
    },
    // 提交公司信息
    async releaseInfo() {
      const { data: res } = await releaseCompanyInfo(
        qs.stringify(this.companyForm)
      );
      if (res.code == 200) {
        this.getInfo();
        this.$message.success("提交成功");
      }
    },
    // 修改公司信息
    async modifyInfo() {
      const { data: res } = await modifyCompanyInfo(
        qs.stringify(this.companyForm)
      );
      if (res.code == 200) {
        this.getList();
        this.$message.success("修改成功");
      }
    },
    async getInfo() {
      const { data: res } = await getUsersInfo({
        id: JSON.parse(localStorage.getItem("userInfo")).id,
        userType: 1,
      });
      if (res.code == 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      }
    },
    async getList() {
      const { data: res } = await getCompanyInfo({
        id: JSON.parse(localStorage.getItem("userInfo")).id,
      });
      if (res.code == 200) {
        if (res.data) {
          this.companyForm = res.data;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.el-select-dropdown__item {
  display: block !important;
}
.company-info-box {
  .el-form {
    margin: 0 auto;
    width: 80%;
  }
  .el-form-item__content {
    line-height: 23px;
  }
  // .el-form-item__content:nth-child(2) {
  //   .avatar-uploader {
  //     @extend %row;
  //     border: 1px dashed #333333;
  //     border-radius: 10px;
  //     width: 100px;
  //     height: 100px;
  //   }
  // }
  .el-button--primary {
    display: inline-block;
    margin: 0 20px 0 0;
    width: 100px;
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