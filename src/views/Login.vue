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
      console.log('账号密码是:'+this.account +','+this.password)
      this.$router.push({
          name:'主页'
        })
      // this.axios({
      //   method:'POST',
      //   url:'a'
      // })

    }
  }
}
</script>

