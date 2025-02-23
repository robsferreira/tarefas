// Função para salvar o histórico no localStorage
function salvarHistorico(historico) {
    localStorage.setItem('historicoTarefas', JSON.stringify(historico));
}

// Função para carregar o histórico do localStorage
function carregarHistorico() {
    const historico = localStorage.getItem('historicoTarefas');
    return historico ? JSON.parse(historico) : [];
}

// Função para exibir o histórico na interface
function exibirHistorico() {
    const historico = carregarHistorico();
    const historicoTarefas = document.getElementById('historico-tarefas');
    historicoTarefas.innerHTML = ''; // Limpa o conteúdo anterior

    historico.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.filho}: ${item.tarefa} - ${item.pontos > 0 ? '+' : ''}${item.pontos} pontos`;
        historicoTarefas.appendChild(li);
    });
}

// Adiciona uma nova tarefa ao histórico
document.getElementById('form-tarefa').addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura os valores do formulário
    const filho = document.getElementById('filho').value;
    const tarefa = document.getElementById('tarefa').value;
    const pontos = parseInt(document.getElementById('pontos').value);

    // Atualiza o total de pontos
    const totalPontosElement = document.getElementById('total-pontos');
    let totalPontos = parseInt(totalPontosElement.textContent) || 0;
    totalPontos += pontos;
    totalPontosElement.textContent = totalPontos;

    // Adiciona a tarefa ao histórico
    const historico = carregarHistorico();
    historico.push({ filho, tarefa, pontos });
    salvarHistorico(historico);

    // Exibe o histórico atualizado
    exibirHistorico();

    // Limpa o formulário
    document.getElementById('form-tarefa').reset();

    // Envia os dados para o PHP (opcional, se ainda quiser salvar no servidor)
    fetch('salvar_pontos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filho, tarefa, pontos }),
    });
});

// Função para resetar os pontos e o histórico
document.getElementById('resetar-pontos').addEventListener('click', function () {
    if (confirm('Tem certeza que deseja resetar todos os pontos e o histórico?')) {
        // Reseta a interface
        document.getElementById('total-pontos').textContent = '0';
        localStorage.removeItem('historicoTarefas'); // Remove o histórico do localStorage
        exibirHistorico(); // Atualiza a exibição do histórico

        // Envia uma requisição para o PHP resetar o arquivo (opcional)
        fetch('resetar_pontos.php', {
            method: 'POST',
        })
        .then(response => response.text())
        .then(message => {
            alert(message); // Exibe a mensagem de sucesso
        })
        .catch(error => {
            console.error('Erro ao resetar pontos:', error);
        });
    }
});

// Carrega o histórico ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    exibirHistorico(); // Exibe o histórico salvo
    carregarPontosPorFilho(); // Carrega os pontos por filho (se ainda estiver usando)
});

// Função para carregar os pontos por filho
function carregarPontosPorFilho() {
    fetch('carregar_pontos.php')
        .then(response => response.json())
        .then(data => {
            const pontosFilhos = document.getElementById('pontos-filhos');
            pontosFilhos.innerHTML = ''; // Limpa o conteúdo anterior

            // Exibe os pontos de cada filho
            for (const [filho, pontos] of Object.entries(data)) {
                const card = document.createElement('div');
                card.className = 'filho-card';
                card.innerHTML = `
                    <h3>${filho}</h3>
                    <p>Total de Pontos: ${pontos}</p>
                `;
                pontosFilhos.appendChild(card);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar pontos:', error);
        });
}

// Carrega os pontos por filho ao carregar a página
document.addEventListener('DOMContentLoaded', carregarPontosPorFilho);

// Mostra ou oculta o botão "Voltar ao Topo" conforme o scroll
window.onscroll = function () {
    const btnTopo = document.getElementById('btn-topo');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnTopo.style.display = 'block';
    } else {
        btnTopo.style.display = 'none';
    }
};

// Rola a página de volta ao topo com animação suave
document.getElementById('btn-topo').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolagem suave
    });
});