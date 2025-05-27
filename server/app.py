import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from pydub import AudioSegment
import uuid

# Set FFmpeg path explicitly - try both common locations
try:
    # Try to find ffmpeg in common locations
    if os.path.exists("C:\\ffmpeg\\bin\\ffmpeg.exe"):
        AudioSegment.converter = "C:\\ffmpeg\\bin\\ffmpeg.exe"
    elif os.path.exists("C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe"):
        AudioSegment.converter = "C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe"
    elif os.path.exists("D:\\ffmpeg\\bin\\ffmpeg.exe"):
        AudioSegment.converter = "D:\\ffmpeg\\bin\\ffmpeg.exe"
    elif os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), "ffmpeg.exe")):
        AudioSegment.converter = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ffmpeg.exe")
    print(f"Using FFmpeg at: {AudioSegment.converter}")
except Exception as e:
    print(f"Error setting FFmpeg path: {str(e)}")

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
PROCESSED_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'processed')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024  # Limit to 32MB

# Create folders if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'mp3'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    # If user does not select file, browser also submits an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        # Generate a secure filename with a UUID to prevent conflicts
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        
        return jsonify({
            'success': True,
            'filename': unique_filename,
            'originalName': filename,
            'url': f"/api/audio/{unique_filename}"
        }), 200
    
    return jsonify({'error': 'File type not allowed'}), 400

@app.route('/api/audio/<filename>')
def get_audio(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/cut', methods=['POST'])
def cut_audio():
    data = request.json
    
    # Validate request data
    if not all(k in data for k in ['filename', 'start', 'end']):
        return jsonify({'error': 'Missing required parameters'}), 400
    
    filename = data['filename']
    start_ms = int(float(data['start']) * 1000)  # Convert seconds to milliseconds
    end_ms = int(float(data['end']) * 1000)
    
    # Check if file exists
    source_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if not os.path.exists(source_path):
        return jsonify({'error': 'Source file not found'}), 404
    
    try:
        # Load audio file
        audio = AudioSegment.from_file(source_path)
        
        # Cut the segment
        segment = audio[start_ms:end_ms]
        
        # Generate output filename
        output_filename = f"cut_{uuid.uuid4()}_{filename}"
        output_path = os.path.join(app.config['PROCESSED_FOLDER'], output_filename)
        
        # Export the segment
        segment.export(output_path, format="mp3")
        
        return jsonify({
            'success': True,
            'filename': output_filename,
            'url': f"/api/processed/{output_filename}",
            'duration': len(segment) / 1000  # Duration in seconds
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/processed/<filename>')
def get_processed_audio(filename):
    return send_from_directory(app.config['PROCESSED_FOLDER'], filename)

@app.route('/api/check_ffmpeg')
def check_ffmpeg():
    """Diagnostic endpoint to check FFmpeg configuration"""
    import shutil
    import subprocess
    
    response = {
        "pydub_converter": getattr(AudioSegment, "converter", "Not set"),
        "ffmpeg_in_path": shutil.which("ffmpeg"),
        "environment_path": os.environ.get("PATH", ""),
    }
    
    # Try to run ffmpeg directly to check version
    try:
        result = subprocess.run(["ffmpeg", "-version"], 
                               capture_output=True, 
                               text=True, 
                               timeout=5)
        response["ffmpeg_version"] = result.stdout.split('\n')[0] if result.stdout else "Unknown"
        response["ffmpeg_available"] = True
    except Exception as e:
        response["ffmpeg_error"] = str(e)
        response["ffmpeg_available"] = False
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 