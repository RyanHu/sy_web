
export default   {
    userLogin(opt){
        return window.axios.post('/user/login',opt).then(res=>{
            return res;
        })
    },

}