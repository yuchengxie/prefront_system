<!--
 * @Date: 2019-12-26 10:42:19
 * @LastEditors  : wangbingqi
 * @LastEditTime : 2019-12-30 19:57:24
 -->
<template>
  <div class="common-table">
    <el-table
      stripe
      v-if="type!=='treeNode'"
      :data="tableData"
      height="90%"
      :default-sort="{prop: 'sort', order: 'descending'}"
      v-loading="config.loading"
    >
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index +1}}</span>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        v-for="item in tabelLabel"
        :key="item.prop"
        :label="item.label"
        align="center"
        :width="item.width?item.width:''"
      >
        <!-- :width="item.width?item.width:100" -->
        <template slot-scope="scope">
          <span v-if="!item.type" style="margin-left: 10px">{{ scope.row[item.prop]}}</span>
          <img
            v-if="item.type ==='img'"
            :src="scope.row[item.prop]"
            style="height:40px;width:100px"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-if="isRole" @click="handleAuth(scope.row)">授权</el-button>

          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table
      v-if="type==='treeNode'"
      border
      stripe
      :data="tableData"
      style="width: 100%"
      row-key="_id"
      lazy
      :load="load"
      :tree-props="{children: 'items', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="序号" width="80" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index +1}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tabelLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width?item.width:''"
      >
        <template slot-scope="scope">
          <span v-if="!item.type" style="margin-left: 10px">{{ scope.row[item.prop]}}</span>
          <img v-if="item.type==='img'" :src="scope.row[item.prop]" style="height:40px;width:100px" />
          <span
            v-if="item.type ==='nodeType' &&  scope.row[item.prop]==1"
            style="margin-left: 10px"
          >顶级模块</span>
          <span
            v-if="item.type ==='nodeType' &&  scope.row[item.prop]==2"
            style="margin-left: 10px"
          >菜单</span>
          <span
            v-if="item.type ==='nodeType' &&  scope.row[item.prop]==3"
            style="margin-left: 10px"
          >操作</span>
          <!-- <img v-if="item.type==='img'" :src="scope.row[item.prop]" style=""> -->
        </template>
      </el-table-column>

      <el-table-column label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            v-if="isJump==='属性列表'"
            @click="handleJump(scope.row)"
          >{{isJump?isJump:''}}</el-button>
          <el-button size="mini" type="success" v-if="isRole" @click="handleAuth(scope.row)">授权</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="changePage"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      :page-size="config.limit"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array
    },
    type: String,
    tabelLabel: Array,
    config: Object,
    isRole: Boolean,
    isJump: String
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          }
        ]);
      }, 1000);
    },
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
    handleAuth(row) {
      this.$emit("auth", row);
    },
    handleJump(row) {
      this.$emit("jump", row);
    },
    changePage(page) {
      this.$emit("changPage", page);
    }
  },
  computed: {
    nodeValue() {
      return this.data;
    }
  }
};
</script>

<style scoped>
.common-table {
  height: calc(100% - 62px);
  position: relative;
}

.el-pagination {
  position: absolute;
  right: 0px;
  bottom: 0px;
}
</style>