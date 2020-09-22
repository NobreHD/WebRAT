const options = [
    ["Bloquear", "change('!CM rundll32.exe user32.dll,LockWorkStation');", "btn-success"],
    ["Hibernar", "change('!CM rundll32.exe PowrProf.dll,SetSuspendState');", "btn-info"],
    ["Encerrar", "change('!CM shutdown -f -s');", "btn-danger"],
    ["Reiniciar", "change('!CM shutdown -f -r');", "btn-danger"],
    ["IP Config", "change('!CM ipconfig');", "btn-secondary"],
    ["WIFI Acessadas", "change('!CM netsh wlan show profiles');", "btn-secondary"],
    ["Password do WIFI", "getpro('Nome de Rede:','!CM netsh wlan show profile name=?? key=clear', true);", "btn-dark"],
    ["Lista de Programas Abertos", "change('!CM tasklist');", "btn-secondary"],
    ["Encerrar Programa", "getpro('PID do Programa:','!CM taskkill /PID ?? /f', false);", "btn-dark"],
    ["Mostrar Mensagem", "getpro('Mensagem:','!MB ??', false);", "btn-dark"],
    ["Digitar Mensagem", "getpro('Mensagem:','!TT ??', false);", "btn-dark"]
]
const button = "<div class=\"col col-lg-2 col-6\" style=\"margin: 10px 0\"><button class=\"btn «»\" onclick=\"»«\" style=\"width: 100%; height: 100%\" type=\"button\">$$</button></div>"

function addButton(item, index) {
    let child = button.replace("«»", item[2]);
    child = child.replace("»«", item[1]);
    child = child.replace("$$", item[0]);
    $("#button-stop").append(child)
}

function getpro(question, code, aspas) {
    let text = prompt(question)
    if (text != null) {
        if (aspas) {
            text = '"' + text + '"';
        }
        change(code.replace("??", text));
    }
}

function change(code) {
    $('#cmd').val(code);
}

options.forEach(addButton)

