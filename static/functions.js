
// Get Input using Prompt
function getPrompt(question, code, aspas) {
    let text = prompt(question)
    if (text != null) {
        if (aspas) {
            text = '"' + text + '"';
        }
        change(code.replace("??", text));
    }
}

// Put Instructions Inside InputBox
function change(code) {
    let prev = $('#cmd').val();
    if(prev == ""){
        $('#cmd').val(code);
    }else{
        $('#cmd').val(prev + " && " + code);
    }
}


