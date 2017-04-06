/* global Panel, T, dom, game, Permission */

"use strict";
function Users() {
    let onlineSet = new Set();
    var lists = {};

    function renderList(content, list, empty) {
        if (!list) {
            dom.setContents(content, T(empty));
            return;
        }
        dom.setContents(content, [
            isFriendList(list) ? makeFriendList(list) : makeSimpleList(list),
            dom.hr(),
            dom.wrap("user-total", T("Total") + ": " + list.length),
        ]);
    }

    function isFriendList(list) {
        return _.isObject(list[0]);
    }

    function makeSimpleList(list) {
        return dom.scrollable("user-list", list.sort().map(function(name, i) {
            return dom.wrap(
                "user",
                [
                    (i + 1) + ". ",
                    name,
                ],
                {
                    onmousedown: (e) => game.chat.nameMenu(e, name),
                }
            );
        }));
    }

    function makeFriendList(list) {
        list.sort(function(a, b) {
            return a.Name.localeCompare(b.Name);
        });
        return dom.scrollable("user-list", list.map(function({Id, Name, Perm}, i) {
            return dom.wrap(
                "user",
                [
                    (i + 1) + ". ",
                    Name,
                    dom.wrap("user-online", onlineSet.has(Name) ? "✔" : "", {title: T("Online")}),
                    Permission.make(Id, Perm)
                ],
                {
                    onmousedown: (e) => game.chat.nameMenu(e, Name),
                }
            );
        }));
    }

    function render(content, data, selector, empty) {
        var list = {
            content: content,
            data: data[selector] || [],
            empty: empty,
        };
        if (selector == "OnlinePlayers") {
            onlineSet =  new Set(list.data);
        }
        lists[selector] = list;
        renderList(list.content, list.data, list.empty);
    }

    function makeTabUpdate(cmd, selector, empty) {
        return function (title, content) {
            function update(data) {
                render(content, data, selector, empty);
            }
            game.network.send(cmd, {}, update);
            // when e.g. this.updateFriendsTab()  will be called from game.chat
            // we need to chain game.network.send callback
            // so return it
            return update;
        };
    }


    this.battleground = new Battleground();

    this.tabs = dom.tabs([
        {
            title: T("PVP"),
            contents: this.battleground.contents,
        },
        {
            title: T("Online players"),
            update: makeTabUpdate("player-list", "OnlinePlayers", "")
        },
        {
            title: T("Friends"),
            update: makeTabUpdate("friend-list", "Friends", "No friends")
        },
        {
            title: T("Blacklist"),
            update: makeTabUpdate("blacklist-list", "Blacklist", "Blacklist is empty")
        }
    ]);

    this.panel = new Panel(
        "users",
        "Users",
        this.tabs
    );

    this.updateOnlinePlayersTab = this.tabs.tabs[0].update;
    this.updateFriendsTab = this.tabs.tabs[1].update;
    this.updateBlacklistTab = this.tabs.tabs[2].update;

    this.addPlayer = function(name) {
        if (name == game.playerName)
            return;
        onlineSet.add(name);
        var list = lists.OnlinePlayers;
        if (list && list.data.indexOf(name) == -1) {
            list.data.push(name);
            renderList(list.content, list.data, list.empty);
        }
    };

    this.removePlayer = function(name) {
        if (name == game.playerName)
            return;
        onlineSet.delete(name);
        var list = lists.OnlinePlayers;
        if (list) {
            var data = list.data;
            data.splice(data.indexOf(name), 1);
            renderList(list.content, list.data, list.empty);
        }
    };

    this.getOnlinePlayers = function() {
        return lists.OnlinePlayers.data;
    };
}

class Battleground {
    constructor() {
        this.inQueue = false;
        this.enqueueButton = dom.button(T("Find battle"), "", () => this.enqueue());
        this.cancelButton = dom.button(T("Cancel"), "", () => this.cancel());
        this.contents = dom.wrap("battleground", this.enqueueButton);
    }

    cancel() {
        game.network.send("battleground", {Action: "cancel"}, () => {
            this.reset();

        });
    }

    enqueue() {
        game.network.send("battleground", {Action: "enqueue"}, () => {
            dom.setContents(this.contents, this.cancelButton);
        });
    }

    reset() {
        dom.setContents(this.contents, this.enqueueButton);
    }

    confirm() {
        game.popup.confirm(T("Accept battle?"), () => {
            game.network.send("battleground", {Action: "accept"});
            game.popup.alert(T("Waiting for others to accept"));
            this.reset();
        });
    }
}
