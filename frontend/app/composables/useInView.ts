import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useInView(threshold = 0.18) {
  const el = ref<HTMLElement | null>(null)
  const inView = ref(false)

  const { stop } = useIntersectionObserver(
    el,
    ([entry]) => {
      if (entry?.isIntersecting) {
        inView.value = true
        stop()
      }
    },
    { threshold, rootMargin: '0px 0px -10% 0px' }
  )

  return { el, inView }
}
