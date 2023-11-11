<template>
  <NuxtPage />
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: ["admin", "teacher"],
});
</script>
