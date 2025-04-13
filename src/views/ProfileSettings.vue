<template>
    <div>
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center mb-6">
            <v-btn
              icon
              variant="text"
              class="mr-4"
              @click="$router.back()"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <h1 class="text-h4 font-weight-bold">프로필 설정</h1>
          </div>
        </v-col>
      </v-row>
  
      <v-row class="mb-6">
        <!-- 프로필 정보 -->
        <v-col cols="12" md="4" class="pr-md-4">
          <v-card class="mb-4 h-100" elevation="2">
            <v-card-text class="text-center pa-8 d-flex flex-column align-center justify-center" style="min-height: 400px;">
              <v-avatar
                size="150"
                class="mb-8"
                :image="profileImage || 'https://cdn.vuetifyjs.com/images/john.jpg'"
              >
                <v-icon size="100" color="grey">mdi-account</v-icon>
              </v-avatar>
              <h2 class="text-h5 font-weight-bold mb-4">{{ user.name }}</h2>
              <p class="text-subtitle-1 text-grey">{{ user.email }}</p>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- 비밀번호 변경 -->
        <v-col cols="12" md="8" class="pl-md-4">
          <v-card class="mb-4 h-100" elevation="2">
            <v-card-title class="text-h6 font-weight-bold pa-8">
              <v-icon color="indigo-darken-4" class="mr-2">mdi-lock</v-icon>
              비밀번호 변경
            </v-card-title>
            <v-card-text class="pa-8">
              <v-form @submit.prevent="updatePassword" class="d-flex flex-column justify-center" style="min-height: 300px;">
                <v-text-field
                  v-model="passwordForm.currentPassword"
                  label="현재 비밀번호"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                  class="mb-6"
                  :rules="[v => !!v || '현재 비밀번호를 입력해주세요']"
                ></v-text-field>
                <v-text-field
                  v-model="passwordForm.newPassword"
                  label="새 비밀번호"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                  class="mb-6"
                  :rules="[
                    v => !!v || '새 비밀번호를 입력해주세요',
                    v => v.length >= 8 || '비밀번호는 8자 이상이어야 합니다'
                  ]"
                ></v-text-field>
                <v-text-field
                  v-model="passwordForm.confirmPassword"
                  label="새 비밀번호 확인"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                  class="mb-8"
                  :rules="[
                    v => !!v || '비밀번호 확인을 입력해주세요',
                    v => v === passwordForm.newPassword || '비밀번호가 일치하지 않습니다'
                  ]"
                ></v-text-field>
                <v-btn
                  color="indigo-darken-4"
                  size="large"
                  block
                  type="submit"
                  :loading="loading"
                >
                  비밀번호 변경
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- 알림 설정 -->
      <v-row class="mb-6">
        <v-col cols="12">
          <v-card elevation="2">
            <v-card-title class="text-h6 font-weight-bold pa-8">
              <v-icon color="indigo-darken-4" class="mr-2">mdi-bell</v-icon>
              알림 설정
            </v-card-title>
            <v-card-text class="pa-8">
              <v-list>
                <v-list-item class="mb-4">
                  <template v-slot:prepend>
                    <v-icon color="indigo-darken-4">mdi-email</v-icon>
                  </template>
                  <v-list-item-title>이메일 알림</v-list-item-title>
                  <template v-slot:append>
                    <v-switch
                      v-model="notifications.email"
                      color="indigo-darken-4"
                      hide-details
                    ></v-switch>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <v-icon color="indigo-darken-4">mdi-bell-ring</v-icon>
                  </template>
                  <v-list-item-title>푸시 알림</v-list-item-title>
                  <template v-slot:append>
                    <v-switch
                      v-model="notifications.push"
                      color="indigo-darken-4"
                      hide-details
                    ></v-switch>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- 계정 삭제 -->
      <v-row>
        <v-col cols="12">
          <v-card elevation="2">
            <v-card-text class="pa-8">
              <div class="d-flex align-center justify-space-between">
                <div>
                  <h3 class="text-h6 font-weight-bold text-error">계정 삭제</h3>
                  <p class="text-body-2 text-grey mt-2">계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다.</p>
                </div>
                <v-btn
                  color="error"
                  variant="outlined"
                  @click="showDeleteDialog = true"
                >
                  계정 삭제
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- 삭제 확인 다이얼로그 -->
      <v-dialog v-model="showDeleteDialog" max-width="500">
        <v-card>
          <v-card-title class="text-h5 font-weight-bold pa-6">
            계정 삭제 확인
          </v-card-title>
          <v-card-text class="pa-6">
            <p class="text-body-1">정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
            <v-text-field
              v-model="deleteConfirmation"
              label="'DELETE'를 입력하세요"
              variant="outlined"
              density="comfortable"
              class="mt-4"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="pa-6">
            <v-spacer></v-spacer>
            <v-btn
              variant="text"
              @click="showDeleteDialog = false"
            >
              취소
            </v-btn>
            <v-btn
              color="error"
              :disabled="deleteConfirmation !== 'DELETE'"
              @click="deleteAccount"
            >
              삭제
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProfileSettings',
    data() {
      return {
        user: {
          name: 'test',
          email: 'test@example.com'
        },
        profileImage: null,
        passwordForm: {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        notifications: {
          email: true,
          push: false
        },
        loading: false,
        showDeleteDialog: false,
        deleteConfirmation: ''
      }
    },
    methods: {
      async updatePassword() {
        this.loading = true
        try {
          // API 호출 로직
          await new Promise(resolve => setTimeout(resolve, 1000))
          this.$toast.success('비밀번호가 성공적으로 변경되었습니다.')
          this.passwordForm = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }
        } catch (error) {
          this.$toast.error('비밀번호 변경 중 오류가 발생했습니다.')
        } finally {
          this.loading = false
        }
      },
      async deleteAccount() {
        try {
          // API 호출 로직
          await new Promise(resolve => setTimeout(resolve, 1000))
          this.$toast.success('계정이 삭제되었습니다.')
          this.$router.push('/login')
        } catch (error) {
          this.$toast.error('계정 삭제 중 오류가 발생했습니다.')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 12px;
  }
  
  .v-list-item {
    border-radius: 8px;
  }
  
  .v-btn {
    text-transform: none;
    letter-spacing: 0;
  }
  </style> 