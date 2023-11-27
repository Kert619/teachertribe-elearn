<template>
  <div>
    <PageHeader>
      <NuxtLink to="/classroom/create" class="btn btn-primary btn-sm"
        >Create New</NuxtLink
      >
    </PageHeader>
    <Loading v-if="classroomPending || coursePending || loading" />
    <ErrorMessage
      v-else-if="errorClassrooms || errorCourses"
      error-message="Sorry, something went wrong!"
    />
    <div
      v-else-if="classroomStore.classrooms"
      class="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
    >
      <ClassroomCard
        v-for="classroom in classroomStore.classrooms"
        :key="classroom.id"
        :classroom="classroom"
        :courses="courseStore.courses"
        @assign-courses="assignCourses"
        @assign-students="assignStudents"
      />
    </div>

    <div v-else>
      <h1 class="font-bold text-xl">No classroom found...</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import type { AssignCourses } from "@/types/classroom";

const classroomStore = useClassroomStore();
const courseStore = useCourseStore();

const loading = ref(false);

const { titleToSlug } = useSlug();

const {
  data: classrooms,
  pending: classroomPending,
  error: errorClassrooms,
} = await classroomStore.getClassrooms();

const {
  data: courses,
  pending: coursePending,
  error: errorCourses,
} = await courseStore.getCourses();

watch([classrooms, courses], ([newClassroom, newCourses]) => {
  if (newClassroom) classroomStore.classrooms = newClassroom;
  if (newCourses) courseStore.courses = newCourses;
});

async function assignCourses(assignCourses: AssignCourses) {
  loading.value = true;
  const { status, error } = await classroomStore.assignCourses(assignCourses);

  if (error.value) {
    loading.value = false;
    await Swal.fire("Error!", "Sorry something went wrong.", "error");
  }

  if (status.value === "success") {
    loading.value = false;
    await Swal.fire(
      "Success!",
      "New course has been added to the class.",
      "success"
    );
  }
}

async function assignStudents(classroomName: string) {
  await navigateTo(`/classroom/${titleToSlug(classroomName)}/assign-students`);
}
</script>
