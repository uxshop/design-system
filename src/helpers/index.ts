import { computed } from 'vue'
import { MOBILE_WIDTH } from '../constants/index'

export const isMobile = computed(() => window.innerWidth <= MOBILE_WIDTH)
