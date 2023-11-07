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

<script setup>
import Swal from "sweetalert2";
definePageMeta({
  middleware: ["auth"],
});

const classroomStore = useClassroomStore();

const loading = ref(false);

const schema = {
  name: "required|alphaNumSpaces|max:255",
};

async function createClassroom(values, { setFieldError }) {
  if (loading.value) return;
  loading.value = true;
  const { status, error } = await classroomStore.createClassroom(values);

  loading.value = false;

  if (error.value) {
    Object.keys(error.value.data.errors).forEach((x) => {
      setFieldError(x, error.value.data.errors[x]);
    });
  }

  if (status.value === "success") {
    await Swal.fire("Saved!", "New classroom has been added.", "success");
    navigateTo("/classroom", { replace: true });
  }
}
</script>
