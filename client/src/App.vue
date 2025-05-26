<script setup>
// Import the Vue Router
import { onMounted } from 'vue';
import '@/styles/variables.css';
import '@/styles/app-layout.css';

// Add Material Icons Google Font
onMounted(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Inter:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(link);
});
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
      <section class="panel sources-panel">
        <div class="panel-inner">
          <div class="panel-header">
            <h2>Sources</h2>
            <div class="panel-collapse-btn">
              <span class="material-symbols-outlined">chevron_left</span>
            </div>
          </div>

          <div class="panel-actions">
            <button class="panel-action-btn">
              <span class="material-symbols-outlined">add</span>
              <span>Add</span>
            </button>
            <button class="panel-action-btn">
              <span class="material-symbols-outlined">search</span>
              <span>Discover</span>
            </button>
          </div>

          <div class="select-all-row">
            <span>Select all sources</span>
            <label class="checkbox">
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>

          <div class="source-list">
            <div class="source-item">
              <span
                class="source-type material-symbols-outlined"
                style="color: var(--accent-red)"
                >mic</span
              >
              <span class="source-name">Interview_001.mp3</span>
              <label class="checkbox">
                <input type="checkbox" checked />
                <span class="checkmark"></span>
              </label>
            </div>

            <div class="source-item">
              <span
                class="source-type material-symbols-outlined"
                style="color: var(--accent-blue)"
                >description</span
              >
              <span class="source-name">Meeting_Notes.mp3</span>
              <label class="checkbox">
                <input type="checkbox" checked />
                <span class="checkmark"></span>
              </label>
            </div>

            <div class="source-item">
              <span
                class="source-type material-symbols-outlined"
                style="color: var(--accent-blue)"
                >description</span
              >
              <span class="source-name">Lecture_Series.mp3</span>
              <label class="checkbox">
                <input type="checkbox" checked />
                <span class="checkmark"></span>
              </label>
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

          <div class="chat-input">
            <div class="input-container">
              <input type="text" placeholder="Start typing..." />
              <button class="send-btn">
                <span class="material-symbols-outlined">send</span>
              </button>
            </div>
            <div class="suggestion-chips">
              <button class="suggestion-chip">
                How effectively does SonicScript handle background noise?
              </button>
              <button class="suggestion-chip">
                What are the main features?
              </button>
            </div>
          </div>

          <div class="content-footer">
            <p>
              SonicScript may be inaccurate; please double check its responses.
            </p>
          </div>
        </div>
      </section>

      <!-- Right Panel - Studio -->
      <section class="panel studio-panel">
        <div class="panel-inner">
          <div class="panel-header">
            <h2>Studio</h2>
            <div class="panel-collapse-btn">
              <span class="material-symbols-outlined">chevron_right</span>
            </div>
          </div>

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
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Additional component-specific styles */
.app-container {
  font-family: 'Inter', sans-serif;
}

.panel {
  border-radius: var(--radius-lg);
  margin: var(--spacing-md);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  background-color: var(--bg-card);
}

.panel-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-darker);
}

.panel-header h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.panel-collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--text-tertiary);
}

.panel-collapse-btn:hover {
  background-color: var(--hover-overlay);
  color: var(--text-secondary);
}

.panel-actions {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--divider-color);
}

.panel-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-highlight);
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.panel-action-btn:hover {
  background-color: var(--hover-overlay);
}

.select-all-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  color: var(--text-tertiary);
  font-size: 13px;
  border-bottom: 1px solid var(--divider-color);
}

.source-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--divider-color);
  transition: background-color var(--transition-fast);
}

.source-item:hover {
  background-color: var(--hover-overlay);
}

.source-type {
  margin-right: var(--spacing-md);
}

.source-name {
  flex: 1;
  font-size: 14px;
  color: var(--text-secondary);
}

/* Content panel styling */
.content-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.content-panel-inner {
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.content-header {
  margin-bottom: var(--spacing-xl);
}

.content-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.app-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--accent-blue);
  border-radius: var(--radius-md);
  color: white;
}

.content-title h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 20px;
  font-weight: 600;
}

.content-title p {
  margin: 0;
  color: var(--text-tertiary);
  font-size: 14px;
}

.content-description {
  margin-bottom: var(--spacing-xl);
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.primary-action-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--accent-blue);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.primary-action-btn:hover {
  background-color: var(--accent-blue-dark);
  box-shadow: var(--shadow-md);
}

.tools-row {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-highlight);
  color: var(--text-secondary);
  border: none;
  border-radius: var(--radius-md);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tool-btn:hover {
  background-color: var(--hover-overlay);
  color: var(--text-primary);
}

/* Transcription segments */
.transcription-segments {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.segment {
  background-color: var(--bg-card);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.segment:hover {
  box-shadow: var(--shadow-md);
}

.segment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: rgba(255, 255, 255, 0.03);
}

.segment-time {
  font-size: 13px;
  color: var(--text-tertiary);
}

.segment-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.segment-btn {
  background: transparent;
  border: none;
  color: var(--text-tertiary);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.segment-btn:hover {
  background-color: var(--hover-overlay);
  color: var(--text-primary);
}

.segment-btn.save {
  color: var(--accent-green);
}

.segment-content {
  padding: var(--spacing-lg);
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.5;
}

.segment-input {
  width: 100%;
  min-height: 80px;
  padding: var(--spacing-lg);
  background-color: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  font-family: inherit;
}

.segment-input:focus {
  outline: none;
}

.segment.completed {
  border-left: 3px solid var(--accent-green);
}

.segment.active {
  border-left: 3px solid var(--accent-blue);
}

.segment.untranscribed {
  border-left: 3px solid var(--text-disabled);
}

.transcribe-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-highlight);
  color: var(--text-secondary);
  border: none;
  border-radius: var(--radius-md);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.transcribe-btn:hover {
  background-color: var(--accent-blue);
  color: white;
}

/* Chat input */
.chat-input {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.input-container {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.input-container input {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
}

.input-container input:focus {
  outline: none;
  border-color: var(--accent-blue-lighter);
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--accent-blue);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.send-btn:hover {
  background-color: var(--accent-blue-dark);
}

.suggestion-chips {
  display: flex;
  gap: var(--spacing-sm);
  overflow-x: auto;
  padding-bottom: var(--spacing-sm);
}

.suggestion-chip {
  white-space: nowrap;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-card);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: 100px;
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.suggestion-chip:hover {
  background-color: var(--hover-overlay);
  color: var(--text-primary);
}

.content-footer {
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-tertiary);
  text-align: center;
}

/* Studio panel styling */
.studio-panel {
  width: 340px;
  overflow-y: auto;
}

.studio-section {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--divider-color);
}

.studio-header {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.option-group {
  margin-bottom: var(--spacing-lg);
}

.option-group h4 {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 var(--spacing-md) 0;
  color: var(--text-secondary);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
}

.custom-columns {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.custom-column {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.custom-column input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 14px;
}

.custom-column input:focus {
  outline: none;
  border-color: var(--accent-blue-lighter);
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: transparent;
  color: var(--text-tertiary);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.remove-btn:hover {
  background-color: var(--hover-overlay);
  color: var(--accent-red);
}

.add-column-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: transparent;
  color: var(--accent-blue);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-sm);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.add-column-btn:hover {
  background-color: var(--hover-overlay);
  border-color: var(--accent-blue-lighter);
}

.preview-container {
  margin-top: var(--spacing-lg);
}

.preview-table {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.preview-row {
  display: flex;
  border-bottom: 1px solid var(--border-color);
}

.preview-row:last-child {
  border-bottom: none;
}

.preview-row.header {
  background-color: var(--bg-highlight);
}

.preview-cell {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 13px;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.preview-row.header .preview-cell {
  font-weight: 500;
  color: var(--text-primary);
}

.export-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--accent-green);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-normal);
  width: 100%;
  margin-top: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

.export-btn:hover {
  background-color: var(--success-light);
  box-shadow: var(--shadow-md);
}
</style>
