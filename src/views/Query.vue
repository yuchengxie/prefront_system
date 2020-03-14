<template>
  <div>
    <el-dialog title="更改" :visible.sync="dialogVisible" width="40%">
      <el-form :model="formLabel">
        <el-input v-model="rootSeed" placeholder="账号"></el-input>
        <el-button type="primary" plain @click="sureAccount">确定</el-button>
      </el-form>
    </el-dialog>
    <div style="height:60px">
      <h2>存证查询</h2>
    </div>

    <el-form :model="formLabel" inline>
      <el-form-item label="账号:">
        <el-input style="width:650px" v-model="formLabel.account" disabled placeholder="账号"></el-input>
        <el-button type="default" @click="changeAccount">更改</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="listEvidence" plain>开始查询</el-button>
    <div style="margin-top:20px"></div>
  </div>
</template>

<script>
import tools from "../utils/tools";
import { type } from "os";
export default {
  methods: {
    changeAccount() {
      this.dialogVisible = true;
    },
    sureAccount() {
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
    _seedToAccount() {
      let account = tools.makeNbcPubAddr(
        tools.seedToAccount(this.rootSeed).publicKey,
        0
      );
      this.formLabel.account = account;
    },
    async listEvidence() {
      console.log('111');
      let sPubHex = tools.getOpenAccount().publicKey.toString("hex");
      console.log("sPubHex:", sPubHex);
      let baseUrl = "http://localhost:5001";
      let res = await this.$http.get(baseUrl + "/ev/list", {
        params: { addr: sPubHex }
      });
      console.log('listEvidence res:',res);
    }
  },
  data() {
    return {
      dialogVisible: false,
      rootSeed: "TianMiYu:13688888888:password",
      formLabel: {
        account: ""
      },
      formDialog: {
        seed: "11"
      }
    };
  },
  created() {
    this._seedToAccount();
  },
  computed: {
    // openAccount() {
    //   return this.data
    // }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 70%;
}
.el-textarea {
  width: 70%;
}
</style>
<style>
.el-input.is-disabled .el-input__inner {
  color: red;
}
</style>