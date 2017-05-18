/* global T, dom */

"use strict";

T.help = {
    fight: function(combos) {
        return dom.wrap("", [
            dom.make("h3", "Combate físico"),
            dom.make("p", "Efeito pode ser ativado ao bater em um inimigo (Exceto Nya). O tempo de espera entre a série de golpes para não ser mais de 3 segundos."),
            dom.make("p", "Irimi aumenta a velocidade de movimento do personagem, enquanto o personagem tenha esteja ispirado."),
            dom.table(["Nome", "Combo", "Descrição"], combos),
            dom.hr(),
            dom.make("h3", "Combate a distância"),
            dom.make("p", "Para usar uma arma de ataque à distância, sua segunda mão tem de estar livre."),
            dom.make("p", "Munição é usada para atirar. Dependendo do tipo de arma."),
            dom.make("p", "Você não precisa de munição na arena."),
            dom.wrap("", [
                "Toda arma de ataque à distância possui:",
                dom.ul([
                    "Alcance máximo: alvos fora de alance não serão atingidos.",
                    "Alcance efetivo: Será computada 100% da  inside this radius you got 100% accuracy.",
                    "Velocidade de disparo: o quão rápido um disparo é atirado.",
                    "Tipo de munição: por exemplo pedras, flechas, átomos.",
                    "Velocidade de munição: o quão rápido um disparo atingi um alvo.",
                ])
            ]),
            dom.make("p", "Para ver o alcance máximo, pressione ctrl+shift."),
            dom.make("p", "O alvo pode esquivar-se, caso o alvo saia do alcance."),
            dom.make("p", "Fora da zona de alcance efetivo, as chances de errar aumentam."),
        ]);
    },
    combos: {
        de: {
          desc: "Buff",
          effect: "+absorção, +chance de bloqueio pelo escudo.",
        },
        su: {
          desc: "Buff",
          effect: "+dano, +chance de ataque crítico.",
        },
        nya: {
          desc: "AoE Buff",
          effect: "+chance de crítico para [su], +absorção para [de].",
        },
        ikkyo: {
          desc: "Combate",
          effect: "provocação, PVP: 50% atordoamento por 0.5 até 1.5 segundos.",
        },
        shihonage: {
          desc: "Combate",
          effect: "dano alto, velocidade reduzida por 5 segundos.",
        },
        iriminage: {
          desc: "Combate",
          effect: "20% de chance de atordoamento por 2 segundos.",
        },
    },
};
