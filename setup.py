import os

try:
  import flask
except ImportError:
  print("Trying to Install required module: flask\n")
  os.system('python -m pip install flask')

try:
    import pyautogui
except ImportError:
    print("Trying to Install required module: pyautogui\n")
    os.system('python -m pip install pyautogui')

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
