
export default   {
    sendVerifyCode(opt)
    {
        return window.axios.post('/dp/client/user/vcode.do',opt).then(res=>{
            return res;
        })
    },

    userLogin(opt){
        return window.axios.post('/dp/client/user/login.do',opt).then(res=>{
            return res;
        })
    },

    gwList(opt){
        return window.axios.post('/dp/client/gwList.do',opt).then(res=>{
            return res;
        })
    },
    currentGatewayData(opt){
        return window.axios.post('/dp/client/currentGatewayData.do',opt).then(res=>{
            return res;
        })
    },

    fiveMinuteData(opt){
        return window.axios.post('/dp/client/fiveMinuteData.do',opt).then(res=>{
            return res;
        })
    },
}
