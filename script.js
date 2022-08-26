let pessoa = {
    name: prompt("Qual seu lindo nome?")
};

function enviaNome() {
    // Envia o nick para API dos Participantes
    const envia = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", pessoa);

    //Recebe a resposta da API e chama da função mantemConexão
    envia.then(mantemConexao);
}

function mantemConexao() {
    //A cada 5 segundos, manda uma requisição para a API para manter a conexão
    setInterval(function() {
        const mantem = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", pessoa);

        //Recebe a resposta da API e mostra no console
        mantem.then((curintia) => {
            console.log(curintia.status);
        })
    }, 5000);
}

enviaNome();