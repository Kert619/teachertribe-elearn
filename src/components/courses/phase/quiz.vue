<template>
  <button
    class="btn btn-primary btn-outline btn-block no-animation rounded-none"
  >
    {{ index + 1 }}
  </button>
</template>

<script setup>
const props = defineProps({
  quiz: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>
