<template>
  <div id="app">
    <el-container>
      <el-dialog title="创建账户" :visible.sync="dialogVisible" width="40%">
        <!-- <el-form :model="formLabel"> -->
        <!-- <el-form :model="formLabel">
          <el-input v-model="rootSeed" placeholder="账号"></el-input>
          <el-button type="primary" plain>确定</el-button>
        </el-form>-->
      </el-dialog>
      <el-header height="60px">
        <div class="left" style="font-size:23px;font-weight:bold">签名上链</div>
        <!-- <div class="protrait"></div>  -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- 下拉菜单 -->
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-monitor" @click.native="createNbcAccount">创建账户</el-dropdown-item>
            <el-dropdown-item icon="el-icon-monitor">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-paperclip" @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px" height="100%">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="cyan"
          >
            <el-menu-item index="1" @click="clickMenu('submit')">
              <i class="el-icon-upload"></i>
              <span slot="title">提交</span>
            </el-menu-item>
            <el-menu-item index="2" @click="clickMenu('query')">
              <i class="el-icon-search"></i>
              <span slot="title">查询</span>
            </el-menu-item>

            <el-menu-item index="1" @click="clickMenu('task')">
              <i class="el-icon-upload"></i>
              <span slot="title">任务</span>
            </el-menu-item>
            <el-menu-item index="2" @click="clickMenu('other')">
              <i class="el-icon-search"></i>
              <span slot="title">其他</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import tools from "./utils/tools";
export default {
  data() {
    return {
      rootSeed: "tianmiyu1880000000012345678",
      dialogVisible: false,
      formLabel: []
    };
  },
  methods: {
    clickMenu(title) {
      console.log("title:" + title);
      this.$router.push({
        name: title
      });
    },
    createNbcAccount() {
      this.dialogVisible = true;
      console.log("seed:", this.rootSeed);
      console.log("seed:", this.rootSeed);
      if (this.rootSeed.length < 26) {
        this.$message({
          message: "长度不足26位",
          type: "warning"
        });
        return;
      }
      this.dialogVisible = false;
      this._seedToAccount();
    },
    logout() {
      alert("1");
      console.log("11");
    },
    _seedToAccount() {
      let account = tools.makeNbcPubAddr(
        tools.seedToAccount(this.rootSeed).publicKey,
        0
      );
      console.log("account:" + account);
      this.formLabel.account = account;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
.el-container {
  height: 100%;
  .el-header {
    background-color: rebeccapurple;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user {
      width: 44px;
      height: 44px;
      // border-radius: 50%;
    }
  }
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
}
</style>
