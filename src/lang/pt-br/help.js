/* global T, dom */

"use strict";

T.help = {
    fight: function(combos) {
        return dom.wrap("", [
            dom.make("h3", "Combate físico"),
            dom.make("p", "Efeito pode ser ativado ao bater em um inimigo (Exceto Nya)."),
            dom.make("p", "Irimi dá um pouco de velocidade quase o personagem tenha algum efeito ativo."),
            dom.table(["Nome", "Combo", "Descrição"], combos),
            dom.hr(),
            dom.make("h3", "Combate a distância"),
            dom.make("p", "Para usar uma arma de ataque à distância, sua segunda mão tem de estar livre."),
            dom.make("p", "Munição é usada para atirar. Depende do tipo de arma."),
            dom.make("p", "Você não precisa de munição na arena."),
            dom.wrap("", [
                "Toda arma de ataque à distância possui:",
                dom.ul([
                    "Alcance máximo: alvos fora de alance não serão atingidos.",
                    "Alcance efetivo: Será computada 100% da  inside this radius you got 100% accuracy.",
                    "Velocidade de disparo: o quão rápido um disparo é atirado",
                    "Tipo de munição: por exemplo pedras, flechas, átomos",
                    "Velocidade de munição: o quão rápido um disparo atingi um alvo.",
                ])
            ]),
            dom.make("p", "Para ver o alcance máximo, pressione ctrl+shift."),
            dom.make("p", "O alvo pode esquivar-se, caso o alvo saia do alcance."),
            dom.make("p", "Fora da zona de alcance efetivo, as chances de errar aumentam."),
        ]);
    },
    combos: {
        de: "Efeito (+absorver, +chance de bloqueio pelo escudo)",
        su: "Efeito (+dano, +chance de ataque crítico)",
        nya: "AOE Efeito (+chance de crítico para De, +absorção para Su)",
        ikkyo: "Combate (Provocação, pvp: 50% atordoamento de 1-5 segundos)",
        shihonage: "Combate (bastante dano, velocidade reduzida por 5 segundos)",
        iriminage: "Combate (20% de chance de atordoamento por 2 segundos)",
    },
};