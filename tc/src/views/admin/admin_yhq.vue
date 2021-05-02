<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-header class="d-flex justify-content-between">
        <span class="font-weight-bold">后台管理员系统界面</span>
        <div style="text-align:right">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="quit">注销</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{this.$store.state.admin}}&nbsp;欢迎您！</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>管理员操作</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="ahl">汇率券管理</el-menu-item>
                <el-menu-item index="1-2" @click="azx">专享券管理</el-menu-item>
                <el-menu-item index="1-3" @click="aty">通用券管理</el-menu-item>
                <el-menu-item index="1-4" @click="asp">商铺券管理</el-menu-item>
                <el-menu-item index="1-5" @click="ajy">境外券管理</el-menu-item>
                <el-menu-item index="1-6" @click="ahd">新券的反馈</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="提示"
      :visible.sync="quitVisible" width="30%">
      <span>确定注销吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quitVisible = false">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quitVisible:false
    }
  },
  methods:{
    quit(){
      this.quitVisible=true
    },
    close(){
      this.$router.push('/alog')
      window.localStorage.removeItem('admin')
    },
    ahl(){
      this.$router.push('/ahl')
    },
    azx(){
      this.$router.push('/azx')
    },
    aty(){
      this.$router.push('/aty')
    },
    asp(){
      this.$router.push('/asp')
    },
    ajy(){
      this.$router.push('/ajy')
    },
    ahd(){
      this.$router.push('/ahd')
    }
  }
}
</script>
<style scoped>
.el-header {
    background: linear-gradient(to right,#EEF1F6,#EEF1FD,#EEF1F6);
    color: #333;
    line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>