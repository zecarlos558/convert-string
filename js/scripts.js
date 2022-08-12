// Variáveis Globais
var data_atual = new Date();
var arrayProduto = [];

// Função editor de texto Summernote 
$(document).ready(function() {
    $('#summernote').summernote();
  });

// Funções
console.log("Está funcionando");

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    var elementHead = document.header;
    elementHead.classList.toggle("dark-head");
}

function url_convert(texto) {
    //Função para abrir popup
    /*
    var url = "http://localhost/convert_string/string_convert.html?texto="+texto;
    var myWindow = window.open(url, "string_italic", "popup");
    */

    document.getElementById("string_convert").innerHTML = texto;
};

function getParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('texto');
    console.log(myParam);
    var texto = myParam;
    return texto;
}

function lengthText() {
    var texto = getText();
    var tamanho = texto.length;
    document.getElementById("length_text").innerHTML = "Total Caracteres: "+tamanho;
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


function getText() {
    //var texto = document.querySelector("#texto").value;
    var texto = document.getElementById('texto').value;

    return texto;
}

function update(texto) {
    document.querySelector("#texto").value = texto;
    //document.getElementById("texto").value = texto;
}

function upperCase() {
    var texto = getText();
    texto = texto.toUpperCase();
    update(texto);
}

function lowerCase() {
    var texto = getText();
    texto = texto.toLowerCase();
    update(texto);
}

function capitalize() {
    var texto = getText();
    const palavras = texto.split(" ");

    for (let i = 0; i < palavras.length; i++) {
        palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substr(1);
    }
    update(palavras.join(" "));
}

function bold() {
    var texto = getText();
    texto = texto.bold();
    url_convert(texto);
}

function italic() {
    var texto = getText();
    texto = texto.italics();
    url_convert(texto);
}

function strike() {
    var texto = getText();
    texto = texto.strike();
    url_convert(texto);
}

function reverse() {
    var texto = getText();
    texto = texto.split("").reverse().join("");
    update(texto);
}

function encrypt_texto() {
    var texto = getText();
    var select = document.getElementById("encrypt");
    var opcao_encrypt = select.options[select.selectedIndex].value;

    chave = encrypt(opcao_encrypt, texto);
    document.getElementById("string_convert").innerHTML = chave;

}

function encrypt_texto_mobile() {
    var texto = getText();
    var select = document.getElementById("encrypt_mobile");
    var opcao_encrypt = select.options[select.selectedIndex].value;

    chave = encrypt(opcao_encrypt, texto);
    document.getElementById("string_convert").innerHTML = chave;

}

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

function copiarTexto() {
    /* Selecionamos por ID o nosso input */
    var textoCopiado = document.getElementById("texto");
  
    /* Deixamos o texto selecionado (em azul) */
    textoCopiado.select();
    textoCopiado.setSelectionRange(0, 99999); /* Para mobile */
  
    /* Copia o texto que está selecionado */
    document.execCommand("copy");
}

function copiarModal() {
    copiarDIV("textoModal")
}

function copiar_string_convert(params) {    
    copiarDIV("string_convert")
}

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


function windowClose() {
    window.close();
}

// Retorna o mês com valor somado
function add_mes(data, add, formato = 'dd/mm/yyyy'){
	var arrData = data.split('-');
    data = new Date(arrData[0], arrData[1] - 1, arrData[2]);
    data.setMonth(data.getMonth() + add)
    return data.toLocaleDateString();
}
