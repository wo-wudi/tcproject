<template>
  <div class="user_reg">
    <div class="position-relative mb-5">
      <img class="w-100" src="img/login/breadcrumb-bg.jpg" alt="">
      <div class="h1 position-absolute main_font font_move">
        <div>用户注册界面</div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="text-center col-7 ml-auto mr-auto">
          <div class="login_reg_head d-flex justify-content-center">
            <span class="text-dark font-weight-bold h3">用户注册</span>
          </div>
          <div class="my-5">
            <div class="tab_reg">
              <div class="login_form text-left">
                <div class="regex">
                  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                    <el-form-item prop="uname">
                      <el-input prefix-icon="el-icon-user" placeholder="用户名" v-model="ruleForm.uname" auto-comlete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="upwd">
                      <el-input prefix-icon="el-icon-view" type="password" placeholder="密码" v-model="ruleForm.upwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkUpwd">
                      <el-input prefix-icon="el-icon-view" type="password" placeholder="再次输入密码" v-model="ruleForm.checkUpwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                      <el-input prefix-icon="el-icon-phone" placeholder="手机号码" v-model="ruleForm.phone" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <button class="btn btn-light border-1 border mt-2" @click="reg('ruleForm')">注册</button>
                    </el-form-item>
                  </el-form>    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    //判断输入的用户名格式
    var checkUname = (rule, value, callback) => {
      let unameRegexp=/^[a-zA-Z0-9]{6,10}$/
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      setTimeout(() => {
        if (!unameRegexp.test(value)) {
          callback(new Error('请输入6-10位字母或数字'));
        } else {
            callback();
        }
      }, 100);
    }
    //判断输入的密码格式
    var checkUpwd = (rule, value, callback) => {
      let upwdRegexp=/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){8,16}$/
      if (!value) {
        return callback(new Error('密码不能为空'));
      }
      setTimeout(() => {
        if (!upwdRegexp.test(value)) {
          callback(new Error('8-16位英文字母,数字或者符号(除空格)且字母,数字和标点符号至少包含两种'));
        } 
        else {
          callback();
        }
      }, 100);
    }
    //判断两次密码输入是否一致
    var checkCheckUpwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('输入不能为空'));
      }
      setTimeout(() => {
        if (value!=this.ruleForm.upwd) {
          callback(new Error('两次输入不一致'));
        } 
        else {
          callback();
        }
      }, 100);
    }
    //判断输入的手机号格式
    var checkPhone = (rule, value, callback) => {
      let phoneRegexp=/^1[3-9]\d{9}$/
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      setTimeout(() => {
        if (!phoneRegexp.test(value)) {
          callback(new Error('请输入11位正确手机号'));
        } else {
            callback();
        }
      }, 100);
    }
    return{
      ruleForm:{
        //获取输入的用户名
        uname:'',
        //获取输入的密码
        upwd:'',
        //获取再次输入的密码
        checkUpwd:'',
        //获取输入的手机号
        phone:''
      },
      rules:{
        uname:[
          {
            validator:checkUname,
            trigger:'change'
          }
        ],
        upwd:[
          {
            validator:checkUpwd,
            trigger:'change'
          }
        ],
        checkUpwd:{
          validator:checkCheckUpwd,
          trigger:'change'
        },
        phone:[
          {
            validator:checkPhone,
            trigger:'change'
          }
        ]
      }
    }
  },
  methods:{
    //将用户输入的值传到后台进行注册操作，并将返回结果赋值给res
    reg(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.get("/user/u1/exist",{
            params:{
              uname:this.ruleForm.uname
            }
          }).then(res=>{
            if(res.data){
              this.$confirm('注册失败，该用户名已经被注册','提示',{
                type:'warning'
              }).then(()=>{}).catch(()=>{})
            }
            else{
              this.axios.post("/user/u1/reg",this.qs.stringify(this.ruleForm)).then(res => {
                if(res.data){
                  this.$confirm('注册成功，是否直接登录', '提示', {
                    confirmButtonText: '确定'
                  }).then(() => {
                    this.$router.push('/ulog')
                  }).catch(() => {
                    this.$message('继续注册')
                  });
                }
              }).catch(e=>{
                this.$throw(e)
              })
            }
          }).catch(e=>{
            this.$throw(e)
          })
        } 
        else {
          this.$message({
            message:'注册失败，请检查输入的内容',
            type:'warning'
          })
          return false;
        }
      });
    }
  }
}
</script>
<style scoped>
.main_font{
  top: 35%;
  left: 42%;
}
@keyframes font_move{
	from{
		transform: translateY(-500px);
	}
	50%{
		transform: scale(1.5);
	}
	to{
		transform: translateY(0px);
	}
}
.font_move{
	animation: font_move 2s ease;
}
.login_form{
  background: transparent none repeat scroll 0 0;
  box-shadow: 0 0 6px rgba(0,0,0,.2);
  padding: 80px;
}
.login_reg_head>span{
  color: #4fb68d !important;
}
</style>