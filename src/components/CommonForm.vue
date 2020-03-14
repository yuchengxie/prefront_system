<template>
  <el-form :inline="inline" :model="form" ref="form" :label-width="formLabel[0].type=='editor'?'0':'100px'" class="form-wrap">
    <el-form-item v-for="item in formLabel" :key="item.model" :label="item.label">
      <el-input v-model="form[item.model]" :placeholder="'请输入'+item.label" v-if="!item.type" :type="item.input_type"></el-input>
      <el-select v-model="form[item.model]" :placeholder="'请输入'+item.label" v-if="item.type==='select'" @change="selectValue">
        <el-option v-for="item in item.opts" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-radio-group v-model="form[item.model]" v-if="item.type==='radio'" @change="radioChange">
        <el-radio v-for="item in item.opts" :key="item.value" :label="item.label">{{item.value}}</el-radio>
      </el-radio-group>
      <el-checkbox-group v-model="showCheckboxModel" v-if="item.type==='checkbox'" @change="checkboxChange">
        <el-checkbox v-for="item in item.opts" :key="item" :label="item">{{item}}</el-checkbox>
      </el-checkbox-group>
      <el-switch v-model="form[item.model]" v-if="item.type==='switch'"></el-switch>
      <el-input type="textarea" :rows="5" v-model="form[item.model]" v-if="item.type==='textarea'"></el-input>
      <el-date-picker v-model="form[item.model]" type="date" placeholder="请选择日期" v-if="item.type==='date'" value-format="yyyy-MM-dd"></el-date-picker>
      <el-upload v-if="item.type=='upload'" action list-type="picture-card" :http-request="uploadHttp" :before-remove="handleBeforeRemove" :on-change="onChange" :on-remove="handleRemove" :file-list="showFileList" :limit="1" :multiple="false" :show-file-list="true">
        <i class="el-icon-plus"></i>
      </el-upload>
      <mavon-editor v-model="form[item.model]" v-if="item.type==='editor'" ref="md" @imgAdd="$imgAdd" @change="editorChange" style="min-height: 600px" />
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
  import {
    mavonEditor
  } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  // import alioss from "../utils/aliyun_oss";
  // import aliyunOss from "../utils/aliyun_oss";
  export default {
    props: {
      inline: Boolean,
      form: Object,
      formLabel: Array,
      fileList: Array,
      checkboxModel: Array,
    },
    watch: {
      fileList: {
        handler: function(newValue, oldValue) {
          // console.log("监听");
          // console.log(newValue);
          // console.log(oldValue);
          if (newValue.length) {
            this.showFileList = this.fileList;
          }
        },
        deep: true
      }
    },
    data() {
      return {
        showCheckboxModel: [],
        // checkboxModel: ["精品", "热销"],
        showFileList: [],
        newFileList: []
        // fileList:[{name:'t1',url:'http://hzfds.oss-cn-shenzhen.aliyuncs.com/upload2/20191226/1577326705717.jpg'}],
        // dialogVisible: false,
        // dialogImageUrl:
        //   "http://hzfds.oss-cn-shenzhen.aliyuncs.com/upload2/20191226/1577326705717.jpg"
      };
    },
    components: {
      mavonEditor
    },
    methods: {
      $imgAdd(pos, $file) {
        // var formdata = new FormData();
        // formdata.append('file', $file);
        // // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
        // this.$axios({
        //     url: '/common/upload',
        //     method: 'post',
        //     data: formdata,
        //     headers: { 'Content-Type': 'multipart/form-data' },
        // }).then((url) => {
        //     this.$refs.md.$img2Url(pos, url);
        // })
      },
      editorChange(value, render) {
        this.$emit("htmlrender", render);
      },
      async selectValue(value) {

        this.$emit("selectValue", value);
      },
      /**
       * 阿里云OSS上传
       */
      onChange(file, fileList) {},
      uploadHttp({
        file
      }) {
        let osspath = alioss.getUploadFile(file.name);
        console.log(osspath);
        this.aliyunOss
          .put(osspath, file, {
            ContentType: "image/jpeg"
          })
          .then(({
            res,
            url,
            name
          }) => {
            if (res && res.status == 200) {
              console.log(`阿里云OSS上传图片成功回调`, res, url, name);
              //上传的文件列表中添加路径
              let fileList = [];
              let obj = {};
              obj.url = url;
              obj.name = name;
              obj.osspath = osspath;
              fileList.push(obj);
              this.newFileList = fileList;
              this.$emit("upload", url);
            }
          })
          .catch(err => {
            console.log(`阿里云OSS上传图片失败回调`, err);
          });
      },
      /**
       * 图片限制
       */
      beforeAvatarUpload(file) {
        const isJPEG = file.name.split(".")[1] === "jpeg";
        const isJPG = file.name.split(".")[1] === "jpg";
        const isPNG = file.name.split(".")[1] === "png";
        const isLt500K = file.size / 1024 / 500 < 2;
        if (!isJPG && !isJPEG && !isPNG) {
          this.$message.error("上传图片只能是 JPEG/JPG/PNG 格式!");
        }
        if (!isLt500K) {
          this.$message.error("单张图片大小不能超过 500KB!");
        }
      },
      async handleBeforeRemove(file, fileList) {
        let url = this.showFileList.length ?
          this.showFileList[0].url :
          this.newFileList[0].url;
        aliyunOss.deleteOssFile(url);
      },
      handleRemove(file, fileList) {
        console.log("移除图片回调:", file);
      },
      radioChange(data) {
        this.$emit("onChangeDate", data);
      },
      checkboxChange(data) {
        this.$emit("checkboxChange", data);
      }
    },
    computed: {
      aliyunOss() {
        return alioss.createOss();
      }
    },
    created() {
      this.showFileList = this.fileList;
      this.showCheckboxModel = this.checkboxModel;
      // console.log('noscale:',this.input_noscale);
    },
    mounted() {}
  };
</script>

<style>
  .el-form-item__label {
    max-width: 100px;
  }
  /* .el-upload-dragger {
                    height: 60px;
                    width: 60px;
                  } */
  .el-radio {
    line-height: 40px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-input,
  .el-textarea {
    width: 60%;
  }
  .el-form--inline {
    background-color: transparent!important;
  }
</style>


<style lang="scss" scoped>
  .el-form-item {
    margin-bottom: 10px;
  }
  .form-wrap {
    box-sizing: border-box; // padding-top: 20px;
    height: calc(100% - 90px);
    overflow: auto;
    background-color: #fff;
  }
</style>