// Funções
console.log("Está funcionando");
console.log(window.location.host)

// Variáveis Globais
var data_atual = new Date();
var arrayProduto = [];
var url = "http://localhost/convert_string";

// Função editor de texto Summernote 
$(document).ready(function () {
    $('#summernote').summernote();
});

// Função para adicionar header e footer
$(document).ready(function () {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
    if (checkDevice() == true) {
        $("#corpo").load("convert_string_mobile.html");
    } else {
        $("#corpo").load("convert_string.html");
    }
});

function checkDevice() {
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true; // está utilizando celular
     }
    else {
       return false; // não é celular
     }
}

// Função para adicionar editor Summernote
function edit() {
    $('.texto_editado').summernote({ focus: true });
}

// Função para salvar texto na div
function save() {
    var texto = $('#summernote').summernote('code');
    document.getElementById("texto_editado").innerHTML = texto;
    //$('.texto_editado').summernote('destroy');

}

// Função para copiar texto para div e área de transferência
function copiar_editor() {
    /* Selecionamos por ID o nosso input */
    var textoCopiado = $('#summernote').summernote('code');
    document.getElementById("texto_editado").innerHTML = textoCopiado;
    copiarDIV("texto_editado");

    /*
    navigator.clipboard.writeText(textoCopiado).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
    */
}

// Função Modo Dark
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    var elementHead = document.header;
    elementHead.classList.toggle("dark-head");
}

// Função para exibir texto na div
function url_convert(texto) {
    //Função para abrir popup
    /*
    var url = "http://localhost/convert_string/string_convert.html?texto="+texto;
    var myWindow = window.open(url, "string_italic", "popup");
    */
    document.getElementById("string_convert").innerHTML = texto;
};

// Função para capturar texto da url
function getParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('texto');
    console.log(myParam);
    var texto = myParam;
    return texto;
}

// Função para exibir quantidade de caracteres
function lengthText() {
    var texto = getText();
    var tamanho = texto.length;
    document.getElementById("length_text").innerHTML = "Total Caracteres: " + tamanho;
}

// Setando o foco em um campo
function setFocus() {
    document.getElementById("texto").focus();
}

// função para limpar campos
function clearFields() {
    //document.querySelector("#texto").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("string_convert").innerHTML = "";
    lengthText()
}

// Função para capturar texto do input
function getText() {
    //var texto = document.querySelector("#texto").value;
    var texto = document.getElementById('texto').value;

    return texto;
}

// Função para Atualizar texto do input
function update(texto) {
    document.querySelector("#texto").value = texto;
    //document.getElementById("texto").value = texto;
}

// Função de Caixa Alta
function upperCase() {
    var texto = getText();
    texto = texto.toUpperCase();
    update(texto);
}

// Função de Caixa Baixa
function lowerCase() {
    var texto = getText();
    texto = texto.toLowerCase();
    update(texto);
}

// Função de Capitalizar String
function capitalize() {
    var texto = getText();
    const palavras = texto.split(" ");

    for (let i = 0; i < palavras.length; i++) {
        palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substr(1);
    }
    update(palavras.join(" "));
}

// Função de Negrito
function bold() {
    var texto = getText();
    texto = texto.bold();
    url_convert(texto);
}

// Função de Itálico
function italic() {
    var texto = getText();
    texto = texto.italics();
    url_convert(texto);
}

// Função de Riscado
function strike() {
    var texto = getText();
    texto = texto.strike();
    url_convert(texto);
}

// Função de Inverter String
function reverse() {
    var texto = getText();
    texto = texto.split("").reverse().join("");
    update(texto);
}

// Função de exibir texto criptografado
function encrypt_texto() {
    var texto = getText();
    var select = document.getElementById("encrypt");
    var opcao_encrypt = select.options[select.selectedIndex].value;

    chave = encrypt(opcao_encrypt, texto);
    document.getElementById("string_convert").innerHTML = chave;

}

// Função de exibir texto criptografado(mobile)
function encrypt_texto_mobile() {
    var texto = getText();
    var select = document.getElementById("encrypt_mobile");
    var opcao_encrypt = select.options[select.selectedIndex].value;

    chave = encrypt(opcao_encrypt, texto);
    document.getElementById("string_convert").innerHTML = chave;

}

// Função de criptografar texto
function encrypt(opcao_encrypt, texto) {
    if (opcao_encrypt == 'md5') {
        var chave = CryptoJS.MD5(texto);
    } else if (opcao_encrypt == 'sha1') {
        var chave = CryptoJS.SHA1(texto);
    } else if (opcao_encrypt == 'sha2') {
        var chave = CryptoJS.SHA256(texto);
    } else if (opcao_encrypt == 'sha3') {
        var chave = CryptoJS.SHA3(texto);
    } else if (opcao_encrypt == 'aes') {
        var chave = CryptoJS.AES.encrypt(texto, "Secret Passphrase");
    } else if (opcao_encrypt == 'des') {
        var chave = CryptoJS.DES.encrypt(texto, "Secret Passphrase");
    } else if (opcao_encrypt == '3des') {
        var chave = CryptoJS.TripleDES.encrypt(texto, "Secret Passphrase");
    } else if (opcao_encrypt == 'rc4') {
        var chave = CryptoJS.RC4.encrypt(texto, "Secret Passphrase");
    }

    return chave;
}

// Função para copiar texto do input para area de transferencia
function copiarTexto() {
    /* Selecionamos por ID o nosso input */
    var textoCopiado = document.getElementById("texto");

    /* Deixamos o texto selecionado (em azul) */
    textoCopiado.select();
    textoCopiado.setSelectionRange(0, 99999); /* Para mobile */

    /* Copia o texto que está selecionado */
    document.execCommand("copy");
}

// Função para copiar texto do Modal para area de transferencia
function copiarModal() {
    copiarDIV("textoModal")
}

// Função para copiar texto da div para area de transferencia
function copiar_string_convert() {
    copiarDIV("string_convert")
}

// Função para copiar texto do input para area de transferencia
function copiarDIV(id) {
    var element = document.getElementById(id);
    //console.log(element.children[1].innerHTML);
    //element = document.querySelector("#textoModal");
    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    document.execCommand('copy');
}

function gerarTexto() {

    var opcoes = new Map();
    
    var minusculas=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];
    var maiusculas=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","U","V","W","X","Y","Z"];
    var numeros=["0","1","2","3","4","5","6","7","8","9"];
    var outros = ["!","@","#","$","%","^","&"];

    opcoes.set('minusculas', minusculas);
    opcoes.set('maiusculas', maiusculas);
    opcoes.set('numeros', numeros);
    opcoes.set('outros', outros);

    var tamanho_texto = document.getElementById('tamanho_texto').value;
    var elemento_maiuscula = document.getElementById('maiusculas');
    var elemento_minusculas = document.getElementById('minusculas');
    var elemento_numeros = document.getElementById('numeros');
    var elemento_outros = document.getElementById('outros');

    if (elemento_maiuscula.checked == false) {
        opcoes.delete('maiusculas');
    }
    if (elemento_minusculas.checked == false) {
        opcoes.delete('minusculas');
    }
    if (elemento_numeros.checked == false) {
        opcoes.delete('numeros');
    }
    if (elemento_outros.checked == false) {
        opcoes.delete('outros');
    }

    i = 0;
    opcoes_array = [];
    for (const x of opcoes.values()) {
        opcoes_array[i] = x;
        i = i + 1;
    }

    if (opcoes_array.length > 0) {
        var texto = "";
        var opcao = Math.floor(Math.random() * opcoes_array.length);
        for (let index = 0; index < tamanho_texto; index++) {
            var indice_opcoes = Math.floor(Math.random() * opcoes_array.length);
            opcao = opcoes_array[indice_opcoes];
            var indice_opcao = Math.floor(Math.random() * opcao.length);
            var elemento = opcao[indice_opcao];
            texto = texto + elemento;
        }
        update(texto);
    }
    
}

// Função para fechar modal
function windowClose() {
    window.close();
}

// Retorna o mês com valor somado
function add_mes(data, add, formato = 'dd/mm/yyyy') {
    var arrData = data.split('-');
    data = new Date(arrData[0], arrData[1] - 1, arrData[2]);
    data.setMonth(data.getMonth() + add)
    return data.toLocaleDateString();
}
