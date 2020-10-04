# ------------------------- Imports -----------------------------
import os
import subprocess
import time
import cv2
from threading import Thread

import sounddevice as sd
import win32ui
from flask import Flask, render_template, redirect, request, send_from_directory
from pyautogui import isValidKey, keyUp, keyDown, screenshot
from pynput.keyboard import Controller
from scipy.io.wavfile import write

# ----- Set Variables -----
app = Flask(__name__)
stay = ""
root = app.root_path
dl = root + "\\output"
if not os.path.exists(dl):
    os.makedirs(dl)


class Actions:

    # -------- Choose Between Action --------
    def chooser(self, text, actions):
        global stay
        if actions == 0:
            stay += self.__error(text)
        elif actions == 1:
            stay += self.__message(text)
        elif actions == 2:
            stay += self.__text(text)
        elif actions == 3:
            stay += self.__command(text)
        elif actions == 4:
            stay += self.__combo(text)
        elif actions == 5:
            stay += self.__print(text)
        elif actions == 6:
            stay += self.__record(text)
        elif actions == 7:
            stay += self.__webcam(text)

        stay += "\n"

    # --------- Display Error ----------
    @staticmethod
    def __error(info):
        return info + ": Instrução não valida"

    # ----------- Show Message -------------
    @staticmethod
    def __message(info):
        text = info.replace("!MB ", "")
        win32ui.MessageBox(text, "", 4096)
        return "Mensagem Mostrada: " + text

    # -------------- Text Phase --------------
    @staticmethod
    def __text(info):
        time.sleep(0.5)
        text = info.replace("!TT ", "")
        keyboard = Controller()
        keyboard.type(text.strip())
        return "Mensagem Digitada: " + text

    # --------------- Execute Commands ------------------
    @staticmethod
    def __command(info):
        text = info.replace("!CM ", "")
        deny = ["TREE"]
        if text.upper() in deny:
            return "Atualmente indisponivel"
        else:
            out = change(subprocess.getoutput(text))
            return out

    # ------------ Key Pressing ------------
    @staticmethod
    def __combo(info):
        time.sleep(0.5)
        text = info.replace("!TC ", "")
        txt = text.split('+')
        for i in txt:
            if not isValidKey(i.strip()):
                return i + " não é valido"
            else:
                keyDown(i.strip())

        for i in txt:
            keyUp(i.strip())

        return "Combo Digitado: " + text

    # ----- Take PrintScreen -----
    @staticmethod
    def __print(info):
        ss = screenshot()
        ss.save(dl + "\\ps.png")
        return "PrintScreen Tirada"

    # ---------------------- Record Microphone Audio ------------------------
    @staticmethod
    def __record(info):
        text = info.replace("!RA ", "")
        seconds = int(text)
        audio = sd.rec(int(seconds * 44100), samplerate=44100, channels=2)
        sd.wait()
        write(dl + "\\output.wav", 44100, audio)
        return "Audio Gravado durante " + str(seconds) + " segundos"

    # --------- Take Photo Using WebCam ---------
    @staticmethod
    def __webcam(info):
        try:
            camera_port = 0
            file = dl + "/web.png"
            camera = cv2.VideoCapture(camera_port)
            retval, img = camera.read()
            camera.release()
            cv2.imwrite(file, img)
            return "Foto Tirada Com Sucesso"
        except:
            return "Ocorreu um erro"


# ----------- Text Changer -----------
def change(text):
    text = text.replace("Æ", "ã")
    text = text.replace("‡", "ç")
    text = text.replace("ÿ", " ")
    text = text.replace("µ", "Á")
    return text


# -------------------- Index ------------------------
@app.route('/')
def index():
    global stay
    html = render_template('index.html', stay=stay)
    stay = ""
    return html


# --------- Get Static Files ----------
@app.route('/files/<string:file>')
def image(file):
    return app.send_static_file(file)


# ------------------------ Start Actions -----------------------------
@app.route('/action', methods=['POST'])
def act():
    global stay
    stay = ""
    info = request.form['console'].split("&&")
    for command in info:
        if "!MB " in command.upper():
            thread = Thread(target=action.chooser, args=(command, 1))
        elif "!TT " in command.upper():
            thread = Thread(target=action.chooser, args=(command, 2))
        elif "!CM" in command.upper():
            thread = Thread(target=action.chooser, args=(command, 3))
        elif "!TC" in command.upper():
            thread = Thread(target=action.chooser, args=(command, 4))
        elif "!PS" in command.upper():
            thread = Thread(target=action.chooser, args=(command, 5))
        elif "!RA" in command.upper():
            thread = Thread(target=action.chooser, args=(command, 6))
        elif "!WC" in command.upper():
            thread = Thread(target=action.chooser, args=(command, 7))
        else:
            thread = Thread(target=action.chooser, args=(command, 0))
        thread.start()
        thread.join()
    return redirect("/", code=302)


# ------------------------------- Download Files -----------------------------------
@app.route('/download/<path:filename>', methods=['GET', 'POST'])
def download(filename):
    if not os.path.exists(dl + "\\" + filename):
        global stay
        stay = filename + " não existe"
        return redirect("/", code=302)
    return send_from_directory(directory=dl, filename=filename, as_attachment=True)


action = Actions()

if __name__ == '__main__':
    try:
        app.run(host="0.0.0.0", port=4747)
    except Exception as inst:
        with open("error.txt", "w") as w:
            print(inst)
            w.write(inst.__str__())
