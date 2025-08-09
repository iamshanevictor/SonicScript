import os
from flask import Flask
from flask_cors import CORS

from .config import Config
from .routes.api import api_bp
from .services.ffmpeg import configure_ffmpeg

from typing import Optional, Type


def create_app(config_class: Optional[Type[Config]] = None) -> Flask:
    """Application factory for the SonicScript API.

    - Applies configuration
    - Ensures upload/processed directories exist
    - Configures FFmpeg path for pydub
    - Registers blueprints
    - Enables CORS
    """
    app = Flask(__name__)

    # Config
    config_obj = (config_class or Config)()
    app.config.from_mapping(config_obj.as_dict())

    # Ensure folders exist
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    os.makedirs(app.config["PROCESSED_FOLDER"], exist_ok=True)

    # Configure FFmpeg (safe no-op if already available)
    configure_ffmpeg()

    # Extensions
    CORS(app)

    # Blueprints
    app.register_blueprint(api_bp, url_prefix="/api")

    return app
