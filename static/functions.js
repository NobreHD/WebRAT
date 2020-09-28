let input = $('#cmd')

// Get Input using Prompt
function getPrompt(question, code, aspas) {
    let text = prompt(question)
    if (text != null) {
        if (aspas) {
            text = '"' + text + '"';
        }
        putIn(code.replace("??", text));
    }
}

// Put Instructions Inside InputBox
function putIn(code) {
    let prev = input.val();
    if(prev === ""){
        input.val(code);
    }else{
        input.val(prev + " && " + code);
    }
    input.focus();
    verify();
}

function verify(){
    if(input.val() == "" ) {
        $("#clear").fadeOut();
    }else{
        $("#clear").fadeIn();
    }
}

$(function(){ $("#clear").hide(); });
input.keyup(function(){ verify(); });

$("#form_hover").mouseenter(function(){ $("#show_help").stop().slideDown("slow"); });
$("#form_hover").mouseleave(function(){ $("#show_help").stop().slideUp("slow"); });

