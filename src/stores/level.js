export const useLevelStore = defineStore("level", () => {
  async function getLevel(payload) {
    const level = await useApiFetch("/levels/get-by-course-phase-level", {
      lazy: true,
      key: `${payload.course}-${payload.phase}-${payload.level}`,
      query: payload,
    });

    return level;
  }

  async function validateLevel(payload) {
    const validateLevel = await useApiFetch(
      `/validate-level/${payload.levelId}`,
      {
        method: "POST",
        body: {
          user_answer: payload.userAnswer,
          course: payload.course,
        },
      }
    );

    return validateLevel;
  }

  return { getLevel, validateLevel };
});
