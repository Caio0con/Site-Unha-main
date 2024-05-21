// Função para inicializar o carrossel
function initCarrossel() {
    const imagens = document.querySelectorAll('#unhas img');
    const larguraTotal = imagens.length * imagens[0].offsetWidth;
    const container = document.querySelector('.carrosel');
    container.style.width = larguraTotal + '900px';

    let posicaoAtual = 0;

    // Função para mover o carrossel para a esquerda
    function moverEsquerda() {
        if (posicaoAtual > 0) {
            posicaoAtual--;
            container.style.transform = `translateX(${posicaoAtual * -imagens[0].offsetWidth}px)`;
        }
    }

    // Função para mover o carrossel para a direita
    function moverDireita() {
        if (posicaoAtual < imagens.length - 1) {
            posicaoAtual++;
            container.style.transform = `translateX(${posicaoAtual * -imagens[0].offsetWidth}px)`;
        }
    }

    // Botões para mover o carrossel
    const botaoEsquerda = document.querySelector('#anterior');
    const botaoDireita = document.querySelector('#proximo');

    botaoEsquerda.addEventListener('click', moverEsquerda);
    botaoDireita.addEventListener('click', moverDireita);

    // Eventos de touch para mover o carrossel em dispositivos móveis
    container.addEventListener('touchstart', function (e) {
        const posicaoInicial = e.touches[0].clientX;
        let posicaoFinal;

        function onTouchMove(evento) {
            posicaoFinal = evento.touches[0].clientX;
        }

        function onTouchEnd() {
            if (posicaoFinal) {
                const diferenca = posicaoFinal - posicaoInicial;
                if (diferenca > 50) {
                    moverDireita();
                } else if (diferenca < -50) {
                    moverEsquerda();
                }
            }

            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchend', onTouchEnd);
        }

        container.addEventListener('touchmove', onTouchMove);
        container.addEventListener('touchend', onTouchEnd);
    });
}

// Função para direcionar para o WhatsApp
function agendarWhatsapp() {
    const data = document.getElementById('data-agendamento').value;
    if (data) {
        window.location.href = `https://api.whatsapp.com/send?phone=[Seu número de WhatsApp]&text=Olá, gostaria de agendar um horário para alongamento em gel no dia ${data}.`;
    } else {
        alert('Selecione uma data no calendário para agendar.');
    }
}

// Executando as funções após o carregamento da página
window.addEventListener('load', function () {
    initCarrossel();
});
