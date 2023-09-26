const containerNota = document.getElementById("notes-container");

const inputNota = document.getElementById("note-content");

const botaoAddNota = document.querySelector(".add-note");

// ====== EVENTOS ======

function adicionarNota() {

    const notas = recuperarNotas();

    const objetoNota = {
        id: 1,
        conteudo: inputNota.value,
        fixed: false,
    };

    //com base na nota eu crio o elemento
    const elementoNota = criarNota(objetoNota.id, objetoNota.conteudo);

    containerNota.appendChild(elementoNota); //faz com que a nota apareça na página

    notas.push(objetoNota); //salva array na local storage

    salvarNotas(notas); //salva as notas na local storage

    inputNota.value = ""; //atribui vazio para o campo do input após o usuario add uma nota
}

//gerar um id aleátorio para que todos os ids sejam diferentes
function gerarId() {

    return Math.floor(Math.random() * 5000);
}

function criarNota(id, conteudo, fixed) {

    const elemento = document.createElement("div");

    elemento.classList.add("note");

    const areaTexto = document.createElement("textarea");

    //passa o conteudo da função a area de texto (já vem preenchida com os dados)     
    areaTexto.value = conteudo;

    areaTexto.placeholder = "Adicione algum texto...";

    elemento.appendChild(areaTexto);

    if (fixed) { //pin
        elemento.classList.add("fixed");
    }

    const iconePin = document.createElement("i");

    iconePin.classList.add(...["bi", "bi-pin"]);

    elemento.appendChild(iconePin);

    //eventos do elemento
    elemento.querySelector(".bi-pin").addEventListener("click", () => {
        alteraPinNota(id);
    });

    return elemento;
}

function exibirNotas() {

    limparNotas();

    recuperarNotas().forEach((nota) => {
        const elementoNota = criarNota(nota.id, nota.conteudo, nota.fixed);

        containerNota.appendChild(elementoNota);
    });
}

function alteraPinNota(id) {

    const notas = recuperarNotas();

    const notaAlvo = notas.filter((nota) => nota.id === id)[0];
    //acessa a posicao 0 porque é um array de apenas uma posicao

    notaAlvo.fixed = !notaAlvo.fixed; //duas funcionalidades

    salvarNotas(notas);

    exibirNotas();
}

function limparNotas() {

    containerNota.replaceChildren([]);
}

// ====== LOCAL STORAGE ======

function salvarNotas(notas) {

    localStorage.setItem("notas", JSON.stringify(notas));
}

function recuperarNotas() { //recupera notas na local storage caso existam

    const notas = JSON.parse(localStorage.getItem("notas") || "[]"); //json parse muda de array para objeto

    return notas;
}

// ====== EVENTOS ======

botaoAddNota.addEventListener("click", () => adicionarNota());
//adiciona evento de criar nota quando é clicado no botao

// ====== Inicialização ======

exibirNotas();