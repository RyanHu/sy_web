<template>
      <el-container   :v-show="tableData.lenght>0">

      <el-table
        border
        max-height="600"
        :data="tableData"
        stripe
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            >
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
      <el-footer>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        @current-change="changePage" 
        :total="totalSize">
</el-pagination>
      </el-footer>
        <el-button
            style="height:50px;width:200px;"
            @click="updateData()"
        >收货</el-button>
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
        tableData:[],
        pre_receive:[]
      }
  },
  methods:{
      queryData(){
        let that = this
        this.$http.queryOrder({
        page:that.pageNum,
        status:'PROCESSING'
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
    },
    handleSelectionChange(v){
        console.log(v)
      this.pre_receive = v;
    },
    updateData(e)
    {
      let that = this
      this.$http.changeOrderStatus({
        status:'SUCCESS',
        orderList:JSON.stringify(this.pre_receive)
      }).then(ret=>{
        this.$alert(ret.msg, '保存', {
          confirmButtonText: '确定'
        });
        that.pageNum=1
        that.queryData()
      })
      console.log(e)
    }
  }
}
</script>