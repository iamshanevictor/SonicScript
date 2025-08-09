import { ref } from 'vue';
import { uploadAudio } from '@/services/api.js';
import { apiUrl } from '@/services/config.js';

export function useUpload() {
  const isUploading = ref(false);
  const uploadError = ref(null);

  const uploadFile = async (file) => {
    if (!file) return null;
    try {
      isUploading.value = true;
      uploadError.value = null;

      const data = await uploadAudio(file);
      const source = {
        id: Date.now(),
        name: data.originalName,
        type: 'audio',
        selected: true,
        url: apiUrl(data.url),
        segments: [],
      };
      return source;
    } catch (e) {
      uploadError.value = e?.message || 'Upload failed';
      throw e;
    } finally {
      isUploading.value = false;
    }
  };

  return { isUploading, uploadError, uploadFile };
}
