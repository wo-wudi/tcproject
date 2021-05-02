<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-main>
          <div style="display: inline">
            <el-input
              v-model="input"
              placeholder="输入编号来搜索"
              clearable
              style="width: 300px;margin: 0px;padding: 0px;"
              size="mini"
              prefix-icon="el-icon-search"
              @keyup.13.native="search">
            </el-input>
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="search">搜索
            </el-button>
          </div>
          <el-table :data="results" stripe>
            <el-table-column prop="jid" label="境外券编号">
            </el-table-column>
            <el-table-column prop="jprice" label="价格">
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column label="删除" width="100">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delData(scope.row.jid)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="text-right">
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagenum"
              :total="total"
              :page-size="pagesize">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="提示"
      :visible.sync="delVisible" width="30%">
      <span>确定删除？删除不可恢复！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //进行分页操作
      results:[],
      //保存后台传来的数据
      res:[],
      //保存删除按钮传来的jid的值
      delId:'',
      //删除弹框的显示值
      delVisible:false,
      //获取搜索框输入的值
      input:'',
      //总数据量
      total: 0,
      //页码
      pagenum: 1,
      //每页最多的数据量
      pagesize: 10,
    }
  },
  mounted(){
    //调用获取数据的方法
    this.getjy()
  },
  methods:{
    getjy(){
      this.axios.get("/admin/g5/getjy").then(res => {
        this.res=res.data.res
        if(this.res!=0){
          this.total=this.res.length
          let start = (this.pagenum-1)*this.pagesize
          let end = this.pagenum*this.pagesize
          this.results=this.res.slice(start,end)
        }
        else{
          this.total=0
        }
      }).catch(e=>{
        this.$throw(e)
      })
    },
    //点击删除,将删除的jid赋值给delId,并显示弹框
    delData(jid){
      this.delId=jid
      this.delVisible=true
    },
    del(){
      //传delId给后台进行删除操作
      this.axios.get("/admin/a5/del",{
        params:{
          jid:this.delId
        }
      }).then(res => {
        console.log(res.data)
      }).catch(e=>{
        this.$throw(e)
      })
      this.res.splice(this.delId,1)
      //刷新一次页面
      this.$router.go(0)
      //弹框消失
      this.delVisible=false
    },
    search(){
      if(this.input==''){
        this.$message({
          message:'请输入要查询的汇率券id',
          type:'warning'
        })
      }
      else{
        this.axios.get("/admin/a5/search",{
          params:{
            jid:this.input
          }
        }).then(res => {
          this.res=res.data
          this.total=res.data.length
          let start = (this.pagenum-1)*this.pagesize
          let end = this.pagenum*this.pagesize
          this.results=this.res.slice(start,end)
        }).catch(e=>{
          this.$throw(e)
        })
      }
    },
    handleSizeChange(val) {
      console.log(val)
    },
    //点击下一页或者输入跳转页码时,将新的页码重新传到后台，请求相应页码的数据
    handleCurrentChange(val){
      this.pagenum=val
      let start = (this.pagenum-1)*this.pagesize
      let end = this.pagenum*this.pagesize
      this.results=this.res.slice(start,end)
    }
  },
  watch:{
    input(){
      if(this.input==''){
        //向后台请求用户数据,并保存在res中
        this.getjy()
      }
    }
  }
}
</script>
<style scoped>

</style>