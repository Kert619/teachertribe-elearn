<template>
  <div class="border-2 border-primary-500 flex flex-col">
    <h1
      class="bg-primary-200 border-b-2 border-primary-500 font-bold p-2 flex justify-center items-center gap-2"
    >
      <span v-if="isAssignedCourses">Select Courses</span>
      <span v-else>{{ classroom.name }}</span>
    </h1>
    <div class="p-3">
      <template v-if="!isAssignedCourses">
        <h1
          class="text-center font-bold bg-green-200 p-2"
          :class="{ '!bg-red-200': classroom.students.length === 0 }"
        >
          <span v-if="classroom.students.length > 0" class="text-green-500">{{
            classroom.students.length +
            (classroom.students.length > 1 ? " Students" : " Student")
          }}</span>

          <span v-else class="text-red-600">No Students</span>
        </h1>
        <template v-if="classroom.courses.length > 0">
          <ul>
            <li
              v-for="course in classroom.courses"
              :key="course.id"
              class="flex justify-center border-b p-2"
            >
              {{ course.name }}
            </li>
          </ul>
        </template>
        <p v-else class="text-center p-2 text-red-500">No Courses...</p>
      </template>

      <template v-else>
        <ul>
          <li
            v-for="course in courses"
            :key="course.id"
            class="mb-2 px-2 border-b"
            :class="{
              'bg-green-300': isCourseSelected(course),
            }"
          >
            <div class="form-control">
              <label class="label cursor-pointer justify-between">
                <span class="label-text">{{ course.name }}</span>
                <input
                  type="checkbox"
                  class="checkbox checkbox-sm"
                  :checked="isCourseSelected(course)"
                  :disabled="isCourseSelected(course)"
                  @change="
                    setSelectedCoursesId(
                      $event.target as HTMLInputElement,
                      course.id
                    )
                  "
                />
              </label>
            </div>
          </li>
        </ul>
      </template>
    </div>

    <div class="flex flex-col gap-[1px] mt-auto">
      <template v-if="!isAssignedCourses">
        <button
          class="btn btn-sm btn-block btn-primary rounded-none no-animation font-normal"
          @click="isAssignedCourses = true"
        >
          Assign Courses
        </button>
        <button
          class="btn btn-sm btn-block btn-primary rounded-none no-animation font-normal"
          @click="assignStudents"
        >
          Assign Students
        </button>
        <button
          class="btn btn-sm btn-block btn-primary rounded-none no-animation font-normal"
        >
          Manage Students
        </button>
      </template>

      <template v-else>
        <button
          class="btn btn-sm btn-block btn-primary rounded-none no-animation font-normal"
          @click="isAssignedCourses = false"
        >
          Go Back
        </button>
        <button
          class="btn btn-sm btn-block btn-primary rounded-none no-animation font-normal"
          @click="assignCourses"
        >
          Assign to Class
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Classroom, Course, AssignCourses } from "@/types/classroom";

const emits = defineEmits<{
  (e: "assign-courses", assignCourses: AssignCourses): void;
  (e: "assign-students", classroomName: string): void;
}>();

const props = defineProps<{
  classroom: Classroom;
  courses: Course[];
}>();

const isAssignedCourses = ref(false);
const selectedCoursesIds = ref<string[]>([]);

function isCourseSelected(course: Course) {
  return !!props.classroom.courses.find((x) => x.id === course.id);
}

function setSelectedCoursesId(value: HTMLInputElement, courseId: string) {
  if (value.checked) {
    selectedCoursesIds.value.push(courseId);
  } else {
    const index = selectedCoursesIds.value.findIndex((x) => x === courseId);
    selectedCoursesIds.value.splice(index, 1);
  }
}

function assignCourses() {
  if (selectedCoursesIds.value.length === 0) return;
  emits("assign-courses", {
    classroomId: props.classroom.id,
    coursesIds: selectedCoursesIds.value,
  });
  isAssignedCourses.value = false;
}

function assignStudents() {
  emits("assign-students", props.classroom.name);
}

watch(isAssignedCourses, () => (selectedCoursesIds.value = []));
</script>
