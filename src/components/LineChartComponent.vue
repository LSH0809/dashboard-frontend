<template>
    <div class="chart-container">
      <Line :data="chartData" :options="options" />
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  
  export default {
    name: 'LineChartComponent',
    components: {
      Line
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
  