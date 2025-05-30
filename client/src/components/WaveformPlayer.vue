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
      <button class="control-icon-btn" @click="startSegment" :disabled="isSegmenting" title="Start Cut">
        <span class="material-symbols-outlined">content_cut</span>
      </button>
      <button class="control-icon-btn" @click="endSegment" :disabled="!isSegmenting" title="End Cut">
        <span class="material-symbols-outlined">check</span>
      </button>
      <button class="control-icon-btn" @click="cancelSegment" :disabled="!isSegmenting" title="Cancel Cut">
        <span class="material-symbols-outlined">close</span>
      </button>
      <button class="control-icon-btn save-btn" @click="saveSegment" :disabled="!segmentReady" title="Save Segment">
        <span class="material-symbols-outlined">save</span>
      </button>
    </div>
    
    <div v-if="segments.length > 0" class="segments-list">
      <h3>Segments</h3>
      <div v-for="(segment, index) in segments" :key="index" class="segment-item">
        <div class="segment-header">
          <div class="segment-info">
            <span class="segment-time">{{ formatTime(segment.start) }} - {{ formatTime(segment.end) }}</span>
            <span class="segment-duration">({{ formatTime(segment.end - segment.start) }})</span>
          </div>
          <div class="segment-actions">
            <button class="action-btn" @click="playSegment(segment)" title="Play this segment">
              <span class="material-symbols-outlined">play_arrow</span>
            </button>
            <button class="action-btn" @click="transcribeSegment(index)" title="Auto-transcribe this segment">
              <span class="material-symbols-outlined">mic</span>
            </button>
            <button class="action-btn" @click="deleteSegment(index)" title="Delete this segment">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
        
        <!-- Transcription input directly in the segment -->
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

const emit = defineEmits(['segmentCreated', 'segmentDeleted', 'transcribeSegment']);

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
    transcription: '',
    isTranscribing: false
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

const transcribeSegment = (index) => {
  if (index < 0 || index >= segments.value.length) return;
  
  const segment = segments.value[index];
  
  // Set transcribing state
  segment.isTranscribing = true;
  
  // Simulate transcription (in a real app, this would call an API)
  setTimeout(() => {
    // Update with simulated transcription
    segment.transcription = `Transcription for segment from ${formatTime(segment.start)} to ${formatTime(segment.end)}`;
    segment.isTranscribing = false;
  }, 1500);
};

const deleteSegment = (index) => {
  if (index < 0 || index >= segments.value.length) return;
  
  const segmentToDelete = segments.value[index];
  
  // Remove the region from the waveform
  const regionId = `segment-${index}`;
  if (wavesurfer.value.regions.list[regionId]) {
    wavesurfer.value.regions.list[regionId].remove();
  }
  
  // Remove the segment from the array
  segments.value.splice(index, 1);
  
  // Emit the delete event
  emit('segmentDeleted', segmentToDelete);
  
  // Renumber the remaining regions
  Object.keys(wavesurfer.value.regions.list).forEach(id => {
    if (id.startsWith('segment-')) {
      const oldIndex = parseInt(id.split('-')[1]);
      if (oldIndex > index) {
        const region = wavesurfer.value.regions.list[id];
        const newId = `segment-${oldIndex - 1}`;
        
        // Create a new region with the updated ID
        wavesurfer.value.addRegion({
          id: newId,
          start: region.start,
          end: region.end,
          color: 'rgba(0, 128, 0, 0.2)',
          drag: false,
          resize: false,
        });
        
        // Remove the old region
        region.remove();
      }
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
  font-family: monospace;
  color: var(--text-secondary);
}

.secondary-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.zoom-controls {
  display: flex;
  gap: 5px;
}

.zoom-btn {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
}

.volume-slider {
  width: 80px;
}

.waveform-container {
  position: relative;
  height: 100px;
  background-color: var(--bg-element);
  border-radius: 4px;
  overflow: hidden;
}

.waveform {
  width: 100%;
  height: 100%;
}

.segment-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
}

.control-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: var(--text-primary);
  width: 40px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.control-icon-btn .material-symbols-outlined {
  font-size: 20px;
}

.control-icon-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.1);
}

.control-icon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.save-btn {
  background-color: var(--accent-primary, #4a6fa5);
  color: white;
}

/* Segments list styles */
.segments-list {
  margin-top: 20px;
}

.segments-list h3 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.segment-item {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-element);
  border-radius: 6px;
  margin-bottom: 10px;
  overflow: hidden;
}

.segment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.1);
}

.segment-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.segment-time {
  font-weight: 500;
  color: var(--text-primary);
}

.segment-duration {
  font-size: 0.8em;
  color: var(--text-secondary);
}

.segment-actions {
  display: flex;
  gap: 5px;
}

.action-btn {
  background-color: transparent;
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
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
}

/* Transcription styles */
.segment-loading {
  display: flex;
  align-items: center;
  padding: 10px;
  color: var(--text-secondary);
  font-style: italic;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(100, 149, 237, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  margin-right: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.segment-transcription {
  padding: 10px;
}

.segment-input {
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-input, #1e1e1e);
  color: var(--text-primary);
  font-family: inherit;
  resize: vertical;
}

.segment-input:focus {
  outline: none;
  border-color: var(--primary-color);
}
</style>
