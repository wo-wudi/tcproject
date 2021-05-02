<template>
  <div class="index">
    <my-header></my-header>
    <img class="w-100" src="/img/1.png" alt="">
    <div class="m-4"><span class="h4 font-weight-bold">微信支付优惠券<p class="h6 font-weight-light text-muted mt-3">微信支付自动抵扣</p></span></div>
    <div class="row no-gutters">
      <div v-for="(item,index) in hl" :key="index.hid" class="father col-lg-4 col-sm-12" @click="useyh">
        <div class="ml-3">
          <div class="yh">
            <div class="yh1"></div>
            <div class="yh2"></div>
            <div class="image">
              <img class="w-50" src="/img/2.png" alt="">
            </div>
            <div class="title">超优汇率券</div>
            <div class="detail">7天内笔笔有效</div>
            <div class="last">
              <div>
                <div>生效中</div>
              </div>
            </div>
          </div>
          <div class="ch">
            <div class="ch1"></div>
            <div class="ch2"></div>
            <div class="ctitle">{{item.hprice}}={{item.hmoney}}</div>
            <div class="ctitle1">市场参考价</div>
            <div class="ctitle2">{{item.hrmb}}</div>
          </div>
        </div>
      </div>
      <div class="father dad col-lg-4 col-sm-12" @click="jyshow" v-for="(item,index) in jy" :key="index">
        <div class="ml-3">
          <div class="yh">
            <div class="yh1"></div>
            <div class="yh2"></div>
            <div class="money">{{item.jprice}}</div>
            <span class="full">满300元可用</span>
            <div class="yuan">元</div>
            <div class="title">境外通用券</div>
            <div class="detail">15天内有效</div>
            <div class="last">
              <div>
                <div>已领取</div>
              </div>
            </div>
          </div>
          <div class="ch">
            <div class="ch1"></div>
            <div class="ch2"></div>
            <div class="ctitle" v-if="jynum!=0">还有{{jynum}}张可以领</div>
            <div class="ctitle" v-else>没有可以领</div>
            <div class="ctitle1">使用后扫不同码可解锁下一张</div>
          </div>
        </div>
      </div>
      <div class="father ba col-lg-4 col-sm-12" v-for="(item,index) in zx" :key="index.zid" @click="zxshow(item)">
        <div class="ml-3">
          <div class="yh">
            <div class="yh1"></div>
            <div class="yh2"></div>
            <span class="full">满300元可用</span>
            <div class="cash">{{item.zprice}}</div>
            <div class="title">{{item.zname}}专享券</div>
            <div class="detail">{{item.zdl}}</div>
            <div class="last" v-if="item.zchoice">
              <div>
                <div>已领取</div>
              </div>
            </div>
            <div class="last" v-else>
              <div>
                <div>未领取</div>
              </div>
            </div>
          </div>
          <div class="ch">
            <div class="ch1"></div>
            <div class="ch2"></div>
            <div class="ctitle1">香港地区{{item.zname}}线下门店可用</div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-4"><span class="h4 font-weight-bold">商户优惠券<p class="h6 font-weight-light text-muted mt-3">请向收银员出示使用优惠券</p></span></div>
    <div class="row no-gutters">
      <div class="col-lg-3 col-md-4 col-sm-6 foot" v-for="(item,index) in ty" :key="index.tid">
        <div class="ml-4 mt-3">
          <div class="fyh">
            <div class="yh1"></div>
            <div class="yh2"></div>
            <span class="ffull">{{item.tenglish}}
              <div>{{item.tname}}</div>
            </span>
            <div v-if="item.tprice" class="fcash">{{item.tprice}} <span>{{item.tmoney}}</span></div>
            <div v-else class="fcash"><img class="w-25" src="/img/3.png" alt=""></div>
            <div class="fdetail">{{item.tuse}}</div>
          </div>
          <div class="ch">
            <div class="ch1"></div>
            <div class="ch2"></div>
            <button @click="useyh">使用优惠</button>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-6 foot" v-for="(item,index) in sp" :key="index.sid">
        <div class="ml-4 mt-3">
          <div class="fyh">
            <div class="yh1"></div>
            <div class="yh2"></div>
            <span class="ffull">The Runabouts 
              <div>{{item.sname}}</div>
            </span>
            <div class="fcash">{{item.sprice}} <span>港币</span></div>
            <div class="fdetail">原价 <span>{{item.soldprice}}港币</span></div>
          </div>
          <div class="ch">
            <div class="ch1"></div>
            <div class="ch2"></div>
            <button @click="useyh">使用优惠</button>
          </div>
        </div>
      </div>
    </div>
    <button v-show="moredata" @click="more" class="more my-5">获取更多优惠券<br><img src="/img/6.png" alt=""></button>
    <button v-show="moredata==0" :disabled="true" class="nomore my-5">没有优惠券了<br><img src="/img/7.png" alt=""></button>
    <h1 class="question my-5">常见问题</h1>
    <div class="p-5">
      <div class="mb-1">领券中心优惠券的种类有哪些？</div>
      <div class="mb-3 text-muted">领券中心频道汇集了微信支付优惠券和商品优惠券（以实际展示的优惠券为准）</div>
      <div class="mb-1">领券中心优惠券领取有门槛吗？</div>
      <div class="mb-3 text-muted">领券中心所展示优惠券均为免费领取，领取后可按照所领取优惠券有效期和详细规则直接使用；贴心提示：不要超过优惠券有效使用期限哦。</div>
      <div class="mb-1">商户优惠券如何使用？</div>
      <div class="mb-3 text-muted">选择您想要购买的商品，勾选可用优惠券，支付购买即可。</div>
      <div class="mb-1">还有任何问题</div>
      <div class="mb-3 text-muted">请致电：1888888888</div>
    </div>
    <!--遮罩层-->
    <div class="mask" v-show="show" @click="close">
    </div>
    <!--显示的内容-->
    <div class="login-page" v-show="show==1">
      <span>恭喜你获得：</span>
      <div id="move" class="position-relative move">
        <img src="/img/5.png" alt="">
        <div class="main">
          <div>{{h.hprice}}=<span>{{h.hmoney}}</span></div>
          <div>市场参考价<span>{{h.hrmb}}</span></div>
        </div>
        <button @click="close1">领取</button>
      </div>
    </div>
    <div class="login-page" v-show="show==3">
      <span>恭喜你获得：</span>
      <div id="move" class="position-relative move">
        <img src="/img/5.png" alt="">
        <div class="main">
          <div>{{h1.hprice}}=<span>{{h1.hmoney}}</span></div>
          <div>市场参考价<span>{{h1.hrmb}}</span></div>
        </div>
        <button @click="close">领取</button>
      </div>
    </div>
    <div class="login-page" v-show="show==2">
      <span>恭喜你获得：</span>
      <div class="position-relative">
        <img src="/img/4.png" alt="">
        <div class="num">
          <countTo :startVal='startVal' autoplay :endVal='endVal' :duration='3000'></countTo>
        </div>
        <button @click="closejy">领取</button>
      </div>
    </div>
    <div class="login-page" v-show="show==4">
      <span>使用请扫码：</span>
      <div class="position-relative">
        <div class="qrCode my-5" ref="qrCodeDiv"></div>
        <button @click="close">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import QRCode from 'qrcodejs2';
export default {
  //数字滚动
  components: { countTo },
  data(){
    return{
      //数字滚动的开始值
      startVal: 0,
      //数字滚动的最终值
      endVal: 1,
      //境外通用券的价格
      jy: [{jprice:0}],
      //可以领取的境外通用券的数量
      jynum: 5,
      //遮罩层的控制值
      show: 1,
      //保存请求道的汇率券数据
      hl: [],
      //保存请求到的专享券数据
      zx: [],
      //保存请求到通用券等数据
      ty: [],
      //保存请求到的商铺券数据
      sp: [],
      //商铺券分页第一页
      sppage:1,
      //商铺券总数据量
      sppagecount:0,
      //通用券分页第一页
      typage:1,
      //通用券总数据量
      typagecount:0,
      //控制是否领专享券的值
      zchoice:1,
      //保存后台传来的token值
      token:'',
      //实现登录就领取
      h: {
        hprice:'100港币',
        hmoney:'85.41人民币',
        hrmb:'85.80人民币'
      },
      h1: {
        hprice:'1000港币',
        hmoney:'855.13人民币',
        hrmb:'855.59人民币'
      },
      //点击加载更多数据
      moredata:1,
    }
  },
  mounted(){
    if(window.name == ""){
      window.name = "isRefresh"; 
    }
    else if(window.name == "isRefresh"){
      this.show=0
    }
    this.getjy()
    this.gethl()
    this.getzx()
    this.getty(this.typage)
    this.getsp(this.sppage)
  },
  methods:{
    //提醒该操作需要登录
    nlog(){
      this.$confirm('此操作将需要登录, 是否登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() =>{
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userid')
        this.$router.push('/ulog')
      }).catch(()=>{})
    },
    //用户登录后点击使用券可以生成二维码
    useyh(){
      if(window.localStorage.getItem('user')){
        this.show=4
        this.$nextTick(function(){
          new QRCode(this.$refs.qrCodeDiv, {
            text: '使用成功',
            width: 450,
            height: 450,
            colorDark: "#333333", //二维码颜色
            colorLight: "#ffffff", //二维码背景色
            correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
          })
        })
      }
      else{
        this.nlog()
      }
    },
    close () {
      this.show = 0
      //清空上一个生成的二维码
      this.$refs.qrCodeDiv.innerHTML=""
    },
    close1(){
      this.show=3
    },
    closejy () {
      this.show = 0
      //根据jynum的值判断用户可以领取多少张境外通用券
      if(this.jynum==5){
        this.jy[0]={jprice:this.endVal}
      }
      else{
        this.jy.push({jprice:this.endVal})
      }
      this.jynum--
      let obj={
        token:this.token,
        tprice:this.endVal
      }
      //用户领取境外通用券后将领取的券插入到数据库中，使用户下次登录可以直接看到自己领取的券
      this.axios.post("/index/addjy",this.qs.stringify(obj)).then(res=>{
        console.log(res.data)
      }).catch(e=>{
        this.$throw(e)
      })
    },
    jyshow(){
      //用户领取的境外券的价格
      if(window.localStorage.getItem('user')){
        if(this.jynum!=0){
          this.show=2,
          this.endVal=Math.ceil(Math.random()*9)  
        }
        else{
          this.show=4
          this.useyh()
        }
      }
      else{
        this.nlog()
      }
    },
    zxshow(zx){
      if(window.localStorage.getItem('user')){
        if(zx.zchoice==0){
          this.$confirm('是否领取这张专享券?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() =>{
            //未领取->已领取
            zx.zchoice=this.zchoice
            let obj={
              token:this.token,
              zxid:zx.zid
            }
            //领取专享券后将唯一标识用户的token和领取的券的唯一标识id插入到数据库，使用户下次登录后显示已领取
            this.axios.post('/index/addczx',this.qs.stringify(obj)).then(res=>{
              console.log(res.data)
            })
          }).catch(()=>{})
        }
        //如果已经领取则显示使用的二维码券
        else{
          this.show=4
          this.useyh()
        }
      }
      else{
        this.nlog()
      }
    },
    getjy(){
      //根据用户的token值来查找该用户已经领取的境外券
      this.token=this.$store.state.token
      this.axios.get("/index/getjy",{
        params:{
          token:this.token
        }
      }).then(res => {
        if(res.data!=0){
          this.jynum=this.jynum-res.data.length
          this.jy=res.data
        }
      }).catch(e=>{
        this.$throw(e)
      })
    },
    gethl(){
      //请求汇率券的数据
      this.axios.get("/index/gethl").then(res => {
        this.hl=res.data.res
      }).catch(e=>{
        this.$throw(e)
      })
    },
    getzx(){
      //根据用户的token值来请求用户领取的专享券
      let choice=0
      this.axios.get('/index/getchoicezx',{
        params:{
          token:this.token
        }
      }).then(res=>{
        choice=res.data
      }).catch(e=>{
        this.$throw(e)
      })
      //灰度发布，每三个用户就给第三个用户展示包含新券的所有专享券信息
      if(window.localStorage.getItem('userid')%3==0){
        this.axios.get("/index/getzx").then(res => {
          this.zx=res.data.res
          //判断用户是否已经领取，若领取则改变领取状态且不可再次领取
          if(choice){
            for(let i=0;i<this.zx.length;i++){
              for(let j=0;j<choice.length;j++){
                if(this.zx[i].zid==choice[j].zxid){
                  this.zx[i].zchoice=1
                }
              }
            }
          }
        }).catch(e=>{
          this.$throw(e)
        })
      }
      //否则只向该用户展示旧的专享券的信息
      else{
        this.axios.get("/index/getzxq").then(res => {
          this.zx=res.data.res
          //判断用户是否已经领取，若领取则改变领取状态且不可再次领取
          if(choice){
            for(let i=0;i<this.zx.length;i++){
              for(let j=0;j<choice.length;j++){
                if(this.zx[i].zid==choice[j].zxid){
                  this.zx[i].zchoice=1
                }
              }
            }
          }
        }).catch(e=>{
          this.$throw(e)
        })
      }
    },
    getty(typagenum){
      //将分页信息发送到后台请求第一页的通用券数据
      this.axios.get("/index/getty",{
        params:{
          pagenum:typagenum
        }
      }).then(res => {
        this.ty=this.ty.concat(res.data.res)
        this.typagecount=res.data.count
      }).catch(e=>{
        this.$throw(e)
      })
    },
    getsp(sppagenum){
      //将分页信息发送到后台请求第一页的商铺券信息
      this.axios.get("/index/getsp",{
        params:{
          pagenum:sppagenum
        }
      }).then(res => {
        this.sp=this.sp.concat(res.data.res)
        this.sppagecount=res.data.count
      }).catch(e=>{
        this.$throw(e)
      })
    },
    more(){
      //点击加载更多优惠券信息
      if(window.localStorage.getItem('user')){
        this.sppage++
        this.typage++
        if(this.sppage>this.sppagecount){
          console.log('没有数据')
        }
        else{
          this.getsp(this.sppage)
        }
        if(this.typage>this.typagecount){
          console.log('object')
        }
        else{
          this.getty(this.typage)
        }
        if(this.typage>this.typagecount && this.sppage>this.sppagecount){
          this.moredata=0
        }
      }
      else{
        this.nlog()
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/css/index.css';
.index{
  background: #F7F7F7;
}
</style>