<template>
  <div>
    <v-card>
      <v-card-title>Services Calendar</v-card-title>
      <v-card-text>
        <v-calendar
          v-model="selectedDate"
          :events="events"
          @click:date="viewDay"
          @click:event="showEvent"
        >
          <template #event="{ event }">
            <div class="event-content">
              {{ event.name }}
            </div>
          </template>
        </v-calendar>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ServicesView',
  data: () => ({
    selectedDate: new Date().toISOString().substr(0, 10),
    events: [
      {
        name: '서비스 점검',
        start: new Date().toISOString().substr(0, 10),
        color: 'blue',
        timed: false
      }
    ]
  }),
  methods: {
    viewDay(date) {
      console.log('Selected date:', date)
    },
    showEvent({ nativeEvent, event }) {
      console.log('Clicked event:', event)
    }
  }
}
</script>

<style scoped>
.event-content {
  font-size: 12px;
  padding: 2px 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style> 