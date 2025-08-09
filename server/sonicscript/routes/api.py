from __future__ import annotations

import os
import uuid
from typing import Any, Dict

from flask import Blueprint, current_app, jsonify, request, send_from_directory

from ..services.audio import (
    allowed_file,
    load_audio,
    export_segment,
)
from ..services.ffmpeg import ffmpeg_diagnostics

api_bp = Blueprint("api", __name__)


@api_bp.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename, current_app.config.get("ALLOWED_EXTENSIONS", {"mp3"})):
        return jsonify({"error": "File type not allowed"}), 400

    # Secure unique filename
    from werkzeug.utils import secure_filename

    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4()}_{filename}"
    upload_path = os.path.join(current_app.config["UPLOAD_FOLDER"], unique_filename)
    file.save(upload_path)

    return (
        jsonify(
            {
                "success": True,
                "filename": unique_filename,
                "originalName": filename,
                "url": f"/api/audio/{unique_filename}",
            }
        ),
        200,
    )


@api_bp.route("/audio/<filename>")
def get_audio(filename: str):
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)


@api_bp.route("/cut", methods=["POST"])
def cut_audio():
    data: Dict[str, Any] = request.get_json(silent=True) or {}

    if not all(k in data for k in ("filename", "start", "end")):
        return jsonify({"error": "Missing required parameters"}), 400

    source_path = os.path.join(current_app.config["UPLOAD_FOLDER"], data["filename"]) 
    if not os.path.exists(source_path):
        return jsonify({"error": "Source file not found"}), 404

    try:
        start_ms = int(float(data["start"]) * 1000)
        end_ms = int(float(data["end"]) * 1000)

        audio = load_audio(source_path)
        segment = audio[start_ms:end_ms]

        output_filename = f"cut_{uuid.uuid4()}_{data['filename']}"
        output_path = os.path.join(current_app.config["PROCESSED_FOLDER"], output_filename)

        export_segment(segment, output_path, format="mp3")

        return (
            jsonify(
                {
                    "success": True,
                    "filename": output_filename,
                    "url": f"/api/processed/{output_filename}",
                    "duration": len(segment) / 1000.0,
                }
            ),
            200,
        )
    except Exception as e:  # pragma: no cover - keep behavior identical
        return jsonify({"error": str(e)}), 500


@api_bp.route("/processed/<filename>")
def get_processed_audio(filename: str):
    return send_from_directory(current_app.config["PROCESSED_FOLDER"], filename)


@api_bp.route("/check_ffmpeg")
def check_ffmpeg():
    return jsonify(ffmpeg_diagnostics())
