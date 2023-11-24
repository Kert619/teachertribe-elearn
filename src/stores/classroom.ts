import type {
  Classroom,
  AssignCourses,
  AssignStudents,
} from "@/types/classroom";

export const useClassroomStore = defineStore("classroom", () => {
  const classrooms = ref<Classroom[]>([]);

  async function getClassrooms() {
    const nuxtApp = useNuxtApp();
    const classroomsData = await useAPI<Classroom[]>("/classrooms", {
      key: "classrooms",
      getCachedData: (key) =>
        nuxtApp.payload.data[key] || nuxtApp.static.data[key],
      transform: (data: any) => data.data as Classroom[],
    });

    if (classroomsData.data.value) {
      classrooms.value = classroomsData.data.value;
    }

    return classroomsData;
  }

  async function createClassroom(name: string) {
    const classroom = await useAPI<Classroom>("/classrooms", {
      method: "POST",
      body: { name },
      transform: (data: any) => data.data as Classroom,
    });

    if (classroom.data.value && classrooms.value.length > 0) {
      classrooms.value.push(classroom.data.value);
    } else {
      await getClassrooms();
    }

    return classroom;
  }

  async function assignCourses(payload: AssignCourses) {
    const assignCourses = await useAPI<Classroom>(
      `/classrooms/${payload.classroomId}/assign-courses`,
      {
        method: "POST",
        body: { courses: payload.coursesIds },
        transform: (data: any) => data.data as Classroom,
      }
    );

    const currentClassroom = classrooms.value.find(
      (x) => x.id == payload.classroomId
    );

    if (assignCourses.data.value && currentClassroom) {
      currentClassroom.courses = assignCourses.data.value.courses;
    }

    return assignCourses;
  }

  async function getClassroom(classroom: string) {
    const nuxtApp = useNuxtApp();
    const classroomData = await useAPI<Classroom>("/classrooms/get-by-name", {
      query: { classroom },
      key: `classroom-${classroom}`,
      getCachedData: (key) =>
        nuxtApp.payload.data[key] || nuxtApp.static.data[key],
      transform: (data: any) => data.data as Classroom,
    });

    return classroomData;
  }

  async function assignStudents(payload: AssignStudents) {
    const students = await useAPI<Classroom>(
      `/classrooms/${payload.classroomId}/assign-students`,
      {
        method: "POST",
        body: { students: payload.students },
        transform: (data: any) => data.data as Classroom,
      }
    );

    if (students.data.value && classrooms.value.length > 0) {
      const classroom = classrooms.value.find(
        (x) => x.id === payload.classroomId
      );

      if (classroom) {
        classroom.students = students.data.value.students;
      }
    } else {
      await getClassrooms();
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
