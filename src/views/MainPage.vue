<template>
  <el-container>
    <el-header>采购管理平台</el-header>
    <el-container>
      <el-aside
        width="200px"
        style="background-color: rgb(255, 255, 255)"
      >
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>Excel操作</span>
            </template>

            <el-menu-item
              index="1-1"
              @click="onClick('import')"
            >导入Excel</el-menu-item>
            <el-menu-item
              index="1-2"
              @click="onClick('export')"
            >下载Excel</el-menu-item>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>数据查询</span>
            </template>
            <el-menu-item index="2-1" @click="onClick('queryInit')">发起中</el-menu-item>
            <el-menu-item index="2-2" @click="onClick('queryProcessing')">采购中</el-menu-item>
            <el-menu-item index="2-3" @click="onClick('queryHistory')">历史记录</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="3-1">个人中心</el-menu-item>
            <el-menu-item index="3-2">新增用户</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: "MainPage"
  , data() {
    return {

    }

  },
  mounted() {
  },
  methods: {
    handleClose(e) {
      console.log(e)
    },
    handleOpen(e) {
      console.log(e)
    },
    onClick(v) {
      console.log(v)
      switch (v) {
        case 'import':
          this.$router.push({
            name: '上传Excel'
          })
          break;
        case 'export':
          this.$router.push({
            name: '下载Excel'
          })
          break;
          case 'queryInit':
          this.$router.push({
            path: 'QueryInit'
          })
          break;
           case 'queryProcessing':
          this.$router.push({
            path: 'queryProcessing'
          })
          break; case 'queryHistory':
          this.$router.push({
            path: 'queryHistory'
          })
          break;
      }


    }
  }
}
</script>

<style scoped>
</style>