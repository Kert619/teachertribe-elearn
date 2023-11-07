<template>
  <button
    class="btn btn-outline btn-primary btn-block no-animation rounded-none"
    @click="levelSelect"
  >
    {{ index + 1 }}
  </button>
</template>

<script setup>
const emits = defineEmits(["level-select"]);
const props = defineProps({
  level: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const authStore = useAuthStore();

function levelSelect() {
  emits("level-select", props.level);
}
</script>
