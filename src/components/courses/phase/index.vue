<template>
  <div class="grid grid-cols-12 gap-3 mb-3">
    <div class="p-3 border border-primary-500 col-span-12 sm:col-span-9">
      <CoursesPhaseTitle :title="phase.name" />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
      >
        <CoursesPhaseLevel
          v-for="(level, index) in phase.levels"
          :key="level.id"
          :level="level"
          :index="index"
          @level-select="levelSelect(level.name)"
        />
      </div>
    </div>
    <div class="p-3 border border-primary-500 col-span-12 sm:col-span-3">
      <CoursesPhaseTitle title="Quiz" />
      <div class="grid grid-cols-1 gap-3">
        <CoursesPhaseQuiz
          v-for="(quiz, index) in phase.quizzes"
          :key="quiz.id"
          :quiz="quiz"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Phase } from "@/types/course";

const emits = defineEmits<{
  (e: "level-select", phaseName: string, levelName: string): void;
}>();

const props = defineProps<{
  phase: Phase;
}>();

function levelSelect(levelName: string) {
  emits("level-select", props.phase.name, levelName);
}
</script>
