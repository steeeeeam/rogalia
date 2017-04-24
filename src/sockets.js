/* global dom, ContainerSlot, game, T, Container */

"use strict";

function Sockets(entity, panel) {
    return dom.wrap("item-info-sockets slots-wrapper", entity.Sockets.map((id, socket) => {
        const slot = new ContainerSlot({panel, entity: {}, inspect: true});
        slot.element.classList.add("socket-" + ["yellow", "green", "blue", "red", "black"][socket]);
        switch (id) {
        case 0:
            slot.lock();
            slot.element.onclick = () => {
                game.popup.confirm(T("Unlock?"), () => {
                    game.network.send("socket", {
                        Action: "unlock",
                        Id: entity.Id,
                        Socket: socket
                    });
                });
            };
            break;
        case -1:
            slot.element.check = ({entity}) => entity.is("jewel");
            slot.element.use = (entity) => {
                game.popup.confirm(T("Encrust?"), () => {
                    const slot = Container.getEntitySlot(entity);
                    if (slot) {
                        slot.unlock();
                    }
                    game.network.send("socket", {
                        Action: "encrust",
                        Id: this.Id,
                        Jewel: entity.Id,
                        Socket: socket
                    });
                });
                return true;
            };
            break;
        default:
            const jewel = Entity.get(id);
            if (jewel) {
                slot.set(jewel);
            }
            slot.element.onclick = () => {
                game.popup.confirm(T("Purify?"), () => {
                    game.network.send("socket", {
                        Action: "purify",
                        Id: this.Id,
                        Socket: socket
                    });
                });
            };
        }
        return slot.element;
    }));
}
