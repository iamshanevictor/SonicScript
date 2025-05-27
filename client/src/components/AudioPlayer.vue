<template>
  <div class="audio-player">
    <div class="player-controls">
      <button class="control-btn play-btn" @click="togglePlay">
        <span class="material-symbols-outlined">{{ isPlaying ? 'pause' : 'play_arrow' }}</span>
      </button>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      </div>
      <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
    </div>
    <div class="volume-control">
      <span class="material-symbols-outlined">volume_up</span>
      <input type="range" min="0" max="100" v-model="volume" class="volume-slider" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isPlaying = ref(false);
const progress = ref(0);
const currentTime = ref(0);
const duration = ref(180); // 3 minutes in seconds
const volume = ref(80);

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Toggle play state
const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
};
</script>

<style scoped>
/* Component-specific styles */
.audio-player {
  background-color: var(--bg-panel);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-btn {
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.control-btn:hover {
  background: var(--accent-primary-hover);
}

.progress-container {
  flex: 1;
  height: 6px;
  background-color: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--accent-primary);
  border-radius: 3px;
}

.time-display {
  font-size: 0.85rem;
  color: var(--text-secondary);
  min-width: 110px;
  text-align: right;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-slider {
  -webkit-appearance: none;
  width: 100px;
  height: 4px;
  background: var(--bg-secondary);
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent-primary);
  cursor: pointer;
}
</style> 