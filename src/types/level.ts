import type { BaseLevel, BasePhase, BaseCourse } from "./common";

export interface ValidateLevel {
  is_correct: boolean;
}

export interface Phase extends BasePhase {
  course: BaseCourse;
}

export interface Level extends BaseLevel {
  phase: Phase;
}
