import type {
  BaseClassroom,
  BaseCourse,
  BasePhase,
  BaseLevel,
  BaseUser,
} from "./common";

export interface Phase extends BasePhase {
  levels: BaseLevel[];
}

export interface Course extends BaseCourse {
  phases: Phase[];
}

export interface Classroom extends BaseClassroom {
  courses: Course[];
  teacher: BaseUser;
  students: Student[];
}

export interface Student extends BaseUser {
  levels: BaseLevel[];
}

export interface AssignCourses {
  classroomId: string;
  coursesIds: string[];
}

export interface AssignStudents {
  classroomId: string;
  students: {
    name: string;
    email: string;
    password: string;
    sendEmail: boolean;
  }[];
}
