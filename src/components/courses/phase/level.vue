<template>
  <NuxtLink
    v-if="level.is_unlocked"
    :to="`/activity/${titleToSlug(courseName)}/${titleToSlug(
      phaseName
    )}/${titleToSlug(level.name)}`"
    class="btn btn-primary btn-block no-animation rounded-none"
    :class="{
      'btn-outline': !authStore.isStudent || !level.is_passed,
      '!btn-success': level.is_passed && authStore.isStudent,
    }"
  >
    {{ index + 1 }}
  </NuxtLink>

  <button
    v-else
    class="btn btn-outline btn-primary btn-block no-animation rounded-none pointer-events-none"
  >
    <IconLock />
  </button>
</template>

<script setup lang="ts">
import type { BaseLevel } from "@/types/common";

const emits = defineEmits<{
  (e: "level-select", levelName: string): void;
}>();

const { titleToSlug } = useSlug();

defineProps<{
  courseName: string;
  phaseName: string;
  level: BaseLevel;
  index: number;
}>();

const authStore = useAuthStore();
</script>
