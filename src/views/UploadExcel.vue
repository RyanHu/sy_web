<template>
  <el-container>
    <el-header style="height: 10px"></el-header>
    <el-upload class="upload-demo" drag :action="postFileUrl" accept='application/vnd.ms-excel' show-file-list><i
        class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过500kb</div>
    </el-upload>
    <el-container style="height: 800px;">
      <el-table  border height="800" :data="tableData" stripe style="width: 100%;">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="日期">
                <span>{{ props.row.date }}</span>
              </el-form-item>
              <el-form-item label="名称">
                <span>{{ props.row.obj_name }}</span>
              </el-form-item>
              <el-form-item label="数量">
                <span>{{ props.row.obj_count }}</span>
              </el-form-item>
              <el-form-item label="单位">
                <span>{{ props.row.unit }}</span>
              </el-form-item>
              <el-form-item label="供应商">
                <span>{{ props.row.supplier }}</span>
              </el-form-item>
              <el-form-item label="科室">
                <span>{{ props.row.requester }}</span>
              </el-form-item>
              <el-form-item label="型号">
                <span>{{ props.row.model }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.remarks }}</span>
              </el-form-item>
              <el-form-item label="需求">
                <span>{{ props.row.required }}</span>
              </el-form-item>
              <el-form-item label="采购模式">
                <span>{{ props.row.order_mode }}</span>
              </el-form-item>
              <el-form-item label="性质">
                <span>{{ props.row.properties }}</span>
              </el-form-item>
              <el-form-item label="上报单位">
                <span>{{ props.row.reporter }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="日期" width="100"/>
        <el-table-column prop="obj_name" label="名称" width="200"/>
        <el-table-column prop="obj_count" label="数量" width="50"/>
        <el-table-column prop="unit" label="单位" width="50"/>
        <el-table-column prop="supplier" label="供应商" width="80"/>
        <el-table-column prop="requester" label="科室" width="80"/>
        <el-table-column prop="model" label="型号" width="60"/>
        <el-table-column prop="remarks" label="备注" width="120"/>
        <el-table-column prop="required" label="需求" width="80"/>
        <el-table-column prop="order_mode" label="采购模式" width="60"/>
        <el-table-column prop="properties" label="性质" width="150"/>
        <el-table-column prop="reporter" label="上报单位" width="150"/>
        <el-table-column prop="receiver" label="收货人" width="150"/>
        <el-table-column prop="receiving_date" label="收货日期" width="150"/>
      </el-table>
    </el-container>
  </el-container>
</template>
<script>  export default {
  name: 'UploadExcel', data() {
    return {
      postFileUrl: 'http://www.baidu.com',
      tableData:[{date:'2020-07-01',obj_name:'电子血压计',obj_count:'1',unit:'台',supplier:'欧姆龙',requester:'心血管内科八区',model:'HBP-1300',remarks:'/',required:'2020-07-15前到货',order_mode:'采购/新采购/考察',properties:'设备/耗材/介入耗材/手术耗材',reporter:'延安大学咸阳医院/眉山心脑血管医院/西安北车医院/江苏如皋心脑血管医院',receiver:'设备科',receiving_date:'2020-07-14'}
        ,{date:'2020-07-01',obj_name:'电子血压计',obj_count:'1',unit:'台',supplier:'欧姆龙',requester:'心血管内科八区',model:'HBP-1300',remarks:'/',required:'2020-07-15前到货',order_mode:'采购/新采购/考察',properties:'设备/耗材/介入耗材/手术耗材',reporter:'延安大学咸阳医院/眉山心脑血管医院/西安北车医院/江苏如皋心脑血管医院',receiver:'设备科',receiving_date:'2020-07-14'}
        ,{date:'2020-07-01',obj_name:'电子血压计',obj_count:'1',unit:'台',supplier:'欧姆龙',requester:'心血管内科八区',model:'HBP-1300',remarks:'/',required:'2020-07-15前到货',order_mode:'采购/新采购/考察',properties:'设备/耗材/介入耗材/手术耗材',reporter:'延安大学咸阳医院/眉山心脑血管医院/西安北车医院/江苏如皋心脑血管医院',receiver:'设备科',receiving_date:'2020-07-14'}
        ,{date:'2020-07-01',obj_name:'电子血压计',obj_count:'1',unit:'台',supplier:'欧姆龙',requester:'心血管内科八区',model:'HBP-1300',remarks:'/',required:'2020-07-15前到货',order_mode:'采购/新采购/考察',properties:'设备/耗材/介入耗材/手术耗材',reporter:'延安大学咸阳医院/眉山心脑血管医院/西安北车医院/江苏如皋心脑血管医院',receiver:'设备科',receiving_date:'2020-07-14'}
        ,{date:'2020-07-01',obj_name:'电子血压计',obj_count:'1',unit:'台',supplier:'欧姆龙',requester:'心血管内科八区',model:'HBP-1300',remarks:'/',required:'2020-07-15前到货',order_mode:'采购/新采购/考察',properties:'设备/耗材/介入耗材/手术耗材',reporter:'延安大学咸阳医院/眉山心脑血管医院/西安北车医院/江苏如皋心脑血管医院',receiver:'设备科',receiving_date:'2020-07-14'}
        ,{date:'2020-07-01',obj_name:'电子血压计',obj_count:'1',unit:'台',supplier:'欧姆龙',requester:'心血管内科八区',model:'HBP-1300',remarks:'/',required:'2020-07-15前到货',order_mode:'采购/新采购/考察',properties:'设备/耗材/介入耗材/手术耗材',reporter:'延安大学咸阳医院/眉山心脑血管医院/西安北车医院/江苏如皋心脑血管医院',receiver:'设备科',receiving_date:'2020-07-14'}
        ,{date:'2020-07-01',obj_name:'电子血压计',obj_count:'1',unit:'台',supplier:'欧姆龙',requester:'心血管内科八区',model:'HBP-1300',remarks:'/',required:'2020-07-15前到货',order_mode:'采购/新采购/考察',properties:'设备/耗材/介入耗材/手术耗材',reporter:'延安大学咸阳医院/眉山心脑血管医院/西安北车医院/江苏如皋心脑血管医院',receiver:'设备科',receiving_date:'2020-07-14'}

      ]
    }
  }
}  </script>
<style>  .upload-demo .el-upload-dragger {
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