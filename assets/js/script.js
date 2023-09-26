const containerNota = document.getElementById("notes-container");

const inputNota = document.getElementById("note-content");

const botaoAddNota = document.querySelector(".add-note");

function adicionarNota() {

    const objetoNota = {
        id: 1,
        conteudo: inputNota.value,
        fixed: false,
    };

    //com base na nota eu crio o elemento
    const elementoNota = criarNota(objetoNota.id, objetoNota.conteudo);

    containerNota.appendChild(elementoNota); //faz com que a nota apareça na página

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

    return elemento;

}

//adiciona evento de criar nota quando é clicado no botao
botaoAddNota.addEventListener("click", () => adicionarNota());
