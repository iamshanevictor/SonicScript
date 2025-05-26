import subprocess
import os
import platform

def run_server():
    """Run the Flask server using the virtual environment."""
    # Determine the current operating system
    system = platform.system()
    
    # Set the Python executable path based on the OS
    if system == "Windows":
        python_path = os.path.join(".venv", "Scripts", "python")
    else:
        python_path = os.path.join(".venv", "bin", "python")
    
    # Run the Flask application
    subprocess.run([python_path, "app.py"])

if __name__ == "__main__":
    run_server() 