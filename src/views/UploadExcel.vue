<template>
  <el-container>
    <el-header style="height:180px;">
      <el-container>
        <el-upload
        drag multiple
         name="file"
         :show-file-list="showlist"
          class="upload-demo"
          :headers="headers"
          :action="postFileUrl"
          :on-success="uploadSuccess"
          :on-error="uploadFailed"
        ><i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div
            class="el-upload__tip"
            slot="tip"
          >只能上传excel文件，且不超过500kb</div>
        </el-upload>
      </el-container>
    </el-header>
    <el-container   :v-show="tableData.lenght>0">
      <el-table
        border
        max-height="600"
        :data="tableData"
        stripe
        style="width: 100%;"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
            >
              <el-form-item label="日期">
                <el-date-picker
                  v-model="props.row.createtime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 mm 月 dd 日"
                  value-format="yyyy-mm-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model=" props.row.objname " />

              </el-form-item>
              <el-form-item label="数量">
                <el-input v-model=" props.row.objcount " />

              </el-form-item>
              <el-form-item label="单位">
                <el-input v-model=" props.row.unit " />

              </el-form-item>
              <el-form-item label="供应商">
                <el-input v-model=" props.row.supplier " />

              </el-form-item>
              <el-form-item label="科室">
                <el-input v-model=" props.row.requester " />

              </el-form-item>
              <el-form-item label="型号">
                <el-input v-model=" props.row.model " />

              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model=" props.row.remarks " />

              </el-form-item>
              <el-form-item label="需求">
                <el-input v-model=" props.row.required " />

              </el-form-item>
              <el-form-item label="采购模式">
                <el-input v-model=" props.row.ordermode " />

              </el-form-item>
              <el-form-item label="性质">
                <el-input v-model=" props.row.properties " />

              </el-form-item>
              <el-form-item label="上报单位">
                <el-input v-model=" props.row.reporter " />

              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="日期"
        />
        <el-table-column
          prop="objName"
          label="名称"
        />
        <el-table-column
          prop="objCount"
          label="数量"
        />
        <el-table-column
          prop="unit"
          label="单位"
        />
        <el-table-column
          prop="supplier"
          label="供应商"
        />
        <el-table-column
          prop="requester"
          label="科室"
        />
        <el-table-column
          prop="model"
          label="型号"
        />
        <el-table-column
          prop="remarks"
          label="备注"
        />
        <el-table-column
          prop="required"
          label="需求"
        />
        <el-table-column
          prop="orderMode"
          label="采购模式"
        />
        <el-table-column
          prop="properties"
          label="性质"
        />

        <el-table-column
          prop="reporter"
          label="上报单位"
        />

      </el-table>
    </el-container>
    <el-container style="justify-content: space-around;">
      <el-button
        style="height:50px;width:200px;"
        @click="save()"
      >保存</el-button>
      <el-button
        style="height:50px;width:200px;"
        @click="clean()"
      >清空</el-button>

    </el-container>

  </el-container>

</template>
<script>  export default {
  name: 'UploadExcel',
  mounted() {
    
  },
  data() {
    return {
      postFileUrl: 'http://localhost:8080/buss/parseExcel',
      tableData: [],
      headers: {
        token: this.$store.getters.token
      },
      showlist:false
      
    }
  }, methods: {
    save() {
      let that = this
        this.$http.postOrder({
          orderList:JSON.stringify(this.tableData)
        }).then(ret=>{
            if(ret.code=='SUCCESS'){
              that.clean()
              that.$alert(ret.msg, '上传成功', 
                        {
                         confirmButtonText: '确定'
                        });
            }
        })
    },
    clean() {
      this.tableData = []
    },
    // eslint-disable-next-line no-unused-vars
    uploadSuccess(response, file, fileList) {
      console.log(response)

      if(response.code=='SUCCESS'){
        this.tableData = response.data
        console.log(this.tableData.length)
      }else if(response.code =='FAILED')
      {
        this.$alert(response.msg, '上传失败', {
          confirmButtonText: '确定'
        });
      }



    },
    // eslint-disable-next-line no-unused-vars
    uploadFailed(err,file, fileList) {

    }
  }
}  </script>
<style>
.upload-demo .el-upload-dragger {
  width: 150px;
  height: 150px;
}

.upload-demo .el-upload-dragger .el-upload__text {
  font-size: 12px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>