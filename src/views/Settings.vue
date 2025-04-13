<template>
  <div class="settings-container">
    <!-- 상단 통계 카드 -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg h-100" elevation="0">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon color="indigo-darken-4" size="40" class="mr-4">mdi-account-group</v-icon>
              <div>
                <div class="text-subtitle-1 text-grey">총 사용자</div>
                <div class="text-h4 font-weight-bold text-indigo-darken-4">1,234</div>
              </div>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex align-center">
              <v-icon color="success" size="20" class="mr-2">mdi-trending-up</v-icon>
              <span class="text-success">+12%</span>
              <span class="text-grey ml-2">이번 달</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg h-100" elevation="0">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon color="indigo-darken-4" size="40" class="mr-4">mdi-clock-check</v-icon>
              <div>
                <div class="text-subtitle-1 text-grey">활성 세션</div>
                <div class="text-h4 font-weight-bold text-indigo-darken-4">42</div>
              </div>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex align-center">
              <v-icon color="success" size="20" class="mr-2">mdi-trending-up</v-icon>
              <span class="text-success">+5%</span>
              <span class="text-grey ml-2">어제 대비</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg h-100" elevation="0">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon color="indigo-darken-4" size="40" class="mr-4">mdi-shield-check</v-icon>
              <div>
                <div class="text-subtitle-1 text-grey">보안 점수</div>
                <div class="text-h4 font-weight-bold text-indigo-darken-4">85%</div>
              </div>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex align-center">
              <v-icon color="success" size="20" class="mr-2">mdi-trending-up</v-icon>
              <span class="text-success">+3%</span>
              <span class="text-grey ml-2">이번 주</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="rounded-lg h-100" elevation="0">
          <v-card-text class="pa-6">
            <div class="d-flex align-center mb-4">
              <v-icon color="indigo-darken-4" size="40" class="mr-4">mdi-alert-circle</v-icon>
              <div>
                <div class="text-subtitle-1 text-grey">경고</div>
                <div class="text-h4 font-weight-bold text-indigo-darken-4">3</div>
              </div>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="d-flex align-center">
              <v-icon color="error" size="20" class="mr-2">mdi-trending-down</v-icon>
              <span class="text-error">-2</span>
              <span class="text-grey ml-2">이번 주</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 최근 로그인 기록 -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="rounded-lg" elevation="0">
          <v-card-title class="d-flex align-center py-4 px-6">
            <span class="text-h6 font-weight-bold text-indigo-darken-4">최근 로그인 기록</span>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo-darken-4"
              variant="text"
              prepend-icon="mdi-refresh"
              @click="refreshLoginHistory"
            >
              새로고침
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-0">
            <v-data-table
              :headers="headers"
              :items="loginHistory"
              :items-per-page="5"
              class="elevation-0"
            >
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="item.status === '성공' ? 'success' : 'error'"
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>
              <template v-slot:item.timestamp="{ item }">
                {{ formatDate(item.timestamp) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 시스템 상태 및 보안 알림 -->
    <v-row>
      <!-- 시스템 상태 -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg h-100" elevation="0">
          <v-card-title class="d-flex align-center py-4 px-6">
            <span class="text-h6 font-weight-bold text-indigo-darken-4">시스템 상태</span>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" color="indigo-darken-4">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <v-list>
              <v-list-item
                v-for="(item, i) in systemStatus"
                :key="i"
                :title="item.name"
                :subtitle="item.status"
                class="px-0"
              >
                <template v-slot:prepend>
                  <v-icon :color="item.color" class="mr-4">{{ item.icon }}</v-icon>
                </template>
                <template v-slot:append>
                  <v-progress-linear
                    :model-value="item.usage"
                    :color="item.color"
                    height="8"
                    width="100"
                    class="rounded-lg"
                  ></v-progress-linear>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 보안 알림 -->
      <v-col cols="12" md="6">
        <v-card class="rounded-lg h-100" elevation="0">
          <v-card-title class="d-flex align-center py-4 px-6">
            <span class="text-h6 font-weight-bold text-indigo-darken-4">보안 알림</span>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" color="indigo-darken-4">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <v-timeline density="compact" align="start" class="timeline-container">
              <v-timeline-item
                v-for="(alert, i) in securityAlerts"
                :key="i"
                :dot-color="alert.color"
                size="small"
                class="mb-4"
              >
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <div class="text-subtitle-2 font-weight-bold">{{ alert.title }}</div>
                    <div class="text-caption text-grey">{{ alert.description }}</div>
                  </div>
                  <div class="text-caption text-grey">{{ formatDate(alert.timestamp) }}</div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      headers: [
        { title: '사용자', key: 'username' },
        { title: 'IP 주소', key: 'ip' },
        { title: '위치', key: 'location' },
        { title: '상태', key: 'status' },
        { title: '시간', key: 'timestamp' }
      ],
      loginHistory: [
        {
          username: 'admin',
          ip: '192.168.1.1',
          location: '서울, 대한민국',
          status: '성공',
          timestamp: new Date()
        },
        {
          username: 'user1',
          ip: '192.168.1.2',
          location: '부산, 대한민국',
          status: '성공',
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          username: 'user2',
          ip: '192.168.1.3',
          location: '대구, 대한민국',
          status: '실패',
          timestamp: new Date(Date.now() - 7200000)
        }
      ],
      systemStatus: [
        {
          name: 'CPU 사용량',
          status: '정상',
          usage: 45,
          color: 'success',
          icon: 'mdi-cpu-64-bit'
        },
        {
          name: '메모리 사용량',
          status: '주의',
          usage: 75,
          color: 'warning',
          icon: 'mdi-memory'
        },
        {
          name: '디스크 사용량',
          status: '정상',
          usage: 60,
          color: 'success',
          icon: 'mdi-harddisk'
        },
        {
          name: '네트워크 트래픽',
          status: '정상',
          usage: 30,
          color: 'success',
          icon: 'mdi-network'
        }
      ],
      securityAlerts: [
        {
          title: '비정상 로그인 시도',
          description: 'IP: 192.168.1.100에서 다수의 로그인 시도가 감지되었습니다.',
          color: 'error',
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          title: '시스템 업데이트 완료',
          description: '보안 패치가 성공적으로 적용되었습니다.',
          color: 'success',
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          title: '백업 완료',
          description: '일일 시스템 백업이 완료되었습니다.',
          color: 'info',
          timestamp: new Date(Date.now() - 86400000)
        }
      ]
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    refreshLoginHistory() {
      // 실제 구현에서는 API 호출 등을 통해 데이터를 새로고침
      console.log('로그인 기록 새로고침')
    }
  }
}
</script>

<style scoped>
.settings-container {
  padding: 0;
}

.v-card {
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

.v-row {
  margin: 0;
}

.v-col {
  padding: 12px;
}

.h-100 {
  height: 100%;
}

.timeline-container {
  padding-left: 0;
}

.v-list-item {
  padding: 12px 0;
}

.v-data-table {
  width: 100%;
}

.v-data-table :deep(.v-data-table__wrapper) {
  overflow-x: auto;
}

.v-data-table :deep(.v-data-table__header) {
  background-color: #f5f5f5;
}

.v-data-table :deep(.v-data-table__header th) {
  font-weight: 600;
  color: #1a237e;
}

.v-data-table :deep(.v-data-table__tr) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.v-data-table :deep(.v-data-table__tr:hover) {
  background-color: rgba(26, 35, 126, 0.05);
}
</style> 