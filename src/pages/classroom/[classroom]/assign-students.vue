<template>
  <div>
    <Loading v-if="pending" />
    <ErrorMessage
      v-else-if="error"
      error-message="Sorry, someting went wrong!"
    />
    <div v-else>
      <PageHeader>
        <div class="flex justify-between items-center gap-3">
          <div class="text-sm breadcrumbs">
            <ul>
              <li>
                <NuxtLink to="/classroom">Classroom</NuxtLink>
              </li>
              <li>{{ classroom.name }}</li>
              <li>Assign Students</li>
            </ul>
          </div>
        </div>
      </PageHeader>

      <div class="overflow-x-auto max-w-md mx-auto">
        <VeeForm
          @submit="handleSubmit"
          :initial-values="initialData"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <VeeFieldArray name="students" v-slot="{ fields, push, remove }">
            <fieldset
              v-for="(field, idx) in fields"
              :key="field.key"
              class="mb-2 border-2 border-dotted border-primary-500 p-5 relative"
            >
              <button
                class="btn btn-sm absolute right-2 top-0"
                @click="remove(idx)"
              >
                X
              </button>
              <legend>Student # {{ idx + 1 }}</legend>
              <VTextInput
                type="text"
                placeholder="Enter student's name"
                label="Full Name"
                :name="`students[${idx}].name`"
                :error="errors[`students[${idx}].name`]"
                size="sm"
                @keydown.enter.prevent
              />
              <VTextInput
                type="email"
                placeholder="Enter student's email"
                label="Email"
                :name="`students[${idx}].email`"
                :error="errors[`students[${idx}].email`]"
                size="sm"
                @keydown.enter.prevent
              />
              <VTextInput
                type="text"
                placeholder="Enter student's password"
                label="Password"
                :name="`students[${idx}].password`"
                :error="errors[`students[${idx}].password`]"
                size="sm"
                @keydown.enter.prevent
              />
              <div class="form-control w-max">
                <label class="label cursor-pointer justify-start gap-3">
                  <span class="label-text font-bold">Send Email</span>
                  <VeeField
                    type="checkbox"
                    class="toggle"
                    :name="`students[${idx}].sendEmail`"
                    :value="true"
                    @change="field.value.sendEmail = $event.target.checked"
                  />
                </label>
                <VeeErrorMessage :name="`students[${idx}].sendEmail`" />
              </div>
            </fieldset>

            <div class="flex gap-3 justify-center">
              <button
                type="button"
                class="btn btn-primary btn-sm mt-3"
                @click="
                  push({ name: '', email: '', password: '', sendEmail: false })
                "
              >
                Add Student +
              </button>

              <button
                type="submit"
                class="btn btn-primary btn-sm mt-3"
                :disabled="fields.length === 0"
              >
                <span
                  v-if="loading"
                  class="loading loading-spinner loading-sm"
                ></span>
                Save Students
              </button>
            </div>
          </VeeFieldArray>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import Swal from "sweetalert2";
const route = useRoute();

const classroomStore = useClassroomStore();

const { slugToTitle } = useSlug();

const loading = ref(false);

const initialData = {
  students: [
    {
      name: "",
      email: "",
      password: "",
      sendEmail: false,
    },
  ],
};

const schema = yup.object().shape({
  students: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required().label("Name"),
        email: yup.string().email().required().label("Email"),
        password: yup.string().required().min(8).label("Password"),
        sendEmail: yup.boolean(),
      })
    )
    .strict(),
});

const {
  data: classroom,
  pending,
  error,
} = await classroomStore.getClassroom({
  classroom: slugToTitle(route.params.classroom),
});

const handleSubmit = async (values) => {
  if (loading.value) return;
  loading.value = true;
  const { data: students, error } = await classroomStore.assignStudents(
    classroom.value.id,
    values
  );
  loading.value = false;

  if (students.value) {
    await Swal.fire("Success!", "New students has been assigned!", "success");
    await navigateTo("/classroom", { replace: true });
  }

  if (error.value) {
    await Swal.fire("Error!", error.value.data.message, "error");
  }
};
</script>
