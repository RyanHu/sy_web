<template>
  <el-container
      style="width: 50%;"
  >
    <el-header>
      新需求
    </el-header>
  <el-table
      border
      max-height="600"
      :data="tableData"
      stripe
  >
    <el-table-column
        prop="createTime"
        label="日期编号"
    />
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-link type="primary"
                 :href="genLink(scope.row.batchNo)"
        >下载</el-link>
      </template>
    </el-table-column>
  </el-table>
    <el-header>
      <p>处理中</p>

    </el-header>
    <el-table
        border
        max-height="600"
        :data="tableData2"
        stripe
    >
      <el-table-column
          prop="createTime"
          label="日期编号"
      />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-link type="primary"
                   :href="genLink(scope.row.batchNo)"
          >下载</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-footer>


    </el-footer>
  </el-container>


</template>

<script>
import util from '@/util/util.js'
export default {
  name: 'DownloadExcel',
  mounted() {
    this.queryByStatus('INIT')
    this.queryByStatus('PROCESSING')
  },
  data() {
    return {
      tableData:[],
      tableData2:[]
    }
  },
  methods:{
    queryByStatus(status){
      let that = this
      this.$http.queryBatchByStatus({
        status:status
      }).then(ret=>{
        if(ret.code == 'SUCCESS'){
          let cd = [];
          ret.data.forEach(f=>{
            let tTime = f.substr(0,13);
            console.log(tTime);
            let date = new Date(Number(tTime));
            cd.push({
              createTime:util.getyyyyMMddHHmmss(date),
              batchNo:f
            })

          })
          if(status == 'INIT'){
            that.tableData = cd
          }
          if(status == 'PROCESSING'){
            that.tableData2 = cd
          }
        }
      })

    },
    genLink(batchNo)
    {
      return "http://api.huhuwang.work:8082/buss/downloadExcel?batchNo="+batchNo
    }
  }
}
</script>

<style>
</style>