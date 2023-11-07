<template>
  <div>
    <h1 class="font-semibold border-b border-primary-500 pb-3 mb-3">
      {{ title }}
    </h1>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
