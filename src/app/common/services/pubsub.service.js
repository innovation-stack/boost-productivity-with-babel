const listeners = {};

function generateRandomKey(events) {
    const eventKey = Math.random().toString(36).substring(7);

    if (!events[eventKey]) {
        return eventKey;
    } else {
        return generateRandomKey(events);
    }
};

function fireCallbacks(eventName, data) {
    const listenersToCallback = listeners[eventName];
    if (listenersToCallback) {
        const eventKeys = Object.keys(listenersToCallback);
        let totalEvents = eventKeys.length;
        while (totalEvents--) {
            if (listenersToCallback[eventKeys[totalEvents]] && typeof listenersToCallback[eventKeys[totalEvents]].callback === 'function') {
                listenersToCallback[eventKeys[totalEvents]].callback.apply(this, [data]);
            }
        }
    }
}

function unsubscribe(eventName, eventKey) {
    if (listeners[eventName] && listeners[eventName][eventKey]) {
        delete listeners[eventName][eventKey];
        if (Object.keys(listeners[eventName]).length === 0) {
            delete listeners[eventName];
        }
    }
}

class PubSubService {
    subscribe(eventName, callback) {
        if (!eventName || !(callback || typeof callback === 'function')) {
            throw new Error('Supplying both event name and callback is mandatory');
        }
        listeners[eventName] = listeners[eventName] || [];
        const eventKey = generateRandomKey(listeners[eventName]);
        listeners[eventName][eventKey] = {
            callback
        };
        return function deregister() {
            return unsubscribe(eventName, eventkey);
        };
    }

    publish(eventName, data) {
        fireCallbacks(`${eventName}:before`, data, false);
        fireCallbacks(eventName, data);
        fireCallbacks(`${eventName}:after`, data, false);
    }

    hasListener(eventName) {
        return !!listeners[eventName];
    };
}

export default PubSubService;
