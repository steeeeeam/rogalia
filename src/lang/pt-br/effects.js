/* global Effects, T */

Effects.descriptions = {
    "ActivatedCarbon": {
        "class": "good",
        "effect": "Zera todas as vitaminas e remove os efeitos negativos de defecar.",
        "desc": "Status obtido quando consumir carvão ativado.",
    },
    "Arena": {
        "class": "",
        "effect": "Não há perda de karma e todas as penalidade por morte não se aplicam.",
        "desc": "Status obtido quando o personagem entra na arena.",
        "note": "",
    },
    "Bleed": {
        "class": "bad",
        "effect": "O personagem sofre dano constate causado por sangramento.",
        "desc": "Status obtido quando atacado por criaturas.",
    },
    "De": {
        "class": "fight",
        "effect": T.help.combos.de.effect,
        "desc": T.help.combos.de.desc,
    },
    "Drunk": {
        "class": "good",
        "effect": "Recupera 13% de vida e diminui 7% de dano",
        "desc": "Efeito obtido quando álcool é consumido. Às vezes faz dizer o que pensa.",
        "note": "Se você beber demais, nem mesmo carvão ativado vai te salvar da ressaca.",
    },
    "Fire": {
        "class": "bad",
        "effect": "O personagem sofre dano constate (30 de dano a cada 5 segundos).",
        "desc": "Status obtido quando atacado por armas ou criaturas com efeito de fogo.",
    },
    "Hangover": {
        "class": "",
        "effect": " +9 de força, -9 de destreza.",
        "desc": "Status obtido quando o personagem consome álcool (cerveja ou vinho).",
        "note": "Não é acumulável.",
    },
    "High": {
        "class": "good",
        "effect": "Diminui a quantidade de energia obtida dos alimentos. Cigarro de qualidade 1: 7%, Charuto de qualidade 1: 12% e Baseado de qualidade 1: 15%. Quanto maior for a qualidade, maior é a porcentagem.",
        "desc": "Status obtido quando fumar cigarros, charutos e baseados.",
        "note": "Acumulável ao sentar em uma cadeira proxima a uma mesa. Regenera 1% de pontos de vida a cada instante.",
    },
    "Inspiration": {
        "class": "fight",
        "effect": "Aumenta a chance de acerto crítico em conjunto de [де] aumenta a absorção de dano",
        "desc": "АоE buff"
    },
    "Lifting": {
        "class": "",
        "effect": "Velocidade de movimento diminui para 45.",
        "desc": "Status obtido quando o personagem levantando ou movendo itens pesados.",
        "note": "",
    },
    "MushroomTrip": {
        "class": "",
        "effect": "Aumenta 35 de velocidade de movimento, causa alucinações e perda de 10% pontos de vida (HP) a cada instante.",
        "desc": "Status obtido quando o personagem consome cogumelo cru.",
        "note": "Dano aumento de acordo com a quantidade de cogumelos consumida.",
    },
    "NewbieProtection": {
        "class": "",
        "effect": "Penalidade de morte.",
        "desc": "Level 1 a 9 - mantém o equipamento e a bolsa.\nLevel 10 a 24 - mantém a bolsa, mas perde seu conteúdo.\nDo level 25 em diante - perde todo equipamento e inventário.",
        "note": "Em qualquer level, você perderá as vitaminas e os pontos de aprendizado.",
    },
    "Nya": {
        "class": "fight",
        "effect": T.help.combos.nya.effect,
        "desc": T.help.combos.nya.desc,
    },
    "Overeat": {
        "class": "bad",
        "effect": "Reduz 45 de velocidade de movimento.",
        "desc": "Status obtido quando a energia do personagem estiver em 100 ou mais.",
        "note": "Alimentar-se sob o efeito deste status diminui suas vitaminas abaixo de 0. O jeito mais rápido de eliminar este efeito é defecando em um toalete ou em uma latrina, porém isto causará perda de 50% do seu pontos de vida (HP) restantes. Beber água também ajuda a eliminar este efeito mais rapidamente.",
    },
    "Plague": {
        "class": "bad",
        "effect": "Drena sua vida até a morte.",
        "desc": "Pode ser infectado enquanto fica próximo a uma pilha de lixo, de outro infectado ou sexo homossexual.",
        "note": "Pode ser curada com Poção anti-praga.",
    },
    "Prospecting": {
        "class": "good",
        "effect": "Permite que veja depósito de minérios próximos",
        "desc": "Status obtido ao usar um Garimpeiro",
    },
    "Riding": {
        "class": "good",
        "effect": "A velocidade do personagem aumenta consideravelmente. A penalidade por levantar itens não se aplica.",
        "desc": "Status obtido enquante estiver cavalgando em um cavalo.",
        "note": "",
    },
    "Sex": {
        "class": "good",
        "effect": "Diminui a energia em 20 pontos e recupera 50 de sede.",
        "desc": "Obtido com a NPC Margo.",
        "note": "A ação dura 1,5 minutos.",
    },
    "Sitting": {
        "class": "good",
        "effect": "Perda de energia é reduzida. Sentar próximo a uma mesa enquanto come diminui a quantidade de energia obtida dos alimentos.",
        "desc": "Status obtido quando o personagem senta em uma cadeira, trono ou toco.",
        "note": "",
    },
    "Slowed": {
        "class": "bad",
        "effect": "Velocidade de movimento do personagem é reduzida.",
        "desc": "",
        "note": "Não é acumulável.",
    },
    "Starving": {
        "class": "bad",
        "effect": "Diminui seus pontos de vida (HP) vagarosamente.",
        "desc": "Status obtido quando a fome do personagem chegar a 0.",
        "note": "Você pode morrer de fome.",
    },
    "Su": {
        "class": "fight",
        "effect": T.help.combos.su.effect,
        "desc": T.help.combos.su.desc,
    },
    "SynodProtection": {
        "class": "good",
        "effect": "Você recebe 80% menos dano no PVP.",
        "desc": "Não funciona debaixo da terra, se você contratacar ou se tiver karma negativo.",
        "note": "Permite que você retorne ao seu ponto de retorno ou para a cidade.",
    },
    "Thirsty": {
        "class": "bad",
        "effect": "A velocidade de movimento diminui em 45 e os pontos de vida (HP) diminuem vagarosamente. Você não pode cavar, minerar ou levantar itens.",
        "desc": "Status obtido quando a energia do personagem chega a 0.",
        "note": "",
    },
    "Vomit": {
        "class": "bad",
        "effect": "Você está doente e perde uma porcentagem de vida(HP).",
    },
    "Weakness": {
        "class": "bad",
        "effect": "Velocidade de movimento diminui 45 pontos. Personagem causa quase 0 de dano sob o efeito deste status.",
        "desc": "Status obtido quando o personagem renasce após a morte.",
        "note": "Pode ser removido ao consumir Poção de Força.",
    },
};
