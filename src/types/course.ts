import type { BaseCourse, BasePhase, BaseLevel, BaseQuiz } from "./common";

export interface Course extends BaseCourse {
  phases: Phase[];
}

export interface Phase extends BasePhase {
  levels: BaseLevel[];
  quizzes: BaseQuiz[];
}
