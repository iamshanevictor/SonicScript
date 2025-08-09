import os
from dataclasses import dataclass
from typing import Set


@dataclass
class Config:
    """Base configuration for the SonicScript API."""

    # Directories
    BASE_DIR: str = os.path.dirname(os.path.abspath(__file__))
    PROJECT_DIR: str = os.path.dirname(BASE_DIR)
    UPLOAD_FOLDER: str = os.path.join(PROJECT_DIR, "uploads")
    PROCESSED_FOLDER: str = os.path.join(PROJECT_DIR, "processed")

    # Limits
    MAX_CONTENT_LENGTH: int = int(os.getenv("MAX_CONTENT_LENGTH", 32 * 1024 * 1024))

    # File types
    ALLOWED_EXTENSIONS: Set[str] = frozenset({"mp3"})

    # CORS / API
    API_BASE: str = os.getenv("API_BASE", "/api")

    def as_dict(self) -> dict:
        return {
            "UPLOAD_FOLDER": self.UPLOAD_FOLDER,
            "PROCESSED_FOLDER": self.PROCESSED_FOLDER,
            "MAX_CONTENT_LENGTH": self.MAX_CONTENT_LENGTH,
            "ALLOWED_EXTENSIONS": set(self.ALLOWED_EXTENSIONS),
            "API_BASE": self.API_BASE,
        }
