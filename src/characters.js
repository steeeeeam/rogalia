/* global Bank, Exchange, game, dom, Vendor, T, Character, Panel, TS, util, Quest, ImageFilter */

"use strict";
Character.equipSlots =  [
    "bag",
    "right-hand",
    "left-hand",
    "head",
    "neck",
    "body",
    "legs",
    "feet",
];

Character.attrs = ["Strength", "Vitality", "Dexterity", "Intellect", "Perception", "Wisdom"];
Character.vitamins = ["Protein", "Fat", "Carbohydrate", "Phosphorus", "Calcium", "Magnesium"];

Character.copy = function copy(to, from) {
    for(var prop in from) {
        if(from[prop] instanceof Object && !Array.isArray(from[prop])) {
            to[prop] = {};
            copy(to[prop], from[prop]);
        } else {
            to[prop] = from[prop];
        }
    }
};

Character.sync = function(data, remove) {
    remove && remove.forEach((id) => game.removeCharacterById(id));
    for (var id in data) {
        var from = data[id];
        var to = game.entities.get(id);
        if (!to) {
            to = new Character(id);
            if (from.Name == game.playerName) {
                to.isPlayer = true;
                game.player = to;
            }
            to.init(from);
            game.addCharacter(to);
        } else {
            to.sync(from);
        }
    }
    game.controller.effects.update();
    game.controller.syncMinimap();
};

Character.drawActions = function() {
    game.characters.forEach(function(c) {
        c.drawAction();
    });
};

Character.spriteDir = "characters/";
Character.animations = ["idle", "run", "dig", "craft", "attack", "sit", "ride"];
Character.clothes = ["feet", "legs", "body", "head"];

Character.clothesIndex = function(name) {
    return Character.clothes.indexOf(name);
};

Character.skull = null;

Character.sprites = {
    male: {
        naked: {},
        weapons: {},
    },
    female: {
        naked: {},
        weapons: {},
    },
    effects: {
    }
};

Character.flags = {
    Empire: null,
    Confederation: null,
};

Character.vendorSpriteName = function(name) {
    return "vendor-" + ([].reduce.call(name, function(hash, c) {
        return hash + c.charCodeAt(0);
    }, 0) % 12 + 1);
};

Character.sex = function(sex) {
    return ["male", "female"][sex];
};

Character.partyLoadQueue = {};

Character.makeAvatar = function(sex, hairstyle = null) {
    const dir = "assets/" + Character.spriteDir + "avatars/";
    const img = dom.img(dir + sex + ".png", "avatar-face");
    if (!hairstyle) {
        if (sex == "male")
            return img;
        hairstyle = "short#000#0";
    }
    const [haircut, color, opacity] = hairstyle.split("#");
    const hair = dom.img(dir + "hair/" + sex + "/" + haircut + ".png");
    hair.onload = function() {
        const coloredHair = ImageFilter.tint(hair, color, opacity);
        coloredHair.classList.add("avatar-hair");
        dom.insert(coloredHair, img.parentNode);
    };

    return dom.wrap("avatar-haircut", img);
};

Character.npcActions = {
    "Set citizenship": function() {
        var id = this.Id;
        var set = function(name) {
            return function() {
                game.popup.confirm(T("Change faction?"), function() {
                    game.network.send("set-citizenship", {Id: id, Name: name});
                });
            };
        };
        new Panel("citizenship", "Citizenship", [
            dom.button(T("Empire"), "", set("Empire")),
            dom.button(T("Confederation"), "", set("Confederation")),
            dom.hr(),
            dom.button(T("I want to be free"), "", set("")),
        ]).show();
    },
    "Get claim": function() {
        game.popup.alert(T("You can get claim from the Scrooge in the bank"));
    },
    "Get village claim": function() {
        var id = this.Id;
        game.popup.prompt(T("Name") + "?", "", function(name) {
            game.network.send("get-village-claim", {Id: id, Name: name});
        });
    },
    "Get vendor license": function() {
        var id = this.Id;
        new Panel(
            "vendor-license",
            T("Vendor license"),
            [
                T("The license will allow you to set up a vendor post in your claim."),
                dom.br(),
                dom.hr(),
                dom.wrap("slot", Entity.templates["vendor-license"].icon(), {
                    onclick: () => game.controller.craft.searchOrHelp("vendor-post"),
                }),
                T("Cost") + ": ",
                Vendor.createPrice(2 * 100 * 100),
                dom.br(),
                dom.button(T("Buy"), "", function() {
                    game.network.send("get-vendor-license", {Id: id});
                }),
                dom.button(T("Recipe"), "", function() {
                    game.controller.craft.searchOrHelp("vendor-post");
                }),
            ]
        ).setTemporary(true).show();
    },

    "Bank": function() {
        new Bank(this);
    },
    "Exchange": function() {
        new Exchange(this);
    },
    "Quest": function() {
        var quests = this.getQuests();
        //TODO: remove quest button from dialog, instead of this stupid warning
        if (quests.length == 0) {
            game.controller.showWarning(T("No more quests"));
            return;
        }
        var talks = {};
        quests.forEach(q => {
            var quest = new Quest(q, this);
            var name = quest.getName() + " (" + quest.getStatusMarker() + ")";
            talks[name] = () => quest.showPanel();
        });
        game.menu.show(talks);
    },
    "Talk": function() {
        var info = this.getTalks();
        const actions = Object.keys(info.actions);
        const quests = this.getQuests();
        if (quests.length > 0) {
            actions.push("Quest");
        }
        const panel = new Panel(
            "interaction",
            this.Name,
            [
                dom.wrap("interaction-talk-container", [
                    dom.wrap("interaction-npc-avatar", [
                        this.getFullName(),
                        dom.img(`assets/characters/npcs/avatars/${this.Type}.png`),
                    ]),
                    dom.wrap("interaction-talk", util.mklist(info.talks).map(html => dom.tag("p", "", {html})))
                ]),
                // TODO: remove obsolete links
                // dom.wrap("interaction-actions", actions.map((title, i) => {
                //     return dom.wrap(
                //         "interaction-talk-link",
                //         [
                //             `${i+1}. `,
                //             (title == "Quest") && dom.wrap("interaction-talk-quest", "(!)"),
                //             info.actions[title] || T(title),
                //         ],
                //         {
                //             onclick: () =>  {
                //                 panel.close();
                //                 Character.npcActions[title].call(this);
                //             }
                //         }
                //     );
                // })),
                dom.wrap("interaction-buttons-1", actions.map(title => {
                    const cls = (title == "Quest") ? "quest-button" : "";
                    return dom.button(T(title), cls, () => {
                        panel.close();
                        Character.npcActions[title].call(this);
                    });
                })),
            ]
        ).setEntity(this).show();
    },
    "Trade": function() {
        game.controller.vendor.open(this);
    },
    "Auction": function() {
        game.controller.auction.open(this);
    },
    "Drink water": function() {
        game.network.send("buy-water", {Id: this.Id});
    },
    "Buy sex": function() {
        game.network.send("buy-sex", {Id: this.Id});
    },
    "Show instances": function() {
        var self = this;
        game.network.send("instance-list", {Id: this.Id}, function(data) {
            if (!data.Instances) {
                game.popup.alert(T("No available instances"));
                return;
            }

            var instances = dom.table(
                [T("Name"), T("Min"), T("Max"), T("Cost"), ""],
                data.Instances.map(function(instance) {
                    var enter = dom.button(T("Enter"));
                    enter.onclick = function() {
                        game.network.send("instance", {Id: self.Id, Name: instance.Name}, () => panel.close());
                    };
                    return [
                        TS(instance.Name),
                        instance.MinLvl,
                        instance.MaxLvl,
                        Vendor.createPrice(instance.Cost),
                        enter,
                    ];
                })
            );
            var panel = new Panel("instances", "Instances", [instances]);
            panel.show().setEntity(self);
        });
    },
};
