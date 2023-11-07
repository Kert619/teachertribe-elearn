<template>
  <div></div>
</template>

<script setup>
const courseStore = useCourseStore();
const { titleToSlug } = useSlug();
navigateTo(`/activities/${titleToSlug(courseStore.courses[0].name)}`);
</script>
