import { EventNames, LIST_EVENT } from "@app-core/data/event/listNameEvents";
import { devModeConsole } from "../common/script/modules/Developer/methods/devModeConsole";
import { EventData } from "@app-core/data/event/listDataEvents";

class EventManager {
    private eventListeners: Map<EventNames, Set<EventListener>> = new Map();

    constructor() { }

    on(event: LIST_EVENT, callback: EventListener) {
        if (!(event in LIST_EVENT)) {
            devModeConsole('error', `Error: Event "${event}" is not registered in LIST_EVENT.`);
            return;
        }

        const listeners = this.eventListeners.get(event) || new Set<EventListener>();
        listeners.add(callback);
        this.eventListeners.set(event, listeners);

        window.addEventListener(event, callback);
    }

    emit(event: LIST_EVENT, data: EventData[typeof event]) {
        if (!(event in LIST_EVENT)) {
            devModeConsole('error', `Error: Event "${event}" is not registered in LIST_EVENT.`);
            return;
        }

        const customEvent = new CustomEvent(event, { detail: data[event] });

        window.dispatchEvent(customEvent);
    }

    off(event: LIST_EVENT, callback: EventListener) {
        if (!(event in LIST_EVENT)) {
            devModeConsole('error', `Error: Event "${event}" is not registered in LIST_EVENT.`);
            return;
        }

        const listeners = this.eventListeners.get(event);
        if (!listeners) {
            return;
        }

        listeners.delete(callback);

        if (listeners.size === 0) {
            window.removeEventListener(event, callback);
            this.eventListeners.delete(event);
        } else {
            this.eventListeners.set(event, listeners);
        }
    }

    fullOff() {
        this.eventListeners.forEach((listeners, event) => {
            listeners.forEach((listener) => {
                window.removeEventListener(LIST_EVENT[event], listener);
            });
        });

        this.eventListeners.clear();
    }
}

export default new EventManager();
