<template>
  <el-container style="width: 20%; margin-left: 40%;margin-top:60px;" >
    <el-header>登录系统</el-header>
    <el-input  placeholder="请输入账号" v-model="account" ></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button v-on:click="login">登录</el-button>
  </el-container>

</template>
<script>
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data() {
    return {
      account :'',
      password: ''
    }
  },
  methods:{
    login(){
      let that = this
      console.log('账号密码是:'+this.account +','+this.password)
      this.$http.userLogin({
        account: that.account,
        password:that.password
      }).then(ret =>{
        console.log(ret)
        if(ret.code == 'SUCCESS'){
          that.$store.commit("setToken", ret.data.token)
          that.$router.push({
            path:'/main'
          })
        }else{
          this.$alert(ret.msg, '登录失败', {
            confirmButtonText: '确定'
          });
        }
      })

    }
  }
}
</script>

