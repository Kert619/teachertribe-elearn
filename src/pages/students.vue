<template>
  <div>
    <Loading v-if="pending" />
    <ErrorMessage
      v-else-if="error"
      error-message="Sorry, something went wrong!"
    />
    <div v-else>
      <PageHeader>
        <div class="flex flex-wrap gap-3">
          <select
            class="select select-bordered select-sm w-min truncate"
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
            class="select select-bordered select-sm w-min truncate"
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
            class="select select-bordered select-sm w-min truncate"
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

      <div class="overflow-x-auto" v-if="selectedPhase">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="border border-gray-300" colspan="2">
                <div class="flex justify-center gap-3">
                  <div class="bg-green-400 p-3">Completed</div>
                  <div class="bg-gray-300 p-3">Pending</div>
                </div>
              </th>
              <th
                class="border border-gray-300"
                :colspan="selectedPhase.levels.length"
              >
                <h1 class="text-xl text-center">Levels</h1>
              </th>
            </tr>
            <tr>
              <th class="border border-gray-300">#</th>
              <th class="border border-gray-300">Student Name</th>
              <th
                v-for="(level, idx) in selectedPhase.levels"
                class="text-center border border-gray-300"
              >
                {{ idx + 1 }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="(student, idx) in selectedClassroom.students">
              <th class="border border-gray-300">{{ idx + 1 }}</th>
              <td class="border border-gray-300">{{ student.name }}</td>
              <td
                class="border border-gray-300"
                v-for="(level, idx) in selectedPhase.levels"
              >
                <div
                  v-if="isLevelPassed(student, level)"
                  class="bg-green-400 p-3"
                ></div>
                <div v-else class="bg-gray-300 p-3"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
