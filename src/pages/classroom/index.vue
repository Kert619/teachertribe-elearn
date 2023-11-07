<template>
  <div>
    <PageHeader>
      <NuxtLink to="/classroom/create" class="btn btn-primary btn-sm"
        >Create New</NuxtLink
      >
    </PageHeader>
    <Loading v-if="pendingClassrooms || pendingCourses" />
    <ErrorMessage
      v-else-if="errorClassrooms"
      :error-message="errorClassrooms.statusMessage"
    />
    <ErrorMessage
      v-else-if="errorCourses"
      :error-message="errorCourses.statusMessage"
    />
    <div
      v-else-if="classroomStore.classrooms.length > 0"
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

<script setup>
import Swal from "sweetalert2";
const classroomStore = useClassroomStore();
const courseStore = useCourseStore();

const { titleToSlug } = useSlug();

const assignCoursesPayload = ref({});

const {
  data: classrooms,
  pending: pendingClassrooms,
  error: errorClassrooms,
} = await classroomStore.getClassrooms();

const {
  data: courses,
  pending: pendingCourses,
  error: errorCourses,
} = await courseStore.getCourses();

watch([classrooms, courses], ([newClassrooms, newCourses]) => {
  if (newClassrooms) classroomStore.classrooms = newClassrooms;
  if (newCourses) courseStore.courses = newCourses;
});

async function assignCourses(classroomId, coursesIds) {
  const classroom = classroomStore.classrooms.find((x) => x.id === classroomId);
  classroom.loading = true;

  const { status, error } = await classroomStore.assignCourses({
    classroomId,
    coursesIds,
  });

  classroom.loading = false;

  if (error.value) {
    console.error(error);
    await Swal.fire("Error!", "Sorry something went wrong.", "error");
  }

  if (status.value === "success") {
    await Swal.fire(
      "Success!",
      "New course has been added to the class.",
      "success"
    );
  }
}

async function assignStudents(classroom) {
  navigateTo(`/classroom/${titleToSlug(classroom.name)}/assign-students`);
}
</script>
