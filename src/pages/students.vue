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
    <Loading v-if="loading" />
    <div class="overflow-x-auto" v-else-if="selectedPhase">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Student Name</th>
            <th
              v-for="(level, idx) in selectedPhase.levels"
              class="text-center"
            >
              {{ idx + 1 }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(student, idx) in selectedClassroom.students">
            <th>{{ idx + 1 }}</th>
            <td>{{ student.name }}</td>
            <td v-for="(level, idx) in selectedPhase.levels">
              <div
                v-if="isLevelPassed(student, level)"
                class="bg-green-400 border-green-400 border-[1px] p-3"
              ></div>
              <div v-else class="border-primary-500 border-[1px] p-3"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
const selectedPhase = ref(null);

const loading = ref(false);

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
    selectedPhase.value = null;
  }
});

watch(courseId, (newVal) => {
  if (newVal) {
    selectedCourse.value = selectedClassroom.value.courses.find(
      (x) => x.id == newVal
    );
    phaseId.value = "";
    selectedPhase.value = null;
  }
});

watch(phaseId, (newVal) => {
  if (newVal) {
    selectedPhase.value = selectedCourse.value.phases.find(
      (x) => x.id == newVal
    );
  }
});

const isLevelPassed = (student, level) => {
  return !!student.levels.find((x) => x.id == level.id);
};
</script>
