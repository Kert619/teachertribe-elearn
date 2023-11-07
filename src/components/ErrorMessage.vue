<template>
  <div class="text-lg">
    <span class="text-red-500 font-semibold">An error occured:</span>
    {{ errorMessage }}
  </div>
</template>

<script setup>
const props = defineProps({
  errorMessage: {
    required: true,
  },
});
</script>
