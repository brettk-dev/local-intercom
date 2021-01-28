(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.localIntercom = {}));
}(this, (function (exports) { 'use strict';

    const makeMessage = (type, payload) => {
        if (!type) {
            throw new Error('A message type is required.');
        }
        return {
            type,
            payload
        };
    };

    const config = {
        KEY: 'INTERCOM_MESSAGE'
    };

    const send = (type, payload) => {
        const msg = makeMessage(type, payload);
        console.log('message made', msg);
        localStorage.setItem(config.KEY, JSON.stringify(msg));
        localStorage.removeItem(config.KEY);
    };

    const listeners = {};
    const listen = (type, callback) => {
        if (!listeners[type]) {
            listeners[type] = [];
        }
        listeners[type] = [...listeners[type], callback];
    };

    const init = () => {
        window.addEventListener('storage', (event) => {
            const msg = event.newValue;
            if (!msg)
                return;
            try {
                const obj = JSON.parse(msg);
                if (obj.type && Array.isArray(listeners[obj.type])) {
                    listeners[obj.type].forEach(cb => {
                        if (typeof cb === 'function') {
                            console.log(cb);
                            cb(obj.payload);
                        }
                    });
                }
            }
            catch (err) {
                console.error('ERROR:', err);
            }
        });
    };

    (() => {
        init();
    })();

    exports.listen = listen;
    exports.send = send;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
