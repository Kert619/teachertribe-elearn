<template>
  <div>
    <h1 class="border-b pb-3 mb-3 font-semibold">
      {{ activity }}
    </h1>
    <div class="whitespace-pre-wrap">{{ description }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  activity: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
