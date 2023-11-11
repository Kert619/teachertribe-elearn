export const useCourseStore = defineStore("course", () => {
  const courses = ref([]);

  async function getCourses() {
    const nuxtApp = useNuxtApp();
    const coursesData = await useApiFetch("/courses", {
      lazy: true,
      key: "courses",
      getCachedData: (key) =>
        nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    });

    courses.value = coursesData.data.value;
    return coursesData;
  }

  async function getCourse(payload) {
    const nuxtApp = useNuxtApp();

    const course = await useApiFetch(`/courses/get-by-name`, {
      lazy: true,
      key: `course-${payload.course}`,
      query: payload,
      getCachedData: (key) =>
        nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    });

    return course;
  }

  return { courses, getCourses, getCourse };
});
