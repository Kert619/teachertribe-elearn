<template>
  <div>
    <Loading v-if="pending" />
    <ErrorMessage
      v-else-if="error"
      error-message="Sorry, something went wrong!"
    />
    <div v-else-if="course">
      <div v-for="phase in course.phases" :key="phase.id">
        <CoursesPhase :phase="phase" :courseName="courseName" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { slugToTitle } = useSlug();

const courseStore = useCourseStore();

const courseName = slugToTitle(route.params.course as string);

const {
  data: course,
  pending,
  error,
} = await courseStore.getCourse({
  course: courseName,
});

if (process.server && !course.value) {
  throw createError({ statusCode: 404, statusMessage: "Course not found" });
}
</script>
