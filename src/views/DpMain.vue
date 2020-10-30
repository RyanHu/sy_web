<template>
    <el-container
            :style="{backgroundImage:'url('+require('../assets/pageBg.png')+')',height:'100%' ,position: 'fixed',backgroundSize:'100%,100%',width:'100%'}">
        <el-header>

            <div class="title">
                <span class="title-text">国家农作物品种展示示范中心物联网平台</span>
            </div>
        </el-header>
        <el-container>

        </el-container>
        <el-container>
            <el-container id="left-area" class="chart-collection-area">
                <el-header height="1px"></el-header>
                <dv-border-box-12 class="chart-border-div">

                    <div id="chart1" class="chart-entity-div"></div>
                </dv-border-box-12>
                <dv-border-box-12 class="chart-border-div">
                    <div id="chart3" class="chart-entity-div"></div>
                </dv-border-box-12>

                <dv-border-box-12 class="chart-border-div">
                    <div id="chart2" class="chart-entity-div"></div>
                </dv-border-box-12>

            </el-container>
            <el-container id="center-area" class="center-area">


            </el-container>

            <el-container id="right-area"  class="chart-collection-area">
                <el-header height="1px"></el-header>

                <dv-border-box-12 class="chart-border-div">

                    <div id="chart4" class="chart-entity-div"></div>
                </dv-border-box-12>
                <dv-border-box-12 class="chart-border-div">
                    <div id="chart5" class="chart-entity-div"></div>
                </dv-border-box-12>

                <dv-border-box-12 class="chart-border-div">
                    <div id="chart6" class="chart-entity-div"></div>
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
                dateDay: null,
                dateYear: null,
                dateWeek: null,
                weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],

                updateTimer: '',
                rollTimer:'',
                bgImg: '../assets/bg.jpg',
                gwid: '',
                detectors: [],
                timestamps: [],
                chart1: {
                    title:'',
                    chart: '',
                    data: ''
                },
                chart2: {
                    title:'',
                    chart: '',
                    data: ''
                },
                chart3: {
                    title:'',
                    chart: '',
                    data: ''
                },

                chart4: {
                    title:'',
                    chart: '',
                    data: ''
                },
                chart5: {
                    title:'',
                    chart: '',
                    data: ''
                },
                chart6: {
                    title:'',
                    chart: '',
                    data: ''
                },
                tempDatas:[],
                humiDatas:[],
                ecDatas:[],
                index:0 //播放数据 之 探头数组的下标


            }

        },
        mounted() {
            this.timeFn();
            this.gwList();
        },
        methods: {
            timeFn () {
                setInterval(() => {
                    this.dateDay = util.formatTime(new Date(), 'HH: mm: ss');
                    this.dateYear = util.formatTime(new Date(), 'yyyy-MM-dd');
                    this.dateWeek = this.weekday[new Date().getDay()];
                }, 1000)
            },
            gwList() {
                let that = this
                this.$http.gwList({
                    token: that.$store.getters.token
                }).then(ret => {
                    console.log(ret)
                    if (ret.code == 200) {
                        if (ret.gwList.length > 0) {
                            //获取第一个GW ID,视为可用
                            that.gwid = ret.gwList[0].gwid
                            that.detectors = ret.gwList[0].detectorlist
                            //请求一天数据
                            let endTime = Date.parse(new Date());
                            let startTime = endTime - 24 * 60 * 60 * 1000;
                            console.log('起止时间:' + startTime + ',' + endTime)
                            that.getFmData(that.gwid, startTime / 1000, endTime / 1000)
                        }
                    }
                })
            },
            getFmData(gwid, startTime, endTime) {
                let that = this
                this.$http.fiveMinuteData({
                    gwid: gwid,
                    token: that.$store.getters.token,
                    startTime: startTime,
                    endTime: endTime
                }).then(ret => {
                    console.log(ret)
                    that['chart1'].title='空气温度';
                    that['chart2'].title='空气湿度';
                    that['chart3'].title='光线照度';
                    that['chart4'].title='土壤温度';
                    that['chart5'].title='土壤湿度';
                    that['chart6'].title='土壤EC';
                    ret.data.detectorDatas.forEach(d_Data => {
                        if (d_Data.did == '1') {//did为1的  获取环境数据  目前先这么判断，后续看有没有别的标志

                            let timestamps = Object.keys(d_Data.data.temp);
                            timestamps.forEach(t => {
                                t = util.toHHmm(t * 1000);
                                that.timestamps.push(t)
                            })
                            this.drawLine('chart1', '#fff', Object.values(d_Data.data.temp));
                            this.drawLine('chart2', '#aa00ff', Object.values(d_Data.data.humi));
                            this.drawLine('chart3', '#ff2234', Object.values(d_Data.data.illu));
                        }
                        else{
                            //其他的走探头属性，进行归类
                            this.drawLine('chart4', '#ee5555');
                            this.drawLine('chart5', '#3684aa');
                            this.drawLine('chart6', '#868387');
                            let d_keys = Object.keys(d_Data.data)
                            d_keys.forEach(key=>{
                                    let t_d = new Object;
                                    t_d.did = d_Data.did;
                                    t_d.index = key.substring(key.length-1,key.length);
                                    t_d.type = key.substring(0,key.length-1);
                                    t_d.values =d_Data.data[key]
                                //完成拆分
                                if(t_d.type == 'temp'){
                                    that.tempDatas.push(t_d)
                                }if(t_d.type == 'humi'){
                                    that.humiDatas.push(t_d)
                                }if(t_d.type == 'ec'){
                                    that.ecDatas.push(t_d)
                                }
                            })
                            let sortFun = function (dataA,dataB) {
                                if(dataA.did>dataB.did) return true
                                if(dataA.did<dataB.did) return false
                                if(dataA.did == dataB.did) {
                                    if (dataA.index>dataB.index )return true
                                    if (dataA.index<dataB.index )return false
                                }
                                return true
                            }
                            that.tempDatas.sort(sortFun)
                            that.humiDatas.sort(sortFun)
                            that.ecDatas.sort(sortFun)
                        }
                    })
                    that.rollChart()
                    console.log('准备开启timer1')

                    that.getCurrentData(gwid)
                    that.rollTimer =setInterval(function () {
                        that.rollChart()
                     }, 1000 * 3);
                })
            },

            rollChart()
            {
                let that = this
                that['chart4'].data = Object.values(that.tempDatas[that.index].values)
                that['chart4'].title = '土壤温度('+that.tempDatas[that.index].did+'号设备'+that.tempDatas[that.index].index+'号传感器)'

                that['chart5'].data = Object.values(that.humiDatas[that.index].values)
                that['chart5'].title = '土壤湿度('+that.humiDatas[that.index].did+'号设备'+that.humiDatas[that.index].index+'号传感器)'

                that['chart6'].data = Object.values(that.ecDatas[that.index].values)
                that['chart6'].title = '土壤EC('+that.ecDatas[that.index].did+'号设备'+that.ecDatas[that.index].index+'号传感器)'

                that.index++;
                if(that.index >= that.tempDatas.length)
                {
                    that.index = 0;
                }
                that.updateLine1('chart4')
                that.updateLine1('chart5')
                that.updateLine1('chart6')


            },
            getCurrentData(gwid) {
                let that = this
                setTimeout(function () {
                    that.$http.currentGatewayData({
                        gwid: gwid,
                        token: that.$store.getters.token
                    }).then(ret => {
                        ret.data.detectorDatas.forEach(d_Data => {
                            if (d_Data.did == '1') {//did为1的  获取环境数据

                                let timestamps = Object.keys(d_Data.data.temp);
                                timestamps.forEach(t => {
                                    t = util.toHHmm(t * 1000);
                                    that.timestamps.splice(0, 1)
                                    that.timestamps.push(t)
                                })
                                that['chart1'].data.splice(0, 1)
                                that['chart1'].data.push(d_Data.data.temp)

                                that['chart2'].data.splice(0, 1)
                                that['chart2'].data.push(d_Data.data.humi)

                                that['chart3'].data.splice(0, 1)
                                that['chart3'].data.push(d_Data.data.illu)

                                that.updateLine1('chart1')
                                that.updateLine1('chart2')
                                that.updateLine1('chart3')
                            }
                            else {
                                let d_keys = Object.keys(d_Data.data)
                                d_keys.forEach(key=>{
                                    let t_d = new Object;
                                    t_d.did = d_Data.did;
                                    t_d.index = key.substring(key.length-1,key.length);
                                    t_d.type = key.substring(0,key.length-1);
                                    t_d.values =d_Data.data[key]
                                    //找对象
                                    let targetCollect ;
                                    let target ;
                                    if(t_d.type == 'temp'){
                                        targetCollect = that.tempDatas;

                                    }if(t_d.type == 'humi'){
                                        targetCollect = that.humiDatas;

                                    }if(t_d.type == 'ec'){
                                        targetCollect = that.ecDatas;
                                    }
                                    targetCollect.forEach(f=>{
                                        if(f.did == d_Data.did && f.index == t_d.index)
                                        {
                                            target == f;
                                        }
                                    })
                                    target.values.splice(0, 1)
                                    target.values.push(t_d.values)
                                })

                            }
                        })
                        console.log(ret)
                    })
                    that.getCurrentData(gwid)
                },5*60*1000)
            },

            drawLine(id, color, values) {
                let that = this
                let myChart = this.$echarts.init(document.getElementById(id))
                that[id].chart = myChart
                that[id].data = values
                this.updateLine2( id, color)
            },
            updateLine1(id) {
                //仅仅根据线图自身属性进行设置，需要在更新之前就对data内的数据操作完毕
                let that = this
                that[id].chart.setOption({
                    title:{
                      text: that[id].title
                    },
                    xAxis: {
                        data: that.timestamps,
                    },
                    series: [{
                        data: that[id].data,
                    }]
                    ,
                    animation:false
                });

            },
            updateLine2(id, color) {
                let that = this
                that[id].chart.setOption({
                    title: {
                        text: that[id].title,
                        textStyle: {
                            color: '#fff',
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fontFamily: 'sans-serif',
                            fontSize: 18
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
                            interval: 10,
                            rotate: 40
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
                        areaStyle: {
                            color: color
                        },
                        lineStyle: {
                            color: color

                        }
                    }]
                });

            },


    }
    }
</script>

<style scoped lang="stylus">
    .title {
        position: relative;
        text-align: center;
        background-size: cover;
        background-repeat: no-repeat;
        .title-text {
            font-size: 3rem;
            width: 20px;
            color :#bbb;
            // position: absolute;
            // bottom: 0.01rem;
            // left: 0;
            // transform: translate(-50%);
        }

        .title-bototm {
            position: absolute;
            bottom: -0.175px;
            // left: 50%;
            // transform: translate(-50%);
        }
    }
    .center-area{
        flex-grow 100
    }
    .chart-collection-area{
        flex-grow 1
        margin 0px 10px;
    }
    .title {
        font-size: 20px;
        color: #333333
    }

    .chart-border-div {
        width: 450px;
        padding: 10px 0px 0px 10px;
        height: 180px;
    }

    .chart-entity-div {
        width: 100%;
        height: 200px;

    }



    // 底部数据
    .center-box {
        margin-top: 0.125rem;
        display: grid;
        grid-template-row: 2fr 6fr 2fr;
        width: 40%;
        height:100%;
    }

</style>
