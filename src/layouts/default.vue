<template>
  <div class="flex h-screen">
    <!-- SIDEBAR -->
    <div
      v-if="!isStudent"
      class="bg-primary-500 h-full w-64 transition-[width] duration-500 overflow-y-auto overflow-x-hidden shrink-0"
      :class="{ '!w-16': !expanded }"
    >
      <SidebarMain :expanded="expanded" @toggle-expand="toggleExpand" />
    </div>

    <!-- CONTENT -->
    <div class="grow flex flex-col h-full overflow-auto">
      <!-- HEADER -->
      <HeaderMain />

      <!-- MAIN CONTENT -->
      <div class="p-3 h-full overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const expanded = ref(true);
const authStore = useAuthStore();

const isStudent = authStore.isStudent;

function toggleExpand(value: boolean) {
  expanded.value = !value;
}
</script>
