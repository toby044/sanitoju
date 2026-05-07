<script setup lang="ts">
const formatted = ref('--:--:--')
let timer: ReturnType<typeof setInterval>

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Europe/Copenhagen',
})

onMounted(() => {
  const update = () => { formatted.value = formatter.format(new Date()) }
  update()
  timer = setInterval(update, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <span class="c-clock">
    <span class="c-clock__blink" aria-hidden="true" />
    {{ formatted }} CPH
  </span>
</template>

<style lang="postcss">
:where(.c-clock) {
  @apply inline-flex items-center gap-2;
}

:where(.c-clock__blink) {
  @apply rounded-full bg-accent shrink-0;
  width: 6px;
  height: 6px;
  animation: c-clock-blink 1.6s ease-in-out infinite;
}

@keyframes c-clock-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}
</style>
