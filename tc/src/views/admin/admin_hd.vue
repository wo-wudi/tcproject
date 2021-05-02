<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-main>
          <div class="bar" ref="bar_ref"></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //柱状图的x轴数据
      xAxis:[],
      //柱状图y轴的数据
      data:[]
    }
  },
  mounted(){
    this.gethd()
  },
  methods:{
    //从数据库获取灰度发布的券的领取信息
    gethd(){
      this.axios.get("/admin/g6/gethd").then(res=>{
        if(res.data){
          res.data.forEach(item => {
            this.xAxis.push(item.zname)
            this.data.push(item.count)
          });
        }
        this.barInit = echarts.init(this.$refs.bar_ref);
          let option = {
            title: {
                text: '灰度发布券数量柱状图',
                textStyle:{
                  color:'#2e7df6'
                },
                left:'center'
              },
              tooltip: {},
              xAxis:{
                data:this.xAxis,
                axisLine:{
                  show:true,
                  lineStyle:{
                    color:'#2e7df6'
                  }
                },
                axisLabel:{
                  fontSize: 16
                }
              },
              yAxis: {
                axisLine:{
                  lineStyle:{
                    color:'#2e7df6'
                  }
                },
                axisLabel:{
                  textStyle: {
                    color:'#2e7df6'
                  },
                  fontSize: 16
                }
              },
              series: [{
                color:{
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#2e7df6' // 0% 处的颜色
                }, {
                    offset: 1, color: '#5052EE' // 100% 处的颜色
                }],
              },
              name: '销量',
              type: 'bar',
              data: this.data,
              label:{
                show: true,
                position: 'top',
                textStyle: {
                  color: '#47a1f7'
                }
              }
            }]
          }
        this.barInit.setOption(option)
      })
      
    }
  }
}
</script>
<style scoped>
.bar{
  width: 810px;
  height: 440px;
}
</style>