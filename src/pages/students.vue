<template>
  <div>
    <Loading v-if="pending" />
    <ErrorMessage
      v-else-if="error"
      error-message="Sorry, something went wrong!"
    />
    <PageHeader v-else>
      <div class="flex flex-wrap gap-3">
        <select
          class="select select-bordered select-sm w-full max-w-xs truncate"
          v-model="classroomId"
        >
          <option disabled selected value="">Select Classroom</option>
          <option
            :value="classroom.id"
            v-for="classroom in classroomStore.classrooms"
          >
            {{ classroom.name }}
          </option>
        </select>
        <select
          class="select select-bordered select-sm w-full max-w-xs truncate"
          v-model="courseId"
          :disabled="!selectedClassroom"
        >
          <option disabled selected value="">Select Course</option>
          <template v-if="selectedClassroom">
            <option
              :value="course.id"
              v-for="course in selectedClassroom.courses"
            >
              {{ course.name }}
            </option>
          </template>
        </select>
        <select
          class="select select-bordered select-sm w-full max-w-xs truncate"
          :disabled="!selectedCourse"
          v-model="phaseId"
        >
          <option disabled selected value="">Select Phase</option>
          <template v-if="selectedCourse">
            <option :value="phase.id" v-for="phase in selectedCourse.phases">
              {{ phase.name }}
            </option>
          </template>
        </select>
      </div>
    </PageHeader>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "roles"],
  allowedRoles: ["admin", "teacher"],
});

const classroomStore = useClassroomStore();

const classroomId = ref("");
const courseId = ref("");
const phaseId = ref("");

const selectedClassroom = ref(null);
const selectedCourse = ref(null);

const {
  data: classrooms,
  pending,
  error,
} = await classroomStore.getClassrooms();

watch(classrooms, (newVal) => {
  if (newVal) classroomStore.classrooms = newVal;
});

watch(classroomId, (newVal) => {
  if (newVal) {
    selectedClassroom.value = classroomStore.classrooms.find(
      (x) => x.id == classroomId.value
    );
    courseId.value = "";
    phaseId.value = "";
    selectedCourse.value = null;
  }
});

watch(courseId, (newVal) => {
  if (newVal) {
    selectedCourse.value = selectedClassroom.value.courses.find(
      (x) => x.id == newVal
    );
    phaseId.value = "";
  }
});
</script>
