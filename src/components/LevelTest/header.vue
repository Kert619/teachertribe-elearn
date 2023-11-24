<template>
  <div>
    <div
      class="bg-primary-500 px-10 py-3 flex justify-between items-center gap-3"
    >
      <img
        src="~/assets/images/logo_white.png"
        alt="Teacher tribe logo"
        class="mb-2 w-24 sm:w-48"
      />

      <div v-if="!authStore.isStudent" class="form-control">
        <label class="label cursor-pointer">
          <span v-if="showAnswer" class="label-text text-white me-2"
            >Hide Answer</span
          >
          <span v-else class="label-text text-white me-2">Show Answer</span>
          <input type="checkbox" class="toggle" v-model="showAnswer" />
        </label>
      </div>
    </div>

    <div
      class="bg-primary-100 px-10 py-2 flex justify-between items-center gap-3"
    >
      <h1>
        <span>Course: </span>
        <span class="font-bold">{{ activityName }}</span>
      </h1>
      <button class="btn btn-sm btn-primary">
        Learn More
        <IconBulb class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (e: "toggle-answer", showAnswer: boolean): void;
}>();

defineProps<{
  activityName: string;
}>();

const authStore = useAuthStore();
const showAnswer = ref(false);

watch(showAnswer, () => emits("toggle-answer", showAnswer.value));
</script>
