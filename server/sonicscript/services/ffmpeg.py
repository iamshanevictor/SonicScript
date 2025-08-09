from __future__ import annotations

import os
import shutil
import subprocess
from typing import Dict

from pydub import AudioSegment


COMMON_WINDOWS_PATHS = (
    r"C:\\ffmpeg\\bin\\ffmpeg.exe",
    r"C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe",
    r"D:\\ffmpeg\\bin\\ffmpeg.exe",
)


def configure_ffmpeg() -> None:
    """Best-effort configuration of pydub's ffmpeg converter.

    - If ffmpeg is on PATH, pydub will discover it automatically.
    - Otherwise, try a set of common Windows install paths.
    - As a last resort, look for a local `ffmpeg.exe` next to this module.
    """
    try:
        if shutil.which("ffmpeg"):
            # On PATH; let pydub default behavior work
            return

        for path in COMMON_WINDOWS_PATHS:
            if os.path.exists(path):
                AudioSegment.converter = path
                return

        local_ffmpeg = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ffmpeg.exe")
        if os.path.exists(local_ffmpeg):
            AudioSegment.converter = local_ffmpeg
    except Exception:
        # Non-fatal; diagnostics endpoint can reveal issues
        pass


def ffmpeg_diagnostics() -> Dict[str, str]:
    """Return diagnostic information about ffmpeg availability."""
    info: Dict[str, str] = {
        "pydub_converter": getattr(AudioSegment, "converter", "Not set"),
        "ffmpeg_in_path": shutil.which("ffmpeg") or "",
        "environment_path": os.environ.get("PATH", ""),
    }

    try:
        result = subprocess.run(["ffmpeg", "-version"], capture_output=True, text=True, timeout=5)
        info["ffmpeg_version"] = (result.stdout.splitlines() or [""])[0]
        info["ffmpeg_available"] = True  # type: ignore[assignment]
    except Exception as e:
        info["ffmpeg_error"] = str(e)
        info["ffmpeg_available"] = False  # type: ignore[assignment]

    return info
