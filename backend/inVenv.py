import os
import platform
import subprocess
import sys


def run(cmd):
    # Determine the activation command based on the operating system
    if platform.system() == "Windows":
        activate_cmd = "venv\\Scripts\\python.exe " + cmd
    else:
        activate_cmd = "venv/bin/python " + cmd

    # Activate the virtual environment and run the command
    subprocess.call(activate_cmd, shell=True)


if __name__=="__main__":
    # Determine intended method
    match sys.argv[1]:
        case "run":
            run(" ".join(sys.argv[2:]))
        case _:
            print("Invalid argument")
