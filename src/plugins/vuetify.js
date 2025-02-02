import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as labs from 'vuetify/labs/components'  // Labs 컴포넌트 추가

export default createVuetify({
  components: {
    ...labs,  // Labs 컴포넌트 등록
  },
  defaults: {
    VCalendar: {
      // 달력 기본 설정
      weekdays: [0, 1, 2, 3, 4, 5, 6],
    },
  },
}) 