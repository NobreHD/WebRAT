# ------------------------- Imports -----------------------------
import subprocess
import time
import win32ui
import _thread

from flask import Flask, render_template, redirect, request
from pyautogui import isValidKey, keyUp, keyDown
from pynput.keyboard import Controller
# ---------------------------------------------------------------

app = Flask(__name__)
stay = ""


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
        stay += "\n"

    # --------- Display Error ----------
    @staticmethod
    def __error(info):
        return info + " not available"

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


# ----------- Text Changer -----------
def change(text):
    text = text.replace("Æ", "ã")
    text = text.replace("‡", "ç")
    text = text.replace("ÿ", " ")
    text = text.replace("µ", "Á")
    return text
# ------------------------------------


# -------------------- Index ------------------------
@app.route('/')
def index():
    global stay
    html = render_template('index.html', stay=stay)
    stay = ""
    return html
# ---------------------------------------------------


# --------- Get Static Files ----------
@app.route('/files/<string:file>')
def image(file):
    return app.send_static_file(file)
# -------------------------------------


# ------------------------ Start Actions -----------------------------
@app.route('/action', methods=['POST'])
def act():
    global stay
    stay = ""
    info = request.form['console'].split("&&")
    for command in info:
        if "!MB " in command:
            _thread.start_new_thread(action.chooser, (command, 1))
        elif "!TT " in command:
            _thread.start_new_thread(action.chooser, (command, 2))
        elif "!CM" in command:
            _thread.start_new_thread(action.chooser, (command, 3))
        elif "!TC" in command:
            _thread.start_new_thread(action.chooser, (command, 4))
        else:
            _thread.start_new_thread(action.chooser, (command, 0))
        time.sleep(1)
    return redirect("/", code=302)
# --------------------------------------------------------------------


action = Actions()

if __name__ == '__main__':
    try:
        app.run(host="0.0.0.0", port=4747)
    except Exception as inst:
        with open("error.txt", "w") as w:
            print(inst)
            w.write(inst.__str__())
