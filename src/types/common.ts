export interface BaseCourse {
  id: string;
  name: string;
}

export interface BasePhase {
  id: string;
  name: string;
}

export interface BaseLevel {
  id: string;
  name: string;
  description: string;
  initial_output: string;
  expected_output: string;
  is_passed: boolean;
  is_unlocked: boolean;
}

export interface BaseQuiz {
  id: string;
  name: string;
}

export interface BaseClassroom {
  id: string;
  name: string;
}

export interface BaseUser {
  id: string;
  name: string;
  email: string;
}
