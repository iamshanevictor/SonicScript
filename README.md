# SonicScript

SonicScript is a powerful data preparation tool designed for machine learning, with a special focus on Natural Language Processing (NLP). It provides a user-friendly web interface for preprocessing audio data, enabling tasks like segmenting, cutting, and managing audio files for ML model training.

## Features

- **Efficient Audio Preprocessing for ML**
  - Upload and visualize audio files (`.mp3` format) for analysis.
  - Precisely select and cut audio segments to create clean datasets.
  - Interactive waveform for easy navigation and identification of speech segments.

- **Streamlined for NLP Workflows**
  - Ideal for preparing audio data for tasks like speech-to-text, speaker diarization, and sentiment analysis.
  - Simple API for integration into automated data processing pipelines.

## Project Structure

The project is organized into two main components:

- **Client**: Frontend application
- **Server**: Flask-based backend for audio processing

## Setup and Installation

### Backend Setup

1. Make sure you have Python 3.8+ installed
2. Navigate to the server directory
3. Run the setup script to create a virtual environment and install dependencies:

```bash
cd server
python setup.py
```

### Frontend Setup

1. Make sure you have Node.js installed
2. Navigate to the client directory
3. Install dependencies:

```bash
cd client
npm install
```

## Running the Application

### Start the Backend Server

```bash
cd server
python run.py
```

The server will run on http://localhost:5000

### Start the Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will be available at http://localhost:3000 (or another port specified by your setup)

## API Endpoints

### Upload Audio

- **URL**: `/api/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Form Data**: `file` - The MP3 file to upload

### Get Audio

- **URL**: `/api/audio/<filename>`
- **Method**: `GET`

### Cut Audio Segment

- **URL**: `/api/cut`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "filename": "unique_filename.mp3",
    "start": 10.5,  // Start time in seconds
    "end": 30.2     // End time in seconds
  }
  ```

### Get Processed Audio

- **URL**: `/api/processed/<filename>`
- **Method**: `GET` 