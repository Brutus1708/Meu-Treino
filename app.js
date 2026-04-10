// BANCO DE DADOS DE EXERCÍCIOS (Com imagens provisórias seguras)
const dbExercicios = {
    peito: [
        { nome: "Supino Reto Barra", tipo: "forca", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Supino+Reto" },
        { nome: "Supino Inclinado Halteres", tipo: "hipertrofia", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Supino+Inclinado" },
        { nome: "Crucifixo Máquina", tipo: "isolador", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Crucifixo" },
        { nome: "Crossover Polia Alta", tipo: "isolador", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Crossover" }
    ],
    costas: [
        { nome: "Puxada Frontal", tipo: "hipertrofia", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Puxada+Frontal" },
        { nome: "Remada Curvada", tipo: "forca", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Remada+Curvada" },
        { nome: "Remada Máquina Articulada", tipo: "hipertrofia", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Remada+Maquina" }
    ],
    pernas: [
        { nome: "Agachamento Livre", tipo: "forca", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Agachamento" },
        { nome: "Leg Press 45", tipo: "hipertrofia", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Leg+Press" },
        { nome: "Cadeira Extensora", tipo: "isolador", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Cadeira+Extensora" },
        { nome: "Cadeira Flexora", tipo: "isolador", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Cadeira+Flexora" }
    ],
    ombros: [
        { nome: "Desenvolvimento Halteres", tipo: "hipertrofia", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Desenvolvimento" },
        { nome: "Elevação Lateral", tipo: "isolador", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Elevacao+Lateral" }
    ],
    bracos: [
        { nome: "Rosca Direta Barra", tipo: "hipertrofia", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Rosca+Direta" },
        { nome: "Tríceps Polia", tipo: "isolador", gif: "https://placehold.co/600x400/262626/a3a3a3?text=Animacao:+Triceps+Polia" }
    ]
};

// INICIALIZAÇÃO
window.onload = () => {
    const planoSalvo = localStorage.getItem("meuPlanoTreino");
    if (planoSalvo) {
        meuPlano = JSON.parse(planoSalvo);
        mostrarApp();
    }
};

let meuPlano = {};

function sortearExercicios(array, qtd) {
    let embaralhado = array.sort(() => 0.5 - Math.random());
    return embaralhado.slice(0, qtd);
}

function gerarPlano() {
    const peso = document.getElementById('peso').value;
    const nivel = document.getElementById('nivel').value;
    const objetivo = document.getElementById('objetivo').value;

    if (!peso || !nivel || !objetivo) {
        alert("Preencha todos os campos!");
        return;
    }

    let multiplicadorForca = nivel === 'iniciante' ? 0.15 : (nivel === 'intermediario' ? 0.3 : 0.5);
    let cargaBase = Math.round(peso * multiplicadorForca);

    const treinoA = [
        ...sortearExercicios(dbExercicios.peito, 3),
        ...sortearExercicios(dbExercicios.bracos, 1)
    ];
    const treinoB = [
        ...sortearExercicios(dbExercicios.costas, 3),
        ...sortearExercicios(dbExercicios.bracos, 1)
    ];
    const treinoC = [
        ...sortearExercicios(dbExercicios.pernas, 4),
        ...sortearExercicios(dbExercicios.ombros, 2)
    ];

    let series = objetivo === 'hipertrofia' ? "4" : "3";
    let reps = objetivo === 'hipertrofia' ? "8 a 12" : "12 a 15";

    const formatar = (ex) => ({
        nome: ex.nome,
        gif: ex.gif,
        series: series,
        reps: reps,
        cargaSugestao: ex.tipo === "isolador" ? Math.max(5, cargaBase - 5) + " kg" : cargaBase + " kg"
    });

    meuPlano = {
        divisoes: [
            { id: "A", nome: "Treino A - Peito e Tríceps", exercicios: treinoA.map(formatar) },
            { id: "B", nome: "Treino B - Costas e Bíceps", exercicios: treinoB.map(formatar) },
            { id: "C", nome: "Treino C - Pernas e Ombros", exercicios: treinoC.map(formatar) }
        ],
        dataCriacao: new Date().toLocaleDateString()
    };

    localStorage.setItem("meuPlanoTreino", JSON.stringify(meuPlano));
    mostrarApp();
}

function mostrarApp() {
    document.getElementById('setupScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    
    renderizarTreinoDoDia();
    renderizarPlanoCompleto();
}

function renderizarTreinoDoDia() {
    const diaHoje = new Date().getDay();
    let indexTreino = (diaHoje - 1) % meuPlano.divisoes.length; 
    if(diaHoje === 0) indexTreino = 0; 

    const treinoDeHoje = meuPlano.divisoes[indexTreino];
    
    document.getElementById('appHeaderSub').innerText = treinoDeHoje.nome;
    const tabHoje = document.getElementById('tabHoje');
    tabHoje.innerHTML = '';

    treinoDeHoje.exercicios.forEach((ex, i) => {
        tabHoje.innerHTML += `
            <div class="exercise-card">
                <div class="gif-container">
                    <img src="${ex.gif}" alt="${ex.nome}">
                </div>
                <div class="p-4">
                    <h3 class="font-black text-lg text-white mb-2">${i+1}. ${ex.nome}</h3>
                    <div class="flex justify-between bg-[#262626] p-3 rounded-lg">
                        <div class="text-center">
                            <p class="text-[#a3a3a3] text-[10px] uppercase">Séries</p>
                            <p class="text-green-500 font-bold text-lg">${ex.series}</p>
                        </div>
                        <div class="text-center">
                            <p class="text-[#a3a3a3] text-[10px] uppercase">Reps</p>
                            <p class="text-white font-bold text-lg">${ex.reps}</p>
                        </div>
                        <div class="text-center">
                            <p class="text-[#a3a3a3] text-[10px] uppercase">Carga Sugerida</p>
                            <p class="text-blue-400 font-bold text-lg">${ex.cargaSugestao}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderizarPlanoCompleto() {
    const listaSemana = document.getElementById('listaSemana');
    listaSemana.innerHTML = '';

    meuPlano.divisoes.forEach(divisao => {
        listaSemana.innerHTML += `
            <div class="bg-[#171717] border border-[#333] rounded-xl p-4 mb-4">
                <h3 class="text-green-500 font-black text-lg mb-2">${divisao.nome}</h3>
                <ul class="text-gray-300 text-sm space-y-2">
                    ${divisao.exercicios.map(ex => `<li>• ${ex.nome} (${ex.series}x${ex.reps})</li>`).join('')}
                </ul>
            </div>
        `;
    });
}

function trocarAba(aba) {
    document.getElementById('tabHoje').classList.add('hidden');
    document.getElementById('tabSemana').classList.add('hidden');
    document.getElementById('btnNavHoje').classList.remove('active');
    document.getElementById('btnNavSemana').classList.remove('active');

    if(aba === 'hoje') {
        document.getElementById('tabHoje').classList.remove('hidden');
        document.getElementById('btnNavHoje').classList.add('active');
        document.getElementById('appHeaderTitle').innerText = "Treino de Hoje";
    } else {
        document.getElementById('tabSemana').classList.remove('hidden');
        document.getElementById('btnNavSemana').classList.add('active');
        document.getElementById('appHeaderTitle').innerText = "Plano da Semana";
        document.getElementById('appHeaderSub').innerText = `Criado em: ${meuPlano.dataCriacao}`;
    }
}

function resetarApp() {
    if(confirm("Deseja apagar seu plano atual e gerar um novo?")) {
        localStorage.removeItem("meuPlanoTreino");
        location.reload(); 
    }
}
