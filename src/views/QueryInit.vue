<template>
      <el-container style="max-height:800"  :v-show="tableData.lenght>0">

      <el-table
        border
        max-height="800"
        :data="tableData"
        stripe
        style="width: 100%;"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="日期">
                <el-date-picker
                  v-model="props.row.createTime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model=" props.row.objName " />

              </el-form-item>
              <el-form-item label="数量">
                <el-input v-model=" props.row.objCount " />

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
                <el-input v-model=" props.row.orderMode " />

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
          width="100"
        />
        <el-table-column
          prop="objName"
          label="名称"
          width="150"
        />
        <el-table-column
          prop="objCount"
          label="数量"
          width="50"
        />
        <el-table-column
          prop="unit"
          label="单位"
          width="50"
        />
        <el-table-column
          prop="supplier"
          label="供应商"
          width="80"
        />
        <el-table-column
          prop="requester"
          label="科室"
          width="150"
        />
        <el-table-column
          prop="model"
          label="型号"
          width="60"
        />
        <el-table-column
          prop="remarks"
          label="备注"
          width="120"
        />
        <el-table-column
          prop="required"
          label="需求"
          width="80"
        />
        <el-table-column
          prop="orderMode"
          label="采购模式"
          width="100"
        />
        <el-table-column
          prop="properties"
          label="性质"
          width="150"
        />
        <el-table-column
          prop="receiver"
          label="收货人"
          width="150"
        />
        <el-table-column
          prop="reporter"
          label="上报单位"
          width="300"
        />

      </el-table>
      <el-footer>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        @current-change="changePage" 
        :total="totalSize">
</el-pagination>
      </el-footer>

    </el-container>
    

</template>
<script>  export default {
  name: 'UploadExcel',
  mounted() {
   this.queryData()
  },data(){
      return{
        pageNum:1,
        pageSize:10,
        totalSize:0,
        totalPages:0,
        tableData:[]
      }
  },
  methods:{
      queryData(){
        let that = this
        this.$http.queryOrder({
        page:that.pageNum,
        status:'INIT'
        }).then(ret=>{
        if(ret.code =='SUCCESS'){
            that.pageNum = ret.data.pageNum
            that.pageSize=ret.data.pageSize
            that.totalSize=ret.data.totalSize
            that.totalPages=ret.data.totalPages
            that.tableData = ret.data.content
        }
    })
    },
    changePage(p)
    {
        this.pageNum=p
        this.queryData()
    }
  }
}
</script>