<template>
  <div class="waveform-player">
    <div class="waveform-controls">
      <div class="playback-controls">
        <button class="control-btn" @click="togglePlay">
          <span class="material-symbols-outlined">{{ isPlaying ? 'pause' : 'play_arrow' }}</span>
        </button>
        <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
      
      <div class="secondary-controls">
        <div class="zoom-controls">
          <button class="zoom-btn" @click="zoomOut" title="Zoom Out">
            <span class="material-symbols-outlined">zoom_out</span>
          </button>
          <button class="zoom-btn" @click="zoomIn" title="Zoom In">
            <span class="material-symbols-outlined">zoom_in</span>
          </button>
        </div>
        <div class="volume-control">
          <span class="material-symbols-outlined">volume_up</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            v-model="volume" 
            class="volume-slider" 
            @input="updateVolume"
          />
        </div>
      </div>
    </div>
    
    <div class="waveform-container">
      <div ref="waveformRef" class="waveform"></div>
    </div>
    
    <div class="segment-controls">
      <div class="segment-controls-group">
        <button class="segment-btn" @click="startSegment" :disabled="isSegmenting" title="Start Cut">
          <span class="material-symbols-outlined">content_cut</span>
          <span class="btn-text">Start</span>
        </button>
        <button class="segment-btn" @click="endSegment" :disabled="!isSegmenting" title="End Cut">
          <span class="material-symbols-outlined">check</span>
          <span class="btn-text">End</span>
        </button>
      </div>
      <div class="segment-controls-group">
        <button class="segment-btn" @click="cancelSegment" :disabled="!isSegmenting" title="Cancel Cut">
          <span class="material-symbols-outlined">close</span>
          <span class="btn-text">Cancel</span>
        </button>
        <button class="segment-btn save-btn" @click="saveSegment" :disabled="!segmentReady" title="Save Segment">
          <span class="material-symbols-outlined">save</span>
          <span class="btn-text">Save</span>
        </button>
      </div>
    </div>
    
    <div v-if="segments.length > 0" class="segments-list">
      <h3>Segments</h3>
      <div v-for="(segment, index) in segments" :key="index" class="segment-item">
        <div class="segment-info">
          <span class="segment-time">{{ formatTime(segment.start) }} - {{ formatTime(segment.end) }}</span>
          <span class="segment-duration">({{ formatTime(segment.end - segment.start) }})</span>
        </div>
        <div class="segment-actions">
          <button class="action-btn" @click="playSegment(segment)">
            <span class="material-symbols-outlined">play_arrow</span>
          </button>
          <button class="action-btn" @click="deleteSegment(index)">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import WaveSurfer from 'wavesurfer.js';

const props = defineProps({
  audioUrl: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['segmentCreated', 'segmentDeleted']);

// Refs
const waveformRef = ref(null);
const wavesurfer = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(0.5);
const zoomLevel = ref(50); // Initial zoom level (1-100)

// Segmentation
const isSegmenting = ref(false);
const segmentStart = ref(null);
const segmentEnd = ref(null);
const segmentReady = ref(false);
const segments = ref([]);

// Initialize WaveSurfer
onMounted(() => {
  if (!waveformRef.value) return;
  
  // Create WaveSurfer instance
  wavesurfer.value = WaveSurfer.create({
    container: waveformRef.value,
    waveColor: 'rgba(100, 149, 237, 0.7)',
    progressColor: 'rgb(100, 149, 237)',
    cursorColor: '#fff',
    barWidth: 2,
    barRadius: 3,
    cursorWidth: 1,
    height: 100,
    barGap: 2,
    responsive: true,
    normalize: true,
    partialRender: true,
  });
  
  // Load audio file
  wavesurfer.value.load(props.audioUrl);
  
  // Set initial volume
  wavesurfer.value.setVolume(volume.value);
  
  // Event listeners
  wavesurfer.value.on('ready', () => {
    duration.value = wavesurfer.value.getDuration();
    console.log('Audio loaded, duration:', duration.value);
  });
  
  wavesurfer.value.on('audioprocess', () => {
    currentTime.value = wavesurfer.value.getCurrentTime();
  });
  
  wavesurfer.value.on('seek', () => {
    currentTime.value = wavesurfer.value.getCurrentTime();
  });
  
  wavesurfer.value.on('play', () => {
    isPlaying.value = true;
  });
  
  wavesurfer.value.on('pause', () => {
    isPlaying.value = false;
  });
  
  wavesurfer.value.on('finish', () => {
    isPlaying.value = false;
  });
});

// Clean up on component unmount
onBeforeUnmount(() => {
  if (wavesurfer.value) {
    wavesurfer.value.destroy();
  }
});

// Watch for audio URL changes
watch(() => props.audioUrl, (newUrl) => {
  if (wavesurfer.value && newUrl) {
    wavesurfer.value.load(newUrl);
    segments.value = [];
    segmentStart.value = null;
    segmentEnd.value = null;
    segmentReady.value = false;
    isSegmenting.value = false;
  }
});

// Format time in mm:ss format
const formatTime = (seconds) => {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Playback controls
const togglePlay = () => {
  if (wavesurfer.value) {
    wavesurfer.value.playPause();
  }
};

const updateVolume = () => {
  if (wavesurfer.value) {
    wavesurfer.value.setVolume(volume.value);
  }
};

// Zoom controls
const zoomIn = () => {
  if (wavesurfer.value) {
    zoomLevel.value = Math.min(zoomLevel.value + 10, 100);
    wavesurfer.value.zoom(zoomLevel.value);
  }
};

const zoomOut = () => {
  if (wavesurfer.value) {
    zoomLevel.value = Math.max(zoomLevel.value - 10, 10);
    wavesurfer.value.zoom(zoomLevel.value);
  }
};

// Segment controls
const startSegment = () => {
  if (!wavesurfer.value) return;
  
  segmentStart.value = wavesurfer.value.getCurrentTime();
  isSegmenting.value = true;
  segmentReady.value = false;
  
  // Add a marker at the start position
  wavesurfer.value.addRegion({
    id: 'segment-start',
    start: segmentStart.value,
    color: 'rgba(255, 0, 0, 0.3)',
  });
};

const endSegment = () => {
  if (!wavesurfer.value || !isSegmenting.value) return;
  
  segmentEnd.value = wavesurfer.value.getCurrentTime();
  
  // Ensure start time is before end time
  if (segmentEnd.value <= segmentStart.value) {
    const temp = segmentStart.value;
    segmentStart.value = segmentEnd.value;
    segmentEnd.value = temp;
  }
  
  isSegmenting.value = false;
  segmentReady.value = true;
  
  // Update the region to show the full segment
  wavesurfer.value.regions.list['segment-start'].update({
    end: segmentEnd.value,
  });
};

const cancelSegment = () => {
  if (!wavesurfer.value) return;
  
  isSegmenting.value = false;
  segmentReady.value = false;
  
  // Remove the marker
  if (wavesurfer.value.regions.list['segment-start']) {
    wavesurfer.value.regions.list['segment-start'].remove();
  }
};

const saveSegment = () => {
  if (!segmentReady.value || !segmentStart.value || !segmentEnd.value) return;
  
  const newSegment = {
    start: segmentStart.value,
    end: segmentEnd.value,
    duration: segmentEnd.value - segmentStart.value,
  };
  
  segments.value.push(newSegment);
  emit('segmentCreated', newSegment);
  
  // Reset segment state
  segmentReady.value = false;
  
  // Remove the temporary region
  if (wavesurfer.value.regions.list['segment-start']) {
    wavesurfer.value.regions.list['segment-start'].remove();
  }
  
  // Add a permanent region for this segment
  wavesurfer.value.addRegion({
    id: `segment-${segments.value.length - 1}`,
    start: newSegment.start,
    end: newSegment.end,
    color: 'rgba(0, 128, 0, 0.2)',
    drag: false,
    resize: false,
  });
};

const playSegment = (segment) => {
  if (!wavesurfer.value) return;
  
  wavesurfer.value.play(segment.start, segment.end);
};

const deleteSegment = (index) => {
  if (!wavesurfer.value) return;
  
  // Remove the region
  const regionId = `segment-${index}`;
  if (wavesurfer.value.regions.list[regionId]) {
    wavesurfer.value.regions.list[regionId].remove();
  }
  
  // Remove the segment from the array
  const removedSegment = segments.value.splice(index, 1)[0];
  emit('segmentDeleted', removedSegment);
  
  // Rename the remaining regions to match their new indices
  segments.value.forEach((segment, i) => {
    const oldId = `segment-${i + (i >= index ? 1 : 0)}`;
    if (wavesurfer.value.regions.list[oldId]) {
      const region = wavesurfer.value.regions.list[oldId];
      const newRegion = wavesurfer.value.addRegion({
        id: `segment-${i}`,
        start: region.start,
        end: region.end,
        color: 'rgba(0, 128, 0, 0.2)',
        drag: false,
        resize: false,
      });
      region.remove();
    }
  });
};
</script>

<style scoped>
.waveform-player {
  background-color: var(--bg-panel);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.waveform-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 8px;
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

.time-display {
  font-size: 0.85rem;
  color: var(--text-secondary);
  min-width: 110px;
}

.zoom-controls {
  display: flex;
  gap: 4px;
}

.zoom-btn {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: none;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.zoom-btn:hover {
  background: var(--bg-hover);
}

.playback-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.secondary-controls {
  display: flex;
  align-items: center;
  gap: 16px;
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

.waveform-container {
  width: 100%;
  height: 100px;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
}

.segment-controls {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 8px 0;
  border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
}

.segment-controls-group {
  display: flex;
  gap: 8px;
}

.segment-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 4px;
  border: none;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  min-width: 70px;
  justify-content: center;
}

.save-btn {
  background-color: var(--accent-secondary, #4a6fa5);
  color: white;
}

.btn-text {
  font-size: 0.85rem;
}

.segment-btn:hover:not(:disabled) {
  background-color: var(--bg-hover);
}

.segment-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.segments-list {
  margin-top: 16px;
}

.segment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  margin-bottom: 8px;
}

.segment-info {
  display: flex;
  flex-direction: column;
}

.segment-time {
  font-weight: 500;
}

.segment-duration {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.segment-actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-btn:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}
</style>
