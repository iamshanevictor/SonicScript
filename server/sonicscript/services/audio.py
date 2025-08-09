from __future__ import annotations

import os
from typing import Iterable, Set

from pydub import AudioSegment


def allowed_file(filename: str, allowed_extensions: Iterable[str]) -> bool:
    """Return True if filename has an allowed extension."""
    if "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    return ext in set(allowed_extensions)


def load_audio(path: str) -> AudioSegment:
    """Load an audio file using pydub, inferring format from extension."""
    return AudioSegment.from_file(path)


def export_segment(segment: AudioSegment, path: str, format: str = "mp3") -> None:
    """Export an AudioSegment to path with given format, ensuring directory exists."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    segment.export(path, format=format)
