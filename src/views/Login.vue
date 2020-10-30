<template>
  <el-container style="width: 20%; margin-left: 40%;margin-top:60px;" >
    <el-header>登录系统</el-header>
    <el-input  placeholder="请输入手机号" v-model="account" ></el-input>
    <el-container> <el-input placeholder="请输入验证码" v-model="vcode"></el-input>
      <el-button @click="sendVerifyCode" type="success" :disabled="!show">
        获取验证码
        <span v-show="!show" class="count">({{count}}s)</span>
      </el-button>
    </el-container>
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
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null,
      account :'',
      vcode: '',
      vid:''
    }
  },
  methods:{
    login(){
      let that = this
      console.log('账号是:'+this.account +',vcode='+this.vcode+",vid= "+this.vid)
      this.$http.userLogin({
        mobile: that.account,
        // vid:that.vid,
        // vcode:that.vcode,
        vid:'715A9SAKA50XbRt9',
        vcode:'624530',
        type:'0'
      }).then(ret =>{
        console.log(ret)
        if(ret.code == 200){
          that.$store.commit("setToken", ret.data.token)
          console.log('token! = '+this.$store.getters.token)
          that.$router.push({
            path:'/dpmain'
          })
        }else{
          this.$alert(ret.msg, '登录失败', {
            confirmButtonText: '确定'
          });
        }
      })
    },
    sendVerifyCode(){
      let that = this
      let TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer); // 清除定时器
            this.timer = null;
          }
        }, 1000)

      }
        console.log('登录手机号是:'+this.account)
      this.$http.sendVerifyCode({
        mobile:that.account,
        vtype:'USER_LOGIN'
      }).then(ret=>{
        console.log(ret)
        if(ret.code == 200)
        {
          that.vid = ret.data.vid;
        }
      })


    },


  }
}
</script>

