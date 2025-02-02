<template>
    <div class="chart-container">
      <Doughnut :data="chartData" :options="options" />
    </div>
  </template>
  
  <script>
  import { Doughnut } from 'vue-chartjs'
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    name: 'DoughnutChartComponent',
    components: {
      Doughnut
    },
    props: {
      chartData: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        default: () => ({
          responsive: true,
          maintainAspectRatio: false
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    height: 100%;
    width: 100%;
  }
  </style>
  