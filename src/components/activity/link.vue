<template>
  <NuxtLink
    :to="`/activities/${titleToSlug(course.name)}`"
    class="btn btn-primary rounded-none flex-1 no-animation"
    active-class="bg-primary-400"
  >
    {{ course.name }}
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true,
  },
});
const { titleToSlug } = useSlug();
</script>
