<script setup>
// Import the Vue Router
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
            <span class="material-symbols-outlined">chevron_left</span>
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
            <span class="app-icon material-symbols-outlined">keyboard_voice</span>
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
            <span class="material-symbols-outlined">download</span>
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
                <span class="material-symbols-outlined">unfold_more</span>
              </button>
            </div>
          </div>
          
          <div class="audio-visualizer">
            <div class="waveform-placeholder">
              <span class="material-symbols-outlined" style="font-size: 48px;">graphic_eq</span>
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
            <span class="material-symbols-outlined icon-lg">auto_fix_normal</span>
            <span>Auto-detect segments</span>
          </div>
          <div class="segment-tool">
            <span class="material-symbols-outlined icon-lg">music_off</span>
            <span>Remove silence</span>
          </div>
          <div class="segment-tool">
            <span class="material-symbols-outlined icon-lg">monitoring</span>
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
                  <span class="material-symbols-outlined">edit_note</span>
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
                  <span class="material-symbols-outlined">edit_note</span>
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
                <span class="material-symbols-outlined">record_voice_over</span>
                <span>Start transcribing</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- CSV Configuration -->
        <div class="csv-configuration">
          <div class="section-title">
            <span class="material-symbols-outlined">tune</span>
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
                  <span class="material-symbols-outlined">add_circle</span>
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
              <span class="material-symbols-outlined">task_alt</span>
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
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        
        <div class="studio-section audio-overview">
          <div class="section-header">
            <h3>Audio Overview</h3>
            <span class="material-symbols-outlined">info</span>
          </div>
          
          <div class="info-banner">
            <span class="material-symbols-outlined">sound_detection_loud_sound</span>
            <p>Create an Audio Overview in more languages! <a href="#">Learn more</a></p>
          </div>
          
          <div class="audio-card">
            <div class="audio-icon">
              <span class="material-symbols-outlined">audio_file</span>
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
            <span class="material-symbols-outlined">note_add</span>
            <span>Add note</span>
          </button>
          
          <div class="note-item">
            <span class="material-symbols-outlined">menu_book</span>
            <span>Study guide</span>
          </div>
          
          <div class="note-item">
            <span class="material-symbols-outlined">quiz</span>
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
