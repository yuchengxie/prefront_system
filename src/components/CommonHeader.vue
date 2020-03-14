<template>
  <header>
    <div class="l-content">
      <el-button type="plain" icon="el-icon-menu" size="mini" @click="collapseMenu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="current.path">{{current.label}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <!-- 下拉菜单 -->
          <img :src="userImg" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-monitor">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-paperclip" @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      current: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      userImg: require("../assets/images/user.png")
    };
  },
  methods: {
    collapseMenu() {
      this.$store.commit("collapseMenu");
    },
    logout() {
      this.$confirm("确认退出当前账户?", "退出账户提示",{type:'warning'})
        .then(r => {
          this.$store.commit("clearMenu");
          this.$store.commit("clearToken");
          this.$router.push({ name: "login" });
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
.el-dropdown {
  color: #fff;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.el-breadcrumb__inner {
  color: red;
  // a {
  //   color: green;
  // }
}
// .el-breadcrumb__inner a{
//   color:red;
// }
.r-content {
  .user {
    width: 44px;
    height: 44px;
    border-radius: 50%;
  }
}
</style>

<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #ffffff;
      font-weight: bold;
    }
  }
}
</style>
