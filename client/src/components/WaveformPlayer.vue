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
          <button class="control-icon-btn" @click="zoomOut" title="Zoom Out">
            <span class="material-symbols-outlined">remove</span>
          </button>
          <button class="control-icon-btn" @click="zoomIn" title="Zoom In">
            <span class="material-symbols-outlined">add</span>
          </button>
        </div>
        <div class="volume-control">
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
      <!-- Cut the highlighted portion -->
      <button class="control-icon-btn" @click="cutSegment" :disabled="!selectedRegion" title="Cut Highlighted">
        <span class="material-symbols-outlined">content_cut</span>
      </button>
      <!-- Delete everything except the highlighted portion -->
      <button class="control-icon-btn" @click="deleteOutsideSegment" :disabled="!selectedRegion" title="Delete Unhighlighted">
        <span class="material-symbols-outlined">crop</span>
      </button>
      <!-- Clear the current selection -->
      <button class="control-icon-btn" @click="clearSelection" :disabled="!selectedRegion" title="Clear Selection">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    
    <SegmentList
      v-if="segments.length > 0"
      :segments="segments"
      @play="playSegment"
      @download="downloadSegment"
      @delete="deleteSegment"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { apiUrl } from '@/services/config.js';
import SegmentList from '@/components/SegmentList.vue';
import { useWaveform } from '@/composables/useWaveform.js';
import { formatTime, formatDuration } from '@/utils/time.js';

const props = defineProps({
  audioUrl: {
    type: String,
    required: true
  },
  // Preloaded segment list for this audio source
  initialSegments: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['segmentCreated', 'segmentDeleted', 'transcribeSegment', 'outsideDeleted']);

// Waveform composable
const {
  waveformRef,
  wavesurfer,
  regionsPlugin,
  isPlaying,
  currentTime,
  duration,
  volume,
  zoomLevel,
  selectedRegion,
  segments,
  init,
  destroy,
  togglePlay,
  updateVolume,
  zoomIn,
  zoomOut,
  playBetween,
  clearSelection: clearSelectionWF,
  setSegments,
  redrawRegions,
  loadUrl,
} = useWaveform();

// Segmentation state (UI flow helpers)
const isSegmenting = ref(false);
const segmentStart = ref(null);
const segmentEnd = ref(null);
const segmentReady = ref(false);

// Initialize via composable
onMounted(() => {
  init(waveformRef.value, props.audioUrl, props.initialSegments);
});

// Clean up on component unmount
onBeforeUnmount(() => {
  destroy();
});

// redrawRegions provided by composable

// Watch for audio URL or supplied initialSegments changes
watch([
  () => props.audioUrl,
  () => props.initialSegments,
], ([newUrl, newSegments]) => {
  if (newUrl) loadUrl(newUrl);
  setSegments(newSegments || []);
  // Reset transient segmentation state
  segmentStart.value = null;
  segmentEnd.value = null;
  segmentReady.value = false;
  isSegmenting.value = false;
  redrawRegions();
});

// Time utilities imported from utils/time.js

// Playback controls
// togglePlay, updateVolume, zoomIn, zoomOut provided by composable

// Segment controls
const startSegment = () => {
  if (!wavesurfer.value) return;
  
  segmentStart.value = wavesurfer.value.getCurrentTime();
  isSegmenting.value = true;
  segmentReady.value = false;
  
  // Add a marker at the start position with a distinct color
  wavesurfer.value.addRegion({
    id: 'segment-start',
    start: segmentStart.value,
    color: 'rgba(74, 111, 165, 0.4)',
    drag: false,
    resize: false,
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
  
  // Update the region to show the full segment with clear highlighting
  if (wavesurfer.value.regions.list['segment-start']) {
    wavesurfer.value.regions.list['segment-start'].update({
      end: segmentEnd.value,
      color: 'rgba(74, 111, 165, 0.5)',  // More visible highlight
      drag: false,
      resize: false,
    });
  } else {
    // If region doesn't exist for some reason, create it
    wavesurfer.value.addRegion({
      id: 'segment-start',
      start: segmentStart.value,
      end: segmentEnd.value,
      color: 'rgba(74, 111, 165, 0.5)',  // More visible highlight
      drag: false,
      resize: false,
    });
  }
  
  console.log('Segment ready:', { start: segmentStart.value, end: segmentEnd.value, ready: segmentReady.value });
};

const cancelSegment = () => {
  if (!wavesurfer.value) return;
  
  isSegmenting.value = false;
  segmentReady.value = false;
  
  // Remove the region highlight
  if (wavesurfer.value.regions.list['segment-start']) {
    wavesurfer.value.regions.list['segment-start'].remove();
  }
};

const saveSegment = () => {
  // Double-check all required values are present
  if (!segmentReady.value) {
    console.log('Segment not ready to save');
    return;
  }
  
  // Check if start and end times are valid numbers
  // Note: We use typeof check to allow 0 as a valid start time
  if (typeof segmentStart.value !== 'number' || typeof segmentEnd.value !== 'number') {
    console.log('Invalid segment start or end time');
    return;
  }
  
  // Ensure start is before end
  let start = segmentStart.value;
  let end = segmentEnd.value;
  if (start > end) {
    [start, end] = [end, start];
  }
  
  const newSegment = {
    start: start,
    end: end,
    duration: end - start,
    transcription: '',
    isTranscribing: false
  };
  
  console.log('Saving segment:', newSegment);
  
  segments.value.push(newSegment);
  emit('segmentCreated', newSegment);
  
  // Reset segment state
  segmentReady.value = false;
  segmentStart.value = null;
  segmentEnd.value = null;
  
  // Remove the temporary region
  try {
    if (wavesurfer.value.regions.list['segment-start']) {
      wavesurfer.value.regions.list['segment-start'].remove();
    }
  } catch (error) {
    console.error('Error removing temporary region:', error);
  }
  
  // No additional cleanup needed since we're only using region highlighting
  
  // Add a permanent region for this segment
  if (regionsPlugin.value) {
    try {
      const region = regionsPlugin.value.addRegion({
        id: `segment-${segments.value.length - 1}`,
        start: newSegment.start,
        end: newSegment.end,
        color: 'rgba(74, 111, 165, 0.4)',
        drag: false,
        resize: false,
      });
      newSegment.region = region; // keep reference for future deletion
    } catch (error) {
      console.error('Error adding permanent region:', error);
    }
  }
};

const playSegment = (index) => {
  if (!wavesurfer.value || index < 0 || index >= segments.value.length) return;
  
  const segment = segments.value[index];
  playBetween(segment.start, segment.end);
};

// Helper: extract filename from /api/audio/<filename> URL
const extractFilename = (url) => {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/');
    return parts[parts.length - 1] || '';
  } catch (_) {
    // Fallback for relative URLs
    const parts = (url || '').split('/');
    return parts[parts.length - 1] || '';
  }
};

// Call backend to cut a segment and return processed file URL
const requestCut = async (start, end) => {
  const filename = extractFilename(props.audioUrl);
  if (!filename) throw new Error('Unable to determine source filename');

  const res = await fetch(apiUrl('/api/cut'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, start, end })
  });
  if (!res.ok) {
    let msg = 'Cut failed';
    try { const err = await res.json(); msg = err.error || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
};

const triggerDownload = (url) => {
  const a = document.createElement('a');
  a.href = apiUrl(url);
  a.download = '';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const downloadSegment = async (index) => {
  if (index < 0 || index >= segments.value.length) return;
  const seg = segments.value[index];
  try {
    const data = await requestCut(seg.start, seg.end);
    if (data && data.url) triggerDownload(data.url);
  } catch (e) {
    console.error('Download segment failed:', e);
    alert(`Download failed: ${e.message || e}`);
  }
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

  // Remove corresponding region
  if (segmentToDelete.region) {
    segmentToDelete.region.remove();
  } else if (regionsPlugin.value) {
    // Fallback: try to find region by id
    const target = regionsPlugin.value.getRegions().find(r => r.id === `segment-${index}`);
    if (target) target.remove();
  }

  // Remove the segment from the array
  segments.value.splice(index, 1);

  // Emit the delete event
  emit('segmentDeleted', segmentToDelete);
};
// Clear the current region selection
const clearSelection = () => {
  clearSelectionWF();
  // No further action needed – permanent regions remain; temporary selection is cleared above
};

// Cut (keep) the highlighted segment and emit it as a new saved segment
const cutSegment = async () => {
  if (!selectedRegion.value) return;
  const { start, end } = selectedRegion.value;
  const newSegment = {
    start,
    end,
    duration: end - start,
    transcription: '',
    isTranscribing: false
  };
  segments.value.push(newSegment);
  emit('segmentCreated', newSegment);

  // Add permanent region for this cut
  if (regionsPlugin.value) {
    try {
      const region = regionsPlugin.value.addRegion({
        id: `segment-${segments.value.length - 1}`,
        start,
        end,
        color: 'rgba(74, 111, 165, 0.4)',
        drag: false,
        resize: false,
      });
      newSegment.region = region;
    } catch (e) { console.error('addRegion fail', e); }
  }

  clearSelection();

  // Optionally request backend cut immediately and prompt user to download
  try {
    const data = await requestCut(start, end);
    if (data && data.url) {
      // Offer immediate download for convenience
      triggerDownload(data.url);
    }
  } catch (e) {
    console.warn('Backend cut failed:', e);
  }
};

// Delete everything outside the highlighted region (emit event for parent or caller to handle)
const deleteOutsideSegment = () => {
  if (!selectedRegion.value) return;
  const { start, end } = selectedRegion.value;
  emit('outsideDeleted', { start, end });
  clearSelection();
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
  -webkit-appearance: none;
  appearance: none;
  height: 3px;
  background: var(--text-secondary, #a0a0a0);
  border-radius: 1px;
  outline: none;
  overflow: hidden;
}

/* Create a subtle volume level indicator */
.volume-slider::-webkit-slider-runnable-track {
  height: 3px;
  background: var(--text-secondary, #a0a0a0);
}

.volume-slider::-moz-range-track {
  height: 3px;
  background: var(--text-secondary, #a0a0a0);
}

/* Small minimal thumb that's visible but not obtrusive */
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 2px;
  height: 10px;
  background: white;
  cursor: pointer;
  border-radius: 0;
  box-shadow: -80px 0 0 80px var(--accent-primary, #4a6fa5);
}

.volume-slider::-moz-range-thumb {
  width: 2px;
  height: 10px;
  background: white;
  cursor: pointer;
  border: none;
  border-radius: 0;
  box-shadow: -80px 0 0 80px var(--accent-primary, #4a6fa5);
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
  color: var(--text-primary, #e0e0e0);
  width: 36px;
  height: 36px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-icon-btn .material-symbols-outlined {
  font-size: 18px;
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}

.control-icon-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--accent-primary, #4a6fa5);
}

.control-icon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Save button styling removed to match theme */

/* Segment visualization styles */
.segment-marker-label {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  top: 10px;
  left: 10px;
  z-index: 5;
  pointer-events: none;
}

.segment-info-display {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  bottom: 10px;
  right: 10px;
  z-index: 5;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-left: 3px solid var(--accent-primary, #4a6fa5);
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
  gap: 4px;
}

.segment-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  color: var(--text-primary, #e0e0e0);
  width: 32px;
  height: 32px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.segment-action-btn .material-symbols-outlined {
  font-size: 16px;
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}

.segment-action-btn:hover {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--accent-primary, #4a6fa5);
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
