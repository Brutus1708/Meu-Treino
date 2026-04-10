const bancoDeExercicios = {
    hipertrofia: {
        validacao: "Protocolo baseado em Tensão Mecânica. Prioridade para exercícios multiarticulares em máquinas de alta estabilidade (estilo Gaviões/Smart), permitindo progressão de carga segura.",
        treinos: [
            { nome: "Leg Press 45°", series: 4, reps: "10-12", grupo: "Quadríceps", obs: "Pés na largura dos ombros" },
            { nome: "Cadeira Extensora", series: 3, reps: "12-15", grupo: "Quadríceps", obs: "Pico de contração 2s" },
            { nome: "Puxada Vertical (Pulley)", series: 4, reps: "8-10", grupo: "Dorsais", obs: "Foco na descida controlada" },
            { nome: "Remada Baixa Triângulo", series: 3, reps: "10-12", grupo: "Costas", obs: "Tronco estabilizado" },
            { nome: "Rosca Direta na Polia", series: 4, reps: "12", grupo: "Bíceps", obs: "Sem balançar o tronco" }
        ]
    },
    definicao: {
        validacao: "Protocolo de Densidade Metabólica. Intervalos de 45 segundos para manter o EPOC elevado, utilizando máquinas para manter a técnica sob fadiga.",
        treinos: [
            { nome: "Agachamento Smith", series: 4, reps: "15", grupo: "Pernas", obs: "Amplitude máxima" },
            { nome: "Supino Inclinado Máquina", series: 4, reps: "12-15", grupo: "Peitoral", obs: "Cadência 3030" },
            { nome: "Cadeira Flexora", series: 3, reps: "15", grupo: "Posterior", obs: "Movimento fluido" },
            { nome: "Desenvolvimento Máquina", series: 3, reps: "12-15", grupo: "Ombros", obs: "Pegada pronada" },
            { nome: "Burpee + Prancha", series: 3, reps: "60s", grupo: "FullBody", obs: "Intensidade máxima" }
        ]
    }
};

function gerarTreino() {
    const objetivo = document.getElementById('objetivo').value;
    const peso = document.getElementById('peso').value;
    
    if(!peso) return alert("Insira seu peso para o cálculo de volume!");

    const plano = bancoDeExercicios[objetivo];
    const listaHtml = document.getElementById('listaExercicios');
    const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    
    document.getElementById('diaTexto').innerText = dias[new Date().getDay()];
    document.getElementById('validacaoTexto').innerText = plano.validacao;
    
    listaHtml.innerHTML = '';
    
    plano.treinos.forEach(ex => {
        listaHtml.innerHTML += `
            <div class="relative pl-6 border-l-2 border-gray-800">
                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                <div class="flex justify-between items-start mb-1">
                    <h3 class="font-black text-lg leading-none uppercase">${ex.nome}</h3>
                    <span class="text-green-500 font-bold">${ex.series}x${ex.reps}</span>
                </div>
                <p class="text-xs text-gray-500 font-bold uppercase mb-2">${ex.grupo}</p>
                <div class="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                    <p class="text-[10px] text-gray-400 italic font-medium">Dica do Especialista: ${ex.obs}</p>
                </div>
            </div>
        `;
    });

    document.getElementById('setupScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    window.scrollTo(0,0);
}

function voltarParaSetup() {
    document.getElementById('setupScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('hidden');
}