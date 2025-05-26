<script setup>
// Import the Vue Router
import { onMounted, ref, computed, watch, onBeforeUnmount } from 'vue';
import '@/styles/variables.css';
import '@/styles/app-layout.css';
import '@/styles/app-component.css';

// Panel collapse state
const sourcesPanelCollapsed = ref(false);
const studioPanelCollapsed = ref(false);

// Panel width management
const sourcesWidth = ref('400px');
const studioWidth = ref('400px');
const windowWidth = ref(window.innerWidth);

// Update widths based on window size
const updateWidthsBasedOnScreenSize = () => {
  let centerSpace = windowWidth.value - 20; // Accounting for padding/gap
  
  // Always use 400px for expanded panels
  if (!sourcesPanelCollapsed.value) {
    sourcesWidth.value = '400px';
  } else {
    sourcesWidth.value = windowWidth.value <= 768 ? '40px' : '60px';
  }
  
  if (!studioPanelCollapsed.value) {
    studioWidth.value = '400px';
  } else {
    studioWidth.value = windowWidth.value <= 768 ? '40px' : '60px';
  }
  
  // Mobile sizes have already been handled above
};

// Update panel widths when collapsed state changes
watch(sourcesPanelCollapsed, (isCollapsed) => {
  if (isCollapsed) {
    sourcesWidth.value = windowWidth.value <= 768 ? '40px' : '60px';
  } else {
    sourcesWidth.value = '400px';  // Changed to 400px
  }
});

watch(studioPanelCollapsed, (isCollapsed) => {
  if (isCollapsed) {
    studioWidth.value = windowWidth.value <= 768 ? '40px' : '60px';
  } else {
    studioWidth.value = '400px';  // Changed to 400px
  }
});

// Window resize handler
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  updateWidthsBasedOnScreenSize();
};

// Watch window width changes to recalculate content panel width
watch(windowWidth, () => {
  updateWidthsBasedOnScreenSize();
});

// Add event listeners for window resize
onMounted(() => {
  window.addEventListener('resize', handleResize);
  
  // Ensure panels have correct width on initial load
  if (!sourcesPanelCollapsed.value) {
    sourcesWidth.value = '400px';
  }
  
  if (!studioPanelCollapsed.value) {
    studioWidth.value = '400px';
  }
  
  // Update other widths based on screen size
  updateWidthsBasedOnScreenSize();
  
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
        :class="{ 'collapsed': sourcesPanelCollapsed }"
        :style="{ width: sourcesWidth }"
      >
        <div class="panel-inner">
          <div class="panel-header">
            <h2>Sources</h2>
            <div class="panel-collapse-btn" @click="toggleSourcesPanel">
              <span class="material-symbols-outlined">chevron_left</span>
            </div>
          </div>

          <!-- Icon-only view (visible when collapsed) -->
          <div class="panel-icon-view" v-if="sourcesPanelCollapsed">
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

          <!-- Full panel content (hidden when collapsed) -->
          <div v-else>
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
              <div class="source-item">
                <span
                  class="source-type material-symbols-outlined"
                  style="color: var(--accent-red)"
                  >mic</span
                >
                <span class="source-name">Interview_001.mp3</span>
              </div>

              <div class="source-item">
                <span
                  class="source-type material-symbols-outlined"
                  style="color: var(--accent-blue)"
                  >description</span
                >
                <span class="source-name">Meeting_Notes.mp3</span>
              </div>

              <div class="source-item">
                <span
                  class="source-type material-symbols-outlined"
                  style="color: var(--accent-blue)"
                  >description</span
                >
                <span class="source-name">Lecture_Series.mp3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Center Panel - Content -->
      <section 
        class="panel content-panel" 
        :style="{ 
          flex: (sourcesPanelCollapsed || studioPanelCollapsed) ? '1 1 auto' : '1',
          flexGrow: sourcesPanelCollapsed && studioPanelCollapsed ? 3 : (sourcesPanelCollapsed || studioPanelCollapsed ? 2 : 1)
        }"
      >
        <div class="panel-inner">
          <div class="panel-header">
            <h2>Chat</h2>
          </div>

          <div class="content-panel-inner">
            <div class="content-header">
              <div class="content-title">
                <div class="app-icon">
                  <span class="material-symbols-outlined">keyboard_voice</span>
                </div>
                <div>
                  <h1>SonicScript: Audio Transcription Tool</h1>
                  <p>2 sources</p>
                </div>
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
              <button class="primary-action-btn">
                <span class="material-symbols-outlined">upload_file</span>
                <span>Upload Audio</span>
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

            <!-- Transcription Segments -->
            <div class="transcription-segments">
              <div class="segment completed">
                <div class="segment-header">
                  <div class="segment-time">00:00:15 - 00:00:22</div>
                  <div class="segment-actions">
                    <button class="segment-btn">
                      <span class="material-symbols-outlined">edit_note</span>
                    </button>
                    <button class="segment-btn">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <div class="segment-content">
                  Welcome to our meeting about the quarterly results. Today
                  we'll be discussing the performance of our key products.
                </div>
              </div>

              <div class="segment completed">
                <div class="segment-header">
                  <div class="segment-time">00:00:24 - 00:00:36</div>
                  <div class="segment-actions">
                    <button class="segment-btn">
                      <span class="material-symbols-outlined">edit_note</span>
                    </button>
                    <button class="segment-btn">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <div class="segment-content">
                  As you can see from the charts, our main product line has
                  shown a 15% increase in revenue compared to last quarter.
                </div>
              </div>

              <div class="segment active">
                <div class="segment-header">
                  <div class="segment-time">00:00:40 - 00:00:58</div>
                  <div class="segment-actions">
                    <button class="segment-btn save">
                      <span class="material-symbols-outlined">save</span>
                    </button>
                    <button class="segment-btn">
                      <span class="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
                <textarea
                  class="segment-input"
                  placeholder="Type what you hear in this segment..."
                >We've also seen significant growth in our new market segments, particularly in the enterprise customer category which has grown by</textarea>
              </div>

              <div class="segment untranscribed">
                <div class="segment-header">
                  <div class="segment-time">00:01:02 - 00:01:14</div>
                  <button class="transcribe-btn">
                    <span class="material-symbols-outlined">record_voice_over</span>
                    <span>Start transcribing</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Panel - Studio -->
      <section 
        class="panel studio-panel" 
        :class="{ 'collapsed': studioPanelCollapsed }"
        :style="{ width: studioWidth }"
      >
        <div class="panel-inner">
          <div class="panel-header">
            <h2>Studio</h2>
            <div class="panel-collapse-btn" @click="toggleStudioPanel">
              <span class="material-symbols-outlined">chevron_right</span>
            </div>
          </div>

          <!-- Icon-only view (visible when collapsed) -->
          <div class="panel-icon-view" v-show="studioPanelCollapsed">
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

          <!-- Full panel content (hidden when collapsed) -->
          <div v-show="!studioPanelCollapsed">
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
