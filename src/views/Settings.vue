<template>
    <div>
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title class="text-h5 font-weight-bold pa-4">
              관리자 설정
            </v-card-title>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="text-h6 font-weight-bold pa-4">
              사용자 관리
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  prepend-icon="mdi-account-multiple"
                  title="사용자 목록"
                  subtitle="전체 사용자 조회 및 관리"
                />
                <v-list-item
                  prepend-icon="mdi-account-plus"
                  title="사용자 추가"
                  subtitle="새로운 사용자 등록"
                />
                <v-list-item
                  prepend-icon="mdi-account-group"
                  title="권한 관리"
                  subtitle="사용자 권한 설정"
                />
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
  
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="text-h6 font-weight-bold pa-4">
              시스템 설정
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item
                  prepend-icon="mdi-cog"
                  title="일반 설정"
                  subtitle="기본 시스템 설정"
                />
                <v-list-item
                  prepend-icon="mdi-backup-restore"
                  title="백업 관리"
                  subtitle="시스템 백업 및 복원"
                />
                <v-list-item
                  prepend-icon="mdi-chart-line"
                  title="로그 관리"
                  subtitle="시스템 로그 조회"
                />
              </v-list>
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
      return {}
    }
  }
  </script> 