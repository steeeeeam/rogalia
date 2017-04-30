/* global T, Panel, dom, ContainerSlot, game, playerStorage */

class QuickBar {
    constructor(modifier) {
        this.modifier = modifier;
        this.slots = _.range(5).map(i => {
            const slot = new ContainerSlot({panel: this.panel, entity: {}}, i);
            slot.element.check = () => true;
            slot.element.use = (entity) => {
                this.setSlot(slot, entity, i+1);
                return true;
            };
            return slot;
        });
        this.panel = new Panel(
            `quickbar-${this.modifier}`,
            "",
            dom.wrap("slots-wrapper", this.slots.map(slot => slot.element))
        ).hideTitle().hideCloseButton();
        this.load();
    }

    hotkey(key) {
        const slot = this.slots[key-1];
        const {entity} = slot;
        if (!entity) {
            return;
        }

        if (entity.canBeEquipped()) {
            entity.equip();
            return;
        }

        if (entity.Actions.includes("cast")) {
            entity.cast(() => this.updateSlot(slot, entity, key));
            return;
        }

        const action = ["Eat", "Consume", "Inject"].find(action => entity.Actions.includes(action));
        if (action) {
            game.network.send(action, {Id: entity.Id}, () => {
                this.updateSlot(slot, entity, key);
            });
        }
    }

    setSlot(slot, entity, hotkey) {
        slot.set(entity);
        slot.setSup(`${this.modifier}+${hotkey}`);
    }

    updateSlot(slot, entity, hotkey) {
        const items = game.player.findItems([entity.Type])[entity.Type];
        if (items.length == 0) {
            slot.clear();
        } else {
            this.setSlot(slot, items[0], hotkey);
        }
    }

    load() {
        const ids = playerStorage.getItem(`quickbar.${this.modifier}`);
        if (!ids || ids.length != this.slots.length)  {
            return;
        }
        ids.map(Entity.get).forEach((entity, i) => {
            if (entity) {
                this.setSlot(this.slots[i], entity, i+1);
            }
        });
    }

    save() {
        playerStorage.setItem(`quickbar.${this.modifier}`, this.slots.map(slot => slot.entity && slot.entity.Id));
    }

}
