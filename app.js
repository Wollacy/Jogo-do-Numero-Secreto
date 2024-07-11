let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let paragrafo = document.querySelector(tag);
    paragrafo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativa);

        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('h1', 'Errou!');
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor!');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;

    limparCampo();
    exibirMensagemInicial();

    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}