import os

try:
    import flask
except ImportError:
    print("Trying to Install required module: Flask\n")
    os.system('python -m pip install Flask')

try:
    import pyautogui
except ImportError:
    print("Trying to Install required module: PyAutoGUI\n")
    os.system('python -m pip install PyAutoGUI')

try:
    import pynput
except ImportError:
    print("Trying to Install required module: pynput\n")
    os.system('python -m pip install pynput')

try:
    import win32ui
except ImportError:
    print("Trying to Install required module: win32ui\n")
    os.system('python -m pip install win32ui')

try:
    import cv2
except ImportError:
    print("Trying to Install required module: opencv-python\n")
    os.system('python -m pip install opencv-python')
