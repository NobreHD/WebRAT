class Section{
    constructor(Name, Style, Text) {
        this.name = Name;
        this.style = Style;
        this.text = Text;
    }
    div_toggler(){

        $("#toggler").append(`<div class=\"col col-lg-2 col-6 div-button\">
            <button class="btn ${this.style}" type="button" data-toggle="collapse" data-target="#${this.name}"
                    aria-expanded="false" aria-controls="${this.name}"> ${this.text} </button>
        </div>`);
        $("#form_hover").before(`<div class="row mod-row collapse" id="${this.name}"></div>`);
    }
}

let sestions = []
sestions.push(new Section("shutdown", "btn-success", "Encerrar PC"));
sestions.push(new Section("network", "btn-primary", "Rede"));
sestions.push(new Section("program", "btn-info", "Programas"));
sestions.push(new Section("interaction", "btn-warning", "Interação com Utilizador"));
sestions.push(new Section("spy", "btn-danger", "Espiar"));

sestions.forEach(sestion => sestion.div_toggler());


