<template>
  <div class="header position-sticky">
    <div class="row no-gutters">
      <div class="col-3">
        <div><a class="text-dark font-weight-bold ml-4" href="javascript:;">境外游礼包</a></div>
      </div>
      <div class="col-7"></div>
      <div class="col-2 d-flex justify-content-around" v-if="users">
        <div class="mt-2">
          <span class="el-dropdown-link font-weight-bold" @click="log">登录
          </span>
        </div>
      </div>
       <div class="col-2 d-flex justify-content-center mt-2 font-weight-bold" v-else>
        <el-dropdown trigger="click">
          <span>{{this.$store.state.user}}&nbsp;欢迎您！</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><span @click="quit">注销</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      users:0
    }
  },
  mounted(){
    if(!window.localStorage.getItem('user')){
      this.users=1
    }
    window.addEventListener('scroll',this.scrollChange)
  },
  destroyed(){
    window.removeEventListener('scroll',this.scrollChange)
  },
  methods:{
    scrollChange(){
      let tou = document.querySelector('.header');
      if(window.scrollY>0){
        tou.classList.add("bian");
      }
      else{
        tou.classList.remove("bian");
      }
    },
    quit(){
      this.$confirm('确定注销吗', '提示', {
          confirmButtonText: '确定'
        }).then(() => {
          this.users=1
          window.localStorage.removeItem('user')
        }).catch(()=>{
      })
    },
    log(){
      this.$confirm('以游客身份或管理员', '提示', {
          confirmButtonText: '普通游客',
          cancelButtonText: '管理员',
        }).then(() => {
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('userid')
          this.$router.push('/ulog')
        }).catch(()=>{
          this.$router.push('/alog')
      })
    }
  }
}
</script>
<style scoped>
.bian{
	background-color: rgba(222, 222, 222, .8) !important;
}
.header{
	height: 40px;
	top: 0px;
  z-index: 10;
  background-color: #F7F7F7;
}
.header a{
	line-height: 40px;
}
a:hover{
	text-decoration: none;
}
.header a:hover{
	color: #999 !important;
}
.mt-2{
  cursor: pointer;
}
</style>