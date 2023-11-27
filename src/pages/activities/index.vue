<template>
  <div></div>
</template>

<script setup lang="ts">
const courseStore = useCourseStore();
const { titleToSlug } = useSlug();

await navigateTo(`/activities/${titleToSlug(courseStore.courses[0].name)}`);
</script>
