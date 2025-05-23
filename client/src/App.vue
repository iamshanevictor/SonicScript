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
          <p>These sources contain audio transcriptions of meetings, interviews, and lectures. The audio processing system helps identify speakers, segments, and key topics. The system focuses on enhancing speech recognition accuracy, improving transcript quality, and generating structured notes with timestamps and speaker identification.</p>
        </div>
        
        <div class="action-bar">
          <button class="action-btn-text">
            <span class="material-symbols-outlined">bookmark</span>
            <span>Save to note</span>
          </button>
          <button class="action-btn-text">
            <span class="material-symbols-outlined">note</span>
          </button>
        </div>
        
        <div class="chat-tools">
          <button class="tool-btn">
            <span class="material-symbols-outlined">note_add</span>
            <span>Add note</span>
          </button>
          <button class="tool-btn">
            <span class="material-symbols-outlined">equalizer</span>
            <span>Audio Overview</span>
          </button>
          <button class="tool-btn">
            <span class="material-symbols-outlined">schema</span>
            <span>Mind Map</span>
          </button>
        </div>
        
        <div class="transcription-container">
          <div class="transcription-segment">
            <div class="segment-header">
              <div class="segment-timestamp">00:00:15 - 00:00:22</div>
              <button class="edit-btn">
                <span class="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div class="segment-text">
              Welcome to our meeting about the quarterly results. Today we'll be discussing the performance of our key products.
            </div>
          </div>

          <div class="transcription-segment">
            <div class="segment-header">
              <div class="segment-timestamp">00:00:24 - 00:00:36</div>
              <button class="edit-btn">
                <span class="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div class="segment-text">
              As you can see from the charts, our main product line has shown a 15% increase in revenue compared to last quarter.
            </div>
          </div>

          <div class="transcription-segment">
            <div class="segment-header">
              <div class="segment-timestamp">00:00:40 - 00:00:58</div>
              <button class="edit-btn">
                <span class="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div class="segment-text">
              We've also seen significant growth in our new market segments, particularly in the enterprise customer category which has grown by 23%.
            </div>
          </div>
        </div>
        
        <div class="suggestion-chips">
          <div class="suggestion-chip">How effectively does SonicScript detect speakers?</div>
          <div class="suggestion-chip">What were the main points in Meeting_Notes.mp3?</div>
          <div class="suggestion-chip">Summarize key insights</div>
        </div>
        
        <div class="chat-input">
          <input type="text" placeholder="Start typing..." />
          <div class="input-count">2 sources</div>
          <button class="send-btn">
            <span class="material-symbols-outlined">send</span>
          </button>
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
</style>
