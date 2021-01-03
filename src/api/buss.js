
export default   {
    queryOrder(opt){
        return window.axios.post('/buss/query',opt).then(res=>{
            return res;
        })
    },
    postOrder(opt){
        return window.axios.post('/buss/postOrder',opt).then(res=>{
            return res;
        })
    },
    updateOrder(opt)
    {
        return window.axios.post('/buss/updateOrder',opt).then(res=>{
            return res;
        })
    },
    changeOrderStatus(opt){
        return window.axios.post('/buss/changeOrderStatus',opt).then(res=>{
            return res;
        })
    },
    queryBatchByStatus(opt){
        return window.axios.post('/buss/queryBatchByStatus',opt).then(res=>{
            return res;
        })
    },
    downloadExcel(opt){
        return window.axios(opt).then(res=>{
            return res;
        })
    },
    nihao(opt){
        return window.axios.post('/buss/nihao',opt).then(res=>{
            return res;
        })
    },
    queryJFMsgList(opt){
        return window.axios.post('/api/pigeon/api/v1/basic/user/sysMessage/showFileList',opt).then(res=>{
            return res;
        })
    },
    postJFMsg(opt){
        return window.axios.post('/api/pigeon/api/v1/basic/user/sysMessage/postFile',opt,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res=>{
            return res;
        })
    },
    downloadJFMsg(opt){
        return window.axios.post('/api/pigeon/api/v1/basic/user/sysMessage/downloadFile',opt).then(res=>{
            return res;
        })
    },

    deleteJFMsg(opt){
        return window.axios.post('/api/pigeon/api/v1/basic/user/sysMessage/deleteFile',opt).then(res=>{
            return res;
        })
    }
}
