<script setup>
// Import the Vue Router
import { onMounted, ref, computed, watch, onBeforeUnmount } from 'vue';
import '@/styles/variables.css';
import '@/styles/app-layout.css';
import '@/styles/app-component.css';
import SourceItem from './components/SourceItem.vue';
import AudioPlayer from './components/AudioPlayer.vue';
import WaveformPlayer from './components/WaveformPlayer.vue';

// Panel collapse state
const sourcesPanelCollapsed = ref(false);
const studioPanelCollapsed = ref(false);

// Window size tracking
const windowWidth = ref(window.innerWidth);

// Sample source items
const sources = ref([
  { id: 1, name: 'Interview_001.mp3', type: 'audio', selected: false, url: null },
  { id: 2, name: 'Meeting_Notes.mp3', type: 'document', selected: false, url: null },
  { id: 3, name: 'Lecture_Series.mp3', type: 'document', selected: false, url: null }
]);

// Selected audio source for waveform display
const selectedAudioSource = ref(null);
const audioSegments = ref([]);

// Window resize handler
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Add event listeners for window resize
onMounted(() => {
  window.addEventListener('resize', handleResize);
  
  // Add Google Material Symbols font
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Inter:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(link);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const toggleSourcesPanel = () => {
  sourcesPanelCollapsed.value = !sourcesPanelCollapsed.value;
};

const toggleStudioPanel = () => {
  studioPanelCollapsed.value = !studioPanelCollapsed.value;
};

// Handle source operations
const handleSourceSelect = (id, selected) => {
  const index = sources.value.findIndex(source => source.id === id);
  if (index !== -1) {
    sources.value[index].selected = selected;
    
    // If selected and it's an audio file, set it as the current audio source
    if (selected && sources.value[index].type === 'audio' && sources.value[index].url) {
      selectedAudioSource.value = sources.value[index];
    } else if (!selected && selectedAudioSource.value && selectedAudioSource.value.id === id) {
      // If deselected and it was the current audio source, clear it
      selectedAudioSource.value = null;
    }
  }
};

const handleSourceEdit = (id) => {
  console.log(`Edit source ${id}`);
};

const handleSourceDelete = (id) => {
  // Find the index of the source to delete
  const index = sources.value.findIndex(source => source.id === id);
  
  // If the source exists, remove it from the array
  if (index !== -1) {
    // If it's the selected audio source, clear it
    if (selectedAudioSource.value && selectedAudioSource.value.id === id) {
      selectedAudioSource.value = null;
      audioSegments.value = [];
    }
    
    sources.value.splice(index, 1);
    console.log(`Deleted source ${id}`);
  }
};

// Format time in mm:ss format
const formatTime = (seconds) => {
  if (isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Handle segment creation from WaveformPlayer
const handleSegmentCreated = (segment) => {
  audioSegments.value.push({
    ...segment,
    transcription: ''
  });
  console.log('Segment created:', segment);
};

// Handle segment deletion from WaveformPlayer
const handleSegmentDeleted = (segment) => {
  console.log('Segment deleted:', segment);
};

// Remove a segment from the transcription list
const removeSegment = (index) => {
  if (index >= 0 && index < audioSegments.value.length) {
    audioSegments.value.splice(index, 1);
  }
};

// File upload handling
const isUploading = ref(false);
const uploadProgress = ref(0);
const uploadError = ref(null);

const handleFileUpload = async () => {
  // Create a file input element
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.mp3';
  
  // Handle file selection
  fileInput.onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      isUploading.value = true;
      uploadError.value = null;
      uploadProgress.value = 0;
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload the file
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
        // Track upload progress
        onUploadProgress: (progressEvent) => {
          uploadProgress.value = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const data = await response.json();
      
      // Add the new source to the list
      const newSource = {
        id: sources.value.length + 1,
        name: data.originalName,
        type: 'audio',
        selected: true,
        url: `http://localhost:5000${data.url}`
      };
      
      // Deselect any previously selected sources
      sources.value.forEach(source => {
        source.selected = false;
      });
      
      sources.value.push(newSource);
      
      // Set as the current audio source
      selectedAudioSource.value = newSource;
      
      console.log('File uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
      uploadError.value = error.message;
    } finally {
      isUploading.value = false;
    }
  };
  
  // Trigger the file input click
  fileInput.click();
};
</script>

<template>
  <div class="app-container">
    <!-- Header (top bar) -->
    <header class="top-header">
      <div class="app-branding">
        <span class="logo-icon material-symbols-outlined">graphic_eq</span>
        <span class="app-title">SonicScript</span>
      </div>

      <div class="header-actions">
        <button class="action-btn">
          <span class="material-symbols-outlined">share</span>
          <span>Share</span>
        </button>
        <button class="action-btn">
          <span class="material-symbols-outlined">settings</span>
        </button>
        <div class="user-avatar">
          <img src="https://i.pravatar.cc/32" alt="User" />
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Left Panel - Sources -->
      <section class="panel sources-panel" :class="{ 'collapsed': sourcesPanelCollapsed }">
        <div class="panel-inner">
          <div class="panel-header">
            <h2 v-if="!sourcesPanelCollapsed">Sources</h2>
            <div class="panel-collapse-btn" @click="toggleSourcesPanel">
              <span class="material-symbols-outlined">{{ sourcesPanelCollapsed ? 'chevron_right' : 'chevron_left' }}</span>
            </div>
          </div>

          <!-- Collapsed View -->
          <div v-if="sourcesPanelCollapsed" class="panel-icon-view">
            <div class="panel-icon-item active">
              <span class="material-symbols-outlined">description</span>
            </div>
            <div class="panel-icon-item">
              <span class="material-symbols-outlined">mic</span>
            </div>
            <div class="panel-icon-item">
              <span class="material-symbols-outlined">folder</span>
            </div>
          </div>

          <!-- Expanded View -->
          <div v-else class="panel-content">
            <div class="panel-actions">
              <button class="panel-action-btn">
                <span class="material-symbols-outlined">add</span>
                <span>Add</span>
              </button>
            </div>

            <div class="select-all-row">
              <span>Select all sources</span>
            </div>

            <div class="source-list">
              <!-- Using our new SourceItem component -->
              <SourceItem 
                v-for="source in sources" 
                :key="source.id"
                :name="source.name"
                :type="source.type"
                :selected="source.selected"
                @select="(selected) => handleSourceSelect(source.id, selected)"
                @edit="handleSourceEdit(source.id)"
                @delete="handleSourceDelete(source.id)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Center Panel - Content -->
      <section class="panel content-panel">
        <div class="panel-inner">
          <div class="panel-header">
            <h2>Chat</h2>
          </div>
          
          <div class="panel-content">
            <div class="content-title">
              <div class="app-icon">
                <span class="material-symbols-outlined">keyboard_voice</span>
              </div>
              <div>
                <h1>SonicScript: Audio Transcription Tool</h1>
                <p>2 sources</p>
              </div>
            </div>

            <div class="content-description">
              <p>
                Upload MP3 files for transcription and preprocessing. Visualize
                audio waveforms, cut segments at specific timestamps, and
                transcribe content. All transcriptions and metadata will be
                automatically saved to CSV files.
              </p>
            </div>

            <div class="action-buttons">
              <button class="primary-action-btn" @click="handleFileUpload" :disabled="isUploading">
                <span class="material-symbols-outlined">upload_file</span>
                <span>{{ isUploading ? 'Uploading...' : 'Upload Audio' }}</span>
              </button>
              <button class="primary-action-btn">
                <span class="material-symbols-outlined">download</span>
                <span>Export CSV</span>
              </button>
            </div>

            <div class="tools-row">
              <button class="tool-btn">
                <span class="material-symbols-outlined">auto_fix_normal</span>
                <span>Auto-detect segments</span>
              </button>
              <button class="tool-btn">
                <span class="material-symbols-outlined">music_off</span>
                <span>Remove silence</span>
              </button>
              <button class="tool-btn">
                <span class="material-symbols-outlined">monitoring</span>
                <span>Analyze audio</span>
              </button>
            </div>

            <!-- Audio Waveform Player -->
            <div v-if="selectedAudioSource" class="audio-waveform-section">
              <h3 class="section-title">Audio Waveform</h3>
              <WaveformPlayer 
                :audioUrl="selectedAudioSource.url" 
                @segmentCreated="handleSegmentCreated"
                @segmentDeleted="handleSegmentDeleted"
              />
            </div>
            
            <div v-else class="no-audio-selected">
              <div class="empty-state">
                <span class="material-symbols-outlined empty-icon">graphic_eq</span>
                <p>Select an audio source from the Sources panel or upload a new audio file to visualize its waveform.</p>
              </div>
            </div>
            
            <!-- Transcription Segments -->
            <div v-if="audioSegments.length > 0" class="transcription-segments">
              <h3 class="section-title">Transcription Segments</h3>
              <div v-for="(segment, index) in audioSegments" :key="index" class="segment completed">
                <div class="segment-header">
                  <div class="segment-time">{{ formatTime(segment.start) }} - {{ formatTime(segment.end) }}</div>
                  <div class="segment-actions">
                    <button class="segment-btn">
                      <span class="material-symbols-outlined">edit_note</span>
                    </button>
                    <button class="segment-btn" @click="removeSegment(index)">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <div class="segment-content" v-if="segment.transcription">
                  {{ segment.transcription }}
                </div>
                <textarea
                  v-else
                  class="segment-input"
                  placeholder="Type what you hear in this segment..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Panel - Studio -->
      <section class="panel studio-panel" :class="{ 'collapsed': studioPanelCollapsed }">
        <div class="panel-inner">
          <div class="panel-header">
            <h2 v-if="!studioPanelCollapsed">Studio</h2>
            <div class="panel-collapse-btn" @click="toggleStudioPanel">
              <span class="material-symbols-outlined">{{ studioPanelCollapsed ? 'chevron_left' : 'chevron_right' }}</span>
            </div>
          </div>

          <!-- Collapsed View -->
          <div v-if="studioPanelCollapsed" class="panel-icon-view">
            <div class="panel-icon-item active">
              <span class="material-symbols-outlined">tune</span>
            </div>
            <div class="panel-icon-item">
              <span class="material-symbols-outlined">note</span>
            </div>
            <div class="panel-icon-item">
              <span class="material-symbols-outlined">analytics</span>
            </div>
          </div>

          <!-- Expanded View -->
          <div v-else class="panel-content">
            <!-- CSV Export Configuration -->
            <div class="studio-section">
              <div class="studio-header">CSV Export</div>

              <div class="section-content">
                <div class="option-group">
                  <h4>Include Metadata</h4>
                  <div class="checkbox-group">
                    <label class="checkbox-label">
                      <input type="checkbox" checked />
                      <span>Duration</span>
                    </label>
                    <label class="checkbox-label">
                      <input type="checkbox" checked />
                      <span>Sample Rate</span>
                    </label>
                    <label class="checkbox-label">
                      <input type="checkbox" checked />
                      <span>Timestamp</span>
                    </label>
                    <label class="checkbox-label">
                      <input type="checkbox" />
                      <span>Speaker</span>
                    </label>
                  </div>
                </div>

                <div class="option-group">
                  <h4>Custom Columns</h4>
                  <div class="custom-columns">
                    <div class="custom-column">
                      <input
                        type="text"
                        placeholder="Column name"
                        value="Notes"
                      />
                      <button class="remove-btn">
                        <span class="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <div class="custom-column">
                      <input
                        type="text"
                        placeholder="Column name"
                        value="Keywords"
                      />
                      <button class="remove-btn">
                        <span class="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <button class="add-column-btn">
                      <span class="material-symbols-outlined">add_circle</span>
                      <span>Add column</span>
                    </button>
                  </div>
                </div>

                <div class="preview-container">
                  <h4>CSV Preview</h4>
                  <div class="preview-table">
                    <div class="preview-row header">
                      <div class="preview-cell">File</div>
                      <div class="preview-cell">Start</div>
                      <div class="preview-cell">End</div>
                      <div class="preview-cell">Transcript</div>
                      <div class="preview-cell">Keywords</div>
                    </div>
                    <div class="preview-row">
                      <div class="preview-cell">Interview_001.mp3</div>
                      <div class="preview-cell">00:00:15</div>
                      <div class="preview-cell">00:00:22</div>
                      <div class="preview-cell">Welcome to our...</div>
                      <div class="preview-cell">meeting, intro</div>
                    </div>
                  </div>
                </div>

                <button class="export-btn">
                  <span class="material-symbols-outlined">task_alt</span>
                  <span>Save CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* App-specific scoped styles */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-dark);
}

.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: var(--bg-header);
  border-bottom: 1px solid var(--border-color);
  height: 60px;
}

.app-branding {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  color: var(--accent-primary);
  font-size: 24px;
}

.app-title {
  font-weight: 600;
  font-size: 18px;
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.panel {
  height: 100%;
  transition: width 0.3s ease;
  overflow: hidden;
}

.panel-inner {
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.panel-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.panel-collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-secondary);
}

.panel-collapse-btn:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.sources-panel {
  background-color: var(--bg-panel);
  border-right: 1px solid var(--border-color);
}

.sources-panel.collapsed .panel-collapse-btn span {
  transform: rotate(180deg);
}

.studio-panel {
  background-color: var(--bg-panel);
  border-left: 1px solid var(--border-color);
}

.studio-panel.collapsed .panel-collapse-btn span {
  transform: rotate(180deg);
}

.content-panel {
  background-color: var(--bg-content);
  padding: 20px;
  overflow-y: auto;
}

.panel-icon-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}

.panel-icon-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--text-secondary);
}

.panel-icon-item:hover, .panel-icon-item.active {
  background-color: var(--bg-selected);
  color: var(--accent-primary);
}

.panel-actions {
  margin-bottom: 16px;
}

.panel-action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: var(--accent-primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  justify-content: center;
}

.panel-action-btn:hover {
  background-color: var(--accent-primary-hover);
}

.select-all-row {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  background-color: var(--bg-secondary);
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
}

.select-all-row:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

.source-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.content-area {
  max-width: 800px;
  margin: 0 auto;
}

.content-area h1 {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
}

.audio-controls-wrapper {
  margin-bottom: 24px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .action-btn span:not(.material-symbols-outlined) {
    display: none;
  }
}

/* Audio waveform section styles */
.audio-waveform-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.no-audio-selected {
  background-color: var(--bg-panel);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px 16px;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: var(--accent-primary);
}

.empty-state p {
  max-width: 400px;
  line-height: 1.5;
}
</style>
