<template>
  <ClientOnly>
    <div class="h-full flex flex-col">
      <div class="h-full overflow-auto">
        <MonacoEditor
          class="h-full w-full"
          v-model="code"
          lang="html"
          theme="vs-dark"
          :options="MONACO_EDITOR_OPTIONS"
        />
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
import * as monaco from "monaco-editor";

const props = defineProps<{
  modelValue: string;
  readOnly: boolean;
  loading: boolean;
}>();

const MONACO_EDITOR_OPTIONS =
  computed<monaco.editor.IStandaloneEditorConstructionOptions>(() => {
    return {
      automaticLayout: true,
      formatOnType: true,
      formatOnPaste: true,
      padding: { top: 20, bottom: 20 },
      fontSize: 18,
      suggestFontSize: 14,
      wordWrap: "on",
      colorDecorators: true,
      readOnly: props.readOnly,
    };
  });

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "go-back"): void;
  (e: "submit-code", code: string): void;
}>();

const code = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});

function submitCode() {
  if (props.loading) return;
  emits("submit-code", code.value);
}

function goBack() {
  if (props.loading) return;
  emits("go-back");
}
</script>
