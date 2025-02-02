<template>
    <div class="chart-container">
      <Bar :data="chartData" :options="options" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  
  export default {
    name: 'BarChartComponent',
    components: {
      Bar
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
  