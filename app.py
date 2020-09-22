import subprocess
import time
import win32ui

from flask import Flask, render_template, redirect, request
from pynput.keyboard import Controller

app = Flask(__name__)
stay = ""


class Actions:
    def chooser(self, text, actions):
        if actions == 0:
            self.__error(text)
        elif actions == 1:
            self.__message(text)
        elif actions == 2:
            self.__text(text)
        elif actions == 3:
            self.__command(text)

    @staticmethod
    def __error(info):
        global stay
        stay = info + " not available"

    @staticmethod
    def __message(info):
        global stay
        text = info.replace("!MB ", "")
        win32ui.MessageBox(text, "", 4096)
        stay = "Mensagem Mostrada: " + text

    @staticmethod
    def __text(info):
        time.sleep(0.5)
        global stay
        text = info.replace("!TT ", "")
        keyboard = Controller()
        keyboard.type(text)
        stay = "Mensagem Digitada: " + text

    @staticmethod
    def __command(info):
        global stay
        text = info.replace("!CM ", "")
        deny = ["TREE"]
        if text.upper() in deny:
            stay = "Atualmente indisponivel"
        else:
            stay = change(subprocess.getoutput(text))


def change(text):
    text = text.replace("Æ", "ã")
    text = text.replace("‡", "ç")
    text = text.replace("ÿ", " ")
    text = text.replace("µ", "Á")
    return text


@app.route('/')
def index():
    global stay
    html = render_template('index.html', stay=stay)
    stay = ""
    return html


@app.route('/files/<string:file>')
def image(file):
    return app.send_static_file(file)


@app.route('/action', methods=['POST'])
def act():
    info = request.form['console']
    if "!MB " in info:
        action.chooser(info, 1)
    elif "!TT " in info:
        action.chooser(info, 2)
    elif "!CM" in info:
        action.chooser(info, 3)
    else:
        action.chooser(info, 0)
    return redirect("/", code=302)


action = Actions()

if __name__ == '__main__':
    try:
        app.run(host="0.0.0.0", port=4747)
    except Exception as inst:
        with open("error.txt", "w") as w:
            print(inst)
            w.write(inst.__str__())
