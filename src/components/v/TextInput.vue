<template>
  <div class="form-control">
    <label class="label" v-if="!!label">
      <span class="label-text font-bold">{{ label }}</span>
    </label>
    <VeeField :name="name" :label="label" v-slot="{ field }">
      <input
        v-bind="field"
        :type="type"
        class="input input-bordered w-full"
        :class="inputClasses"
        :placeholder="placeholder"
      />
      <span class="text-sm mt-1 text-red-500">{{ error }}</span>
    </VeeField>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
    validator(value) {
      return ["xs", "sm", "md", "lg"].includes(value);
    },
  },
  error: {
    required: true,
  },
});

const inputClasses = computed(() => {
  return { "border-red-500": !!props.error, [`input-${props.size}`]: true };
});
</script>
