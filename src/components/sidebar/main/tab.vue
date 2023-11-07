<template>
  <NuxtLink
    :to="to"
    class="flex gap-5 justify-start items-center px-5 py-4 hover:bg-primary-700 overflow-hidden transition-[background-color]"
    active-class="bg-primary-700 border-l-2"
  >
    <div>
      <slot name="icon" />
    </div>

    <Transition name="slide-left">
      <div v-if="expanded" class="text-lg whitespace-nowrap">
        <slot name="name" />
      </div>
    </Transition>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  expanded: {
    type: Boolean,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});
</script>
