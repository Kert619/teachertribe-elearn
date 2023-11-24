<template>
  <div></div>
</template>

<script setup lang="ts">
const courseStore = useCourseStore();
const { titleToSlug } = useSlug();

navigateTo(`/activities/${titleToSlug(courseStore.courses[0].name)}`);
</script>
