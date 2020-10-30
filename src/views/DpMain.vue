<template >
    <el-container :style="{backgroundImage:'url('+require('../assets/bg.jpg')+')',height:'100%' ,position: 'fixed',backgroundSize:'100%,100%',width:'100%'}" >
        <el-header>监控中心</el-header>
        <el-container>
            <el-container >
                <el-header></el-header>

              <dv-border-box-12 :style="{width:'45%',padding: '10px 0px 0px 10px '}">

              <div id="chart1" :style="{ width:'100%',height: '100%'}"></div>
              </dv-border-box-12>
              <dv-border-box-12 :style="{width:'45%',padding: '10px 0px 0px 10px'}">

              <div id="chart2" :style="{ width:'100%',height: '100%'}"></div>
              </dv-border-box-12>

              <dv-border-box-12 :style="{width:'45%',padding: '10px 0px 0px 10px'}">

                <div id="chart3" :style="{width:'100%',height: '100%'}"></div>
              </dv-border-box-12>

            </el-container>

        </el-container>

    </el-container>
</template>

<script>
    import util from '@/util/util.js'

    export default {
        name: "DpMain.vue",
        data() {
            return {
                timer: '',
                bgImg:'../assets/bg.jpg',
                gwid:'',
                detectors:[],
                timestamps:[],
                chart1:{
                    chart:'',
                    data:''
                },
                chart2:{
                    chart:'',
                    data:''
                },
                chart3:{
                    chart:'',
                    data:''
                },
            }

        },

        mounted(){
            this.gwList();
        },
        methods:{
            gwList(){
                let that = this
                this.$http.gwList({
                    token: that.$store.getters.token
                }).then(ret=>{
                    console.log(ret)
                    if(ret.code == 200)
                    {
                        if(ret.gwList.length>0)
                        {
                            //获取第一个GW ID,视为可用
                            that.gwid = ret.gwList[0].gwid
                            that.detectors = ret.gwList[0].detectorlist
                            //请求一天数据
                            let endTime =  Date.parse( new Date() );
                            let startTime =  endTime-24*60*60*1000;
                            console.log('起止时间:'+startTime + ','+endTime)
                            that.getFmData(that.gwid,startTime/1000,endTime/1000)
                        }
                    }
                })
            },
            getFmData(gwid,startTime,endTime){
                let that = this
                this.$http.fiveMinuteData({
                    gwid:gwid,
                    token:that.$store.getters.token,
                    startTime:startTime,
                    endTime:endTime
                }).then(ret=>{
                    console.log(ret)
                    ret.data.detectorDatas.forEach(d_Data=>{
                        if(d_Data.did == '1')
                        {//did为1的  获取环境数据

                            let timestamps = Object.keys(d_Data.data.temp);
                            timestamps.forEach(t=>{
                                t= util.toHHmm(t *1000);
                                that.timestamps.push(t)

                            })
                            this.drawLine('chart1','空气温度','#fff', Object.values(d_Data.data.temp));
                            this.drawLine('chart2','空气湿度','#aa00ff',Object.values(d_Data.data.humi));
                            this.drawLine('chart3','光线照度','#ff2234',Object.values(d_Data.data.illu));

                        }
                    })
                    that.timer = setInterval(function (){
                        console.log('准备执行定时任务')
                        that.getCurrentData(gwid)
                    }, 1000*60*5);
                })
            },
            getCurrentData(gwid){
                let that = this
                this.$http.currentGatewayData({
                    gwid:gwid,
                    token:that.$store.getters.token
                }).then(ret=>{
                    ret.data.detectorDatas.forEach(d_Data=>{
                        if(d_Data.did == '1')
                        {//did为1的  获取环境数据

                            let timestamps = Object.keys(d_Data.data.temp);
                            timestamps.forEach(t=>{
                                t= util.toHHmm(t *1000);
                                that.timestamps.splice(0,1)
                                that.timestamps.push(t)
                            })
                            that['chart1'].data.splice(0,1)
                            that['chart1'].data.push(d_Data.data.temp)

                            that['chart2'].data.splice(0,1)
                            that['chart2'].data.push(d_Data.data.humi)

                            that['chart3'].data.splice(0,1)
                            that['chart3'].data.push(d_Data.data.illu)

                            that.updateLine1('chart1')
                            that.updateLine1('chart2')
                            that.updateLine1('chart3')
                        }
                    })
                    console.log(ret)
                })
            },

            drawLine(id,title,color,values){
                let that = this
                let myChart = this.$echarts.init(document.getElementById(id))
                that[id].chart = myChart
                that[id].data = values
                this.updateLine2(id,id,title,color)
            },
            updateLine1(id){
                let that = this
                that[id].chart.setOption({
                    xAxis: {
                        data: that.timestamps,
                    },
                    series: [{
                        data: that[id].data,
                    }]
                });

            },
            updateLine2(chart,id,title,color){
                let that = this
                that[id].chart.setOption({
                    title:{
                        text:title,
                        textStyle:{
                            color:'#fff',
                            fontStyle:'normal',
                            fontWeight:'bold',
                            fontFamily:'sans-serif',
                            fontSize:18
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: that.timestamps,
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        axisLabel: {
                            interval:10,
                            rotate:40
                        }

                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                    },
                    series: [{
                        data: that[id].data,
                        type: 'line',
                        areaStyle:{
                            color:color
                        },
                        lineStyle:{
                            color:color

                        }
                    }]
                });

            },

    }}
</script>

<style scoped lang="stylus">
</style>
