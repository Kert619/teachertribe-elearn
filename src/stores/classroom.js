export const useClassroomStore = defineStore("classroom", () => {
  const classrooms = ref([]);

  async function getClassrooms() {
    const nuxtApp = useNuxtApp();
    const classroomsData = await useApiFetch("/classrooms", {
      lazy: true,
      key: "classrooms",
      getCachedData: (key) =>
        nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    });

    classrooms.value = classroomsData.data.value;
    return classroomsData;
  }

  async function createClassroom(payload) {
    const createClassroom = await useApiFetch("/classrooms", {
      method: "POST",
      body: payload,
    });

    if (createClassroom.status.value === "success") {
      classrooms.value.push(createClassroom.data.value);
    }

    return createClassroom;
  }

  async function assignCourses(payload) {
    const assignCourses = await useApiFetch(
      `/classrooms/${payload.classroomId}/assign-courses`,
      {
        method: "POST",
        body: { courses: payload.coursesIds },
      }
    );

    const currentClassroom = classrooms.value.find(
      (x) => x.id == payload.classroomId
    );

    if (assignCourses.status.value === "success") {
      currentClassroom.courses = assignCourses.data.value.courses;
    }

    return assignCourses;
  }

  async function getClassroom(payload) {
    const nuxtApp = useNuxtApp();
    const classroom = await useApiFetch("/classrooms/get-by-name", {
      lazy: true,
      query: payload,
      key: `get-classroom-by-name-${payload.classroom}`,
      getCachedData: (key) =>
        nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    });

    return classroom;
  }

  async function assignStudents(classroomId, payload) {
    const students = await useApiFetch(
      `/classrooms/${classroomId}/assign-students`,
      { method: "POST", body: payload }
    );

    if (students.data.value) {
      const classroom = classrooms.value.find((x) => x.id === classroomId);
      classroom.students = toRaw(students.data.value.students);
    }

    return students;
  }

  return {
    classrooms,
    getClassrooms,
    createClassroom,
    assignCourses,
    getClassroom,
    assignStudents,
  };
});
