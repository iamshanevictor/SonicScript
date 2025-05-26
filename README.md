# SonicScript

A web application for audio manipulation with waveform visualization.

## Features

- **Audio Upload & Visualization**
  - Support for .mp3 uploads
  - Waveform rendering and zooming with Wavesurfer.js
  - Zoom, pan, and volume adjustment controls

- **Segment Cutting**
  - Selection of time ranges using drag handles or marker clicks
  - Cut functionality to isolate segments

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