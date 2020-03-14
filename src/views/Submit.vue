<template>
  <div>
    <el-dialog title="更改" :visible.sync="dialogVisible" width="40%">
      <el-form :model="formLabel">
        <el-input v-model="rootSeed" placeholder="账号"></el-input>
        <el-button type="primary" plain @click="sureAccount">确定</el-button>
      </el-form>
    </el-dialog>
    <div style="height:60px">
      <h2>提交存证</h2>
    </div>

    <el-form :model="formLabel">
      <el-form-item label="账号:">
        <br />
        <el-input v-model="formLabel.account" disabled placeholder="账号"></el-input>
      </el-form-item>
      <el-button type="default" @click="changeAccount">更改</el-button>
    </el-form>

    <div style="margin-top:20px"></div>

    <el-form :model="formLabel">
      <el-form-item label="待存证内容:">
        <br />
        <el-input v-model="content" placeholder="待存证内容" type="textarea" :rows="5"></el-input>
        <json-viewer :value="content" :deep="5" :line-height="40"></json-viewer>
      </el-form-item>
      <el-button type="primary" plain @click="submitEvidence">提交</el-button>
    </el-form>
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
    async submitEvidence() {
      let msg = JSON.parse(this.content);
      msg.account = tools.getOpenAccount().publicKey;
      msg.time = parseInt(new Date().valueOf() / 1000);
      let data = tools.serial_msg(msg);
      let dataStr = JSON.stringify(data);
      console.log("dataStr:", dataStr);
      let sigSour = tools.sha256x2(dataStr);
      var sig = tools.getOpenAccount().sign(sigSour);
      console.log('sign:',sig);
      let baseUrl = "http://localhost:5001";
      let res = await this.$http.post(
        baseUrl + "/ev/item?sig=" + sig.toString("hex"),
        dataStr
      );
      console.log('submitEvidence res:',res);
    }
  },
  data() {
    return {
      dialogVisible: false,
      rootSeed: "TianMiYu:13688888888:password",
      content: JSON.stringify({
        message: "example",
        location: "116.389550,39.928167"
      }),
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