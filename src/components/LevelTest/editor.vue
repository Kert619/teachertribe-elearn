<template>
  <ClientOnly>
    <div class="h-full flex flex-col">
      <div class="h-full overflow-auto">
        <CodeEditor
          theme="night-owl"
          width="100%"
          height="100%"
          border-radius="0"
          :line-nums="true"
          :copy-code="false"
          :read-only="readOnly"
          :languages="[['html', 'HTML']]"
          v-model="value"
          autofocus
        ></CodeEditor>
      </div>
      <div class="px-3 py-2 flex justify-between gap-3">
        <button class="btn btn-sm btn-error" @click="goBack">Go Back</button>
        <button class="btn btn-sm btn-primary" @click="submitCode">
          <span
            v-if="loading"
            class="loading loading-spinner loading-sm"
          ></span>
          Submit Code
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
// import hljs from "highlight.js";
import CodeEditor from "simple-code-editor";

const props = defineProps<{
  modelValue: string;
  readOnly: boolean;
  loading: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "go-back"): void;
  (e: "submit-code", code: string): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

function submitCode() {
  if (props.loading) return;
  emits("submit-code", value.value);
}

function goBack() {
  if (props.loading) return;
  emits("go-back");
}
</script>
