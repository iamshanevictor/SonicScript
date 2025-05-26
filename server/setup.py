import os
import subprocess
import platform

def setup_venv():
    """Set up the virtual environment and install required packages."""
    # Determine the current operating system
    system = platform.system()
    
    # Create virtual environment
    print("Creating virtual environment...")
    subprocess.run(["python", "-m", "venv", ".venv"], check=True)
    
    # Activate virtual environment and install requirements
    print("Installing requirements...")
    if system == "Windows":
        # Windows activation
        activate_cmd = [".venv\\Scripts\\python", "-m", "pip", "install", "-r", "requirements.txt"]
    else:
        # Unix-based activation
        activate_cmd = [".venv/bin/python", "-m", "pip", "install", "-r", "requirements.txt"]
    
    subprocess.run(activate_cmd, check=True)
    print("Setup complete!")

if __name__ == "__main__":
    setup_venv() 