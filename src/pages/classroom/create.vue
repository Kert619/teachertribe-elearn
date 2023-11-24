<template>
  <div>
    <div class="border-b pb-3">
      <NuxtLink to="/classroom" class="btn btn-primary btn-sm"
        >Go Back</NuxtLink
      >
    </div>

    <div class="w-full max-w-sm mx-auto mt-5">
      <VeeForm
        :validation-schema="schema"
        @submit="createClassroom"
        v-slot="{ errors }"
      >
        <VTextInput
          name="name"
          label="Classroom"
          placeholder="Enter classroom name"
          size="sm"
          :error="errors.name"
        />

        <button class="btn btn-block btn-sm btn-primary mt-3">
          <span
            v-if="loading"
            class="loading loading-spinner loading-sm"
          ></span>
          Save
        </button>
      </VeeForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import * as yup from "yup";
definePageMeta({
  middleware: ["auth"],
});

const classroomStore = useClassroomStore();

const loading = ref(false);

const schema = yup.object({
  name: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z0-9\s]+$/,
      "The name must contain only letters, numbers, and spaces."
    )
    .label("Name"),
});

async function createClassroom(values: any) {
  if (loading.value) return;
  loading.value = true;
  const { status, error } = await classroomStore.createClassroom(
    values.name as string
  );

  loading.value = false;

  if (error.value) {
    await Swal.fire("Error!", error.value.data.message, "error");
  } else {
    await Swal.fire("Saved!", "New classroom has been added.", "success");
    navigateTo("/classroom", { replace: true });
  }
}
</script>
