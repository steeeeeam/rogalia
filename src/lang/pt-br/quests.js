/* global Quest */

"use strict";

Quest.chains = {
    "tutorial": "tutorial",
    "teleportation": "teletransporte",
};

Quest.quests =  {
    "tutorial-start": {
        name: "Iniciando",
        desc: [
            "Olá, cidadão.",
            "Todos que chegam, vem à minha academia. Meu trabalho aqui é ensinar o básico de sobrevivência.",
        ],
        final: "Ótimo, vamos começar.",
    },
    "craft-1": {
        name: "Coletando materiais.",
        desc: [
          "Para sobreviver nestas terras selvagens você precisará de ferramentas e para criá-las, precisará de materiais.",
          "Colete 4 pedras, 2 galhos grandes e 1 galho pequeno.",
        ],
        tip: "<rmb>Pegar galho grande</rmb> e <rmb>Pegar galho pequeno</rmb> em uma árvore.<br><lmb></lmb> pegar pedras do chão.",
    },
    "craft-1-2": {
        name: "Fazendo o cabo da faca",
        desc: "Agora, faça graveto a partir do galho grande e ramo do galho pequeno. Usaremos para fazer o cabo.",
        tip: "<rmb>Quebrar</rmb> em um galho grande para obter um graveto, fazendo o mesmo em um galho pequeno, obtem-se um ramo.",
    },
    "craft-2": {
        name: "Fazendo a lâmina da faca",
        desc: "A faca tem que ter uma lâmina. Faça utilizando pedras afiadas.",
        tip: "<lmb></lmb> no ícone da pedra afiada.<br>Arraste as pedras até a receita e clique em <hl>Criar</hl>",
    },
    "craft-2-1": {
        name: "Fazendo uma faca",
        desc: "Perfeito! Tudo está pronto! Finalmente vamos fazer uma faca.",
        tip: "Para simplificar, você pode clicar no botão <hl>Auto</hl> e depois em <hl>Criar</hl>",
    },
    "craft-3": {
        name: "Fazendo uma arma",
        desc: "Ótimo, agora vamos fabricar um graveto afiado, sua primeira arma. Em breve, você precisará dela.",
        dica: "<rmb>Equipar</rmb> sobre a faca."
    },
    "stat-1": {
        name: "Com sede",
        desc: "Agora eu o ensinarei como obeter comida e água.<br>Colete cascas de uma árvore e faça uma caneca. Encha-a com água. Não se preocupe, a água aqui é limpa.",
        tip: "Vá até a água e <rmb>Encher</rmb> em uma caneca.<br><rmb>Beber</rmb> aumentará sua (sede).",
    },
    "stat-2": {
        name: "Com fome",
        desc: [
          "É hora de comer algo. Pegue maçãs da macieira.",
          "Tenha cuidado, não coma mais do que você aguenta, senão a comida não dará vitaminas e você ficará empanturrado, andará lentamente.",
          "Por falar nisso, se você comer demais, use o toalete próximo à mim.",
        ]
    },
    "fight": {
        name: "Luta e combos",
        desc: "Bem, eu vi que fechou os seus punhos.<br>Equipe o graveto afiado e acerte o boneco de treino.",
        tip: "O ataque seguirá a posição do cursor do mouse.<br>Botões de habilidades e atalhos podem ser encontrados no painel do canto inferior direito.",
    },
    "finish": {
        name: "Fim do tutorial",
        desc: "Bem, eu lhe ensinei o básico de sobrevivência nestas terras.",
        final: "É hora de ir à cidade, há muitos de vocês que eu ainda tenho que ensinar. Comece conversando com o banqueiro Scrooge"
    },
    "claim-get-license": {
        name: "Licença",
        desc: "Olá novato. Dinheiro movimenta este jogo, entendeu? E é melhor você não andar por ai com dinheiro. Eu vou lhe ensinar como proteger seu patrimonio. Você sabe que pode guardar seu dinheiro em meu banco, certo? Para isso você deve comprar uma licença.",
        tip: "Você pode pegar uma licença com o Scrooge (opção Banco).",
    },
    "claim-build": {
        name: "Construção",
        desc: [
            "A licença custa dinheiro, mas ela será capaz de proteger você la fora.",
            "Você pode construir em qualquer lugar não ocupado por outros jogadores e depois espandi-la.",
            "Não tenha pressa para escolher um lugar, caso precise reposicionar será necessário comprar outro.",
            "Coloque uma pedra de ressurgimento próximo, está é uma forma de retornar rapidamente.",
        ],
    },
    "claim-extend": {
        name: "Estender",
        desc: "Você pode estender seu domínio mas não se esqueça que o aluguel irá aumentar.",
        //final: "Parece"
        final: "Seems to be done, yeah? Now you can settle and build on your own. Ofcourse, people still can rob you, but now you can punish the crime. The Law is on your side for now. By the way, go visit the butcher, he seems to have something to say you."
    },
    "tp-return-home": {
        name: "Teleporte: Voltando pra casa" ,
        desc: "Você está interessado em portais? Te falarei sobre os meios de viajar pelo mundo.<br> Enquanto estiver na superfície e sob a proteção do clérigo, pode facilmente retornar para suas terras ou para a cidade. Quero dizer, seu ponto de ressurgimento, se você o construiu. Tente!.",
        "tip": "<rmb>Clique no seu avatar (canto superior esquerdo da tela)</rmb> para retornar às suas terras.",
    },
    "tp-respawn": {
        name: "Teleporte: Ressurgimento",
        desc: "Pontos de ressurgimento da cidade são conectados ao seu próprio ponto.<br> Você pode viajar usando o ponto de ressurgimento, mas sua função primária é te ressuscitar caso morra. Quando construir seu próprio ponto, verá que parece diferente dos outros.",
        tip: "<lmb></lmb> no próximo respawn."
    },
    "tp-scrolls": {
        name: "Teleporte: Pergaminhos",
        desc: "Pergaminhos de teleporte permitem que volte de lugares perigosos à sua casa. Ajudam muito ao explorar cavernas.<br>Te darei alguns, mas você pode comprá-los ou fazê-los.",
    },
    "faction-daily-1": {
        name: "Ajude sua facção (tarefa diária)",
        desc: "Aumenta o status na facção",
    },
    "garland-daily": {
        name: "Guirlanda (tarefa diária)",
        desc: "Ajude o Papai Noel a fazer uma guirlanda",
    },
    "chrismas-flags-daily": {
        name: "Flags (tarefa diária)",
        desc: "Ajude o Papai Noel a fazer bandeiras de papel",
    },
    "chrismas-decoration-daily-2": {
        name: "Decoração (tarefa diária)",
        desc: "Ajuda a filha do Papai Noel a fazer decorações de papel",
    },
    "chrismas-decoration-daily-1": {
        name: "Decoração de vidro (tarefa diária)",
        desc: "Ajude a filha do Papai Noel a fazer algumas decorações de vidro",
    },
    "chrismas": {
        name: "Chapéu de Natal",
        desc: "Feliz Natal e Feliz Ano Novo! Este é o seu presente!",
        final: "Aqui está o seu chapéu.",
        customReward: "Chapéu de Natal",
    },
    "chrismas-presents": {
        name: "Presente de Natal (tarefa diária).",
        desc: "Finalmente é Natal! Você que presente?",
        final: "Aqui está o seu presente.",
    },
    "buy-small-indulgence": {
        name: "Indulgência Pequena",
        desc: [
            "Você sempre pode se confessar aqui.",
        ],
        customReward: "+100 Karma",
    },
    "buy-average-indulgence": {
        name: "Indulgência Média",
        desc: [
            "Você sempre pode se confessar aqui.",
        ],
        customReward: "+1000 Karma",
    },
    "buy-big-indulgence": {
        name: "Indulgência Grande",
        desc: [
            "Você sempre pode se confessar aqui.",
        ],
        customReward: "+10000 Karma",
    }
};
