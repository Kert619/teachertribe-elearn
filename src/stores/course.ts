import type { Course } from "@/types/course";

export const useCourseStore = defineStore("course", () => {
  const courses = ref<Course[]>([]);
  const refresh = ref(false);

  async function getCourses() {
    const nuxtApp = useNuxtApp();
    const coursesData = await useAPI<Course[]>("/courses", {
      lazy: true,
      key: "courses",
      getCachedData: (key) =>
        nuxtApp.payload.data[key] || nuxtApp.static.data[key],
      transform: (data: any) => data.data as Course[],
    });

    if (coursesData.data.value) {
      courses.value = coursesData.data.value;
    }

    return coursesData;
  }

  async function getCourse(payload: { course: string }) {
    const nuxtApp = useNuxtApp();

    const course = await useAPI<Course>(`/courses/get-by-name`, {
      lazy: true,
      key: `course-${payload.course}`,
      query: payload,
      getCachedData: (key) => {
        if (refresh.value) {
          refresh.value = false;
          return nuxtApp.static.data[key];
        } else {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        }
      },
      transform: (data: any) => data.data as Course,
    });

    return course;
  }

  return { courses, refresh, getCourses, getCourse };
});
