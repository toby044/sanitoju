<script setup lang="ts">
const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

const formatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Europe/Copenhagen',
})

const formatted = computed(() => formatter.format(now.value))

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <span class="clock">
    <span class="blink" />
    {{ formatted }} CPH
  </span>
</template>
