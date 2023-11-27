import type { Level, ValidateLevel } from "@/types/level";

export const useLevelStore = defineStore("level", () => {
  async function getLevel(payload: {
    course: string;
    phase: string;
    level: string;
  }) {
    const level = await useAPI<Level>("/levels/get-by-course-phase-level", {
      lazy: true,
      key: `${payload.course}-${payload.phase}-${payload.level}`,
      query: payload,
      transform: (data: any) => data.data as Level,
    });

    return level;
  }

  async function validateLevel(payload: {
    levelId: string;
    userAnswer: string;
    course: string;
  }) {
    const validateLevel = await useAPI<ValidateLevel>(
      `/validate-level/${payload.levelId}`,
      {
        method: "POST",
        body: {
          user_answer: payload.userAnswer,
          course: payload.course,
        },
        transform: (data: any) => data.data as ValidateLevel,
      }
    );

    return validateLevel;
  }

  return { getLevel, validateLevel };
});
