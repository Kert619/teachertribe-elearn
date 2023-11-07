<template>
  <div
    class="h-screen w-screen flex flex-col gap-5 justify-center items-center"
  >
    <h1 class="text-9xl">{{ error?.statusCode }}</h1>
    <p>{{ error?.statusMessage }}</p>
    <button class="btn btn-primary btn-sm rounded-none" @click="handleError">
      Go Back
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
  },
});

const handleError = () => clearError({ redirect: "/" });
</script>
