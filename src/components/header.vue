<template>
  <div class="header-box">
    <div class="header-content">
      <slot name="left"></slot>
      <div class="right">
        <div class="search">
          <el-input
            v-model="searchContent"
            type="text"
            prefix-icon="el-icon-search"
          />
          <el-button>搜索</el-button>
        </div>
        <slot name="moudel-first"></slot>
        <slot name="search-engine"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchContent: "",
    };
  },
};
</script>

<style lang="scss">
.right {
  .el-input {
    width: 600px;
    .el-input__inner {
      width: 600px;
      border: 2px solid rgb(231, 136, 10);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      outline-style: none;
    }
  }
  .el-button {
    width: 100px;
    font-size: 16px;
    border: none;
    border-radius: 0;
    background-color: rgb(231, 136, 10);
    color: #fff;
    outline-style: none;
    letter-spacing: 1px;
  }
  .el-button:hover,
  .el-button:focus {
    background-color: rgb(243, 141, 8);
    color: #fff;
  }
}
</style>

<style lang="scss" scoped>
.header-box {
  .header-content {
    display: flex;
    justify-content: space-between;
    margin: 2px auto;
    width: 1200px;
    height: 100%;
    .right {
      margin: auto;
      .search {
        display: inline-block;
      }
    }
  }
}
</style>