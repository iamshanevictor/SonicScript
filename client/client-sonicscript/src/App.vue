<script setup>
// No components imported yet
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <div class="navbar-logo">
        <h1>SonicScript</h1>
      </div>
      <div class="navbar-links">
        <a href="#" class="active">Home</a>
        <a href="#">Dashboard</a>
        <a href="#">History</a>
        <a href="#">Help</a>
      </div>
    </nav>

    <main>
      <div class="container">
        <section class="hero">
          <h2>Audio Transcription Made Simple</h2>
          <p>Upload, visualize, and transcribe your audio files with precision</p>
          <button class="btn-primary">Upload Audio File</button>
        </section>

        <section class="features">
          <div class="feature-card">
            <h3>Visualize</h3>
            <p>Interactive waveform visualization with zoom and segment selection</p>
          </div>
          <div class="feature-card">
            <h3>Transcribe</h3>
            <p>Add timestamps and transcriptions for specific audio segments</p>
          </div>
          <div class="feature-card">
            <h3>Export</h3>
            <p>Save your work as CSV with customizable metadata fields</p>
          </div>
        </section>

        <section class="audio-workspace">
          <h2>Audio Workspace</h2>
          <div class="audio-visualizer-placeholder">
            <p>Audio visualizer will appear here after uploading a file</p>
          </div>
          <div class="audio-controls">
            <button class="btn-control">Play</button>
            <button class="btn-control">Pause</button>
            <button class="btn-control">Cut Segment</button>
            <input type="range" min="0" max="100" value="50" class="volume-slider">
          </div>
          <div class="transcription-area">
            <h3>Transcription</h3>
            <div class="transcription-placeholder">
              <p>Transcription inputs will appear here after cutting segments</p>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer>
      <p>&copy; 2023 SonicScript. All rights reserved.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #4C6EF5;
  --secondary-color: #A3BFFA;
  --dark-color: #172B4D;
  --light-color: #F8F9FA;
  --grey-color: #E9ECEF;
  --success-color: #38B2AC;
  --font-main: 'Roboto', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-main);
  background-color: var(--light-color);
  color: var(--dark-color);
  line-height: 1.6;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background-color: var(--primary-color);
  padding: 1rem 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.navbar-links a:hover::after,
.navbar-links a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: white;
}

main {
  flex: 1;
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 3rem 0;
}

.hero h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.features {
  display: flex;
  gap: 2rem;
  margin: 3rem 0;
  justify-content: center;
  flex-wrap: wrap;
}

.feature-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 250px;
  text-align: center;
}

.feature-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.audio-workspace {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.audio-workspace h2 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.audio-visualizer-placeholder {
  height: 200px;
  background-color: var(--grey-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.audio-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-control {
  background-color: var(--secondary-color);
  color: var(--dark-color);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.volume-slider {
  flex: 1;
  height: 6px;
}

.transcription-area {
  border-top: 1px solid var(--grey-color);
  padding-top: 1.5rem;
}

.transcription-area h3 {
  margin-bottom: 1rem;
}

.transcription-placeholder {
  background-color: var(--grey-color);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #666;
}

footer {
  background-color: var(--dark-color);
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .navbar-links {
    width: 100%;
    justify-content: space-between;
  }
  
  .features {
    flex-direction: column;
  }
}
</style>
