/* global Quest */

Quest.quests =  {
    "tutorial-start": {
        name: "Start",
        desc: [
            "Hello, settler.",
            "Everyone who arrives here gets my Academy. My job here is to teach you survival basics.",
        ],
        final: "Great, let's begin.",
    },
    "craft-1": {
        name: "Picking resources",
        desc: [
            "You need some tools to survive this wild lands; and for tools you need resources.",
            "Pick four stones, two boughs and a branch.",
        ],
        tip: "<rmb>Get bough/branch</rmb> on a tree.<br><lmb></lmb> on a stone to pick it up from the ground.",
    },
    "craft-1-2": {
        name: "Making a knife handle",
        desc: "Now make sticks from the boughs and twigs from the branches. We will use them to make a handle.",
        tip: "<rmb>Break off</rmb> on a bough gives a stick, the same for a branch gives a twig.",
    },
    "craft-2": {
        name: "Making a knife blade",
        desc: "The knife should has a blade. Try to make it from the sharp stones.",
        tip: "<lmb></lmb> on the sharp stone icon or open craft window and search for sharp stone.",
    },
    "craft-2-1": {
        name:  "Making a knife",
        desc: "Perfect, everything is ready. Finally let's make a knife.",
    },
    "craft-3": {
        name: "Making a weapon",
        desc: "Good, now equip a knife and let's craft a sharp stick — your first weapon. You will need it later.",
        tip: "<rmb>Equip</rmb> on a knife.",
    },
    "stat-1": {
        name: "Thirst",
        desc: "Now I shall teach you how to obtain food and water.<br>Rip off some bark from a tree and make a mug. Then fill it with water. Don't worry, the water is clean here.",
        tip: "Go into a water and <rmb>Fill</rmb> on a mug.<br><rmb>Drink</rmb> will increase your stamina.",
    },
    "stat-2": {
        name: "Hunger",
        desc: [
            "It's the time to get some food. Pick some apples from a tree.",
            "<hl>Be careful, don't eat more then you need, otherwise, food won't give you vitamins and you become  slow.</hl>",
            "By the way, if you've overate, use the toilet next to me.",
        ],
    },
    "fight": {
        name: "Fight and fighting combos",
        desc: "Well, I see you prepared for your first fight.<br>Equip your sharp stick and hit a training dummy.",
        tip: "Attack will follow the mouse pointer.<br>Skill buttons and hotkeys can be found in the bottom panel.",
    },
    "finish": {
        name: "The end of tutorial",
        desc: "Well, I did my job.",
        final: "It's time to move to the town."
    },
    "claim-get-license": {
        name: "License",
        desc: "Hello newbie. Money run this world, got it? And you better not leave your money on a road. I'm gonna teach you to protect your privacy. You know you can keep cash in my bank, right? But you also have to keep your belongings safe. That's what Claim is for.",
        tip: "You can get a license from Scrooge (see Bank).",
    },
    "claim-build": {
        name: "Build",
        desc: [
            "It will cost you some, yeah, but safety worth it.",
            "You can protect any free place with Claim and further extend it.",
            "Don't rush, choose wisely. Anytime you want to move it or buy another, we'll charge you.",
            "Place a respawn stone nearby - that's how you won't lose the place and get to it quickly.",
        ],
    },
    "claim-extend": {
        name: "Extend",
        desc: "Good for ya. You can extend your claim but don't forget that rent enlarges too. Always keep an eye on your bank account and check if there's enough to pay a rent, otherwise you're at risk to lose the claim and turn unprotected.",
        final: "Seems to be done, yeah? Now you can settle and build on your own. Ofcourse, people still can rob you, but now you can punish the crime. The Law is on your side for now. By the way, go visit the butcher, he seems to have something to say you."
    },
    "tp-return-home": {
        name: "Return to home" ,
        desc: "Are you interested in portals? I'll tell you about the ways you travel around the world.<br> While you're on the surface and under the Synode protection you can easily return to your homestead. I mean, to your respawn stone, if you built one, or to the town. Give it a try.",
        "tip": "<rmb>Click on your picture</rmb> (see left top part of the screen) to return home.",
    },
    "tp-respawn": {
        name: "Respawn",
        desc: "Town respawn stones are connected to your respawn stone.<br> You can travel using a respawn stone but its primary task is to ressurect you after death. When you build your own respawn stone you'll notice it's looks different from others.",
        tip: "<lmb></lmb> on the closest respawn."
    },
    "tp-scrolls": {
        name: "Scrolls",
        desc: "Teleportation scrolls allow you to return home from the very dangerous places. They make a good help when you're exploring underground levels.<br>I'll give you a couple but you can buy or make them yourself.",
    },
    "faction-daily-1": {
        name: "Help your faction (daily)",
        desc: "Increase your status within the faction",
    },
    "garland-daily": {
        name: "Garland (daily)",
        desc: "Help Santa to make a garland",
    },
    "chrismas-flags-daily": {
        name: "Flags (daily)",
        desc: "Help Santa to make some paper flags",
    },
    "chrismas-decoration-daily-2": {
        name: "Decoration (daily)",
        desc: "Help Santa's daughter make some paper decorations",
    },
    "chrismas-decoration-daily-1": {
        name: "Glass decoration (daily)",
        desc: "Help Santa's daughter make some glass decorations",
    },
    "chrismas": {
        name: "Christmas hat",
        desc: "Merry Christmas and Happy New Year! I present you a Christmas Hat!",
        final: "Here is your hat.",
        customReward: "Christmas hat",
    },
    "chrismas-presents": {
        name: "Christmas present (daily).",
        desc: "Finally! Christmas! Do you want a present?",
        final: "Here is your present.",
    },
    "buy-small-indulgence": {
        name: "Small indulgence",
        desc: [
            "You can always make a confession here.",
        ],
        customReward: "+100 Karma",
    },
    "buy-average-indulgence": {
        name: "Average indulgence",
        desc: [
            "You can always make a confession here.",
        ],
        customReward: "+1000 Karma",
    },
    "buy-big-indulgence": {
        name: "Big indulgence",
        desc: [
            "You can always make a confession here.",
        ],
        customReward: "+10000 Karma",
    }
};
