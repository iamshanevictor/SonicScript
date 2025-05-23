<script setup>
// Import the Vue Router
</script>

<template>
  <div class="app-container">
    <!-- Header (top bar) -->
    <header class="top-header">
      <div class="app-branding">
        <span class="logo-icon material-symbols-outlined">cycle</span>
        <span class="app-title">SonicScript</span>
      </div>
      
      <div class="header-actions">
        <button class="action-btn">
          <span class="material-symbols-outlined">lock</span>
          <span>Share</span>
        </button>
        <button class="action-btn">
          <span class="material-symbols-outlined">settings</span>
        </button>
        <button class="action-btn">
          <span class="material-symbols-outlined">apps</span>
        </button>
        <div class="user-avatar">
          <img src="https://i.pravatar.cc/32" alt="User" />
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <!-- Left Panel - Sources -->
      <section class="sources-panel">
        <div class="sources-header">
          <h2>Sources</h2>
          <button class="collapse-btn">
            <span class="material-symbols-outlined">menu_open</span>
          </button>
        </div>
        
        <div class="action-group">
          <button class="action-btn-outlined">
            <span class="material-symbols-outlined">add</span>
            <span>Add</span>
          </button>
          <button class="action-btn-outlined">
            <span class="material-symbols-outlined">search</span>
            <span>Discover</span>
          </button>
        </div>
        
        <div class="select-all">
          <span>Select all sources</span>
          <label class="checkbox">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
        </div>
        
        <div class="source-list">
          <div class="source-item">
            <span class="source-type material-symbols-outlined" style="color: rgb(235, 87, 87);">mic</span>
            <span class="source-name">Interview_001.mp3</span>
            <label class="checkbox">
              <input type="checkbox" checked>
              <span class="checkmark"></span>
            </label>
          </div>
          
          <div class="source-item">
            <span class="source-type material-symbols-outlined" style="color: rgb(79, 126, 255);">description</span>
            <span class="source-name">Meeting_Notes.mp3</span>
            <label class="checkbox">
              <input type="checkbox" checked>
              <span class="checkmark"></span>
            </label>
          </div>
          
          <div class="source-item">
            <span class="source-type material-symbols-outlined" style="color: rgb(79, 126, 255);">description</span>
            <span class="source-name">Lecture_Series.mp3</span>
            <label class="checkbox">
              <input type="checkbox" checked>
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </section>
      
      <!-- Center Panel - Chat/Content -->
      <section class="chat-panel">
        <div class="chat-header">
          <div class="app-icon-container">
            <span class="app-icon material-symbols-outlined">equalizer</span>
          </div>
          
          <div class="chat-title">
            <h1>SonicScript: Audio Transcription Tool</h1>
            <p>2 sources</p>
          </div>
        </div>
        
        <div class="chat-summary">
          <p>Upload MP3 files for transcription and preprocessing. Visualize audio waveforms, cut segments at specific timestamps, and transcribe content. All transcriptions and metadata will be automatically saved to CSV files.</p>
        </div>
        
        <div class="action-bar">
          <button class="action-btn-text">
            <span class="material-symbols-outlined">upload_file</span>
            <span>Upload Audio</span>
          </button>
          <button class="action-btn-text">
            <span class="material-symbols-outlined">file_download</span>
            <span>Export CSV</span>
          </button>
        </div>
        
        <!-- Audio Visualizer and Controls -->
        <div class="audio-visualizer-container">
          <div class="visualizer-header">
            <div class="file-info">Interview_001.mp3</div>
            <div class="visualizer-controls">
              <button class="visualizer-btn">
                <span class="material-symbols-outlined">zoom_in</span>
              </button>
              <button class="visualizer-btn">
                <span class="material-symbols-outlined">zoom_out</span>
              </button>
              <button class="visualizer-btn">
                <span class="material-symbols-outlined">unfold_more_horizontal</span>
              </button>
            </div>
          </div>
          
          <div class="audio-visualizer">
            <div class="waveform-placeholder">
              <span class="material-symbols-outlined" style="font-size: 48px;">equalizer</span>
              <span>Audio waveform visualization</span>
            </div>
          </div>
          
          <div class="audio-controls">
            <button class="audio-control-btn">
              <span class="material-symbols-outlined">play_arrow</span>
            </button>
            <button class="audio-control-btn">
              <span class="material-symbols-outlined">pause</span>
            </button>
            <div class="audio-timeline">
              <div class="audio-progress" style="width: 30%;"></div>
              <div class="timeline-marker" style="left: 20%;" title="Cut point">
                <span class="marker-line"></span>
                <span class="marker-handle"></span>
              </div>
              <div class="timeline-marker" style="left: 45%;" title="Cut point">
                <span class="marker-line"></span>
                <span class="marker-handle"></span>
              </div>
              <div class="timeline-marker" style="left: 70%;" title="Cut point">
                <span class="marker-line"></span>
                <span class="marker-handle"></span>
              </div>
            </div>
            <button class="audio-control-btn active">
              <span class="material-symbols-outlined">content_cut</span>
            </button>
            <button class="audio-control-btn">
              <span class="material-symbols-outlined">volume_up</span>
            </button>
          </div>
        </div>
        
        <div class="segment-tools">
          <div class="segment-tool">
            <span class="material-symbols-outlined">auto_awesome</span>
            <span>Auto-detect segments</span>
          </div>
          <div class="segment-tool">
            <span class="material-symbols-outlined">music_note</span>
            <span>Remove silence</span>
          </div>
          <div class="segment-tool">
            <span class="material-symbols-outlined">analytics</span>
            <span>Analyze audio</span>
          </div>
        </div>
        
        <!-- Transcription Segments -->
        <div class="transcription-container">
          <div class="transcription-segment completed">
            <div class="segment-header">
              <div class="segment-timestamp">00:00:15 - 00:00:22</div>
              <div class="segment-actions">
                <button class="edit-btn">
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="delete-btn">
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
            <div class="segment-text">
              Welcome to our meeting about the quarterly results. Today we'll be discussing the performance of our key products.
            </div>
          </div>

          <div class="transcription-segment completed">
            <div class="segment-header">
              <div class="segment-timestamp">00:00:24 - 00:00:36</div>
              <div class="segment-actions">
                <button class="edit-btn">
                  <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="delete-btn">
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
            <div class="segment-text">
              As you can see from the charts, our main product line has shown a 15% increase in revenue compared to last quarter.
            </div>
          </div>

          <div class="transcription-segment active">
            <div class="segment-header">
              <div class="segment-timestamp">00:00:40 - 00:00:58</div>
              <div class="segment-actions">
                <button class="save-btn">
                  <span class="material-symbols-outlined">save</span>
                </button>
                <button class="delete-btn">
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
            <textarea class="segment-input" placeholder="Type what you hear in this segment...">We've also seen significant growth in our new market segments, particularly in the enterprise customer category which has grown by</textarea>
          </div>
          
          <div class="transcription-segment untranscribed">
            <div class="segment-header">
              <div class="segment-timestamp">00:01:02 - 00:01:14</div>
              <button class="transcribe-btn">
                <span class="material-symbols-outlined">mic</span>
                <span>Start transcribing</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- CSV Configuration -->
        <div class="csv-configuration">
          <div class="section-title">
            <span class="material-symbols-outlined">settings</span>
            <h3>CSV Export Configuration</h3>
          </div>
          
          <div class="configuration-options">
            <div class="option-group">
              <h4>Include Metadata</h4>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" checked>
                  <span>Duration</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" checked>
                  <span>Sample Rate</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" checked>
                  <span>Timestamp</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox">
                  <span>Speaker</span>
                </label>
              </div>
            </div>
            
            <div class="option-group">
              <h4>Custom Columns</h4>
              <div class="custom-columns">
                <div class="custom-column">
                  <input type="text" placeholder="Column name" value="Notes">
                  <button class="remove-column">
                    <span class="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div class="custom-column">
                  <input type="text" placeholder="Column name" value="Keywords">
                  <button class="remove-column">
                    <span class="material-symbols-outlined">close</span>
                  </button>
                </div>
                <button class="add-column">
                  <span class="material-symbols-outlined">add</span>
                  <span>Add custom column</span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="csv-preview">
            <div class="preview-title">CSV Preview</div>
            <div class="preview-table">
              <div class="preview-header">
                <div class="preview-cell">File</div>
                <div class="preview-cell">Start</div>
                <div class="preview-cell">End</div>
                <div class="preview-cell">Duration</div>
                <div class="preview-cell">Transcript</div>
                <div class="preview-cell">Notes</div>
                <div class="preview-cell">Keywords</div>
              </div>
              <div class="preview-row">
                <div class="preview-cell">Interview_001.mp3</div>
                <div class="preview-cell">00:00:15</div>
                <div class="preview-cell">00:00:22</div>
                <div class="preview-cell">7s</div>
                <div class="preview-cell">Welcome to our meeting...</div>
                <div class="preview-cell"></div>
                <div class="preview-cell">meeting, intro</div>
              </div>
            </div>
          </div>
          
          <div class="complete-action">
            <button class="complete-btn">
              <span class="material-symbols-outlined">check_circle</span>
              <span>Complete Transcription & Save CSV</span>
            </button>
          </div>
        </div>
        
        <div class="chat-footer">
          <p>SonicScript may be inaccurate; please double check its responses.</p>
        </div>
      </section>
      
      <!-- Right Panel - Studio -->
      <section class="studio-panel">
        <div class="studio-header">
          <h2>Studio</h2>
          <button class="collapse-btn">
            <span class="material-symbols-outlined">menu_open</span>
          </button>
        </div>
        
        <div class="studio-section audio-overview">
          <div class="section-header">
            <h3>Audio Overview</h3>
            <span class="material-symbols-outlined">info</span>
          </div>
          
          <div class="info-banner">
            <span class="material-symbols-outlined">volume_up</span>
            <p>Create an Audio Overview in more languages! <a href="#">Learn more</a></p>
          </div>
          
          <div class="audio-card">
            <div class="audio-icon">
              <span class="material-symbols-outlined">description</span>
            </div>
            <div class="audio-info">
              <h4>Deep Dive conversation</h4>
              <p>Two hosts</p>
            </div>
          </div>
          
          <div class="action-buttons">
            <button class="action-btn-secondary">Customize</button>
            <button class="action-btn-primary">Generate</button>
          </div>
        </div>
        
        <div class="studio-section notes">
          <div class="section-header">
            <h3>Notes</h3>
            <button class="more-options">
              <span class="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          
          <button class="add-note-btn">
            <span class="material-symbols-outlined">add</span>
            <span>Add note</span>
          </button>
          
          <div class="note-item">
            <span class="material-symbols-outlined">menu_book</span>
            <span>Study guide</span>
          </div>
          
          <div class="note-item">
            <span class="material-symbols-outlined">help</span>
            <span>FAQ</span>
          </div>
          
          <div class="note-item">
            <span class="material-symbols-outlined">timeline</span>
            <span>Timeline</span>
          </div>
          
          <div class="note-item">
            <span class="material-symbols-outlined">description</span>
            <span class="note-title">SonicScript Research Presentation Guide</span>
            <p class="note-preview">Okay, presenting research at a major conference is a fantastic opportunity! Having a clear, well-structured presentation is...</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
/* Google Symbols font styles */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #1e1e1e;
  color: #e1e1e1;
  overflow: hidden;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1e1e1e;
  color: white;
  overflow: hidden;
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;
}

.app-branding {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 24px;
  color: #4C6EF5;
}

.app-title {
  font-size: 14px;
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.action-btn {
  background: transparent;
  border: none;
  color: #e1e1e1;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  width: 100%;
}

/* Left Panel - Sources */
.sources-panel {
  width: 300px;
  background-color: #1e1e1e;
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sources-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #333;
}

.sources-header h2 {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.collapse-btn {
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
}

.action-group {
  display: flex;
  gap: 8px;
  padding: 12px;
}

.action-btn-outlined {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 4px;
  color: #e1e1e1;
  font-size: 13px;
  cursor: pointer;
}

.action-btn-outlined:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.select-all {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-size: 13px;
  color: #a0a0a0;
}

.checkbox {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.checkbox input {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  background-color: transparent;
  border: 1px solid #777;
  border-radius: 3px;
}

.checkbox input:checked ~ .checkmark {
  background-color: #4C6EF5;
  border-color: #4C6EF5;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox input:checked ~ .checkmark:after {
  display: block;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.source-list {
  padding: 8px 0;
}

.source-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 12px;
  cursor: pointer;
}

.source-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.source-type {
  font-size: 20px;
}

.source-name {
  flex: 1;
  font-size: 13px;
}

/* Center Panel - Chat/Content */
.chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #1e1e1e;
  padding: 16px;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.app-icon-container {
  width: 40px;
  height: 40px;
  background-color: #4C6EF5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-icon {
  color: white;
  font-size: 24px;
}

.chat-title h1 {
  font-size: 20px;
  margin: 0 0 4px;
  font-weight: 500;
}

.chat-title p {
  font-size: 13px;
  color: #a0a0a0;
  margin: 0;
}

.chat-summary {
  background-color: #252526;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #e1e1e1;
}

.action-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.action-btn-text {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 4px;
  color: #e1e1e1;
  font-size: 13px;
  cursor: pointer;
}

.chat-tools {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tool-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: rgba(76, 110, 245, 0.1);
  border: 1px solid rgba(76, 110, 245, 0.3);
  border-radius: 4px;
  color: #e1e1e1;
  font-size: 13px;
  cursor: pointer;
}

.transcription-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  width: 100%;
}

.transcription-segment {
  background-color: #252526;
  border-radius: 8px;
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;
}

.segment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.segment-timestamp {
  font-size: 12px;
  color: #a0a0a0;
  font-family: monospace;
}

.edit-btn {
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.segment-text {
  font-size: 14px;
  line-height: 1.5;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  width: 100%;
  max-width: 100%;
}

.suggestion-chip {
  background-color: #252526;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
}

.suggestion-chip:hover {
  background-color: #333;
}

.chat-input {
  position: relative;
  margin-top: auto;
  margin-bottom: 24px;
}

.chat-input input {
  width: 100%;
  padding: 12px 16px;
  padding-right: 80px;
  background-color: #252526;
  border: 1px solid #333;
  border-radius: 8px;
  color: #e1e1e1;
  font-size: 14px;
}

.input-count {
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #a0a0a0;
}

.send-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  background-color: #4C6EF5;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}

.chat-footer {
  text-align: center;
  font-size: 12px;
  color: #777;
  margin-top: 16px;
  padding-bottom: 16px;
}

/* Right Panel - Studio */
.studio-panel {
  width: 300px;
  background-color: #1e1e1e;
  border-left: 1px solid #333;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.studio-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #333;
}

.studio-header h2 {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.studio-section {
  padding: 16px;
  border-bottom: 1px solid #333;
}

.section-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.info-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(76, 110, 245, 0.1);
  border: 1px solid rgba(76, 110, 245, 0.3);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 12px;
}

.info-banner a {
  color: #4C6EF5;
  text-decoration: none;
}

.audio-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #252526;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}

.audio-icon {
  width: 32px;
  height: 32px;
  background-color: rgba(76, 110, 245, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4C6EF5;
}

.audio-info h4 {
  font-size: 13px;
  margin: 0 0 4px;
  font-weight: 500;
}

.audio-info p {
  font-size: 12px;
  margin: 0;
  color: #a0a0a0;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn-secondary {
  flex: 1;
  padding: 8px 0;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 4px;
  color: #e1e1e1;
  font-size: 13px;
  cursor: pointer;
}

.action-btn-primary {
  flex: 1;
  padding: 8px 0;
  background-color: #4C6EF5;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 13px;
  cursor: pointer;
}

.add-note-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 8px 0;
  background-color: transparent;
  border: 1px solid #333;
  border-radius: 4px;
  color: #e1e1e1;
  font-size: 13px;
  margin-bottom: 16px;
  cursor: pointer;
}

.note-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background-color: #252526;
  border-radius: 8px;
  margin-bottom: 8px;
  font-size: 13px;
}

.note-title {
  font-weight: 500;
  flex: 1;
}

.note-preview {
  font-size: 12px;
  color: #a0a0a0;
  margin: 4px 0 0;
}

/* Audio Visualizer and Controls */
.audio-visualizer-container {
  background-color: #252526;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
}

.visualizer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #333;
}

.file-info {
  font-size: 13px;
  font-weight: 500;
}

.visualizer-controls {
  display: flex;
  gap: 4px;
}

.visualizer-btn {
  background-color: transparent;
  border: 1px solid #444;
  border-radius: 4px;
  color: #e1e1e1;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.visualizer-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.visualizer-btn .material-symbols-outlined {
  font-size: 18px;
}

.audio-visualizer {
  height: 160px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #333;
}

.waveform-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #777;
}

.audio-controls {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  align-items: center;
}

.audio-control-btn {
  background-color: transparent;
  border: 1px solid #444;
  border-radius: 4px;
  color: #e1e1e1;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.audio-control-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.audio-control-btn.active {
  background-color: rgba(76, 110, 245, 0.2);
  border-color: rgba(76, 110, 245, 0.5);
  color: var(--accent-blue-lighter);
}

.audio-timeline {
  flex: 1;
  height: 24px;
  background-color: #1e1e1e;
  border-radius: 4px;
  position: relative;
  margin: 0 8px;
}

.audio-progress {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: rgba(76, 110, 245, 0.3);
  border-radius: 4px;
}

.timeline-marker {
  position: absolute;
  top: 0;
  height: 100%;
  width: 2px;
  cursor: pointer;
}

.marker-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background-color: var(--accent-blue);
}

.marker-handle {
  position: absolute;
  top: -6px;
  left: -4px;
  width: 10px;
  height: 10px;
  background-color: var(--accent-blue);
  border-radius: 50%;
}

.segment-tools {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.segment-tool {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: #252526;
  border: 1px solid #444;
  border-radius: 4px;
  color: #e1e1e1;
  font-size: 13px;
  cursor: pointer;
}

.segment-tool:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Transcription Segments */
.transcription-segment {
  background-color: #252526;
  border-radius: 8px;
  border-left: 3px solid transparent;
  padding: 12px 16px;
  margin-bottom: 12px;
  box-sizing: border-box;
}

.transcription-segment.completed {
  border-left-color: #4ade80;
}

.transcription-segment.active {
  border-left-color: var(--accent-blue);
}

.transcription-segment.untranscribed {
  border-left-color: #f97316;
  background-color: rgba(37, 37, 38, 0.5);
}

.segment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.segment-actions {
  display: flex;
  gap: 4px;
}

.segment-timestamp {
  font-size: 12px;
  color: #a0a0a0;
  font-family: monospace;
}

.edit-btn, .delete-btn, .save-btn {
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}

.edit-btn:hover, .save-btn:hover {
  color: var(--accent-blue);
}

.delete-btn:hover {
  color: #f43f5e;
}

.save-btn {
  color: #4ade80;
}

.segment-text {
  font-size: 14px;
  line-height: 1.5;
}

.segment-input {
  width: 100%;
  min-height: 80px;
  background-color: rgba(30, 30, 30, 0.5);
  border: 1px solid #444;
  border-radius: 4px;
  color: #e1e1e1;
  font-size: 14px;
  font-family: inherit;
  padding: 8px 12px;
  resize: vertical;
}

.transcribe-btn {
  background-color: rgba(76, 110, 245, 0.1);
  border: 1px solid rgba(76, 110, 245, 0.3);
  border-radius: 4px;
  color: #e1e1e1;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
}

.transcribe-btn:hover {
  background-color: rgba(76, 110, 245, 0.2);
}

/* CSV Configuration */
.csv-configuration {
  background-color: #252526;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.section-title h3 {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.configuration-options {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 16px;
}

.option-group {
  flex: 1;
  min-width: 200px;
}

.option-group h4 {
  font-size: 14px;
  margin: 0 0 12px;
  font-weight: 500;
  color: #a0a0a0;
}

.checkbox-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
}

.checkbox-label input {
  width: 16px;
  height: 16px;
}

.custom-columns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.custom-column {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-column input {
  flex: 1;
  padding: 6px 8px;
  background-color: #1e1e1e;
  border: 1px solid #444;
  border-radius: 4px;
  color: #e1e1e1;
  font-size: 13px;
}

.remove-column {
  background-color: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-column:hover {
  color: #f43f5e;
}

.add-column {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 0;
  background-color: transparent;
  border: 1px dashed #444;
  border-radius: 4px;
  color: #a0a0a0;
  font-size: 13px;
  cursor: pointer;
  margin-top: 4px;
}

.add-column:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #e1e1e1;
}

.csv-preview {
  background-color: #1e1e1e;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 16px;
}

.preview-title {
  font-size: 13px;
  color: #a0a0a0;
  margin-bottom: 8px;
}

.preview-table {
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-x: auto;
}

.preview-header, .preview-row {
  display: flex;
  border-bottom: 1px solid #333;
}

.preview-header {
  font-weight: 500;
  font-size: 12px;
  color: #a0a0a0;
  padding-bottom: 8px;
}

.preview-row {
  font-size: 12px;
  padding: 8px 0;
}

.preview-cell {
  flex: 1;
  min-width: 80px;
  padding-right: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.complete-action {
  display: flex;
  justify-content: center;
}

.complete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: var(--accent-blue);
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.complete-btn:hover {
  background-color: var(--accent-blue-lighter);
}

.complete-btn .material-symbols-outlined {
  font-size: 20px;
}
</style>
