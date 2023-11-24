<template>
  <div>
    <h1 class="font-semibold border-b border-primary-500 pb-3 mb-3">
      {{ title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>();
</script>
