/* global Effects */


Effects.descriptions = {
    "Overeat": {
		"class": "Ruim",
		"effect": "Velocidade de movimento do personagem diminui em 45.",
		"desc": "Status obtido quando a fome do personagem estiver em 100 ou mais.",
		"note": "Alimentar-se sob o efeito deste status diminui suas vitaminas abaixo de 0. O jeito mais rápido de eliminar este efeito é defecando em um toalete ou em uma latrina, mas isto causa perda de 50% de seu pontos de vida (HP) restantes. Beber água também ajuda a eliminar este efeito mais rapidamente.",
    },
    "Starving": {
		"class": "Ruim",
		"effect": "Drena seus pontos de vida (HP) vagarosamente.",
		"desc": "Status obtido quando a fome do personagem chegar a 0.",
		"note": "Você pode morrer de fome.",
    },
    "Thirsty": {
		"class": "Ruim",
		"effect": "A velocidade de movimento diminui em 45 e os pontos de vida (HP) diminuem vagarosamente. Você não pode cavar, minerar ou levantar itens.",
		"desc": "Status obtido quando a energia do personagem chega a 0.",
        "note": "",
    },
    "Lifting": {
        "class": "",
		"effect": "Velocidade de movimento diminui para 45.",
		"desc": "Status obtido quando o personagem levantando ou movendo itens.",
        "note": "",
    },
    "Fire": {
		"class": "Ruim",
		"effect": "O personagem sofre dano constate (30 de dano a cada 5 segundos).",
		"desc": "Status obtido quando atacado por armas ou criaturas do elemento: Fogo.",
    },
    "Bleed": {
		"class": "Ruim",
		"effect": "O personagem sofre dano constate.",
		"desc": "Status obtido quando atacado por criaturas.",
    },
    "Hangover": {
        "class": "",
		"effect": " +9 de força, -9 de destreza.",
		"desc"; "Status obtido quando o personagem consome álcool (cerveja, vinho, etc.).",
		"note": "Não é acumulável.",
    },
    "Sitting": {
		"class": "Bom",
		"effect": "Perda de energia é reduzida. Sentar próximo a uma mesa enquanto come diminui a quantidade de energia ganha dos alimentos.",
		"desc": "Status obtido quando o personagem senta em uma cadeira, trono ou toco.",
        "note": "",
    },
    "MushroomTrip": {
        "class": "",
		"effect": "Aumenta a velocidade para 135, causa alucinações e perde 3 pontos de vida a cada instante.",
		"desc": "Status obtido quando o personagem consome cogumelo cru.",
		"note": "Dano aumento de acordo com a quantidade de cogumelos consumida.",
    },
    "Sex": {
		"class": "Bom",
		"effect": "Diminui a saciedade em 10 pontos e aumenta a energia em 25 pontos.",
		"desc": "Obtido com a NPC Margo.",
		"note": "A ação dura 1,5 minutos.",
    },
    "Arena": {
        "class": "",
		"effect": "Não há perda de karma e todas as penalidade por morte não se aplicam.",
		"desc": "Status obtido quando o personagem entra na arena.",
        "note": "",
    },
    "Riding": {
		"class": "Bom",
        "effect": "A velocidade do personagem aumenta bastante. A penalidade por levantar itens não se aplica.",
        "desc": "Status obtido enquante estiver cavalgando em um cavalo.",
        "note": "",
    },
    "Slowed": {
        "class": "Ruim",
        "effect": "Velocidade de movimento do personagem diminui em 45 pontos.",
        "desc": "Status obtido quando for atingido por criatura que possue a magia de reduzir velocidade.",
        "note": "Não é acumulável.",
    },
    "High": {
        "class": "Bom",
        "effect": "Diminui a quantidade de energia obtida dos alimentos. Redução: Cigarro: 5%, Charuto: 10% e Baseado: 15%. Quanto maior for a qualidade, maior é a porcentagem.",
        "desc": "Status obtido quando fumar cigarros, charutos e baseados.",
        "note": "Acumulável com o status: Sentar. Regenera 12% de pontos de vida por 12 instantes.",
    },
    "Weakness": {
        "class": "Ruim",
        "effect": "Velocidade de movimento cai para 45 pontos. Personagem causa praticamente 0 de dano sob o efeito deste status.",
        "desc": "Status obtido quando o personagem renasce após a morte.",
        "note": "Pode ser removido ao consumir Poção de Força.",
    },
    "ActivatedCarbon": {
        "class": "Bom",
        "effect": "Zera todas as vitaminas e remove os efeitos negativos de defecar.",
        "desc": "Status obtido quando consumir carvão ativado.",
    },
    "Drunk": {
        "class": "Bom",
        "effect": "Recupera alguns pontos de vida. Às vezes te faz falar o que pensa.",
        "desc": "Status obtido quando álcool é consumido.",
        "note": "Se você beber demais, nem mesmo carvão ativado vai te salvar da ressaca.",
    },
    "Plague": {
        "class": "Ruim",
        "effect": "Drena sua vida até a morte.",
        "desc": "Pode ser infectado enquanto fica próximo a uma pilha de lixo, de outro paciente ou sexo homossexual.",
        "note": "Pode ser curada com Poção anti-praga.",
    },
    "SynodProtection": {
        "class": "Bom",
        "effect": "Você recebe 80% menos dano no PVP.",
        "desc": "Não funciona debaixo da terra, se você contratacar ou se tiver karma negativo.",
        "note": "Permite que você retorne ao seu ponto de retorno.",
    },
    "Prospecting": {
        "class": "Bom",
        "effect": "Permite que veja depósito de minérios próximos",
        "desc": "Status obtido ao usar o prospector",
    },
    "NewbieProtection": {
        "class": "",
        "effect": "Penalidade de morte.",
        "desc": "Level 1 a 9 - mantém o equipamento e a bolsa.\nLevel 10 a 19 - mantém a bolsa, mas perde seu conteúdo.\nDo level 20 em diante - perde todo equipamento e inventário.",
        "note": "Em qualquer level, você perderá as vitaminas e os pontos de aprendizado.",
    },
    "De": {
        "class": "Luta",
    },
    "Su": {
        "class": "Luta",
    },
    "Nya": {
        "class": "Luta",
    },
    "Inspiration": {
        "class": "Luta",
    },
};
