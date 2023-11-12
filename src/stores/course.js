export const useCourseStore = defineStore("course", () => {
  const courses = ref([]);
  const refresh = ref(false);

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
      getCachedData: (key) => {
        if (refresh.value) {
          refresh.value = false;
          return nuxtApp.static.data[key];
        } else {
          return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        }
      },
    });

    return course;
  }

  return { courses, refresh, getCourses, getCourse };
});
