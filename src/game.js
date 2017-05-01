/* global Settings, config, DragManager, Screen, debug, Sound, Loader, Menu, WorldMap, Controller, Network, HashTable, BinarySearchTree, Quests, Point, IsoDrawer, Popup, T, Panel, Jukebox, util, Stage, FONT_SIZE, CELL_SIZE, sprintf, Professions, dom, Container, _, Quadtree, Pixi, gameStorage, ga */

"use strict";

var game;
class Game {
    constructor(lang, args) {
        game = this;
        this.lang = lang;
        this.args = this._initArgs(args);

        this.world = document.getElementById("world");
        this.canvasContainer = document.getElementById("canvas-container");
        this.interface = document.getElementById("interface");
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.clear = function() {
            game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
        };

        this.gateway = this._gatewayAddr();

        Settings.load(config);

        new DragManager();

        this.fullscreen = gameStorage.getItem("fullscreen");
        this.screen = new Screen();
        this.time = 0;
        this.timeElement = document.getElementById("time");

        this.debug = debug;
        this.config = config;
        this.sound = new Sound();

        this.offset = {
            get x() { return game.world.offsetLeft; },
            get y() { return game.world.offsetTop; },
        };

        this.loader = new Loader("assets/");
        window.loader = this.loader;

        this.menu = new Menu();

        this.player = null;
        this.playerName = "";

        this.map = new WorldMap();

        this.controller = new Controller(this);
        this.network = new Network();

        // TODO: change quadtree size using (game.map.full)
        // this.quadtree = new Quadtree(0, 0, 65568, 65568);

        this.entities = new HashTable();
        this.sortedEntities = new BinarySearchTree();
        this.claims = new HashTable();
        this.characters = new HashTable();
        this.missiles = [];
        this.containers = {};
        this.vendors = {};
        this.panels = {};
        this.camera = new Point();

        this.iso = new IsoDrawer(this.ctx);

        if (config.graphics.fastRender) {
            this.pixi = new Pixi();
            const canvas = this.pixi.renderer.view;
            canvas.classList.add("map-canvas");
            canvas.classList.add("bg-canvas");
            this.canvasContainer.appendChild(canvas);

        } else {
            this.canvas.classList.add("bg-canvas");
        }

        this.popup = new Popup();

        // TODO: obsolete; remove (check usage)
        this.button = {
            _openLink(link) {
                var siteUrl = "http://rogalia.ru";
                if (link.charAt(0) == "$")
                    link = siteUrl + link.substring(1);
                return function() {
                    window.open(link, "_blank");
                    return false;
                };
            },
            donate: function() {
                var link = document.createElement("button");
                link.textContent = T("Donate");
                link.onclick = this._openLink("http://rogalia.ru/shop/donate");
                return link;
            },
            blog: function() {
                var link = document.createElement("button");
                link.textContent = T("Blog");
                link.onclick = this._openLink("http://tatrix.org");
                return link;
            },
            vk: function() {
                var vk = document.createElement("button");
                var vkLogo = document.createElement("img");
                vkLogo.src = "https://vk.com/favicon.ico";
                vk.appendChild(vkLogo);
                vk.appendChild(document.createTextNode(T("Group")));
                vk.onclick = this._openLink("https://vk.com/rogalia");
                return vk;
            },
            twitter: function() {
                var twitter = document.createElement("button");
                var twitterLogo = document.createElement("img");
                twitterLogo.src = "https://twitter.com/favicon.ico";
                twitter.appendChild(twitterLogo);
                twitter.appendChild(document.createTextNode(T("Twitter")));
                twitter.onclick = this._openLink("https://twitter.com/Tatrics");
                return twitter;
            },
            wiki: function() {
                var wiki = document.createElement("button");
                wiki.textContent = T("Wiki / FAQ");
                wiki.onclick = this._openLink("$/wiki/");
                return wiki;
            },
            forum: function() {
                var forum = document.createElement("button");
                forum.textContent = T("Forum");
                forum.onclick = this._openLink("$/forum/");
                return forum;
            },
            lobby: function() {
                var lobby = document.createElement("button");
                lobby.textContent = T("Change character");
                lobby.onclick = function() {
                    game.reload(); //TODO: we should not reload
                };
                return lobby;
            },
            logout: function() {
                var logout = document.createElement("button");
                logout.textContent = T("Logout");
                logout.onclick = () => game.logout();
                return logout;
            },
            authors: function() {
                var authors = document.createElement("button");
                authors.textContent = T("Authors");

                var links = [
                    ["Code", "TatriX", "https://vk.com/tatrix"],
                    ["Graphics", "Nanalli", "https://vk.com/id325294403"],
                    // ["Music", "Иван Кельт", "https://vk.com/icelt"],

                ].map(function(tuple) {
                    var title = document.createElement("cite");
                    title.textContent = tuple[0];

                    var link = document.createElement("a");
                    link.innerHTML = tuple[1];
                    link.href = tuple[2];
                    link.target = "_blank";

                    var label = document.createElement("div");
                    label.appendChild(title);
                    label.appendChild(link);

                    return label;
                });

                var p = new Panel("authors",  "authors", links);
                authors.onclick = function() {
                    p.show();
                };
                return authors;
            },
        };

        this.jukebox = new Jukebox();

        var maximize = document.getElementById("maximize");
        maximize.onclick = function() {
            maximize.classList.toggle("maximized");
            if (game.args["steam"]) {
                var gui = require("nw.gui");
                var win = gui.Window.get();
                win.toggleFullscreen();
            } else {
                util.toggleFullscreen();
            }
        };

        this.setFontSize();

        if (game.args["steam"]) {
            var gui = require("nw.gui");
            var win = gui.Window.get();
            this.clearCredentials();
            win.on("new-win-policy", function(frame, url, policy) {
                gui.Shell.openExternal(url);
                policy.ignore();
            });
        }

        this.stage = new Stage();
        this.setStage("login");

        this.professions = new Professions();

        window.onerror = function(msg, url, line, column) {
            window.onerror = null;
            game.sendError([
                "Client error:",
                msg,
                "Url: " + url,
                "Line: " + line,
                "Column: " + column,
                "UA: " + navigator.userAgent,
            ].join("|"));
            game.exit(T("Client error. Refresh page or try again later."));
            return false;
        };

        T.update();
        this.mainLoop();
    }

    _initArgs(args) {
        if (!args["steam"]) {
            return args;
        }
        const cmdArgs = require("nw.gui").App.argv.reduce(function(args, arg) {
            const [key, value] = arg.split("=");
            args[key.replace(/^--?/, "")] = value || true;
            return args;
        }, {});

        return _.merge(args, cmdArgs);
    };

    initAnalitics(userId) {
        ga.GameAnalytics.configureBuild("rogalia 0.31.0");
        ga.GameAnalytics.configureUserId(userId);
        ga.GameAnalytics.initialize(
            "0d4565bf8c5354f2897950b82798b5eb",
            "a2dad58f338a6f268a387df14b8441512c8ec91f"
        );
    }

    setFontSize(size) {
        this.ctx.font = (size || FONT_SIZE) + "px Dejavu Sans";
    }

    _gatewayAddr() {
        var gateway = this.args["gateway"];
        if (gateway) {
            return this.proto() + "//" + gateway + "/gateway";
        }

        return (game.args["steam"])
            ? "http://quasar.rogalik.tatrix.org/gateway"
            : this.proto() + "//quasar.rogalik.tatrix.org/gateway";
    }

    proto() {
        return (document.location.protocol == "https:") ? "https:" : "http:";
    }

    makeServerAddr(path) {
        return this.proto() + "//" + this.network.host + path;
    }

    initTime(time, tick) {
        this.setTime(time);
        var self = this;
        setInterval(function() {
            if (++time > 1440)
                time = 0;

            self.setTime(time);
        }, tick);
    }

    setTime(time) {
        if (!time)
            return;
        this.time = time;
        this.timeElement.textContent = util.formatTime(time);
    }

    drawStrokedText(text, x, y, strokeStyle) {
        var lineJoin = this.ctx.lineJoin;
        this.ctx.strokeStyle = strokeStyle || "#292b2f";
        this.ctx.lineWidth = 2.5;
        this.ctx.lineJoin = "round";
        this.ctx.strokeText(text, x, y);
        this.ctx.fillText(text, x, y);
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = lineJoin;
    };

    save() {
        // on exit stage all panels are hidden
        // so they have nulled coordinates
        // and thus we shouldn't save them
        if (this.stage.name == "exit")
            return;
        Panel.save();
        Container.save();
        this.controller.save();
        this.chat && this.chat.save();
    };

    addEventListeners() {
        window.addEventListener("resize", () => this.screen.update());
        window.addEventListener("beforeunload", () => this.save());
        window.addEventListener("focus", () => { this.focus = true; });
        window.addEventListener("blur", () => { this.focus = false; });

        if (game.args["steam"]) {
            var gui = require("nw.gui");
            var win = gui.Window.get();
            win.on("close", () => {
                // hack to fix nw.js bug
                // see https://github.com/nwjs/nw.js/issues/2087
                if (window) {
                    this.save();
                }
                win.close(true);
            });


            window.addEventListener("wheel", function (e) {
                if (e.ctrlKey) {
                    if (e.shiftKey) {
                        win.zoomLevel = 0.0;
                    } else if (e.deltaY > 0) {
                        win.zoomLevel -= 0.5;
                    } else {
                        win.zoomLevel += 0.5;
                    }
                    gameStorage.setItem("zoomLevel", win.zoomLevel);
                }
            });

            win.zoomLevel = gameStorage.getItem("zoomLevel") || 0;
        }
    }

    quit() {
        this.clearCredentials();
        // force save here, becuase nwjs onClose handler is broken
        this.save();
        const gui = require("nw.gui");
        gui.App.quit();
    }

    update(currentTime) {
        this.stage.update(currentTime);
    }

    draw() {
        this.stage.draw();
    }

    setStage(name, params) {
        this.screen.update();
        document.body.classList.remove(this.stage.name + "-stage");
        this.stage.end();
        this.ctx.clear();
        this.stage = new window[name + "Stage"](params);
        this.stage.name = name;
        document.body.classList.add(name + "-stage");
    }

    reload() {
        document.location.reload();
    }

    getLogin() {
        return (this.args["steam"])
            ? "Rogalia"
            : gameStorage.getItem("login");
    }

    setLogin(login) {
        gameStorage.setItem("login", login);
    }

    loadServerInfo() {
        return gameStorage.getItem("server");
    }

    setServerInfo(server) {
        gameStorage.setItem("server", server);
    }

    loadSessionToken() {
        return gameStorage.getItem("session.token");
    }

    setSessionToken(token) {
        gameStorage.setItem("session.token", token);
    }

    clearSessionToken() {
        gameStorage.removeItem("session.token");
    }

    clearServerInfo() {
        gameStorage.removeItem("server");
    }

    clearCredentials() {
        this.clearServerInfo();
        this.clearSessionToken();
    }

    connectAndLogin(server, token) {
        this.setServerInfo(server);
        document.getElementById("server-addr").textContent = server.Name;

        var self = this;
        this.network.run(server.Addr, function() {
            self.network.send("login", { Token: token, Lang: game.lang });
        });
    }

    logout() {
        this.clearCredentials();
        this.reload();
    }

    addCharacter(character) {
        this.addEntity(character);
        this.characters.set(character.name || character.Id, character);
    }

    addEntity(entity) {
        this.entities.set(entity.Id, entity);

        if (entity.Group == "claim")
            this.claims.set(entity.Id, entity);
    }

    removeEntityById(id) {
        if (this.containers[id]) {
            this.containers[id].panel.hide();
            delete this.containers[id];
        }

        const entity = Entity.get(id);
        if (entity) {
            entity.onremove();
            this.sortedEntities.remove(entity);
        }
        // this.quadtree.remove(entity);
        this.entities.remove(id);
        this.claims.remove(id);
    }

    removeCharacterById(id) {
        var c = this.entities.get(id);
        this.sortedEntities.remove(c);
        var name = c.name || c.Id;
        this.entities.remove(id);
        this.characters.remove(name);
    }

    findItemsNear(x, y, dist) {
        dist = dist || CELL_SIZE*2;
        return this.entities.filter(function(e) {
            return "inWorld" in e &&
                e.inWorld() &&
                util.distanceLessThan(e.X - x, e.Y - y, dist);
        });
    }

    findCharsNear(x, y, dist) {
        dist = dist || CELL_SIZE*2;
        return this.characters.filter(function(e) {
            return util.distanceLessThan(e.X - x, e.Y - y, dist);
        });
    }

    toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
        this.screen.update();
        game.pixi && game.pixi.updateMap();
        gameStorage.setItem("fullscreen", this.fullscreen);
    }

    exit(message) {
        this.save();
        this.setStage("exit", message);
    }

    sendError(msg) {
        game.network.send("error", {msg: msg});
    }

    sendErrorf() {
        this.sendError(sprintf.apply(window, arguments));
    }

    inVK() {
        return (window.name.indexOf("fXD") == 0);
    }

    error() {
        this.sendErrorf.apply(this, arguments);
        this.exit();
        throw "Fatal error";
    }

    mainLoop(currentTime) {
        this.controller.fpsStatsBegin();

        this.update(currentTime);
        this.draw();

        this.controller.fpsStatsEnd();

        requestAnimationFrame((dt) => this.mainLoop(dt));
    }
}
