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
    const notas = recuperarNotas();
    let novoId;
    do {
        novoId = Math.floor(Math.random() * 5000);
    } while (notas.some(nota => nota.id === novoId));
    return novoId;
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

    //Fixar
    const iconePin = document.createElement("i");

    iconePin.classList.add(...["bi", "bi-pin"]);

    elemento.appendChild(iconePin);

    //Evento Fixar
    elemento.querySelector(".bi-pin").addEventListener("click", () => {
        alteraPinNota(id);
    });

    //Deletar
    const iconeDeletar = document.createElement("i");

    iconeDeletar.classList.add(...["bi", "bi-x-lg"]);

    elemento.appendChild(iconeDeletar);

    //Evento deletar
    elemento.querySelector(".bi-x-lg").addEventListener("click", () => {
        deletarNota(id, elemento);
    });

    //Duplicar
    const iconeDuplicar = document.createElement("i");

    iconeDuplicar.classList.add(...["bi", "bi-file-earmark-plus"]);

    elemento.appendChild(iconeDuplicar);

    //Evento duplicar
    elemento.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
        duplicarNota(id);
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

function deletarNota(id, elemento) {

    const notas = recuperarNotas().filter((notas) => notas.id !== id);

    salvarNotas(notas);

    containerNota.removeChild(elemento)

}

function duplicarNota(id) {

    const notas = recuperarNotas();

    const notaAlvo = notas.filter((notas) => notas.id === id)[0];

    //é criado um objeto com mesmo conteudo mas id diferente
    const objetoNota = {
        id: gerarId(),
        content: notaAlvo.conteudo,
        fixed: false
    };

    const elementoNota = criarNota(objetoNota.id, objetoNota.content, objetoNota.fixed);

    containerNota.appendChild(elementoNota);

    notas.push(objetoNota);

    salvarNotas(notas);
}

// ====== LOCAL STORAGE ======

function salvarNotas(notas) {

    localStorage.setItem("notas", JSON.stringify(notas));
}

function recuperarNotas() { //recupera notas na local storage caso existam

    const notas = JSON.parse(localStorage.getItem("notas") || "[]"); //json parse muda de array para objeto

    const ordenarNotas = notas.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

    return ordenarNotas;
}

// ====== EVENTOS ======

botaoAddNota.addEventListener("click", () => adicionarNota());
//adiciona evento de criar nota quando é clicado no botao

// ====== Inicialização ======

exibirNotas();