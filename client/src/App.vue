<script setup>
// Import the Vue Router
import { onMounted, ref, computed, watch, onBeforeUnmount } from "vue";
import "@/styles/variables.css";
import "@/styles/app-layout.css";
import "@/styles/app-component.css";
import SourceItem from "./components/SourceItem.vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import WaveformPlayer from "./components/WaveformPlayer.vue";

// Panel collapse state
const sourcesPanelCollapsed = ref(false);
const studioPanelCollapsed = ref(false);

// Window size tracking
const windowWidth = ref(window.innerWidth);

// Source items
const sources = ref([]);

// Selected audio source for waveform display
const selectedAudioSource = ref(null);
const audioSegments = ref([]);

// Window resize handler
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Add event listeners for window resize
onMounted(() => {
  window.addEventListener("resize", handleResize);

  // Add Google Material Symbols font
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Inter:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(link);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const toggleSourcesPanel = () => {
  sourcesPanelCollapsed.value = !sourcesPanelCollapsed.value;
};

const toggleStudioPanel = () => {
  studioPanelCollapsed.value = !studioPanelCollapsed.value;
};

// Handle source operations
const handleSourceSelect = (id, shouldSelect) => {
  sources.value.forEach((src) => {
    if (src.id === id) {
      src.selected = shouldSelect;
      if (shouldSelect && src.type === 'audio' && src.url) {
        selectedAudioSource.value = src;
      } else if (!shouldSelect && selectedAudioSource.value && selectedAudioSource.value.id === id) {
        selectedAudioSource.value = null;
      }
    } else {
      src.selected = false;
    }
  });
};

const handleSourceEdit = (id) => {
  console.log(`Edit source ${id}`);
};

const handleSourceDelete = (id) => {
  // Find the index of the source to delete
  const index = sources.value.findIndex((source) => source.id === id);

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
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

// Handle segment creation from WaveformPlayer
const handleSegmentCreated = (segment) => {
  audioSegments.value.push({
    ...segment,
    transcription: "",
    isTranscribing: false,
    isEditing: true // Start in editing mode
  });
  console.log("Segment created:", segment);
};

// Handle segment deletion from WaveformPlayer
const handleSegmentDeleted = (segment) => {
  console.log("Segment deleted:", segment);
  // Find the corresponding segment in the waveform player
  // This ensures the visual representation is also removed
  if (selectedAudioSource.value) {
    // The WaveformPlayer component will handle the actual removal
  }
};

// Handle transcription request for a segment
const handleTranscribeSegment = (index, segment) => {
  // Find the segment in our audioSegments array
  const segmentIndex = audioSegments.value.findIndex(s => 
    s.start === segment.start && s.end === segment.end);
  
  if (segmentIndex !== -1) {
    // Set a loading state for the segment
    audioSegments.value[segmentIndex].isTranscribing = true;
    
    // Simulate a transcription process (in a real app, this would call an API)
    setTimeout(() => {
      // Update the segment with a simulated transcription
      audioSegments.value[segmentIndex].transcription = 
        `Transcription for segment from ${formatTime(segment.start)} to ${formatTime(segment.end)}`;
      audioSegments.value[segmentIndex].isTranscribing = false;
      
      console.log("Segment transcribed:", audioSegments.value[segmentIndex]);
    }, 1500); // Simulate a delay for the transcription process
  }
};

// Play a specific segment
const playSegment = (segment) => {
  // Create an audio element to play just this segment
  if (selectedAudioSource.value && segment) {
    const audio = new Audio(selectedAudioSource.value.url);
    audio.currentTime = segment.start;
    
    // Play the segment
    audio.play();
    
    // Stop when the segment ends
    const duration = segment.end - segment.start;
    setTimeout(() => {
      audio.pause();
    }, duration * 1000);
    
    console.log('Playing segment:', segment);
  }
};

// Remove a segment from the transcription list
const removeSegment = (index) => {
  if (index >= 0 && index < audioSegments.value.length) {
    // Get the segment to be deleted for the emit event
    const segmentToDelete = audioSegments.value[index];
    
    // Remove from our local array
    audioSegments.value.splice(index, 1);
    
    // Emit event to notify WaveformPlayer to remove the segment
    if (segmentToDelete) {
      handleSegmentDeleted(segmentToDelete);
    }
  }
};

// File upload handling
const isUploading = ref(false);
const uploadProgress = ref(0);
const uploadError = ref(null);

const handleFileUpload = async () => {
  // Create a file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".mp3";

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
      formData.append("file", file);

      // Upload the file
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
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
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();

      // Add the new source to the list
      const newSource = {
        id: sources.value.length + 1,
        name: data.originalName,
        type: "audio",
        selected: true,
        url: `http://localhost:5000${data.url}`,
      };

      // Deselect any previously selected sources
      sources.value.forEach((source) => {
        source.selected = false;
      });

      sources.value.push(newSource);

      // Set as the current audio source
      selectedAudioSource.value = newSource;

      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
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
      <section
        class="panel sources-panel"
        :class="{ collapsed: sourcesPanelCollapsed }"
      >
        <div class="panel-inner">
          <div class="panel-header">
            <h2 v-if="!sourcesPanelCollapsed">Sources</h2>
            <div class="panel-collapse-btn" @click="toggleSourcesPanel">
              <span class="material-symbols-outlined">{{
                sourcesPanelCollapsed ? "chevron_right" : "chevron_left"
              }}</span>
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
              <button class="panel-action-btn" @click="handleFileUpload">
                <span class="material-symbols-outlined">add</span>
                <span>Add</span>
              </button>
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
            <div></div> <!-- Empty div to match structure of other panels -->
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
              <button
                class="primary-action-btn"
                @click="handleFileUpload"
                :disabled="isUploading"
              >
                <span class="material-symbols-outlined">upload_file</span>
                <span>{{ isUploading ? "Uploading..." : "Upload Audio" }}</span>
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
                @transcribeSegment="handleTranscribeSegment"
              />
            </div>

            <div v-else class="no-audio-selected">
              <div class="empty-state">
                <span class="material-symbols-outlined empty-icon"
                  >graphic_eq</span
                >
                <p>
                  Select an audio source from the Sources panel or upload a new
                  audio file to visualize its waveform.
                </p>
              </div>
            </div>

            <!-- Audio segments are now handled directly in the WaveformPlayer component -->
          </div>
        </div>
      </section>

      <!-- Right Panel - Studio -->
      <section
        class="panel studio-panel"
        :class="{ collapsed: studioPanelCollapsed }"
      >
        <div class="panel-inner">
          <div class="panel-header">
            <h2 v-if="!studioPanelCollapsed">Studio</h2>
            <div class="panel-collapse-btn" @click="toggleStudioPanel">
              <span class="material-symbols-outlined">{{
                studioPanelCollapsed ? "chevron_left" : "chevron_right"
              }}</span>
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
                    <!-- CSV preview rows will be dynamically generated based on actual content -->
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

/* Loading spinner for transcription */
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

/* Edit button for transcription text */
.segment-content {
  position: relative;
  padding-right: 30px; /* Make room for the edit button */
}

.edit-text-btn {
  position: absolute;
  right: 5px;
  top: 5px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  opacity: 0.5;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
}

.edit-text-btn:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.1);
}

/* Segments section */
.segments-section {
  margin-bottom: 20px;
  background-color: var(--bg-panel);
  border-radius: 8px;
  padding: 15px;
}

.segments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.segment-item {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-element);
  border-radius: 6px;
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
  color: var(--text-secondary);
  font-size: 0.9em;
}

.segment-actions {
  display: flex;
  gap: 6px;
}

.action-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
}

/* Segment transcription */
.segment-transcription {
  padding: 10px;
}

.segment-input {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-input);
  color: var(--text-primary);
  font-family: inherit;
  resize: vertical;
}

.segment-input:focus {
  outline: none;
  border-color: var(--primary-color);
}
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

.panel-icon-item:hover,
.panel-icon-item.active {
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
