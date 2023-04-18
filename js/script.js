var texto = document.getElementById('textarea');
var buttonCodificar = document.getElementById('codificar');
var buttonDecodificar = document.getElementById('decodificar');
var alerta = document.getElementById('alert');


function temAcento(letra){
    return /[áàâãéèêíïóôõöúç]/.test(letra);
}

function temPontuacao(letra){
    return !(/[!?.,]/.test(letra));
}

function verificaAcentosEMaiusculos(){
    var a = texto.value;
    for(var i = 0; i < a.length; i++) {
        // Verificas se há acentuação!
        if(temAcento(a[i])) {
            return 1;
        }
        // Verificas se há letras maiúsculas!
        if(a[i] == a[i].toUpperCase() && a[i] != ' ' && temPontuacao(a[i])) {
            return 2;
        }
    }
}

function verificar() {
    // Com o retorno, dá para tratarmos de melhor forma o aviso ao usuário.
    if(verificaAcentosEMaiusculos() == 1) {
        alerta.style.color = 'red';
        alerta.style.fontWeight = 'bold';
        texto.placeholder = 'Não digite acentos!';
    } 
    // Com o retorno, dá para tratarmos de melhor forma o aviso ao usuário.
    else if(verificaAcentosEMaiusculos() == 2) {
        alerta.style.color = 'red';
        alerta.style.fontWeight = 'bold';
        texto.placeholder = 'Não digite letras maiúsculas!'; 
    } 
    else if(texto.value) {
        alerta.style.color = 'black';
        alerta.style.fontWeight = '500';
        texto.placeholder = 'Coloque seu texto aqui :)'
        return true;
    } 
    else {
        alerta.style.color = 'red';
        alerta.style.fontWeight = 'bold';
        texto.placeholder = 'Digite algo aqui dentro para criptografarmos ou descriptografarmos!';
        console.log('Não há nada!');
    }
}

var list = []
function codificar() {
    if (verificar()) {
        var a = texto.value;
        for (var i = 0; i < a.length; i++) {
            list.push(a[i]);
            if (list[i] == 'a') {
                list[i] = 'ai';
            } else if (list[i] == 'e') {
                list[i] = 'enter';
            } else if (list[i] == 'i') {
                list[i] = 'imes';
            } else if (list[i] == 'o') {
                list[i] = 'ober';
            } else if (list[i] == 'u') {
                list[i] = 'ufat';
            }
        }
        list = list.join('');
        var textoCodificado = list.toString();
        // Resetar lista
        list = [];
        return textoCodificado;
    }
}

// Decodificar
function decodificarTexto(){
    if (verificar()) {
        var a = texto.value;
        var teste = a;

        if (teste.includes('ai')) {
            //stringDesejada/g pega todas as ocorrências e muda
            teste = teste.replace(/ai/g, 'a');
        }
        if (teste.includes('enter')) {
            teste = teste.replace(/enter/g, 'e');
        }
        if (teste.includes('imes')) {
            teste = teste.replace(/imes/g, 'i');
        }
        if (teste.includes('ober')) {
            teste = teste.replace(/ober/g, 'o');
        }
        if (teste.includes('ufat')) {
            teste = teste.replace(/ufat/g, 'u');
        }
        return teste;
    }
}

function mostrarTextoCodificado() {
    if (codificar() != undefined) {
        adicionarCaixa(codificar());
    }
}

function mostrarTextoDecodificado() {
    if (codificar() != undefined) {
        adicionarCaixa(decodificarTexto());
    }
}

buttonCodificar.onclick = mostrarTextoCodificado;
buttonDecodificar.onclick = mostrarTextoDecodificado;

function adicionarCaixa(texto) {
    removerElementos();
    let larguraDaTela = window.screen.width;
    // Cria um elemento <div>
    var caixa = document.createElement("div");
    if(larguraDaTela > 768) {
        caixa.style.fontFamily = "'Inter', sans-serif";
        caixa.style.fontSize = '24px';
        caixa.style.height = '90%';
        caixa.style.marginTop = '10%';
        caixa.style.overflow = 'auto';
        caixa.style.textAlign = 'left';
        caixa.style.width = '85%';
        caixa.style.wordBreak = 'break-word';
    }  else if(larguraDaTela <= 768) {
        caixa.style.fontFamily = "'Inter', sans-serif";
        caixa.style.fontSize = '24px';
        caixa.style.height = '90%';
        caixa.style.marginTop = '5%';
        caixa.style.overflow = 'auto';
        caixa.style.textAlign = 'left';
        caixa.style.width = '85%';
        caixa.style.wordBreak = 'break-word';
    }
    
    // Cria o botão de copiar.
    var buttonCopy = document.createElement("button")
    if(larguraDaTela > 768) {
        buttonCopy.style.backgroundColor = 'transparent';
        buttonCopy.style.border = '1px solid #0A3871';
        buttonCopy.style.borderRadius = '15px';
        buttonCopy.style.color = '#0A3871';
        buttonCopy.style.cursor = 'pointer';
        buttonCopy.style.height = '7vh';
        buttonCopy.style.marginBottom = '10%';
        buttonCopy.style.width = '50%';
        buttonCopy.innerHTML = 'Copiar';
    } else if(larguraDaTela <= 768) {
        buttonCopy.style.backgroundColor = 'transparent';
        buttonCopy.style.border = '1px solid #0A3871';
        buttonCopy.style.borderRadius = '15px';
        buttonCopy.style.color = '#0A3871';
        buttonCopy.style.cursor = 'pointer';
        buttonCopy.style.height = '10vh';
        buttonCopy.style.marginBottom = '5%';
        buttonCopy.style.width = '90%';
        buttonCopy.innerHTML = 'Copiar';
    }

    buttonCopy.addEventListener("mouseover", function() {
        buttonCopy.style.backgroundColor = "#AAB2D5";
    });

    buttonCopy.addEventListener("mouseout", function() {
        buttonCopy.style.backgroundColor = "";
    });

    // Define o conteúdo do elemento com o texto codificado!
    caixa.innerHTML = texto;

    buttonCopy.addEventListener("click", function() {
        // Cria um elemento <textarea> oculto para armazenar o texto a ser copiado.
        var textarea = document.createElement('textarea');
        textarea.style.left = 0;
        textarea.style.opacity = 0;
        textarea.style.position = 'fixed';
        textarea.style.top = 0;
        textarea.value = texto;
        document.body.appendChild(textarea);

        // Copia o texto do textarea para a área de transferência.
        textarea.select();
        document.execCommand("copy");

        // Remove o textarea.
        document.body.removeChild(textarea);

        buttonCopy.innerHTML = 'Copiado!';
    });

    var container = document.getElementById("mostra");
    container.style.justifyContent = 'space-between';
    
    // Adiciona a caixa de texto ao elemento <div> com ID "mostra"
    container.appendChild(caixa);
    container.appendChild(buttonCopy);
}

function removerElementos() {
    var container = document.getElementById("mostra");
    
    // Remove todos os elementos filhos do elemento <div> com ID "mostra"
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
