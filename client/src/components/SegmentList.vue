<template>
  <div v-if="segments && segments.length" class="segments-list">
    <h3>Segments</h3>
    <div class="segment-item" v-for="(segment, index) in segments" :key="index">
      <div class="segment-header">
        <div class="segment-time">
          {{ formatTime(segment.start) }} - {{ formatTime(segment.end) }} ({{ formatDuration(segment.end - segment.start) }})
        </div>
        <div class="segment-actions">
          <button class="segment-action-btn" @click="$emit('play', index)" title="Play segment">
            <span class="material-symbols-outlined">play_arrow</span>
          </button>
          <button class="segment-action-btn" @click="$emit('download', index)" title="Download segment">
            <span class="material-symbols-outlined">download</span>
          </button>
          <button class="segment-action-btn" @click="$emit('delete', index)" title="Delete segment">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <div v-if="segment.isTranscribing" class="segment-loading">
        <div class="loading-spinner"></div>
        <span>Transcribing...</span>
      </div>
      <div v-else class="segment-transcription">
        <textarea
          class="segment-input"
          placeholder="Type what you hear in this segment or click the microphone to auto-transcribe"
          v-model="segment.transcription"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatTime, formatDuration } from '@/utils/time.js';
const props = defineProps({
  segments: { type: Array, default: () => [] },
});
</script>
