/* global dom, game, T, playerStorage, util, getComputedStyle */

"use strict";
function Panel(name, title, elements, hooks) {
    if (name in game.panels) {
        // TODO: why? remove me
        // dont save position
        // game.panels[name].temporary = true;
        game.panels[name].close();
    }

    game.panels[name] = this;

    this.name = name;
    this.visible = false;
    this.temporary = false; //do not save on quit
    this.canSnap = true;

    this.lsKey = "panels." + this.name;
    var config = playerStorage.getItem(this.lsKey) || {};

    this.contents = dom.div("contents");

    this.title = dom.div("title-text");
    this.setTitle(title);

    this.closeButton = dom.wrap("close", "✕");
    this.closeButton.panel = this;
    this.closeButton.onclick = () => this.hide();

    this.titleBar = dom.wrap("title-bar", [this.title, this.closeButton]);
    this.titleBar.ondblclick = (event) => {
        if (event.target != this.title) {
            return;
        }
        if (this._minimized) {
            this.maximize();
        } else {
            this.minimize();
        }
    };

    this.element = dom.wrap("panel draggable", this.titleBar);
    this.element.id = name;

    this.button = null;

    hooks = hooks || {};
    this.hooks = {
        show: hooks.show,
        hide: hooks.hide,
        clsoe: hooks.close,
    };

    if (elements) {
        this.setContents(elements);
    } else {
        var contents = document.getElementById(name);
        if (contents) {
            contents.id += "-panel";
            this.contents.appendChild(contents);
        }
    }

    this.element.appendChild(this.contents);
    this.element.addEventListener("mousedown", () => {
        var mod = game.controller.modifier;
        if (mod.ctrl || mod.shift || mod.alt)
            return;
        this.toTop();
    });
    this.element.addEventListener("mousedown", () => game.controller.highlight(name, false));
    this.element.id = name;
    dom.insert(this.element);

    if ("visible" in config && config.visible) {
        this.show();
    }

    this._minimized = config.minimized;
    if (config.minimized) {
        this.minimize();
    }

    if ("position" in config) {
        this.x = config.position.x;
        this.y = config.position.y;
    } else {
        this._forcePositionReset = true;
    }

    this.entity = null;
    this.visibilityCheck = true;
}

Panel.save = function() {
    for(var panel in game.panels) {
        game.panels[panel].savePosition();
    }
};

Panel.zIndex = 1;
Panel.top = null;
Panel.stack = [];

Panel.prototype = {
    get x() {
        return parseInt(this.element.dataset.x || 0);
    },
    get y() {
        return parseInt(this.element.dataset.y || 0);
    },
    set x(x) {
        this.element.dataset.x = x;
        this.element.style.left = this.x + "px";
        // this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    },
    set y(y) {
        this.element.dataset.y = y;
        this.element.style.top = this.y + "px";
        // this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    },
    get width() {
        return parseInt(getComputedStyle(this.element).width);
    },
    get height() {
        return parseInt(getComputedStyle(this.element).height);
    },
    resetPosition() {
        this.x = game.offset.x + (game.screen.width - this.width) / 2;
        this.y = game.offset.y + (game.screen.height - this.height) / 2;
    },
    toTop() {
        if (Panel.top && Panel.top != this)
            Panel.top.element.classList.remove("top");

        this.element.style.zIndex = ++Panel.zIndex;
        this.element.classList.add("top");
        var index = Panel.stack.indexOf(this);
        if (index != -1) {
            Panel.stack.splice(index, 1);
        }
        Panel.stack.push(this);

        Panel.top = this;
    },
    hide() {
        this.hooks.hide && this.hooks.hide.call(this);
        this.savePosition();
        this.element.style.visibility = "hidden";
        if (this.button) {
            this.button.classList.remove("active");
        }
        this.visible = false;
        const next = Panel.stack.pop();
        if (next) {
            Panel.top = next;
        }
    },
    hideCloseButton() {
        dom.hide(this.closeButton);
        return this;
    },
    hideTitle() {
        dom.hide(this.titleBar);
        return this;
    },
    showTitle() {
        dom.show(this.titleBar);
        return this;
    },
    close() {
        this.hide();
        if (this.element && this.element.parentNode) {
            dom.remove(this.element);
        }

        delete game.panels[this.name];
        this.hooks.close && this.hooks.close.call(this);
    },
    setTitle(text) {
        this.title.title = T(text);
        this.title.textContent = T(text);
    },
    setContents(elements) {
        dom.clear(this.contents);
        dom.append(this.contents, elements);
    },
    makeBackButton() {
        var back = document.createElement("button");
        back.textContent = T("Back");
        back.onclick = function() {};
        return back;
    },
    setEntity(entity) {
        this.entity = entity;
        return this;
    },
    setTemporary(temporary) {
        this.temporary = temporary;
        return this;
    },
    show(x, y) {
        this.toTop();
        this.element.style.visibility = "visible";
        if (this.button) {
            this.button.classList.add("active");
        }

        this.visible = true;

        if (x === undefined && y === undefined) {
            if (this._forcePositionReset) {
                this.resetPosition();
                this._forcePositionReset = false;
            }
        } else {
            this.x = x;
            this.y = y;
        }

        // protection from window going offscreen
        var valid = util.rectIntersects(
            this.x, this.y, this.width, this.height,
            0, 0, window.innerWidth, window.innerHeight
        );
        if (!valid) {
            this.resetPosition();
        }

        if (this._minimized) {
            this.maximize();
        }


        this.hooks.show && this.hooks.show.call(this);
        window.scrollTo(0, 0);
        return this;
    },
    fitToScreen() {
        if (this.x + this.width > window.innerWidth) {
            this.x = window.innerWidth - this.width;
        }
        if (this.y + this.height > window.innerHeight) {
            this.y = window.innerHeight - this.height;
        }
    },
    toggle() {
        if (this.visible)
            this.hide();
        else
            this.show();
    },
    minimize() {
        this._minimized = true;
        this.element.classList.add("minimize");
    },
    maximize() {
        this._minimized = false;
        this.element.classList.remove("minimize");
    },
    savePosition() {
        if (this.temporary)
            return;

        playerStorage.setItem(this.lsKey, {
            position: {
                x: this.x,
                y: this.y,
            },
            visible: this.visible,
            minimized: this._minimized,
        });
    },
    center(ratioX = 0.5, ratioY = 0.5) {
        this.x = game.offset.x + (game.world.offsetWidth - this.element.offsetWidth) * ratioX;
        this.y = game.offset.y + (game.world.offsetHeight - this.element.offsetHeight) * ratioY;
        return this;
    },
    setWidth(w) {
        const pad = 6;
        this.element.style.width = w + pad + "px";
        this.element.style.maxWidth = w + pad + "px";
    },
    fixHeight(height = this.height) {
        this.contents.style.minHeight = height + "px";
    },
    setVisibilityCheck(value) {
        this.visibilityCheck = value;
        return this;
    },
    updateVisibility() {
        if (this.visible &&
            !this._minimized &&
            this.visibilityCheck &&
            this.entity &&
            !game.player.canUse(this.entity)) {
            this.close();
        }
    },
};
