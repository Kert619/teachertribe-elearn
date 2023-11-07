<template>
  <div class="p-3" :class="variantClasses">
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },

  variant: {
    type: String,
    required: false,
    default: "info",
    validator: (value) => {
      return ["info", "success", "warning", "error"].includes(value);
    },
  },
});

const variantClasses = {
  "bg-sky-200 text-sky-600": props.variant == "info",
  "bg-green-200 text-green-600": props.variant == "success",
  "bg-yellow-200 text-yellow-600": props.variant == "warning",
  "bg-red-200 text-red-600": props.variant == "error",
};
</script>
