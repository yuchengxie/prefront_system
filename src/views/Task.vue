<template>
  <div>
    <el-dialog title="签名" :visible.sync="dialogVisible" width="40%">
      <!-- <el-form :model="formLabel"> -->
        <!-- <el-input v-model="rootSeed" placeholder="账号"></el-input>
        <el-button type="primary" plain>确定</el-button> -->
      <!-- </el-form> -->
    </el-dialog>
    <p style="color:#666;font-size:20px">待上链NFC标签</p>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="add_time" label="日期" width="180"></el-table-column>
      <el-table-column prop="client" label="设备" width="180"></el-table-column>
      <el-table-column prop="tag" label="标签"></el-table-column>
      <el-table-column prop="opt" label="操作">
        <el-button size="small" type="primary" @click="signTag" round>签名</el-button>
        <el-button size="small" type="danger" round>取消</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.get(this.$url.u_taglist).then(res => {
        let data = res.data.list;
        console.log("data:", data);
        this.tableData = data;
      });
    },
    signTag(){
      this.dialogVisible=true;
    },
  
  },
  data() {
    return {
      dialogVisible:false,
      tableData: []
    };
  }
};
</script>

<style>
</style>