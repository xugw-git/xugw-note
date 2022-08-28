# 图表库 uCharts

> 文档：<https://www.ucharts.cn/v2/#/>

## 使用

``` vue
<template>
  <view class="charts-box">
    <qiun-data-charts type="column" :opts="baropts" :chartData="BarchartData" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      BarchartData: {}, //柱状图表数据
      baropts: {  // 柱状图表配置项
        color: ["#ff9900"],
        padding: [15, 15, 0, 5],
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [
            { min: 0 }
          ]
        },
        extra: {
          column: {
          type: "group",
          width: 30,
          activeBgColor: "#000000",
          activeBgOpacity: 0.08
          }
        }
      },
    }
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
            categories: ["2016","2017","2018","2019","2020","2021"],
            series: [
              {
                name: "目标值",
                data: [35,36,31,33,13,34]
              },
              {
                name: "完成量",
                data: [18,27,21,24,6,28]
              }
            ]
          };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    getServerData() {
      getData().then(res => {
        if (res.data && res.data.success) {
          this.BarchartData.categories = res.data.response.BarChartData.map(i => i.Name)
          this.BarchartData.series = [
            { 
              name: "参会时长", 
              data: res.data.response.BarChartData.map(i => i.TotalValue) 
            }
          ]
          this.BarchartData = JSON.parse(JSON.stringify(this.BarchartData))
        }
      })
    },
  }
}
</script>

<style scoped>
  .charts-box {
    width: 100%;
    height: 300px;
  }
</style>
```
