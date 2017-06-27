/* global Effects */

Effects.descriptions = {
    "Overeat": {
        "class": "bad",
        "effect": "Скорость перемещения персонажа снижается на 45.",
        "desc": "Приобретается при достижении параметром сытость значения 100 и выше.",
        "note": "Дальнейшее употребление еды в этом состоянии вызывает уменьшение витаминов (в том числе отрицательные значения). Самый быстрый способ снять переедание - испражниться на туалете, при этом есть побочный эффект, снимающий 50% от текущих очков жизни. Употребление воды также может помочь быстрее избавиться от переедания.",
    },
    "Starving": {
        "class": "bad",
        "effect": "Постепенно отнимает здоровье",
        "desc": "Приобретается при достижении параметром сытость значения 0.00.",
        "note": "Вы можете умереть от голода",
    },
    "Thirsty": {
        "class": "bad",
        "effect": "Скорость перемещения персонажа снижается на 45 и постепенно отнимает здоровье. Становятся недоступны копание земли, добыча руды и перенос предметов (lifting).",
        "desc": "Приобретается при достижении параметром выносливость значения 0.00.",
        "note": "",
    },
    "Lifting": {
        "class": "",
        "effect": "Скорость перемещения персонажа снижается на 45.",
        "desc": "Приобретается при поднятии переносимых объектов или переносимых вещей.",
        "note": "",
    },
    "Fire": {
        "class": "bad",
        "effect": "Наносит разнесенный по времени урон, 30 повреждений в 5 секунд.",
        "desc": "Приобретается при получении ударов некоторыми видами оружия и при атаке некоторых существ.",
    },
    "Bleed": {
        "class": "bad",
        "effect": "Наносит разнесенный по времени урон.",
        "desc": "Приобретается при атаке существ.",
    },
    "Sitting": {
        "class": "good",
        "effect": "Снижается скорость накопления жажды. При сидении за столом уменьшается прирост сытости от приема пищи.",
        "desc": "Появляется, когда персонаж садится на стул, трон или пень.",
        "note": "",
    },
    "MushroomTrip": {
        "class": "",
        "effect": "Увеличивает скорость передвижения до 135, вызывает галлюцинации, потеря 3 очка здоровья в тик.",
        "desc": "Приобретается при употреблении сырых грибов.",
        "note": "Урон растет пропорционально количеству съеденных грибов.",
    },
    "Sex": {
        "class": "good",
        "effect": "По истечении каста параметр сытость уменьшается на 10, параметр выносливость уменьшается на 25.",
        "desc": "Покупается у Марго.",
        "note": "Длительность каста - полторы минуты.",
    },
    "Arena": {
        "class": "",
        "effect": "При убийстве не падает карма, аннулируются все штрафы на смерть: потеря голода, витаминов, очков обучения и одетых вещей.",
        "desc": "Появляется при заходе на арену.",
        "note": "",
    },
    "Riding": {
        "class": "good",
        "effect": "Значительно увеличивается скорость перемещения персонажа. Игнорируется штраф за перенос предмета (lifting).",
        "desc": "Появляется при езде на лошади/пони.",
        "note": "",
    },
    "Slowed": {
        "class": "bad",
        "effect": "Скорость перемещения персонажа снижается на 45.",
        "desc": "Появляется, если персонаж находится в радиусе агрессии монстра с кастом, если при том игрок не находится в списке целей до первого удара по такому монстру.",
        "note": "Не суммируется. Замедление скорости атаки - лишь визуальный эффект.",
    },
    "High": {
        "class": "good",
        "effect": "Уменьшает сытость при употреблении пищи. При первом ку: сигарета на 5%, сигара на 10%, косяк на 15%; чем выше ку, тем выше процент.",
        "desc": "Приобретается при использовании сигарет, косяков и сигар.",
        "note": "Стакается с уменьшением сытости при сидении за столом. Излечивает 12% здоровья за 12 тиков.",
    },
    "Weakness": {
        "class": "bad",
        "effect": "Скорость перемещения персонажа снижается на 45; урон в бою практически нулевой",
        "desc": "Приобретается в результате смерти.",
        "note": "Снимается при помощи укрепляющего зелья",
    },
    "ActivatedCarbon": {
        "class": "good",
        "effect": "Обнуляет витамины и убирает отрицательные эффекты при дефикации",
        "desc": "Приобретается при употреблении активированного угля.",
    },
    "Drunk": {
        "class": "good",
        "effect": "Наделяет повышенной стойкостью ценой потери координации.",
        "desc": "Приобретается при использовании любого алкоголя. Иногда заставляет вас говорить то, что вы думаете на самом деле. +10% hp -10% dmg.",
        "note": "Если набухаться слишком сильно, от похмелья вас не спасет даже активированный уголь.",
    },
    "Hangover": {
        "class": "bad",
        "effect": "",
        "desc": "Приобретается при употреблении алкоголя (пиво, вино).",
        "note": "Не складывается.",
    },
    "Vomit": {
        "class": "bad",
        "effect": "вас тошнит и вы теряете здоровье, в проценте от текущего.",
    },
    "Plague": {
        "class": "bad",
        "effect": "Отнимает здоровье пока вы не умрете",
        "desc": "Заразится можно от кучи мусора, другого больного или при ММ",
        "note": "Можно вылечить при помощи противочумного зелья",
    },
    "SynodProtection": {
        "class": "good",
        "effect": "Вы получите на 80% меньше урона в пвп",
        "desc": "Не работает под землей, если вы ответили на атаку или если у вас отрицательная карма.",
        "note": "Позволяет вернуться к своему респауну если он есть, или в город.",
    },
    "NewbieProtection": {
        "class": "",
        "effect": "Потери при смерти персонажа.",
        "desc": "С 1 по 9 уровень - не теряется инвентарь и экипировка.\nС 10 по 19 уровень - не теряется сама сумка, сожержимое сумки теряется.\nС 20 уровня - теряется весь инвентарь и экипировка.",
        "note": "Вне зависимости от уровня персонажа при смерти теряются все накопленные витамины и очки обучения.",
    },
    "Prospecting": {
        "class": "good",
        "effect": "Позволяет видеть близлежайщие жилы руды",
        "desc": "Приобретается за счет использования лозы.",
    },
    "De": {
        "class": "fight",
    },
    "Su": {
        "class": "fight",
    },
    "Nya": {
        "class": "fight",
    },
    "Inspiration": {
        "class": "fight",
    },
};
