<template>
  <div class="h-full">
    <Loading v-if="pending" />
    <ErrorMessage
      v-else-if="error"
      error-message="Sorry, something went wrong!"
    />
    <template v-else>
      <div class="h-full flex flex-col">
        <div class="flex flex-wrap gap-3">
          <ActivityLink
            v-for="course in courses"
            :key="course.id"
            :course="course"
          />
        </div>

        <div class="mt-3 h-full overflow-auto">
          <NuxtPage />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: ["admin", "teacher", "student"],
});

const courseStore = useCourseStore();

const { data: courses, pending, error } = await courseStore.getCourses();

watch(courses, (newCourses) => {
  courseStore.courses = newCourses;
});
</script>
