<template>
    <div ref="echartsContainer" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script>
  import { getEcharts} from "../api/api.js";
  import * as echarts from 'echarts'
  export default {
    name: "EchartsDemo",
    data() {
      return {
        chartData: [
        ],
      };
    },
    created() {
        this.getList()
    },
    mounted() {
      
    },
    methods: {
        getList() {
      getEcharts().then((res) => {
           this.chartData = res.data.data_list; 
           this.renderChart();
         
      });
    },
    renderChart() {
      const chart = echarts.init(this.$refs.echartsContainer);
      chart.setOption({
        xAxis: {
          type: "category",
          data: this.chartData.map((item) => item.name),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            data: this.chartData.map((item) => item.value),
          },
        ],
      });
    },
    },
  };
  </script>
  
  <style></style>
  