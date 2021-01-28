"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStorage = void 0;
var jsdom_1 = require("jsdom");
var setupStorage = function () {
    var dom = new jsdom_1.JSDOM('', {
        url: 'http://localhost'
    });
    global.document = dom.window.document;
    // @ts-ignore
    global.window = dom.window;
    global.localStorage = {
        setItem: function (key, value) { },
        getItem: function (key) { return ''; },
        removeItem: function (key) { },
        length: 0,
        clear: function () { },
        key: function (index) { return null; }
    };
};
exports.setupStorage = setupStorage;
//# sourceMappingURL=setupStorage.js.map