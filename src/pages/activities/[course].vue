<template>
  <div>
    <Loading v-if="pending" />
    <ErrorMessage v-else-if="error" :error-message="error.statusMessage" />
    <div v-else>
      <div v-for="phase in course.phases" :key="phase.id">
        <CoursesPhase :phase="phase" @level-select="levelSelect" />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const { slugToTitle, titleToSlug } = useSlug();

const courseStore = useCourseStore();

const {
  data: course,
  pending,
  error,
} =  await courseStore.getCourse({
      course: slugToTitle(route.params.course),
    });

if (process.server && !course.value) {
  throw createError({ statusCode: 404, statusMessage: "Course not found" });
}

async function levelSelect(phase, level) {
  await navigateTo(
    `/activity/${route.params.course}/${titleToSlug(phase.name)}/${titleToSlug(
      level.name
    )}`
  );
}
</script>
