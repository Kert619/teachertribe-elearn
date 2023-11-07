<template>
  <div class="flex flex-col text-white">
    <div class="p-5 flex justify-between items-center gap-5">
      <Transition name="scale">
        <img
          v-if="expanded"
          src="~/assets/images/logo_white.png"
          alt="Teacher tribe logo"
          width="150"
        />
      </Transition>

      <button @click.prevent="toggleExpand">
        <IconHamburger />
      </button>
    </div>

    <div class="mt-7 flex flex-col">
      <SidebarMainTab :expanded="expanded" to="/activities">
        <template #icon>
          <IconActivities />
        </template>
        <template #name>Activities</template>
      </SidebarMainTab>

      <SidebarMainTab :expanded="expanded" to="/lessonplan">
        <template #icon>
          <IconLessonPlan />
        </template>
        <template #name>Lesson Plan</template>
      </SidebarMainTab>

      <SidebarMainTab :expanded="expanded" to="/classroom">
        <template #icon>
          <IconClassroom />
        </template>
        <template #name>Classroom</template>
      </SidebarMainTab>

      <SidebarMainTab :expanded="expanded" to="/students">
        <template #icon>
          <IconStudents />
        </template>
        <template #name>Students</template>
      </SidebarMainTab>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["toggle-expand"]);
const props = defineProps({
  expanded: {
    type: Boolean,
    required: true,
  },
});

function toggleExpand() {
  emits("toggle-expand", props.expanded);
}
</script>
