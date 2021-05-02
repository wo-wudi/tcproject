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
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-circle-plus-outline" @click="add">新增
            </el-button>
          </div>
          <el-table :data="results" stripe>
            <el-table-column prop="hid" label="汇率券编号">
            </el-table-column>
            <el-table-column prop="hprice" label="币值">
            </el-table-column>
            <el-table-column prop="hmoney" label="汇率">
            </el-table-column>
             <el-table-column prop="hrmb" label="市场价">
            </el-table-column>
            <el-table-column label="编辑" width="100">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="changeData(scope.row.hid)">修改</el-button>
              </template>
            </el-table-column>
            <el-table-column label="删除" width="100">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="delData(scope.row.hid)">删除</el-button>
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
      title="修改"
      :visible.sync="changeVisible" width="30%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="编号" style="width:300px">
          <el-input :value="changeForm.hid" disabled></el-input>
        </el-form-item>
        <el-form-item label="币值" style="width:300px">
          <el-input v-model="changeForm.hprice" placeholder="请输入修改的币值"></el-input>
        </el-form-item>
        <el-form-item label="汇率" style="width:300px">
          <el-input v-model="changeForm.hmoney" placeholder="请输入修改的汇率"></el-input>
        </el-form-item>
        <el-form-item label="市场价" style="width:300px">
          <el-input v-model="changeForm.hrmb" placeholder="请输入修改的市场价"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeVisible = false">取 消</el-button>
        <el-button type="primary" @click="change">修 改</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增"
      :visible.sync="addVisible" width="30%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="币值" style="width:300px">
          <el-input v-model="addForm.hprice" placeholder="请输入币值"></el-input>
        </el-form-item>
        <el-form-item label="汇率" style="width:300px">
          <el-input v-model="addForm.hmoney" placeholder="请输入汇率"></el-input>
        </el-form-item>
        <el-form-item label="市场价" style="width:300px">
          <el-input v-model="addForm.hrmb" placeholder="请输入市场价"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData">新 增</el-button>
      </span>
    </el-dialog>
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
      //保存删除按钮传来的hid的值
      delId:'',
      //删除弹框的显示值
      delVisible:false,
      //保存修改的值
      changeForm: {},
      //修改弹窗的显示值
      changeVisible:false,
      //保存修改传来的hid值
      changeId:'',
      //获取搜索框输入的值
      input:'',
      //总数据量
      total: 0,
      //页码
      pagenum: 1,
      //每页最多的数据量
      pagesize: 10,
      //新增窗口弹窗
      addVisible:false,
      //保存新增的值
      addForm: {}
    }
  },
  mounted(){
    //调用获取数据的方法
    this.gethl()
  },
  methods:{
    gethl(){
      this.axios.get("/admin/g1/gethl").then(res => {
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
    //点击删除,将删除的hid赋值给delId,并显示弹框
    delData(hid){
      this.delId=hid
      this.delVisible=true
    },
    del(){
      //传delId给后台进行删除操作
      this.axios.get("/admin/a1/del",{
        params:{
          hid:this.delId
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
    //点击编辑,将取得的hid分别赋值给changeId和弹窗中的第一个文本框,并显示弹窗
    changeData(hid){
      this.changeForm.hid=hid
      this.changeId=hid
      this.changeVisible=true
    },
    change(){
      //将输入的值传入后台进行修改
      this.axios.post("/admin/a1/update",this.qs.stringify(this.changeForm)).then(res => {
        console.log(res.data)
      }).catch(e=>{
        this.$throw(e)
      })
      //刷新一次页面
      this.$router.go(0)
      //弹框消失
      this.changeVisible=false
    },
    search(){
      if(this.input==''){
        this.$message({
          message:'请输入要查询的汇率券id',
          type:'warning'
        })
      }
      else{
        this.axios.get("/admin/a1/search",{
          params:{
            hid:this.input
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
    },
    add(){
      this.addVisible=true
    },
    addData(){
      this.axios.post("/admin/a1/add",this.qs.stringify(this.addForm)).then(res => {
        console.log(res.data)
      }).catch(e=>{
        this.$throw(e)
      })
      //刷新一次页面
      this.$router.go(0)
      this.addVisible=false
    }
  },
  watch:{
    input(){
      if(this.input==''){
        //向后台请求用户数据,并保存在res中
        this.gethl()
      }
    }
  }
}
</script>
<style scoped>

</style>