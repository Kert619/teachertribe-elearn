<template>
  <div class="flex h-screen">
    <!-- SIDEBAR -->
    <div
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

<script setup>
const expanded = ref(true);

function toggleExpand(value) {
  expanded.value = !value;
}
</script>
