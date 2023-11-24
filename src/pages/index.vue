<template>
  <div>
    <VeeForm
      class="w-full max-w-md mx-auto m-10 shadow-normal p-5"
      :validation-schema="schema"
      @submit="handleSubmit"
      v-slot="{ errors }"
    >
      <img src="~/assets/images/logo.png" width="200" class="mx-auto" />

      <div class="mt-5">
        <VTextInput
          name="email"
          placeholder="Enter your email"
          type="email"
          label="Email"
          :error="errors.email"
        />

        <VTextInput
          name="password"
          placeholder="Enter your password"
          type="password"
          label="Password"
          :error="errors.password"
        />
      </div>

      <Alert
        v-if="!!errorMessage"
        class="mt-3 text-center"
        :text="errorMessage"
        variant="error"
      />

      <button class="btn btn-primary btn-block mt-3">
        <span v-if="loading" class="loading loading-spinner loading-sm"></span>
        Login
      </button>
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
definePageMeta({
  layout: false,
  middleware: ["logged-in"],
});

const authStore = useAuthStore();

const loading = ref(false);
const errorMessage = ref<string | null>(null);

const schema = yup.object({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().label("Password"),
});

async function handleSubmit(values: any) {
  if (loading.value) return;
  errorMessage.value = null;
  loading.value = true;
  const { error } = await authStore.login({
    email: values.email as string,
    password: values.password as string,
  });
  loading.value = false;

  if (error.value) {
    errorMessage.value = error.value.data.message as string;
  } else {
    await navigateTo("/activities", { replace: true });
  }
}
</script>
