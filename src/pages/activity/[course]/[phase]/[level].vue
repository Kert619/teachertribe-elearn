<template>
  <div>
    <div
      v-if="pending"
      class="h-screen w-screen flex justify-center items-center"
    >
      <Loading />
    </div>
    <div v-else class="h-screen flex flex-col">
      <LevelTestHeader
        :activity-name="level.phase.course.name"
        @toggle-answer="toggleAnswer"
      />

      <div class="grid grid-cols-12 gap-3 h-full overflow-auto p-3">
        <div
          class="col-span-12 sm:col-span-3 h-full min-h-[150px] overflow-auto shadow-normal p-3"
        >
          <LevelTestSidebar
            class="h-full"
            :activity="level.name"
            :description="level.description"
          />
        </div>
        <div
          class="col-span-12 sm:col-span-6 h-full min-h-[300px] overflow-auto shadow-normal"
        >
          <LevelTestEditor
            v-model="code"
            :read-only="isReadOnly"
            :loading="loadingValidate"
            @go-back="navigateTo(`/activities/${route.params.course}`)"
            @submit-code="validateCode"
          />
        </div>
        <div
          class="col-span-12 sm:col-span-3 h-full min-h-[150px] overflow-auto shadow-normal p-3"
        >
          <iframe :srcdoc="code" class="h-full w-full" sandbox></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
definePageMeta({
  layout: false,
  middleware: ["auth", "roles"],
  allowedRoles: ["admin", "teacher", "student"],
});

const route = useRoute();

const levelStore = useLevelStore();

const { slugToTitle } = useSlug();

const loadingValidate = ref(false);

const code = ref("");
const isReadOnly = ref(false);

const { data: level, pending } = await levelStore.getLevel({
  course: slugToTitle(route.params.course),
  phase: slugToTitle(route.params.phase),
  level: slugToTitle(route.params.level),
});

if (process.server && !level.value) {
  throw createError({ statusCode: 404, statusMessage: "Activity not found" });
} 

if(level.value){
  code.value=level.value.initial_output
}

watch(level, (newLevel) => {
  code.value = newLevel.initial_output;
});

function toggleAnswer(show) {
  if (show) {
    isReadOnly.value = true;
    code.value = level.value.expected_output;
  } else {
    isReadOnly.value = false;
    code.value = level.value.initial_output;
  }
}

async function validateCode() {
  loadingValidate.value = true;
  const {
    data: answer,
    error,
    status,
  } = await levelStore.validateLevel({
    levelId: level.value.id,
    userAnswer: code.value,
    course: level.value.phase.course.name,
  });
  loadingValidate.value = false;

  if (error.value) {
    await Swal.fire("Error!", "Sorry, something went wrong.", "error");
  }

  if (status.value === "success") {
    if (answer.value.is_correct) {
      await Swal.fire(
        "Success!",
        "Congratulations, your answer is correct!",
        "success"
      );
      navigateTo(`/activities/${route.params.course}`, { replace: true });
    } else {
      await Swal.fire("Error!", "Sorry, your answer is incorrect!", "error");
    }
  }
}
</script>
