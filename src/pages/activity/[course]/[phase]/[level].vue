<template>
  <div>
    <ErrorMessage v-if="error" error-message="Sorry, something went wrong!" />
    <div v-else-if="level" class="h-screen flex flex-col">
      <LevelTestHeader
        :activity-name="level.phase.course.name"
        @toggle-answer="toggleAnswer"
      />

      <div class="grid grid-cols-12 gap-3 h-full overflow-auto p-3">
        <div
          class="col-span-12 sm:col-span-3 h-full min-h-[150px] overflow-auto shadow-normal p-3"
        >
          <ClientOnly>
            <LevelTestSidebar
              class="h-full"
              :activity="level.name"
              :description="level.description"
            />
          </ClientOnly>
        </div>
        <div
          class="col-span-12 sm:col-span-6 h-full min-h-[300px] overflow-auto shadow-normal"
        >
          <ClientOnly>
            <LevelTestEditor
              v-model="code"
              :read-only="isReadOnly"
              :loading="loadingValidate"
              @go-back="navigateTo(`/activities/${route.params.course}`)"
              @submit-code="validateCode"
            />
          </ClientOnly>
        </div>
        <div
          class="col-span-12 sm:col-span-3 h-full min-h-[150px] overflow-auto shadow-normal p-3"
        >
          <ClientOnly>
            <iframe :srcdoc="code" class="h-full w-full" sandbox=""></iframe>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
definePageMeta({
  layout: false,
  middleware: ["auth", "roles"],
  allowedRoles: ["admin", "teacher", "student"],
});

const route = useRoute();

const levelStore = useLevelStore();
const courseStore = useCourseStore();
const authStore = useAuthStore();

const { slugToTitle } = useSlug();

const loadingValidate = ref(false);

const code = ref("");
const isReadOnly = ref(false);

const { data: level, error } = await levelStore.getLevel({
  course: slugToTitle(route.params.course as string),
  phase: slugToTitle(route.params.phase as string),
  level: slugToTitle(route.params.level as string),
});

if (process.server && !level.value) {
  throw createError({ statusCode: 404, statusMessage: "Activity not found" });
}

if (level.value) {
  code.value = level.value.initial_output;
}

function toggleAnswer(show: boolean) {
  if (show) {
    isReadOnly.value = true;
    code.value = level.value!.expected_output;
  } else {
    isReadOnly.value = false;
    code.value = level.value!.initial_output;
  }
}

async function validateCode(code: string) {
  loadingValidate.value = true;
  const { data: answer, error } = await levelStore.validateLevel({
    levelId: level.value!.id,
    userAnswer: code,
    course: level.value!.phase.course.name,
  });
  loadingValidate.value = false;

  if (error.value) {
    await Swal.fire("Error!", "Sorry, something went wrong.", "error");
  }

  if (answer.value) {
    if (answer.value.is_correct) {
      if (authStore.isStudent) courseStore.refresh = true;
      await Swal.fire(
        "Success!",
        "Congratulations, your answer is correct!",
        "success"
      );
      await navigateTo(`/activities/${route.params.course}`, { replace: true });
    } else {
      await Swal.fire("Error!", "Sorry, your answer is incorrect!", "error");
    }
  }
}
</script>
