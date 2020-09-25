class Button {
    constructor(Text, Action, Style) {
        this.text = Text;
        this.action = Action;
        this.style = Style
    }
    string(){
        return `<div class=\"col col-lg-2 col-6 div-button\">
            <button class=\"btn ${this.style}\" onclick=\"${this.action}\" type=\"button\">${this.text}</button>
        </div>`
    }
}
var buttons = [];

buttons.push(new Button("Bloquear", "change('!CM rundll32.exe user32.dll,LockWorkStation');", "btn-success"));
buttons.push(new Button("Hibernar", "change('!CM rundll32.exe PowrProf.dll,SetSuspendState');", "btn-info"));
buttons.push(new Button("Encerrar", "change('!CM shutdown -f -s');", "btn-danger"));
buttons.push(new Button("Reiniciar", "change('!CM shutdown -f -r');", "btn-danger"));
buttons.push(new Button("IP Config", "change('!CM ipconfig');", "btn-secondary"));
buttons.push(new Button("WIFI Acessadas", "change('!CM netsh wlan show profiles');", "btn-secondary"));
buttons.push(new Button("Password do WIFI", "getpro('Nome de Rede:','!CM netsh wlan show profile name=?? key=clear', true);", "btn-dark"));
buttons.push(new Button("Lista de Programas Abertos", "change('!CM tasklist');", "btn-secondary"));
buttons.push(new Button("Encerrar Programa", "getpro('PID do Programa:','!CM taskkill /PID ?? /f', false);", "btn-dark"));
buttons.push(new Button("Mostrar Mensagem", "getpro('Mensagem:','!MB ??', false);", "btn-dark"));
buttons.push(new Button("Digitar Mensagem", "getpro('Mensagem:','!TT ??', false);", "btn-dark"));
buttons.push(new Button("Combinação de Teclas", "getpro('Combinação (Separador: +):','!TC ??', false);", "btn-dark"));

buttons.forEach(button => $("#button-stop").append(button.string()));

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


