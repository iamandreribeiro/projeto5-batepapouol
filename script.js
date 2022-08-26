let pessoa = {
    name: prompt("Qual seu lindo nome?")
};

function perguntaNome() {
    const envia = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", pessoa);

    envia.then((resposta) => {
        console.log(resposta);
    });
}