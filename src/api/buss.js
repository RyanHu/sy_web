
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
    nihao(opt){
        return window.axios.post('/buss/nihao',opt).then(res=>{
            return res;
        })
    },

}