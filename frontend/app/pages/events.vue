<script setup>
const { data: musicEvents } = await useEventsWithType('Music');
</script>

<template>
    <div>
        {{ musicEvents }}
    </div>
</template>