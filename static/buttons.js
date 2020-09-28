class Button {
    constructor(Text, Action, Style) {
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
var buttons = [];
buttons.push(new Button("Bloquear", "putIn('!CM rundll32.exe user32.dll,LockWorkStation');", "btn-success"));
buttons.push(new Button("Hibernar", "putIn('!CM rundll32.exe PowrProf.dll,SetSuspendState');", "btn-info"));
buttons.push(new Button("Encerrar", "putIn('!CM shutdown -f -s');", "btn-danger"));
buttons.push(new Button("Reiniciar", "putIn('!CM shutdown -f -r');", "btn-danger"));
buttons.push(new Button("IP Config", "putIn('!CM ipconfig');", "btn-secondary"));
buttons.push(new Button("WIFI Acessadas", "putIn('!CM netsh wlan show profiles');", "btn-secondary"));
buttons.push(new Button("Password do WIFI", "getPrompt('Nome de Rede:','!CM netsh wlan show profile name=?? key=clear', true);", "btn-dark"));
buttons.push(new Button("Lista de Programas Abertos", "putIn('!CM tasklist');", "btn-secondary"));
buttons.push(new Button("Encerrar Programa", "getPrompt('PID do Programa:','!CM taskkill /PID ?? /f', false);", "btn-dark"));
buttons.push(new Button("Mostrar Mensagem", "getPrompt('Mensagem:','!MB ??', false);", "btn-dark"));
buttons.push(new Button("Digitar Mensagem", "getPrompt('Mensagem:','!TT ??', false);", "btn-dark"));
buttons.push(new Button("Combinação de Teclas", "getPrompt('Combinação (Separador: +):','!TC ??', false);", "btn-dark"));

// Display buttons on Page
buttons.forEach(button => $("#button-stop").append(button.string()));