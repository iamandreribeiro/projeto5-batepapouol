// Criação do Objeto com Nome de Usuário.
let pessoa = {
    name: prompt("Qual seu lindo nome?")
};

function enviaNome() {
    // Envia um requerimento com o Nome de Usuário para a API.
    const envia = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", pessoa);

    // Recebe a resposta da API com sucesso e chama a função mantemConexão.
    envia.then(mantemConexao);
}

function mantemConexao() {
    // Metodo que envia um requerimento para a API a cada 5 segundos.
    setInterval(function() {
        const mantem = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", pessoa);

        // Recebe a resposta da API com sucesso e printa no console.
        mantem.then((online) => {
            console.log(online.status);
        })
    }, 5000);
}

function buscaMensagem() {
    // Envia um requerimento para a API para receber as mensagens.
    const busca = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    // Recebe a resposta da API com sucesso e chama a função exibeMensagem.
    busca.then(exibeMensagem);
}

function exibeMensagem() {
    // Envia um requerimento para a API para receber as mensagens.
    const busca = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

    // Criação de variavel JS com elemento HTML como parametro
    let caixaMensagem = document.querySelector(".conteudo");

    //Criação de vetor de mensagens
    let vetorMensagem = [];

    //Recebe a resposta da API
    busca.then((renderiza) => {  
        for(let i = 0; i < renderiza.data.length; i++) {
            let mensagem = document.createElement("div");

            if(renderiza.data[i].type === 'status') {
                mensagem.classList.add("entrou");                
            } else if (renderiza.data[i].type === 'message') {
                mensagem.classList.add("mensagem");
            } else {
                mensagem.classList.add("privado");
            }

            let tempo = `<a>(${renderiza.data[i].time})</a>`;
            mensagem.innerHTML += tempo;

            let nome = `<b>${renderiza.data[i].from}</b>`;
            mensagem.innerHTML += nome;

            if (renderiza.data[i].type === 'message') {
                let para = `<i>para</i><b>${renderiza.data[i].to}:</b>`;
                mensagem.innerHTML += para;
            } else if (renderiza.data[i].type === 'private_message'){
                let para = `<i>reservadamente para</i><b>${renderiza.data[i].to}:</b>`;
                mensagem.innerHTML += para;
            }

            let texto = renderiza.data[i].text;
            mensagem.innerHTML += texto;

            vetorMensagem.push(mensagem);

            caixaMensagem.appendChild(vetorMensagem[i]);
        }
    })
}

buscaMensagem();
enviaNome();