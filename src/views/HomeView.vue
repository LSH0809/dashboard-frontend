<template>
  <div class="home">
    <v-row class="mb-6">
      <!-- Top Left: Calendar -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0">
          <v-card-title class="d-flex align-center py-4 px-6">
            <span class="text-h6 font-weight-bold text-indigo-darken-4">Calendar</span>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" color="indigo-darken-4">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6" style="height: 400px;">
            <v-calendar
              :now="today"
              :value="today"
              color="indigo-darken-4"
            >
              <template v-slot:day="{ date }">
                <template v-for="event in eventsMap[date]" :key="event.title">
                  <div
                    class="text-center rounded-pill"
                    :class="event.color"
                  >
                    {{ event.title }}
                  </div>
                </template>
              </template>
            </v-calendar>
          </v-card-text>
        </v-card>
      </v-col>
      
      <!-- Top Right: Doughnut Chart -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0">
          <v-card-title class="d-flex align-center py-4 px-6">
            <span class="text-h6 font-weight-bold text-indigo-darken-4">Product Distribution</span>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" color="indigo-darken-4">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6" style="height: 400px;">
            <DoughnutChartComponent :chartData="doughnutData" :options="chartOptions" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Bottom Left: Line Chart -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0">
          <v-card-title class="d-flex align-center py-4 px-6">
            <span class="text-h6 font-weight-bold text-indigo-darken-4">Monthly Performance</span>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" color="indigo-darken-4">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6" style="height: 400px;">
            <LineChartComponent :chartData="lineData" :options="chartOptions" />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Bottom Right: Bar Chart -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg" elevation="0">
          <v-card-title class="d-flex align-center py-4 px-6">
            <span class="text-h6 font-weight-bold text-indigo-darken-4">Team Performance</span>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" color="indigo-darken-4">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6" style="height: 400px;">
            <BarChartComponent :chartData="barData" :options="chartOptions" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DoughnutChartComponent from '@/components/DoughnutChartComponent.vue'
import LineChartComponent from '@/components/LineChartComponent.vue'
import BarChartComponent from '@/components/BarChartComponent.vue'

export default {
  name: 'HomeView',
  components: {
    DoughnutChartComponent,
    LineChartComponent,
    BarChartComponent
  },
  data: () => ({
    today: new Date().toISOString().split('T')[0],
    eventsMap: {},
    doughnutData: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D'],
      datasets: [{
        data: [30, 25, 25, 20],
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16']
      }]
    },
    lineData: {
      labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
      datasets: [{
        label: 'Sales',
        data: [40, 39, 45, 50, 48, 55],
        borderColor: '#41B883',
        tension: 0.1
      }]
    },
    barData: {
      labels: ['A 팀', 'B 팀', 'C 팀', 'D 팀'],
      datasets: [{
        label: 'Sales',
        data: [85, 72, 78, 65],
        backgroundColor: '#41B883'
      }]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            padding: 20,
            font: {
              size: 12,
              family: "'Roboto', sans-serif"
            }
          }
        }
      },
      elements: {
        line: {
          borderWidth: 3,
          tension: 0.4
        },
        point: {
          radius: 6,
          borderWidth: 3
        }
      },
      layout: {
        padding: {
          top: 30,  // 상단 여백 증가
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    }
  }),
  created() {
    // 샘플 이벤트 데이터
    const events = [
      {
        title: 'test1',
        date: new Date().toISOString().split('T')[0],
        color: 'bg-primary'
      },
      {
        title: 'test2',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        color: 'bg-error'
      }
    ]

    // 이벤트 맵 생성
    this.eventsMap = events.reduce((map, event) => {
      if (!map[event.date]) {
        map[event.date] = []
      }
      map[event.date].push(event)
      return map
    }, {})
  },
  methods: {
    showFilters() {
      // Implement filter functionality
      console.log('Show filters')
    }
  }
}
</script>

<style scoped>
.v-card {
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

.bg-primary {
  background-color: #1a237e;
  color: white;
  margin: 1px;
  padding: 0 4px;
}

.bg-error {
  background-color: #d32f2f;
  color: white;
  margin: 1px;
  padding: 0 4px;
}

.v-row {
  margin: 0 -12px;
}

.v-col {
  padding: 12px;
}

.v-card-text {
  position: relative;
  overflow: visible !important;
}
</style> 