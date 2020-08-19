<template>
  <el-container>
    <el-header>采购管理平台</el-header>
    <el-container>
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246)"
      >
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>Excel操作</span>
            </template>

            <el-menu-item
              index="1-1"
              @click="ccc"
            >导入Excel</el-menu-item>
            <el-menu-item index="1-2">下载Excel</el-menu-item>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>数据查询</span>
            </template>
            <el-menu-item index="2-1">发起中</el-menu-item>
            <el-menu-item index="2-2">采购中</el-menu-item>
            <el-menu-item index="2-3">历史记录</el-menu-item>
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
    ccc() {
      console.log(11111)
      this.$router.push({
        path: '/uploadExcel'
      })

    }
  }
}
</script>

<style scoped>
</style>