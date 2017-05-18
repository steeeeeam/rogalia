/* global T, Game, config, util, gameStorage */

"use strict";

main();

function main() {
    const args = parseArgs();
    const lang = defaultLang(args);

    T.init(lang, function() {
        new Game(lang, args);
    });

    if (document.location.host == "localhost") {
        window.addEventListener("patch", ({detail}) => {
            console.log(`Patched ${detail.url.replace(/.*localhost\/src\//, "")}`);
        });
    };

    function defaultLang(args) {

        // force ru for vk
        if (window.name.indexOf("fXD") == 0) {
            return "ru";
        }
        const langs = config.ui.language();
        const lang = [
            args["lang"],
            gameStorage.getItem("lang"),
            navigator.language.substring(0, 2)
        ].find(lang => langs.includes(lang));

        return lang || langs[0];
    }


    function parseArgs() {
        return document.location.search
            .substring(1)
            .split("&")
            .reduce((params, param) => {
                const [key, value] = param.split("=");
                params[key] = decodeURIComponent(value);
                return params;
            }, {});
    }
}
