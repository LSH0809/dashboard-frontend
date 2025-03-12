<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="#1a237e"
      dark
      width="280"
    >
      <v-list class="pa-4">
        <div class="text-h6 font-weight-bold mb-4 white--text">
          DASHBOARD
        </div>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="lg"
          class="mb-2"
          :active-class="'active-menu-item'"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
      app 
      elevation="0"
      height="70"
      color="white"
      border
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" color="#1a237e"></v-app-bar-nav-icon>
      
      <!-- 검색창 개선 -->
      <v-text-field
        class="mt-5 mx-4 search-field"
        density="comfortable"
        variant="solo"
        label="Search Dashboard"
        prepend-inner-icon="mdi-magnify"
        append-inner-icon="mdi-tune-vertical"
        single-line
        hide-details
        color="#1a237e"
        bg-color="grey-lighten-4"
        @click:append-inner="showFilters"
      ></v-text-field>

      <v-spacer></v-spacer>
      
      <v-btn icon class="mr-2" color="#1a237e">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn icon class="mr-2" color="#1a237e">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
      <v-avatar 
        color="#1a237e" 
        size="40"
        class="mr-4"
      >
        <v-icon color="white">mdi-account</v-icon>
      </v-avatar>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-8 main-container">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      drawer: true,
      menuItems: [
        { title: 'Home', path: '/', icon: 'mdi-view-dashboard-outline' },
        { title: 'Products', path: '/products', icon: 'mdi-package-variant-closed' },
        { title: 'Services', path: '/services', icon: 'mdi-cog-outline' },
        { title: 'Settings', path: '/settings', icon: 'mdi-cog' }
      ]
    }
  }
}
</script>

<style scoped>
.search-field {
  max-width: none !important;
  width: 100%;
  margin-right: 100px;
}

.search-field :deep(.v-field__input) {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  min-height: 44px;
}

.search-field :deep(.v-field__prepend-inner) {
  padding-inline-start: 16px;
}

.active-menu-item {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.v-list-item {
  transition: all 0.2s;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-container {
  padding-top: 80px !important;  /* Header 높이(70px)보다 약간 더 여유있게 설정 */
}
</style>