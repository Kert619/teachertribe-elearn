<template>
  <button
    v-if="level.is_unlocked"
    class="btn btn-primary btn-block no-animation rounded-none"
    :class="{
      'btn-outline': !authStore.isStudent || !level.is_passed,
      '!btn-success': level.is_passed && authStore.isStudent,
    }"
    @click="levelSelect"
  >
    {{ index + 1 }}
  </button>

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

const props = defineProps<{
  level: BaseLevel;
  index: number;
}>();

const authStore = useAuthStore();

function levelSelect() {
  emits("level-select", props.level.name);
}
</script>
