<template>
  <button :class="btnClass" :disabled="isUploading" @click="pickFile">
    <span class="material-symbols-outlined">upload_file</span>
    <span>{{ isUploading ? 'Uploading...' : label }}</span>
  </button>
</template>

<script setup>
import { ref } from 'vue';
import { useUpload } from '@/composables/useUpload.js';

const props = defineProps({
  label: { type: String, default: 'Upload Audio' },
  btnClass: { type: String, default: 'panel-action-btn' },
});

const emit = defineEmits(['uploaded', 'error']);

const { isUploading, uploadError, uploadFile } = useUpload();

const pickFile = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.mp3';
  input.onchange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const source = await uploadFile(file);
      emit('uploaded', source);
    } catch (err) {
      emit('error', uploadError.value || err?.message || 'Upload failed');
    }
  };
  input.click();
};
</script>
