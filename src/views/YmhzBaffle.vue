<template>
    <el-container  :v-show="tableData.lenght>0">
        <el-container style="align-items: center;">
            <span><p>标题名</p><input  id="fileTitleIpn" name = "fileTitleIpn" type="text" v-model="postFileData.title" /></span>
            <span><p>品牌号</p><input  id="fileBrandIpn" name = "fileBrandIpn" type="text" v-model="postFileData.brandCode"/></span>
            <span><p>平台号</p><input  id="fileChCodeIpn" name = "fileChCodeIpn" type="text" v-model="postFileData.chCode"/></span>
            <span><p>渠道号</p><input  id="fileChannelIpn" name = "fileChannelIpn" type="text" v-model="postFileData.channelCode"/></span>
            <el-upload
                    class="upload-demo"
                    ref="upload"
                    :action="postFileUrl"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :data="postFileData"
                    :file-list="fileList"
                    :limit="1"
                    :on-success="uploadSuccess"
                    :on-exceed="uploadExceed"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">请上传HTML文件（总部就是HTML），文件别太大，别给我硬盘干崩了</div>
            </el-upload>

        </el-container>
        <el-table

                border
                max-height="600"
                :data="tableData"
                stripe
                style="width: 100%;margin-top: 50px"
        >
            <el-table-column
                    prop="title"
                    label="标题"
            />
            <el-table-column
                    prop="chcode"
                    label="机构号"
            />
            <el-table-column
                    prop="channelCode"
                    label="频道号"
            />

            <el-table-column
                    prop="brand"
                    label="品牌号"
            />
            <el-table-column
                    prop="msgPath"
                    label="消息路径"
            />
            <el-table-column
                    prop="msgId"
                    label="消息ID"
            />
            <el-table-column
                    prop="createTime"
                    label="创建时间"
            />
            <el-table-column
                    fixed="right"
                    label="操作"
                    >
                <template slot-scope="scope">
                    <el-link type="primary" :href="downloadFile(scope.row.msgPath)" >下载</el-link>
                    <el-button @click="clickDelete(scope.row.msgId)" type="text" style="margin-left: 20px">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="提示" :visible.sync="dialogVisible"  width="30%" >
                 <span>是否进行删除操作</span>
                 <span slot="footer" class="dialog-footer">
                 <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="deleteFile">确 定</el-button>
        </span>
        </el-dialog>


        <el-footer>
        </el-footer>

    </el-container>
</template>

<script>
    import consts from '@/util/const.js'
    export default {
        name: "YmhzBaffle.vue",
        mounted() {
            this.queryData()
        },
        data() {
            return {
                fileList: [],
                postFileData:{
                    title:'',
                    chCode:'JP00003',
                    channelCode:'JM00005',
                    brandCode:'J00018',
                },
                tableData: [],
                msgId:'',
                dialogVisible:false,
                showlist:false,
                postFileUrl: consts.baseUrl()+'/api/pigeon/api/v1/basic/user/sysMessage/postFile'

            }
        },
        methods: {
            uploadSuccess(){
                this.queryData();
            },
            uploadExceed(files, fileList) {
                this.$set(fileList[0], 'raw', files[0]);
                this.$set(fileList[0], 'name', files[0].name);
                this.$refs['upload'].clearFiles();//清除文件
                this.$refs['upload'].handleStart(files[0]);//选择文件后的赋值方法
            },
            submitUpload() {
                let that = this
                if (that.postFileData.title == '')
                {
                    alert('请输入标题')
                    return
                }
                if (that.postFileData.chCode == '')
                {
                    alert('请输入平台号')
                    return
                }
                if (that.postFileData.brandCode == '')
                {
                    alert('请输入品牌号')
                    return
                }
                if (that.postFileData.channelCode == '')
                {
                    alert('请输入渠道号')
                    return
                }
                this.$refs.upload.submit();

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            queryData(){
                let that = this
                this.$http.queryJFMsgList({
                }).then(ret=>{
                    if(ret.code =='SUCCESS'){
                        that.tableData = ret.data
                    }

                })
            },
            downloadFile(msgPath){
                return consts.baseUrl()+"/api/pigeon/api/v1/basic/user/sysMessage/downloadFile?filePath="+msgPath
            },
            clickDelete(msgId){
                let that = this
                that.dialogVisible = true
                that.msgId = msgId
            }
            ,
            deleteFile()
            {
                let that = this
                that.$http.deleteJFMsg({
                    msgId:that.msgId
                }).then(ret=>{
                    console.log(ret)
                    that.queryData();
                })
                that.dialogVisible = false
            }
        }
    }
</script>

<style scoped>

</style>
